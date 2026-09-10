<template>
  <div class="start-project-page">
    <div class="editorial-container">
      <!-- HEADER -->
      <div class="page-header text-center">
        <span class="badge-v2 amber">COMMISSION &amp; BRIEF</span>
        <h1 class="start-title">START A PROJECT</h1>
        <p class="start-subtitle">
          Khởi đầu hành trình hợp tác cùng XKProduction. Hãy chia sẻ ý niệm âm nhạc, mong muốn hoặc bản thu thử của bạn để nhận kế hoạch sản xuất chi tiết.
        </p>
      </div>

      <!-- MAIN SPLIT LAYOUT -->
      <div class="start-layout-grid">
        <!-- LEFT: TRUST & STUDIO COMMITMENTS -->
        <div class="start-info-col">
          <div class="studio-commit-card matte-card">
            <span class="badge-v2 teal">CAM KẾT CỦA STUDIO</span>
            <h2 class="commit-title">Quy Chuẩn Đồng Hành Chuyên Nghiệp</h2>
            
            <div class="commit-items">
              <div class="commit-item">
                <div class="c-icon"><i class="fa-solid fa-lock"></i></div>
                <div>
                  <strong>Bảo Mật Ý Tưởng Tuyệt Đối (NDA)</strong>
                  <p>Mọi bản demo, giai điệu sơ khởi hay file multitrack bạn gửi đều thuộc quyền sở hữu trí tuệ của riêng bạn.</p>
                </div>
              </div>

              <div class="commit-item">
                <div class="c-icon"><i class="fa-solid fa-clock"></i></div>
                <div>
                  <strong>Phản Hồi Trong Vòng 2 Giờ</strong>
                  <p>Đội ngũ sản xuất sẽ trực tiếp lắng nghe file demo và gửi phản hồi định hướng âm thanh cụ thể.</p>
                </div>
              </div>

              <div class="commit-item">
                <div class="c-icon"><i class="fa-solid fa-handshake"></i></div>
                <div>
                  <strong>Minh Bạch Chi Phí & Tiến Độ</strong>
                  <p>Báo giá trọn gói một lần, không phát sinh chi phí ẩn và bàn giao đúng thời hạn cam kết.</p>
                </div>
              </div>
            </div>

            <!-- DIRECT CONTACT -->
            <div class="direct-contact-box">
              <span class="text-meta-mono d-title">HOẶC LIÊN HỆ TRỰC TIẾP QUA:</span>
              <a href="tel:0355356294" class="d-line">
                <i class="fa-solid fa-phone"></i>
                <strong>0355.356.294 (Hotline)</strong>
              </a>
              <a href="https://zalo.me/0355356294" target="_blank" rel="noopener noreferrer" class="d-line">
                <i class="fa-solid fa-comment-dots"></i>
                <strong>Zalo: 0355.356.294 (Studio)</strong>
              </a>
              <div class="d-address">
                <i class="fa-solid fa-location-dot"></i>
                <span>QL14 km25, Nghĩa Trung, Bù Đăng, Bình Phước</span>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: BRIEF SUBMISSION FORM -->
        <div class="start-form-col">
          <div class="form-container matte-card">
            <Transition name="toast">
              <div v-if="submitted" class="success-banner" role="alert">
                <i class="fa-solid fa-circle-check"></i>
                <div>
                  <strong>Gửi Brief Thành Công!</strong>
                  <p>XKProduction đã nhận được thông tin dự án. Chúng tôi sẽ lắng nghe demo và liên hệ lại với bạn trong vòng 2 giờ.</p>
                </div>
              </div>
            </Transition>

            <form @submit.prevent="handleSubmit" novalidate>
              <div class="form-field">
                <label for="f-name">Họ tên hoặc Nghệ danh <span class="req">*</span></label>
                <input
                  id="f-name"
                  v-model="form.name"
                  type="text"
                  placeholder="Ví dụ: Hoàng Long / Rapper Revan..."
                  :class="{ error: errors.name }"
                />
                <span v-if="errors.name" class="err-text">{{ errors.name }}</span>
              </div>

              <div class="form-row">
                <div class="form-field">
                  <label for="f-phone">Số điện thoại / Zalo <span class="req">*</span></label>
                  <input
                    id="f-phone"
                    v-model="form.phone"
                    type="tel"
                    placeholder="09xx.xxx.xxx"
                    :class="{ error: errors.phone }"
                  />
                  <span v-if="errors.phone" class="err-text">{{ errors.phone }}</span>
                </div>

                <div class="form-field">
                  <label for="f-email">Email liên hệ</label>
                  <input
                    id="f-email"
                    v-model="form.email"
                    type="email"
                    placeholder="artist@example.com"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-field">
                  <label for="f-service">Năng lực cần hỗ trợ <span class="req">*</span></label>
                  <select id="f-service" v-model="form.service">
                    <option value="music-production">Music Production (Hoà Âm Phối Khí)</option>
                    <option value="creative-sound">Creative Sound (Mix & Master)</option>
                    <option value="recording">Thu Âm & Vocal Coaching</option>
                    <option value="live-production">Live Sound & Ban Nhạc Sự Kiện</option>
                    <option value="full-package">Sản Xuất Bài Hát Trọn Gói (A đến Z)</option>
                  </select>
                </div>

                <div class="form-field">
                  <label for="f-timeline">Kế hoạch tiến độ</label>
                  <select id="f-timeline" v-model="form.timeline">
                    <option value="standard">Tiêu chuẩn (7 — 10 ngày)</option>
                    <option value="rush">Cần gấp (3 — 5 ngày)</option>
                    <option value="flexible">Linh hoạt theo cảm hứng</option>
                  </select>
                </div>
              </div>

              <div class="form-field">
                <label for="f-demo">Đường dẫn file Demo / Voice Memo (Google Drive, Soundcloud, YouTube...)</label>
                <input
                  id="f-demo"
                  v-model="form.demoUrl"
                  type="url"
                  placeholder="https://drive.google.com/drive/folders/..."
                />
              </div>

              <div class="form-field">
                <label for="f-message">Mô tả về tác phẩm &amp; Mong muốn nghệ thuật</label>
                <textarea
                  id="f-message"
                  v-model="form.message"
                  rows="4"
                  placeholder="Chia sẻ về thể loại, nhạc cụ bạn yêu thích, thông điệp bài hát hoặc ca khúc tham chiếu..."
                ></textarea>
              </div>

              <button
                type="submit"
                class="btn-submit-brief"
                :disabled="submitting"
              >
                <i v-if="submitting" class="fa-solid fa-spinner fa-spin"></i>
                <span>{{ submitting ? 'ĐANG GỬI BRIEF...' : 'GỬI PROJECT BRIEF CHO STUDIO' }}</span>
                <i v-if="!submitting" class="fa-solid fa-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const submitting = ref(false)
const submitted = ref(false)

const form = reactive({
  name: '',
  phone: '',
  email: '',
  service: 'music-production',
  timeline: 'standard',
  demoUrl: '',
  message: ''
})

const errors = reactive({
  name: '',
  phone: ''
})

function validate() {
  let valid = true
  errors.name = ''
  errors.phone = ''

  if (!form.name.trim()) {
    errors.name = 'Vui lòng nhập họ tên hoặc nghệ danh.'
    valid = false
  }

  const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
  if (!form.phone.trim()) {
    errors.phone = 'Vui lòng nhập số điện thoại hoặc Zalo.'
    valid = false
  } else if (!phoneRegex.test(form.phone.replace(/\D/g, ''))) {
    errors.phone = 'Số điện thoại không hợp lệ.'
    valid = false
  }

  return valid
}

async function handleSubmit() {
  if (!validate()) return

  submitting.value = true

  const cleanPhone = form.phone.replace(/[.\s-]/g, '').replace(/^\+84/, '0')
  const payload = {
    name: form.name.trim(),
    phone: cleanPhone,
    email: form.email?.trim() || '',
    service: form.service || 'music-production',
    message: `[Project Brief V2] Dịch vụ: ${form.service}. Tiến độ: ${form.timeline}. Demo URL: ${form.demoUrl || '(không có)'}. Lời nhắn: ${form.message || '(không có)'}`,
    source: 'start-a-project-v2'
  }

  try {
    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      throw new Error(`Internal API returned ${res.status}`)
    }

    try {
      const { trackCta } = useAnalytics()
      trackCta(`Brief Submit: ${form.service}`)
    } catch {}

    submitted.value = true
    form.name = ''
    form.phone = ''
    form.email = ''
    form.demoUrl = ''
    form.message = ''
  } catch (err) {
    console.warn('[StartAProject] Gửi API nội bộ thất bại, chuyển fallback Formspree:', err)
    try {
      const config = useRuntimeConfig()
      const endpoint = config.public.formspreeEndpoint
      if (endpoint) {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            ...payload,
            _subject: `[Project Brief V2] ${payload.name} (${payload.phone})`
          })
        })
      }
      submitted.value = true
      form.name = ''
      form.phone = ''
      form.email = ''
      form.demoUrl = ''
      form.message = ''
    } catch (fbErr) {
      console.error('[StartAProject] Fallback Formspree lỗi:', fbErr)
      submitted.value = true
    }
  } finally {
    submitting.value = false
  }
}

useSeoMeta({
  title: 'Start A Project — Khởi Động Dự Án Âm Nhạc | XKProduction',
  description: 'Nộp project brief, trao đổi ý niệm và bắt đầu quy trình sản xuất âm nhạc cùng XKProduction.',
  ogTitle: 'Start A Project | XKProduction',
  ogDescription: 'Khởi động dự án âm nhạc chuyên nghiệp cùng XKProduction.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogUrl: 'https://xkproduction.com/start-a-project'
})
</script>

<style scoped>
.start-project-page {
  padding-top: clamp(7.5rem, 14vw, 11rem);
  padding-bottom: 6rem;
  background-color: var(--bg-canvas);
  color: var(--text-primary);
  min-height: 100vh;
}

.page-header {
  margin-bottom: 4rem;
}

.start-title {
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.start-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.6;
}

.start-layout-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 3.5rem;
  align-items: start;
}

.studio-commit-card {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.commit-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-primary);
}

.commit-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.commit-item {
  display: flex;
  gap: 1rem;
}

.c-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(217, 119, 6, 0.12);
  color: #fbbf24;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.commit-item strong {
  display: block;
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
}

.commit-item p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.55;
}

.direct-contact-box {
  padding-top: 2rem;
  border-top: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.d-title {
  font-size: 0.6875rem;
  color: var(--text-subtle);
  margin-bottom: 0.25rem;
}

.d-line {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.9375rem;
  transition: color 0.15s ease;
}

.d-line:hover {
  color: #fbbf24;
}

.d-line i {
  color: #d97706;
}

.d-address {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.45;
  margin-top: 0.5rem;
}

.d-address i {
  color: #0d9488;
  margin-top: 0.2rem;
}

/* FORM CONTAINER */
.form-container {
  padding: clamp(2rem, 5vw, 3.5rem);
}

.success-banner {
  padding: 1.25rem;
  background: rgba(13, 148, 136, 0.15);
  border: 1px solid rgba(13, 148, 136, 0.35);
  border-radius: 8px;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  color: #2dd4bf;
  margin-bottom: 2rem;
}

.success-banner i {
  font-size: 1.25rem;
  margin-top: 0.2rem;
}

.success-banner strong {
  display: block;
  font-size: 1rem;
  color: #ffffff;
  margin-bottom: 0.25rem;
}

.success-banner p {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-field label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.req {
  color: #f87171;
}

.form-field input,
.form-field select,
.form-field textarea {
  padding: 0.85rem 1.15rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.9375rem;
  transition: border-color 0.15s ease;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  outline: none;
  border-color: #d97706;
}

.form-field input.error {
  border-color: #f87171;
}

.err-text {
  font-size: 0.75rem;
  color: #f87171;
}

.btn-submit-brief {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 1.15rem;
  background: var(--text-primary);
  color: var(--bg-canvas);
  font-weight: 800;
  font-size: 0.9375rem;
  letter-spacing: 0.08em;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.btn-submit-brief:hover:not(:disabled) {
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 0 24px rgba(255, 255, 255, 0.25);
}

.btn-submit-brief:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .start-layout-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .studio-commit-card,
  .form-container {
    padding: 1.75rem;
  }
}
</style>
