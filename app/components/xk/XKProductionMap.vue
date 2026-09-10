<template>
  <div class="xk-production-map" role="region" aria-label="Sơ đồ 8 công đoạn sản xuất âm nhạc">
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
          <span class="stage-title-text">{{ stage.title }}</span>
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
          <span class="badge-v2 amber">GIAI ĐOẠN {{ currentStage.step }} / 08</span>
          <span class="text-meta-mono">{{ currentStage.category }}</span>
        </div>
        <h3 class="stage-hero-title">{{ currentStage.headline }}</h3>
        <p class="stage-lead-desc">{{ currentStage.description }}</p>
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
          <span class="craft-label text-meta-mono">GHI CHÚ SẢN XUẤT</span>
          <p>{{ currentStage.producerNote }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeStageIdx = ref(0)

const stages = [
  {
    step: '01',
    title: 'Idea (Voice Memo)',
    category: 'TIỀN KỲ · KHỞI TẠO',
    headline: 'Ý Niệm Ban Đầu: Lắng Nghe Bản Ghi Âm Thô',
    description: 'Mọi kiệt tác âm nhạc đều xuất phát từ một giai điệu mộc mạc: tiếng huýt sáo, vài câu hát qua điện thoại hoặc đoạn đệm guitar đơn sơ. Chúng tôi tiếp nhận và phân tích cặn kẽ tiềm năng của ý niệm.',
    actions: [
      { name: 'Phân tích quãng giọng & Sắc thái', detail: 'Đo lường dải âm vực tự nhiên của nghệ sĩ để tìm kiếm tone giọng thăng hoa nhất.' },
      { name: 'Xác định thông điệp & Cảm xúc', detail: 'Làm rõ câu chuyện bài hát muốn truyền tải: hoài niệm, tự sự, bùng nổ hay ấm áp.' },
      { name: 'Tư vấn phương án sản xuất', detail: 'Đề xuất phong cách hoà âm phù hợp với thị hiếu âm nhạc và đối tượng khán giả mục tiêu.' }
    ],
    producerNote: 'Đừng ngần ngại nếu bản thu âm điện thoại của bạn lẫn tiếng ồn hay chưa chuẩn nhịp. Nhiệm vụ của chúng tôi là nhìn ra viên ngọc ẩn giấu bên trong.'
  },
  {
    step: '02',
    title: 'Direction (Tempo & Harmony)',
    category: 'TIỀN KỲ · ĐỊNH HƯỚNG',
    headline: 'Khung Hoà Thanh & Nhịp Thở Bài Hát',
    description: 'Thiết lập nhịp tim (BPM) và bộ xương sống hoà âm (chord progression). Từng sự thay đổi nhỏ về tempo hay một hợp âm dẫn dắt đều định đoạt toàn bộ cảm xúc người nghe.',
    actions: [
      { name: 'Đo lường Tempo & Time Signature', detail: 'Chọn lựa nhịp 4/4 hiện đại, 3/4 da diết hay 6/8 tự sự phù hợp với nhịp thở giai điệu.' },
      { name: 'Thiết kế cấu trúc vòng hợp âm', detail: 'Thử nghiệm các biến thể hợp âm màu (jazz/neo-soul/pop) để tạo nét chấm phá độc bản.' },
      { name: 'Phác thảo bản Demo Hợp Âm', detail: 'Thu thử bản đệm piano/guitar mộc gửi nghệ sĩ hát thử để cảm nhận độ vừa vặn.' }
    ],
    producerNote: 'Một bài hát ballad ở 78 BPM sẽ hoàn toàn khác biệt ở 82 BPM. Chúng tôi dành thời gian vi chỉnh đến khi nghệ sĩ cảm thấy nhịp thở thoải mái nhất.'
  },
  {
    step: '03',
    title: 'Production (Arrangement)',
    category: 'SẢN XUẤT · HOÀ ÂM PHỐI KHÍ',
    headline: 'Dựng Beat & Thiết Kế Âm Thanh Độc Bản',
    description: 'Khoác lên bài hát lớp áo âm thanh hoàn chỉnh. Lựa chọn từng tiếng kick, dải bass, tiếng đàn piano, violin cho đến các âm sắc synth ảo hiện đại.',
    actions: [
      { name: 'Thiết kế Groove & Drum Patterns', detail: 'Xây dựng nhịp điệu sinh động với velocity tự nhiên, mô phỏng tay trống thực thụ.' },
      { name: 'Hoà âm dàn nhạc & Lớp nền', detail: 'Phối khí dải strings, acoustic guitar, electric piano để tạo chiều sâu không gian.' },
      { name: 'Xây dựng đoạn chuyển (Transitions & Drops)', detail: 'Bố trí các điểm ngắt (stop-time), dồn trống (fills) và hiệu ứng để giữ trọn sự lôi cuốn.' }
    ],
    producerNote: 'Chúng tôi kiên định không sử dụng pattern phối khí có sẵn. Mỗi âm sắc đều được căn chỉnh theo tần số chất giọng của chính bạn.'
  },
  {
    step: '04',
    title: 'Recording (Vocal & Instruments)',
    category: 'THU ÂM · THỰC CHIẾN STUDIO',
    headline: 'Thu Âm Phòng Thu & Vocal Coaching',
    description: 'Bước vào phòng thu tiêu âm chuẩn quốc tế. Với microphone condenser cao cấp và pre-amp analog, chúng tôi đồng hành cùng bạn để thu lại những cảm xúc chân thật nhất.',
    actions: [
      { name: 'Luyện thanh & Khởi động tại chỗ', detail: 'Hỗ trợ nghệ sĩ mở khẩu hình, kiểm soát hơi thở và giải toả căng thẳng trước khi bấm máy.' },
      { name: 'Thu âm từng đoạn (Comping takes)', detail: 'Ghi lại nhiều lượt thu cho từng câu hát để gom nhặt những nốt ngân và biểu cảm đẹp nhất.' },
      { name: 'Thu bè & Ad-libs làm dày không gian', detail: 'Hướng dẫn hát bè quãng 3, quãng 5 và các tiếng bè gió bao trùm bài hát.' }
    ],
    producerNote: 'Chúng tôi không bao giờ tạo áp lực thời gian trong phòng thu. Sự kiên nhẫn của producer là chìa khoá để chạm đến khoảnh khắc thăng hoa của nghệ sĩ.'
  },
  {
    step: '05',
    title: 'Editing (Tuning & Timing)',
    category: 'HẬU KỲ · CHỈNH SỬA CHI TIẾT',
    headline: 'Làm Sạch, Căn Nhịp & Xử Lý Cao Độ Tự Nhiên',
    description: 'Tỉ mỉ lắng nghe từng miligiây âm thanh. Loại bỏ tiếng ồn môi trường, tiếng nuốt nước bọt không mong muốn, căn chỉnh nhịp phách và điều chỉnh cao độ mượt mà.',
    actions: [
      { name: 'Dọn sạch tạp âm & Plosives', detail: 'Sử dụng công cụ khử tiếng nổ p/b, tiếng xì s/x và tiếng rít dây đàn guitar.' },
      { name: 'Căn chỉnh nhịp phách (Audio Quantize)', detail: 'Đưa các nốt hát vào đúng nhịp đập của beat mà vẫn giữ được độ lả lướt tự nhiên.' },
      { name: 'Chỉnh cao độ bằng Melodyne', detail: 'Nắn nót từng nốt phô thủ công bằng tai nghề, bảo đảm vocal giữ nguyên âm sắc con người.' }
    ],
    producerNote: 'Auto-tune làm sẵn thường biến giọng hát thành người máy. Tại XK, chúng tôi điều chỉnh thủ công từng nốt để giữ trọn cái hồn nguyên bản.'
  },
  {
    step: '06',
    title: 'Mixing (Space & Dynamic)',
    category: 'HẬU KỲ · MIXING ĐA CHIỀU',
    headline: 'Cân Bằng Dải Tần & Mở Rộng Không Gian 3D',
    description: 'Xếp đặt hàng chục track âm thanh vào một không gian 3 chiều hài hoà: chiều cao (EQ tần số), chiều sâu (Reverb/Delay) và chiều rộng (Panning trái/phải).',
    actions: [
      { name: 'Dọn sạch xung đột dải tần (EQ Carving)', detail: 'Cắt gọt các dải tần dư thừa để vocal, bass và kick hoà quyện mà không đè lẫn nhau.' },
      { name: 'Kiểm soát biên độ động (Compression)', detail: 'Cân bằng âm lượng to nhỏ giữa các câu hát, tạo lực đầm chắc và độ mượt mà.' },
      { name: 'Thiết kế không gian vang vọng (Spatial Design)', detail: 'Tạo nên căn phòng âm học ảo đưa người nghe chìm đắm vào không gian nghệ thuật.' }
    ],
    producerNote: 'Một bản mix tốt không phải là bản mix phô diễn kỹ xảo, mà là bản mix khiến người nghe quên đi kỹ thuật để chìm vào cảm xúc.'
  },
  {
    step: '07',
    title: 'Mastering (Loudness Standards)',
    category: 'HẬU KỲ · MASTERING PHÁT HÀNH',
    headline: 'Chuẩn Âm Lượng Spotify, Apple Music & YouTube',
    description: 'Khâu kiểm định chất lượng cuối cùng. Đưa bản nhạc đạt độ lớn thương mại chuẩn xác (-14 LUFS) mà vẫn bảo toàn độ động và không bị méo tiếng trên mọi hệ thống loa.',
    actions: [
      { name: 'Tối ưu hoá Headroom & True Peak', detail: 'Ngăn chặn hiện tượng inter-sample clipping khi giải mã sang định dạng MP3/AAC.' },
      { name: 'Kiểm tra độ tương thích Mono', detail: 'Đảm bảo bài hát phát tốt trên loa điện thoại một kênh mà không bị triệt tiêu âm thanh.' },
      { name: 'Cân bằng tổng thể phổ tần (Master EQ)', detail: 'Tạo độ ấm áp ở dải trầm và độ long lanh ở dải cao đạt chuẩn đĩa thương mại.' }
    ],
    producerNote: 'Chúng tôi kiểm âm chéo trên 4 môi trường: loa kiểm âm studio, tai nghe phổ thông, điện thoại di động và hệ thống âm thanh xe hơi.'
  },
  {
    step: '08',
    title: 'Release (Delivery & Distribution)',
    category: 'PHÁT HÀNH · BÀN GIAO TOÀN DIỆN',
    headline: 'Bàn Giao Trọn Bộ Hồ Sơ Âm Thanh & Phát Hành Số',
    description: 'Tác phẩm hoàn thành sẵn sàng ra mắt công chúng. Bàn giao đầy đủ các phiên bản âm thanh, hồ sơ kỹ thuật và đồng hành tư vấn chiến lược phát hành.',
    actions: [
      { name: 'Bàn giao các phiên bản tiêu chuẩn', detail: 'Bao gồm bản Master WAV 24-bit, MP3 320kbps, Beat Playback, TV Track có bè.' },
      { name: 'Lưu trữ vĩnh viễn Multitrack Stems', detail: 'Lưu trữ toàn bộ stems dự án trên hệ thống đám mây bảo mật trọn đời.' },
      { name: 'Hỗ trợ phân phối nhạc số', detail: 'Tư vấn đăng ký ISRC, phân phối lên Spotify, Apple Music, YouTube Music và TikTok.' }
    ],
    producerNote: 'Khi dự án kết thúc, mối quan hệ đồng hành giữa chúng tôi và bạn mới chỉ bắt đầu. Chúng tôi luôn sẵn sàng hỗ trợ cho các sản phẩm tiếp theo.'
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
