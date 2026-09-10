<script setup lang="ts">
import { ref, computed } from 'vue'

interface ServiceOption {
  id: string
  name: string
  basePrice: number
  unit: string
  timeDays: number
  description: string
  features: string[]
  icon: string
  popular?: boolean
}

const services: ServiceOption[] = [
  {
    id: 'thu-am',
    name: 'Thu Âm Bài Hát Chuyên Nghiệp',
    basePrice: 350000,
    unit: 'buổi (2-3h)',
    timeDays: 1,
    description: 'Phòng thu tiêu âm chuẩn quốc tế, micro condenser cao cấp, kỹ thuật viên hướng dẫn lấy hơi và cảm xúc từng câu.',
    features: ['Session 2-3 giờ thoải mái', 'Vocal coaching tận tâm', 'Lọc tạp âm & xuất file thô sạch'],
    icon: 'fa-microphone'
  },
  {
    id: 'mix-master',
    name: 'Mix & Master Chuẩn Spotify',
    basePrice: 600000,
    unit: 'bài hoàn chỉnh',
    timeDays: 3,
    description: 'Xử lý vocal chuyên sâu (tune pitch, timing), cân bằng EQ, nén động lực và mastering âm lượng chuẩn -14 LUFS.',
    features: ['Vocal tuning tự nhiên', 'Mastering chuẩn phát hành số', '2 lần chỉnh sửa miễn phí'],
    icon: 'fa-sliders',
    popular: true
  },
  {
    id: 'hoa-am',
    name: 'Hoà Âm Phối Khí Độc Quyền',
    basePrice: 2000000,
    unit: 'bản phối mới',
    timeDays: 7,
    description: 'Sáng tạo bản phối độc bản theo phong cách và quãng giọng riêng của bạn (Ballad, R&B, Pop, Hip-hop, Acoustic).',
    features: ['Phối khí 100% độc quyền', 'Nhạc cụ sống động & hiện đại', 'Tặng kèm bản Beat Karaoke chất lượng cao'],
    icon: 'fa-music'
  },
  {
    id: 'combo-artist',
    name: 'Gói Combo Sản Xuất Trọn Gói',
    basePrice: 2800000,
    unit: 'trọn gói A-Z',
    timeDays: 5,
    description: 'Giải pháp hoàn hảo từ vạch xuất phát: Phối khí + Thu âm không giới hạn + Mix & Master hoàn thiện ra file Master.',
    features: ['Bản phối độc quyền', 'Thu âm không giới hạn giờ', 'Mix & Master cao cấp', 'Tiết kiệm hơn 30% so với làm lẻ'],
    icon: 'fa-compact-disc',
    popular: true
  },
  {
    id: 'quay-mv',
    name: 'Quay Video Studio / MV Ca Nhạc',
    basePrice: 1500000,
    unit: 'video hoàn thiện',
    timeDays: 4,
    description: 'Ghi hình 4K góc máy điện ảnh ngay trong phòng thu với ánh sáng moody cinematic, hậu kỳ chỉnh màu chuyên nghiệp.',
    features: ['Máy quay 4K Cinematic', 'Setup ánh sáng studio chuyên nghiệp', 'Chỉnh màu & dựng video ngắn cho TikTok/Reels'],
    icon: 'fa-film'
  }
]

const selectedServiceId = ref<string>('mix-master')
const songCount = ref<number>(1)
const addStems = ref<boolean>(false)
const needRush = ref<boolean>(false)

const currentService = computed(() => {
  return services.find(s => s.id === selectedServiceId.value) || services[1]
})

const estimatedPrice = computed(() => {
  if (!currentService.value) return 0
  let base = currentService.value.basePrice * songCount.value

  // Multi-song discount
  if (songCount.value >= 3) {
    base = base * 0.85 // 15% discount for 3+ tracks
  } else if (songCount.value === 2) {
    base = base * 0.92 // 8% discount for 2 tracks
  }

  if (addStems.value) {
    base += 200000 * songCount.value
  }

  if (needRush.value) {
    base += 300000 * songCount.value
  }

  return Math.round(base)
})

const estimatedDays = computed(() => {
  if (!currentService.value) return 2
  let days = currentService.value.timeDays * Math.ceil(songCount.value * 0.7)
  if (needRush.value) {
    days = Math.max(1, Math.round(days * 0.5))
  }
  return Math.max(1, days)
})

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN').format(amount) + '₫'
}

const buildZaloLink = computed(() => {
  if (!currentService.value) return 'https://zalo.me/0355356294'
  const text = encodeURIComponent(
    `Chào XKProduction, mình muốn tư vấn dịch vụ: ${currentService.value.name} (${songCount.value} bài)${addStems.value ? ' + Bàn giao Stems' : ''}${needRush.value ? ' + Cần gấp' : ''}. Ước tính khoảng: ${formatCurrency(estimatedPrice.value)}.`
  )
  return `https://zalo.me/0355356294?text=${text}`
})

const { trackCta } = useAnalytics()

const onEstimatorCta = () => {
  trackCta(`Estimator Zalo: ${currentService.value?.name || 'Unknown'}`)
}
</script>

<template>
  <div class="project-estimator-card glass-card">
    <div class="estimator-header">
      <div class="header-tag-row">
        <span class="studio-pill">
          <span class="live-dot"></span>
          CÔNG CỤ DỰ TOÁN TỨC THÌ
        </span>
      </div>
      <h3 class="estimator-title">Ước Tính Chi Phí &amp; Thời Gian Dự Án</h3>
      <p class="estimator-subtitle">
        Minh bạch 100% — Chọn nhu cầu cụ thể của bạn để nhận báo giá và lộ trình hoàn thiện chính xác trong 5 giây.
      </p>
    </div>

    <div class="estimator-grid">
      <!-- Left Panel: Selectors -->
      <div class="estimator-controls">
        <!-- Service Selector Tabs -->
        <div class="control-group">
          <label class="control-label">1. CHỌN DỊCH VỤ CỐT LÕI</label>
          <div class="services-selector-grid">
            <button
              v-for="svc in services"
              :key="svc.id"
              type="button"
              class="service-select-btn"
              :class="{ selected: selectedServiceId === svc.id }"
              @click="selectedServiceId = svc.id"
            >
              <div class="svc-icon-box">
                <i class="fa-solid" :class="svc.icon"></i>
              </div>
              <div class="svc-btn-text">
                <span class="svc-name">{{ svc.name }}</span>
                <span class="svc-price-hint">từ {{ formatCurrency(svc.basePrice) }}</span>
              </div>
              <span v-if="svc.popular" class="popular-tag">HOT</span>
            </button>
          </div>
        </div>

        <!-- Track Count Selector -->
        <div class="control-group">
          <div class="control-label-row">
            <label class="control-label">2. SỐ LƯỢNG BÀI HÁT</label>
            <span v-if="songCount >= 3" class="discount-pill">GIẢM 15% COMBO</span>
            <span v-else-if="songCount === 2" class="discount-pill">GIẢM 8% COMBO</span>
          </div>
          <div class="song-count-selector">
            <button
              type="button"
              class="count-chip"
              :class="{ active: songCount === 1 }"
              @click="songCount = 1"
            >
              1 Bài (Đơn ca / Single)
            </button>
            <button
              type="button"
              class="count-chip"
              :class="{ active: songCount === 2 }"
              @click="songCount = 2"
            >
              2 Bài (Dự án đôi)
            </button>
            <button
              type="button"
              class="count-chip"
              :class="{ active: songCount === 3 }"
              @click="songCount = 3"
            >
              3 Bài (EP Mini Album)
            </button>
            <button
              type="button"
              class="count-chip"
              :class="{ active: songCount === 5 }"
              @click="songCount = 5"
            >
              5 Bài (Album Trọn Gói)
            </button>
          </div>
        </div>

        <!-- Add-on Options -->
        <div class="control-group">
          <label class="control-label">3. TÙY CHỌN NÂNG CAO (NẾU CẦN)</label>
          <div class="addons-row">
            <label class="addon-checkbox-label" :class="{ checked: addStems }">
              <input type="checkbox" v-model="addStems" class="addon-input" />
              <div class="checkbox-box">
                <i class="fa-solid fa-check" v-if="addStems"></i>
              </div>
              <div class="addon-text">
                <span class="addon-name">Bàn giao toàn bộ Multi-track stems (+200k/bài)</span>
                <span class="addon-desc">Nhận riêng lẻ từng track vocal, beat, FX để lưu trữ dài hạn</span>
              </div>
            </label>

            <label class="addon-checkbox-label" :class="{ checked: needRush }">
              <input type="checkbox" v-model="needRush" class="addon-input" />
              <div class="checkbox-box">
                <i class="fa-solid fa-check" v-if="needRush"></i>
              </div>
              <div class="addon-text">
                <span class="addon-name">Ưu tiên bàn giao siêu tốc 24h–48h (+300k/bài)</span>
                <span class="addon-desc">Xếp lịch sản xuất ưu tiên hàng đầu, hoàn thành khẩn cấp</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Right Panel: Dynamic Live Receipt & Action -->
      <div class="estimator-summary-panel">
        <div class="summary-top-card">
          <span class="summary-kicker">KẾT QUẢ DỰ TOÁN</span>
          <div class="price-big-wrap">
            <span class="price-val">{{ formatCurrency(estimatedPrice) }}</span>
            <span class="price-note">Giá ước tính trọn gói</span>
          </div>

          <div class="delivery-time-badge">
            <i class="fa-solid fa-clock"></i>
            <span>Thời gian hoàn thiện dự kiến: <strong>{{ estimatedDays }} - {{ estimatedDays + 2 }} ngày làm việc</strong></span>
          </div>

          <!-- Included Features Checklist -->
          <div class="summary-features-box">
            <span class="features-box-title">ĐÃ BAO GỒM TRONG GÓI:</span>
            <ul class="features-box-list">
              <li v-for="(feat, fIdx) in currentService?.features" :key="fIdx">
                <i class="fa-solid fa-circle-check"></i>
                <span>{{ feat }}</span>
              </li>
              <li v-if="addStems">
                <i class="fa-solid fa-circle-check"></i>
                <span>Bàn giao file Stems riêng biệt không nén (WAV 24-bit)</span>
              </li>
              <li v-if="needRush">
                <i class="fa-solid fa-circle-check"></i>
                <span>Priority Pass: Sản xuất và sửa bài ưu tiên</span>
              </li>
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <span>Tư vấn kỹ thuật và hỗ trợ upload Spotify / Apple Music</span>
              </li>
            </ul>
          </div>

          <!-- Action Buttons -->
          <div class="summary-actions">
            <a
              :href="buildZaloLink"
              target="_blank"
              rel="noopener"
              class="btn btn-primary btn-full-width btn-pulse"
              @click="onEstimatorCta"
            >
              <i class="fa-solid fa-bolt"></i>
              <span>Nhận Báo Giá &amp; Đặt Lịch Ngay</span>
            </a>
            <NuxtLink to="/contact" class="btn btn-secondary btn-full-width">
              <span>Gửi lời nhắn chi tiết hơn</span>
            </NuxtLink>
          </div>

          <div class="summary-guarantee">
            <i class="fa-solid fa-shield-halved"></i>
            <span>Cam kết hoàn tiền nếu chất âm không đúng chuẩn cam kết ban đầu.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-estimator-card {
  padding: 3rem;
  border-radius: 24px;
  background: linear-gradient(180deg, #0e121d 0%, #080a10 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 1px solid rgba(0, 128, 255, 0.3);
  margin: 3rem 0;
}

.estimator-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 2.5rem;
}

.header-tag-row {
  margin-bottom: 0.8rem;
}

.estimator-title {
  font-size: clamp(1.6rem, 3.2vw, 2.3rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 0.75rem;
}

.estimator-subtitle {
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.6;
}

.estimator-grid {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 2.5rem;
}

/* Controls */
.estimator-controls {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.control-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.control-label {
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #94a3b8;
}

.discount-pill {
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.2rem 0.6rem;
  background: rgba(0, 229, 163, 0.15);
  color: var(--teal);
  border-radius: 4px;
}

/* Services Buttons */
.services-selector-grid {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.service-select-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1.1rem;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  color: var(--text-main);
  text-align: left;
  cursor: pointer;
  transition: all 0.25s var(--ease-out-expo);
  position: relative;
}

.service-select-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.14);
}

.service-select-btn.selected {
  background: linear-gradient(90deg, rgba(0, 128, 255, 0.15) 0%, rgba(0, 229, 163, 0.05) 100%);
  border-color: rgba(0, 128, 255, 0.5);
  box-shadow: 0 4px 16px rgba(0, 128, 255, 0.15);
}

.svc-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  color: var(--accent);
  flex-shrink: 0;
}

.service-select-btn.selected .svc-icon-box {
  background: var(--primary);
  color: #fff;
}

.svc-btn-text {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.svc-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: #f1f5f9;
}

.svc-price-hint {
  font-size: 0.75rem;
  color: #64748b;
}

.popular-tag {
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.2rem 0.5rem;
  background: linear-gradient(135deg, #ef4444, #f97316);
  color: #fff;
  border-radius: 4px;
}

/* Song Count Chips */
.song-count-selector {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
}

.count-chip {
  padding: 0.65rem 0.85rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  color: #94a3b8;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.count-chip:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
}

.count-chip.active {
  background: #141a27;
  border-color: var(--teal);
  color: var(--teal);
  box-shadow: 0 0 12px rgba(0, 229, 163, 0.15);
}

/* Add-on Checkboxes */
.addons-row {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.addon-checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.addon-checkbox-label:hover {
  background: rgba(255, 255, 255, 0.04);
}

.addon-checkbox-label.checked {
  border-color: rgba(0, 128, 255, 0.35);
  background: rgba(0, 128, 255, 0.05);
}

.addon-input {
  position: absolute;
  opacity: 0;
}

.checkbox-box {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  color: #fff;
  flex-shrink: 0;
  margin-top: 2px;
}

.addon-checkbox-label.checked .checkbox-box {
  background: var(--primary);
  border-color: var(--primary);
}

.addon-text {
  display: flex;
  flex-direction: column;
}

.addon-name {
  font-size: 0.82rem;
  font-weight: 700;
  color: #e2e8f0;
}

.addon-desc {
  font-size: 0.74rem;
  color: #64748b;
}

/* Right Summary Panel */
.estimator-summary-panel {
  display: flex;
  flex-direction: column;
}

.summary-top-card {
  background: linear-gradient(180deg, #121826 0%, #0c101a 100%);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 18px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45);
}

.summary-kicker {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: var(--accent);
}

.price-big-wrap {
  display: flex;
  flex-direction: column;
}

.price-val {
  font-size: clamp(2.2rem, 3.5vw, 3rem);
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.02em;
  line-height: 1;
  background: linear-gradient(135deg, #fff 40%, var(--teal) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.price-note {
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 0.35rem;
}

.delivery-time-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.9rem;
  background: rgba(0, 229, 163, 0.08);
  border: 1px solid rgba(0, 229, 163, 0.2);
  border-radius: 8px;
  font-size: 0.78rem;
  color: #cbd5e1;
}

.delivery-time-badge i {
  color: var(--teal);
}

.summary-features-box {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.features-box-title {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: #64748b;
}

.features-box-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.features-box-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: #cbd5e1;
}

.features-box-list li i {
  color: var(--teal);
  margin-top: 3px;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.summary-actions {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.summary-guarantee {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.72rem;
  color: #64748b;
  text-align: center;
  justify-content: center;
}

.summary-guarantee i {
  color: #fbbf24;
}

@media (max-width: 900px) {
  .estimator-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .project-estimator-card {
    padding: 1.75rem 1.25rem;
  }
}
</style>
