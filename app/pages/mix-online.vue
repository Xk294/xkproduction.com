<template>
  <div class="mix-online-page-wrap">
    <!-- INTERACTIVE AMBIENT GLOW BACKDROP -->
    <div class="immersive-ambient-bg" aria-hidden="true">
      <div class="glow-spot spotlight-1"></div>
      <div class="glow-spot spotlight-2"></div>
    </div>

    <!-- 2. Hero -->
    <section class="page-hero">
      <div class="max-width text-center">
        <span class="hero-badge"><i class="fa-solid fa-earth-asia"></i> MIX ONLINE TOÀN QUỐC</span>
        <h1 class="page-hero-title">Mix &amp; Master Online — <br><span class="text-gradient-animated">Không Cần Đến Studio</span></h1>
        <p class="page-hero-sub">Gửi file qua Google Drive, nhận bản mix chuẩn Spotify trong 48–72 giờ. Phục vụ nghệ sĩ toàn quốc.</p>
        <div class="hero-actions" style="margin-top: 2rem; display: flex; justify-content: center; gap: 1rem;">
          <a href="#order-form" class="btn btn-primary btn-pulse">
            <i class="fa-solid fa-paper-plane"></i> Gửi file ngay
          </a>
          <a href="#pricing" class="btn btn-secondary">
            <i class="fa-solid fa-tags"></i> Xem bảng giá
          </a>
        </div>
      </div>
    </section>

    <!-- 3. How it works -->
    <section class="how-it-works-section">
      <div class="max-width">
        <div class="section-header-minimal text-center" style="margin-bottom: 2rem;">
          <span class="header-tag">QUY TRÌNH</span>
        </div>
        <div class="how-it-works-grid glass-card">
          <div class="how-step text-center">
            <div class="step-icon"><i class="fa-brands fa-google-drive"></i></div>
            <h4>1. Gửi file</h4>
            <p>Upload lên Google Drive / WeTransfer, điền form yêu cầu.</p>
          </div>
          <div class="step-arrow"><i class="fa-solid fa-arrow-right"></i></div>
          <div class="how-step text-center">
            <div class="step-icon"><i class="fa-solid fa-sliders"></i></div>
            <h4>2. Sản xuất</h4>
            <p>Producer xử lý trong 48-72h theo yêu cầu của bạn.</p>
          </div>
          <div class="step-arrow"><i class="fa-solid fa-arrow-right"></i></div>
          <div class="how-step text-center">
            <div class="step-icon"><i class="fa-solid fa-headphones-simple"></i></div>
            <h4>3. Nhận bản mix</h4>
            <p>Nhận WAV + MP3 chuẩn phát hành, có revision.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Pricing table -->
    <section id="pricing" class="pricing-section">
      <div class="max-width">
        <div class="pricing-grid">
          <!-- Basic -->
          <div class="pricing-card glass-card hover-lift">
            <h3>Online Basic</h3>
            <div class="price">300.000₫<span>/bài</span></div>
            <ul class="features-list">
              <li><i class="fa-solid fa-check"></i> Nhận stereo mixdown từ khách</li>
              <li><i class="fa-solid fa-check"></i> EQ/Compression tổng thể</li>
              <li><i class="fa-solid fa-check"></i> Mastering chuẩn Spotify</li>
              <li><i class="fa-solid fa-check"></i> Xuất WAV+MP3</li>
              <li><i class="fa-solid fa-check"></i> 1 revision</li>
            </ul>
            <button type="button" class="btn btn-secondary btn-full-width mt-auto" @click="selectPackage('Basic')">Chọn gói Basic</button>
          </div>

          <!-- Pro (Featured) -->
          <div class="pricing-card glass-card hover-lift featured-pricing">
            <div class="pricing-badge">Phổ biến</div>
            <h3>Online Pro</h3>
            <div class="price text-gradient-animated">500.000₫<span>/bài</span></div>
            <ul class="features-list">
              <li><i class="fa-solid fa-check"></i> Nhận multi-track stems</li>
              <li><i class="fa-solid fa-check"></i> Full mixing xử lý từng track</li>
              <li><i class="fa-solid fa-check"></i> Vocal treatment riêng</li>
              <li><i class="fa-solid fa-check"></i> Mastering chuẩn phát hành quốc tế</li>
              <li><i class="fa-solid fa-check"></i> 2 revisions</li>
            </ul>
            <button type="button" class="btn btn-primary btn-full-width mt-auto btn-pulse" @click="selectPackage('Pro')">Chọn gói Pro</button>
          </div>

          <!-- Premium -->
          <div class="pricing-card glass-card hover-lift">
            <h3>Online Premium</h3>
            <div class="price">800.000₫<span>/bài</span></div>
            <ul class="features-list">
              <li><i class="fa-solid fa-check"></i> Nhận multi-track stems</li>
              <li><i class="fa-solid fa-check"></i> Vocal production chi tiết</li>
              <li><i class="fa-solid fa-check"></i> Arrangement tweaks</li>
              <li><i class="fa-solid fa-check"></i> Mastering cao cấp</li>
              <li><i class="fa-solid fa-check"></i> 3 revisions</li>
              <li><i class="fa-solid fa-check"></i> Priority 24h</li>
            </ul>
            <button type="button" class="btn btn-secondary btn-full-width mt-auto" @click="selectPackage('Premium')">Chọn gói Premium</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Requirements section -->
    <section class="requirements-section">
      <div class="max-width">
        <div class="glass-card requirements-card">
          <h3 style="margin-bottom: 1.5rem; color: var(--text-main); font-size: 1.25rem;"><i class="fa-solid fa-box-open" style="color: var(--accent); margin-right: 0.5rem;"></i> Cần chuẩn bị gì?</h3>
          <ul class="req-list">
            <li><strong>File nhạc:</strong> WAV/AIFF, 24bit/48kHz nếu có.</li>
            <li><strong>Stems:</strong> Riêng từng track (không cần merge). Nếu không có stems, vui lòng chọn gói Basic.</li>
            <li><strong>Tham khảo:</strong> Thể loại + bài hát có sound mong muốn.</li>
            <li><strong>Thông tin:</strong> Tempo/BPM của bài.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 6. Order form -->
    <section id="order-form" class="order-form-section" style="padding-bottom: 6rem;">
      <div class="max-width">
        <div class="glass-card form-wrap">
          <div class="text-center" style="margin-bottom: 2rem;">
            <h2>Gửi File Trực Tuyến</h2>
          </div>
          
          <Transition name="toast">
            <div v-if="submitState === 'success'" class="form-toast-success text-center">
              <i class="fa-solid fa-circle-check" style="font-size: 2.5rem; color: var(--accent); margin-bottom: 1rem;"></i>
              <h3 style="color: #fff; margin-bottom: 0.5rem;">Đã nhận thông tin bài hát!</h3>
              <p style="color: var(--text-light); max-width: 600px; margin: 0 auto 1.5rem;">
                XKProduction đã tiếp nhận link dự án gói <strong>Online {{ lastOrder.package }}</strong> của bạn.
                Để producer xếp lịch và bắt tay vào xử lý ngay trong 48h, bạn có thể chuyển khoản thanh toán hoặc đặt cọc qua mã QR bên dưới:
              </p>
              
              <div style="max-width: 650px; margin: 0 auto 2rem; text-align: left;">
                <VietQRPayment 
                  :amount="lastOrder.amount" 
                  :service-name="`MIX ONLINE ${lastOrder.package}`" 
                  :client-name="lastOrder.name" 
                />
              </div>

              <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <a href="https://zalo.me/0355356294" target="_blank" rel="noopener" class="btn btn-primary">
                  <i class="fa-solid fa-comment-dots"></i> Nhắn Zalo xác nhận (0355.356.294)
                </a>
                <button class="btn btn-secondary" @click="submitState = 'idle'">Gửi dự án khác</button>
              </div>
            </div>
            <div v-else-if="submitState === 'error'" class="form-toast-error text-center">
              <i class="fa-solid fa-triangle-exclamation"></i>
              <p>Có lỗi xảy ra. Vui lòng thử lại.</p>
              <button class="btn btn-secondary mt-3" @click="submitState = 'idle'">Thử lại</button>
            </div>
          </Transition>

          <form v-if="submitState === 'idle' || submitState === 'loading'" class="luxury-form" @submit.prevent="handleSubmit" novalidate>
            <div class="form-row-premium">
              <div class="form-group-premium">
                <label for="name">Họ và tên <span class="req">*</span></label>
                <input id="name" v-model="form.name" type="text" placeholder="Nguyễn Văn A" :class="{ error: formErrors.name }" />
                <span v-if="formErrors.name" class="field-error-text">{{ formErrors.name }}</span>
              </div>
              <div class="form-group-premium">
                <label for="phone">Số điện thoại <span class="req">*</span></label>
                <input id="phone" v-model="form.phone" type="tel" placeholder="09xx.xxx.xxx" :class="{ error: formErrors.phone }" />
                <span v-if="formErrors.phone" class="field-error-text">{{ formErrors.phone }}</span>
              </div>
            </div>
            <div class="form-row-premium">
              <div class="form-group-premium">
                <label for="email">Email</label>
                <input id="email" v-model="form.email" type="email" placeholder="email@example.com" />
              </div>
              <div class="form-group-premium">
                <label for="package">Gói Mix <span class="req">*</span></label>
                <div class="custom-select-wrap">
                  <select id="package" v-model="form.package" :class="{ error: formErrors.package }">
                    <option value="">Chọn gói...</option>
                    <option value="Basic">Online Basic (300.000₫)</option>
                    <option value="Pro">Online Pro (500.000₫)</option>
                    <option value="Premium">Online Premium (800.000₫)</option>
                  </select>
                </div>
                <span v-if="formErrors.package" class="field-error-text">{{ formErrors.package }}</span>
              </div>
            </div>
            <div class="form-group-premium">
              <label for="link">Google Drive Link <span class="req">*</span></label>
              <input id="link" v-model="form.link" type="text" placeholder="https://drive.google.com/..." :class="{ error: formErrors.link }" />
              <span v-if="formErrors.link" class="field-error-text">{{ formErrors.link }}</span>
            </div>
            <div class="form-group-premium">
              <label for="notes">Ghi chú (BPM, Tham khảo...)</label>
              <textarea id="notes" v-model="form.notes" placeholder="Mô tả mong muốn về sound..." rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-full-width" :disabled="submitState === 'loading'">
              <i v-if="submitState === 'loading'" class="fa-solid fa-spinner fa-spin" style="margin-right: 0.5rem"></i>
              <span>{{ submitState === 'loading' ? 'ĐANG GỬI...' : 'GỬI YÊU CẦU' }}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

useSeoMeta({
  title: 'Mix & Master Online — Gửi File Nhận Bản Mix Chuyên Nghiệp | XKProduction',
  description: 'Dịch vụ mix và master online toàn quốc. Gửi file qua Google Drive, nhận bản mix chuẩn Spotify trong 48-72h. Từ 300.000₫/bài.',
  keywords: 'mix master online, gửi file mix master, mixing online Việt Nam, mastering online, mix nhạc online',
})

useSchemaOrg([
  defineWebPage({
    name: 'Mix & Master Online — Gửi File Nhận Bản Mix Chuyên Nghiệp | XKProduction',
    description: 'Dịch vụ mix và master online toàn quốc. Gửi file qua Google Drive, nhận bản mix chuẩn Spotify trong 48-72h. Từ 300.000₫/bài.'
  }),
  defineLocalBusiness({
    '@id': 'https://xkproduction.com/#localbusiness',
    name: 'XKProduction',
    telephone: '+84355356294',
    email: 'nguyenxuankiet294@gmail.com',
    url: 'https://xkproduction.com',
    image: 'https://xkproduction.com/images/Xkpreviewnew.png',
    address: {
      streetAddress: 'QL14 km25 xã Nghĩa Trung, Huyện Bù Đăng',
      addressLocality: 'Bình Phước',
      addressRegion: 'Bình Phước',
      postalCode: '830000',
      addressCountry: 'VN'
    },
    geo: { latitude: '11.71792', longitude: '107.11719' },
    hasMap: 'https://maps.google.com/?q=11.71792,107.11719',
    openingHoursSpecification: [
      { dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '07:00', closes: '22:00' },
      { dayOfWeek: ['Saturday','Sunday'], opens: '08:00', closes: '20:00' }
    ],
    priceRange: '350.000₫ – 3.500.000₫',
    aggregateRating: {
      ratingValue: '4.9',
      ratingCount: 150,
      bestRating: '5',
      worstRating: '1'
    }
  })
])

const config = useRuntimeConfig()
const FORMSPREE_ENDPOINT = config.public.formspreeEndpoint

const form = reactive({ name: '', phone: '', email: '', package: '', link: '', notes: '' })
const formErrors = reactive({ name: '', phone: '', package: '', link: '' })
const submitState = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

const packageAmounts: Record<string, number> = {
  Basic: 300000,
  Pro: 500000,
  Premium: 800000
}

const lastOrder = reactive({
  name: '',
  package: '',
  amount: 0
})

function selectPackage(pkg: string) {
  form.package = pkg
  if (import.meta.client) {
    const el = document.getElementById('order-form')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}

function validateForm(): boolean {
  let valid = true
  formErrors.name = form.name.trim().length < 2 ? 'Vui lòng nhập họ và tên' : ''
  const phone = form.phone.replace(/[\.\s\-]/g, '')
  formErrors.phone = !/^(0[3-9]\d{8})$/.test(phone) ? 'Số điện thoại không hợp lệ (10 số)' : ''
  formErrors.package = !form.package ? 'Vui lòng chọn gói' : ''
  formErrors.link = form.link.trim().length < 5 ? 'Vui lòng cung cấp link Google Drive' : ''
  
  if (formErrors.name || formErrors.phone || formErrors.package || formErrors.link) valid = false
  return valid
}

async function handleSubmit() {
  if (!validateForm()) return
  submitState.value = 'loading'
  const payload = {
    name: form.name,
    phone: form.phone,
    email: form.email || '',
    service: `Mix Online - Gói ${form.package}`,
    message: `Link: ${form.link}\nGhi chú: ${form.notes}`,
    source: 'mix-online'
  }

  try {
    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res.ok) {
      lastOrder.name = form.name
      lastOrder.package = form.package
      lastOrder.amount = packageAmounts[form.package] || 0
      submitState.value = 'success'
      Object.assign(form, { name: '', phone: '', email: '', package: '', link: '', notes: '' })
      return
    }
    throw new Error(`API error ${res.status}`)
  } catch (err) {
    console.warn('[mix-online] API nội bộ không phản hồi, thử fallback sang Formspree:', err)
    try {
      if (FORMSPREE_ENDPOINT) {
        const fbRes = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            ...payload,
            _subject: `[XKProduction Mix Online] Gói ${form.package} từ ${payload.name} (${payload.phone})`
          })
        })
        if (fbRes.ok) {
          lastOrder.name = form.name
          lastOrder.package = form.package
          lastOrder.amount = packageAmounts[form.package] || 0
          submitState.value = 'success'
          Object.assign(form, { name: '', phone: '', email: '', package: '', link: '', notes: '' })
          return
        }
      }
    } catch (fbErr) {
      console.error('[mix-online] Fallback Formspree lỗi:', fbErr)
    }
    submitState.value = 'error'
  }
}
</script>

<style scoped>
.mix-online-page-wrap {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-dark);
}

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

.page-hero {
  padding-top: 200px;
  padding-bottom: 5rem;
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

.text-gradient-animated {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-hero-sub {
  font-size: clamp(0.95rem, 1.4vw, 1.08rem);
  color: var(--text-light);
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.7;
}

.how-it-works-section {
  position: relative;
  z-index: 1;
  padding: 4rem 0;
}

.how-it-works-grid {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 3rem 2rem;
}

.how-step {
  flex: 1;
  max-width: 250px;
}

.step-icon {
  font-size: 2.5rem;
  color: var(--accent);
  margin-bottom: 1rem;
}

.how-step h4 {
  font-size: 1.1rem;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.how-step p {
  color: var(--text-light);
  font-size: 0.9rem;
}

.step-arrow {
  font-size: 1.5rem;
  color: var(--text-muted);
  padding: 0 1rem;
}

.pricing-section {
  position: relative;
  z-index: 1;
  padding: 4rem 0;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  align-items: stretch;
}

.pricing-card {
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 16px;
}

.pricing-card.featured-pricing {
  border: 1px solid var(--primary);
  box-shadow: 0 10px 40px rgba(26, 140, 255, 0.15);
  transform: translateY(-10px);
}

.pricing-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gradient-primary);
  color: #fff;
  padding: 0.2rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.pricing-card h3 {
  font-size: 1.25rem;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.price {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  padding-bottom: 1.5rem;
}

.price span {
  font-size: 1rem;
  color: var(--text-muted);
  font-weight: 400;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.features-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: var(--text-light);
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.features-list i {
  color: var(--teal);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.requirements-section {
  position: relative;
  z-index: 1;
  padding: 2rem 0 4rem;
}

.requirements-card {
  padding: 2.5rem;
}

.req-list {
  list-style: none;
  padding: 0;
}

.req-list li {
  color: var(--text-light);
  margin-bottom: 0.75rem;
  position: relative;
  padding-left: 1.5rem;
  line-height: 1.6;
}

.req-list li::before {
  content: "•";
  color: var(--primary);
  position: absolute;
  left: 0;
  font-size: 1.2rem;
}

.req-list li strong {
  color: var(--text-main);
}

.order-form-section {
  position: relative;
  z-index: 1;
}

.form-wrap {
  padding: 3rem 2.5rem;
  max-width: 800px;
  margin: 0 auto;
}

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

.form-toast-success {
  padding: 2rem;
  background: rgba(52, 211, 153, 0.1);
  border: 1px solid rgba(52, 211, 153, 0.3);
  border-radius: 10px;
  color: #34d399;
}

.form-toast-success i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.form-toast-error {
  padding: 2rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 10px;
  color: #ef4444;
}

.form-toast-error i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.mt-auto {
  margin-top: auto;
}
.mt-3 {
  margin-top: 1rem;
}

@media (max-width: 900px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }
  .pricing-card.featured-pricing {
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .how-it-works-grid {
    flex-direction: column;
    gap: 2rem;
  }
  
  .step-arrow {
    transform: rotate(90deg);
  }
  
  .form-row-premium {
    grid-template-columns: 1fr;
  }
}
</style>
