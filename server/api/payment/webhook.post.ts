// POST /api/payment/webhook — Nhận webhook từ SePay khi có biến động số dư MB Bank
// Tài liệu SePay: https://docs.sepay.vn/webhook.html

interface SePayWebhookBody {
  id: number
  gateway: string
  transactionDate: string
  accountNumber: string
  subAccount: string | null
  code: string | null           // Nội dung chuyển khoản — chứa order_code (VD: "XK8821")
  content: string               // Nội dung đầy đủ từ ngân hàng
  transferType: 'in' | 'out'
  transferAmount: number
  accumulated: number
  referenceCode: string
  description: string
}

// Trích xuất mã đơn hàng XK#### từ nội dung chuyển khoản
function extractOrderCode(content: string): string | null {
  const match = content.match(/\bXK\d{4,6}\b/i)
  return match ? match[0].toUpperCase() : null
}

export default defineEventHandler(async (event) => {
  // Xác thực API key từ SePay (header: x-api-key)
  const config = useRuntimeConfig(event)
  const cfEnv = ((event.context as any)?.cloudflare?.env || {}) as Record<string, string>
  const expectedKey = (config.sePayApiKey as string) || cfEnv.SEPAY_API_KEY || ''

  if (expectedKey) {
    const receivedKey = getHeader(event, 'x-api-key') || ''
    if (receivedKey !== expectedKey) {
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }
  }

  const body = await readBody(event) as SePayWebhookBody

  // Chỉ xử lý giao dịch tiền VÀO tài khoản
  if (body.transferType !== 'in' || !body.transferAmount || body.transferAmount <= 0) {
    return { received: true }
  }

  const rawContent = body.content || body.code || body.description || ''
  const orderCode = extractOrderCode(rawContent)

  if (!orderCode) {
    // Không phải đơn từ website — ghi log nhưng không báo lỗi
    console.info('[webhook] Giao dịch không có mã XK:', rawContent.slice(0, 80))
    return { received: true }
  }

  const db = getDB(event)
  if (!db) {
    console.warn('[webhook] D1 không khả dụng, bỏ qua đơn:', orderCode)
    return { received: true }
  }

  await ensureSchema(db)

  const order = await db.prepare(
    'SELECT id, status, amount, product_label, client_name, client_phone, product_type FROM orders WHERE order_code = ?'
  ).first<{
    id: number
    status: string
    amount: number
    product_label: string | null
    client_name: string | null
    client_phone: string | null
    product_type: string
  }>(orderCode)

  if (!order) {
    console.warn('[webhook] Không tìm thấy order:', orderCode)
    return { received: true }
  }

  if (order.status === 'paid') {
    // Idempotent: đơn đã xử lý rồi, bỏ qua
    return { received: true }
  }

  // Kiểm tra số tiền (chấp nhận chênh lệch ±2% do phí chuyển khoản ngân hàng)
  const tolerance = Math.ceil(order.amount * 0.02)
  const amountMatch = Math.abs(body.transferAmount - order.amount) <= tolerance

  if (!amountMatch) {
    console.warn(`[webhook] Số tiền không khớp. Đơn: ${order.amount}, Nhận: ${body.transferAmount}, Mã: ${orderCode}`)
    // Không reject — ghi log để Admin kiểm tra thủ công, không tự động xử lý
    return { received: true }
  }

  // Cập nhật trạng thái đơn hàng thành paid
  await db.prepare(
    "UPDATE orders SET status = 'paid', updated_at = CURRENT_TIMESTAMP WHERE order_code = ?"
  ).bind(orderCode).run()

  // Nếu là studio_deposit: tự động tạo booking record
  if (order.product_type === 'studio_deposit') {
    await db.prepare(
      `INSERT INTO bookings (order_code, client_name, client_phone, service_type, status, deposit_amount)
       VALUES (?, ?, ?, 'studio', 'confirmed', ?)`
    ).bind(orderCode, order.client_name || '', order.client_phone || '', body.transferAmount).run().catch(() => {})
  }

  // Bắn Telegram notification
  const telegramToken = (config.telegramBotToken as string) || cfEnv.TELEGRAM_BOT_TOKEN || cfEnv.XKPROD_TELEBOT_APIKEY
  const chatId = (config.telegramChatId as string) || cfEnv.TELEGRAM_CHAT_ID || '8114595719'

  if (telegramToken && chatId) {
    const escHtml = (s: string = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const clientPhone = order.client_phone || '(chưa có)'
    const cleanPhone = clientPhone.replace(/[\.\s\-]/g, '')
    const zaloPhone = cleanPhone.startsWith('0') ? '84' + cleanPhone.substring(1) : cleanPhone

    const productLabel = order.product_label || order.product_type
    const formattedAmount = new Intl.NumberFormat('vi-VN').format(body.transferAmount) + '₫'

    const typeLabel: Record<string, string> = {
      preset: '🎛 Preset / Template',
      course: '🎓 Khóa học',
      mix_deposit: '🎚 Cọc Mix Online',
      studio_deposit: '🎙 Cọc Studio',
    }
    const typeText = typeLabel[order.product_type] || order.product_type

    const text = `💰 <b>ĐƠN HÀNG TỰ ĐỘNG THÀNH CÔNG</b>
---------------------------------
🔑 <b>Mã đơn:</b> <code>${orderCode}</code>
${typeText}: <b>${escHtml(productLabel)}</b>
💵 <b>Đã nhận:</b> <b>${formattedAmount}</b>
👤 <b>Khách hàng:</b> ${escHtml(order.client_name || '(chưa có)')}
📞 <b>Liên hệ:</b> <code>${cleanPhone}</code>
---------------------------------
✅ Hệ thống đã <b>tự động kích hoạt link tải/xác nhận booking</b> cho khách.
💬 <a href="https://zalo.me/${zaloPhone}">Nhắn Zalo chăm sóc khách</a>`.trim()

    await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
    }).catch((err) => console.error('[webhook] Telegram error:', err))
  }

  return { received: true, order_code: orderCode }
})
