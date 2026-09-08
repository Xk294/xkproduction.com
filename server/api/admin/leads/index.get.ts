// GET /api/admin/leads — danh sách leads kèm bộ lọc, tìm kiếm, status & notes
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const db = getDB(event)
  if (!db) throw createError({ statusCode: 503, message: 'Database not available' })

  await ensureSchema(db)

  const query = getQuery(event)
  const page = Math.max(1, Number(query.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 50))
  const offset = (page - 1) * limit
  const status = typeof query.status === 'string' && query.status.trim() ? query.status.trim() : null
  const service = typeof query.service === 'string' && query.service.trim() ? query.service.trim() : null
  const search = typeof query.q === 'string' && query.q.trim() ? query.q.trim() : null

  let whereClauses: string[] = []
  let params: any[] = []

  if (status && status !== 'all') {
    whereClauses.push('status = ?')
    params.push(status)
  }

  if (service && service !== 'all') {
    whereClauses.push('service = ?')
    params.push(service)
  }

  if (search) {
    whereClauses.push('(name LIKE ? OR phone LIKE ? OR email LIKE ? OR notes LIKE ?)')
    const s = `%${search}%`
    params.push(s, s, s, s)
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : ''

  const [rows, countRow] = await Promise.all([
    db.prepare(`
      SELECT id, name, phone, email, service, message, ip, source,
             COALESCE(status, 'new') as status, notes, created_at, updated_at
      FROM leads
      ${whereSql}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `).bind(...params, limit, offset).all(),
    db.prepare(`SELECT COUNT(*) as total FROM leads ${whereSql}`).bind(...params).first<{ total: number }>(),
  ])

  return {
    leads: rows.results,
    total: countRow?.total ?? 0,
    page,
    limit,
  }
})

