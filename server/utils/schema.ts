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

// Schema is managed through schema.sql (npm run db.push / npm run db.init.local)
// Running DDL inside edge request handlers adds latency and consumes quota.
export async function ensureSchema(_db: D1Database | undefined): Promise<void> {
  // No-op for runtime performance
}

export function getDB(event: Parameters<typeof getHeader>[0]): D1Database | undefined {
  return (event.context.cloudflare?.env as Record<string, unknown>)?.DB as D1Database | undefined
}
