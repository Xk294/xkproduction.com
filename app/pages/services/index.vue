<template>
  <div class="services-matrix-page">
    <div class="editorial-container">
      <!-- HEADER -->
      <div class="page-header">
        <span class="badge-v2 amber">CAPABILITIES MATRIX</span>
        <h1 class="services-title">SERVICES &amp; SOLUTIONS</h1>
        <p class="services-subtitle">
          Từ sáng tác hoà âm độc bản, mixing mastering chuẩn Spotify cho đến vận hành âm thanh sân khấu thực chiến. Chúng tôi giải quyết trọn vẹn mọi mắt xích trong chuỗi sản xuất âm nhạc.
        </p>
      </div>

      <!-- 4 CORE PILLARS MATRIX -->
      <XKCapabilityMatrix :capabilities="capabilities" />

      <!-- WHY WORK WITH US -->
      <section class="studio-standard-block matte-card">
        <span class="badge-v2 teal">TIÊU CHUẨN THỰC THI</span>
        <h2 class="standard-title">Cam Kết Chất Lượng Tại XKProduction</h2>
        <div class="standards-grid">
          <div class="standard-item">
            <i class="fa-solid fa-gem"></i>
            <strong>Không Dùng Template Đại Trà</strong>
            <p>Mỗi bản phối là một kiến trúc âm thanh độc bản được may đo theo đúng quãng giọng và phong cách của nghệ sĩ.</p>
          </div>
          <div class="standard-item">
            <i class="fa-solid fa-volume-high"></i>
            <strong>Chuẩn Phát Hành Quốc Tế</strong>
            <p>Đạt chuẩn âm lượng -14 LUFS, cân bằng không gian stereo 3D, không bị dìm âm lượng hay méo tiếng trên Spotify và Apple Music.</p>
          </div>
          <div class="standard-item">
            <i class="fa-solid fa-clock-rotate-left"></i>
            <strong>Đúng Tiến Độ Cam Kết</strong>
            <p>Quy trình làm việc minh bạch từ 5 đến 10 ngày, báo cáo tiến độ từng giai đoạn và không phát sinh bất kỳ chi phí ẩn.</p>
          </div>
        </div>
      </section>

      <!-- BOTTOM ACTION -->
      <div class="services-cta-banner matte-card text-center">
        <span class="badge-v2 amber">BUILD YOUR PROJECT</span>
        <h2 class="cta-banner-title">Hoạch Định Dự Án &amp; Dự Toán Chi Phí</h2>
        <p class="cta-banner-sub">
          Sử dụng công cụ cấu hình dự án thông minh để xác định quy mô, tiến độ và tài nguyên bạn đang có chỉ trong 2 phút.
        </p>
        <div class="cta-buttons">
          <NuxtLink to="/build-project" class="btn-builder-action">
            <i class="fa-solid fa-sliders"></i>
            <span>MỞ PROJECT BUILDER</span>
          </NuxtLink>
          <NuxtLink to="/start-a-project" class="btn-brief-action">
            <span>NỘP BRIEF DỰ ÁN TRỰC TIẾP</span>
            <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { capabilities } = useProductionProjects()

useSeoMeta({
  title: 'Services — 4 Trụ Cột Năng Lực Sản Xuất Âm Nhạc | XKProduction',
  description: 'Hoà âm phối khí, Mixing & Mastering chuẩn Spotify, Thu âm vocal phòng thu và Âm thanh biểu diễn Live Band tại XKProduction Bình Phước.',
  ogTitle: 'Services & Capabilities | XKProduction',
  ogDescription: '4 trụ cột năng lực sản xuất âm nhạc chuyên nghiệp tại XKProduction.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogUrl: 'https://xkproduction.com/services'
})
</script>

<style scoped>
.services-matrix-page {
  padding-top: clamp(7.5rem, 14vw, 11rem);
  padding-bottom: 6rem;
  background-color: var(--bg-canvas);
  color: var(--text-primary);
  min-height: 100vh;
}

.page-header {
  margin-bottom: 4rem;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 2.5rem;
}

.services-title {
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  line-height: 1.05;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.services-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 760px;
  line-height: 1.65;
}

.studio-standard-block {
  margin-top: 5rem;
  margin-bottom: 4rem;
  padding: clamp(2rem, 5vw, 4rem);
}

.standard-title {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-top: 0.75rem;
  margin-bottom: 2.5rem;
}

.standards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.standard-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.standard-item i {
  font-size: 1.5rem;
  color: #fbbf24;
}

.standard-item strong {
  font-size: 1.125rem;
  color: var(--text-primary);
}

.standard-item p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.services-cta-banner {
  padding: 4rem 2rem;
  background: radial-gradient(circle at 50% 0%, rgba(217, 119, 6, 0.12), transparent 70%), #0f1115;
}

.cta-banner-title {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 900;
  color: var(--text-primary);
  margin-top: 1rem;
  margin-bottom: 0.75rem;
}

.cta-banner-sub {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  max-width: 620px;
  margin: 0 auto 2rem;
  line-height: 1.6;
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
  padding: 0.95rem 1.85rem;
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
}

.btn-brief-action {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
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

.btn-brief-action:hover {
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 900px) {
  .standards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
