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
        <span class="badge-v2 amber">XKPRODUCTION V2</span>
        <span class="text-meta-mono meta-geo">VIETNAM · MUSIC / SOUND / LIVE · EST. 2019</span>
        <div class="studio-live-indicator">
          <span class="pulse-dot"></span>
          <span class="text-meta-mono">STUDIO RUNNING</span>
        </div>
      </div>

      <!-- MASSIVE SINGLE STATEMENT HEADLINE -->
      <div class="hero-title-block">
        <h1 class="hero-manifesto-title">
          FROM IDEA<br />
          <span class="hero-highlight">TO FINAL WORK.</span>
        </h1>
        <p class="hero-manifesto-desc">
          Chúng tôi không chỉ là phòng thu âm địa phương. XKProduction là Creative Production House đồng hành cùng nghệ sĩ, nhà sáng tạo và thương hiệu: định hình bản phối độc bản, vocal coaching chân phương và kỹ nghệ âm học chuẩn quốc tế.
        </p>
      </div>

      <!-- HERO ACTIONS & METRICS ROW -->
      <div class="hero-action-split">
        <div class="hero-primary-ctas">
          <NuxtLink to="/work" class="btn-hero-primary">
            <span>EXPLORE WORK</span>
            <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>

          <NuxtLink to="/start-a-project" class="btn-hero-secondary">
            <span>START A PROJECT</span>
          </NuxtLink>

          <button type="button" class="btn-hero-play-demo" @click="handlePlayDemo">
            <span class="play-icon-box"><i class="fa-solid fa-play"></i></span>
            <span class="play-label">Nghe Studio Demo</span>
          </button>
        </div>

        <!-- REFINED MINIMAL CREDITS -->
        <div class="hero-proof-strip">
          <div class="proof-item">
            <strong class="proof-val">2,000+</strong>
            <span class="proof-lbl text-meta-mono">Dự Án Hoàn Tất</span>
          </div>
          <div class="proof-divider"></div>
          <div class="proof-item">
            <strong class="proof-val">7+ Năm</strong>
            <span class="proof-lbl text-meta-mono">Kinh Nghiệm</span>
          </div>
          <div class="proof-divider"></div>
          <div class="proof-item">
            <strong class="proof-val">Spotify</strong>
            <span class="proof-lbl text-meta-mono">-14 LUFS Standard</span>
          </div>
        </div>
      </div>

      <!-- CINEMATIC STUDIO VISUAL ANCHOR -->
      <div class="hero-visual-anchor matte-card">
        <div class="visual-inner">
          <img
            src="/images/hero_studio_cinematic.png"
            alt="Phòng thu âm chuyên nghiệp XKProduction Bình Phước"
            class="hero-anchor-img"
            width="1440"
            height="680"
            fetchpriority="high"
          />
          <div class="visual-scrim-gradient"></div>
          
          <div class="visual-caption">
            <span class="text-meta-mono">CONTROL ROOM · NGHĨA TRUNG, BÙ ĐĂNG, BÌNH PHƯỚC</span>
            <span class="caption-title">Nơi biến những ý niệm sơ khởi thành giai điệu chạm đến trái tim thính giả</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { playTrack } = useStudioAudio()

function handlePlayDemo() {
  playTrack(0)
}
</script>

<style scoped>
.xk-hero-cinematic {
  position: relative;
  padding-top: clamp(7.5rem, 14vw, 11rem);
  padding-bottom: 5rem;
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
  background: radial-gradient(circle at 50% 10%, rgba(217, 119, 6, 0.08), transparent 60%);
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
  padding-bottom: 1.75rem;
  border-bottom: 1px solid var(--border-subtle);
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.meta-geo {
  color: var(--text-secondary);
}

.studio-live-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0d9488;
  box-shadow: 0 0 10px rgba(13, 148, 136, 0.8);
  animation: pulse-glow 2s infinite ease-in-out;
}

@keyframes pulse-glow {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.6; }
}

/* MANIFESTO TITLE */
.hero-title-block {
  margin-bottom: 3rem;
}

.hero-manifesto-title {
  font-size: clamp(3.2rem, 7.5vw, 7.8rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 0.96;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.hero-highlight {
  background: linear-gradient(135deg, #f3f4f6 30%, #d97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-manifesto-desc {
  font-size: clamp(1.05rem, 1.8vw, 1.35rem);
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 840px;
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
  gap: 0.6rem;
  padding: 0.95rem 1.85rem;
  background: var(--text-primary);
  color: var(--bg-canvas);
  font-weight: 800;
  font-size: 0.875rem;
  letter-spacing: 0.08em;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-hero-primary:hover {
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.25);
}

.btn-hero-secondary {
  display: inline-flex;
  align-items: center;
  padding: 0.95rem 1.85rem;
  background: transparent;
  color: var(--text-primary);
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.08em;
  border-radius: 6px;
  border: 1px solid var(--border-subtle);
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-hero-secondary:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--border-hover);
}

.btn-hero-play-demo {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  padding: 0.5rem 0.75rem;
  transition: color 0.15s ease;
}

.btn-hero-play-demo:hover .play-icon-box {
  background: #fbbf24;
  color: var(--bg-canvas);
  transform: scale(1.08);
}

.play-icon-box {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(217, 119, 6, 0.15);
  border: 1px solid rgba(217, 119, 6, 0.35);
  color: #fbbf24;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8125rem;
  transition: all 0.2s ease;
}

.play-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
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
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--text-primary);
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

/* VISUAL ANCHOR */
.hero-visual-anchor {
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.7);
}

.visual-inner {
  position: relative;
  aspect-ratio: 21 / 9;
  width: 100%;
  background: #090b10;
}

.hero-anchor-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.visual-scrim-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(7, 8, 10, 0.95) 100%);
}

.visual-caption {
  position: absolute;
  bottom: 1.75rem;
  left: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.caption-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
}

@media (max-width: 900px) {
  .visual-inner {
    aspect-ratio: 16 / 9;
  }
  .visual-caption {
    left: 1.25rem;
    right: 1.25rem;
    bottom: 1.25rem;
  }
}
</style>
