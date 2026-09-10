<template>
  <div class="build-project-page">
    <div class="editorial-container">
      <!-- HEADER -->
      <div class="page-header text-center">
        <span class="badge-v2 amber">PRE-PRODUCTION ROOM</span>
        <h1 class="wizard-title">BUILD YOUR PROJECT</h1>
        <p class="wizard-subtitle">
          Quy trình tư vấn thông minh 6 bước giúp bạn hoạch định quy mô, định hình thể loại, dự toán ngân sách và chuẩn bị brief trước khi tiến hành sản xuất tại XKProduction.
        </p>
      </div>

      <!-- PROGRESS INDICATOR -->
      <div class="step-progress-strip">
        <div
          v-for="s in 6"
          :key="s"
          class="progress-step-item"
          :class="{ 'is-active': currentStep === s, 'is-completed': currentStep > s }"
          @click="s < currentStep ? currentStep = s : null"
        >
          <div class="step-circle">{{ s }}</div>
          <span class="step-title-text text-meta-mono">{{ stepTitles[s - 1] }}</span>
        </div>
      </div>

      <!-- WIZARD CARD -->
      <div class="wizard-container matte-card">
        <!-- STEP 1: FORMAT -->
        <div v-if="currentStep === 1" class="wizard-step">
          <span class="step-tag text-meta-mono">BƯỚC 01 / 06</span>
          <h2 class="step-heading">Định dạng sản phẩm bạn muốn sản xuất là gì?</h2>
          <div class="options-grid">
            <div
              v-for="opt in formatOptions"
              :key="opt.id"
              class="option-card"
              :class="{ selected: form.format === opt.id }"
              @click="form.format = opt.id"
            >
              <i :class="opt.icon"></i>
              <strong>{{ opt.title }}</strong>
              <p>{{ opt.desc }}</p>
            </div>
          </div>
        </div>

        <!-- STEP 2: CURRENT ASSETS -->
        <div v-if="currentStep === 2" class="wizard-step">
          <span class="step-tag text-meta-mono">BƯỚC 02 / 06</span>
          <h2 class="step-heading">Bạn đang có sẵn tài nguyên gì trong tay?</h2>
          <div class="options-grid">
            <div
              v-for="opt in assetOptions"
              :key="opt.id"
              class="option-card"
              :class="{ selected: form.assetStatus === opt.id }"
              @click="form.assetStatus = opt.id"
            >
              <i :class="opt.icon"></i>
              <strong>{{ opt.title }}</strong>
              <p>{{ opt.desc }}</p>
            </div>
          </div>
        </div>

        <!-- STEP 3: CAPABILITIES NEEDED -->
        <div v-if="currentStep === 3" class="wizard-step">
          <span class="step-tag text-meta-mono">BƯỚC 03 / 06</span>
          <h2 class="step-heading">Bạn cần XKProduction đảm nhiệm những khâu nào?</h2>
          <div class="options-grid">
            <div
              v-for="opt in capabilityOptions"
              :key="opt.id"
              class="option-card checkbox-card"
              :class="{ selected: form.capabilities.includes(opt.id) }"
              @click="toggleCapability(opt.id)"
            >
              <div class="check-box-indicator">
                <i v-if="form.capabilities.includes(opt.id)" class="fa-solid fa-check"></i>
              </div>
              <div>
                <strong>{{ opt.title }}</strong>
                <p>{{ opt.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- STEP 4: SCOPE -->
        <div v-if="currentStep === 4" class="wizard-step">
          <span class="step-tag text-meta-mono">BƯỚC 04 / 06</span>
          <h2 class="step-heading">Quy mô số lượng tác phẩm dự kiến?</h2>
          <div class="options-grid">
            <div
              v-for="opt in scopeOptions"
              :key="opt.id"
              class="option-card"
              :class="{ selected: form.scope === opt.id }"
              @click="form.scope = opt.id"
            >
              <i :class="opt.icon"></i>
              <strong>{{ opt.title }}</strong>
              <p>{{ opt.desc }}</p>
            </div>
          </div>
        </div>

        <!-- STEP 5: TIMELINE -->
        <div v-if="currentStep === 5" class="wizard-step">
          <span class="step-tag text-meta-mono">BƯỚC 05 / 06</span>
          <h2 class="step-heading">Kế hoạch thời gian và tiến độ bạn mong muốn?</h2>
          <div class="options-grid">
            <div
              v-for="opt in timelineOptions"
              :key="opt.id"
              class="option-card"
              :class="{ selected: form.timeline === opt.id }"
              @click="form.timeline = opt.id"
            >
              <i :class="opt.icon"></i>
              <strong>{{ opt.title }}</strong>
              <p>{{ opt.desc }}</p>
            </div>
          </div>
        </div>

        <!-- STEP 6: CONTACT & DEMO LINK -->
        <div v-if="currentStep === 6" class="wizard-step">
          <span class="step-tag text-meta-mono">BƯỚC 06 / 06</span>
          <h2 class="step-heading">Thông tin liên hệ &amp; Link bản demo (nếu có)</h2>
          
          <div class="brief-form-inputs">
            <div class="input-group">
              <label for="b-name">Họ tên hoặc nghệ danh <span class="req">*</span></label>
              <input id="b-name" v-model="form.name" type="text" placeholder="Ví dụ: Nguyễn Văn A / Nghệ danh..." />
            </div>

            <div class="input-row">
              <div class="input-group">
                <label for="b-phone">Số điện thoại / Zalo <span class="req">*</span></label>
                <input id="b-phone" v-model="form.phone" type="tel" placeholder="09xx.xxx.xxx" />
              </div>
              <div class="input-group">
                <label for="b-email">Email liên hệ (tuỳ chọn)</label>
                <input id="b-email" v-model="form.email" type="email" placeholder="name@domain.com" />
              </div>
            </div>

            <div class="input-group">
              <label for="b-demo">Đường dẫn file demo / Voice memo (Google Drive, Dropbox, YouTube unlisted...)</label>
              <input id="b-demo" v-model="form.demoUrl" type="url" placeholder="https://drive.google.com/..." />
            </div>

            <div class="input-group">
              <label for="b-notes">Ghi chú bổ sung hoặc mong muốn đặc biệt</label>
              <textarea id="b-notes" v-model="form.notes" rows="3" placeholder="Mô tả thể loại, nghệ sĩ tham chiếu bạn yêu thích..."></textarea>
            </div>
          </div>

          <!-- GENERATED PROJECT BRIEF SUMMARY -->
          <div class="brief-summary-card matte-card">
            <span class="text-meta-mono summary-badge">BẢN TÓM TẮT DỰ ÁN (PROJECT BRIEF SUMMARY)</span>
            <div class="summary-content">
              <p><strong>Định dạng:</strong> {{ getFormatTitle(form.format) }}</p>
              <p><strong>Tài nguyên hiện có:</strong> {{ getAssetTitle(form.assetStatus) }}</p>
              <p><strong>Khâu cần thực hiện:</strong> {{ form.capabilities.join(', ') || 'Chưa chọn' }}</p>
              <p><strong>Quy mô:</strong> {{ form.scope }} bài</p>
              <p><strong>Tiến độ:</strong> {{ form.timeline }}</p>
            </div>
          </div>
        </div>

        <!-- NAVIGATION BUTTONS -->
        <div class="wizard-nav-bar">
          <button
            v-if="currentStep > 1"
            type="button"
            class="btn-nav-prev"
            @click="currentStep--"
          >
            <i class="fa-solid fa-arrow-left"></i>
            <span>Quay lại</span>
          </button>
          <div v-else></div>

          <button
            v-if="currentStep < 6"
            type="button"
            class="btn-nav-next"
            @click="currentStep++"
          >
            <span>Tiếp theo</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>

          <div v-else class="finish-actions">
            <button
              type="button"
              class="btn-copy-brief"
              @click="copyBrief"
            >
              <i class="fa-solid fa-copy"></i>
              <span>{{ copied ? 'ĐÃ SAO CHÉP BRIEF' : 'SAO CHÉP BRIEF' }}</span>
            </button>
            <a
              :href="zaloUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-send-zalo"
            >
              <i class="fa-solid fa-comment-dots"></i>
              <span>GỬI QUA ZALO STUDIO</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const currentStep = ref(1)
const copied = ref(false)

const stepTitles = [
  'Định Dạng',
  'Tài Nguyên',
  'Năng Lực',
  'Quy Mô',
  'Tiến Độ',
  'Hoàn Tất'
]

const form = reactive({
  format: 'single',
  assetStatus: 'voice-memo',
  capabilities: ['Hoà Âm Phối Khí', 'Mix & Master'],
  scope: '1 bài',
  timeline: 'Tiêu chuẩn (7-10 ngày)',
  name: '',
  phone: '',
  email: '',
  demoUrl: '',
  notes: ''
})

const formatOptions = [
  { id: 'single', title: 'Single Ca Khúc', desc: '1 bài hát hoàn chỉnh chuẩn bị phát hành MV hoặc streaming.', icon: 'fa-solid fa-music' },
  { id: 'ep-album', title: 'EP / Album Đĩa Nhạc', desc: 'Tuyển tập 3 đến 8 ca khúc với concept âm nhạc đồng nhất.', icon: 'fa-solid fa-compact-disc' },
  { id: 'cover', title: 'Acoustic Cover / Remake', desc: 'Làm mới ca khúc quen thuộc theo phong cách riêng của bạn.', icon: 'fa-solid fa-guitar' },
  { id: 'commercial', title: 'Audio TVC & Brand Song', desc: 'Âm thanh quảng cáo, bài hát thương hiệu cho doanh nghiệp.', icon: 'fa-solid fa-bullhorn' },
  { id: 'live-sound', title: 'Âm Thanh Sự Kiện & Live', desc: 'Cho thuê âm thanh ánh sáng và FOH kỹ sư chuyên nghiệp.', icon: 'fa-solid fa-sliders' }
]

const assetOptions = [
  { id: 'idea', title: 'Mới là Ý Niệm trong đầu', desc: 'Chưa có bản ghi âm nào, cần tư vấn định hướng từ đầu.', icon: 'fa-solid fa-lightbulb' },
  { id: 'voice-memo', title: 'Đã có Voice Memo điện thoại', desc: 'Có đoạn thu âm giai điệu hoặc đệm đàn thô qua điện thoại.', icon: 'fa-solid fa-microphone' },
  { id: 'beat-ready', title: 'Đã có Beat, cần Thu & Mix', desc: 'Đã có file beat hoàn chỉnh, muốn đến thu vocal và mix master.', icon: 'fa-solid fa-headphones' },
  { id: 'multitrack-done', title: 'Đã thu xong Stems, cần Mix', desc: 'Có đầy đủ file stems 24-bit từ phòng thu khác cần mix master.', icon: 'fa-solid fa-file-audio' }
]

const capabilityOptions = [
  { id: 'Hoà Âm Phối Khí', title: 'Hoà Âm Phối Khí', desc: 'Xây dựng beat và phối khí độc bản từ ý tưởng demo.' },
  { id: 'Thu Âm Phòng Thu', title: 'Thu Âm Phòng Thu', desc: 'Thu âm vocal với microphone condenser và pre-amp analog.' },
  { id: 'Vocal Production', title: 'Vocal Coaching & Tuning', desc: 'Đồng hành luyện thanh và chỉnh sửa cao độ Melodyne.' },
  { id: 'Mix & Master', title: 'Mixing & Mastering', desc: 'Xử lý dải tần, không gian stereo và chuẩn -14 LUFS.' },
  { id: 'Quay MV Studio', title: 'Sản Xuất MV Phòng Thu', desc: 'Quay dựng video 4K session lưu lại khoảnh khắc biểu diễn.' }
]

const scopeOptions = [
  { id: '1 bài', title: '1 Tác Phẩm', desc: 'Tập trung toàn lực tạo nên một bài hát điểm nhấn.', icon: 'fa-solid fa-1' },
  { id: '2-3 bài', title: '2 — 3 Bài Hát (EP Nhỏ)', desc: 'Tạo nên một chuỗi sản phẩm phát hành liên hoàn.', icon: 'fa-solid fa-2' },
  { id: '5+ bài', title: '5 Bài Trở Lên (Album)', desc: 'Quy mô lớn với mức chiết khấu ưu đãi từ phòng thu.', icon: 'fa-solid fa-layer-group' }
]

const timelineOptions = [
  { id: 'Tiêu chuẩn (7-10 ngày)', title: 'Tiêu Chuẩn (7 — 10 Ngày)', desc: 'Thời gian lý tưởng để chăm chút tỉ mỉ từng chi tiết âm học.', icon: 'fa-solid fa-calendar' },
  { id: 'Cần Gấp (3-5 ngày)', title: 'Cần Gấp (3 — 5 Ngày)', desc: 'Ưu tiên dây chuyền sản xuất phục vụ deadline sự kiện.', icon: 'fa-solid fa-bolt' },
  { id: 'Thong thả / Dài hạn', title: 'Linh Hoạt / Dài Hạn', desc: 'Vừa sản xuất vừa lắng nghe và điều chỉnh theo cảm hứng.', icon: 'fa-solid fa-couch' }
]

function toggleCapability(id: string) {
  const idx = form.capabilities.indexOf(id)
  if (idx > -1) form.capabilities.splice(idx, 1)
  else form.capabilities.push(id)
}

function getFormatTitle(id: string) {
  return formatOptions.find(f => f.id === id)?.title || id
}

function getAssetTitle(id: string) {
  return assetOptions.find(a => a.id === id)?.title || id
}

const briefSummaryText = computed(() => {
  return `=== PROJECT BRIEF — XKPRODUCTION ===
- Định dạng: ${getFormatTitle(form.format)}
- Tài nguyên hiện có: ${getAssetTitle(form.assetStatus)}
- Các khâu cần làm: ${form.capabilities.join(', ')}
- Quy mô: ${form.scope}
- Tiến độ: ${form.timeline}
- Người gửi: ${form.name || 'Nghệ sĩ'}
- SĐT / Zalo: ${form.phone || 'Chưa cung cấp'}
- Email: ${form.email || 'N/A'}
- Link Demo: ${form.demoUrl || 'N/A'}
- Ghi chú: ${form.notes || 'N/A'}
====================================`
})

const zaloUrl = computed(() => {
  const encoded = encodeURIComponent(briefSummaryText.value)
  return `https://zalo.me/0355356294?text=${encoded}`
})

async function copyBrief() {
  if (import.meta.client) {
    await navigator.clipboard.writeText(briefSummaryText.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2500)
  }
}

useSeoMeta({
  title: 'Build Your Project — Pre-production Configurator | XKProduction',
  description: 'Công cụ hoạch định dự án âm nhạc thông minh 6 bước tại XKProduction. Dự toán ngân sách, chọn lựa năng lực và gửi brief tức thì.',
  ogTitle: 'Build Your Project | XKProduction',
  ogDescription: 'Pre-production Room — Hoạch định dự án âm nhạc của bạn cùng XKProduction.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogUrl: 'https://xkproduction.com/build-project'
})
</script>

<style scoped>
.build-project-page {
  padding-top: clamp(7.5rem, 14vw, 11rem);
  padding-bottom: 6rem;
  background-color: var(--bg-canvas);
  color: var(--text-primary);
  min-height: 100vh;
}

.page-header {
  margin-bottom: 3.5rem;
}

.wizard-title {
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.wizard-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 720px;
  margin: 0 auto;
  line-height: 1.6;
}

/* STEP PROGRESS STRIP */
.step-progress-strip {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.progress-step-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  opacity: 0.4;
  transition: opacity 0.2s ease;
}

.progress-step-item.is-active,
.progress-step-item.is-completed {
  opacity: 1;
}

.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--bg-surface-2);
  border: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ui-monospace, monospace;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--text-primary);
}

.is-active .step-circle {
  background: #d97706;
  border-color: #d97706;
  color: #ffffff;
}

.is-completed .step-circle {
  background: rgba(13, 148, 136, 0.2);
  border-color: #0d9488;
  color: #2dd4bf;
}

.step-title-text {
  font-size: 0.75rem;
  white-space: nowrap;
}

/* WIZARD CONTAINER */
.wizard-container {
  padding: clamp(2rem, 5vw, 4rem);
  max-width: 1000px;
  margin: 0 auto;
}

.wizard-step {
  margin-bottom: 3rem;
}

.step-tag {
  font-size: 0.75rem;
  color: #d97706;
}

.step-heading {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-top: 0.5rem;
  margin-bottom: 2.5rem;
}

/* OPTIONS GRID */
.options-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.option-card {
  padding: 1.75rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.option-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--border-hover);
}

.option-card.selected {
  background: rgba(217, 119, 6, 0.1);
  border-color: #d97706;
  box-shadow: 0 0 20px rgba(217, 119, 6, 0.2);
}

.option-card i {
  font-size: 1.5rem;
  color: #fbbf24;
  margin-bottom: 0.5rem;
}

.option-card strong {
  font-size: 1.125rem;
  color: var(--text-primary);
}

.option-card p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.checkbox-card {
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
}

.check-box-indicator {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 1px solid var(--border-subtle);
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fbbf24;
  font-size: 0.75rem;
  margin-top: 0.2rem;
  flex-shrink: 0;
}

.checkbox-card.selected .check-box-indicator {
  background: #d97706;
  border-color: #d97706;
  color: #ffffff;
}

/* STEP 6 INPUTS */
.brief-form-inputs {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.input-group .req {
  color: #f87171;
}

.input-group input,
.input-group textarea {
  padding: 0.85rem 1.15rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.9375rem;
  transition: border-color 0.15s ease;
}

.input-group input:focus,
.input-group textarea:focus {
  outline: none;
  border-color: #d97706;
}

.brief-summary-card {
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.3);
}

.summary-badge {
  font-size: 0.6875rem;
  color: #fbbf24;
  display: block;
  margin-bottom: 0.75rem;
}

.summary-content p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.summary-content strong {
  color: var(--text-primary);
}

/* NAV BAR */
.wizard-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
  border-top: 1px solid var(--border-subtle);
}

.btn-nav-prev {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.5rem;
  background: transparent;
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-nav-prev:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.05);
}

.btn-nav-next {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  background: var(--text-primary);
  color: var(--bg-canvas);
  font-weight: 800;
  font-size: 0.875rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-nav-next:hover {
  background: #ffffff;
  transform: translateY(-2px);
}

.finish-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-copy-brief {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-copy-brief:hover {
  background: rgba(255, 255, 255, 0.1);
}

.btn-send-zalo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.75rem;
  background: #0d9488;
  color: #ffffff;
  font-weight: 800;
  font-size: 0.875rem;
  border-radius: 6px;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.btn-send-zalo:hover {
  transform: translateY(-2px);
  background: #0f766e;
}

@media (max-width: 768px) {
  .options-grid {
    grid-template-columns: 1fr;
  }
  .input-row {
    grid-template-columns: 1fr;
  }
  .finish-actions {
    flex-direction: column;
    width: 100%;
  }
  .btn-copy-brief,
  .btn-send-zalo {
    width: 100%;
    justify-content: center;
  }
}
</style>
