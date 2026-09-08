// GET /api/admin/events — thống kê sự kiện hành vi
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const db = getDB(event)
  if (!db) throw createError({ statusCode: 503, message: 'Database not available' })

  const [byAction, byPage, recent] = await Promise.all([
    db.prepare(`
      SELECT action, COUNT(*) as count
      FROM events
      GROUP BY action
      ORDER BY count DESC
      LIMIT 20
    `).all<{ action: string; count: number }>(),
    db.prepare(`
      SELECT page, COUNT(*) as count
      FROM events
      WHERE page IS NOT NULL
      GROUP BY page
      ORDER BY count DESC
      LIMIT 10
    `).all<{ page: string; count: number }>(),
    db.prepare(`
      SELECT action, label, page, created_at
      FROM events
      ORDER BY created_at DESC
      LIMIT 20
    `).all<{ action: string; label: string | null; page: string | null; created_at: string }>(),
  ])

  return {
    by_action: byAction.results,
    by_page: byPage.results,
    recent: recent.results,
  }
})
