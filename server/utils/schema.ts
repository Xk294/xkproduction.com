export interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement
  first<T = unknown>(colName?: string): Promise<T | null>
  run<T = unknown>(): Promise<{ success: boolean; meta: any }>
  all<T = unknown>(): Promise<{ success: boolean; results: T[]; meta: any }>
  raw<T = unknown>(): Promise<T[]>
}

export interface D1Database {
  exec(query: string): Promise<any>
  prepare(query: string): D1PreparedStatement
}

let schemaEnsured = false
let schemaPromise: Promise<void> | null = null

/**
 * Lazy, idempotent migration check. Ensures columns exist without crashing.
 * Caches in worker memory so it executes at most once per isolate.
 */
export async function ensureSchema(db: D1Database | undefined): Promise<void> {
  if (!db || schemaEnsured) return
  if (schemaPromise) return schemaPromise

  schemaPromise = (async () => {
    try {
      // 1. Check visitor_logs columns
      const visitorInfo = await db.prepare('PRAGMA table_info(visitor_logs)').all<{ name: string }>()
      const visitorCols = new Set((visitorInfo.results ?? []).map((r) => r.name))

      if (visitorCols.size > 0) {
        if (!visitorCols.has('utm_source')) {
          await db.prepare('ALTER TABLE visitor_logs ADD COLUMN utm_source TEXT').run().catch(() => {})
        }
        if (!visitorCols.has('utm_medium')) {
          await db.prepare('ALTER TABLE visitor_logs ADD COLUMN utm_medium TEXT').run().catch(() => {})
        }
        if (!visitorCols.has('utm_campaign')) {
          await db.prepare('ALTER TABLE visitor_logs ADD COLUMN utm_campaign TEXT').run().catch(() => {})
        }
        if (!visitorCols.has('utm_content')) {
          await db.prepare('ALTER TABLE visitor_logs ADD COLUMN utm_content TEXT').run().catch(() => {})
        }
        if (!visitorCols.has('is_bot')) {
          await db.prepare('ALTER TABLE visitor_logs ADD COLUMN is_bot INTEGER NOT NULL DEFAULT 0').run().catch(() => {})
        }
        if (!visitorCols.has('country')) {
          await db.prepare('ALTER TABLE visitor_logs ADD COLUMN country TEXT').run().catch(() => {})
        }
        if (!visitorCols.has('city')) {
          await db.prepare('ALTER TABLE visitor_logs ADD COLUMN city TEXT').run().catch(() => {})
        }
        if (!visitorCols.has('device')) {
          await db.prepare('ALTER TABLE visitor_logs ADD COLUMN device TEXT').run().catch(() => {})
        }
        if (!visitorCols.has('os')) {
          await db.prepare('ALTER TABLE visitor_logs ADD COLUMN os TEXT').run().catch(() => {})
        }
        if (!visitorCols.has('browser')) {
          await db.prepare('ALTER TABLE visitor_logs ADD COLUMN browser TEXT').run().catch(() => {})
        }
      }

      // 2. Check leads columns
      const leadInfo = await db.prepare('PRAGMA table_info(leads)').all<{ name: string }>()
      const leadCols = new Set((leadInfo.results ?? []).map((r) => r.name))

      if (leadCols.size > 0) {
        if (!leadCols.has('status')) {
          await db.prepare("ALTER TABLE leads ADD COLUMN status TEXT NOT NULL DEFAULT 'new'").run().catch(() => {})
        }
        if (!leadCols.has('notes')) {
          await db.prepare('ALTER TABLE leads ADD COLUMN notes TEXT').run().catch(() => {})
        }
        if (!leadCols.has('updated_at')) {
          await db.prepare('ALTER TABLE leads ADD COLUMN updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP').run().catch(() => {})
        }
        if (!leadCols.has('country')) {
          await db.prepare('ALTER TABLE leads ADD COLUMN country TEXT').run().catch(() => {})
        }
        if (!leadCols.has('city')) {
          await db.prepare('ALTER TABLE leads ADD COLUMN city TEXT').run().catch(() => {})
        }
        if (!leadCols.has('device')) {
          await db.prepare('ALTER TABLE leads ADD COLUMN device TEXT').run().catch(() => {})
        }
        if (!leadCols.has('os')) {
          await db.prepare('ALTER TABLE leads ADD COLUMN os TEXT').run().catch(() => {})
        }
        if (!leadCols.has('browser')) {
          await db.prepare('ALTER TABLE leads ADD COLUMN browser TEXT').run().catch(() => {})
        }
        if (!leadCols.has('utm_source')) {
          await db.prepare('ALTER TABLE leads ADD COLUMN utm_source TEXT').run().catch(() => {})
        }
        if (!leadCols.has('utm_medium')) {
          await db.prepare('ALTER TABLE leads ADD COLUMN utm_medium TEXT').run().catch(() => {})
        }
        if (!leadCols.has('utm_campaign')) {
          await db.prepare('ALTER TABLE leads ADD COLUMN utm_campaign TEXT').run().catch(() => {})
        }
        if (!leadCols.has('utm_content')) {
          await db.prepare('ALTER TABLE leads ADD COLUMN utm_content TEXT').run().catch(() => {})
        }
        if (!leadCols.has('landing_page')) {
          await db.prepare('ALTER TABLE leads ADD COLUMN landing_page TEXT').run().catch(() => {})
        }
      }

      // 3. Check events columns
      const eventInfo = await db.prepare('PRAGMA table_info(events)').all<{ name: string }>()
      const eventCols = new Set((eventInfo.results ?? []).map((r) => r.name))
      if (eventCols.size > 0) {
        if (!eventCols.has('device')) {
          await db.prepare('ALTER TABLE events ADD COLUMN device TEXT').run().catch(() => {})
        }
      }

      schemaEnsured = true
    } catch (err) {
      console.warn('[schema] ensureSchema warning:', err)
    } finally {
      schemaPromise = null
    }
  })()

  return schemaPromise
}

export function getDB(event: Parameters<typeof getHeader>[0]): D1Database | undefined {
  return (event.context.cloudflare?.env as Record<string, unknown>)?.DB as D1Database | undefined
}

