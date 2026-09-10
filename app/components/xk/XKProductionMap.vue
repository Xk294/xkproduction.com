<template>
  <div class="xk-production-map" role="region" :aria-label="isVi ? 'Sơ đồ 8 công đoạn sản xuất âm nhạc' : '8-Stage Music Production Map'">
    <!-- TIMELINE NAVIGATION RAIL -->
    <div class="timeline-rail-wrap">
      <div class="timeline-rail" role="tablist">
        <button
          v-for="(stage, idx) in stages"
          :key="stage.step"
          class="stage-tab-btn"
          :class="{ 'is-active': activeStageIdx === idx }"
          @click="activeStageIdx = idx"
          role="tab"
          :aria-selected="activeStageIdx === idx"
          :aria-controls="`stage-panel-${stage.step}`"
          :id="`stage-tab-${stage.step}`"
        >
          <span class="stage-step-num">{{ stage.step }}</span>
          <span class="stage-title-text">{{ isVi ? stage.viTitle : stage.enTitle }}</span>
        </button>
      </div>
    </div>

    <!-- CURRENT STAGE SPOTLIGHT CARD -->
    <div
      v-if="currentStage"
      class="stage-spotlight-card matte-card"
      :id="`stage-panel-${currentStage.step}`"
      role="tabpanel"
      :aria-labelledby="`stage-tab-${currentStage.step}`"
    >
      <div class="spotlight-header">
        <div class="stage-badge-wrap">
          <span class="badge-v2 amber">{{ isVi ? 'GIAI ĐOẠN' : 'STAGE' }} {{ currentStage.step }} / 08</span>
          <span class="text-meta-mono">{{ isVi ? currentStage.category : (currentStage.enCategory || currentStage.category) }}</span>
        </div>
        <h3 class="stage-hero-title">{{ isVi ? currentStage.headline : (currentStage.enHeadline || currentStage.headline) }}</h3>
        <p class="stage-lead-desc">{{ isVi ? currentStage.description : (currentStage.enDescription || currentStage.description) }}</p>
      </div>

      <!-- 3 DETAILED ACTIONS IN THIS STAGE -->
      <div class="stage-actions-grid">
        <div v-for="(act, aIdx) in currentStage.actions" :key="aIdx" class="action-item">
          <div class="action-number">{{ aIdx + 1 }}</div>
          <div class="action-details">
            <strong>{{ act.name }}</strong>
            <p>{{ act.detail }}</p>
          </div>
        </div>
      </div>

      <!-- FOOTER NOTE WITH PRODUCER INSIGHT -->
      <div class="stage-craft-footer">
        <div class="craft-icon"><i class="fa-solid fa-lightbulb"></i></div>
        <div class="craft-text">
          <span class="craft-label text-meta-mono">{{ isVi ? 'GHI CHÚ SẢN XUẤT' : 'PRODUCER NOTE' }}</span>
          <p>{{ isVi ? currentStage.producerNote : (currentStage.enProducerNote || currentStage.producerNote) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocale } from '~/composables/useLocale'

const { isVi } = useLocale()
const activeStageIdx = ref(0)

const stages = [
  {
    step: '01',
    viTitle: 'Góp Ý Giai Điệu',
    enTitle: 'Melody & Demo',
    title: 'Melody & Demo',
    category: 'BƯỚC 1 · KHỞI TẠO',
    enCategory: 'STAGE 1 · GENESIS',
    headline: 'Lắng Nghe Giai Điệu & Định Hướng Bài Hát',
    enHeadline: 'Melody Consultation & Direction',
    description: 'Mọi bài hát đều bắt đầu từ một đoạn ghi âm mộc: tiếng hát chay qua điện thoại hay tiếng đàn guitar đơn sơ. Studio sẽ nghe thử, nhận xét tone giọng và cùng bạn chọn hướng phát triển phù hợp nhất.',
    enDescription: 'Every song begins with a raw sketch: a voice memo or acoustic chords. We listen, assess your vocal key, and establish the musical direction.',
    actions: [
      { name: 'Kiểm tra quãng giọng & Tone hát', detail: 'Tìm tone nhạc vừa vặn nhất để bạn hát thoải mái, không bị quá thấp hay với nốt cao.' },
      { name: 'Xác định phong cách bài hát', detail: 'Lựa chọn dòng nhạc mong muốn: Ballad, Pop R&B, Acoustic hay Remix sôi động.' },
      { name: 'Tư vấn hướng hoàn thiện', detail: 'Góp ý lời ca và cấu trúc đoạn điệp khúc để bài hát thêm bắt tai và truyền cảm.' }
    ],
    producerNote: 'Đừng ngại nếu bản thu âm điện thoại của bạn chưa chuẩn hay lẫn tạp âm. Việc của producer là giúp bạn phát triển nó thành bài hát hoàn chỉnh.',
    enProducerNote: 'Never worry about imperfect phone demos. Our role as producers is to develop it into a complete release.'
  },
  {
    step: '02',
    viTitle: 'Chọn Nhịp & Hợp Âm',
    enTitle: 'Tempo & Harmony',
    title: 'Tempo & Harmony',
    category: 'BƯỚC 2 · KHUNG NHẠC',
    enCategory: 'STAGE 2 · FOUNDATION',
    headline: 'Thử Hợp Âm & Nhịp Điệu Bài Hát',
    enHeadline: 'Harmonic Mapping & Tempo Blueprint',
    description: 'Thiết lập tốc độ (tempo) và vòng hợp âm đệm. Đây là khung xương quan trọng nhất giúp bài hát có nhịp thở tự nhiên và đúng cảm xúc bạn mong muốn.',
    enDescription: 'Setting the ideal BPM tempo and harmonic progression so the track breathes naturally with authentic emotion.',
    actions: [
      { name: 'Chọn tốc độ bài hát (BPM)', detail: 'Tìm tốc độ vừa vặn để câu hát không bị dồn dập hay quá lê thê, giúp bạn nhả chữ tự nhiên.' },
      { name: 'Thiết kế vòng hợp âm đệm', detail: 'Lựa chọn màu sắc hợp âm phù hợp với tâm trạng của bài hát: vui tươi, lắng đọng hay da diết.' },
      { name: 'Gửi bản demo mộc nghe thử', detail: 'Gửi bạn nghe thử bản đệm piano/guitar mộc để bạn tập hát thử trước buổi thu chính thức.' }
    ],
    producerNote: 'Một bài hát ballad ở tốc độ 78 BPM sẽ khác hẳn ở 82 BPM. Studio sẽ điều chỉnh đến khi bạn cảm thấy nhịp thở thoải mái nhất.',
    enProducerNote: 'A ballad at 78 BPM feels completely different from 82 BPM. We dial in the sweet spot for your voice.'
  },
  {
    step: '03',
    viTitle: 'Phối Khí & Làm Beat',
    enTitle: 'Arrangement & Beat',
    title: 'Arrangement & Beat',
    category: 'BƯỚC 3 · PHỐI KHÍ',
    enCategory: 'STAGE 3 · ARRANGEMENT',
    headline: 'Dựng Bản Phối Đầy Đủ Nhạc Cụ',
    enHeadline: 'Bespoke Instrumentation & Beatmaking',
    description: 'Khoác lên bài hát bản phối hoàn chỉnh với trống, bass, đàn piano, guitar và dàn dây. Từng âm thanh được căn chỉnh theo đúng màu giọng của bạn.',
    enDescription: 'Dressing the song with drums, bass, piano, guitars, and orchestral strings—tailored from scratch to your vocal tone.',
    actions: [
      { name: 'Xây dựng nhịp trống & Bass', detail: 'Tạo phần nhịp điệu sinh động, giúp bài hát có độ nảy và lực đầm chắc.' },
      { name: 'Phối các lớp nhạc cụ', detail: 'Thêm tiếng đàn guitar, piano, dàn dây để tạo cảm xúc dày dặn và đầy đặn cho bài hát.' },
      { name: 'Thiết kế đoạn dồn cao trào', detail: 'Bố trí các đoạn chuyển tiếp và cao trào để bài hát lôi cuốn từ đầu đến cuối.' }
    ],
    producerNote: 'Studio không dùng beat làm sẵn đại trà. Mỗi bản phối đều được làm riêng theo đúng chất giọng và ý muốn của bạn.',
    enProducerNote: 'Zero generic template loops. Every arrangement is crafted specifically for your vocal character.'
  },
  {
    step: '04',
    viTitle: 'Thu Âm Tại Studio',
    enTitle: 'Vocal Recording',
    title: 'Vocal Recording',
    category: 'BƯỚC 4 · THU ÂM',
    enCategory: 'STAGE 4 · TRACKING',
    headline: 'Buổi Thu Âm Thoải Mái & Tận Tình',
    enHeadline: 'Supportive & Patient Vocal Tracking',
    description: 'Bước vào phòng thu với micro chuyên dụng và không gian tiêu âm chuẩn. Producer sẽ trực tiếp hướng dẫn lấy hơi, nhả chữ và đồng hành đến khi bạn hài lòng.',
    enDescription: 'Step into an acoustically treated booth with premium microphones. Your producer guides phrasing, breath control, and confidence.',
    actions: [
      { name: 'Khởi động giọng & Hướng dẫn nhả chữ', detail: 'Giúp bạn giải toả căng thẳng, mở khẩu hình và lấy hơi đúng cách trước khi thu.' },
      { name: 'Thu âm từng đoạn kỹ lưỡng', detail: 'Thu lại nhiều lượt cho từng câu hát để gom nhặt những nốt ngân và cảm xúc đẹp nhất.' },
      { name: 'Hướng dẫn hát bè làm dày giọng', detail: 'Thu các câu bè phụ và câu lót để giọng hát nghe đầy đặn và chuyên nghiệp hơn.' }
    ],
    producerNote: 'Studio không bao giờ hối thúc thời gian. Sự kiên nhẫn và tạo cảm giác thoải mái cho người hát là ưu tiên hàng đầu của chúng tôi.',
    enProducerNote: 'We never rush sessions. Creating a relaxed, trusting atmosphere is our highest priority.'
  },
  {
    step: '05',
    viTitle: 'Chỉnh Sửa Chi Tiết',
    enTitle: 'Vocal Editing',
    title: 'Vocal Editing',
    category: 'BƯỚC 5 · CHỈNH SỬA',
    enCategory: 'STAGE 5 · EDITING',
    headline: 'Làm Sạch Tạp Âm & Nắn Nốt Phô Tự Nhiên',
    enHeadline: 'De-noising & Organic Pitch Alignment',
    description: 'Lọc bỏ tiếng thở quá to hay tiếng nuốt nước bọt, căn nhịp phách chắc chắn và nắn nốt phô thủ công bằng tai nghề để giữ trọn cái hồn của giọng hát.',
    enDescription: 'Cleaning plosives, breath artifacts, quantizing rhythm, and manual Melodyne tuning to preserve genuine vocal emotion.',
    actions: [
      { name: 'Dọn sạch tạp âm & Tiếng nổ microphone', detail: 'Khử sạch tiếng ồn, tiếng thở giật và tiếng xì s/x khó chịu trong bản thu.' },
      { name: 'Căn chỉnh nhịp phách chuẩn xác', detail: 'Đưa các câu hát vào đúng nhịp nhạc nhưng vẫn giữ được độ lả lướt tự nhiên.' },
      { name: 'Chỉnh cao độ giọng hát bằng tai', detail: 'Nắn từng nốt phô thủ công, bảo đảm giọng hát nghe tự nhiên như hát mộc, không bị biến dạng.' }
    ],
    producerNote: 'Chúng tôi chỉnh sửa thủ công từng nốt để giọng hát hay hơn nhưng vẫn là giọng thật của bạn, không lạm dụng hiệu ứng robot.',
    enProducerNote: 'We tune manually phrase by phrase to enhance your voice while keeping it completely human and natural.'
  },
  {
    step: '06',
    viTitle: 'Mixing Hoà Trộn',
    enTitle: 'Mixing',
    title: 'Mixing',
    category: 'BƯỚC 6 · MIX NHẠC',
    enCategory: 'STAGE 6 · MIXING',
    headline: 'Cân Bằng Giọng Hát & Nhạc Nền',
    enHeadline: 'Vocal Clarity & 3D Spatial Balance',
    description: 'Hoà trộn giọng hát vào nhạc nền một cách êm ái: tạo độ dày cho giọng, mở không gian vang vọng tự nhiên và giúp tiếng trống, tiếng bass nghe êm tai.',
    enDescription: 'Blending multitrack layers seamlessly: sculpt EQ, control dynamics with compression, and craft immersive depth with reverb and delay.',
    actions: [
      { name: 'Cân bằng âm lượng các nhạc cụ', detail: 'Đảm bảo giọng hát luôn đứng rõ ràng phía trước, không bị tiếng trống hay guitar át mất.' },
      { name: 'Làm mượt biên độ âm lượng', detail: 'Cân bằng các đoạn hát nhỏ và to, giúp bài hát nghe đều đặn và dễ chịu.' },
      { name: 'Tạo hiệu ứng vang & Không gian', detail: 'Thêm vang (reverb) và nhại (delay) vừa vặn để giọng hát bay bổng và có chiều sâu.' }
    ],
    producerNote: 'Một bản mix hay là bản mix làm nổi bật cảm xúc của người hát mà người nghe không cảm thấy nặng nề hay chói tai.',
    enProducerNote: 'A great mix elevates the singer’s emotion so the listener feels the heart of the song without hearing technical strain.'
  },
  {
    step: '07',
    viTitle: 'Mastering Hoàn Thiện',
    enTitle: 'Mastering',
    title: 'Mastering',
    category: 'BƯỚC 7 · HOÀN THIỆN',
    enCategory: 'STAGE 7 · MASTERING',
    headline: 'Tối Ưu Âm Lượng Cho Mọi Thiết Bị',
    enHeadline: 'Balanced Loudness for Global Streaming',
    description: 'Khâu hoàn thiện âm thanh cuối cùng. Đảm bảo bài hát phát to rõ, không bị rè hay méo tiếng trên loa điện thoại, tai nghe và loa xe hơi.',
    enDescription: 'The final acoustic benchmark: ensuring full, clean loudness (-14 LUFS) that sounds great on phone speakers, earbuds, and car sound systems.',
    actions: [
      { name: 'Tối ưu độ lớn thương mại', detail: 'Nâng âm lượng bài hát đạt chuẩn nghe nhạc trực tuyến, nghe to rõ và chắc tiếng.' },
      { name: 'Kiểm tra trên nhiều dòng loa', detail: 'Nghe thử trên tai nghe, điện thoại và loa kiểm âm để bảo đảm bài hát nghe đều hay.' },
      { name: 'Cân chỉnh tổng thể dải âm', detail: 'Tạo độ ấm áp cho phần trầm và độ trong sáng cho phần cao của toàn bộ bài hát.' }
    ],
    producerNote: 'Chúng tôi luôn kiểm tra bản thu trên nhiều thiết bị thực tế trước khi gửi bạn nghe thử.',
    enProducerNote: 'We cross-check every master across four real-world listening environments before delivery.'
  },
  {
    step: '08',
    viTitle: 'Bàn Giao Sản Phẩm',
    enTitle: 'Delivery & Release',
    title: 'Delivery & Release',
    category: 'BƯỚC 8 · BÀN GIAO',
    enCategory: 'STAGE 8 · DELIVERY',
    headline: 'Bàn Giao Đầy Đủ File & Hỗ Trợ Đăng Nhạc',
    enHeadline: 'Full Master Delivery & Distribution Guidance',
    description: 'Bàn giao trọn gói bản Master chất lượng cao WAV, MP3 và bản beat không lời để bạn biểu diễn, đồng thời hỗ trợ tư vấn đăng nhạc lên mạng xã hội.',
    enDescription: 'Delivery of high-res 24-bit WAV masters, 320kbps MP3s, instrumental backing tracks, and guidance for digital distribution.',
    actions: [
      { name: 'Bàn giao đầy đủ định dạng file', detail: 'Gồm bản Master WAV 24-bit chất lượng cao, MP3 320kbps và beat không lời để đi diễn.' },
      { name: 'Lưu trữ file dự án an toàn', detail: 'Lưu trữ toàn bộ file thu âm gốc trên máy chủ của studio để bạn có thể xin lại khi cần.' },
      { name: 'Tư vấn đăng tải bài hát', detail: 'Hướng dẫn cách đăng bài hát lên YouTube, Facebook, TikTok và các trang nhạc số.' }
    ],
    producerNote: 'Sau khi nhận bài, nếu bạn cần hỗ trợ xuất thêm bản beat hay điều chỉnh nhỏ, studio luôn sẵn sàng hỗ trợ.',
    enProducerNote: 'Delivery is not the end of our partnership. We are always here to support your upcoming musical releases.'
  }
]

const currentStage = computed(() => stages[activeStageIdx.value])
</script>

<style scoped>
.xk-production-map {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* TIMELINE RAIL */
.timeline-rail-wrap {
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scrollbar-width: thin;
}

.timeline-rail {
  display: flex;
  gap: 0.5rem;
  min-width: 860px;
  background: var(--bg-surface-1);
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid var(--border-subtle);
}

.stage-tab-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
}

.stage-tab-btn:hover {
  background: rgba(255, 255, 255, 0.04);
}

.stage-tab-btn.is-active {
  background: #161920;
  border-color: rgba(217, 119, 6, 0.4);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.stage-step-num {
  font-family: ui-monospace, monospace;
  font-size: 0.75rem;
  font-weight: 800;
  color: #64748b;
  transition: color 0.2s ease;
}

.stage-tab-btn.is-active .stage-step-num {
  color: #fbbf24;
}

.stage-title-text {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-secondary);
  white-space: nowrap;
}

.stage-tab-btn.is-active .stage-title-text {
  color: var(--text-primary);
  font-weight: 700;
}

/* SPOTLIGHT CARD */
.stage-spotlight-card {
  padding: clamp(1.5rem, 4vw, 3rem);
  background: var(--bg-surface-1);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  box-shadow: var(--shadow-card);
}

.spotlight-header {
  margin-bottom: 2rem;
}

.stage-badge-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.stage-hero-title {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.25;
  margin-bottom: 0.75rem;
}

.stage-lead-desc {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 900px;
}

/* ACTIONS GRID */
.stage-actions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.action-item {
  display: flex;
  gap: 0.9rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
}

.action-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(13, 148, 136, 0.15);
  border: 1px solid rgba(13, 148, 136, 0.3);
  color: #2dd4bf;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ui-monospace, monospace;
  font-size: 0.8125rem;
  font-weight: 700;
  flex-shrink: 0;
}

.action-details strong {
  display: block;
  font-size: 0.9375rem;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
}

.action-details p {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* CRAFT FOOTER */
.stage-craft-footer {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: rgba(217, 119, 6, 0.08);
  border: 1px solid rgba(217, 119, 6, 0.25);
  border-radius: 8px;
}

.craft-icon {
  font-size: 1.1rem;
  color: #fbbf24;
  margin-top: 0.15rem;
  flex-shrink: 0;
}

.craft-label {
  display: block;
  font-size: 0.6875rem;
  color: #fbbf24;
  margin-bottom: 0.25rem;
}

.craft-text p {
  font-size: 0.875rem;
  color: var(--text-primary);
  line-height: 1.5;
  font-style: italic;
}

@media (max-width: 900px) {
  .stage-actions-grid {
    grid-template-columns: 1fr;
  }
}
</style>
