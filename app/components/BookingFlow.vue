<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const step = ref(1)

interface ServiceItem {
  id: string
  name: string
  price: number
  duration: string
  icon: string
  desc: string
  popular?: boolean
}

const services: ServiceItem[] = [
  {
    id: 'thu-am',
    name: 'Thu Âm Bài Hát',
    price: 499000,
    duration: '2.5 giờ / ca',
    icon: 'fa-microphone',
    desc: 'Phòng tiêu âm chuẩn quốc tế, micro condenser, kèm vocal coaching',
    popular: true
  },
  {
    id: 'mix-master',
    name: 'Mixing & Mastering',
    price: 350000,
    duration: '2-3 ngày',
    icon: 'fa-sliders',
    desc: 'Vocal tuning tự nhiên, cân bằng âm sắc, chuẩn Spotify -14 LUFS'
  },
  {
    id: 'hoa-am',
    name: 'Hoà Âm Phối Khí',
    price: 2000000,
    duration: '5-7 ngày',
    icon: 'fa-keyboard',
    desc: 'Sáng tác bản phối mới độc bản 100% theo quãng giọng và cá tính'
  },
  {
    id: 'mix-online',
    name: 'Mix & Master Online',
    price: 500000,
    duration: '48 giờ',
    icon: 'fa-cloud-arrow-up',
    desc: 'Gửi stems qua mạng, nhận bản master phát hành số sau 48h'
  },
  {
    id: 'combo',
    name: 'Gói Combo Sản Xuất',
    price: 2800000,
    duration: 'Trọn gói A-Z',
    icon: 'fa-compact-disc',
    desc: 'Thu âm không giới hạn + Phối khí độc quyền + Mix & Master hoàn thiện',
    popular: true
  },
  {
    id: 'tu-van',
    name: 'Tư Vấn Concept / Khác',
    price: 0,
    duration: 'Linh hoạt',
    icon: 'fa-comments',
    desc: 'Trao đổi định hướng âm nhạc hoặc dự án đặc thù'
  }
]

const addons = ref([
  { id: 'video', name: 'Quay video clip 4K trong studio (TikTok/Reels)', price: 300000, selected: false },
  { id: 'rush', name: 'Ưu tiên sản xuất siêu tốc 24h–48h', price: 250000, selected: false },
  { id: 'stems', name: 'Bàn giao đầy đủ file Multi-track stems', price: 200000, selected: false }
])

const { trackCta, getTrackingPayload } = useAnalytics()

const form = ref({
  service: 'thu-am',
  servicePrice: 499000,
  date: '',
  timeSlot: '14:00 - 16:30',
  name: '',
  phone: '',
  email: '',
  notes: '',
})

const isSubmitting = ref(false)
const errorMsg = ref('')
const bookingId = ref('')

const selectedServiceName = computed(() => {
  const s = services.find(item => item.id === form.value.service)
  return s ? s.name : form.value.service
})

const nextStep = () => {
  if (step.value < 3) step.value++
}

const prevStep = () => {
  if (step.value > 1) step.value--
}

const selectService = (s: ServiceItem) => {
  form.value.service = s.id
  form.value.servicePrice = s.price
}

const canProceedStep1 = computed(() => !!form.value.service)
const canProceedStep2 = computed(() => !!form.value.date && !!form.value.timeSlot)

interface CalendarDay {
  iso: string
  label: string
  dateFormatted: string
  isWeekend: boolean
}

// Calculate upcoming 7 days using local browser date parts to prevent timezone offsets
const calendarDays = computed<CalendarDay[]>(() => {
  const days: CalendarDay[] = []
  const weekdays = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7']
  const now = new Date()
  for (let i = 0; i < 7; i++) {
    const d = new Date()
    d.setDate(now.getDate() + i)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const iso = `${year}-${month}-${day}`
    const label = i === 0 ? 'Hôm nay' : i === 1 ? 'Ngày mai' : (weekdays[d.getDay()] || '')
    const dateFormatted = `${d.getDate()}/${d.getMonth() + 1}`
    const isWeekend = d.getDay() === 0 || d.getDay() === 6
    days.push({
      iso,
      label,
      dateFormatted,
      isWeekend
    })
  }
  return days
})

// Time Slots
const timeSlots = [
  { id: 'morning', time: '09:00 - 11:30', name: 'Ca Sáng', desc: 'Giọng trong, không gian yên tĩnh', status: 'available' },
  { id: 'afternoon', time: '14:00 - 16:30', name: 'Ca Chiều', desc: 'Giờ vàng phòng thu (Phổ biến)', status: 'hot' },
  { id: 'evening', time: '17:30 - 20:00', name: 'Ca Chiều Tối', desc: 'Thích hợp sau giờ làm việc', status: 'available' },
  { id: 'night', time: '20:30 - 23:00', name: 'Ca Đêm', desc: 'Ánh đèn lung linh, cảm xúc thăng hoa', status: 'available' }
]

// Total Price calculation
const calculatedTotal = computed(() => {
  let total = form.value.servicePrice
  addons.value.forEach(a => {
    if (a.selected) total += a.price
  })
  return total
})

const formatCurrency = (val: number) => {
  if (val === 0) return 'Miễn phí'
  return new Intl.NumberFormat('vi-VN').format(val) + '₫'
}

const validatePhone = (phone: string) => {
  const p = phone.replace(/[.\s-]/g, '').replace(/^\+84/, '0')
  return /^(0[3-9]\d{8})$/.test(p)
}

const submitBooking = async () => {
  errorMsg.value = ''
  
  if (!form.value.name || !form.value.phone) {
    errorMsg.value = 'Vui lòng nhập tên và số điện thoại của bạn'
    return
  }
  
  if (!validatePhone(form.value.phone)) {
    errorMsg.value = 'Số điện thoại không hợp lệ (cần đủ 10 chữ số)'
    return
  }

  isSubmitting.value = true
  const cleanPhone = form.value.phone.replace(/[.\s-]/g, '').replace(/^\+84/, '0')
  
  // Generate random booking pass id
  const randomCode = Math.floor(1000 + Math.random() * 9000)
  bookingId.value = `XK-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${randomCode}`

  const selectedAddons = addons.value.filter(a => a.selected).map(a => a.name).join(', ')

  const payload = {
    name: form.value.name,
    phone: cleanPhone,
    email: form.value.email || '',
    service: form.value.service,
    message: `[Mã: ${bookingId.value}] Dịch vụ: ${selectedServiceName.value}. Ca thu: ${form.value.timeSlot} ngày ${form.value.date}. Add-ons: ${selectedAddons || 'Không'}. Dự toán: ${formatCurrency(calculatedTotal.value)}. Ghi chú: ${form.value.notes || 'Không'}`,
    source: 'booking-flow-v4',
    ...getTrackingPayload()
  }
  
  try {
    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    
    if (res.ok) {
      trackCta(`Booking Submit: ${selectedServiceName.value}`)
      step.value = 4 // success
      return
    }
    throw new Error(`API status ${res.status}`)
  } catch (err) {
    console.warn('[booking-flow] Gửi qua internal API thất bại, chuyển fallback Formspree:', err)
    try {
      const config = useRuntimeConfig()
      const endpoint = config.public.formspreeEndpoint
      if (endpoint) {
        const fbRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            ...payload,
            _subject: `[XKProduction Đặt Lịch ${bookingId.value}] ${payload.name} (${payload.phone})`
          })
        })
        if (fbRes.ok) {
          trackCta(`Booking Submit (Fallback): ${selectedServiceName.value}`)
          step.value = 4
          return
        }
      }
    } catch (fbErr) {
      console.error('[booking-flow] Fallback lỗi:', fbErr)
    }
    errorMsg.value = 'Có lỗi gửi thông tin. Bạn hãy liên hệ trực tiếp qua Zalo 0355.356.294 để được giữ slot nhanh nhất!'
  } finally {
    isSubmitting.value = false
  }
}

const resetFlow = () => {
  form.value = {
    service: 'thu-am',
    servicePrice: 499000,
    date: calendarDays.value[0]?.iso || '',
    timeSlot: '14:00 - 16:30',
    name: '',
    phone: '',
    email: '',
    notes: '',
  }
  addons.value.forEach(a => a.selected = false)
  step.value = 1
}

// Calendar & Zalo sync links
const googleCalendarLink = computed(() => {
  if (!form.value.date) return '#'
  const svcName = selectedServiceName.value
  const title = encodeURIComponent(`Lịch thu âm tại XKProduction (${svcName})`)
  const details = encodeURIComponent(`Mã đặt chỗ: ${bookingId.value}\nDịch vụ: ${svcName}\nKhách hàng: ${form.value.name} (${form.value.phone})\nStudio: XKProduction, Thủ Đức, TP. Hồ Chí Minh.\nHotline: 0355.356.294`)
  const location = encodeURIComponent('XKProduction, Thủ Đức, Thành phố Hồ Chí Minh')
  
  let startHour = 14
  if (form.value.timeSlot.includes('09:00')) startHour = 9
  else if (form.value.timeSlot.includes('14:00')) startHour = 14
  else if (form.value.timeSlot.includes('17:30')) startHour = 17
  else if (form.value.timeSlot.includes('20:30')) startHour = 20

  const [y, m, d] = form.value.date.split('-').map(Number)
  const dStart = new Date(y || 2026, (m || 1) - 1, d || 1, startHour, 0, 0)
  const dEnd = new Date(y || 2026, (m || 1) - 1, d || 1, startHour + 2, 30, 0)

  const toIso = (dt: Date) => dt.toISOString().replace(/-|:|\.\d\d\d/g, '')
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${toIso(dStart)}/${toIso(dEnd)}`
})

const zaloConfirmLink = computed(() => {
  const text = encodeURIComponent(
    `Chào XKProduction, mình vừa đặt lịch online mã [${bookingId.value}].\n` +
    `Dịch vụ: ${selectedServiceName.value}\n` +
    `Thời gian: ${form.value.timeSlot} - Ngày: ${form.value.date}\n` +
    `Họ tên: ${form.value.name} - ${form.value.phone}\n` +
    `Nhờ studio xác nhận giúp mình nhé!`
  )
  return `https://zalo.me/0355356294?text=${text}`
})

onMounted(() => {
  if (calendarDays.value[0]) {
    form.value.date = calendarDays.value[0].iso
  }
})
</script>

<template>
  <div class="studio-booking-engine">
    <div class="engine-card glass-card">
      <!-- Top Step Progress Indicator -->
      <div v-if="step <= 3" class="progress-bar-container">
        <div class="step-node" :class="{ active: step === 1, done: step > 1 }">
          <div class="node-circle">
            <i v-if="step > 1" class="fa-solid fa-check"></i>
            <span v-else>1</span>
          </div>
          <span class="node-text">Dịch Vụ &amp; Gói</span>
        </div>
        <div class="node-connector" :class="{ done: step > 1 }"></div>
        <div class="step-node" :class="{ active: step === 2, done: step > 2 }">
          <div class="node-circle">
            <i v-if="step > 2" class="fa-solid fa-check"></i>
            <span v-else>2</span>
          </div>
          <span class="node-text">Chọn Ca Thu</span>
        </div>
        <div class="node-connector" :class="{ done: step > 2 }"></div>
        <div class="step-node" :class="{ active: step === 3 }">
          <div class="node-circle">3</div>
          <span class="node-text">Xác Nhận &amp; Thông Tin</span>
        </div>
      </div>

      <div class="engine-content-split">
        <!-- Left Side: Interactive Step View -->
        <div class="form-interaction-col">
          <Transition name="fade-slide" mode="out-in">
            <!-- ================= STEP 1: SERVICE & ADDONS ================= -->
            <div v-if="step === 1" key="step1" class="step-content-pane">
              <div class="step-header">
                <span class="step-badge">BƯỚC 1/3</span>
                <h3 class="step-title">Bạn Cần Thực Hiện Dịch Vụ Nào?</h3>
                <p class="step-sub">Chọn dịch vụ phòng thu hoặc gói sản xuất âm nhạc bạn mong muốn.</p>
              </div>

              <div class="services-tiles-grid">
                <button
                  v-for="s in services"
                  :key="s.id"
                  type="button"
                  class="service-tile"
                  :class="{ selected: form.service === s.id }"
                  @click="selectService(s)"
                >
                  <div class="tile-top">
                    <div class="tile-icon-box">
                      <i class="fa-solid" :class="s.icon"></i>
                    </div>
                    <span v-if="s.popular" class="popular-chip">PHỔ BIẾN</span>
                  </div>
                  <div class="tile-info">
                    <strong class="tile-name">{{ s.name }}</strong>
                    <span class="tile-price">{{ formatCurrency(s.price) }} · {{ s.duration }}</span>
                    <p class="tile-desc">{{ s.desc }}</p>
                  </div>
                </button>
              </div>

              <!-- Addons Section -->
              <div class="addons-container">
                <span class="addons-heading">TÙY CHỌN BỔ SUNG (NẾU CÓ):</span>
                <div class="addons-options">
                  <label
                    v-for="ad in addons"
                    :key="ad.id"
                    class="addon-pill-item"
                    :class="{ checked: ad.selected }"
                  >
                    <input type="checkbox" v-model="ad.selected" class="sr-only" />
                    <div class="addon-check-indicator">
                      <i v-if="ad.selected" class="fa-solid fa-check"></i>
                    </div>
                    <span class="addon-label-txt">{{ ad.name }}</span>
                    <strong class="addon-cost">+{{ formatCurrency(ad.price) }}</strong>
                  </label>
                </div>
              </div>

              <div class="step-actions">
                <div></div>
                <button class="btn btn-primary" :disabled="!canProceedStep1" @click="nextStep">
                  <span>Tiếp theo: Chọn Thời Gian</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>

            <!-- ================= STEP 2: CALENDAR & TIME SLOTS ================= -->
            <div v-else-if="step === 2" key="step2" class="step-content-pane">
              <div class="step-header">
                <span class="step-badge">BƯỚC 2/3</span>
                <h3 class="step-title">Thời Gian Bạn Muốn Đến Studio?</h3>
                <p class="step-sub">Chọn ngày và ca phòng thu phù hợp nhất với lịch trình của bạn.</p>
              </div>

              <!-- Visual 7-Day Calendar Strip -->
              <div class="visual-calendar-strip">
                <span class="control-sub-label">1. CHỌN NGÀY THU ÂM:</span>
                <div class="calendar-days-row">
                  <button
                    v-for="d in calendarDays"
                    :key="d.iso"
                    type="button"
                    class="calendar-day-btn"
                    :class="{ active: form.date === d.iso, weekend: d.isWeekend }"
                    @click="form.date = d.iso"
                  >
                    <span class="day-label">{{ d.label }}</span>
                    <strong class="day-date">{{ d.dateFormatted }}</strong>
                    <span v-if="d.isWeekend" class="weekend-tag">Cuối tuần</span>
                  </button>
                </div>

                <!-- Fallback manual date input if choosing later date -->
                <div class="other-date-wrap">
                  <label for="manual-date">Hoặc chọn ngày khác xa hơn:</label>
                  <input id="manual-date" type="date" v-model="form.date" class="manual-date-input" />
                </div>
              </div>

              <!-- Time Slots Grid -->
              <div class="time-slots-container">
                <span class="control-sub-label">2. CHỌN CA PHÒNG THU:</span>
                <div class="time-slots-grid">
                  <button
                    v-for="slot in timeSlots"
                    :key="slot.id"
                    type="button"
                    class="time-slot-card"
                    :class="{ selected: form.timeSlot === slot.time }"
                    @click="form.timeSlot = slot.time"
                  >
                    <div class="slot-header">
                      <strong class="slot-time">{{ slot.time }}</strong>
                      <span v-if="slot.status === 'hot'" class="slot-status-hot">Rất Hot</span>
                      <span v-else class="slot-status-avail">🟢 Trống</span>
                    </div>
                    <span class="slot-period">{{ slot.name }}</span>
                    <span class="slot-desc">{{ slot.desc }}</span>
                  </button>
                </div>
              </div>

              <div class="step-actions split">
                <button class="btn btn-secondary" @click="prevStep">
                  <i class="fa-solid fa-arrow-left"></i>
                  <span>Quay lại</span>
                </button>
                <button class="btn btn-primary" :disabled="!canProceedStep2" @click="nextStep">
                  <span>Tiếp theo: Nhập Thông Tin</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>

            <!-- ================= STEP 3: CONTACT & CONFIRMATION ================= -->
            <div v-else-if="step === 3" key="step3" class="step-content-pane">
              <div class="step-header">
                <span class="step-badge">BƯỚC 3/3</span>
                <h3 class="step-title">Thông Tin Nghệ Sĩ / Khách Hàng</h3>
                <p class="step-sub">XKProduction sẽ liên hệ xác nhận ca thu qua Zalo/Điện thoại trong vòng 2 giờ.</p>
              </div>

              <div class="contact-inputs-grid">
                <div class="form-group-premium">
                  <label for="book-name">Họ và tên nghệ sĩ <span class="req">*</span></label>
                  <input id="book-name" v-model="form.name" type="text" placeholder="Ví dụ: Hoàng Anh hoặc Rapper Revan..." required />
                </div>

                <div class="form-group-premium">
                  <label for="book-phone">Số điện thoại / Zalo <span class="req">*</span></label>
                  <input id="book-phone" v-model="form.phone" type="tel" placeholder="09xx.xxx.xxx" required />
                </div>

                <div class="form-group-premium">
                  <label for="book-email">Email (Không bắt buộc)</label>
                  <input id="book-email" v-model="form.email" type="email" placeholder="email@example.com (để nhận file master sau thu)" />
                </div>

                <div class="form-group-premium">
                  <label for="book-notes">Yêu cầu đặc biệt cho ca thu</label>
                  <textarea id="book-notes" v-model="form.notes" rows="3" placeholder="Ví dụ: Đã có sẵn beat MP3, muốn thu 1 bài acoustic, có bạn đi cùng..."></textarea>
                </div>

                <div v-if="errorMsg" class="error-toast">
                  <i class="fa-solid fa-circle-exclamation"></i>
                  <span>{{ errorMsg }}</span>
                </div>
              </div>

              <div class="step-actions split">
                <button class="btn btn-secondary" @click="prevStep">
                  <i class="fa-solid fa-arrow-left"></i>
                  <span>Quay lại</span>
                </button>
                <button class="btn btn-primary btn-pulse" :disabled="isSubmitting" @click="submitBooking">
                  <i v-if="isSubmitting" class="fa-solid fa-spinner fa-spin"></i>
                  <span>{{ isSubmitting ? 'ĐANG ĐĂNG KÝ...' : 'XÁC NHẬN ĐẶT LỊCH STUDIO' }}</span>
                </button>
              </div>
            </div>

            <!-- ================= STEP 4: SUCCESS & TICKET PASS ================= -->
            <div v-else key="step4" class="step-content-pane success-pane">
              <div class="success-icon-badge">
                <i class="fa-solid fa-circle-check"></i>
              </div>
              <h3 class="success-title">Đặt Lịch Ca Thu Thành Công!</h3>
              <p class="success-sub">
                Hệ thống đã gửi thông tin đến Producer Nguyễn Xuân Kiệt. Studio sẽ liên hệ xác nhận ca thu qua Zalo/Điện thoại trong vòng 2 giờ.
              </p>

              <!-- Digital Studio Ticket Pass -->
              <div class="studio-ticket-pass">
                <div class="pass-header">
                  <span class="pass-studio">XKPRODUCTION · STUDIO PASS</span>
                  <span class="pass-id">{{ bookingId }}</span>
                </div>
                <div class="pass-body">
                  <div class="pass-item">
                    <span class="pass-label">DỊCH VỤ:</span>
                    <strong class="pass-val">{{ selectedServiceName }}</strong>
                  </div>
                  <div class="pass-item">
                    <span class="pass-label">THỜI GIAN:</span>
                    <strong class="pass-val">{{ form.timeSlot }} · {{ form.date }}</strong>
                  </div>
                  <div class="pass-item">
                    <span class="pass-label">NGHỆ SĨ:</span>
                    <strong class="pass-val">{{ form.name }} ({{ form.phone }})</strong>
                  </div>
                  <div class="pass-item">
                    <span class="pass-label">ĐỊA ĐIỂM:</span>
                    <span class="pass-val-sub">Thủ Đức, Thành phố Hồ Chí Minh</span>
                  </div>
                </div>
                <div class="pass-footer">
                  <span class="pass-note">Mang theo file beat/nhạc nền trên điện thoại hoặc USB khi đến phòng thu.</span>
                </div>
              </div>

              <!-- Action Integrations -->
              <div class="success-integrations">
                <a :href="zaloConfirmLink" target="_blank" rel="noopener" class="btn btn-primary btn-full-width">
                  <i class="fa-solid fa-comment-dots"></i>
                  <span>Gửi Xác Nhận Lịch Qua Zalo Cho Studio</span>
                </a>
                <a :href="googleCalendarLink" target="_blank" rel="noopener" class="btn btn-secondary btn-full-width">
                  <i class="fa-solid fa-calendar-plus"></i>
                  <span>Lưu Nhắc Hẹn Vào Google Calendar</span>
                </a>
                <button type="button" class="btn-link-simple" @click="resetFlow">
                  <span>Đặt thêm lịch ca khác</span>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Right Side: Live Digital Studio Pass (Preview in Steps 1-3) -->
        <div v-if="step <= 3" class="preview-receipt-col">
          <div class="live-pass-card">
            <div class="pass-top-edge">
              <span class="pass-chip"><i class="fa-solid fa-bolt"></i> STUDIO PASS PREVIEW</span>
              <span class="pass-live-led">LIVE</span>
            </div>

            <div class="pass-main-details">
              <span class="detail-kicker">DỊCH VỤ ĐÃ CHỌN:</span>
              <strong class="detail-service-title">{{ selectedServiceName }}</strong>

              <div class="detail-row">
                <span class="row-label"><i class="fa-solid fa-calendar-days"></i> Ngày thu:</span>
                <span class="row-val">{{ form.date || 'Chưa chọn' }}</span>
              </div>
              <div class="detail-row">
                <span class="row-label"><i class="fa-solid fa-clock"></i> Khung giờ:</span>
                <span class="row-val">{{ form.timeSlot }}</span>
              </div>
              <div class="detail-row">
                <span class="row-label"><i class="fa-solid fa-user-tie"></i> Kỹ sư âm thanh:</span>
                <span class="row-val">Nguyễn Xuân Kiệt</span>
              </div>

              <!-- Selected Addons list -->
              <div v-if="addons.some(a => a.selected)" class="pass-addons-list">
                <span class="row-label">Tùy chọn thêm:</span>
                <ul>
                  <li v-for="a in addons.filter(x => x.selected)" :key="a.id">
                    + {{ a.name }}
                  </li>
                </ul>
              </div>

              <div class="pass-divider-notch">
                <div class="notch left"></div>
                <div class="dash-line"></div>
                <div class="notch right"></div>
              </div>

              <div class="pass-price-summary">
                <span class="price-summary-label">TỔNG DỰ TOÁN TẠM TÍNH:</span>
                <strong class="price-summary-val">{{ formatCurrency(calculatedTotal) }}</strong>
                <span class="price-summary-note">Thanh toán sau khi hoàn thành buổi thu</span>
              </div>
            </div>

            <div class="pass-perks-box">
              <div class="perk-item">
                <i class="fa-solid fa-shield-halved"></i>
                <span>Bảo đảm chất lượng âm thanh 100%</span>
              </div>
              <div class="perk-item">
                <i class="fa-solid fa-water"></i>
                <span>Miễn phí nước uống &amp; không gian nghỉ ngơi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.studio-booking-engine {
  width: 100%;
  margin: 1.5rem 0;
}

.engine-card {
  padding: 2.5rem;
  border-radius: 24px;
  background: linear-gradient(180deg, #0e121d 0%, #080a11 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 1px solid rgba(0, 128, 255, 0.35);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
}

/* Step Progress Indicator */
.progress-bar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 600px;
  margin: 0 auto 2.5rem;
}

.step-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  z-index: 2;
}

.node-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #151a26;
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 800;
  color: #64748b;
  transition: all 0.3s ease;
}

.step-node.active .node-circle {
  background: var(--primary);
  border-color: #38bdf8;
  color: #fff;
  box-shadow: 0 0 16px rgba(0, 128, 255, 0.4);
}

.step-node.done .node-circle {
  background: var(--teal);
  border-color: var(--teal);
  color: #06080d;
}

.node-text {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
}

.step-node.active .node-text {
  color: #fff;
}

.step-node.done .node-text {
  color: var(--teal);
}

.node-connector {
  flex: 1;
  height: 2px;
  background: rgba(255, 255, 255, 0.08);
  margin: 0 0.5rem;
  position: relative;
  top: -12px;
}

.node-connector.done {
  background: var(--teal);
}

/* Split Content */
.engine-content-split {
  display: grid;
  grid-template-columns: 1.35fr 0.85fr;
  gap: 2.5rem;
}

.form-interaction-col {
  display: flex;
  flex-direction: column;
}

.step-header {
  margin-bottom: 1.5rem;
}

.step-badge {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: var(--accent);
  display: block;
  margin-bottom: 0.35rem;
}

.step-title {
  font-size: 1.45rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.25;
  margin-bottom: 0.35rem;
}

.step-sub {
  font-size: 0.85rem;
  color: #94a3b8;
}

/* Services Tiles Grid */
.services-tiles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.service-tile {
  padding: 1.1rem;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.25s var(--ease-out-expo);
  position: relative;
}

.service-tile:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
}

.service-tile.selected {
  background: linear-gradient(135deg, rgba(0, 128, 255, 0.15) 0%, rgba(0, 229, 163, 0.06) 100%);
  border-color: rgba(0, 128, 255, 0.5);
  box-shadow: 0 4px 20px rgba(0, 128, 255, 0.15);
}

.tile-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tile-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.service-tile.selected .tile-icon-box {
  background: var(--primary);
  color: #fff;
}

.popular-chip {
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.15rem 0.5rem;
  background: linear-gradient(135deg, #ef4444, #f97316);
  color: #fff;
  border-radius: 4px;
}

.tile-name {
  font-size: 0.92rem;
  color: #fff;
  display: block;
}

.tile-price {
  font-size: 0.78rem;
  color: var(--teal);
  font-weight: 700;
  display: block;
  margin: 0.15rem 0;
}

.tile-desc {
  font-size: 0.75rem;
  color: #94a3b8;
  line-height: 1.4;
  margin: 0;
}

/* Addons Container */
.addons-container {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.addons-heading {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: #64748b;
  display: block;
  margin-bottom: 0.6rem;
}

.addons-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.addon-pill-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 0.8rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: all 0.2s ease;
}

.addon-pill-item.checked {
  background: rgba(0, 128, 255, 0.1);
  border: 1px solid rgba(0, 128, 255, 0.3);
}

.addon-check-indicator {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  color: #fff;
}

.addon-pill-item.checked .addon-check-indicator {
  background: var(--primary);
}

.addon-label-txt {
  flex: 1;
  font-size: 0.8rem;
  color: #cbd5e1;
}

.addon-cost {
  font-size: 0.75rem;
  color: var(--teal);
}

/* Calendar & Time Slots */
.control-sub-label {
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 1.2px;
  color: #94a3b8;
  display: block;
  margin-bottom: 0.75rem;
}

.calendar-days-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.45rem;
  margin-bottom: 1rem;
}

.calendar-day-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 0.3rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.calendar-day-btn:hover {
  background: rgba(255, 255, 255, 0.06);
}

.calendar-day-btn.active {
  background: linear-gradient(180deg, #162033 0%, #0d131f 100%);
  border-color: var(--teal);
  box-shadow: 0 0 14px rgba(0, 229, 163, 0.2);
}

.day-label {
  font-size: 0.68rem;
  color: #64748b;
  font-weight: 700;
}

.calendar-day-btn.active .day-label {
  color: var(--teal);
}

.day-date {
  font-size: 0.95rem;
  color: #fff;
  font-weight: 800;
}

.weekend-tag {
  font-size: 0.55rem;
  padding: 0.1rem 0.25rem;
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
  border-radius: 3px;
}

.other-date-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.78rem;
  color: #64748b;
  margin-bottom: 1.5rem;
}

.manual-date-input {
  background: #111622;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
  outline: none;
}

.time-slots-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.time-slot-card {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.time-slot-card:hover {
  background: rgba(255, 255, 255, 0.05);
}

.time-slot-card.selected {
  background: linear-gradient(135deg, rgba(0, 128, 255, 0.15) 0%, rgba(0, 229, 163, 0.05) 100%);
  border-color: var(--teal);
  box-shadow: 0 4px 16px rgba(0, 229, 163, 0.15);
}

.slot-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.slot-time {
  font-size: 0.95rem;
  color: #fff;
}

.slot-status-hot {
  font-size: 0.65rem;
  padding: 0.15rem 0.4rem;
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border-radius: 4px;
  font-weight: 800;
}

.slot-status-avail {
  font-size: 0.68rem;
  color: var(--teal);
  font-weight: 700;
}

.slot-period {
  font-size: 0.78rem;
  color: var(--accent);
  font-weight: 700;
}

.slot-desc {
  font-size: 0.72rem;
  color: #64748b;
}

/* Contact Inputs Grid */
.contact-inputs-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.error-toast {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
  font-size: 0.84rem;
}

.step-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 1.5rem;
}

.step-actions.split {
  justify-content: space-between;
}

/* Success Pane */
.success-pane {
  text-align: center;
  padding: 1rem 0;
}

.success-icon-badge {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(0, 229, 163, 0.12);
  color: var(--teal);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  margin: 0 auto 1.2rem;
  box-shadow: 0 0 24px rgba(0, 229, 163, 0.25);
}

.success-title {
  font-size: 1.6rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 0.5rem;
}

.success-sub {
  color: #94a3b8;
  font-size: 0.9rem;
  max-width: 520px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.studio-ticket-pass {
  background: linear-gradient(180deg, #131926 0%, #0a0e17 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  max-width: 480px;
  margin: 0 auto 2rem;
  text-align: left;
  overflow: hidden;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5);
}

.pass-header {
  background: rgba(255, 255, 255, 0.04);
  padding: 0.8rem 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pass-studio {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: var(--accent);
}

.pass-id {
  font-size: 0.75rem;
  font-weight: 800;
  color: #fbbf24;
  font-family: 'JetBrains Mono', monospace, sans-serif;
}

.pass-body {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.pass-item {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.pass-label {
  font-size: 0.7rem;
  font-weight: 800;
  color: #64748b;
  width: 90px;
}

.pass-val {
  font-size: 0.9rem;
  color: #fff;
}

.pass-val-sub {
  font-size: 0.8rem;
  color: #94a3b8;
}

.pass-footer {
  padding: 0.75rem 1.2rem;
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px dashed rgba(255, 255, 255, 0.08);
}

.pass-note {
  font-size: 0.72rem;
  color: #64748b;
  line-height: 1.4;
}

.success-integrations {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 480px;
  margin: 0 auto;
}

.btn-link-simple {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 0.82rem;
  cursor: pointer;
  margin-top: 0.5rem;
  text-decoration: underline;
}

/* Right Side: Live Digital Studio Pass Preview */
.preview-receipt-col {
  display: flex;
  flex-direction: column;
}

.live-pass-card {
  background: linear-gradient(180deg, #111724 0%, #090c14 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 1px solid rgba(0, 128, 255, 0.4);
  border-radius: 18px;
  padding: 1.8rem;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
  position: sticky;
  top: 90px;
}

.pass-top-edge {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.pass-chip {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 1.2px;
  color: var(--accent);
}

.pass-live-led {
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.15rem 0.5rem;
  background: rgba(0, 229, 163, 0.15);
  color: var(--teal);
  border-radius: 4px;
}

.detail-kicker {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: #64748b;
  display: block;
}

.detail-service-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #fff;
  display: block;
  margin: 0.35rem 0 1.2rem;
}

.detail-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;
  font-size: 0.84rem;
}

.row-label {
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.row-val {
  color: #fff;
  font-weight: 700;
}

.pass-addons-list {
  background: rgba(255, 255, 255, 0.03);
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  margin: 0.75rem 0;
}

.pass-addons-list ul {
  list-style: none;
  margin-top: 0.3rem;
}

.pass-addons-list li {
  font-size: 0.75rem;
  color: var(--teal);
}

.pass-divider-notch {
  position: relative;
  display: flex;
  align-items: center;
  margin: 1.5rem -1.8rem;
}

.notch {
  width: 16px;
  height: 24px;
  background: var(--bg-dark);
  position: absolute;
}

.notch.left {
  left: 0;
  border-radius: 0 12px 12px 0;
}

.notch.right {
  right: 0;
  border-radius: 12px 0 0 12px;
}

.dash-line {
  width: 100%;
  height: 1px;
  border-top: 1px dashed rgba(255, 255, 255, 0.12);
}

.pass-price-summary {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.price-summary-label {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: #64748b;
}

.price-summary-val {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--teal);
  letter-spacing: -0.02em;
  margin: 0.2rem 0;
}

.price-summary-note {
  font-size: 0.72rem;
  color: #64748b;
}

.pass-perks-box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1rem;
}

.perk-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #94a3b8;
}

.perk-item i {
  color: var(--accent);
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(12px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}

@media (max-width: 900px) {
  .engine-content-split {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .services-tiles-grid {
    grid-template-columns: 1fr;
  }
  .calendar-days-row {
    grid-template-columns: repeat(4, 1fr);
  }
  .time-slots-grid {
    grid-template-columns: 1fr;
  }
  .engine-card {
    padding: 1.5rem 1rem;
  }
}
</style>
