// GET /api/admin/events/music-stats — thống kê lượt nghe demo & chuyển đổi CTA
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const db = getDB(event)
  if (!db) throw createError({ statusCode: 503, message: 'Database not available' })

  await ensureSchema(db)

  const [topDemos, topCtas, totalPlays, totalCtas, conversionActions] = await Promise.all([
    db.prepare(`
      SELECT label as title, COUNT(*) as play_count, MAX(created_at) as last_played_at
      FROM events
      WHERE action = 'audio_play' AND label IS NOT NULL
      GROUP BY label
      ORDER BY play_count DESC
      LIMIT 15
    `).all<{ title: string; play_count: number; last_played_at: string }>(),
    db.prepare(`
      SELECT label as button_name, COUNT(*) as click_count, MAX(created_at) as last_clicked_at
      FROM events
      WHERE action IN ('cta_click', 'contact_click', 'zalo_click', 'call_click', 'messenger_click') AND label IS NOT NULL
      GROUP BY label
      ORDER BY click_count DESC
      LIMIT 15
    `).all<{ button_name: string; click_count: number; last_clicked_at: string }>(),
    db.prepare(`SELECT COUNT(*) as count FROM events WHERE action = 'audio_play'`).first<{ count: number }>(),
    db.prepare(`SELECT COUNT(*) as count FROM events WHERE action IN ('cta_click', 'contact_click', 'zalo_click', 'call_click', 'messenger_click')`).first<{ count: number }>(),
    db.prepare(`
      SELECT action, COUNT(*) as count
      FROM events
      WHERE action IN ('zalo_click', 'call_click', 'messenger_click', 'cta_click')
      GROUP BY action
    `).all<{ action: string; count: number }>(),
  ])

  const convMap: Record<string, number> = {
    zalo_click: 0,
    call_click: 0,
    messenger_click: 0,
    cta_click: 0,
  }
  for (const item of (conversionActions.results || [])) {
    convMap[item.action] = item.count
  }

  return {
    ok: true,
    total_plays: totalPlays?.count ?? 0,
    total_ctas: totalCtas?.count ?? 0,
    conversion_breakdown: convMap,
    top_demos: topDemos.results ?? [],
    top_ctas: topCtas.results ?? [],
  }
})
