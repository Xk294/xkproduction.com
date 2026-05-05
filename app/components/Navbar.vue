<template>
  <!-- Scroll Progress Bar -->
  <div class="scroll-progress" :style="{ width: scrollProgress + '%' }" aria-hidden="true"></div>

  <nav class="navbar" :class="{ scrolled: isScrolled }" role="navigation" aria-label="Điều hướng chính XKProduction">
    <div class="nav-container">
      <!-- LEFT: Quảng bá -->
      <ul class="nav-group nav-left" role="list">
        <li>
          <NuxtLink to="/services" class="nav-link" title="Dịch vụ & Bảng giá Thu âm XKProduction" :aria-current="$route.path === '/services' ? 'page' : undefined">
            <span class="nav-icon"><i class="fa-solid fa-microphone-lines"></i></span>
            <span class="nav-text">Dịch vụ</span>
            <span class="nav-indicator" aria-hidden="true"></span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/products" class="nav-link" title="Tác phẩm nổi bật của XKProduction" :aria-current="$route.path === '/products' ? 'page' : undefined">
            <span class="nav-icon"><i class="fa-solid fa-compact-disc"></i></span>
            <span class="nav-text">Sản phẩm</span>
            <span class="nav-indicator" aria-hidden="true"></span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/live-band" class="nav-link" title="Cho thuê Âm thanh Ánh sáng & Sân khấu" :aria-current="$route.path === '/live-band' ? 'page' : undefined">
            <span class="nav-icon"><i class="fa-solid fa-guitar"></i></span>
            <span class="nav-text">Live Band</span>
            <span class="nav-indicator" aria-hidden="true"></span>
          </NuxtLink>
        </li>
      </ul>

      <!-- CENTER: Logo -->
      <NuxtLink to="/" class="logo" title="XKProduction - Phòng Thu Âm Chuyên Nghiệp" aria-label="XKProduction trang chủ">
        <img src="/images/xk-logo-new.jpg" alt="XKProduction Logo" class="logo-img" />
        <span class="logo-text">XKProduction</span>
      </NuxtLink>

      <!-- RIGHT: Liên hệ / Info -->
      <ul class="nav-group nav-right" role="list">
        <li>
          <NuxtLink to="/blog" class="nav-link" title="Blog Kiến Thức Âm Nhạc" :aria-current="$route.path === '/blog' ? 'page' : undefined">
            <span class="nav-icon"><i class="fa-solid fa-blog"></i></span>
            <span class="nav-text">Blog</span>
            <span class="nav-indicator" aria-hidden="true"></span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/courses" class="nav-link" title="Khoá học Music Producer & Mixing Mastering" :aria-current="$route.path === '/courses' ? 'page' : undefined">
            <span class="nav-icon"><i class="fa-solid fa-graduation-cap"></i></span>
            <span class="nav-text">Khóa Học</span>
            <span class="nav-indicator" aria-hidden="true"></span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about" class="nav-link" title="Giới thiệu về XKProduction" :aria-current="$route.path === '/about' ? 'page' : undefined">
            <span class="nav-icon"><i class="fa-solid fa-circle-info"></i></span>
            <span class="nav-text">Giới Thiệu</span>
            <span class="nav-indicator" aria-hidden="true"></span>
          </NuxtLink>
        </li>
        <li class="nav-separator" aria-hidden="true"></li>
        <li>
          <NuxtLink to="/contact" class="nav-link nav-cta" title="Liên hệ đặt lịch thu âm XKProduction" :aria-current="$route.path === '/contact' ? 'page' : undefined">
            <span class="nav-icon"><i class="fa-solid fa-phone"></i></span>
            <span class="nav-text">Đặt Lịch Ngay</span>
            <span class="nav-pulse" aria-hidden="true"></span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { isScrolled } = useStickyHeader()

// Scroll progress
const scrollProgress = ref(0)
onMounted(() => {
  const update = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    scrollProgress.value = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)
  }
  window.addEventListener('scroll', update, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', update))
})
</script>

<style scoped>
/* ===========================================
   SCROLL PROGRESS BAR
   =========================================== */
.scroll-progress {
  position: fixed;
  top: 0; left: 0;
  height: 3px;
  background: linear-gradient(90deg, #1a8cff, #00e5c0, #8b5cf6);
  background-size: 200% 100%;
  z-index: 1001;
  transition: width 0.1s linear;
  border-radius: 0 3px 3px 0;
  box-shadow: 0 0 12px rgba(26,140,255,0.8), 0 0 24px rgba(0,229,192,0.4);
  animation: progressGlow 2s ease-in-out infinite;
}
@keyframes progressGlow {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}

/* ===========================================
   NAVBAR — Premium Glassmorphism
   =========================================== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(6, 8, 15, 0.72);
  backdrop-filter: blur(28px) saturate(1.8);
  -webkit-backdrop-filter: blur(28px) saturate(1.8);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  transition: background 0.4s cubic-bezier(0.23,1,0.32,1),
              box-shadow 0.4s cubic-bezier(0.23,1,0.32,1),
              border-color 0.4s ease;
  padding: 0 1.5rem;
}
/* Subtle top-edge glow line */
.navbar::before {
  content: '';
  position: absolute;
  top: 0; left: 10%; right: 10%;
  height: 1px;
  background: linear-gradient(90deg,
    transparent,
    rgba(26,140,255,0.35),
    rgba(0,229,192,0.25),
    rgba(26,140,255,0.35),
    transparent
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.navbar.scrolled::before { opacity: 1; }

.navbar.scrolled {
  background: rgba(4, 6, 12, 0.95);
  box-shadow:
    0 4px 40px rgba(0, 0, 0, 0.65),
    0 1px 0 rgba(26, 140, 255, 0.12),
    inset 0 -1px 0 rgba(26, 140, 255, 0.06);
  border-bottom-color: rgba(26, 140, 255, 0.14);
}

/* --- CONTAINER: 3-column grid --- */
.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 64px;
}

/* --- NAV GROUPS (left / right) --- */
.nav-group {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-left  { justify-self: start; }
.nav-right { justify-self: end; }

/* --- LOGO (center) --- */
.logo {
  justify-self: center;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.4rem;
  background: linear-gradient(135deg, #ffffff 0%, #5bbfff 55%, #00e5c0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.5px;
  white-space: nowrap;
  transition: filter 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
  filter: drop-shadow(0 0 8px rgba(26,140,255,0.2));
}
.logo:hover {
  filter: drop-shadow(0 0 20px rgba(26,140,255,0.55)) brightness(1.1);
  transform: scale(1.04);
}
.logo-img {
  width: 38px;
  height: 38px;
  object-fit: cover;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1.5px solid rgba(26,140,255,0.25);
  filter: drop-shadow(0 0 8px rgba(26,140,255,0.55));
  transition: filter 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.35s;
}
.logo:hover .logo-img {
  filter: drop-shadow(0 0 18px rgba(26,140,255,0.95));
  transform: scale(1.1) rotate(-5deg);
  border-color: rgba(26,140,255,0.65);
}

/* --- NAV LINKS --- */
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: rgba(180, 200, 230, 0.85);
  text-decoration: none;
  font-size: 0.84rem;
  font-weight: 500;
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  transition: color 0.3s ease,
              background 0.3s ease,
              transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
              box-shadow 0.3s ease;
  white-space: nowrap;
  position: relative;
  letter-spacing: 0.2px;
}
.nav-link:hover {
  color: #ffffff;
  background: rgba(26, 140, 255, 0.1);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(26,140,255,0.12);
}
.nav-link.router-link-active {
  color: #5bbfff;
  background: rgba(26, 140, 255, 0.1);
}

/* Active underline indicator — glow version */
.nav-indicator {
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: calc(100% - 1.2rem);
  height: 2px;
  background: linear-gradient(90deg, #1a8cff, #00e5c0);
  border-radius: 2px;
  transition: transform 0.32s cubic-bezier(0.34,1.56,0.64,1);
  transform-origin: center;
  box-shadow: 0 0 8px rgba(26,140,255,0.7), 0 0 16px rgba(0,229,192,0.35);
}
.nav-link.router-link-active .nav-indicator,
.nav-link:hover .nav-indicator {
  transform: translateX(-50%) scaleX(1);
}

.nav-icon {
  font-size: 0.92rem;
  line-height: 1;
  flex-shrink: 0;
  transition: color 0.3s ease;
}
.nav-link.router-link-active .nav-icon,
.nav-link:hover .nav-icon {
  color: #5bbfff;
  filter: drop-shadow(0 0 6px rgba(26,140,255,0.6));
}
.nav-text { line-height: 1; }

/* --- CTA (Đặt Lịch Ngay) — Premium button --- */
.nav-separator {
  width: 1px;
  height: 24px;
  background: linear-gradient(180deg, transparent, rgba(26,140,255,0.3), transparent);
  margin: 0 0.3rem;
  border-radius: 1px;
}

.nav-cta {
  background: linear-gradient(135deg, rgba(26,140,255,0.22) 0%, rgba(0,229,192,0.12) 100%);
  border: 1.5px solid rgba(26, 140, 255, 0.45);
  font-weight: 700;
  color: #5bbfff;
  transition: all 0.32s cubic-bezier(0.23,1,0.32,1);
  box-shadow: 0 0 0 rgba(26,140,255,0), inset 0 0 0 rgba(26,140,255,0);
  animation: ctaNavPulse 3s ease-in-out infinite;
  position: relative;
  padding: 0.55rem 1rem;
}

.nav-pulse {
  position: absolute;
  top: 50%;
  right: 8px;
  width: 8px;
  height: 8px;
  background: #00e5c0;
  border-radius: 50%;
  transform: translateY(-50%);
  box-shadow: 0 0 0 rgba(0,229,192,0.6);
  animation: navPulseAnim 2s ease-in-out infinite;
}
@keyframes navPulseAnim {
  0% { box-shadow: 0 0 0 0 rgba(0,229,192,0.8); }
  70% { box-shadow: 0 0 0 10px rgba(0,229,192,0); }
  100% { box-shadow: 0 0 0 0 rgba(0,229,192,0); }
}

@keyframes ctaNavPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(26,140,255,0), inset 0 0 0 rgba(26,140,255,0); }
  50%       { box-shadow: 0 0 16px rgba(26,140,255,0.25), inset 0 0 12px rgba(26,140,255,0.08); }
}
.nav-cta:hover {
  background: linear-gradient(135deg, #1a8cff 0%, #00d4aa 100%);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 0 32px rgba(26,140,255,0.6), 0 6px 20px rgba(0,0,0,0.4);
  transform: translateY(-3px);
  animation: none;
}
.nav-cta:hover .nav-pulse {
  animation: none;
  box-shadow: 0 0 12px rgba(0,229,192,0.8);
}

/* ===========================================
   RWD: ≤ 600px — Icon only, hide text
   =========================================== */
@media (max-width: 600px) {
  .navbar { padding: 0 0.5rem; }
  .nav-container { height: 54px; }
  .nav-group { gap: 0; }
  .nav-text, .logo-text { display: none; }
  .nav-link { padding: 0.45rem 0.55rem; }
  .nav-icon { font-size: 1.05rem; }
  .logo { font-size: 1.5rem; gap: 0; }
  .logo-img { width: 32px; height: 32px; }
  .nav-cta {
    border: 1px solid rgba(26,140,255,0.3);
    background: rgba(26,140,255,0.12);
    animation: none;
  }
  .nav-cta:hover {
    background: rgba(26,140,255,0.25);
    color: #5bbfff;
    box-shadow: none;
    transform: none;
  }
  .nav-indicator { display: none; }
}
</style>
