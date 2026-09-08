// PATCH /api/admin/leads/:id — cập nhật trạng thái & ghi chú của lead (CRM)
import { requireAdmin } from '../../../utils/auth'
import { ensureSchema, getDB } from '../../../utils/schema'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const id = Number(event.context.params?.id)
  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid lead ID' })
  }

  const body = await readBody(event) as { status?: string; notes?: string }
  const db = getDB(event)
  if (!db) throw createError({ statusCode: 503, message: 'Database not available' })

  await ensureSchema(db)

  const allowedStatuses = ['new', 'contacted', 'quoting', 'booked', 'completed', 'cancelled']
  const updates: string[] = []
  const params: any[] = []

  if (body.status !== undefined) {
    if (!allowedStatuses.includes(body.status)) {
      throw createError({ statusCode: 400, message: 'Invalid status value' })
    }
    updates.push('status = ?')
    params.push(body.status)
  }

  if (body.notes !== undefined) {
    updates.push('notes = ?')
    params.push(body.notes)
  }

  if (updates.length === 0) {
    return { ok: true }
  }

  updates.push('updated_at = CURRENT_TIMESTAMP')
  params.push(id)

  await db.prepare(`
    UPDATE leads
    SET ${updates.join(', ')}
    WHERE id = ?
  `).bind(...params).run()

  return { ok: true }
})
