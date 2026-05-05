<template>
  <div class="not-found-page">
    <!-- Animated background particles -->
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>

    <div class="content-wrap">
      <!-- Big 404 -->
      <div class="error-code" aria-hidden="true">
        <span class="digit">4</span>
        <span class="digit-icon"><i class="fa-solid fa-music"></i></span>
        <span class="digit">4</span>
      </div>

      <h1>Trang không tồn tại</h1>
      <p class="sub">Có vẻ bạn đang tìm kiếm một nốt nhạc chưa được ghi âm.<br/>Hãy quay lại và khám phá XKProduction nhé!</p>

      <!-- Quick nav -->
      <div class="quick-links">
        <NuxtLink to="/" class="link-card primary">
          <i class="fa-solid fa-house"></i>
          <span>Trang chủ</span>
        </NuxtLink>
        <NuxtLink to="/services" class="link-card">
          <i class="fa-solid fa-microphone"></i>
          <span>Dịch vụ</span>
        </NuxtLink>
        <NuxtLink to="/products" class="link-card">
          <i class="fa-solid fa-compact-disc"></i>
          <span>Sản phẩm</span>
        </NuxtLink>
        <NuxtLink to="/contact" class="link-card">
          <i class="fa-solid fa-paper-plane"></i>
          <span>Liên hệ</span>
        </NuxtLink>
      </div>

      <a href="https://zalo.me/0355356294" target="_blank" rel="noopener" class="zalo-cta">
        <i class="fa-solid fa-headset"></i> Cần hỗ trợ ngay? Nhắn Zalo 0355.356.294
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '404 — Trang không tồn tại | XKProduction',
  description: 'Trang bạn tìm kiếm không tồn tại. Quay lại trang chủ XKProduction để khám phá dịch vụ thu âm, mix master và âm thanh ánh sáng.',
  robots: 'noindex, follow'
})
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem 4rem;
  position: relative;
  overflow: hidden;
  background: #06080f;
}

/* Animated background orbs */
.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: float 8s ease-in-out infinite;
  pointer-events: none;
}
.orb-1 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(26,140,255,0.12) 0%, transparent 70%);
  top: 10%; left: -10%;
  animation-delay: 0s;
}
.orb-2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%);
  bottom: 5%; right: -15%;
  animation-delay: 3s;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
}

.content-wrap {
  position: relative; z-index: 1;
  text-align: center;
  max-width: 680px;
}

/* Big 404 number */
.error-code {
  display: flex; align-items: center; justify-content: center;
  gap: 0.25rem; margin-bottom: 2rem;
}
.digit {
  font-size: clamp(5rem, 16vw, 10rem);
  font-weight: 900; line-height: 1;
  background: linear-gradient(135deg, rgba(230,237,243,0.9) 0%, rgba(26,140,255,0.7) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.digit-icon {
  font-size: clamp(4rem, 12vw, 7.5rem);
  line-height: 1;
  color: var(--primary);
  filter: drop-shadow(0 0 30px rgba(26,140,255,0.5));
  animation: pulse-icon 3s ease-in-out infinite;
}
@keyframes pulse-icon {
  0%, 100% { filter: drop-shadow(0 0 20px rgba(26,140,255,0.4)); }
  50% { filter: drop-shadow(0 0 50px rgba(26,140,255,0.8)); }
}

h1 {
  font-size: clamp(1.4rem, 4vw, 2.2rem);
  font-weight: 800; color: var(--text-main);
  margin-bottom: 1rem;
}
.sub {
  font-size: 1rem; color: var(--text-light);
  line-height: 1.8; margin-bottom: 2.5rem;
}

/* Quick links grid */
.quick-links {
  display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
  margin-bottom: 2rem;
}
.link-card {
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  padding: 1.2rem 1.5rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  color: var(--text-light); text-decoration: none; font-size: 0.85rem; font-weight: 600;
  transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
  min-width: 100px;
}
.link-card i { font-size: 1.4rem; }
.link-card:hover {
  background: rgba(26,140,255,0.1);
  border-color: rgba(26,140,255,0.3);
  color: var(--primary);
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.3);
}
.link-card.primary {
  background: rgba(26,140,255,0.12);
  border-color: rgba(26,140,255,0.25);
  color: var(--primary);
}
.link-card.primary:hover {
  background: rgba(26,140,255,0.22);
}

/* Zalo CTA */
.zalo-cta {
  display: inline-flex; align-items: center; gap: 0.6rem;
  padding: 0.75rem 1.75rem; border-radius: 30px;
  background: rgba(0,229,192,0.08);
  border: 1px solid rgba(0,229,192,0.2);
  color: #00e5c0; font-size: 0.88rem; font-weight: 600;
  text-decoration: none; transition: all 0.3s;
}
.zalo-cta:hover {
  background: rgba(0,229,192,0.15);
  border-color: rgba(0,229,192,0.4);
  transform: translateY(-2px);
}
</style>
