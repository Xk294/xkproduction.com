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
    devicesRaw,
    locationsRaw,
    channelsRaw,
    dailyTrendRaw,
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
      SELECT id, name, phone, email, service, source, COALESCE(status, 'new') as status,
             notes, city, country, device, utm_source, utm_campaign, created_at
      FROM leads
      ORDER BY created_at DESC
      LIMIT 10
    `).all<{
      id: number; name: string; phone: string; email: string | null; service: string | null;
      source: string; status: string; notes: string | null; city: string | null; country: string | null;
      device: string | null; utm_source: string | null; utm_campaign: string | null; created_at: string
    }>(),
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
    db.prepare(`
      SELECT COALESCE(device, 'desktop') as device, SUM(visit_count) as count
      FROM visitor_logs
      WHERE is_bot = 0 OR is_bot IS NULL
      GROUP BY device
      ORDER BY count DESC
    `).all<{ device: string; count: number }>(),
    db.prepare(`
      SELECT COALESCE(city, 'Chưa rõ') as city, COALESCE(country, 'VN') as country, SUM(visit_count) as visits
      FROM visitor_logs
      WHERE (is_bot = 0 OR is_bot IS NULL) AND city IS NOT NULL AND city != ''
      GROUP BY city
      ORDER BY visits DESC
      LIMIT 6
    `).all<{ city: string; country: string; visits: number }>(),
    db.prepare(`
      SELECT COALESCE(utm_source, source, 'direct') as channel, COUNT(*) as lead_count
      FROM leads
      GROUP BY channel
      ORDER BY lead_count DESC
      LIMIT 5
    `).all<{ channel: string; lead_count: number }>(),
    db.prepare(`
      WITH dates AS (
        SELECT date('now', '-6 days') as dt
        UNION ALL SELECT date('now', '-5 days')
        UNION ALL SELECT date('now', '-4 days')
        UNION ALL SELECT date('now', '-3 days')
        UNION ALL SELECT date('now', '-2 days')
        UNION ALL SELECT date('now', '-1 days')
        UNION ALL SELECT date('now')
      )
      SELECT
        dates.dt as date,
        COALESCE((
          SELECT SUM(visit_count)
          FROM visitor_logs
          WHERE date(last_seen_at) = dates.dt
            AND (is_bot = 0 OR is_bot IS NULL)
        ), 0) as visits,
        COALESCE((
          SELECT COUNT(*)
          FROM leads
          WHERE date(created_at) = dates.dt
        ), 0) as leads
      FROM dates
    `).all<{ date: string; visits: number; leads: number }>().catch(() => ({ results: [] })),
  ])

  const visitorsCount = totalVisitors?.count ?? 0
  const leadsCount = totalLeads?.count ?? 0
  const leadCr = visitorsCount > 0 ? ((leadsCount / visitorsCount) * 100).toFixed(1) : '0.0'
  const audioCr = visitorsCount > 0 ? (((totalAudioPlays?.count ?? 0) / visitorsCount) * 100).toFixed(1) : '0.0'

  return {
    total_visitors: visitorsCount,
    total_leads: leadsCount,
    total_events: totalEvents?.count ?? 0,
    total_audio_plays: totalAudioPlays?.count ?? 0,
    lead_conversion_rate: leadCr,
    audio_engagement_rate: audioCr,
    top_pages: topPages.results,
    recent_leads: recentLeads.results,
    leads_by_service: leadsByService.results,
    leads_by_status: leadsByStatus.results,
    device_breakdown: devicesRaw.results ?? [],
    top_locations: locationsRaw.results ?? [],
    top_channels: channelsRaw.results ?? [],
    daily_trend: dailyTrendRaw?.results ?? [],
  }
})
