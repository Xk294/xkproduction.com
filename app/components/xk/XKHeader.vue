<template>
  <header
    class="xk-header"
    :class="{ 'is-scrolled': isScrolled, 'is-mobile-menu-open': mobileOpen || isDrawerLeaving }"
    role="banner"
  >
    <div class="editorial-container header-inner">
      <!-- BRAND & LOCALE SWITCHER (IMAGE 3) -->
      <div class="brand-group">
        <NuxtLink to="/" class="brand-logo" :aria-label="isVi ? 'XKProduction Trang Chủ' : 'XKProduction Home'">
          <img
            src="/logo.png"
            alt="XKProduction Logo"
            class="logo-img"
            width="40"
            height="40"
          />
          <div class="brand-titles">
            <span class="brand-name">XKPRODUCTION</span>
            <span class="brand-sub text-meta-mono">{{ isVi ? 'SẢN XUẤT ÂM NHẠC' : 'MUSIC & AUDIO PRODUCTION' }}</span>
          </div>
        </NuxtLink>

        <!-- SEGMENTED LOCALE SWITCHER -->
        <div class="locale-switch-group" role="group" :aria-label="isVi ? 'Ngôn ngữ' : 'Language'">
          <button
            type="button"
            class="locale-btn"
            :class="{ 'is-active': isVi }"
            @click="isEn && toggleLocale()"
            :aria-pressed="isVi"
            title="Tiếng Việt"
          >
            VI
          </button>
          <button
            type="button"
            class="locale-btn"
            :class="{ 'is-active': isEn }"
            @click="isVi && toggleLocale()"
            :aria-pressed="isEn"
            title="English"
          >
            EN
          </button>
        </div>
      </div>

      <!-- DESKTOP NAVIGATION -->
      <nav class="desktop-nav" role="navigation" :aria-label="isVi ? 'Thanh điều hướng chính' : 'Main Navigation'">
        <!-- HOME -->
        <NuxtLink to="/" class="nav-link" :class="{ 'is-active': route.path === '/' }">
          <span>{{ isVi ? 'TRANG CHỦ' : 'HOME' }}</span>
        </NuxtLink>

        <!-- WORK WITH FLYOUT -->
        <div class="nav-item-dropdown" @mouseenter="hoverFlyout = 'work'" @mouseleave="hoverFlyout = null">
          <button
            type="button"
            class="nav-link nav-dropdown-btn"
            :class="{ 'is-active': route.path.startsWith('/work') || hoverFlyout === 'work' }"
            @click.stop="toggleFlyout('work')"
            :aria-expanded="hoverFlyout === 'work'"
          >
            <span>{{ isVi ? 'TÁC PHẨM' : 'WORK' }}</span>
            <i class="fa-solid fa-chevron-down nav-chevron" :class="{ 'is-rotated': hoverFlyout === 'work' }"></i>
          </button>

          <!-- WORK FLYOUT PREVIEW -->
          <Transition name="flyout-fade">
            <div v-if="hoverFlyout === 'work'" class="nav-flyout-panel matte-card">
              <div class="flyout-header">
                <span class="text-meta-mono">{{ isVi ? 'TÁC PHẨM NỔI BẬT' : 'FEATURED WORK' }}</span>
                <NuxtLink to="/work" class="flyout-all-link" @click="hoverFlyout = null">{{ isVi ? 'Xem tất cả' : 'View all' }} <i class="fa-solid fa-arrow-right"></i></NuxtLink>
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
          <button
            type="button"
            class="nav-link nav-dropdown-btn"
            :class="{ 'is-active': route.path.startsWith('/services') || hoverFlyout === 'services' }"
            @click.stop="toggleFlyout('services')"
            :aria-expanded="hoverFlyout === 'services'"
          >
            <span>{{ isVi ? 'DỊCH VỤ' : 'SERVICES' }}</span>
            <i class="fa-solid fa-chevron-down nav-chevron" :class="{ 'is-rotated': hoverFlyout === 'services' }"></i>
          </button>

          <!-- SERVICES FLYOUT -->
          <Transition name="flyout-fade">
            <div v-if="hoverFlyout === 'services'" class="nav-flyout-panel services-flyout matte-card">
              <div class="flyout-header">
                <span class="text-meta-mono">{{ isVi ? 'CÁC DỊCH VỤ SẢN XUẤT CHÍNH' : 'CORE STUDIO SERVICES' }}</span>
                <NuxtLink to="/services" class="flyout-all-link" @click="hoverFlyout = null">{{ isVi ? 'Tổng quan dịch vụ' : 'All services' }} <i class="fa-solid fa-arrow-right"></i></NuxtLink>
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

              <!-- AI AUDIO TOOL HIGHLIGHT -->
              <div class="flyout-tool-bar">
                <a
                  :href="createTachnhacReferralUrl('navbar_tachnhac')"
                  target="_blank"
                  rel="noopener"
                  class="flyout-tool-link"
                  @click="hoverFlyout = null"
                >
                  <div class="tool-link-left">
                    <span class="badge-v2 amber tool-mini-badge"><i class="fa-solid fa-wand-magic-sparkles"></i> AI TOOL</span>
                    <strong class="tool-link-name">TáchNhạc.com</strong>
                    <span class="tool-link-desc">{{ isVi ? 'Tách beat, vocal & khử noise online miễn phí' : 'Free online AI vocal & stem separation' }}</span>
                  </div>
                  <i class="fa-solid fa-arrow-up-right-from-square tool-link-arrow"></i>
                </a>
              </div>
            </div>
          </Transition>
        </div>

        <NuxtLink to="/production" class="nav-link" :class="{ 'is-active': route.path === '/production' }">
          <span>{{ isVi ? 'SẢN XUẤT' : 'PRODUCTION' }}</span>
        </NuxtLink>

        <NuxtLink to="/courses" class="nav-link" :class="{ 'is-active': route.path.startsWith('/courses') }">
          <span>{{ isVi ? 'KHÓA HỌC' : 'COURSES' }}</span>
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
          @click.stop="toggleMobileMenu"
          :aria-expanded="mobileOpen"
          :aria-label="isVi ? 'Mở bảng điều hướng' : 'Open navigation'"
        >
          <i :class="mobileOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered'"></i>
        </button>
      </div>
    </div>

    <!-- MOBILE DRAWER MENU -->
    <Transition name="drawer-slide" @after-leave="onDrawerAfterLeave">
      <div v-if="mobileOpen" class="mobile-drawer" role="dialog" aria-modal="true">
        <div class="mobile-drawer-inner">
          <div class="mobile-nav-links">
            <NuxtLink to="/" class="mobile-link" @click="closeMobileMenu">
              <span class="m-num">00</span>
              <span class="m-text">{{ isVi ? 'TRANG CHỦ' : 'HOME' }}</span>
            </NuxtLink>

            <div class="mobile-group-item">
              <div class="mobile-link-header">
                <NuxtLink to="/work" class="mobile-link mobile-link-main" @click="closeMobileMenu">
                  <span class="m-num">01</span>
                  <span class="m-text">{{ isVi ? 'TÁC PHẨM' : 'WORK' }}</span>
                </NuxtLink>
                <button
                  type="button"
                  class="mobile-sub-toggle"
                  @click="mobileWorkOpen = !mobileWorkOpen"
                  :aria-expanded="mobileWorkOpen"
                  :aria-label="isVi ? 'Mở danh mục tác phẩm' : 'Toggle works'"
                >
                  <i class="fa-solid fa-chevron-down" :class="{ 'is-rotated': mobileWorkOpen }"></i>
                </button>
              </div>
              <div v-if="mobileWorkOpen" class="mobile-submenu">
                <NuxtLink
                  v-for="p in featuredProjects.slice(0, 3)"
                  :key="p.slug"
                  :to="`/work/${p.slug}`"
                  class="mobile-sub-link"
                  @click="closeMobileMenu"
                >
                  <i class="fa-solid fa-compact-disc sub-icon"></i>
                  <span>{{ p.title }}</span>
                  <span class="sub-artist">({{ p.artist }})</span>
                </NuxtLink>
                <NuxtLink to="/work" class="mobile-sub-all" @click="closeMobileMenu">
                  {{ isVi ? 'Xem toàn bộ tác phẩm →' : 'View all works →' }}
                </NuxtLink>
              </div>
            </div>

            <div class="mobile-group-item">
              <div class="mobile-link-header">
                <NuxtLink to="/services" class="mobile-link mobile-link-main" @click="closeMobileMenu">
                  <span class="m-num">02</span>
                  <span class="m-text">{{ isVi ? 'DỊCH VỤ' : 'SERVICES' }}</span>
                </NuxtLink>
                <button
                  type="button"
                  class="mobile-sub-toggle"
                  @click="mobileServicesOpen = !mobileServicesOpen"
                  :aria-expanded="mobileServicesOpen"
                  :aria-label="isVi ? 'Mở danh mục dịch vụ' : 'Toggle services'"
                >
                  <i class="fa-solid fa-chevron-down" :class="{ 'is-rotated': mobileServicesOpen }"></i>
                </button>
              </div>
              <div v-if="mobileServicesOpen" class="mobile-submenu">
                <NuxtLink
                  v-for="c in capabilities"
                  :key="c.slug"
                  :to="`/services/${c.slug}`"
                  class="mobile-sub-link"
                  @click="closeMobileMenu"
                >
                  <i :class="c.icon" class="sub-icon"></i>
                  <span>{{ isVi ? c.viTitle || c.title : c.title }}</span>
                </NuxtLink>
                <NuxtLink to="/services" class="mobile-sub-all" @click="closeMobileMenu">
                  {{ isVi ? 'Tất cả bảng giá dịch vụ →' : 'All services & pricing →' }}
                </NuxtLink>
              </div>
            </div>

            <NuxtLink to="/production" class="mobile-link" @click="closeMobileMenu">
              <span class="m-num">03</span>
              <span class="m-text">{{ isVi ? 'SẢN XUẤT' : 'PRODUCTION' }}</span>
            </NuxtLink>
            <NuxtLink to="/courses" class="mobile-link" @click="closeMobileMenu">
              <span class="m-num">04</span>
              <span class="m-text">{{ isVi ? 'KHÓA HỌC' : 'COURSES' }}</span>
            </NuxtLink>
            <NuxtLink to="/about" class="mobile-link" @click="closeMobileMenu">
              <span class="m-num">05</span>
              <span class="m-text">{{ isVi ? 'GIỚI THIỆU' : 'ABOUT' }}</span>
            </NuxtLink>
            <NuxtLink to="/journal" class="mobile-link" @click="closeMobileMenu">
              <span class="m-num">06</span>
              <span class="m-text">{{ isVi ? 'BÀI VIẾT' : 'JOURNAL' }}</span>
            </NuxtLink>
            <NuxtLink to="/build-project" class="mobile-link" @click="closeMobileMenu">
              <span class="m-num">07</span>
              <span class="m-text">{{ isVi ? 'DỰ TOÁN CHI PHÍ' : 'BUILD PROJECT' }}</span>
            </NuxtLink>
            <a
              :href="createTachnhacReferralUrl('mobile_nav_tachnhac')"
              target="_blank"
              rel="noopener"
              class="mobile-link mobile-tool-link"
              @click="closeMobileMenu"
            >
              <span class="m-num"><i class="fa-solid fa-wand-magic-sparkles"></i></span>
              <span class="m-text">{{ isVi ? 'TÁCH NHẠC ONLINE (AI)' : 'AI STEM SEPARATOR' }}</span>
              <i class="fa-solid fa-arrow-up-right-from-square m-icon-ext"></i>
            </a>
          </div>

          <div class="mobile-drawer-cta">
            <NuxtLink to="/start-a-project" class="btn-start-project btn-full" @click="closeMobileMenu">
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
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useLocale } from '~/composables/useLocale'

const route = useRoute()
const { isVi, isEn, currentLocale, toggleLocale } = useLocale()
const { getFeaturedProjects, capabilities } = useProductionProjects()
const featuredProjects = getFeaturedProjects()

const isScrolled = ref(false)
const mobileOpen = ref(false)
const isDrawerLeaving = ref(false)
const mobileWorkOpen = ref(false)
const mobileServicesOpen = ref(false)
const hoverFlyout = ref<string | null>(null)

function toggleMobileMenu() {
  if (mobileOpen.value) {
    closeMobileMenu()
  } else {
    mobileOpen.value = true
    isDrawerLeaving.value = false
    if (import.meta.client) {
      document.body.style.overflow = 'hidden'
    }
  }
}

function closeMobileMenu() {
  if (!mobileOpen.value && !isDrawerLeaving.value) return
  if (mobileOpen.value) {
    isDrawerLeaving.value = true
    mobileOpen.value = false
  }
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
}

function onDrawerAfterLeave() {
  isDrawerLeaving.value = false
}

function toggleFlyout(name: string) {
  if (hoverFlyout.value === name) {
    hoverFlyout.value = null
  } else {
    hoverFlyout.value = name
  }
}

function handleDocumentClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.nav-item-dropdown')) {
    hoverFlyout.value = null
  }
}

function handleScroll() {
  if (!import.meta.client) return
  isScrolled.value = window.scrollY > 20
}

watch(() => route.fullPath, () => {
  closeMobileMenu()
  hoverFlyout.value = null
})

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleDocumentClick)
    handleScroll()
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
    window.removeEventListener('scroll', handleScroll)
    document.removeEventListener('click', handleDocumentClick)
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
  background-color: rgba(5, 11, 20, 0.93);
  backdrop-filter: blur(20px) saturate(1.5);
  -webkit-backdrop-filter: blur(20px) saturate(1.5);
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
  gap: clamp(1.5rem, 2.5vw, 2.75rem);
  flex-shrink: 0;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  flex-shrink: 0;
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
  white-space: nowrap;
}

.brand-sub {
  font-size: 0.625rem;
  color: var(--text-subtle);
  white-space: nowrap;
}

/* SEGMENTED PILL LOCALE SWITCHER */
.locale-switch-group {
  display: inline-flex;
  align-items: center;
  padding: 2px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  flex-shrink: 0;
}

.locale-switch-group:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.07);
}

.locale-btn {
  background: transparent;
  border: none;
  padding: 0.22rem 0.55rem;
  color: var(--text-subtle);
  font-family: inherit;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  border-radius: 999px;
  transition: all 0.2s ease;
  line-height: 1;
}

.locale-btn:hover {
  color: var(--text-primary);
}

.locale-btn.is-active {
  background: rgba(251, 191, 36, 0.18);
  color: #fbbf24;
  font-weight: 800;
  border: 1px solid rgba(251, 191, 36, 0.35);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

/* DESKTOP NAV */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 0.95vw, 1.25rem);
  flex-shrink: 0;
}

.nav-link {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 0.15rem;
  transition: color 0.15s ease;
  position: relative;
  white-space: nowrap;
  flex-shrink: 0;
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
  background: rgba(22, 119, 255, 0.07);
  border-color: rgba(22, 119, 255, 0.35);
}

.service-card-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: rgba(22, 119, 255, 0.12);
  color: #60CFFF;
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

/* FLYOUT AI TOOL BAR */
.flyout-tool-bar {
  margin-top: 0.85rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-subtle);
}

.flyout-tool-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  background: rgba(245, 158, 11, 0.05);
  border: 1px solid rgba(245, 158, 11, 0.2);
  text-decoration: none;
  transition: all 0.2s ease;
}

.flyout-tool-link:hover {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.4);
  transform: translateY(-1px);
}

.tool-link-left {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 0;
}

.tool-mini-badge {
  font-size: 0.625rem;
  padding: 0.15rem 0.45rem;
  flex-shrink: 0;
}

.tool-link-name {
  font-size: 0.8125rem;
  color: var(--text-primary);
  font-weight: 700;
  flex-shrink: 0;
}

.tool-link-desc {
  font-size: 0.6875rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tool-link-arrow {
  font-size: 0.75rem;
  color: #fbbf24;
  flex-shrink: 0;
  margin-left: 0.5rem;
}

/* HEADER ACTIONS */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
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
  white-space: nowrap;
  flex-shrink: 0;
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
  background: linear-gradient(135deg, #1677FF 0%, #00B8FF 100%);
  color: #ffffff;
  font-size: 0.8125rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  border-radius: 6px;
  border: 1px solid rgba(22, 119, 255, 0.5);
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 2px 12px rgba(22, 119, 255, 0.3);
  white-space: nowrap;
  flex-shrink: 0;
}

.btn-start-project:hover {
  background: linear-gradient(135deg, #2488FF 0%, #22c5ff 100%);
  transform: scale(1.02);
  box-shadow: 0 6px 22px rgba(22, 119, 255, 0.48);
}

.btn-start-project.btn-full {
  width: 100%;
  justify-content: center;
  padding: 0.85rem;
}

.nav-dropdown-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 0.15rem;
  transition: color 0.15s ease;
}

.nav-dropdown-btn:hover,
.nav-dropdown-btn.is-active {
  color: var(--text-primary);
}

.nav-chevron.is-rotated {
  transform: rotate(180deg);
}

.xk-header.is-mobile-menu-open {
  background-color: rgba(5, 11, 20, 0.98);
  border-bottom-color: var(--border-subtle);
  height: 100vh;
  height: 100dvh;
  bottom: 0;
  z-index: 9999;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.mobile-toggle-btn {
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.35rem;
  cursor: pointer;
  padding: 0.5rem;
  position: relative;
  z-index: 1000;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* MOBILE DRAWER */
.mobile-drawer {
  position: absolute;
  top: 76px;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100vh - 76px);
  height: calc(100dvh - 76px);
  background: var(--bg-canvas, #050b14);
  z-index: 999;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  -webkit-overflow-scrolling: touch;
  border-top: 1px solid var(--border-subtle);
}

.mobile-drawer-inner {
  padding: 1.5rem 1.25rem calc(3rem + env(safe-area-inset-bottom, 0px)) 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-link {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-subtle);
  text-decoration: none;
}

.mobile-group-item {
  border-bottom: 1px solid var(--border-subtle);
}

.mobile-link-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mobile-link.mobile-link-main {
  border-bottom: none;
  flex: 1;
}

.mobile-sub-toggle {
  background: none;
  border: none;
  color: var(--text-secondary);
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.mobile-sub-toggle i {
  transition: transform 0.2s ease;
}

.mobile-sub-toggle i.is-rotated {
  transform: rotate(180deg);
}

.mobile-submenu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.25rem 0 0.85rem 2rem;
}

.mobile-sub-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-decoration: none;
  padding: 0.35rem 0;
  transition: color 0.15s ease;
}

.mobile-sub-link:hover {
  color: #fbbf24;
}

.mobile-sub-link .sub-icon {
  font-size: 0.8125rem;
  color: #60CFFF;
  width: 16px;
}

.mobile-sub-link .sub-artist {
  font-size: 0.75rem;
  color: var(--text-subtle);
}

.mobile-sub-all {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #fbbf24;
  text-decoration: none;
  padding-top: 0.35rem;
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

.mobile-tool-link {
  border-bottom: 1px dashed rgba(245, 158, 11, 0.3);
}

.mobile-tool-link .m-text {
  color: #fbbf24;
  font-size: 1.05rem;
}

.m-icon-ext {
  margin-left: auto;
  font-size: 0.875rem;
  color: #fbbf24;
}

.mobile-drawer-cta {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 0.5rem;
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

/* DRAWER TRANSITION */
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 1280px) {
  .btn-builder-link {
    display: none;
  }
}

@media (max-width: 1140px) {
  .desktop-nav {
    display: none;
  }
  .btn-builder-link {
    display: none;
  }
  .mobile-toggle-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .btn-start-project {
    display: none;
  }
}
</style>
