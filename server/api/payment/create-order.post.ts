// POST /api/payment/create-order — Tạo đơn hàng mới với mã duy nhất cho VietQR

interface CreateOrderBody {
  product_type: 'preset' | 'course' | 'mix_deposit' | 'studio_deposit'
  product_id?: string
  product_label?: string
  amount: number
  client_name?: string
  client_phone?: string
  client_email?: string
  download_url?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  landing_page?: string
}

function generateOrderCode(): string {
  const digits = Math.floor(1000 + Math.random() * 9000)
  return `XK${digits}`
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as CreateOrderBody

  if (!body.product_type || !body.amount || body.amount <= 0) {
    throw createError({ statusCode: 400, message: 'Thiếu product_type hoặc amount hợp lệ' })
  }

  const db = getDB(event)
  if (!db) {
    // Fallback when D1 not available (local dev): trả về code giả để không block frontend
    const code = generateOrderCode()
    return { order_code: code, amount: body.amount }
  }

  await ensureSchema(db)

  // Thử tạo order_code unique, retry tối đa 5 lần nếu trùng
  let order_code = ''
  for (let i = 0; i < 5; i++) {
    const candidate = generateOrderCode()
    const existing = await db.prepare('SELECT id FROM orders WHERE order_code = ?').first<{ id: number }>(candidate)
    if (!existing) {
      order_code = candidate
      break
    }
  }

  if (!order_code) {
    throw createError({ statusCode: 500, message: 'Không thể tạo mã đơn hàng. Vui lòng thử lại.' })
  }

  const utmSource = body.utm_source?.trim() || null
  const utmMedium = body.utm_medium?.trim() || null
  const utmCampaign = body.utm_campaign?.trim() || null

  // Fallback UTM từ cookie xk_utm nếu payload không có
  let finalUtmSource = utmSource
  if (!finalUtmSource) {
    try {
      const rawCookie = getCookie(event, 'xk_utm')
      if (rawCookie) {
        const parsed = JSON.parse(decodeURIComponent(rawCookie))
        finalUtmSource = parsed.source || null
      }
    } catch {}
  }

  await db.prepare(
    `INSERT INTO orders (order_code, client_name, client_phone, client_email, product_type, product_id, product_label, amount, status, download_url, utm_source, utm_medium, utm_campaign, landing_page)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?)`
  ).bind(
    order_code,
    body.client_name?.trim() || null,
    body.client_phone?.trim() || null,
    body.client_email?.trim() || null,
    body.product_type,
    body.product_id || null,
    body.product_label || null,
    body.amount,
    body.download_url || null,
    finalUtmSource,
    utmMedium,
    utmCampaign,
    body.landing_page?.trim() || getHeader(event, 'referer')?.slice(0, 300) || null
  ).run()

  return { order_code, amount: body.amount }
})
