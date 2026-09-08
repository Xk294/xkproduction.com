// POST /api/contact — lưu lead vào D1 + gửi Telegram notification
export default defineEventHandler(async (event) => {
  const body = await readBody(event) as LeadPayload
  return await processLead(event, body)
})
