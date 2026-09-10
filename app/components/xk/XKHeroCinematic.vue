<template>
  <section class="xk-hero-cinematic" role="region" aria-label="Hero Trailer">
    <!-- AMBIENT DEPTH BACKDROP -->
    <div class="cinematic-backdrop" aria-hidden="true">
      <div class="backdrop-gradient"></div>
      <div class="spotlight-mesh"></div>
    </div>

    <div class="editorial-container hero-container">
      <!-- METADATA HEADER STRIP -->
      <div class="hero-top-meta">
        <div class="meta-left">
          <span class="badge-v2 amber">{{ isVi ? 'SẢN XUẤT ÂM NHẠC & SỰ KIỆN' : 'MUSIC PRODUCTION & EVENTS' }}</span>
          <span class="text-meta-mono meta-geo">{{ isVi ? 'THỦ ĐỨC, TP.HCM · SẢN XUẤT & SOUND LIGHT · TỪ 2019' : 'VIETNAM · PRODUCTION / SOUND & LIGHT · EST. 2019' }}</span>
        </div>
        <div class="studio-live-indicator">
          <span class="pulse-dot" :class="{ 'is-live': isPlaying }"></span>
          <div class="live-eq-bars" aria-hidden="true" :class="{ 'is-active': isPlaying }">
            <span class="eq-bar b1"></span>
            <span class="eq-bar b2"></span>
            <span class="eq-bar b3"></span>
            <span class="eq-bar b4"></span>
          </div>
          <span class="text-meta-mono">{{ isPlaying ? (isVi ? 'ĐANG PHÁT DEMO' : 'NOW PLAYING DEMO') : (isVi ? 'HOẠT ĐỘNG · SẴN SÀNG NHẬN DỰ ÁN' : 'ACTIVE · BOOKING OPEN') }}</span>
        </div>
      </div>

      <!-- EDITORIAL BESPOKE STATEMENT HEADLINE -->
      <div class="hero-title-block">
        <h1 class="hero-manifesto-title">
          <template v-if="isVi">
            <span class="hero-title-lead">Sản Xuất Âm Nhạc • Sound & Lighting</span>
            <span class="hero-title-statement text-gold-gradient">Mỗi track đều bắt đầu từ sự yên tĩnh, và kết thúc bằng chất lượng.</span>
          </template>
          <template v-else>
            <span class="hero-title-lead">Music Production • Sound & Light</span>
            <span class="hero-title-statement text-gold-gradient">Every track begins with silence, and concludes with quality.</span>
          </template>
        </h1>
        <p class="hero-manifesto-desc">
          {{ isVi
            ? 'XKProduction chuyên sâu 3 lĩnh vực cốt lõi: Sản xuất âm nhạc bài bản, Hoà âm phối khí độc bản và Cung cấp giải pháp Sound & Light (Âm thanh & Ánh sáng) chuyên nghiệp cho sân khấu, sự kiện.'
            : 'XKProduction specializes in 3 core pillars: end-to-end Music Production, bespoke Music Arrangement, and professional Sound & Light staging solutions for live events.'
          }}
        </p>
      </div>

      <!-- HERO ACTIONS & METRICS ROW -->
      <div class="hero-action-split">
        <div class="hero-primary-ctas">
          <NuxtLink to="/work" class="btn-hero-primary">
            <span>{{ isVi ? 'NGHE BÀI HÁT ĐÃ LÀM' : 'EXPLORE WORK' }}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>

          <NuxtLink to="/start-a-project" class="btn-hero-secondary">
            <span>{{ isVi ? 'LIÊN HỆ ĐẶT LỊCH' : 'BOOK A SESSION' }}</span>
          </NuxtLink>

          <button
            type="button"
            class="btn-hero-play-demo"
            :class="{ 'is-playing': isPlaying }"
            @click="handleTogglePlayDemo"
            :aria-label="isPlaying ? (isVi ? 'Tạm dừng demo' : 'Pause demo') : (isVi ? 'Nghe thử chất âm' : 'Listen studio demo')"
          >
            <span class="play-icon-box">
              <i :class="isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'"></i>
            </span>
            <div class="play-info-wrap">
              <span class="play-label">{{ isPlaying ? (isVi ? 'Đang phát demo...' : 'Playing Demo...') : (isVi ? 'Nghe Thử Chất Âm' : 'Listen Studio Demo') }}</span>
              <span class="play-sub text-meta-mono font-mono">{{ isVi ? 'Chất âm thực tế' : 'Master Quality' }}</span>
            </div>
          </button>
        </div>

        <!-- REFINED MINIMAL CREDITS -->
        <div class="hero-proof-strip">
          <div class="proof-item">
            <strong class="proof-val font-mono">2,000+</strong>
            <span class="proof-lbl text-meta-mono">{{ isVi ? 'Dự Án Hoàn Thành' : 'Completed Projects' }}</span>
          </div>
          <div class="proof-divider"></div>
          <div class="proof-item">
            <strong class="proof-val font-mono">7+ Năm</strong>
            <span class="proof-lbl text-meta-mono">{{ isVi ? 'Kinh Nghiệm Hoạt Động' : 'Years Experience' }}</span>
          </div>
        </div>
      </div>

      <!-- REAL CAPABILITY SHOWCASE (BENTO 3-PANEL) -->
      <div class="hero-visual-anchor matte-card" role="region" :aria-label="isVi ? 'Trực quan năng lực thực tế XKProduction' : 'XKProduction Real Capability Proof'">
        <div class="visual-header-bar">
          <div class="console-specs text-meta-mono">
            <span class="spec-dot" :class="{ 'is-live': isPlaying }"></span>
            <span>{{ isVi ? 'NGƯỜI THẬT · THIẾT BỊ THẬT · DỰ ÁN THỰC CHIẾN' : 'REAL TEAM · PROFESSIONAL GEAR · PROVEN EXPERIENCE' }}</span>
          </div>
          <div class="header-bar-right">
            <span class="spec-hardware text-meta-mono">MIDAS M32R · GENELEC SAM · DAW PRO TOOLS</span>
            <span class="spec-status text-meta-mono">{{ isPlaying ? (isVi ? '● ĐANG PHÁT DEMO' : '● DEMO PLAYING') : (isVi ? '● SẴN SÀNG NHẬN DỰ ÁN' : '● REC READY') }}</span>
          </div>
        </div>

        <!-- 3-CARD BENTO CONTAINER -->
        <div class="hero-bento-grid">
          <!-- CARD 1: LIVE SOUND & EVENT -->
          <div class="bento-card bento-live-sound">
            <div class="card-media-wrapper">
              <img
                src="/images/kiet-live-sound-focus.jpg"
                :alt="isVi ? 'Kỹ thuật viên âm thanh Nguyễn Xuân Kiệt vận hành bàn mixer Midas M32R trực tiếp' : 'Audio Engineer Xuan Kiet operating Midas M32R console'"
                class="bento-img live-img"
                width="640"
                height="800"
                fetchpriority="high"
                loading="eager"
              />
              <div class="bento-scrim"></div>
            </div>

            <div class="bento-card-overlay">
              <div class="bento-top-badges">
                <span class="bento-badge badge-cyan">
                  <i class="fa-solid fa-sliders"></i>
                  <span>{{ isVi ? 'SOUND & LIGHT SỰ KIỆN' : 'SOUND & LIGHT' }}</span>
                </span>
                <span class="bento-pill-tech font-mono">MIDAS M32R</span>
              </div>

              <div class="bento-bottom-info">
                <span class="bento-micro-kicker text-meta-mono">{{ isVi ? 'SÂN KHẤU & SỰ KIỆN' : 'STAGE & EVENT' }}</span>
                <h2 class="bento-card-title">{{ isVi ? 'Âm Thanh & Ánh Sáng Thực Chiến' : 'Precision Console & Lighting' }}</h2>
                <p class="bento-card-desc">
                  {{ isVi ? 'Vận hành mixer Midas M32R chống hú rít cùng hiệu ứng ánh sáng chuyên nghiệp, kiểm soát áp lực âm thanh sạch và bùng nổ.' : 'Real-time multi-channel acoustic control, Midas M32R dynamics and synchronized stage lighting.' }}
                </p>
              </div>
            </div>
          </div>

          <!-- CARD 2: FOUNDER & LEAD PRODUCER (CENTER ANCHOR) -->
          <div class="bento-card bento-founder">
            <div class="card-media-wrapper">
              <img
                src="/images/founder-kiet.jpg"
                :alt="isVi ? 'Nguyễn Xuân Kiệt - Founder & Music Producer tại XKProduction' : 'Nguyen Xuan Kiet - Founder & Music Producer at XKProduction'"
                class="bento-img founder-img"
                width="640"
                height="800"
                fetchpriority="high"
                loading="eager"
              />
              <div class="bento-scrim bento-scrim-amber"></div>
            </div>

            <div class="bento-card-overlay">
              <div class="bento-top-badges">
                <span class="bento-badge badge-gold">
                  <i class="fa-solid fa-crown"></i>
                  <span>{{ isVi ? 'FOUNDER & PRODUCER' : 'FOUNDER & PRODUCER' }}</span>
                </span>
                <span class="bento-pill-tech font-mono">EST. 2019</span>
              </div>

              <div class="bento-bottom-info">
                <span class="bento-micro-kicker kicker-gold text-meta-mono">{{ isVi ? 'TRÁCH NHIỆM & ĐỒNG HÀNH' : 'DIRECT ACCOUNTABILITY' }}</span>
                <h2 class="bento-card-title">{{ isVi ? 'Nguyễn Xuân Kiệt' : 'Nguyen Xuan Kiet' }}</h2>
                <p class="bento-card-desc">
                  {{ isVi ? '7+ năm đồng hành cùng hơn 2,000 dự án. Trực tiếp sản xuất âm nhạc, hoà âm phối khí và chỉ đạo kỹ thuật Sound & Light.' : '7+ years leading 2,000+ productions. Directly directing music production, custom arrangement, and live sound & light.' }}
                </p>
              </div>
            </div>
          </div>

          <!-- CARD 3: STUDIO & PRODUCTION (INTERACTIVE DEMO AUDIO) -->
          <div
            class="bento-card bento-studio interactive-audio-card"
            @click="handleTogglePlayDemo"
            role="button"
            tabindex="0"
            :aria-label="isPlaying ? (isVi ? 'Tạm dừng demo âm thanh' : 'Pause studio demo') : (isVi ? 'Bấm để nghe Demo chất âm Master phòng thu' : 'Click to preview studio master quality')"
            @keydown.enter.prevent="handleTogglePlayDemo"
            @keydown.space.prevent="handleTogglePlayDemo"
          >
            <div class="card-media-wrapper">
              <img
                src="/images/Xkpreviewnew.png"
                :alt="isVi ? 'Không gian sản xuất âm nhạc và hoà âm phối khí chuyên nghiệp XKProduction' : 'XKProduction professional music production and arrangement suite'"
                class="bento-img studio-img"
                width="800"
                height="800"
                loading="lazy"
              />
              <div class="bento-scrim"></div>
            </div>

            <!-- FLOATING AUDIO TRIGGER BADGE -->
            <div class="studio-play-trigger" :class="{ 'is-active': isPlaying }">
              <div class="trigger-orb">
                <i :class="isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'"></i>
              </div>
              <div class="trigger-label-group">
                <span class="trigger-state font-mono">{{ isPlaying ? (isVi ? 'PAUSE DEMO' : 'PAUSE DEMO') : (isVi ? 'NGHE CHẤT ÂM' : 'HEAR QUALITY') }}</span>
                <span class="trigger-sub text-meta-mono">{{ isPlaying ? (isVi ? 'Đang phát...' : 'Playing...') : (isVi ? 'Master 24-bit' : 'Studio Master') }}</span>
              </div>
            </div>

            <div class="bento-card-overlay">
              <div class="bento-top-badges">
                <span class="bento-badge badge-blue">
                  <i class="fa-solid fa-music"></i>
                  <span>{{ isVi ? 'SẢN XUẤT & PHỐI KHÍ' : 'PRODUCTION & ARRANGEMENT' }}</span>
                </span>
                <div class="bento-eq-pill" :class="{ 'is-playing': isPlaying }">
                  <span class="mini-bar mb1"></span>
                  <span class="mini-bar mb2"></span>
                  <span class="mini-bar mb3"></span>
                  <span class="mini-bar mb4"></span>
                </div>
              </div>

              <div class="bento-bottom-info">
                <span class="bento-micro-kicker text-meta-mono">{{ isVi ? 'BẢN PHỐI ĐỘC BẢN' : 'BESPOKE ARRANGEMENT' }}</span>
                <h2 class="bento-card-title">{{ isVi ? 'Hoà Âm Phối Khí & Sản Xuất Nhạc' : 'Music Production & Arrangement' }}</h2>
                <p class="bento-card-desc">
                  {{ isVi ? 'Biến ý tưởng mộc thành bản phối hoàn chỉnh đa thể loại, trau chuốt từng âm sắc và master chuẩn phát hành quốc tế.' : 'Transforming raw sketches into release-ready master productions with bespoke multi-genre arrangement.' }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- MOBILE SWIPE HINT BAR -->
        <div class="mobile-bento-bar text-meta-mono">
          <i class="fa-solid fa-arrows-left-right"></i>
          <span>{{ isVi ? 'Vuốt ngang để xem 3 khía cạnh năng lực thực tế' : 'Swipe horizontally to view all capabilities' }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocale } from '~/composables/useLocale'
import { useStudioAudio } from '~/composables/useStudioAudio'

const { isVi } = useLocale()
const { isPlaying, togglePlay, playTrack } = useStudioAudio()

function handleTogglePlayDemo() {
  if (isPlaying.value) {
    togglePlay()
  } else {
    playTrack(0)
  }
}
</script>

<style scoped>
.xk-hero-cinematic {
  position: relative;
  padding-top: clamp(7.5rem, 13vw, 10.5rem);
  padding-bottom: 5.5rem;
  background-color: var(--bg-canvas);
  overflow: hidden;
}

.cinematic-backdrop {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.backdrop-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(22, 119, 255, 0.13) 0%, rgba(0, 184, 255, 0.04) 55%, transparent 80%);
}

.hero-container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

/* TOP METADATA STRIP */
.hero-top-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-subtle);
  margin-bottom: 2.75rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.meta-left {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.meta-geo {
  color: var(--text-secondary);
}

.studio-live-indicator {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #1677FF;
  box-shadow: 0 0 10px rgba(22, 119, 255, 0.9);
  animation: pulse-glow 2.2s infinite ease-in-out;
}

.live-eq-bars {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 12px;
  padding: 0 2px;
}

.eq-bar {
  width: 2px;
  background: #00B8FF;
  border-radius: 1px;
  animation: eqBounce 1.2s infinite ease-in-out;
}

.eq-bar.b1 { height: 40%; animation-delay: 0.1s; }
.eq-bar.b2 { height: 80%; animation-delay: 0.3s; }
.eq-bar.b3 { height: 60%; animation-delay: 0.2s; }
.eq-bar.b4 { height: 100%; animation-delay: 0.4s; }

@keyframes eqBounce {
  0%, 100% { transform: scaleY(0.3); opacity: 0.5; }
  50% { transform: scaleY(1); opacity: 1; }
}

@keyframes pulse-glow {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.6; }
}

/* EDITORIAL MANIFESTO TITLE */
.hero-title-block {
  margin-bottom: 3rem;
}

.hero-manifesto-title {
  font-size: clamp(1.85rem, 3.4vw, 3.4rem);
  font-weight: 900;
  letter-spacing: -0.005em;
  line-height: 1.25;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  text-wrap: balance;
}

.hero-title-lead {
  color: #f8fafc;
  font-weight: 800;
  letter-spacing: -0.005em;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
}

.hero-title-statement {
  font-size: clamp(1.05rem, 1.85vw, 1.95rem);
  font-weight: 800;
  letter-spacing: -0.005em;
  line-height: 1.25;
  color: #f59e0b;
  background: linear-gradient(180deg, #FFFDF8 0%, #FDE08E 38%, #F59E0B 75%, #D97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  width: fit-content;
  max-width: 100%;
  filter: drop-shadow(0 2px 20px rgba(245, 158, 11, 0.25));
}

@media (min-width: 1024px) {
  .hero-title-lead,
  .hero-title-statement {
    white-space: nowrap;
  }
}

.hero-manifesto-desc {
  font-size: clamp(1.02rem, 1.6vw, 1.2rem);
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 820px;
}

/* ACTION & PROOF ROW */
.hero-action-split {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 3.5rem;
}

.hero-primary-ctas {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.btn-hero-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.95rem 1.95rem;
  background: linear-gradient(135deg, #1677FF 0%, #00B8FF 100%);
  color: #ffffff;
  font-weight: 800;
  font-size: 0.84rem;
  letter-spacing: 0.06em;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 20px rgba(22, 119, 255, 0.45);
}

.btn-hero-primary:hover {
  background: linear-gradient(135deg, #2488FF 0%, #22c5ff 100%);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 184, 255, 0.6);
}

.btn-hero-secondary {
  display: inline-flex;
  align-items: center;
  padding: 0.95rem 1.85rem;
  background: rgba(22, 119, 255, 0.08);
  color: var(--text-primary);
  font-weight: 700;
  font-size: 0.84rem;
  letter-spacing: 0.06em;
  border-radius: 8px;
  border: 1px solid rgba(22, 119, 255, 0.25);
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  backdrop-filter: blur(10px);
}

.btn-hero-secondary:hover {
  background: rgba(22, 119, 255, 0.16);
  border-color: rgba(0, 184, 255, 0.55);
  color: #ffffff;
  transform: translateY(-2px);
}

.btn-hero-play-demo {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  background: rgba(251, 191, 36, 0.05);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 8px;
  cursor: pointer;
  color: var(--text-primary);
  padding: 0.55rem 1rem 0.55rem 0.65rem;
  transition: all 0.25s ease;
}

.btn-hero-play-demo:hover,
.btn-hero-play-demo.is-playing {
  background: rgba(251, 191, 36, 0.12);
  border-color: rgba(251, 191, 36, 0.45);
  transform: translateY(-1px);
}

.btn-hero-play-demo:hover .play-icon-box,
.btn-hero-play-demo.is-playing .play-icon-box {
  background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
  color: #07080a;
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
  transform: scale(1.05);
}

.play-icon-box {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(251, 191, 36, 0.14);
  border: 1px solid rgba(251, 191, 36, 0.35);
  color: #fbbf24;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  transition: all 0.22s ease;
}

.play-info-wrap {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.play-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}

.play-sub {
  font-size: 0.65rem;
  color: #fbbf24;
  letter-spacing: 0.06em;
}

.hero-proof-strip {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.proof-item {
  display: flex;
  flex-direction: column;
}

.proof-val {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: 0;
}

.proof-lbl {
  font-size: 0.6875rem;
  color: var(--text-subtle);
}

.proof-divider {
  width: 1px;
  height: 32px;
  background: var(--border-subtle);
}

/* REAL CAPABILITY BENTO SHOWCASE */
.hero-visual-anchor {
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  background: rgba(10, 14, 22, 0.7);
  border: 1px solid rgba(22, 119, 255, 0.16);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.75), 0 0 40px rgba(22, 119, 255, 0.05);
}

.visual-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.35rem;
  background: rgba(8, 12, 18, 0.95);
  border-bottom: 1px solid var(--border-subtle);
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.header-bar-right {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.spec-hardware {
  color: var(--text-dim);
  font-size: 0.625rem;
  letter-spacing: 0.08em;
}

@media (max-width: 991px) {
  .spec-hardware {
    display: none;
  }
}

.console-specs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
}

.spec-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #1677FF;
  box-shadow: 0 0 8px rgba(22, 119, 255, 0.7);
}

.spec-status {
  color: #60CFFF;
  font-weight: 700;
}

/* BENTO GRID */
.hero-bento-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1.08fr;
  gap: 10px;
  padding: 10px;
  background: #06090e;
}

.bento-card {
  position: relative;
  height: clamp(440px, 36vw, 520px);
  border-radius: 10px;
  overflow: hidden;
  background: #080c14;
  border: 1px solid rgba(255, 255, 255, 0.07);
  transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s var(--ease-spring);
}

.bento-card:hover {
  border-color: rgba(22, 119, 255, 0.35);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6), 0 0 24px rgba(22, 119, 255, 0.1);
}

.bento-founder:hover {
  border-color: rgba(229, 185, 95, 0.4);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6), 0 0 24px rgba(212, 175, 55, 0.12);
}

.interactive-audio-card {
  cursor: pointer;
}

.interactive-audio-card:focus-visible {
  outline: 2px solid #1677FF;
  outline-offset: 2px;
}

/* MEDIA & IMAGE WRAPPER */
.card-media-wrapper {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 1;
}

.bento-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease;
  filter: brightness(0.92) contrast(1.04);
}

.live-img {
  object-position: center 25%;
}

.founder-img {
  object-position: center 15%;
}

.studio-img {
  object-position: center 55%;
}

.bento-card:hover .bento-img {
  transform: scale(1.05);
  filter: brightness(1) contrast(1.05);
}

/* SCRIMS */
.bento-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(6, 10, 18, 0.3) 0%, rgba(6, 10, 18, 0.08) 35%, rgba(6, 10, 18, 0.68) 65%, rgba(4, 7, 13, 0.96) 96%);
  pointer-events: none;
  z-index: 2;
  transition: opacity 0.4s ease;
}

.bento-scrim-amber {
  background: linear-gradient(180deg, rgba(16, 8, 5, 0.25) 0%, rgba(14, 7, 4, 0.08) 35%, rgba(10, 8, 14, 0.7) 65%, rgba(5, 7, 14, 0.96) 96%);
}

.bento-card:hover .bento-scrim {
  opacity: 0.9;
}

/* OVERLAYS */
.bento-card-overlay {
  position: absolute;
  inset: 0;
  z-index: 3;
  padding: 1.35rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
}

.bento-top-badges {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.bento-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.badge-cyan {
  background: rgba(22, 119, 255, 0.22);
  border: 1px solid rgba(0, 184, 255, 0.4);
  color: #60CFFF;
}

.badge-gold {
  background: rgba(212, 175, 55, 0.2);
  border: 1px solid rgba(229, 185, 95, 0.45);
  color: #FFD270;
}

.badge-blue {
  background: rgba(14, 40, 85, 0.45);
  border: 1px solid rgba(96, 165, 250, 0.45);
  color: #93C5FD;
}

.bento-pill-tech {
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  color: #94a3b8;
  background: rgba(6, 10, 18, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.55rem;
  border-radius: 6px;
  backdrop-filter: blur(8px);
}

/* EQ MINI PILL */
.bento-eq-pill {
  display: flex;
  align-items: flex-end;
  gap: 2.5px;
  height: 16px;
  padding: 2px 6px;
  background: rgba(6, 10, 18, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
}

.mini-bar {
  width: 2.5px;
  height: 4px;
  background: #60CFFF;
  border-radius: 1px;
  transition: height 0.2s ease;
}

.bento-eq-pill.is-playing .mini-bar {
  animation: miniEq 0.8s infinite alternate ease-in-out;
}

.bento-eq-pill.is-playing .mb1 { animation-delay: 0.1s; }
.bento-eq-pill.is-playing .mb2 { animation-delay: 0.3s; }
.bento-eq-pill.is-playing .mb3 { animation-delay: 0.15s; }
.bento-eq-pill.is-playing .mb4 { animation-delay: 0.4s; }

@keyframes miniEq {
  0% { height: 3px; }
  100% { height: 13px; }
}

/* FLOATING PLAY TRIGGER ON STUDIO CARD */
.studio-play-trigger {
  position: absolute;
  top: 4.25rem;
  right: 1.25rem;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.4rem 0.85rem 0.4rem 0.45rem;
  background: rgba(6, 11, 20, 0.82);
  border: 1px solid rgba(0, 184, 255, 0.35);
  border-radius: 9999px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 16px rgba(22, 119, 255, 0.25);
  transition: transform 0.25s var(--ease-spring), border-color 0.25s ease, background 0.25s ease;
  pointer-events: auto;
}

.interactive-audio-card:hover .studio-play-trigger {
  transform: scale(1.04);
  border-color: rgba(0, 184, 255, 0.7);
  background: rgba(8, 16, 30, 0.92);
}

.studio-play-trigger.is-active {
  border-color: #60CFFF;
  box-shadow: 0 0 25px rgba(22, 119, 255, 0.6);
}

.trigger-orb {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1677FF 0%, #00B8FF 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 0.75rem;
  padding-left: 2px;
  box-shadow: 0 0 12px rgba(22, 119, 255, 0.6);
}

.studio-play-trigger.is-active .trigger-orb {
  padding-left: 0;
  background: linear-gradient(135deg, #00B8FF 0%, #60CFFF 100%);
}

.trigger-label-group {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.trigger-state {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #ffffff;
}

.trigger-sub {
  font-size: 0.6rem;
  color: #60CFFF;
}

/* BOTTOM TEXT */
.bento-bottom-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.bento-micro-kicker {
  color: #60CFFF;
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  font-weight: 700;
}

.bento-micro-kicker.kicker-gold {
  color: #FFD270;
}

.bento-card-title {
  font-size: clamp(1.2rem, 1.4vw, 1.4rem);
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.01em;
  line-height: 1.25;
}

.bento-card-desc {
  font-size: 0.8125rem;
  color: #94a3b8;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* MOBILE SWIPE BAR */
.mobile-bento-bar {
  display: none;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem;
  background: rgba(8, 12, 18, 0.95);
  border-top: 1px solid var(--border-subtle);
  font-size: 0.6875rem;
  color: var(--text-dim);
  letter-spacing: 0.06em;
}

/* RESPONSIVE BREAKPOINTS */
@media (max-width: 991px) {
  .hero-bento-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    padding: 8px;
  }
  .bento-card {
    height: 420px;
  }
  .bento-card-overlay {
    padding: 1.1rem 1rem;
  }
  .bento-card-desc {
    display: none;
  }
}

@media (max-width: 767px) {
  .hero-bento-grid {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    gap: 12px;
    padding: 12px;
  }
  .hero-bento-grid::-webkit-scrollbar {
    display: none;
  }
  .bento-card {
    flex: 0 0 84%;
    scroll-snap-align: center;
    height: 430px;
  }
  .bento-card-desc {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .mobile-bento-bar {
    display: flex;
  }
}
</style>
