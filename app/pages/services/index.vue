<template>
  <div class="services-matrix-page">
    <div class="editorial-container">
      <!-- HERO HEADER -->
      <section class="services-hero">
        <div class="hero-status-pill">
          <span class="status-dot"></span>
          <span>{{ isVi ? 'Studio đang mở nhận dự án · Cam kết hoàn thiện 5-10 ngày' : 'Studio accepting bookings · 5-10 Days guaranteed delivery' }}</span>
        </div>

        <div class="header-titles">
          <span class="badge-v2 amber">{{ isVi ? 'HỆ SINH THÁI GIẢI PHÁP ÂM NHẠC TOÀN DIỆN' : 'FULL-SERVICE MUSIC PRODUCTION MATRIX' }}</span>
          <h1 class="services-title">
            {{ isVi ? 'Sản Xuất Âm Nhạc Chuẩn Mực Cho Nghệ Sĩ Muốn Bản Phối Đắt Tiền' : 'High-End Sound Engineering For Artists Who Demand Expensive Sound' }}
          </h1>
          <p class="services-subtitle">
            {{ isVi
              ? 'Chúng tôi không bán beat làm sẵn đại trà. Mỗi tác phẩm tại XKProduction là một công trình kiến trúc âm thanh độc bản may đo theo đúng chất giọng, đạt chuẩn quốc tế -14 LUFS Spotify/Apple Music, đồng hành xuyên suốt từ demo mộc đến phát hành số.'
              : 'Zero mass-market templates. Every production at XKProduction is a bespoke acoustic architecture tailored to your vocal identity, mastered to international -14 LUFS streaming standards with full commercial ownership.'
            }}
          </p>
        </div>

        <!-- KEY STUDIO METRICS -->
        <div class="studio-metrics-grid">
          <div class="metric-card matte-card">
            <span class="metric-number">2,000+</span>
            <strong class="metric-title">{{ isVi ? 'Tác Phẩm Phát Hành' : 'Released Productions' }}</strong>
            <p class="metric-desc">{{ isVi ? 'Ca khúc hoàn thiện không dùng template lặp lại' : 'Original tracks completed with zero recycled loops' }}</p>
          </div>
          <div class="metric-card matte-card">
            <span class="metric-number">-14 LUFS</span>
            <strong class="metric-title">{{ isVi ? 'Chuẩn Phát Hành Quốc Tế' : 'Streaming Loudness Spec' }}</strong>
            <p class="metric-desc">{{ isVi ? 'Cân bằng dynamic range tối ưu cho Spotify/Apple Music' : 'Optimized dynamic headroom for global digital DSPs' }}</p>
          </div>
          <div class="metric-card matte-card">
            <span class="metric-number">100%</span>
            <strong class="metric-title">{{ isVi ? 'Bản Quyền Thuộc Nghệ Sĩ' : 'Artist Ownership' }}</strong>
            <p class="metric-desc">{{ isVi ? 'Toàn quyền khai thác thương mại và doanh thu streaming' : 'Full commercial rights & 100% digital royalties' }}</p>
          </div>
          <div class="metric-card matte-card">
            <span class="metric-number">5-10</span>
            <strong class="metric-title">{{ isVi ? 'Ngày Hoàn Thành' : 'Days Turnaround' }}</strong>
            <p class="metric-desc">{{ isVi ? 'Tiến độ rõ ràng, báo cáo từng giai đoạn sản xuất' : 'Transparent milestone reporting with zero surprise delays' }}</p>
          </div>
        </div>

        <!-- HERO QUICK ACTIONS -->
        <div class="hero-actions-row">
          <NuxtLink to="/build-project" class="btn-primary-action">
            <i class="fa-solid fa-sliders"></i>
            <span>{{ isVi ? 'MỞ PROJECT BUILDER (DỰ TOÁN NHANH)' : 'OPEN PROJECT BUILDER' }}</span>
          </NuxtLink>
          <NuxtLink to="/start-a-project" class="btn-secondary-action">
            <span>{{ isVi ? 'NỘP BRIEF DỰ ÁN TRỰC TIẾP' : 'SUBMIT PROJECT BRIEF' }}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>
        </div>
      </section>

      <!-- INTERACTIVE AUDIO SHOWCASE -->
      <section class="services-audio-showcase matte-card">
        <div class="showcase-header">
          <div>
            <span class="badge-v2 teal">{{ isVi ? 'TRẢI NGHIỆM CHẤT ÂM PHÒNG THU' : 'ACOUSTIC QUALITY SHOWCASE' }}</span>
            <h2 class="showcase-title">{{ isVi ? 'Đôi Tai Là Vị Giám Khảo Công Tâm Nhất' : 'Let Your Ears Judge The Sound' }}</h2>
            <p class="showcase-desc">
              {{ isVi
                ? 'Nghe thử các bản master thực tế sản xuất tại XKProduction. Bấm để cảm nhận độ đầm của bass, độ tách bạch không gian 3D và sự ấm áp của vocal.'
                : 'Stream genuine master productions engineered at XKProduction. Tap below to experience our punchy bass, 3D spatial separation, and upfront vocal warmth.'
              }}
            </p>
          </div>
          <div class="showcase-badge-meta">
            <i class="fa-solid fa-compact-disc fa-spin"></i>
            <span>24-bit / 48kHz Master</span>
          </div>
        </div>

        <div class="audio-tracks-grid">
          <div
            v-for="(track, tIdx) in audioShowcaseTracks"
            :key="track.id"
            class="audio-track-item"
            :class="{ 'is-playing': isCurrentTrack(track) && isAudioPlaying }"
          >
            <div class="track-info-side">
              <span class="track-genre-pill">{{ track.genre }}</span>
              <strong class="track-song-title">{{ track.title }}</strong>
              <span class="track-song-artist">{{ track.artist }}</span>
              <div class="track-specs-row">
                <span class="spec-tag">{{ track.tempo }}</span>
                <span class="spec-tag">{{ track.lufs }}</span>
                <span class="spec-tag">{{ track.key }}</span>
              </div>
            </div>

            <div class="track-action-side">
              <button
                type="button"
                class="btn-play-preview"
                @click="handlePlayTrack(track, tIdx)"
                :aria-label="`Nghe thử ${track.title}`"
              >
                <i :class="isCurrentTrack(track) && isAudioPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'"></i>
                <span>{{ isCurrentTrack(track) && isAudioPlaying ? (isVi ? 'Đang phát' : 'Playing') : (isVi ? 'Nghe Thử' : 'Play Demo') }}</span>
              </button>

              <div class="mini-waveform-bars" :class="{ active: isCurrentTrack(track) && isAudioPlaying }">
                <span></span><span></span><span></span><span></span><span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6 CAPABILITIES DIRECTORY -->
      <section class="services-directory-section">
        <div class="directory-header-row">
          <div>
            <span class="badge-v2 amber">{{ isVi ? 'DANH MỤC NĂNG LỰC CỐT LÕI' : 'CAPABILITY DIRECTORY' }}</span>
            <h2 class="section-heading">{{ isVi ? '6 Trụ Cột Năng Lực Sản Xuất Âm Nhạc' : '6 Core Production Pillars' }}</h2>
            <p class="section-desc">
              {{ isVi
                ? 'Giải quyết trọn vẹn mọi mắt xích: từ phối khí, mix master, thu âm vocal đến tổ chức âm thanh ban nhạc live và sản xuất TVC thương mại.'
                : 'Covering every milestone: custom arrangement, mastering, vocal tracking, live stage sound, and commercial audio branding.'
              }}
            </p>
          </div>

          <!-- CATEGORY FILTER BUTTONS -->
          <div class="service-filter-tabs">
            <button
              v-for="tab in filterTabs"
              :key="tab.id"
              type="button"
              class="filter-tab-btn"
              :class="{ active: activeFilter === tab.id }"
              @click="activeFilter = tab.id"
            >
              {{ isVi ? tab.viLabel : tab.enLabel }}
            </button>
          </div>
        </div>

        <!-- CAPABILITIES GRID -->
        <div class="services-grid">
          <div
            v-for="(cap, cIdx) in filteredCapabilities"
            :key="cap.slug"
            class="service-pillar-card matte-card"
          >
            <!-- TOP CARD BAR -->
            <div class="card-header-bar">
              <div class="pillar-icon-box">
                <i :class="cap.icon"></i>
              </div>
              <div class="pillar-meta-top">
                <span class="pillar-num text-meta-mono">0{{ cIdx + 1 }}</span>
                <span class="badge-v2" :class="cIdx % 2 === 0 ? 'amber' : 'teal'">
                  {{ isVi ? cap.badge : (cap.enBadge || cap.badge) }}
                </span>
              </div>
            </div>

            <!-- TITLE & SUB -->
            <h3 class="pillar-title">{{ isVi ? (cap.viTitle || cap.title) : (cap.enTitle || cap.title) }}</h3>
            <p class="pillar-sub">{{ isVi ? cap.subtitle : (cap.enSubtitle || cap.subtitle) }}</p>
            <p class="pillar-summary">{{ isVi ? cap.summary : (cap.enSummary || cap.summary) }}</p>

            <!-- KEY DELIVERABLES -->
            <div class="pillar-deliverables-box">
              <span class="text-meta-mono d-label">{{ isVi ? 'SẢN PHẨM BÀN GIAO CHÍNH:' : 'KEY DELIVERABLES:' }}</span>
              <ul class="d-list">
                <li v-for="(item, dIdx) in (isVi ? cap.deliverables : (cap.enDeliverables || cap.deliverables))" :key="dIdx">
                  <i class="fa-solid fa-check"></i>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <!-- CARD FOOTER META & CTAS -->
            <div class="pillar-footer">
              <div class="footer-meta-pair">
                <div class="meta-block">
                  <span class="meta-label text-meta-mono">{{ isVi ? 'MỨC ĐẦU TƯ:' : 'INVESTMENT:' }}</span>
                  <strong class="meta-val">{{ isVi ? cap.investmentStarting : (cap.enInvestmentStarting || cap.investmentStarting) }}</strong>
                </div>
                <div class="meta-block">
                  <span class="meta-label text-meta-mono">{{ isVi ? 'TIẾN ĐỘ:' : 'TIMELINE:' }}</span>
                  <strong class="meta-val">{{ isVi ? cap.timeline : (cap.enTimeline || cap.timeline) }}</strong>
                </div>
              </div>

              <div class="card-action-btns">
                <NuxtLink :to="`/services/${cap.slug}`" class="btn-detail-link">
                  <span>{{ isVi ? 'Xem Chi Tiết' : 'Explore' }}</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </NuxtLink>
                <NuxtLink to="/start-a-project" class="btn-quick-brief">
                  <span>{{ isVi ? 'Đặt Lịch' : 'Book' }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5-STEP PRODUCTION ROADMAP -->
      <section class="production-process-section matte-card">
        <span class="badge-v2 teal">{{ isVi ? 'MINH BẠCH & KỶ LUẬT' : 'PROCESS RIGOR' }}</span>
        <h2 class="section-heading">{{ isVi ? 'Quy Trình May Đo Âm Nhạc 5 Bước' : 'The 5-Step Production Roadmap' }}</h2>
        <p class="section-desc">
          {{ isVi
            ? 'Mọi dự án tại XKProduction đều tuân theo lộ trình 5 bước nghiêm ngặt, loại bỏ hoàn toàn sự mập mờ và giúp nghệ sĩ luôn nắm quyền kiểm soát chất lượng.'
            : 'Every production follows a strict 5-stage architectural pipeline, eliminating guesswork and giving you total quality assurance.'
          }}
        </p>

        <div class="workflow-steps-grid">
          <div v-for="(step, sIdx) in workflowSteps" :key="sIdx" class="workflow-step-card">
            <span class="step-num text-meta-mono">STAGE 0{{ sIdx + 1 }}</span>
            <strong class="step-title">{{ isVi ? step.viTitle : step.enTitle }}</strong>
            <p class="step-desc">{{ isVi ? step.viDesc : step.enDesc }}</p>
            <div class="step-badge">{{ isVi ? step.viOutput : step.enOutput }}</div>
          </div>
        </div>
      </section>

      <!-- STUDIO GEAR RACK & ACOUSTIC LAB -->
      <section class="studio-gear-section">
        <span class="badge-v2 amber">{{ isVi ? 'VŨ KHÍ PHÒNG THU' : 'STUDIO ARSENAL' }}</span>
        <h2 class="section-heading">{{ isVi ? 'Hạ Tầng Kỹ Thuật & Thiết Bị Kiểm Âm Chuẩn Mực' : 'Studio Hardware & Acoustic Monitoring' }}</h2>
        <p class="section-desc">
          {{ isVi
            ? 'Chúng tôi đầu tư nghiêm túc vào chuỗi thiết bị analog và digital hàng đầu để mỗi bản mix đều đạt độ dày, ấm và chi tiết cao nhất.'
            : 'We invest heavily in discrete analog and high-end digital signal chains to guarantee exceptional clarity, warmth, and headroom.'
          }}
        </p>

        <div class="gear-grid">
          <div v-for="(gear, gIdx) in studioGear" :key="gIdx" class="gear-card matte-card">
            <div class="gear-icon"><i :class="gear.icon"></i></div>
            <div class="gear-role text-meta-mono">{{ isVi ? gear.viRole : gear.enRole }}</div>
            <strong class="gear-name">{{ gear.name }}</strong>
            <p class="gear-detail">{{ isVi ? gear.viDesc : gear.enDesc }}</p>
          </div>
        </div>
      </section>

      <!-- COMPARISON MATRIX: XK VS MARKET -->
      <section class="comparison-section matte-card">
        <span class="badge-v2 teal">{{ isVi ? 'SỰ KHÁC BIỆT RÕ RỆT' : 'THE XK ADVANTAGE' }}</span>
        <h2 class="section-heading">{{ isVi ? 'Tại Sao Nghệ Sĩ Chọn XKProduction?' : 'Why Choose XKProduction Over The Mass Market?' }}</h2>
        <p class="section-desc">
          {{ isVi
            ? 'So sánh trực quan giữa tiêu chuẩn sản xuất chuyên nghiệp tại XKProduction và cách làm đại trà giá rẻ trên thị trường.'
            : 'A transparent side-by-side contrast between XKProduction standards and generic freelance services.'
          }}
        </p>

        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>{{ isVi ? 'Tiêu Chí Sản Xuất' : 'Production Criteria' }}</th>
                <th class="col-highlight">{{ isVi ? 'XKProduction Studio' : 'XKProduction Standard' }}</th>
                <th>{{ isVi ? 'Thị Trường Tự Do / Đại Trà' : 'Freelance / Cheap Market' }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rIdx) in comparisonRows" :key="rIdx">
                <td class="criteria-cell">
                  <strong>{{ isVi ? row.viCriteria : row.enCriteria }}</strong>
                </td>
                <td class="col-highlight check-cell">
                  <i class="fa-solid fa-circle-check"></i>
                  <span>{{ isVi ? row.viXK : row.enXK }}</span>
                </td>
                <td class="cross-cell">
                  <i class="fa-solid fa-circle-xmark"></i>
                  <span>{{ isVi ? row.viOther : row.enOther }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- FAQ SECTION -->
      <section class="services-faq-section">
        <span class="badge-v2 amber">{{ isVi ? 'HỎI ĐÁP MINH BẠCH' : 'FREQUENTLY ASKED QUESTIONS' }}</span>
        <h2 class="section-heading">{{ isVi ? 'Giải Đáp Thắc Mắc Trước Khi Bắt Đầu' : 'Clear Answers Before You Book' }}</h2>
        <p class="section-desc">
          {{ isVi
            ? 'Mọi thông tin cần thiết về quy trình làm việc từ xa, tiến độ, chỉnh sửa và hợp đồng bản quyền.'
            : 'Everything you need to know regarding remote workflows, turnaround, revisions, and commercial licensing.'
          }}
        </p>

        <div class="faq-accordion-list">
          <div
            v-for="(faq, fIdx) in serviceFaqs"
            :key="fIdx"
            class="faq-accordion-item matte-card"
            :class="{ 'is-open': openFaqIdx === fIdx }"
            @click="openFaqIdx = openFaqIdx === fIdx ? null : fIdx"
          >
            <div class="faq-q-row">
              <strong class="faq-q-text">{{ isVi ? faq.viQ : faq.enQ }}</strong>
              <i class="fa-solid fa-chevron-down faq-icon" :class="{ 'is-rotated': openFaqIdx === fIdx }"></i>
            </div>
            <div v-show="openFaqIdx === fIdx" class="faq-a-content">
              <p>{{ isVi ? faq.viA : faq.enA }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- HIGH CONVERTING BOTTOM BANNER -->
      <section class="services-cta-banner matte-card text-center">
        <span class="badge-v2 amber">{{ isVi ? 'BẮT ĐẦU DỰ ÁN NGAY' : 'READY TO COMMENCE' }}</span>
        <h2 class="cta-banner-title">
          {{ isVi ? 'Biến Giai Điệu Trong Đầu Thành Tác Phẩm Độc Bản' : 'Turn Your Sonic Vision Into An Authentic Masterpiece' }}
        </h2>
        <p class="cta-banner-sub">
          {{ isVi
            ? 'Bạn chỉ cần gửi một bản thu âm mộc qua điện thoại hoặc nộp brief dự án. Producer Nguyễn Xuân Kiệt sẽ trực tiếp thẩm định và tư vấn giải pháp tối ưu trong 24 giờ.'
            : 'Send us a simple phone voice memo or submit your project brief. Founder Nguyen Xuan Kiet will personally evaluate and provide strategic consultation within 24 hours.'
          }}
        </p>
        <div class="cta-buttons">
          <NuxtLink to="/build-project" class="btn-builder-action">
            <i class="fa-solid fa-sliders"></i>
            <span>{{ isVi ? 'MỞ BỘ DỰ TOÁN PROJECT BUILDER' : 'OPEN INTERACTIVE PROJECT BUILDER' }}</span>
          </NuxtLink>
          <NuxtLink to="/start-a-project" class="btn-brief-action">
            <span>{{ isVi ? 'NỘP BRIEF DỰ ÁN TRỰC TIẾP' : 'SUBMIT PROJECT BRIEF' }}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>
          <a href="https://zalo.me/0355356294" target="_blank" rel="noopener noreferrer" class="btn-zalo-action">
            <i class="fa-solid fa-comment-dots"></i>
            <span>{{ isVi ? 'CHAT ZALO VỚI PRODUCER' : 'DIRECT ZALO CONSULTATION' }}</span>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocale } from '~/composables/useLocale'
import { useProductionProjects } from '~/composables/useProductionProjects'
import { useStudioAudio, type StudioTrack } from '~/composables/useStudioAudio'

const { isVi } = useLocale()
const { capabilities } = useProductionProjects()
const { playTrack, togglePlay, currentTrack, isPlaying: isAudioPlaying } = useStudioAudio()

// Filter State
const activeFilter = ref('all')
const openFaqIdx = ref<number | null>(0)

const filterTabs = [
  { id: 'all', viLabel: 'Tất Cả Dịch Vụ (6)', enLabel: 'All Services (6)' },
  { id: 'music-production', viLabel: 'Sản Xuất & Phối Khí', enLabel: 'Arrangement' },
  { id: 'creative-sound', viLabel: 'Mixing & Mastering', enLabel: 'Mix & Master' },
  { id: 'studio-recording', viLabel: 'Thu Âm Phòng Thu', enLabel: 'Studio Recording' },
  { id: 'project-production', viLabel: 'Trọn Gói Single & MV', enLabel: 'Single & MV' },
  { id: 'live-production', viLabel: 'Âm Thanh & Live Band', enLabel: 'Live Sound' },
  { id: 'commercial-audio', viLabel: 'Quảng Cáo & B2B', enLabel: 'Commercial B2B' }
]

const filteredCapabilities = computed(() => {
  if (activeFilter.value === 'all') return capabilities
  return capabilities.filter(c => c.id === activeFilter.value || c.slug === activeFilter.value)
})

// Audio Demo Tracks
interface ShowcaseTrack {
  id: string
  title: string
  artist: string
  genre: string
  tempo: string
  lufs: string
  key: string
  audioSrc: string
}

const audioShowcaseTracks: ShowcaseTrack[] = [
  {
    id: 'pop-rnb-demo',
    title: 'Pop R&B Special Demo',
    artist: 'XKProduction Showcase',
    genre: 'R&B / Soul Pop',
    tempo: '102 BPM',
    lufs: '-14.1 LUFS',
    key: 'G Minor',
    audioSrc: '/product-audio-demo/pop-rnb-1-Gm.102.mp3'
  },
  {
    id: 'nhat-ki-cua-me',
    title: 'Nhật Kí Của Mẹ (Cover)',
    artist: 'Mai Linh · XKProduction',
    genre: 'Ballad / Acoustic Grand Piano',
    tempo: '82 BPM',
    lufs: '-14.0 LUFS',
    key: 'C Major',
    audioSrc: '/product-audio-demo/pop-rnb-1-Gm.102.mp3'
  },
  {
    id: 'chang-muon-noi-nhieu-loi',
    title: 'Chẳng Muốn Nói Nhiều Lời',
    artist: 'Revan · XKProduction',
    genre: 'Modern R&B / Deep Bass',
    tempo: '96 BPM',
    lufs: '-13.8 LUFS',
    key: 'E Minor',
    audioSrc: '/product-audio-demo/pop-rnb-1-Gm.102.mp3'
  },
  {
    id: 'love-du-phong',
    title: 'Love Dự Phòng',
    artist: 'Howl · XKProduction',
    genre: 'Acoustic Guitar Nylon',
    tempo: '88 BPM',
    lufs: '-14.2 LUFS',
    key: 'A Major',
    audioSrc: '/product-audio-demo/pop-rnb-1-Gm.102.mp3'
  }
]

function isCurrentTrack(track: ShowcaseTrack): boolean {
  return currentTrack.value?.id === track.id
}

function handlePlayTrack(track: ShowcaseTrack, index: number) {
  if (isCurrentTrack(track)) {
    togglePlay()
  } else {
    playTrack(index)
  }
}

// 5-Stage Workflow Data
const workflowSteps = [
  {
    viTitle: 'Khám Phá & Định Hướng',
    enTitle: 'Discovery & Direction',
    viDesc: 'Khảo sát chất giọng, phân tích quãng âm, xác định tone giọng, đo tempo BPM và tham chiếu phong cách mong muốn.',
    enDesc: 'Vocal register analysis, musical key mapping, BPM measurement, and curated sonic references.',
    viOutput: 'Bản phân tích định hướng âm thanh',
    enOutput: 'Sonic Blueprint & Key Specification'
  },
  {
    viTitle: 'Phác Thảo Demo Bản Phối',
    enTitle: 'Harmonic Draft & Beatmaking',
    viDesc: 'Lên cấu trúc Intro, Verse, Chorus, đệm hợp âm mẫu và gửi nghệ sĩ nghe thử để góp ý chỉnh sửa không giới hạn.',
    enDesc: 'Arranging song structure, laying harmonic chord foundations, with unlimited draft feedback rounds.',
    viOutput: 'Bản demo phối khí mộc',
    enOutput: 'Acoustic Demo Preview'
  },
  {
    viTitle: 'Thu Âm & Vocal Coaching',
    enTitle: 'Vocal Tracking & Coaching',
    viDesc: 'Thu âm tại phòng thu tiêu âm chuẩn với Neumann TLM 102. Vocal Coach trực tiếp hướng dẫn lấy hơi, ngân rung từng câu.',
    enDesc: 'Tracking in an acoustically calibrated room with Neumann microphones and hands-on vocal direction.',
    viOutput: 'Multitrack Vocal 24-bit/48kHz sạch',
    enOutput: '24-bit Raw Vocal Multitrack Stems'
  },
  {
    viTitle: 'Mixing & Spatial Mastering',
    enTitle: 'Spatial Mixing & Mastering',
    viDesc: 'Nắn Melodyne thủ công, cân bằng dynamic EQ đa dải, mở rộng không gian stereo 3D và đẩy loudness đạt chuẩn -14 LUFS Spotify.',
    enDesc: 'Precision Melodyne tuning, dynamic multi-band EQ, 3D stereo imaging, and -14 LUFS loudness calibration.',
    viOutput: 'Master số WAV 24-bit + Beat playback',
    enOutput: 'Digital Master (WAV 24-bit) + Backing Track'
  },
  {
    viTitle: 'Bàn Giao & Hỗ Trợ Phát Hành',
    enTitle: 'Delivery & DSP Launch',
    viDesc: 'Bàn giao đầy đủ file multitrack, TV track, bộ ảnh studio và tư vấn quy trình đăng ký bản quyền phát hành số toàn cầu.',
    enDesc: 'Full archival multitrack stems, TV track, promotional studio stills, and global distribution guidance.',
    viOutput: 'Trọn bộ dữ liệu thương mại độc quyền',
    enOutput: 'Commercial Distribution Stems Archive'
  }
]

// Studio Gear Arsenal
const studioGear = [
  {
    icon: 'fa-solid fa-sliders',
    viRole: 'BÀN MIXER KỸ THUẬT SỐ',
    enRole: 'DIGITAL LIVE & FOH CONSOLE',
    name: 'Midas M32R Digital Console',
    viDesc: '40 kênh âm thanh kỹ thuật số cao cấp, bộ chuyển đổi 96kHz mang lại chất âm chuẩn xác tuyệt đối cho phòng thu và sân khấu.',
    enDesc: '40-channel 96kHz digital console delivering surgical clarity for both studio monitoring and live stage FOH.'
  },
  {
    icon: 'fa-solid fa-wave-square',
    viRole: 'AUDIO INTERFACE & DSP',
    enRole: 'AUDIO INTERFACE & DSP',
    name: 'Universal Audio Apollo Twin X Duo',
    viDesc: 'Công nghệ pre-amp Unison danh tiếng và bộ xử lý DSP thời gian thực tái tạo độ ấm analogue huyền thoại của các bản thu đắt tiền.',
    enDesc: 'Industry-standard Unison preamps and real-time DSP emulation generating authentic analogue warmth.'
  },
  {
    icon: 'fa-solid fa-microphone',
    viRole: 'MICROPHONE PHÒNG THU',
    enRole: 'STUDIO CONDENSER MICROPHONES',
    name: 'Neumann TLM 102 & Rode NT1-A',
    viDesc: 'Dàn microphone condenser màng rung lớn thu trọn vẹn dải tần, giữ độ dày cho giọng nam và độ thanh thoát mượt mà cho giọng nữ.',
    enDesc: 'Large-diaphragm German capsules capturing nuanced vocal air, chest resonance, and dynamic breath detail.'
  },
  {
    icon: 'fa-solid fa-bolt',
    viRole: 'PREAMP ANALOG ANH QUỐC',
    enRole: 'DISCRETE BRITISH PREAMP',
    name: 'Warm Audio WA73-EQ',
    viDesc: 'Mạch Class-A rời rạc với biến áp Carnhill mô phỏng chiếc Neve 1073 huyền thoại, tạo độ dày dặn và keo dính tự nhiên cho vocal.',
    enDesc: 'Discrete Class-A circuitry with Carnhill transformers delivering legendary British Neve 1073 saturation.'
  },
  {
    icon: 'fa-solid fa-volume-high',
    viRole: 'HỆ THỐNG LOA KIỂM ÂM',
    enRole: 'REFERENCE STUDIO MONITORS',
    name: 'Yamaha HS8 & Genelec 8030C',
    viDesc: 'Đáp tuyến tần số siêu phẳng giúp kỹ sư phát hiện mọi lỗi xung đột pha, cân chỉnh dải bass chính xác và không bị lừa tai.',
    enDesc: 'Ultra-flat reference monitors ensuring accurate low-end translation and phase coherence across consumer devices.'
  },
  {
    icon: 'fa-solid fa-headphones',
    viRole: 'TAI NGHE KIỂM ÂM CHUYÊN DỤNG',
    enRole: 'CRITICAL MONITORING HEADPHONES',
    name: 'Focal Listen Pro & Audio-Technica M50x',
    viDesc: 'Kiểm tra chi tiết từng tạp âm nhỏ nhất, kiểm âm chéo không gian stereo trước khi xuất xưởng bản master.',
    enDesc: 'Closed-back precision staging headphones for surgical noise floor scrubbing and stereo placement verification.'
  }
]

// Comparison Rows
const comparisonRows = [
  {
    viCriteria: 'Bản Phối & Hoà Âm',
    enCriteria: 'Arrangement & Beatmaking',
    viXK: 'May đo độc bản 100% theo giọng nghệ sĩ, không dùng template',
    enXK: '100% custom-tailored to your voice, zero recycled templates',
    viOther: 'Dùng beat lậu tải mạng, trùng lặp đại trà, dễ dính bản quyền',
    enOther: 'Recycled YouTube rip beats, generic loops, high copyright risk'
  },
  {
    viCriteria: 'Xử Lý Cao Độ Vocal',
    enCriteria: 'Vocal Pitch & Timing Correction',
    viXK: 'Melodyne nắn nót thủ công từng nốt, bảo toàn độ rung tự nhiên',
    enXK: 'Precision hand-drawn Melodyne preserving authentic natural vibrato',
    viOther: 'Bật Autotune tự động rẻ tiền làm giọng bị nhựa và biến dạng méo mó',
    enOther: 'Cheap automated plugins causing robotic, metallic, phasey artifacts'
  },
  {
    viCriteria: 'Chuẩn Âm Lượng & Độ Sắc Nét',
    enCriteria: 'Mastering Loudness & Headroom',
    viXK: 'Đạt chuẩn -14 LUFS Spotify, dynamic range thoáng, âm bass đầm sâu',
    enXK: '-14 LUFS international streaming spec with wide dynamic headroom',
    viOther: 'Kéo limiter quá tay làm bẹt dynamic range, vỡ tiếng khi bật loa lớn',
    enOther: 'Over-limited sausage waveforms that clip and distort on phones'
  },
  {
    viCriteria: 'Bản Quyền & Quyền Khai Thác',
    enCriteria: 'Commercial Rights & Ownership',
    viXK: 'Nghệ sĩ sở hữu 100% quyền thương mại và doanh thu nhạc số',
    enXK: '100% artist ownership for streaming and monetization',
    viOther: 'Mập mờ bản quyền, dễ bị bên thứ 3 đánh gậy bản quyền YouTube/TikTok',
    enOther: 'Vague licenses leading to YouTube copyright strikes and revenue loss'
  },
  {
    viCriteria: 'Tiến Độ & Chi Phí Thực Hiện',
    enCriteria: 'Turnaround & Pricing Transparency',
    viXK: 'Cam kết 5-10 ngày bằng văn bản, minh bạch không chi phí ẩn',
    enXK: 'Strict 5-10 day turnaround with clear upfront fixed pricing',
    viOther: 'Ngâm bài cả tháng không hồi âm, liên tục phát sinh phụ phí vô lý',
    enOther: 'Unpredictable delays, ghosting, and unexpected extra fees'
  }
]

// Service FAQs
const serviceFaqs = [
  {
    viQ: 'Tôi ở xa (TP.HCM, Hà Nội, nước ngoài) có thể làm việc online với studio được không?',
    enQ: 'Can I collaborate remotely if I live in another city or abroad?',
    viA: 'Hoàn toàn thuận tiện. Hơn 50% dự án của XKProduction được thực hiện online với khách hàng tại TP.HCM, Hà Nội, Đà Nẵng và kiều bào tại Mỹ, Úc, Nhật Bản. Chúng tôi trao đổi qua Zalo/Google Drive, gửi bản nghe thử định kỳ và bảo đảm tiến độ cam kết.',
    enA: 'Completely seamless. Over 50% of our productions are handled remotely for artists in major cities and overseas in the US, Australia, and Japan. We collaborate via cloud drives, share iterative audio previews, and uphold strict deadlines.'
  },
  {
    viQ: 'Tôi chỉ có một đoạn hát mộc thu bằng điện thoại, có làm thành bài hoàn chỉnh được không?',
    enQ: 'Can you build a full production from a rough smartphone voice memo?',
    viA: 'Đây chính là sở trường của XKProduction. Chúng tôi sẽ phân tích tone giọng của bạn, đo tempo, tạo bản demo hợp âm và đàn thử gửi bạn nghe. Khi bạn ưng ý khung bài, studio mới tiến hành phối khí hoàn chỉnh.',
    enA: 'That is our core specialty. We analyze your vocal register, calculate BPM, create an acoustic harmonic sketch, and iterate with you before building the full multi-instrument arrangement.'
  },
  {
    viQ: 'Tôi được yêu cầu chỉnh sửa bao nhiêu lần sau khi nhận bản mix?',
    enQ: 'How many revisions am I entitled to after receiving the mix?',
    viA: 'Chúng tôi hỗ trợ chỉnh sửa không giới hạn ở giai đoạn phác thảo demo, và 3 lần tinh chỉnh chi tiết ở giai đoạn Mixing & Mastering để đảm bảo nghệ sĩ hoàn toàn hài lòng với âm sắc của tác phẩm.',
    enA: 'We offer unlimited revisions during the initial draft stage, followed by 3 complimentary detail revisions during Mixing & Mastering to ensure complete sonic perfection.'
  },
  {
    viQ: 'Hồ sơ bàn giao cuối cùng gồm những định dạng file nào?',
    enQ: 'What exact deliverables do I receive upon project completion?',
    viA: 'Bạn sẽ nhận được: Bản Master phát hành số 24-bit/48kHz WAV & MP3 320kbps, Bản Master Beat không lời (Backing track), Bản TV Track (Beat + bè), và toàn bộ thư mục Multitrack stems đã chỉnh sửa.',
    enA: 'You receive: 24-bit/48kHz digital streaming Master WAV & 320kbps MP3, Instrumental Backing Track Master, TV Performance Track (Beat + Backing Vocals), and all aligned multitrack stems.'
  },
  {
    viQ: 'Quy trình thanh toán và chính sách bảo hành âm thanh ra sao?',
    enQ: 'What are the payment terms and sound quality guarantee?',
    viA: 'Dự án được chia làm 2 đợt: tạm ứng 50% khi chốt brief và thanh toán 50% còn lại khi bàn giao bản master hoàn hảo. Mọi file của bạn được lưu trữ vĩnh viễn trên máy chủ studio để có thể tải lại bất cứ lúc nào.',
    enA: 'Projects are structured in two simple milestones: 50% upon brief confirmation, and 50% upon final master approval. Your production files are permanently archived on our secure studio servers.'
  }
]

useSeoMeta({
  title: () => isVi.value ? 'Dịch Vụ Âm Nhạc — 6 Trụ Cột Năng Lực Sản Xuất | XKProduction' : 'Services — 6 Core Music Production Pillars | XKProduction',
  description: () => isVi.value
    ? 'Hệ sinh thái sản xuất âm nhạc chuyên nghiệp: Hoà âm phối khí độc bản, Mixing & Mastering -14 LUFS Spotify, Thu âm vocal, Live band sân khấu và sản xuất MV 4K trọn gói tại XKProduction.'
    : 'Comprehensive music production solutions: Bespoke arrangement, Spotify-standard mixing & mastering, vocal tracking, live stage sound, and full MV production.',
  ogTitle: () => isVi.value ? 'Dịch Vụ Sản Xuất Âm Nhạc Chuẩn Mực | XKProduction' : 'Professional Music Production Services | XKProduction',
  ogDescription: () => isVi.value
    ? '2000+ dự án phát hành. Chuẩn âm thanh -14 LUFS Spotify. Hoà âm độc bản, không template.'
    : 'Over 2,000 released tracks. Mastered to -14 LUFS. Zero generic templates.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogUrl: 'https://xkproduction.com/services'
})
</script>

<style scoped>
.services-matrix-page {
  padding-top: clamp(7.5rem, 14vw, 11rem);
  padding-bottom: 7rem;
  background-color: var(--bg-canvas);
  color: var(--text-primary);
  min-height: 100vh;
}

/* HERO SECTION */
.services-hero {
  margin-bottom: 4.5rem;
}

.hero-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  border-radius: 9999px;
  background: rgba(13, 148, 136, 0.12);
  border: 1px solid rgba(13, 148, 136, 0.35);
  color: #2dd4bf;
  font-size: 0.8125rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #14b8a6;
  box-shadow: 0 0 10px #14b8a6;
  animation: pulse-glow 2s infinite ease-in-out;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

.header-titles {
  max-width: 960px;
  margin-bottom: 2.5rem;
}

.services-title {
  font-size: clamp(2.4rem, 5.5vw, 4.8rem);
  font-weight: 900;
  letter-spacing: -0.025em;
  color: var(--text-primary);
  line-height: 1.08;
  margin-top: 1rem;
  margin-bottom: 1.25rem;
}

.services-subtitle {
  font-size: clamp(1rem, 1.8vw, 1.25rem);
  color: var(--text-secondary);
  line-height: 1.65;
  max-width: 820px;
}

/* STUDIO METRICS GRID */
.studio-metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.metric-card {
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  border-left: 3px solid #fbbf24;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.metric-card:hover {
  transform: translateY(-3px);
  border-color: #f59e0b;
}

.metric-number {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 900;
  color: #fbbf24;
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.metric-title {
  font-size: 0.9375rem;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
}

.metric-desc {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.hero-actions-row {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.btn-primary-action {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.95rem 1.85rem;
  background: var(--text-primary);
  color: var(--bg-canvas);
  font-weight: 800;
  font-size: 0.875rem;
  letter-spacing: 0.04em;
  border-radius: 6px;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.btn-primary-action:hover {
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.25);
}

.btn-secondary-action {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.95rem 1.85rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-secondary-action:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.25);
}

/* AUDIO SHOWCASE */
.services-audio-showcase {
  padding: clamp(2rem, 4vw, 3.5rem);
  margin-bottom: 5.5rem;
  background: radial-gradient(circle at 80% 20%, rgba(217, 119, 6, 0.08), transparent 60%), #0f1115;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.showcase-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.showcase-title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
}

.showcase-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  max-width: 680px;
  line-height: 1.6;
}

.showcase-badge-meta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  font-size: 0.75rem;
  font-family: ui-monospace, monospace;
  color: #fbbf24;
}

.audio-tracks-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.audio-track-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  transition: all 0.2s ease;
  gap: 1rem;
}

.audio-track-item:hover,
.audio-track-item.is-playing {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(217, 119, 6, 0.4);
}

.track-info-side {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.track-genre-pill {
  font-size: 0.6875rem;
  color: #fbbf24;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.track-song-title {
  font-size: 1.0625rem;
  color: var(--text-primary);
}

.track-song-artist {
  font-size: 0.8125rem;
  color: var(--text-subtle);
}

.track-specs-row {
  display: flex;
  gap: 0.45rem;
  margin-top: 0.35rem;
}

.spec-tag {
  font-size: 0.6875rem;
  font-family: ui-monospace, monospace;
  background: rgba(255, 255, 255, 0.04);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  color: var(--text-secondary);
}

.track-action-side {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-play-preview {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.65rem 1.1rem;
  background: #fbbf24;
  color: #0b0e14;
  font-size: 0.8125rem;
  font-weight: 800;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-play-preview:hover {
  background: #ffffff;
  transform: scale(1.03);
}

/* MINI EQUALIZER ANIMATION */
.mini-waveform-bars {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 20px;
}

.mini-waveform-bars span {
  width: 3px;
  height: 6px;
  background: #475569;
  border-radius: 2px;
  transition: height 0.2s ease, background 0.2s ease;
}

.mini-waveform-bars.active span {
  background: #fbbf24;
  animation: eq-bounce 0.8s infinite ease-in-out alternate;
}

.mini-waveform-bars.active span:nth-child(2) { animation-delay: 0.15s; }
.mini-waveform-bars.active span:nth-child(3) { animation-delay: 0.3s; }
.mini-waveform-bars.active span:nth-child(4) { animation-delay: 0.45s; }
.mini-waveform-bars.active span:nth-child(5) { animation-delay: 0.2s; }

@keyframes eq-bounce {
  0% { height: 4px; }
  100% { height: 18px; }
}

/* DIRECTORY SECTION */
.services-directory-section {
  margin-bottom: 6rem;
}

.directory-header-row {
  margin-bottom: 3rem;
}

.section-heading {
  font-size: clamp(1.8rem, 3.8vw, 2.75rem);
  font-weight: 900;
  color: var(--text-primary);
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
}

.section-desc {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  max-width: 760px;
  line-height: 1.6;
}

.service-filter-tabs {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 2rem;
  padding-bottom: 0.5rem;
}

.filter-tab-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  padding: 0.55rem 1.15rem;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}

.filter-tab-btn:hover {
  color: var(--text-primary);
  border-color: var(--border-hover);
}

.filter-tab-btn.active {
  background: var(--text-primary);
  color: var(--bg-canvas);
  border-color: var(--text-primary);
}

/* SERVICES GRID */
.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.service-pillar-card {
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s var(--ease-out-expo), border-color 0.25s ease;
}

.service-pillar-card:hover {
  transform: translateY(-4px);
  border-color: rgba(217, 119, 6, 0.4);
}

.card-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.pillar-icon-box {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: rgba(217, 119, 6, 0.12);
  border: 1px solid rgba(217, 119, 6, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  color: #fbbf24;
}

.pillar-meta-top {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.pillar-num {
  font-size: 0.875rem;
  color: #64748b;
}

.pillar-title {
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
}

.pillar-sub {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #fbbf24;
  margin-bottom: 1rem;
  line-height: 1.45;
}

.pillar-summary {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.75rem;
  flex: 1;
}

.pillar-deliverables-box {
  background: rgba(0, 0, 0, 0.3);
  padding: 1.25rem;
  border-radius: 8px;
  border: 1px solid var(--border-subtle);
  margin-bottom: 1.75rem;
}

.d-label {
  display: block;
  font-size: 0.6875rem;
  color: var(--text-subtle);
  margin-bottom: 0.75rem;
}

.d-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.d-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.8125rem;
  color: var(--text-primary);
  line-height: 1.45;
}

.d-list i {
  color: #0d9488;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.pillar-footer {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-subtle);
}

.footer-meta-pair {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.meta-block {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.meta-label {
  font-size: 0.6875rem;
  color: var(--text-subtle);
}

.meta-val {
  font-size: 0.9375rem;
  font-weight: 800;
  color: var(--text-primary);
}

.card-action-btns {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-detail-link {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-size: 0.8125rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.15s ease;
}

.btn-detail-link:hover {
  background: #ffffff;
  color: var(--bg-canvas);
  border-color: #ffffff;
}

.btn-quick-brief {
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  background: #fbbf24;
  color: #06080f;
  font-size: 0.8125rem;
  font-weight: 800;
  text-decoration: none;
  transition: transform 0.15s ease, background 0.15s ease;
}

.btn-quick-brief:hover {
  background: #ffffff;
  transform: translateY(-2px);
}

/* WORKFLOW PROCESS */
.production-process-section {
  padding: clamp(2.5rem, 5vw, 4.5rem);
  margin-bottom: 6rem;
}

.workflow-steps-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.25rem;
  margin-top: 3rem;
}

.workflow-step-card {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
}

.step-num {
  font-size: 0.75rem;
  color: #fbbf24;
}

.step-title {
  font-size: 1.0625rem;
  color: var(--text-primary);
  line-height: 1.35;
}

.step-desc {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.55;
  flex: 1;
}

.step-badge {
  font-size: 0.6875rem;
  font-family: ui-monospace, monospace;
  background: rgba(13, 148, 136, 0.15);
  border: 1px solid rgba(13, 148, 136, 0.3);
  color: #2dd4bf;
  padding: 0.35rem 0.6rem;
  border-radius: 4px;
}

/* GEAR ARSENAL */
.studio-gear-section {
  margin-bottom: 6rem;
}

.gear-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.gear-card {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.gear-icon {
  font-size: 1.5rem;
  color: #fbbf24;
  margin-bottom: 0.25rem;
}

.gear-role {
  font-size: 0.6875rem;
  color: var(--text-subtle);
}

.gear-name {
  font-size: 1.125rem;
  color: var(--text-primary);
}

.gear-detail {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.55;
}

/* COMPARISON TABLE */
.comparison-section {
  padding: clamp(2.5rem, 5vw, 4.5rem);
  margin-bottom: 6rem;
}

.comparison-table-wrapper {
  margin-top: 2.5rem;
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.comparison-table th {
  padding: 1.25rem 1.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-subtle);
  background: rgba(255, 255, 255, 0.02);
}

.comparison-table th.col-highlight {
  color: #fbbf24;
  background: rgba(217, 119, 6, 0.08);
}

.comparison-table td {
  padding: 1.25rem 1.5rem;
  font-size: 0.875rem;
  border-bottom: 1px solid var(--border-subtle);
  line-height: 1.55;
}

.comparison-table td.col-highlight {
  background: rgba(217, 119, 6, 0.04);
}

.criteria-cell strong {
  color: var(--text-primary);
}

.check-cell {
  color: var(--text-primary);
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
}

.check-cell i {
  color: #10b981;
  font-size: 1rem;
  margin-top: 0.2rem;
  flex-shrink: 0;
}

.cross-cell {
  color: var(--text-secondary);
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
}

.cross-cell i {
  color: #ef4444;
  font-size: 1rem;
  margin-top: 0.2rem;
  flex-shrink: 0;
}

/* FAQ */
.services-faq-section {
  margin-bottom: 6rem;
}

.faq-accordion-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2.5rem;
}

.faq-accordion-item {
  padding: 1.5rem 2rem;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.faq-accordion-item:hover,
.faq-accordion-item.is-open {
  border-color: rgba(217, 119, 6, 0.35);
  background: rgba(255, 255, 255, 0.03);
}

.faq-q-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.faq-q-text {
  font-size: 1.0625rem;
  color: var(--text-primary);
}

.faq-icon {
  font-size: 0.8125rem;
  color: #fbbf24;
  transition: transform 0.25s ease;
}

.faq-icon.is-rotated {
  transform: rotate(180deg);
}

.faq-a-content {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-subtle);
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.65;
}

/* CTA BANNER */
.services-cta-banner {
  padding: 4.5rem 2.5rem;
  background: radial-gradient(circle at 50% 0%, rgba(217, 119, 6, 0.16), transparent 70%), #0f1115;
  border: 1px solid rgba(217, 119, 6, 0.3);
}

.cta-banner-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: var(--text-primary);
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  line-height: 1.15;
}

.cta-banner-sub {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  max-width: 720px;
  margin: 0 auto 2.5rem;
  line-height: 1.65;
}

.cta-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.btn-builder-action {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--text-primary);
  color: var(--bg-canvas);
  font-weight: 800;
  font-size: 0.875rem;
  border-radius: 6px;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;
}

.btn-builder-action:hover {
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.25);
}

.btn-brief-action {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-brief-action:hover {
  background: rgba(255, 255, 255, 0.1);
}

.btn-zalo-action {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: rgba(0, 104, 255, 0.15);
  border: 1px solid rgba(0, 104, 255, 0.4);
  color: #38bdf8;
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-zalo-action:hover {
  background: rgba(0, 104, 255, 0.25);
  transform: translateY(-2px);
}

/* RESPONSIVE */
@media (max-width: 1200px) {
  .workflow-steps-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .studio-metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .audio-tracks-grid {
    grid-template-columns: 1fr;
  }
  .services-grid {
    grid-template-columns: 1fr;
  }
  .gear-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .workflow-steps-grid {
    grid-template-columns: 1fr;
  }
  .gear-grid {
    grid-template-columns: 1fr;
  }
  .studio-metrics-grid {
    grid-template-columns: 1fr;
  }
  .audio-track-item {
    flex-direction: column;
    align-items: flex-start;
  }
  .track-action-side {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
