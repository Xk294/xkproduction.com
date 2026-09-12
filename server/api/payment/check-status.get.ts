// GET /api/payment/check-status?code=XK8821 — Kiểm tra trạng thái thanh toán đơn hàng

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const code = (query.code as string)?.trim().toUpperCase()

  if (!code || !/^XK\d{4,6}$/i.test(code)) {
    throw createError({ statusCode: 400, message: 'Mã đơn hàng không hợp lệ' })
  }

  const db = getDB(event)
  if (!db) {
    // Local dev fallback: luôn trả pending
    return { status: 'pending' }
  }

  const order = await db.prepare(
    'SELECT status, download_url FROM orders WHERE order_code = ?'
  ).first<{ status: string; download_url: string | null }>(code)

  if (!order) {
    throw createError({ statusCode: 404, message: 'Không tìm thấy đơn hàng' })
  }

  // Chỉ trả download_url khi đã thanh toán xong — không expose link khi còn pending
  return {
    status: order.status,
    ...(order.status === 'paid' && order.download_url ? { download_url: order.download_url } : {}),
  }
})
