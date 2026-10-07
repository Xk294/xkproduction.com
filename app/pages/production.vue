<template>
  <div class="production-process-page">
    <div class="editorial-container">
      <!-- HEADER -->
      <div class="page-header">
        <span class="badge-v2 amber">QUY TRÌNH LÀM VIỆC</span>
        <h1 class="process-title">Quy Trình Sản Xuất Tác Phẩm</h1>
        <p class="process-subtitle">
          Hành trình 8 giai đoạn từ giai điệu mộc sơ khởi đến bản master hoàn chỉnh đạt chuẩn streaming, đồng hành cùng nghệ sĩ trong từng bước sáng tạo.
        </p>
      </div>

      <!-- INTERACTIVE MAP INTEGRATION -->
      <section class="process-map-section">
        <XKProductionMap />
      </section>

      <!-- HARDWARE & ACOUSTIC ENVIRONMENT BLOCK -->
      <section class="gear-standards-section">
        <div class="gear-card matte-card">
          <span class="badge-v2 teal">TRANG THIẾT BỊ &amp; KHÔNG GIAN ÂM HỌC</span>
          <h2 class="gear-title">Không Gian Âm Học &amp; Chuỗi Thiết Bị Tinh Tuyển</h2>
          <p class="gear-desc">
            Không gian âm học được xử lý tối ưu, kết hợp cùng chuỗi thiết bị analog và digital chọn lọc giúp tái hiện trọn vẹn sự tinh tế của nhạc cụ và độ ấm áp của giọng hát.
          </p>

          <div class="gear-specs-grid">
            <div class="spec-item">
              <span class="text-meta-mono spec-label">BÀN CONSOLE SÂN KHẤU</span>
              <strong>Midas M32R Digital Console</strong>
              <p>Hệ thống xử lý âm thanh kỹ thuật số cho chất âm ấm áp, rõ nét và chống hú rít hiệu quả.</p>
            </div>
            <div class="spec-item">
              <span class="text-meta-mono spec-label">MICROPHONE THU ÂM</span>
              <strong>Micro Condenser Độ Nhạy Cao</strong>
              <p>Thu trọn từng sắc thái biểu cảm, bắt trọn chất giọng tự nhiên và mộc mạc của bạn.</p>
            </div>
            <div class="spec-item">
              <span class="text-meta-mono spec-label">PHẦN MỀM & HẬU KỲ</span>
              <strong>Logic Pro &amp; Melodyne</strong>
              <p>Hiệu chỉnh cao độ và nhịp phách tinh tế bằng tay, bảo toàn màu giọng tự nhiên và cảm xúc gốc.</p>
            </div>
            <div class="spec-item">
              <span class="text-meta-mono spec-label">ÂM LƯỢNG CHUẨN PHÁT HÀNH</span>
              <strong>Âm Học Đạt Chuẩn Streaming</strong>
              <p>Kiểm soát dải động (Dynamic Range) tối ưu, âm sắc cân bằng và sắc nét trên mọi hệ thống loa và tai nghe.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- BOTTOM CTA -->
      <div class="process-cta matte-card text-center">
        <span class="badge-v2 amber">SẴN SÀNG BẮT ĐẦU</span>
        <h2 class="cta-title">Khởi Động Tác Phẩm Cùng XKProduction</h2>
        <p class="cta-desc">Hãy chia sẻ bản thu mộc hoặc ý tưởng bạn đang ấp ủ để nhận tư vấn trực tiếp từ Producer.</p>
        <div class="cta-buttons">
          <NuxtLink to="/start-a-project" class="btn-start">GỬI YÊU CẦU DỰ ÁN</NuxtLink>
          <NuxtLink to="/build-project" class="btn-build">DỰ TOÁN CHI PHÍ</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Production Process — Quy Trình Sản Xuất 8 Bước | XKProduction',
  description: 'Khám phá quy trình sản xuất âm nhạc từ bản demo voice memo đến đĩa master phát hành chuẩn Spotify tại XKProduction.',
  ogTitle: 'The Production Process — XKProduction',
  ogDescription: 'Quy trình sản xuất âm nhạc 8 bước chuẩn mực: Idea -> Direction -> Production -> Recording -> Editing -> Mix -> Master -> Release.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Quy Trình Sản Xuất Âm Nhạc 8 Bước - XKProduction',
  ogUrl: 'https://xkproduction.com/production',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
})

useSchemaOrg([
  defineWebPage({
    name: 'Quy Trình Sản Xuất Âm Nhạc 8 Bước - XKProduction',
    description: 'Quy trình sản xuất âm nhạc 8 bước bài bản từ ý tưởng demo đến master phát hành tại XKProduction.'
  })
])
</script>

<style scoped>
.production-process-page {
  padding-top: clamp(7.5rem, 14vw, 11rem);
  padding-bottom: 6rem;
  background-color: var(--bg-canvas);
  color: var(--text-primary);
  min-height: 100vh;
}

.page-header {
  margin-bottom: 3.5rem;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 2.5rem;
}

.process-title {
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  line-height: 1.05;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.process-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 760px;
  line-height: 1.65;
}

.process-map-section {
  margin-bottom: 5rem;
}

.gear-standards-section {
  margin-bottom: 4rem;
}

.gear-card {
  padding: clamp(2rem, 5vw, 4rem);
}

.gear-title {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-top: 0.75rem;
  margin-bottom: 1rem;
}

.gear-desc {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  max-width: 800px;
  line-height: 1.65;
  margin-bottom: 3rem;
}

.gear-specs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
}

.spec-label {
  font-size: 0.6875rem;
  color: #fbbf24;
}

.spec-item strong {
  font-size: 1.125rem;
  color: var(--text-primary);
}

.spec-item p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.55;
}

.process-cta {
  padding: 4rem 2rem;
  background: radial-gradient(circle at 50% 0%, rgba(217, 119, 6, 0.12), transparent 70%), #0f1115;
}

.cta-title {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-top: 1rem;
  margin-bottom: 0.75rem;
}

.cta-desc {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 2rem;
}

.cta-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.btn-start {
  padding: 0.95rem 2rem;
  background: var(--text-primary);
  color: var(--bg-canvas);
  font-weight: 800;
  font-size: 0.875rem;
  border-radius: 6px;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;
}

.btn-start:hover {
  background: #ffffff;
  transform: translateY(-2px);
}

.btn-build {
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

.btn-build:hover {
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .gear-specs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
