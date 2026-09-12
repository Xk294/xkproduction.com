// PATCH /api/admin/orders/:id — Cập nhật trạng thái đơn hàng (paid / cancelled / pending)
export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'Missing order ID' })

  const body = await readBody(event) as { status?: string; download_url?: string }
  if (!body.status && !body.download_url) {
    throw createError({ statusCode: 400, message: 'No fields to update' })
  }

  const db = getDB(event)
  if (!db) throw createError({ statusCode: 503, message: 'Database not available' })

  await ensureSchema(db)

  const updates: string[] = ['updated_at = CURRENT_TIMESTAMP']
  const params: any[] = []

  if (body.status) {
    updates.push('status = ?')
    params.push(body.status)
  }

  if (body.download_url !== undefined) {
    updates.push('download_url = ?')
    params.push(body.download_url)
  }

  params.push(id)

  await db.prepare(`
    UPDATE orders
    SET ${updates.join(', ')}
    WHERE id = ?
  `).bind(...params).run()

  return { success: true, id }
})
