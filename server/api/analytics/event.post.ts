// POST /api/analytics/event — log hành vi người dùng (click Zalo, nghe demo, v.v.)
export default defineEventHandler(async (event) => {
  const body = await readBody(event) as { action?: string; label?: string; page?: string }
  const { action, label, page } = body

  if (!action?.trim()) return { ok: false }

  const db = getDB(event)
  if (!db) return { ok: false }

  await ensureSchema(db)

  const ip = getHeader(event, 'cf-connecting-ip')
    ?? getHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim()
    ?? '0.0.0.0'
  const userAgent = getHeader(event, 'user-agent') ?? null
  const { device } = parseUserAgent(userAgent)

  await db.prepare(
    `INSERT INTO events (ip, action, label, page, device) VALUES (?, ?, ?, ?, ?)`
  ).bind(ip, action.trim(), label?.trim() || null, page?.trim() || null, device).run()

  return { ok: true }
})
