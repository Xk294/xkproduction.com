// POST /api/analytics/visit — ghi nhận lượt xem trang (upsert theo IP+path kèm UTM, referrer, is_bot)
export default defineEventHandler(async (event) => {
  const body = await readBody(event) as {
    path?: string
    referrer?: string | null
    utm_source?: string | null
    utm_medium?: string | null
    utm_campaign?: string | null
    utm_content?: string | null
  }
  const path = body?.path?.trim()
  if (!path) return { ok: false }

  const db = getDB(event)
  if (!db) return { ok: false }

  await ensureSchema(db)

  const ip = getHeader(event, 'cf-connecting-ip')
    ?? getHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim()
    ?? '0.0.0.0'
  const userAgent = getHeader(event, 'user-agent') ?? null
  const headerReferrer = getHeader(event, 'referer') ?? null
  const rawReferrer = (body?.referrer || headerReferrer || '').trim()
  const referrer = rawReferrer ? rawReferrer.slice(0, 500) : null
  const utmSource = body?.utm_source?.trim()?.slice(0, 100) || null
  const utmMedium = body?.utm_medium?.trim()?.slice(0, 100) || null
  const utmCampaign = body?.utm_campaign?.trim()?.slice(0, 100) || null
  const utmContent = body?.utm_content?.trim()?.slice(0, 100) || null

  const cfCity = getHeader(event, 'cf-ipcity')
  const cfCountry = getHeader(event, 'cf-ipcountry')
  const { city, country } = cleanGeoLocation(cfCity, cfCountry)
  const { device, os, browser, isBot } = parseUserAgent(userAgent)
  const isBotInt = isBot ? 1 : 0

  await db.prepare(`
    INSERT INTO visitor_logs (
      ip, path, user_agent, referrer, utm_source, utm_medium, utm_campaign, utm_content,
      country, city, device, os, browser, is_bot, visit_count, first_seen_at, last_seen_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT(ip, path) DO UPDATE SET
      visit_count = visit_count + 1,
      user_agent = COALESCE(excluded.user_agent, visitor_logs.user_agent),
      referrer = COALESCE(visitor_logs.referrer, excluded.referrer),
      utm_source = COALESCE(visitor_logs.utm_source, excluded.utm_source),
      utm_medium = COALESCE(visitor_logs.utm_medium, excluded.utm_medium),
      utm_campaign = COALESCE(visitor_logs.utm_campaign, excluded.utm_campaign),
      utm_content = COALESCE(visitor_logs.utm_content, excluded.utm_content),
      country = COALESCE(excluded.country, visitor_logs.country),
      city = COALESCE(excluded.city, visitor_logs.city),
      device = COALESCE(excluded.device, visitor_logs.device),
      os = COALESCE(excluded.os, visitor_logs.os),
      browser = COALESCE(excluded.browser, visitor_logs.browser),
      is_bot = excluded.is_bot,
      last_seen_at = CURRENT_TIMESTAMP
  `).bind(
    ip, path, userAgent, referrer, utmSource, utmMedium, utmCampaign, utmContent,
    country, city, device, os, browser, isBotInt
  ).run()

  return { ok: true }
})

