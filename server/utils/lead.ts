export interface LeadPayload {
  name?: string
  phone?: string
  email?: string
  service?: string
  message?: string
  source?: string
}

export function getServiceLabel(service?: string): string {
  const map: Record<string, string> = {
    'thu-am': 'Thu âm bài hát',
    'mixing-mastering': 'Mixing & Mastering',
    'hoa-am': 'Hoà âm phối khí',
    'mv-tvc': 'Quay MV & TVC',
    'live-band': 'Âm thanh ánh sáng / Live Band',
    'khoa-hoc': 'Khoá học Music Producer',
    'other': 'Khác',
  }
  return (service && map[service]) || service || 'Chưa chọn'
}

export async function processLead(event: any, payload: LeadPayload) {
  const { name, phone, email, service, message, source = 'contact' } = payload

  if (!name?.trim() || !phone?.trim()) {
    throw createError({ statusCode: 400, message: 'Thiếu họ tên hoặc số điện thoại' })
  }

  const ip = getHeader(event, 'cf-connecting-ip')
    ?? getHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim()
    ?? '0.0.0.0'

  // Lưu vào D1 database nếu có binding
  const db = getDB(event)
  if (db) {
    try {
      await ensureSchema(db)
      await db.prepare(
        `INSERT INTO leads (name, phone, email, service, message, ip, source)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        name.trim(),
        phone.trim(),
        email?.trim() || null,
        service || null,
        message?.trim() || null,
        ip,
        source,
      ).run()
    } catch (dbErr) {
      console.error('[lead] Error saving to D1:', dbErr)
    }
  }

  // Gửi Telegram notification
  const config = useRuntimeConfig(event)
  const cfEnv = ((event.context as any)?.cloudflare?.env || {}) as Record<string, string>
  const token = (config.telegramBotToken as string) || cfEnv.TELEGRAM_BOT_TOKEN || cfEnv.XKPROD_TELEBOT_APIKEY
  const chatId = (config.telegramChatId as string) || cfEnv.TELEGRAM_CHAT_ID || '8114595719'

  if (token && chatId) {
    const cleanPhone = phone.replace(/[\.\s\-]/g, '').trim()
    const zaloPhone = cleanPhone.startsWith('0') ? '84' + cleanPhone.substring(1) : cleanPhone
    
    let origin = 'Form Liên Hệ'
    if (source === 'index') origin = 'Form Đăng Ký Nhanh (Trang Chủ)'
    else if (source === 'booking-flow') origin = 'Form Đặt Lịch Studio'
    else if (source === 'mix-online') origin = 'Form Đặt Mix & Master Online'
    else if (source === 'b2b') origin = 'Form Đăng Ký Âm Nhạc Doanh Nghiệp (B2B)'
    else if (source === 'email-capture') origin = 'Form Nhận Tài Liệu / Ebook'
    else if (source) origin = `Nguồn: ${source}`

    const serviceName = getServiceLabel(service)

    const text = `🔥 *YÊU CẦU MỚI TỪ WEBSITE* 🔥
---------------------------------
📍 *Nguồn:* ${origin}
👤 *Khách hàng:* ${name}
📞 *Số điện thoại:* \`${cleanPhone}\`
📧 *Email:* ${email || '(không điền)'}
🛠️ *Dịch vụ:* ${serviceName}
📝 *Lời nhắn:*
_${message || '(không điền)'}_
---------------------------------
💬 [Nhắn Zalo cho khách](https://zalo.me/${zaloPhone})
📞 [Gọi điện ngay](tel:${cleanPhone})`.trim()

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown', disable_web_page_preview: true }),
    }).catch((err) => console.error('[lead] Telegram send error:', err))
  }

  return { success: true }
}
