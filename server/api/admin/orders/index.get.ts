// GET /api/admin/orders — Danh sách đơn hàng tự động & lịch cọc studio
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const db = getDB(event)
  if (!db) throw createError({ statusCode: 503, message: 'Database not available' })

  await ensureSchema(db)

  const query = getQuery(event)
  const status = typeof query.status === 'string' && query.status.trim() ? query.status.trim() : 'all'
  const search = typeof query.q === 'string' && query.q.trim() ? query.q.trim() : null
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 50))

  let whereClauses: string[] = []
  let params: any[] = []

  if (status && status !== 'all') {
    whereClauses.push('status = ?')
    params.push(status)
  }

  if (search) {
    whereClauses.push('(order_code LIKE ? OR client_name LIKE ? OR client_phone LIKE ? OR product_label LIKE ?)')
    const s = `%${search}%`
    params.push(s, s, s, s)
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : ''

  const [ordersRes, bookingsRes, statsRes] = await Promise.all([
    db.prepare(`
      SELECT id, order_code, client_name, client_phone, client_email,
             product_type, product_id, product_label, amount, status,
             download_url, utm_source, utm_medium, utm_campaign, landing_page,
             created_at, updated_at
      FROM orders
      ${whereSql}
      ORDER BY created_at DESC
      LIMIT ?
    `).bind(...params, limit).all(),

    db.prepare(`
      SELECT id, order_code, client_name, client_phone, service_type,
             booking_date, booking_time, notes, status, deposit_amount,
             total_estimate, created_at
      FROM bookings
      ORDER BY created_at DESC
      LIMIT ?
    `).bind(limit).all(),

    db.prepare(`
      SELECT
        COUNT(*) as total_orders,
        COALESCE(SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END), 0) as paid_revenue,
        COALESCE(SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END), 0) as pending_revenue,
        COALESCE(SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END), 0) as paid_count,
        COALESCE(SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END), 0) as pending_count
      FROM orders
    `).first<{
      total_orders: number
      paid_revenue: number
      pending_revenue: number
      paid_count: number
      pending_count: number
    }>(),
  ])

  return {
    orders: ordersRes.results || [],
    bookings: bookingsRes.results || [],
    stats: statsRes || {
      total_orders: 0,
      paid_revenue: 0,
      pending_revenue: 0,
      paid_count: 0,
      pending_count: 0,
    },
  }
})
