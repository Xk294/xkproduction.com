<template>
  <div class="contact-page-wrap">
    <!-- INTERACTIVE AMBIENT GLOW BACKDROP -->
    <div class="immersive-ambient-bg" aria-hidden="true">
      <div class="glow-spot spotlight-1"></div>
      <div class="glow-spot spotlight-2"></div>
    </div>

    <!-- ===== HERO SECTION ===== -->
    <section class="page-hero">
      <div class="editorial-container">
        <span class="hero-badge"><i class="fa-solid fa-phone"></i> KẾT NỐI</span>
        <h1 class="page-hero-title">Liên Hệ &amp; <span class="text-gradient-animated">Đặt Lịch</span></h1>
        <p class="page-hero-sub">Chia sẻ dự án của bạn — chúng tôi sẽ tư vấn giải pháp âm nhạc phù hợp nhất trong vòng 24 giờ làm việc.</p>
      </div>
    </section>

    <!-- ===== QUICK PRICING HINTS ===== -->
    <section class="quick-price-bar">
      <div class="editorial-container">
        <div class="price-bar-grid">
          <div class="price-bar-item">
            <i class="fa-solid fa-microphone"></i>
            <div>
              <span class="price-bar-service">Thu âm bài hát</span>
              <span class="price-bar-from">Từ <strong>499.000₫</strong>/buổi</span>
            </div>
          </div>
          <div class="price-bar-divider" aria-hidden="true"></div>
          <div class="price-bar-item">
            <i class="fa-solid fa-sliders"></i>
            <div>
              <span class="price-bar-service">Mix & Master</span>
              <span class="price-bar-from">Từ <strong>350.000₫</strong>/bài</span>
            </div>
          </div>
          <div class="price-bar-divider" aria-hidden="true"></div>
          <div class="price-bar-item">
            <i class="fa-solid fa-music"></i>
            <div>
              <span class="price-bar-service">Hoà âm phối khí</span>
              <span class="price-bar-from">Từ <strong>2.000.000₫</strong>/bài</span>
            </div>
          </div>
          <div class="price-bar-divider" aria-hidden="true"></div>
          <div class="price-bar-item">
            <i class="fa-solid fa-graduation-cap"></i>
            <div>
              <span class="price-bar-service">Khoá học</span>
              <span class="price-bar-from">Từ <strong>3.000.000₫</strong>/khoá</span>
            </div>
          </div>
          <NuxtLink to="/services" class="price-bar-cta">
            Xem bảng giá đầy đủ <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ===== MODE SELECTOR TABS ===== -->
    <div class="contact-mode-section max-width">
      <div class="contact-mode-tabs glass-card">
        <button
          type="button"
          class="mode-tab-btn"
          :class="{ active: activeMode === 'form' }"
          @click="activeMode = 'form'"
        >
          <i class="fa-solid fa-paper-plane"></i>
          <span>1. Gửi Lời Nhắn &amp; Báo Giá</span>
        </button>
        <button
          type="button"
          class="mode-tab-btn"
          :class="{ active: activeMode === 'calendar' }"
          @click="activeMode = 'calendar'"
        >
          <i class="fa-solid fa-calendar-check"></i>
          <span>2. Đặt Lịch Ca Thu Trực Tuyến</span>
        </button>
        <button
          type="button"
          class="mode-tab-btn"
          :class="{ active: activeMode === 'qr' }"
          @click="activeMode = 'qr'"
        >
          <i class="fa-solid fa-qrcode"></i>
          <span>3. Quét QR Chuyển Khoản / Cọc</span>
        </button>
      </div>
    </div>

    <!-- ===== CONTACT DETAILS & FORM ===== -->
    <section v-show="activeMode === 'form'" class="contact-form-section">
      <div class="max-width contact-grid">
        <!-- Left Column: Information checklists -->
        <div class="contact-info-panel">
          <span class="header-tag">THÔNG TIN LIÊN HỆ</span>
          <h2 class="contact-headline">Hãy để lại lời nhắn cho chúng tôi</h2>
          <p class="contact-subheadline">Chúng tôi luôn sẵn sàng lắng nghe mọi dự án, từ thu âm đơn giản đến album phối hợp quy mô thương mại.</p>

          <div class="contact-methods-grid">
            <div v-for="info in contactInfo" :key="info.title" class="contact-method-card glass-card">
              <span class="method-icon"><i :class="info.faIcon"></i></span>
              <div class="method-content">
                <strong>{{ info.title }}</strong>
                <div v-html="info.content" class="method-val"></div>
              </div>
            </div>
          </div>

          <div class="working-hours-card glass-card">
            <h3><i class="fa-solid fa-clock"></i> Giờ làm việc</h3>
            <p><strong>Thứ 2 – Thứ 6:</strong> 07:00 – 22:00</p>
            <p><strong>Thứ 7 – Chủ nhật:</strong> 08:00 – 20:00</p>
          </div>
        </div>

        <!-- Right Column: Glass Form -->
        <div class="contact-form-panel">
          <div class="form-container-glass glass-card">
            <h3 class="form-headline">Gửi nhanh yêu cầu</h3>
            <p class="form-subheadline">Điền thông tin chi tiết dưới đây, chúng tôi sẽ chủ động liên hệ sớm.</p>

            <!-- SUCCESS STATE -->
            <Transition name="fade">
              <div v-if="submitState === 'success'" class="form-success-overlay text-center">
                <i class="fa-solid fa-circle-check fa-3x success-icon"></i>
                <h3>Gửi yêu cầu thành công!</h3>
                <p>Cảm ơn bạn đã tin tưởng XKProduction. Chúng tôi đã nhận được tin nhắn của bạn và sẽ chủ động liên hệ lại trong vòng <strong>24 giờ</strong>.</p>
                <p class="zalo-notice">Nếu cần hỗ trợ gấp, vui lòng nhắn qua Zalo <a href="https://zalo.me/0355356294" target="_blank" rel="noopener">0355.356.294</a> để được xử lý ngay lập tức.</p>
                <button class="btn btn-secondary" style="margin-top: 1.5rem;" @click="submitState = 'idle'">Gửi yêu cầu khác</button>
              </div>
            </Transition>

            <form v-if="submitState !== 'success'" class="luxury-form" @submit.prevent="handleSubmit" novalidate>
              <!-- ERROR BANNER -->
              <Transition name="toast">
                <div v-if="submitState === 'error'" class="form-error-banner" role="alert">
                  <i class="fa-solid fa-triangle-exclamation"></i>
                  <span>Gửi thất bại. Vui lòng thử lại hoặc nhắn Zalo <a href="https://zalo.me/0355356294" target="_blank" rel="noopener">0355.356.294</a>.</span>
                </div>
              </Transition>

              <div class="form-row-premium">
                <div class="form-group-premium">
                  <label for="cf-name">Họ và tên <span class="req">*</span></label>
                  <input 
                    type="text" 
                    id="cf-name" 
                    v-model="form.name"
                    placeholder="Nguyễn Văn A"
                    :class="{ error: formErrors.name }"
                    @blur="validateForm" 
                  />
                  <span v-if="formErrors.name" class="field-error-text"><i class="fa-solid fa-circle-exclamation"></i> {{ formErrors.name }}</span>
                </div>

                <div class="form-group-premium">
                  <label for="cf-phone">Số điện thoại <span class="req">*</span></label>
                  <input 
                    type="tel" 
                    id="cf-phone" 
                    v-model="form.phone"
                    placeholder="03xx.xxx.xxx"
                    :class="{ error: formErrors.phone }"
                    @blur="validateForm" 
                  />
                  <span v-if="formErrors.phone" class="field-error-text"><i class="fa-solid fa-circle-exclamation"></i> {{ formErrors.phone }}</span>
                </div>
              </div>

              <div class="form-group-premium">
                <label for="cf-email">Email <span class="optional">(không bắt buộc)</span></label>
                <input type="email" id="cf-email" v-model="form.email" placeholder="email@example.com" />
              </div>

              <div class="form-group-premium">
                <label for="cf-service">Dịch vụ bạn quan tâm <span class="req">*</span></label>
                <div class="custom-select-wrap">
                  <select 
                    id="cf-service" 
                    v-model="form.service"
                    :class="{ error: formErrors.service }"
                    @change="validateForm"
                  >
                    <option value="">Chọn dịch vụ...</option>
                    <option value="thu-am">Thu âm bài hát</option>
                    <option value="mixing-mastering">Mixing &amp; Mastering</option>
                    <option value="mix-online">Mix &amp; Master Online</option>
                    <option value="hoa-am">Hòa âm phối khí</option>
                    <option value="combo-solo">Gói Solo Artist (Thu + Mix/Master)</option>
                    <option value="combo-artist">Gói Artist Pro (Hoà âm + Thu + Mix/Master)</option>
                    <option value="combo-ep">Gói Combo EP (3 bài)</option>
                    <option value="b2b">Âm nhạc Doanh Nghiệp (TVC, Brand, Sự kiện)</option>
                    <option value="mv-tvc">Sản xuất MV / TVC</option>
                    <option value="live-band">Âm thanh - Live Band sự kiện</option>
                    <option value="khoa-hoc">Khoá học Music Producer</option>
                    <option value="other">Yêu cầu khác</option>
                  </select>
                </div>
                <span v-if="formErrors.service" class="field-error-text"><i class="fa-solid fa-circle-exclamation"></i> {{ formErrors.service }}</span>
              </div>

              <div class="form-group-premium">
                <label for="cf-message">Mô tả chi tiết yêu cầu <span class="req">*</span></label>
                <textarea 
                  id="cf-message" 
                  v-model="form.message"
                  placeholder="Ý tưởng hoặc thể loại bài hát? Tiến độ dự kiến? Ngân sách dự chi?..." 
                  rows="4"
                  :class="{ error: formErrors.message }"
                  @blur="validateForm"
                ></textarea>
                <span v-if="formErrors.message" class="field-error-text"><i class="fa-solid fa-circle-exclamation"></i> {{ formErrors.message }}</span>
              </div>

              <button type="submit" class="btn btn-primary btn-full-width" :disabled="submitState === 'loading'">
                <i v-if="submitState === 'loading'" class="fa-solid fa-spinner fa-spin" style="margin-right: 0.5rem"></i>
                <span>{{ submitState === 'loading' ? 'ĐANG GỬI...' : 'GỬI YÊU CẦU ĐĂNG KÝ' }}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== AUTOMATED BOOKING FLOW ===== -->
    <section v-show="activeMode === 'calendar'" class="booking-section-wrap" style="padding: 1rem 0 4rem;">
      <div class="editorial-container">
        <BookingFlow />
      </div>
    </section>

    <!-- ===== VIETQR PAYMENT / DEPOSIT ===== -->
    <section v-show="activeMode === 'qr'" class="payment-section-wrap" style="padding: 1rem 0 4rem;">
      <div class="editorial-container">
        <VietQRPayment />
      </div>
    </section>

    <!-- ===== GOOGLE MAPS BLOCK ===== -->
    <section class="map-section">
      <div class="editorial-container">
        <div class="section-header-minimal" style="margin-bottom: 2rem;">
          <span class="header-tag"><i class="fa-solid fa-map-location-dot"></i> VỊ TRÍ BẢN ĐỒ</span>
          <h2 class="section-heading-heavy">Studio XKProduction</h2>
        </div>
        
        <div class="map-container-glass glass-card">
          <iframe
            src="https://www.google.com/maps?q=Th%E1%BB%A7+%C4%90%E1%BB%A9c,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh&output=embed"
            width="100%"
            height="420"
            style="border:0;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Vị trí XKProduction trên Google Maps - Thủ Đức, Thành phố Hồ Chí Minh"
          ></iframe>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Th%E1%BB%A7+%C4%90%E1%BB%A9c,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh"
            target="_blank" rel="noopener"
            class="map-directions-link"
          >
            <i class="fa-solid fa-diamond-turn-right"></i>
            <span>Chỉ đường đến phòng thu XKProduction trên Google Maps</span>
            <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.75rem;"></i>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

useSeoMeta({
  title: 'Liên hệ & Đặt lịch Thu âm, Mix Master - XKProduction',
  description: 'Liên hệ XKProduction để đặt lịch thu âm bài hát, tư vấn mixing/mastering, hoà âm phối khí. Hotline: 0355.356.294. Phản hồi trong 24 giờ.',
  ogTitle: 'Liên hệ Đặt lịch Thu âm & Tư vấn Dịch vụ - XKProduction',
  ogDescription: 'Hotline: 0355.356.294 | Zalo: 0355.356.294 | Email: nguyenxuankiet294@gmail.com. Đặt lịch thu âm, tư vấn mix master & hoà âm phối khí chuyên nghiệp.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Liên hệ XKProduction đặt lịch thu âm',
  ogUrl: 'https://xkproduction.com/contact',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  keywords: 'liên hệ XKProduction, đặt lịch thu âm, hotline phòng thu, tư vấn mix master, zalo XKProduction, địa chỉ phòng thu'
})

useSchemaOrg([
  defineWebPage({
    name: 'Liên hệ & Đặt lịch - XKProduction',
    description: 'Liên hệ XKProduction để đặt lịch thu âm, tư vấn mixing/mastering bài hát chuyên nghiệp.'
  }),
  defineLocalBusiness({
    '@id': 'https://xkproduction.com/#localbusiness',
    name: 'XKProduction',
    telephone: '+84355356294',
    email: 'nguyenxuankiet294@gmail.com',
    url: 'https://xkproduction.com',
    image: 'https://xkproduction.com/images/Xkpreviewnew.png',
    address: {
      streetAddress: 'Thủ Đức',
      addressLocality: 'Thủ Đức',
      addressRegion: 'Thành phố Hồ Chí Minh',
      postalCode: '700000',
      addressCountry: 'VN'
    },
    geo: { latitude: '10.8494', longitude: '106.7537' },
    hasMap: 'https://maps.google.com/?q=10.8494,106.7537',
    openingHoursSpecification: [
      { dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '07:00', closes: '22:00' },
      { dayOfWeek: ['Saturday','Sunday'], opens: '08:00', closes: '20:00' }
    ],
    priceRange: '350.000₫ – 3.500.000₫'
  })
])

const config = useRuntimeConfig()
const FORMSPREE_ENDPOINT = config.public.formspreeEndpoint

const activeMode = ref<'form' | 'calendar' | 'qr'>('form')
const form = reactive({ name: '', phone: '', email: '', service: '', message: '' })
const formErrors = reactive({ name: '', phone: '', service: '', message: '' })
const submitState = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

onMounted(() => {
  if (route.query.mode) {
    const m = (route.query.mode as string).toLowerCase().trim()
    if (m === 'booking' || m === 'calendar') activeMode.value = 'calendar'
    else if (m === 'qr' || m === 'payment') activeMode.value = 'qr'
  }
  if (route.query.service) {
    const raw = (route.query.service as string).toLowerCase().trim()
    const serviceAliases: Record<string, string> = {
      'thu-am': 'thu-am',
      'mix-master': 'mixing-mastering',
      'mixing-mastering': 'mixing-mastering',
      'mix-online': 'mix-online',
      'hoa-am': 'hoa-am',
      'hoa-am-phoi-khi': 'hoa-am',
      'mv-tvc': 'mv-tvc',
      'live-band': 'live-band',
      'khoa-hoc': 'khoa-hoc',
      'courses': 'khoa-hoc',
      'b2b': 'b2b',
      'combo-solo': 'combo-solo',
      'combo-artist': 'combo-artist',
      'combo-ep': 'combo-ep',
      'other': 'other'
    }
    if (serviceAliases[raw]) {
      form.service = serviceAliases[raw]
    }
  }
})

function validateForm(): boolean {
  let valid = true
  formErrors.name = form.name.trim().length < 2 ? 'Vui lòng nhập họ và tên' : ''
  const phone = form.phone.replace(/[\.\s\-]/g, '')
  formErrors.phone = !/^(0[3-9]\d{8})$/.test(phone) ? 'Số điện thoại không hợp lệ (VD: 0355356294)' : ''
  formErrors.service = !form.service ? 'Vui lòng chọn dịch vụ' : ''
  formErrors.message = form.message.trim().length < 10 ? 'Vui lòng mô tả dự án (tối thiểu 10 ký tự)' : ''
  if (formErrors.name || formErrors.phone || formErrors.service || formErrors.message) valid = false
  return valid
}

async function handleSubmit() {
  if (!validateForm()) return
  submitState.value = 'loading'

  const { getTrackingPayload, trackCta } = useAnalytics()
  const payload = {
    name: form.name,
    phone: form.phone,
    email: form.email || '',
    service: form.service,
    message: form.message,
    source: 'contact',
    ...getTrackingPayload()
  }

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res.ok) {
      trackCta(`Contact Submit: ${form.service}`)
      submitState.value = 'success'
      Object.assign(form, { name: '', phone: '', email: '', service: '', message: '' })
      Object.assign(formErrors, { name: '', phone: '', service: '', message: '' })
      return
    }
    throw new Error(`API error ${res.status}`)
  } catch (err) {
    console.warn('[contact] API nội bộ không phản hồi, tự động chuyển fallback sang Formspree:', err)
    try {
      if (FORMSPREE_ENDPOINT) {
        const formspreeRes = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            ...payload,
            _subject: `[XKProduction] Yêu cầu từ ${form.name} (${form.phone})`
          })
        })
        if (formspreeRes.ok) {
          submitState.value = 'success'
          Object.assign(form, { name: '', phone: '', email: '', service: '', message: '' })
          Object.assign(formErrors, { name: '', phone: '', service: '', message: '' })
          return
        }
      }
    } catch (fallbackErr) {
      console.error('[contact] Fallback Formspree lỗi:', fallbackErr)
    }
    submitState.value = 'error'
  }
}

const contactInfo = [
  { faIcon: 'fa-solid fa-phone', title: 'Hotline / Zalo', content: '<a href="tel:0355356294">0355.356.294</a>' },
  { faIcon: 'fa-solid fa-envelope', title: 'Email', content: '<a href="mailto:nguyenxuankiet294@gmail.com">nguyenxuankiet294@gmail.com</a>' },
  { faIcon: 'fa-solid fa-comment', title: 'Zalo Chat', content: '<a href="https://zalo.me/0355356294" target="_blank" rel="noopener">0355.356.294</a>' },
  { faIcon: 'fa-brands fa-facebook-f', title: 'Facebook Cá Nhân', content: '<a href="https://www.facebook.com/ngxkiet" target="_blank" rel="noopener">facebook.com/ngxkiet</a>' },
  { faIcon: 'fa-solid fa-location-dot', title: 'Địa chỉ Studio', content: 'Thủ Đức, Thành phố Hồ Chí Minh' }
]
</script>

<style scoped>
.contact-page-wrap {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-dark);
}

/* ==============================================
   INTERACTIVE AMBIENT GLOW BACKDROP
   ============================================== */
.immersive-ambient-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-color: var(--bg-dark);
}

.glow-spot {
  position: absolute;
  border-radius: 50%;
  filter: blur(150px);
  opacity: 0.16;
}

.spotlight-1 {
  width: 550px;
  height: 550px;
  top: -12%;
  left: -12%;
  background: rgba(125, 211, 252, 0.35);
}

.spotlight-2 {
  width: 650px;
  height: 650px;
  bottom: -12%;
  right: -12%;
  background: rgba(56, 189, 248, 0.22);
}

/* ==============================================
   PAGE HERO
   ============================================== */
.page-hero {
  padding-top: 190px;
  padding-bottom: 5rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 1.6rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.page-hero-title {
  font-size: clamp(2.3rem, 5vw, 3.6rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-main);
  margin-bottom: 1.2rem;
  line-height: 1.15;
}

.page-hero-sub {
  font-size: clamp(0.95rem, 1.4vw, 1.08rem);
  color: var(--text-light);
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ==============================================
   MODE SELECTOR TABS
   ============================================== */
.contact-mode-section {
  margin: 1.5rem auto 2.5rem;
  position: relative;
  z-index: 2;
}

.contact-mode-tabs {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.mode-tab-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.95rem 1.2rem;
  border-radius: 12px;
  background: transparent;
  border: none;
  color: var(--text-light);
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.28s var(--ease-out-expo);
}

.mode-tab-btn i {
  font-size: 1rem;
}

.mode-tab-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.04);
}

.mode-tab-btn.active {
  background: linear-gradient(135deg, rgba(26, 140, 255, 0.28) 0%, rgba(0, 212, 170, 0.16) 100%);
  color: #fff;
  border: 1px solid rgba(26, 140, 255, 0.4);
  box-shadow: 0 6px 20px rgba(26, 140, 255, 0.2);
}

@media (max-width: 768px) {
  .contact-mode-tabs {
    flex-direction: column;
  }
  .mode-tab-btn {
    justify-content: flex-start;
    padding: 0.85rem 1rem;
  }
}

/* ==============================================
   CONTACT GRID
   ============================================== */
.contact-form-section {
  padding: 60px 0 140px;
  position: relative;
  z-index: 1;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 4rem;
  align-items: start;
}

/* Left Panel Info */
.contact-info-panel {
  display: flex;
  flex-direction: column;
}

.contact-headline {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}

.contact-subheadline {
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.header-tag {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 3px;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 1.2rem;
}

.contact-methods-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.2rem;
}

.contact-method-card {
  padding: 1.2rem 1.6rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.method-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: var(--accent);
  flex-shrink: 0;
}

.method-content {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.method-content strong {
  font-size: 0.72rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.method-val {
  font-size: 0.95rem;
  color: var(--text-main);
  font-weight: 600;
}

.method-val a {
  color: var(--text-main);
  transition: color 0.25s ease;
}

.method-val a:hover {
  color: var(--accent);
  text-decoration: underline;
}

.working-hours-card {
  padding: 1.8rem;
}

.working-hours-card h3 {
  font-size: 1rem;
  font-weight: 850;
  color: var(--text-main);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.working-hours-card h3 i {
  color: var(--accent);
}

.working-hours-card p {
  font-size: 0.88rem;
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.working-hours-card p:last-of-type {
  margin-bottom: 0;
}

/* Right Panel Formspree Luxury Glass Form */
.contact-form-panel {
  position: relative;
}

.form-container-glass {
  padding: 3rem 2.5rem;
}

.form-headline {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 0.4rem;
}

.form-subheadline {
  font-size: 0.88rem;
  color: var(--text-light);
  margin-bottom: 2.2rem;
}

/* LUXURY FORM ELEMENTS */
.luxury-form {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.form-row-premium {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.form-group-premium {
  display: flex;
  flex-direction: column;
  position: relative;
}

.form-group-premium label {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-light);
  margin-bottom: 0.5rem;
  letter-spacing: 0.3px;
}

.req {
  color: #ef4444;
}

.optional {
  color: var(--text-muted);
  font-weight: 400;
  font-size: 0.72rem;
}

.form-group-premium input,
.form-group-premium textarea,
.form-group-premium select {
  width: 100%;
  padding: 0.9rem 1.25rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: var(--text-main);
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.3s var(--ease-out-expo);
  backdrop-filter: blur(8px);
}

.form-group-premium input:focus,
.form-group-premium textarea:focus,
.form-group-premium select:focus {
  outline: none;
  border-color: rgba(125, 211, 252, 0.4);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 4px 20px rgba(125, 211, 252, 0.06);
}

.form-group-premium input.error,
.form-group-premium textarea.error,
.form-group-premium select.error {
  border-color: rgba(239, 68, 68, 0.4);
  background: rgba(239, 68, 68, 0.03);
}

.form-group-premium textarea {
  resize: vertical;
  min-height: 120px;
}

.custom-select-wrap {
  position: relative;
}

.custom-select-wrap select {
  cursor: pointer;
}

.custom-select-wrap select option {
  background: var(--bg-surface);
  color: var(--text-main);
}

.field-error-text {
  font-size: 0.74rem;
  color: #fca5a5;
  margin-top: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.btn-full-width {
  width: 100%;
  padding: 0.95rem 1.5rem;
  font-size: 0.88rem;
  font-weight: 750;
  border-radius: 10px;
  letter-spacing: 1px;
}

.btn-full-width:disabled {
  opacity: 0.6;
  cursor: wait;
}

/* SUCCESS BANNER OVERLAY */
.form-success-overlay {
  padding: 2rem 1rem;
}

.success-icon {
  color: #34d399;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 10px rgba(52, 211, 153, 0.35));
}

.form-success-overlay h3 {
  font-size: 1.4rem;
  font-weight: 850;
  color: var(--text-main);
  margin-bottom: 0.65rem;
}

.form-success-overlay p {
  color: var(--text-light);
  line-height: 1.65;
  font-size: 0.92rem;
  margin-bottom: 1.2rem;
}

.zalo-notice {
  font-size: 0.84rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1.2rem;
}

.zalo-notice a {
  color: var(--accent);
  font-weight: 700;
}

/* FORM ERROR BANNER */
.form-error-banner {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1.25rem;
  border-radius: 10px;
  border: 1px solid rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.05);
  color: #fca5a5;
  font-size: 0.84rem;
  margin-bottom: 1.2rem;
  line-height: 1.5;
}

.form-error-banner i {
  font-size: 1.1rem;
  color: #ef4444;
}

.form-error-banner a {
  color: var(--accent);
  font-weight: 700;
}

/* ==============================================
   MAP SECTION
   ============================================== */
.map-section {
  padding: 0 0 140px;
}

.map-container-glass {
  padding: 0.6rem;
  border-radius: 20px;
}

.map-container-glass iframe {
  display: block;
  border-radius: 14px;
  filter: brightness(0.8) contrast(1.15) saturate(0.9);
  transition: filter 0.35s ease;
}

.map-container-glass:hover iframe {
  filter: brightness(0.92) contrast(1.05) saturate(1);
}

.map-directions-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.1rem;
  background: rgba(255, 255, 255, 0.02);
  color: var(--accent);
  font-weight: 700;
  font-size: 0.88rem;
  text-decoration: none;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  border-radius: 0 0 14px 14px;
}

.map-directions-link:hover {
  background: rgba(125, 211, 252, 0.06);
  color: #38bdf8;
}

/* ==============================================
   RESPONSIVE
   ============================================== */
@media (max-width: 992px) {
  .contact-grid { grid-template-columns: 1fr; gap: 3.5rem; }
}

@media (max-width: 768px) {
  .page-hero { padding-top: 150px; padding-bottom: 3.5rem; }
  .contact-form-section { padding: 40px 0 80px; }
  .form-container-glass { padding: 2.2rem 1.5rem; }
  .form-row-premium { grid-template-columns: 1fr; gap: 1.4rem; }
  .map-section { padding-bottom: 80px; }
  .map-container-glass iframe { height: 280px; }
}

/* ============ PRICING HINTS BAR ============ */
.quick-price-bar {
  padding: 0 0 1rem;
  position: relative;
  z-index: 1;
}
.price-bar-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px;
  padding: 1rem 1.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.price-bar-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1.25rem;
  flex: 1;
  min-width: 150px;
}
.price-bar-item > i {
  font-size: 1.1rem;
  color: var(--accent);
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(125,211,252,0.08);
  border-radius: 8px;
  flex-shrink: 0;
}
.price-bar-item > div {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.price-bar-service {
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.price-bar-from {
  font-size: 0.82rem;
  color: var(--text-light);
}
.price-bar-from strong {
  color: var(--text-main);
  font-size: 0.9rem;
}
.price-bar-divider {
  width: 1px;
  height: 36px;
  background: rgba(255,255,255,0.07);
  flex-shrink: 0;
}
.price-bar-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: rgba(26,140,255,0.1);
  border: 1px solid rgba(26,140,255,0.25);
  border-radius: 8px;
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
  transition: all 0.25s ease;
  flex-shrink: 0;
}
.price-bar-cta:hover {
  background: rgba(26,140,255,0.18);
  border-color: rgba(26,140,255,0.4);
  color: #fff;
  gap: 0.7rem;
}
@media (max-width: 768px) {
  .price-bar-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; padding: 1rem; }
  .price-bar-divider { display: none; }
  .price-bar-item { padding: 0.5rem 0.75rem; min-width: unset; }
  .price-bar-cta { grid-column: 1 / -1; justify-content: center; }
}
</style>

