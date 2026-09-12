<template>
  <div class="b2b-page-wrap">
    <!-- INTERACTIVE AMBIENT GLOW BACKDROP -->
    <div class="immersive-ambient-bg" aria-hidden="true">
      <div class="glow-spot spotlight-1"></div>
      <div class="glow-spot spotlight-2"></div>
    </div>

    <!-- 2. Hero -->
    <section class="page-hero">
      <div class="editorial-container text-center">
        <span class="badge-v2 amber"><i class="fa-solid fa-briefcase"></i> DOANH NGHIỆP</span>
        <h1 class="page-hero-title">Giải Pháp Âm Nhạc Cho <span class="text-gold-gradient">Thương Hiệu</span></h1>
        <p class="page-hero-sub">Từ jingle TVC đến nhạc chủ đề sự kiện — XKProduction sản xuất âm nhạc thương mại chuyên nghiệp, đúng hạn, đúng cảm xúc brand.</p>
      </div>
    </section>

    <!-- 3. 4 B2B service cards -->
    <section class="services-b2b-section">
      <div class="editorial-container">
        <div class="b2b-services-grid">
          <div class="matte-card hover-lift text-center b2b-service-card">
            <div class="b2b-icon-wrap"><i class="fa-solid fa-film"></i></div>
            <h3>Nhạc TVC &amp; Quảng cáo</h3>
            <p>Sản xuất nhạc nền cho TVC 15s-60s, jingle, voice-over music.</p>
          </div>
          <div class="matte-card hover-lift text-center b2b-service-card">
            <div class="b2b-icon-wrap"><i class="fa-solid fa-crown"></i></div>
            <h3>Nhạc Thương Hiệu</h3>
            <p>Brand sound identity, nhạc chủ đề nhận diện.</p>
          </div>
          <div class="matte-card hover-lift text-center b2b-service-card">
            <div class="b2b-icon-wrap"><i class="fa-solid fa-building-columns"></i></div>
            <h3>Sự Kiện Doanh Nghiệp</h3>
            <p>Âm nhạc và âm thanh cho gala, hội nghị, team-building.</p>
          </div>
          <div class="matte-card hover-lift text-center b2b-service-card">
            <div class="b2b-icon-wrap"><i class="fa-solid fa-podcast"></i></div>
            <h3>Podcast &amp; Corporate Video</h3>
            <p>Underscore, bed music, cue sheets.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Why choose B2B section -->
    <section class="why-b2b-section">
      <div class="editorial-container">
        <div class="why-b2b-grid">
          <div class="why-b2b-item matte-card text-center">
            <div class="why-icon"><i class="fa-solid fa-shield-halved"></i></div>
            <h4>Bảo mật dự án</h4>
            <p>NDA sẵn sàng ký kết.</p>
          </div>
          <div class="why-b2b-item matte-card text-center">
            <div class="why-icon"><i class="fa-solid fa-stopwatch"></i></div>
            <h4>Đúng deadline</h4>
            <p>Cam kết bàn giao theo timeline thoả thuận.</p>
          </div>
          <div class="why-b2b-item matte-card text-center">
            <div class="why-icon"><i class="fa-solid fa-handshake-angle"></i></div>
            <h4>Flexible budget</h4>
            <p>Báo giá linh hoạt theo quy mô dự án.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Process -->
    <section class="process-section">
      <div class="editorial-container">
        <div class="section-header-minimal text-center" style="margin-bottom: 2rem;">
          <span class="badge-v2 amber">QUY TRÌNH HỢP TÁC</span>
        </div>
        <div class="process-b2b-grid matte-card">
          <div class="process-step">
            <span class="step-num">1</span>
            <strong>Nhận brief</strong>
          </div>
          <div class="process-step">
            <span class="step-num">2</span>
            <strong>Concept &amp; Demo</strong>
          </div>
          <div class="process-step">
            <span class="step-num">3</span>
            <strong>Sản xuất</strong>
          </div>
          <div class="process-step">
            <span class="step-num">4</span>
            <strong>Bàn giao</strong>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Stats bar -->
    <section class="stats-section">
      <div class="editorial-container text-center">
        <div class="matte-card stats-bar-inner">
          <div class="stat-item">
            <strong>2000+</strong>
            <span>Dự Án Hoàn Thành</span>
          </div>
          <div class="stat-item">
            <strong>7+</strong>
            <span>Năm Hoạt Động</span>
          </div>
          <div class="stat-item">
            <strong>300+</strong>
            <span>Nghệ sĩ &amp; Đối tác</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. CTA section with a contact form -->
    <section class="b2b-cta-section" style="margin-top: 4rem; padding-bottom: 6rem;">
      <div class="editorial-container">
        <div class="matte-card b2b-form-wrap">
          <div class="text-center" style="margin-bottom: 2.5rem;">
            <span class="badge-v2 amber" style="margin-bottom: 1rem;">LIÊN HỆ TRỰC TIẾP</span>
            <h2 class="editorial-heading">Đăng Ký Tư Vấn Doanh Nghiệp</h2>
            <p class="text-muted" style="margin-top: 0.5rem; max-width: 540px; margin-left: auto; margin-right: auto;">
              Gửi yêu cầu dự án âm nhạc thương mại. XKProduction sẽ phản hồi phương án &amp; báo giá sơ bộ trong vòng 24h. Hoặc có thể tạo brief trực tiếp tại <NuxtLink to="/start-a-project?service=b2b" class="link-gold">Start a Project</NuxtLink>.
            </p>
          </div>
          
          <Transition name="toast">
            <div v-if="submitState === 'success'" class="form-toast-success text-center">
              <i class="fa-solid fa-circle-check"></i>
              <p>Gửi yêu cầu thành công! XKProduction sẽ phản hồi sớm nhất.</p>
              <button class="btn btn-secondary mt-3" @click="submitState = 'idle'">Gửi yêu cầu khác</button>
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
                <label for="name">Họ và tên / Người đại diện <span class="req">*</span></label>
                <input id="name" v-model="form.name" type="text" placeholder="Nguyễn Văn A" :class="{ error: formErrors.name }" />
                <span v-if="formErrors.name" class="field-error-text">{{ formErrors.name }}</span>
              </div>
              <div class="form-group-premium">
                <label for="company">Tên công ty / Thương hiệu</label>
                <input id="company" v-model="form.company" type="text" placeholder="Công ty TNHH..." />
              </div>
            </div>
            <div class="form-row-premium">
              <div class="form-group-premium">
                <label for="phone">Số điện thoại <span class="req">*</span></label>
                <input id="phone" v-model="form.phone" type="tel" placeholder="09xx.xxx.xxx" :class="{ error: formErrors.phone }" />
                <span v-if="formErrors.phone" class="field-error-text">{{ formErrors.phone }}</span>
              </div>
              <div class="form-group-premium">
                <label for="service">Dịch vụ quan tâm <span class="req">*</span></label>
                <div class="custom-select-wrap">
                  <select id="service" v-model="form.service" :class="{ error: formErrors.service }">
                    <option value="">Chọn dịch vụ...</option>
                    <option value="TVC">TVC</option>
                    <option value="Thương hiệu">Thương hiệu</option>
                    <option value="Sự kiện">Sự kiện</option>
                    <option value="Podcast">Podcast</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
                <span v-if="formErrors.service" class="field-error-text">{{ formErrors.service }}</span>
              </div>
            </div>
            <div class="form-group-premium">
              <label for="message">Chi tiết yêu cầu</label>
              <textarea id="message" v-model="form.message" placeholder="Mô tả dự án, yêu cầu..." rows="4"></textarea>
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
  title: 'XKProduction cho Doanh Nghiệp — Nhạc TVC, Thương Hiệu, Sự Kiện | XKProduction',
  description: 'XKProduction sản xuất nhạc thương mại: nhạc TVC, jingle, brand music, nhạc sự kiện doanh nghiệp chuyên nghiệp. Báo giá nhanh trong 24h.',
  keywords: 'nhạc TVC, nhạc thương hiệu, sản xuất nhạc doanh nghiệp, jingle quảng cáo, âm nhạc sự kiện, brand music Vietnam',
  ogTitle: 'XKProduction cho Doanh Nghiệp — Âm Nhạc Thương Hiệu & TVC',
  ogDescription: 'Sản xuất âm nhạc thương mại cho doanh nghiệp: TVC, Jingle, Nhạc sự kiện. Báo giá nhanh trong 24 giờ.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogUrl: 'https://xkproduction.com/b2b',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
})

useSchemaOrg([
  defineWebPage({
    name: 'XKProduction cho Doanh Nghiệp — Nhạc TVC, Thương Hiệu, Sự Kiện | XKProduction',
    description: 'XKProduction sản xuất nhạc thương mại: nhạc TVC, jingle, brand music, nhạc sự kiện doanh nghiệp chuyên nghiệp. Báo giá nhanh trong 24h.'
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
    priceRange: '3.000.000₫ – 50.000.000₫'
  })
])

const config = useRuntimeConfig()
const FORMSPREE_ENDPOINT = config.public.formspreeEndpoint

const form = reactive({ name: '', company: '', phone: '', email: '', service: '', message: '' })
const formErrors = reactive({ name: '', phone: '', service: '' })
const submitState = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

function validateForm(): boolean {
  let valid = true
  formErrors.name = form.name.trim().length < 2 ? 'Vui lòng nhập họ và tên' : ''
  const phone = form.phone.replace(/[\.\s\-]/g, '')
  formErrors.phone = !/^(0[3-9]\d{8})$/.test(phone) ? 'Số điện thoại không hợp lệ (10 số)' : ''
  formErrors.service = !form.service ? 'Vui lòng chọn dịch vụ' : ''
  if (formErrors.name || formErrors.phone || formErrors.service) valid = false
  return valid
}

async function handleSubmit() {
  if (!validateForm()) return
  submitState.value = 'loading'
  const { getTrackingPayload } = useAnalytics()
  const payload = {
    name: form.name + (form.company ? ` (${form.company})` : ''),
    phone: form.phone,
    email: form.email || '',
    service: form.service,
    message: form.message,
    source: 'b2b',
    ...getTrackingPayload()
  }

  try {
    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res.ok) {
      submitState.value = 'success'
      Object.assign(form, { name: '', company: '', phone: '', email: '', service: '', message: '' })
      return
    }
    throw new Error(`API error ${res.status}`)
  } catch (err) {
    console.warn('[b2b] API nội bộ không phản hồi, thử fallback sang Formspree:', err)
    try {
      if (FORMSPREE_ENDPOINT) {
        const fbRes = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            ...payload,
            _subject: `[XKProduction B2B] Yêu cầu từ ${payload.name} (${payload.phone})`
          })
        })
        if (fbRes.ok) {
          submitState.value = 'success'
          Object.assign(form, { name: '', company: '', phone: '', email: '', service: '', message: '' })
          return
        }
      }
    } catch (fbErr) {
      console.error('[b2b] Fallback Formspree lỗi:', fbErr)
    }
    submitState.value = 'error'
  }
}
</script>

<style scoped>
.b2b-page-wrap {
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

.services-b2b-section {
  position: relative;
  z-index: 1;
  padding: 4rem 0;
}

.b2b-services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.b2b-service-card {
  padding: 2.5rem 1.5rem;
}

.b2b-icon-wrap {
  width: 52px;
  height: 52px;
  margin: 0 auto 1.5rem;
  background: rgba(217, 119, 6, 0.1);
  border: 1px solid rgba(217, 119, 6, 0.25);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #fbbf24;
}

.b2b-service-card h3 {
  font-size: 1.2rem;
  color: var(--text-main);
  margin-bottom: 1rem;
}

.b2b-service-card p {
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.6;
}

.why-b2b-section {
  position: relative;
  z-index: 1;
  padding: 4rem 0;
}

.why-b2b-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.why-b2b-item {
  padding: 2rem;
}

.why-icon {
  font-size: 2rem;
  color: #fbbf24;
  margin-bottom: 1rem;
}

.why-b2b-item h4 {
  font-size: 1.1rem;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.why-b2b-item p {
  color: var(--text-light);
  font-size: 0.9rem;
}

.process-section {
  position: relative;
  z-index: 1;
  padding: 4rem 0;
}

.process-b2b-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 2rem;
}

.process-step {
  text-align: center;
}

.step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background: rgba(217, 119, 6, 0.15);
  border: 1px solid rgba(217, 119, 6, 0.35);
  color: #fbbf24;
  border-radius: 50%;
  font-weight: 700;
  margin-bottom: 1rem;
}

.process-step strong {
  display: block;
  color: var(--text-main);
  font-size: 1rem;
}

.stats-section {
  position: relative;
  z-index: 1;
  padding: 4rem 0;
}

.stats-bar-inner {
  display: flex;
  justify-content: space-around;
  padding: 2.5rem;
}

.stat-item strong {
  display: block;
  font-size: 2.5rem;
  color: #fbbf24;
  margin-bottom: 0.5rem;
}

.stat-item span {
  color: var(--text-muted);
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 1px;
}

.link-gold {
  color: #fbbf24;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.link-gold:hover {
  color: #f59e0b;
}

.b2b-cta-section {
  position: relative;
  z-index: 1;
}

.b2b-form-wrap {
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
  border-color: rgba(217, 119, 6, 0.5);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 4px 20px rgba(217, 119, 6, 0.1);
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

.mt-3 {
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .b2b-services-grid {
    grid-template-columns: 1fr;
  }
  
  .why-b2b-grid {
    grid-template-columns: 1fr;
  }
  
  .process-b2b-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .stats-bar-inner {
    flex-direction: column;
    gap: 2rem;
  }
  
  .form-row-premium {
    grid-template-columns: 1fr;
  }
}
</style>
