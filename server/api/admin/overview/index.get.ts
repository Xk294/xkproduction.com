// GET /api/admin/overview — KPI tổng quan cho dashboard
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const db = getDB(event)
  if (!db) throw createError({ statusCode: 503, message: 'Database not available' })

  await ensureSchema(db)

  const [totalVisitors, totalLeads, totalEvents, topPages, recentLeads, leadsByService] = await Promise.all([
    db.prepare(`SELECT COALESCE(SUM(visit_count), 0) as count FROM visitor_logs`).first<{ count: number }>(),
    db.prepare(`SELECT COUNT(*) as count FROM leads`).first<{ count: number }>(),
    db.prepare(`SELECT COUNT(*) as count FROM events`).first<{ count: number }>(),
    db.prepare(`
      SELECT path, SUM(visit_count) as visits
      FROM visitor_logs
      GROUP BY path
      ORDER BY visits DESC
      LIMIT 8
    `).all<{ path: string; visits: number }>(),
    db.prepare(`
      SELECT id, name, phone, service, source, created_at
      FROM leads
      ORDER BY created_at DESC
      LIMIT 10
    `).all<{ id: number; name: string; phone: string; service: string | null; source: string; created_at: string }>(),
    db.prepare(`
      SELECT service, COUNT(*) as count
      FROM leads
      WHERE service IS NOT NULL
      GROUP BY service
      ORDER BY count DESC
    `).all<{ service: string; count: number }>(),
  ])

  return {
    total_visitors: totalVisitors?.count ?? 0,
    total_leads: totalLeads?.count ?? 0,
    total_events: totalEvents?.count ?? 0,
    top_pages: topPages.results,
    recent_leads: recentLeads.results,
    leads_by_service: leadsByService.results,
  }
})
