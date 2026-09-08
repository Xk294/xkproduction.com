// GET /api/admin/overview — KPI tổng quan cho dashboard
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const db = getDB(event)
  if (!db) throw createError({ statusCode: 503, message: 'Database not available' })

  await ensureSchema(db)

  const [
    totalVisitors,
    totalLeads,
    totalEvents,
    totalAudioPlays,
    topPages,
    recentLeads,
    leadsByService,
    leadsByStatus,
  ] = await Promise.all([
    db.prepare(`SELECT COALESCE(SUM(visit_count), 0) as count FROM visitor_logs WHERE is_bot = 0 OR is_bot IS NULL`).first<{ count: number }>(),
    db.prepare(`SELECT COUNT(*) as count FROM leads`).first<{ count: number }>(),
    db.prepare(`SELECT COUNT(*) as count FROM events`).first<{ count: number }>(),
    db.prepare(`SELECT COUNT(*) as count FROM events WHERE action = 'audio_play'`).first<{ count: number }>(),
    db.prepare(`
      SELECT path, SUM(visit_count) as visits
      FROM visitor_logs
      WHERE path NOT LIKE '/admin%'
      GROUP BY path
      ORDER BY visits DESC
      LIMIT 8
    `).all<{ path: string; visits: number }>(),
    db.prepare(`
      SELECT id, name, phone, email, service, source, COALESCE(status, 'new') as status, notes, created_at
      FROM leads
      ORDER BY created_at DESC
      LIMIT 10
    `).all<{ id: number; name: string; phone: string; email: string | null; service: string | null; source: string; status: string; notes: string | null; created_at: string }>(),
    db.prepare(`
      SELECT service, COUNT(*) as count
      FROM leads
      WHERE service IS NOT NULL
      GROUP BY service
      ORDER BY count DESC
    `).all<{ service: string; count: number }>(),
    db.prepare(`
      SELECT COALESCE(status, 'new') as status, COUNT(*) as count
      FROM leads
      GROUP BY status
    `).all<{ status: string; count: number }>(),
  ])

  return {
    total_visitors: totalVisitors?.count ?? 0,
    total_leads: totalLeads?.count ?? 0,
    total_events: totalEvents?.count ?? 0,
    total_audio_plays: totalAudioPlays?.count ?? 0,
    top_pages: topPages.results,
    recent_leads: recentLeads.results,
    leads_by_service: leadsByService.results,
    leads_by_status: leadsByStatus.results,
  }
})
