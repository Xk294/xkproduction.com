/**
 * GET /api/admin/traffic-sources
 * Real inbound channel breakdown from visitor_logs (UTM + Referrer).
 * Admin only.
 * Query: ?range=30 (days, 1–365)
 */
import { requireAdmin } from '../../../utils/auth'
import { ensureSchema, getDB } from '../../../utils/schema'

export interface TrafficSourceItem {
  source: string
  count: number
  percentage: number
  type: 'utm' | 'referrer' | 'direct' | 'search' | 'social' | 'qr'
}

function cleanReferrerDomain(source: string): string {
  if (!source || source === 'direct' || source.startsWith('UTM ·') || source.startsWith('UTM -')) {
    return source
  }
  if (!source.includes('/') && !source.includes(':')) {
    return source
  }
  try {
    const url = new URL(source.startsWith('http') ? source : `https://${source}`)
    let host = url.hostname.toLowerCase()
    if (host.startsWith('www.')) host = host.slice(4)
    return host
  } catch {
    return source.replace(/^https?:\/\//, '').split('/')[0] || source
  }
}

function classifySource(source: string): TrafficSourceItem['type'] {
  if (!source || source === 'direct') return 'direct'
  if (source.startsWith('UTM ·') || source.startsWith('UTM -') || source.startsWith('utm_')) return 'utm'
  if (/google|bing|coccoc|yahoo|duckduck|perplexity|yandex/.test(source)) return 'search'
  if (/facebook|zalo|twitter|instagram|tiktok|threads|linkedin|youtube/.test(source)) return 'social'
  if (source.includes('qr') || source.includes('standee')) return 'qr'
  return 'referrer'
}

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const query = getQuery(event)
  const rangeParam = typeof query.range === 'string' ? parseInt(query.range, 10) : 30
  const range = isNaN(rangeParam) || rangeParam <= 0 ? 30 : Math.min(rangeParam, 365)

  const db = getDB(event)
  if (!db) {
    if (process.dev) {
      return {
        ok: true,
        range,
        total: 0,
        non_bot_total: 0,
        sources: [
          { source: 'direct', count: 128, percentage: 72, type: 'direct' },
          { source: 'UTM · zalo', count: 24, percentage: 14, type: 'utm' },
          { source: 'facebook', count: 12, percentage: 7, type: 'social' },
          { source: 'google', count: 8, percentage: 5, type: 'search' },
          { source: 'coccoc.com', count: 4, percentage: 2, type: 'search' },
        ],
      }
    }
    throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })
  }

  await ensureSchema(db)

  try {
    // IP-level attribution CTE
    const querySql = `
      WITH ip_channel AS (
        SELECT
          ip,
          MAX(CASE WHEN utm_source IS NOT NULL AND utm_source != '' THEN 'UTM · ' || utm_source ELSE NULL END) as utm_ch,
          MAX(CASE
            WHEN referrer LIKE '%google%' THEN 'google'
            WHEN referrer LIKE '%threads%' THEN 'l.threads.com'
            WHEN referrer LIKE '%coccoc%' THEN 'coccoc.com'
            WHEN referrer LIKE '%facebook%' OR referrer LIKE '%fb.com%' THEN 'facebook'
            WHEN referrer LIKE '%bing%' THEN 'bing'
            WHEN referrer LIKE '%yahoo%' THEN 'search.yahoo.com'
            WHEN referrer LIKE '%duckduckgo%' THEN 'duckduckgo.com'
            WHEN referrer LIKE '%zalo%' THEN 'zalo'
            WHEN referrer LIKE '%twitter%' OR referrer LIKE '%t.co%' OR referrer LIKE '%x.com%' THEN 'twitter'
            WHEN referrer LIKE '%tiktok%' THEN 'tiktok'
            WHEN referrer LIKE '%youtube%' OR referrer LIKE '%youtu.be%' THEN 'youtube'
            WHEN referrer LIKE '%instagram%' THEN 'instagram'
            WHEN referrer LIKE '%perplexity%' THEN 'perplexity'
            WHEN referrer LIKE '%chatgpt%' OR referrer LIKE '%chat.openai%' THEN 'chatgpt'
            WHEN referrer IS NOT NULL AND referrer != ''
                 AND referrer NOT LIKE '%xkproduction.com%'
                 AND referrer NOT LIKE '%.pages.dev%'
                 AND referrer NOT LIKE '%localhost%'
                 AND referrer NOT LIKE '%127.0.0.1%' THEN referrer
            ELSE NULL
          END) as ref_ch,
          SUM(visit_count) as visits
        FROM visitor_logs
        WHERE path NOT LIKE '/admin%'
          AND (is_bot IS NULL OR is_bot = 0)
          AND last_seen_at >= datetime('now', '-' || ? || ' days')
        GROUP BY ip
      )
      SELECT
        COALESCE(utm_ch, ref_ch, 'direct') as raw_source,
        SUM(visits) as count
      FROM ip_channel
      GROUP BY raw_source
      ORDER BY count DESC
    `

    let rawRows: Array<{ raw_source: string; count: number }> = []
    try {
      const res = await db.prepare(querySql).bind(range).all<{ raw_source: string; count: number }>()
      rawRows = res.results ?? []
    } catch {
      // Fallback query without CTE
      const fallbackRes = await db.prepare(`
        SELECT
          COALESCE(CASE WHEN utm_source IS NOT NULL AND utm_source != '' THEN 'UTM · ' || utm_source ELSE NULL END, referrer, 'direct') as raw_source,
          SUM(visit_count) as count
        FROM visitor_logs
        WHERE path NOT LIKE '/admin%'
          AND (is_bot IS NULL OR is_bot = 0)
          AND last_seen_at >= datetime('now', '-' || ? || ' days')
        GROUP BY raw_source
        ORDER BY count DESC
      `).bind(range).all<{ raw_source: string; count: number }>()
      rawRows = fallbackRes.results ?? []
    }

    // Merge and clean domains
    const aggregated = new Map<string, number>()
    for (const r of rawRows) {
      const cleaned = cleanReferrerDomain(r.raw_source)
      aggregated.set(cleaned, (aggregated.get(cleaned) ?? 0) + r.count)
    }

    const totalCount = Array.from(aggregated.values()).reduce((a, b) => a + b, 0)

    const sources: TrafficSourceItem[] = Array.from(aggregated.entries())
      .map(([source, count]) => {
        const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0
        return {
          source,
          count,
          percentage,
          type: classifySource(source),
        }
      })
      .sort((a, b) => b.count - a.count)

    return {
      ok: true,
      range,
      total: totalCount,
      non_bot_total: totalCount,
      sources,
    }
  } catch (err: any) {
    console.error('[traffic-sources] Query error:', err)
    return {
      ok: false,
      error: err.message || 'Internal database error',
      range,
      total: 0,
      non_bot_total: 0,
      sources: [],
    }
  }
})
