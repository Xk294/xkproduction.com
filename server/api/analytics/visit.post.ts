// POST /api/analytics/visit — ghi nhận lượt xem trang (upsert theo IP+path)
export default defineEventHandler(async (event) => {
  const body = await readBody(event) as { path?: string }
  const path = body?.path?.trim()
  if (!path) return { ok: false }

  const db = getDB(event)
  if (!db) return { ok: false }

  await ensureSchema(db)

  const ip = getHeader(event, 'cf-connecting-ip')
    ?? getHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim()
    ?? '0.0.0.0'
  const userAgent = getHeader(event, 'user-agent') ?? null
  const referrer = getHeader(event, 'referer') ?? null

  await db.prepare(`
    INSERT INTO visitor_logs (ip, path, user_agent, referrer, visit_count, first_seen_at, last_seen_at)
    VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT(ip, path) DO UPDATE SET
      visit_count = visit_count + 1,
      last_seen_at = CURRENT_TIMESTAMP
  `).bind(ip, path, userAgent, referrer).run()

  return { ok: true }
})
