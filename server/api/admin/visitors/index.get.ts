// GET /api/admin/visitors — danh sách visitor logs phân trang
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const db = getDB(event)
  if (!db) throw createError({ statusCode: 503, message: 'Database not available' })

  const query = getQuery(event)
  const page = Math.max(1, Number(query.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 30))
  const offset = (page - 1) * limit

  const filter = typeof query.filter === 'string' ? query.filter : 'all'
  let whereClause = ''
  if (filter === 'human') {
    whereClause = 'WHERE is_bot = 0 OR is_bot IS NULL'
  } else if (filter === 'bot') {
    whereClause = 'WHERE is_bot = 1'
  }

  const [rows, countRow] = await Promise.all([
    db.prepare(`
      SELECT id,
        CASE
          WHEN INSTR(ip, ':') > 0 THEN SUBSTR(ip, 1, INSTR(ip, ':')) || 'xxxx:xxxx:xxxx'
          ELSE SUBSTR(ip, 1, INSTR(ip || '.', '.') - 1) || '.xxx.xxx.xxx'
        END as ip_masked,
        path, visit_count, referrer, utm_source, utm_medium, utm_campaign, utm_content,
        country, city, device, os, browser, is_bot, first_seen_at, last_seen_at
      FROM visitor_logs
      ${whereClause}
      ORDER BY last_seen_at DESC
      LIMIT ? OFFSET ?
    `).bind(limit, offset).all(),
    db.prepare(`SELECT COUNT(*) as total FROM visitor_logs ${whereClause}`).first<{ total: number }>(),
  ])

  return {
    visitors: rows.results,
    total: countRow?.total ?? 0,
    page,
    limit,
  }
})
