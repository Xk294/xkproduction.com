// GET /api/admin/leads — danh sách leads phân trang
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const db = getDB(event)
  if (!db) throw createError({ statusCode: 503, message: 'Database not available' })

  const query = getQuery(event)
  const page = Math.max(1, Number(query.page) || 1)
  const limit = Math.min(50, Math.max(1, Number(query.limit) || 20))
  const offset = (page - 1) * limit

  const [rows, countRow] = await Promise.all([
    db.prepare(`
      SELECT id, name, phone, email, service, message, ip, source, created_at
      FROM leads
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `).bind(limit, offset).all(),
    db.prepare(`SELECT COUNT(*) as total FROM leads`).first<{ total: number }>(),
  ])

  return {
    leads: rows.results,
    total: countRow?.total ?? 0,
    page,
    limit,
  }
})
