<template>
  <div class="releases-page">
    <div class="editorial-container">
      <!-- HEADER -->
      <div class="page-header">
        <span class="badge-v2 amber">PUBLIC DISCOGRAPHY</span>
        <h1 class="releases-title">RELEASES &amp; STREAMING</h1>
        <p class="releases-subtitle">
          Kho lưu trữ các đĩa nhạc, bản cover và tác phẩm phát hành thương mại do XKProduction thực hiện. Nghe trực tiếp trên Spotify, Apple Music và YouTube.
        </p>
      </div>

      <!-- RELEASE WALL -->
      <section class="releases-wall-section">
        <XKReleaseWall :releases="releases" />
      </section>

      <!-- STREAMING PLATFORMS CALLOUT -->
      <section class="streaming-hub-card matte-card text-center">
        <span class="badge-v2 teal">KẾT NỐI TOÀN CẦU</span>
        <h2 class="hub-title">Phát Hành Đa Nền Tảng Chuẩn Quốc Tế</h2>
        <p class="hub-desc">
          Mỗi tác phẩm sản xuất tại XKProduction đều được tư vấn phân phối toàn diện: đăng ký bản quyền số ISRC, mã vạch UPC và tiếp cận người nghe trên khắp các nền tảng streaming lớn nhất.
        </p>

        <div class="platforms-row">
          <div class="plat-badge"><i class="fa-brands fa-spotify"></i> Spotify</div>
          <div class="plat-badge"><i class="fa-brands fa-apple"></i> Apple Music</div>
          <div class="plat-badge"><i class="fa-brands fa-youtube"></i> YouTube Music</div>
          <div class="plat-badge"><i class="fa-brands fa-tiktok"></i> TikTok Sound</div>
        </div>

        <NuxtLink to="/start-a-project" class="btn-hub-start">
          <span>SẢN XUẤT ĐĨA ĐẦU TAY</span>
          <i class="fa-solid fa-arrow-right"></i>
        </NuxtLink>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const { releases } = useProductionProjects()

useSeoMeta({
  title: 'Releases — Kho Đĩa Nhạc & Phát Hành Số | XKProduction',
  description: 'Danh mục các tác phẩm âm nhạc do XKProduction sản xuất và phát hành trên Spotify, Apple Music, YouTube.',
  ogTitle: 'Releases & Discography | XKProduction',
  ogDescription: 'Kho tác phẩm âm nhạc phát hành số tại XKProduction.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogUrl: 'https://xkproduction.com/releases'
})
</script>

<style scoped>
.releases-page {
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

.releases-title {
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  line-height: 1.05;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.releases-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 760px;
  line-height: 1.65;
}

.releases-wall-section {
  margin-bottom: 5rem;
}

.streaming-hub-card {
  padding: 4rem 2rem;
  background: radial-gradient(circle at 50% 0%, rgba(13, 148, 136, 0.12), transparent 70%), #0f1115;
}

.hub-title {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-top: 1rem;
  margin-bottom: 0.75rem;
}

.hub-desc {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  max-width: 680px;
  margin: 0 auto 2rem;
  line-height: 1.65;
}

.platforms-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.plat-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-primary);
}

.btn-hub-start {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.95rem 2rem;
  background: var(--text-primary);
  color: var(--bg-canvas);
  font-weight: 800;
  font-size: 0.875rem;
  border-radius: 6px;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;
}

.btn-hub-start:hover {
  background: #ffffff;
  transform: translateY(-2px);
}
</style>
