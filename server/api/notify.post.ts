// POST /api/notify — lưu lead vào D1 + gửi Telegram notification (dùng cho BookingFlow, Mix-online, B2B, Index)
export default defineEventHandler(async (event) => {
  const body = await readBody(event) as LeadPayload
  return await processLead(event, body)
})
