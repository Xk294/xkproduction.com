<template>
  <div class="production-process-page">
    <div class="editorial-container">
      <!-- HEADER -->
      <div class="page-header">
        <span class="badge-v2 amber">FLAGSHIP METHODOLOGY</span>
        <h1 class="process-title">THE PRODUCTION PROCESS</h1>
        <p class="process-subtitle">
          "From Idea To Final Work" — Hành trình 8 bước biến một ý niệm sơ khởi, một bản voice memo qua điện thoại thành tác phẩm âm nhạc chuẩn phát hành toàn cầu.
        </p>
      </div>

      <!-- INTERACTIVE MAP INTEGRATION -->
      <section class="process-map-section">
        <XKProductionMap />
      </section>

      <!-- HARDWARE & ACOUSTIC ENVIRONMENT BLOCK -->
      <section class="gear-standards-section">
        <div class="gear-card matte-card">
          <span class="badge-v2 teal">KỸ NGHỆ PHÒNG THU &amp; PHẦN CỨNG</span>
          <h2 class="gear-title">Không Gian Âm Học &amp; Trang Thiết Bị Chuẩn Mực</h2>
          <p class="gear-desc">
            Chất lượng âm thanh tại XKProduction được định hình bởi sự kết hợp giữa phòng thu xử lý âm học kỹ lưỡng (bass trap, diffuser) và hệ thống analog/digital hàng đầu thế giới.
          </p>

          <div class="gear-specs-grid">
            <div class="spec-item">
              <span class="text-meta-mono spec-label">BÀN CONSOLE SÂN KHẤU & FOH</span>
              <strong>Midas M32R Digital Console</strong>
              <p>Hệ thống tiền khuếch đại Midas Pro lừng danh thế giới cho âm thanh ấm áp và trong trẻo tuyệt đối.</p>
            </div>
            <div class="spec-item">
              <span class="text-meta-mono spec-label">MICROPHONE THU ÂM CHÍNH</span>
              <strong>Large Diaphragm Condenser</strong>
              <p>Thu trọn từng sắc thái biểu cảm, dải động rộng và độ nhạy tối đa cho vocal tự nhiên.</p>
            </div>
            <div class="spec-item">
              <span class="text-meta-mono spec-label">DAW & HẬU KỲ CHUYÊN SÂU</span>
              <strong>Logic Pro X &amp; Melodyne Studio</strong>
              <p>Môi trường xử lý âm thanh 32-bit float, nắn nót cao độ thủ công từng nốt phách.</p>
            </div>
            <div class="spec-item">
              <span class="text-meta-mono spec-label">CHUẨN ĐỘ LỚN PHÁT HÀNH SỐ</span>
              <strong>-14 LUFS Integrated Loudness</strong>
              <p>Tối ưu headroom phát hành Spotify, Apple Music và YouTube không bị méo tiếng.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- BOTTOM CTA -->
      <div class="process-cta matte-card text-center">
        <span class="badge-v2 amber">SẴN SÀNG BẮT ĐẦU</span>
        <h2 class="cta-title">Bắt Đầu Bước 01 Với Ý Niệm Của Bạn</h2>
        <p class="cta-desc">Đừng giữ ý tưởng trong ngăn kéo. Hãy để chúng tôi lắng nghe bản thu thô của bạn.</p>
        <div class="cta-buttons">
          <NuxtLink to="/start-a-project" class="btn-start">GỬI PROJECT BRIEF</NuxtLink>
          <NuxtLink to="/build-project" class="btn-build">BUILD YOUR PROJECT</NuxtLink>
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
  ogUrl: 'https://xkproduction.com/production'
})
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
