<template>
  <header
    class="xk-header"
    :class="{ 'is-scrolled': isScrolled, 'is-mobile-menu-open': mobileOpen }"
    role="banner"
  >
    <div class="editorial-container header-inner">
      <!-- BRAND & LOCALE SWITCHER (IMAGE 3) -->
      <div class="brand-group">
        <NuxtLink to="/" class="brand-logo" :aria-label="isVi ? 'XKProduction Trang Chủ' : 'XKProduction Home'">
          <img
            src="/images/logo-xkproduction.png"
            alt="XKProduction Logo"
            class="logo-img"
            width="40"
            height="40"
          />
          <div class="brand-titles">
            <span class="brand-name">XKPRODUCTION</span>
            <span class="brand-sub text-meta-mono">{{ isVi ? 'PHÒNG THU & SẢN XUẤT ÂM NHẠC' : 'CREATIVE PRODUCTION HOUSE' }}</span>
          </div>
        </NuxtLink>

        <!-- IMAGE 3 LANGUAGE TOGGLE PILL -->
        <div class="locale-pill-widget" :title="isVi ? 'Chuyển sang Tiếng Anh' : 'Switch to Vietnamese'">
          <span class="version-label">v0.35.6</span>
          <button
            type="button"
            class="locale-pill-switch"
            :class="{ 'is-en': isEn }"
            @click="toggleLocale"
            :aria-label="isVi ? 'Chuyển sang Tiếng Anh' : 'Switch to Vietnamese'"
          >
            <span class="switch-option opt-vi" :class="{ 'active': isVi }">VI</span>
            <span class="switch-option opt-en" :class="{ 'active': isEn }">EN</span>
            <span class="switch-slider" :class="{ 'to-en': isEn }"></span>
          </button>
        </div>
      </div>

      <!-- DESKTOP NAVIGATION -->
      <nav class="desktop-nav" role="navigation" :aria-label="isVi ? 'Thanh điều hướng chính' : 'Main Navigation'">
        <!-- WORK WITH FLYOUT -->
        <div class="nav-item-dropdown" @mouseenter="hoverFlyout = 'work'" @mouseleave="hoverFlyout = null">
          <NuxtLink to="/work" class="nav-link" :class="{ 'is-active': route.path.startsWith('/work') }">
            <span>{{ isVi ? 'TÁC PHẨM' : 'WORK' }}</span>
            <i class="fa-solid fa-chevron-down nav-chevron"></i>
          </NuxtLink>

          <!-- WORK FLYOUT PREVIEW -->
          <Transition name="flyout-fade">
            <div v-if="hoverFlyout === 'work'" class="nav-flyout-panel matte-card">
              <div class="flyout-header">
                <span class="text-meta-mono">{{ isVi ? 'TÁC PHẨM NỔI BẬT' : 'FEATURED WORK' }}</span>
                <NuxtLink to="/work" class="flyout-all-link">{{ isVi ? 'Xem tất cả' : 'View all' }} <i class="fa-solid fa-arrow-right"></i></NuxtLink>
              </div>
              <div class="flyout-works-grid">
                <NuxtLink
                  v-for="p in featuredProjects.slice(0, 3)"
                  :key="p.slug"
                  :to="`/work/${p.slug}`"
                  class="flyout-work-card"
                  @click="hoverFlyout = null"
                >
                  <img :src="p.coverImage" :alt="p.title" class="flyout-thumb" />
                  <div class="flyout-card-body">
                    <strong class="flyout-card-title">{{ p.title }}</strong>
                    <span class="flyout-card-artist">{{ p.artist }}</span>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>

        <!-- SERVICES WITH FLYOUT -->
        <div class="nav-item-dropdown" @mouseenter="hoverFlyout = 'services'" @mouseleave="hoverFlyout = null">
          <NuxtLink to="/services" class="nav-link" :class="{ 'is-active': route.path.startsWith('/services') }">
            <span>{{ isVi ? 'DỊCH VỤ' : 'SERVICES' }}</span>
            <i class="fa-solid fa-chevron-down nav-chevron"></i>
          </NuxtLink>

          <!-- SERVICES FLYOUT -->
          <Transition name="flyout-fade">
            <div v-if="hoverFlyout === 'services'" class="nav-flyout-panel services-flyout matte-card">
              <div class="flyout-header">
                <span class="text-meta-mono">{{ isVi ? '4 TRỤ CỘT NĂNG LỰC SẢN XUẤT' : '4 CORE PRODUCTION PILLARS' }}</span>
                <NuxtLink to="/services" class="flyout-all-link">{{ isVi ? 'Tổng quan dịch vụ' : 'All services' }} <i class="fa-solid fa-arrow-right"></i></NuxtLink>
              </div>
              <div class="flyout-services-grid">
                <NuxtLink
                  v-for="c in capabilities"
                  :key="c.slug"
                  :to="`/services/${c.slug}`"
                  class="flyout-service-card"
                  @click="hoverFlyout = null"
                >
                  <div class="service-card-icon"><i :class="c.icon"></i></div>
                  <div>
                    <strong class="service-card-title">{{ isVi ? c.viTitle || c.title : c.title }}</strong>
                    <p class="service-card-sub">{{ isVi ? c.subtitle : (c.enSubtitle || c.subtitle) }}</p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>

        <NuxtLink to="/production" class="nav-link" :class="{ 'is-active': route.path === '/production' }">
          <span>{{ isVi ? 'SẢN XUẤT' : 'PRODUCTION' }}</span>
        </NuxtLink>

        <NuxtLink to="/releases" class="nav-link" :class="{ 'is-active': route.path === '/releases' }">
          <span>{{ isVi ? 'PHÁT HÀNH' : 'RELEASES' }}</span>
        </NuxtLink>

        <NuxtLink to="/about" class="nav-link" :class="{ 'is-active': route.path === '/about' }">
          <span>{{ isVi ? 'GIỚI THIỆU' : 'ABOUT' }}</span>
        </NuxtLink>

        <NuxtLink to="/journal" class="nav-link" :class="{ 'is-active': route.path.startsWith('/journal') }">
          <span>{{ isVi ? 'BÀI VIẾT' : 'JOURNAL' }}</span>
        </NuxtLink>
      </nav>

      <!-- RIGHT ACTIONS -->
      <div class="header-actions">
        <NuxtLink to="/build-project" class="btn-builder-link" :title="isVi ? 'Hoạch định dự án trực quan' : 'Interactive Project Builder'">
          <i class="fa-solid fa-sliders"></i>
          <span>{{ isVi ? 'Dự Toán Chi Phí' : 'Build Project' }}</span>
        </NuxtLink>

        <NuxtLink to="/start-a-project" class="btn-start-project">
          <span>{{ isVi ? 'BẮT ĐẦU DỰ ÁN' : 'START A PROJECT' }}</span>
          <i class="fa-solid fa-arrow-right"></i>
        </NuxtLink>

        <!-- MOBILE MENU TOGGLE BUTTON -->
        <button
          type="button"
          class="mobile-toggle-btn"
          @click="mobileOpen = !mobileOpen"
          :aria-expanded="mobileOpen"
          :aria-label="isVi ? 'Mở bảng điều hướng' : 'Open navigation'"
        >
          <i :class="mobileOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered'"></i>
        </button>
      </div>
    </div>

    <!-- MOBILE DRAWER MENU -->
    <Transition name="drawer-slide">
      <div v-if="mobileOpen" class="mobile-drawer" role="dialog" aria-modal="true">
        <div class="mobile-drawer-inner">
          <div class="mobile-nav-links">
            <NuxtLink to="/work" class="mobile-link" @click="mobileOpen = false">
              <span class="m-num">01</span>
              <span class="m-text">{{ isVi ? 'TÁC PHẨM' : 'WORK' }}</span>
            </NuxtLink>
            <NuxtLink to="/services" class="mobile-link" @click="mobileOpen = false">
              <span class="m-num">02</span>
              <span class="m-text">{{ isVi ? 'DỊCH VỤ' : 'SERVICES' }}</span>
            </NuxtLink>
            <NuxtLink to="/production" class="mobile-link" @click="mobileOpen = false">
              <span class="m-num">03</span>
              <span class="m-text">{{ isVi ? 'SẢN XUẤT' : 'PRODUCTION' }}</span>
            </NuxtLink>
            <NuxtLink to="/releases" class="mobile-link" @click="mobileOpen = false">
              <span class="m-num">04</span>
              <span class="m-text">{{ isVi ? 'PHÁT HÀNH' : 'RELEASES' }}</span>
            </NuxtLink>
            <NuxtLink to="/about" class="mobile-link" @click="mobileOpen = false">
              <span class="m-num">05</span>
              <span class="m-text">{{ isVi ? 'GIỚI THIỆU' : 'ABOUT' }}</span>
            </NuxtLink>
            <NuxtLink to="/journal" class="mobile-link" @click="mobileOpen = false">
              <span class="m-num">06</span>
              <span class="m-text">{{ isVi ? 'BÀI VIẾT' : 'JOURNAL' }}</span>
            </NuxtLink>
            <NuxtLink to="/build-project" class="mobile-link" @click="mobileOpen = false">
              <span class="m-num">07</span>
              <span class="m-text">{{ isVi ? 'DỰ TOÁN CHI PHÍ' : 'BUILD PROJECT' }}</span>
            </NuxtLink>
          </div>

          <div class="mobile-drawer-cta">
            <NuxtLink to="/start-a-project" class="btn-start-project btn-full" @click="mobileOpen = false">
              <span>{{ isVi ? 'BẮT ĐẦU DỰ ÁN' : 'START A PROJECT' }}</span>
              <i class="fa-solid fa-arrow-right"></i>
            </NuxtLink>

            <div class="mobile-contact-bar">
              <a href="tel:0355356294" class="m-contact-link">
                <i class="fa-solid fa-phone"></i> 0355.356.294
              </a>
              <a href="https://zalo.me/0355356294" target="_blank" rel="noopener noreferrer" class="m-contact-link">
                <i class="fa-solid fa-comment-dots"></i> Zalo Studio
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLocale } from '~/composables/useLocale'

const route = useRoute()
const { isVi, isEn, currentLocale, toggleLocale } = useLocale()
const { getFeaturedProjects, capabilities } = useProductionProjects()
const featuredProjects = getFeaturedProjects()

const isScrolled = ref(false)
const mobileOpen = ref(false)
const hoverFlyout = ref<string | null>(null)

function handleScroll() {
  if (!import.meta.client) return
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.xk-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 900;
  background: transparent;
  transition: background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
  border-bottom: 1px solid transparent;
}

.xk-header.is-scrolled {
  background-color: rgba(7, 8, 10, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-color: var(--border-subtle);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
}

/* BRAND LOGO & LOCALE */
.brand-group {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  text-decoration: none;
}

.logo-img {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: contain;
}

.brand-titles {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 1.0625rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  color: var(--text-primary);
}

.brand-sub {
  font-size: 0.625rem;
  color: var(--text-subtle);
}

/* IMAGE 3: LOCALE PILL WIDGET */
.locale-pill-widget {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.15rem;
  margin-left: 0.25rem;
}

.version-label {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.625rem;
  color: #64748b;
  letter-spacing: 0.05em;
  line-height: 1;
  padding-right: 0.35rem;
}

.locale-pill-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 66px;
  height: 30px;
  background: #0d111a;
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  border-radius: 9999px;
  padding: 2px;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  user-select: none;
}

.locale-pill-switch:hover {
  border-color: rgba(0, 210, 255, 0.5);
  box-shadow: 0 0 12px rgba(0, 210, 255, 0.2);
}

.switch-option {
  position: relative;
  z-index: 2;
  flex: 1;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: #00d2ff;
  transition: color 0.25s ease;
  line-height: 24px;
}

.switch-option.active {
  color: #06080f;
  font-weight: 900;
}

.switch-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 28px;
  height: 24px;
  border-radius: 9999px;
  background: linear-gradient(135deg, #00d2ff 0%, #3a86ff 60%, #8338ec 100%);
  box-shadow: 0 0 10px rgba(0, 210, 255, 0.45);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
}

.switch-slider.to-en {
  transform: translateX(32px);
}

/* DESKTOP NAV */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}

.nav-link {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0;
  transition: color 0.15s ease;
  position: relative;
}

.nav-link:hover,
.nav-link.is-active {
  color: var(--text-primary);
}

.nav-chevron {
  font-size: 0.625rem;
  opacity: 0.6;
  transition: transform 0.2s ease;
}

.nav-item-dropdown {
  position: relative;
}

.nav-item-dropdown:hover .nav-chevron {
  transform: rotate(180deg);
}

/* FLYOUT PANELS */
.nav-flyout-panel {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 480px;
  background: var(--bg-surface-1);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8);
  margin-top: 0.5rem;
}

.nav-flyout-panel.services-flyout {
  width: 540px;
}

.flyout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-subtle);
}

.flyout-all-link {
  font-size: 0.75rem;
  font-weight: 700;
  color: #fbbf24;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.flyout-works-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.flyout-work-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-decoration: none;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.flyout-work-card:hover {
  transform: translateY(-3px);
}

.flyout-thumb {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid var(--border-subtle);
}

.flyout-card-title {
  font-size: 0.8125rem;
  color: var(--text-primary);
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.flyout-card-artist {
  font-size: 0.6875rem;
  color: var(--text-subtle);
}

.flyout-services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
}

.flyout-service-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-subtle);
  text-decoration: none;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.flyout-service-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(217, 119, 6, 0.4);
}

.service-card-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: rgba(217, 119, 6, 0.12);
  color: #fbbf24;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.service-card-title {
  font-size: 0.8125rem;
  color: var(--text-primary);
  display: block;
}

.service-card-sub {
  font-size: 0.6875rem;
  color: var(--text-secondary);
  line-height: 1.35;
}

/* HEADER ACTIONS */
.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-builder-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-secondary);
  padding: 0.5rem 0.85rem;
  border-radius: 6px;
  border: 1px solid var(--border-subtle);
  text-decoration: none;
  transition: all 0.15s ease;
}

.btn-builder-link:hover {
  color: var(--text-primary);
  border-color: var(--border-hover);
  background: rgba(255, 255, 255, 0.04);
}

.btn-start-project {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.25rem;
  background: var(--text-primary);
  color: var(--bg-canvas);
  font-size: 0.8125rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  border-radius: 6px;
  text-decoration: none;
  transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
}

.btn-start-project:hover {
  background: #ffffff;
  transform: scale(1.02);
  box-shadow: 0 0 16px rgba(255, 255, 255, 0.25);
}

.btn-start-project.btn-full {
  width: 100%;
  justify-content: center;
  padding: 0.85rem;
}

.mobile-toggle-btn {
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.35rem;
  cursor: pointer;
  padding: 0.5rem;
}

/* MOBILE DRAWER */
.mobile-drawer {
  position: fixed;
  inset: 76px 0 0 0;
  background: var(--bg-canvas);
  z-index: 890;
  overflow-y: auto;
  border-top: 1px solid var(--border-subtle);
}

.mobile-drawer-inner {
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mobile-link {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-subtle);
  text-decoration: none;
}

.m-num {
  font-family: ui-monospace, monospace;
  font-size: 0.75rem;
  color: #fbbf24;
}

.m-text {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--text-primary);
}

.mobile-drawer-cta {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 1rem;
}

.mobile-contact-bar {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.m-contact-link {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--bg-surface-1);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  color: var(--text-secondary);
  font-size: 0.8125rem;
  text-decoration: none;
}

/* FLYOUT TRANSITION */
.flyout-fade-enter-active,
.flyout-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.flyout-fade-enter-from,
.flyout-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 8px);
}

@media (max-width: 1024px) {
  .desktop-nav {
    display: none;
  }
  .btn-builder-link {
    display: none;
  }
  .mobile-toggle-btn {
    display: block;
  }
}

@media (max-width: 480px) {
  .btn-start-project {
    display: none;
  }
}
</style>
