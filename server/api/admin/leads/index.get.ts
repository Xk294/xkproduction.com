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

  const timeRange = typeof query.timeRange === 'string' && query.timeRange.trim() ? query.timeRange.trim() : null

  let whereClauses: string[] = []
  let params: any[] = []

  if (status && status !== 'all') {
    whereClauses.push("COALESCE(status, 'new') = ?")
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

  if (timeRange === 'today') {
    whereClauses.push("created_at >= date('now', 'start of day')")
  } else if (timeRange === '7d') {
    whereClauses.push("created_at >= datetime('now', '-7 days')")
  } else if (timeRange === '30d') {
    whereClauses.push("created_at >= datetime('now', '-30 days')")
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : ''

  const [rows, countRow, statusCountsRaw] = await Promise.all([
    db.prepare(`
      SELECT id, name, phone, email, service, message, ip, source,
             COALESCE(status, 'new') as status, notes, created_at, updated_at
      FROM leads
      ${whereSql}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `).bind(...params, limit, offset).all(),
    db.prepare(`SELECT COUNT(*) as total FROM leads ${whereSql}`).bind(...params).first<{ total: number }>(),
    db.prepare(`
      SELECT COALESCE(status, 'new') as status, COUNT(*) as count
      FROM leads
      GROUP BY status
    `).all<{ status: string; count: number }>(),
  ])

  const statusCounts: Record<string, number> = {
    new: 0,
    contacted: 0,
    quoting: 0,
    booked: 0,
    completed: 0,
    cancelled: 0,
    all: 0,
  }
  let totalAll = 0
  for (const item of (statusCountsRaw?.results || [])) {
    const s = item.status || 'new'
    const c = Number(item.count) || 0
    statusCounts[s] = c
    totalAll += c
  }
  statusCounts.all = totalAll

  return {
    leads: rows.results,
    total: countRow?.total ?? 0,
    status_counts: statusCounts,
    page,
    limit,
  }
})

