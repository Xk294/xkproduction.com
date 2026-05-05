<template>
  <div>
    <section class="page-hero">
      <div class="max-width">
        <h1>Liên hệ &amp; Đặt lịch</h1>
        <p class="page-hero-sub">Chia sẻ dự án của bạn — chúng tôi sẽ tư vấn giải pháp phù hợp nhất trong 24 giờ</p>
      </div>
    </section>

    <section style="padding: 5rem 0;">
      <div class="max-width contact-grid">

        <!-- Thông tin liên hệ -->
        <div class="contact-info">
          <h2>Thông tin liên hệ</h2>
          <div v-for="info in contactInfo" :key="info.title" class="contact-item">
            <span class="contact-icon"><i :class="info.faIcon"></i></span>
            <div>
              <strong>{{ info.title }}</strong>
              <div v-html="info.content" class="contact-content"></div>
            </div>
          </div>

          <div class="contact-hours">
            <h3>Giờ làm việc</h3>
            <p>Thứ 2 – Thứ 6: 7:00 – 22:00</p>
            <p>Thứ 7 – Chủ nhật: 8:00 – 20:00</p>
          </div>
        </div>

        <!-- Form liên hệ -->
        <div class="contact-form-wrap">
          <h2>Gửi yêu cầu tư vấn</h2>

          <!-- SUCCESS STATE -->
          <div v-if="submitState === 'success'" class="form-success">
            <i class="fa-solid fa-circle-check"></i>
            <h3>Đã gửi thành công!</h3>
            <p>Chúng tôi đã nhận yêu cầu và sẽ liên hệ lại trong vòng <strong>24 giờ</strong>.<br/>Trong thời gian đó, bạn có thể nhắn qua <a href="https://zalo.me/0355356294" target="_blank" rel="noopener">Zalo</a> để được hỗ trợ nhanh hơn.</p>
            <button class="btn btn-primary" style="margin-top:1.25rem;" @click="submitState = 'idle'">Gửi yêu cầu khác</button>
          </div>

          <form v-else class="contact-form" @submit.prevent="handleSubmit" novalidate>
            <!-- ERROR BANNER -->
            <div v-if="submitState === 'error'" class="form-error-banner" role="alert">
              <i class="fa-solid fa-triangle-exclamation"></i>
              Gửi thất bại. Vui lòng thử lại hoặc liên hệ qua <a href="https://zalo.me/0355356294" target="_blank" rel="noopener">Zalo 0355.356.294</a>.
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="cf-name">Họ tên <span class="req">*</span></label>
                <input type="text" id="cf-name" v-model="form.name"
                  placeholder="Nguyễn Văn A"
                  :class="{ 'input-error': formErrors.name }"
                  @blur="validateForm" />
                <span v-if="formErrors.name" class="field-error">
                  <i class="fa-solid fa-circle-exclamation"></i> {{ formErrors.name }}
                </span>
              </div>
              <div class="form-group">
                <label for="cf-phone">Số điện thoại <span class="req">*</span></label>
                <input type="tel" id="cf-phone" v-model="form.phone"
                  placeholder="0355 356 294"
                  :class="{ 'input-error': formErrors.phone }"
                  @blur="validateForm" />
                <span v-if="formErrors.phone" class="field-error">
                  <i class="fa-solid fa-circle-exclamation"></i> {{ formErrors.phone }}
                </span>
              </div>
            </div>

            <div class="form-group">
              <label for="cf-email">Email <span class="optional">(không bắt buộc)</span></label>
              <input type="email" id="cf-email" v-model="form.email" placeholder="email@example.com" />
            </div>

            <div class="form-group">
              <label for="cf-service">Dịch vụ quan tâm <span class="req">*</span></label>
              <select id="cf-service" v-model="form.service"
                :class="{ 'input-error': formErrors.service }"
                @change="validateForm">
                <option value="">Chọn dịch vụ...</option>
                <option value="thu-am">Thu âm bài hát</option>
                <option value="mixing-mastering">Mixing &amp; Mastering</option>
                <option value="hoa-am">Hòa âm phối khí</option>
                <option value="mv-tvc">Sản xuất MV / TVC</option>
                <option value="live-band">Âm thanh - Live Band sự kiện</option>
                <option value="khoa-hoc">Khoá học âm nhạc</option>
                <option value="other">Khác</option>
              </select>
              <span v-if="formErrors.service" class="field-error">
                <i class="fa-solid fa-circle-exclamation"></i> {{ formErrors.service }}
              </span>
            </div>

            <div class="form-group">
              <label for="cf-message">Mô tả dự án <span class="req">*</span></label>
              <textarea id="cf-message" v-model="form.message"
                placeholder="Bài hát thể loại gì? Timeline dự kiến? Ngân sách tham khảo?..."
                :class="{ 'input-error': formErrors.message }"
                @blur="validateForm"></textarea>
              <span v-if="formErrors.message" class="field-error">
                <i class="fa-solid fa-circle-exclamation"></i> {{ formErrors.message }}
              </span>
            </div>

            <button type="submit" class="btn btn-primary form-submit" :disabled="submitState === 'loading'">
              <i v-if="submitState === 'loading'" class="fa-solid fa-spinner fa-spin"></i>
              <span>{{ submitState === 'loading' ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn' }}</span>
            </button>
          </form>
        </div>

      </div>
    </section>

    <!-- Google Maps Embed -->
    <section class="map-section">
      <div class="max-width">
        <h2 class="map-heading"><i class="fa-solid fa-map-location-dot"></i> Vị trí XKProduction</h2>
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.123!2d107.11719352335317!3d11.71792651529057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDQzJzA0LjUiTiAxMDfCsDA3JzAyLjAiRQ!5e0!3m2!1svi!2svn!4v1714500000000!5m2!1svi!2svn"
            width="100%"
            height="420"
            style="border:0;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Vị trí XKProduction trên Google Maps - QL14 km25, Nghĩa Trung, Bù Đăng, Bình Phước"
          ></iframe>
          <a
            href="https://www.google.com/maps/search/?api=1&query=11.71792651529057,107.11719352335317"
            target="_blank" rel="noopener"
            class="map-directions-link"
          >
            <i class="fa-solid fa-diamond-turn-right"></i>
            Chỉ đường đến XKProduction
            <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.75rem;"></i>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Liên hệ & Đặt lịch Thu âm, Mix Master - XKProduction',
  description: 'Liên hệ XKProduction để đặt lịch thu âm bài hát, tư vấn mixing/mastering, hoà âm phối khí. Hotline: 0355.356.294. Phản hồi trong 24 giờ.',
  ogTitle: 'Liên hệ Đặt lịch Thu âm & Tư vấn Dịch vụ - XKProduction',
  ogDescription: 'Hotline: 0355.356.294 | Zalo: 0355.356.294 | Email: xkstudio29@gmail.com. Đặt lịch thu âm, tư vấn mix master & hoà âm phối khí chuyên nghiệp.',
  ogImage: 'https://xkproduction.com/images/xk-logo-new.jpg',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Liên hệ XKProduction đặt lịch thu âm',
  ogUrl: 'https://xkproduction.com/contact',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xkproduction.com/images/xk-logo-new.jpg',
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
    email: 'xkstudio29@gmail.com',
    url: 'https://xkproduction.com',
    image: 'https://xkproduction.com/images/xk-logo-new.jpg',
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
      ratingCount: 2000,
      bestRating: '5',
      worstRating: '1'
    }
  })
])

/* === FORMSPREE INTEGRATION ===
 * Bước 1: Đăng ký tại https://formspree.io (miễn phí)
 * Bước 2: Tạo New Form, lấy Form ID (dạng: xyzabcde)
 * Bước 3: Thay 'YOUR_FORM_ID' bên dưới bằng ID của bạn
 * Bước 4: Trong Formspree dashboard, thêm email nhận thông báo
 */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mojybjvk'

const form = reactive({ name: '', phone: '', email: '', service: '', message: '' })
const formErrors = reactive({ name: '', phone: '', service: '', message: '' })
const submitState = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

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
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email || '(không điền)',
        service: form.service,
        message: form.message,
        _subject: `[XKProduction] Yêu cầu từ ${form.name} — ${form.service}`
      })
    })
    if (res.ok) {
      submitState.value = 'success'
      Object.assign(form, { name: '', phone: '', email: '', service: '', message: '' })
      Object.assign(formErrors, { name: '', phone: '', service: '', message: '' })
    } else {
      submitState.value = 'error'
    }
  } catch {
    submitState.value = 'error'
  }
}

const contactInfo = [
  { faIcon: 'fa-solid fa-phone', title: 'Hotline / Zalo', content: '<a href="tel:0355356294">0355.356.294</a>' },
  { faIcon: 'fa-solid fa-envelope', title: 'Email', content: '<a href="mailto:xkstudio29@gmail.com">xkstudio29@gmail.com</a>' },
  { faIcon: 'fa-solid fa-comment', title: 'Zalo', content: '<a href="https://zalo.me/0355356294" target="_blank" rel="noopener">0355.356.294</a>' },
  { faIcon: 'fa-brands fa-facebook-f', title: 'Facebook', content: '<a href="https://www.facebook.com/ngxkiet" target="_blank" rel="noopener">facebook.com/ngxkiet</a>' },
  { faIcon: 'fa-solid fa-location-dot', title: 'Địa chỉ', content: 'QL14 km25 xã Nghĩa Trung, Huyện Bù Đăng, Bình Phước' }
]
</script>

<style scoped>
.page-hero {
  padding-top: 140px;
  padding-bottom: 4rem;
  background: linear-gradient(135deg, #06080f 0%, #0d1117 100%);
  text-align: center;
}
.page-hero h1 { font-size: 2.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem; }
.page-hero-sub { font-size: 1.05rem; color: var(--text-light); max-width: 600px; margin: 0 auto; }

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: start;
}

.contact-info h2, .contact-form-wrap h2 {
  font-size: 1.5rem; font-weight: 700; color: var(--text-main); margin-bottom: 1.5rem;
}

.contact-item {
  display: flex; gap: 1rem; align-items: flex-start;
  padding: 1rem; background: var(--bg-surface); border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.05); margin-bottom: 1rem;
}
.contact-icon { font-size: 1.4rem; flex-shrink: 0; }
.contact-content { color: var(--text-light); font-size: 0.95rem; margin-top: 0.25rem; }
.contact-content a { color: var(--primary); text-decoration: none; }
.contact-content a:hover { text-decoration: underline; }
.contact-item strong { color: var(--text-main); font-size: 0.85rem; display: block; }

.contact-hours {
  margin-top: 2rem; padding: 1.5rem; background: var(--bg-surface);
  border-radius: 10px; border: 1px solid rgba(255,255,255,0.05);
}
.contact-hours h3 { color: var(--text-main); margin-bottom: 0.75rem; font-size: 1rem; }
.contact-hours p { color: var(--text-light); font-size: 0.9rem; margin-bottom: 0.3rem; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

.form-group { margin-bottom: 1.1rem; }
.form-group label {
  display: block; color: var(--text-light); margin-bottom: 0.4rem;
  font-size: 0.85rem; font-weight: 600; letter-spacing: 0.3px;
}
.req { color: #ff6b6b; }
.optional { color: rgba(156,175,207,0.5); font-weight: 400; font-size: 0.78rem; }
.field-error {
  display: flex; align-items: center; gap: 0.35rem;
  font-size: 0.75rem; color: #ff6b6b; margin-top: 0.3rem;
}

.form-group input, .form-group select, .form-group textarea {
  width: 100%; padding: 0.85rem 1rem;
  background: rgba(20,24,45,0.6); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px; color: var(--text-main); font-family: inherit; font-size: 0.95rem;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
  outline: none; border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(26,140,255,0.12);
}
.form-group input.input-error,
.form-group select.input-error,
.form-group textarea.input-error {
  border-color: rgba(255,107,107,0.6);
  background: rgba(255,107,107,0.05);
}
.form-group textarea { min-height: 140px; resize: vertical; }
.form-group select { cursor: pointer; }
.form-group select option { background: #11142b; }

/* SUCCESS STATE */
.form-success {
  text-align: center; padding: 3rem 2rem;
  background: rgba(0,229,192,0.06);
  border: 1.5px solid rgba(0,229,192,0.25);
  border-radius: 14px;
}
.form-success i { font-size: 3rem; color: #00e5c0; margin-bottom: 1rem; display: block; }
.form-success h3 { font-size: 1.4rem; color: var(--text-main); margin-bottom: 0.6rem; }
.form-success p { color: var(--text-light); line-height: 1.7; }
.form-success a { color: var(--primary); }

/* ERROR BANNER */
.form-error-banner {
  display: flex; align-items: center; gap: 0.65rem;
  padding: 0.9rem 1.1rem; border-radius: 10px; margin-bottom: 1rem;
  background: rgba(255,107,107,0.08); border: 1px solid rgba(255,107,107,0.3);
  color: #ff9090; font-size: 0.85rem;
}
.form-error-banner a { color: var(--primary); }
.form-error-banner i { flex-shrink: 0; }

.form-submit { width: 100%; padding: 1rem; font-size: 1rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
.form-submit:disabled { opacity: 0.65; cursor: not-allowed; }

/* === MAP SECTION === */
.map-section {
  padding: 0 0 5rem;
}
.map-heading {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.map-heading i {
  color: var(--primary);
}
.map-container {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(26,140,255,0.12);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  position: relative;
}
.map-container iframe {
  display: block;
  width: 100%;
  min-height: 420px;
  border: none;
  filter: brightness(0.85) contrast(1.1) saturate(0.9);
  transition: filter 0.35s ease;
}
.map-container:hover iframe {
  filter: brightness(0.95) contrast(1.05) saturate(1);
}
.map-directions-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 1rem;
  background: rgba(20,24,45,0.9);
  color: var(--primary);
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  border-top: 1px solid rgba(26,140,255,0.12);
  transition: all 0.28s ease;
}
.map-directions-link:hover {
  background: rgba(26,140,255,0.08);
  color: #5bbfff;
}

@media (max-width: 992px) {
  .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
}
@media (max-width: 576px) {
  .form-row { grid-template-columns: 1fr; }
  .page-hero h1 { font-size: 1.9rem; }
  .map-container iframe { min-height: 280px; }
}
</style>
