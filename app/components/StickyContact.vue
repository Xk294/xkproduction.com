<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  let ticking = false
  const toggle = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        isVisible.value = window.scrollY > 150
        ticking = false
      })
      ticking = true
    }
  }
  if (window.innerWidth <= 768) isVisible.value = true
  window.addEventListener('scroll', toggle, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', toggle))
})
</script>

<template>
  <div class="studio-contact-wrapper" :class="{ visible: isVisible }">
    <!-- DESKTOP DOCK (Minimalist & Luxurious) -->
    <div class="desktop-contact-dock glass-card">
      <div class="dock-status-pill">
        <span class="pulse-dot"></span>
        <span class="status-txt">Studio Active</span>
      </div>

      <div class="dock-divider"></div>

      <!-- Zalo Button (Primary) -->
      <a
        href="https://zalo.me/0355356294"
        target="_blank"
        rel="noopener"
        class="dock-item-btn zalo-dock"
        title="Chat Zalo với Music Producer"
        aria-label="Liên hệ Zalo"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 3C6.48 3 2 6.94 2 11.8c0 2.8 1.46 5.3 3.75 6.92-.16.96-.68 2.5-1.57 3.65 1.5-.2 3.32-.82 4.67-1.8.98.28 2.04.43 3.15.43 5.52 0 10-3.94 10-8.8S17.52 3 12 3zm1.6 11.8h-4.3c-.3 0-.5-.2-.4-.5l2.6-4.5h-2.1c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h4c.3 0 .5.2.4.5l-2.6 4.5h2.4c.3 0 .5.2.5.5s-.2.5-.5.5z"/>
        </svg>
        <span>Zalo Tư Vấn</span>
      </a>

      <!-- Phone Button -->
      <a
        href="tel:0355356294"
        class="dock-item-btn phone-dock"
        title="Gọi hotline 0355.356.294"
        aria-label="Gọi điện thoại"
      >
        <i class="fa-solid fa-phone"></i>
        <span>0355.356.294</span>
      </a>

      <!-- Messenger Button -->
      <a
        href="https://m.me/ngxkiet"
        target="_blank"
        rel="noopener"
        class="dock-item-icon-only"
        title="Nhắn tin Messenger"
        aria-label="Nhắn tin qua Messenger"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.145 2 11.243c0 3.09 1.507 5.843 3.86 7.668V22l3.525-1.938A10.56 10.56 0 0 0 12 20.486c5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.022 12.457-2.548-2.72-4.97 2.72 5.468-5.803 2.61 2.72 4.908-2.72-5.468 5.803z"/>
        </svg>
      </a>
    </div>

    <!-- MOBILE BOTTOM BAR (Native App Ergonomics) -->
    <div class="mobile-bottom-bar">
      <a href="tel:0355356294" class="mobile-bar-action">
        <i class="fa-solid fa-phone"></i>
        <span>Gọi Ngay</span>
      </a>

      <a href="https://zalo.me/0355356294" target="_blank" rel="noopener" class="mobile-bar-action primary-action">
        <div class="zalo-icon-badge">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.48 3 2 6.94 2 11.8c0 2.8 1.46 5.3 3.75 6.92-.16.96-.68 2.5-1.57 3.65 1.5-.2 3.32-.82 4.67-1.8.98.28 2.04.43 3.15.43 5.52 0 10-3.94 10-8.8S17.52 3 12 3zm1.6 11.8h-4.3c-.3 0-.5-.2-.4-.5l2.6-4.5h-2.1c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h4c.3 0 .5.2.4.5l-2.6 4.5h2.4c.3 0 .5.2.5.5s-.2.5-.5.5z"/>
          </svg>
        </div>
        <span>Chat Zalo Báo Giá</span>
      </a>

      <NuxtLink to="/contact" class="mobile-bar-action">
        <i class="fa-solid fa-calendar-check"></i>
        <span>Đặt Lịch</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.studio-contact-wrapper {
  pointer-events: none;
}

/* DESKTOP DOCK */
.desktop-contact-dock {
  position: fixed;
  bottom: 1.75rem;
  right: 1.75rem;
  z-index: 900;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: rgba(11, 14, 22, 0.85);
  backdrop-filter: blur(20px) saturate(1.3);
  -webkit-backdrop-filter: blur(20px) saturate(1.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(0, 128, 255, 0.35);
  border-radius: 100px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 128, 255, 0.12);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.35s var(--ease-out-expo), transform 0.35s var(--ease-out-expo);
  pointer-events: none;
}

.studio-contact-wrapper.visible .desktop-contact-dock {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.dock-status-pill {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--teal);
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--teal);
  box-shadow: 0 0 8px var(--teal);
  animation: pulseDot 2s infinite;
}

@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

.dock-divider {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
}

.dock-item-btn {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.95rem;
  border-radius: 100px;
  font-size: 0.78rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.zalo-dock {
  background: linear-gradient(135deg, #0080ff 0%, #00d4aa 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 128, 255, 0.35);
}

.zalo-dock:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 128, 255, 0.5);
  color: #fff;
}

.phone-dock {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-main);
}

.phone-dock:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.dock-item-icon-only {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e1;
  transition: all 0.25s ease;
}

.dock-item-icon-only:hover {
  background: linear-gradient(135deg, #0068ff, #a335e9);
  color: #fff;
  transform: scale(1.1);
}

/* MOBILE BOTTOM BAR */
.mobile-bottom-bar {
  display: none;
}

@media (max-width: 768px) {
  .desktop-contact-dock {
    display: none;
  }

  .mobile-bottom-bar {
    display: grid;
    grid-template-columns: 1fr 1.6fr 1fr;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 910;
    background: rgba(9, 12, 19, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.5rem 0.75rem calc(0.5rem + env(safe-area-inset-bottom, 0px));
    gap: 0.5rem;
    box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.6);
    pointer-events: auto;
  }

  .mobile-bar-action {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.4rem 0.2rem;
    border-radius: 10px;
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.72rem;
    font-weight: 700;
    transition: all 0.2s ease;
  }

  .mobile-bar-action i {
    font-size: 1.05rem;
  }

  .mobile-bar-action.primary-action {
    background: linear-gradient(135deg, #0080ff 0%, #00d4aa 100%);
    color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 14px rgba(0, 128, 255, 0.4);
    flex-direction: row;
    gap: 0.45rem;
    font-size: 0.78rem;
  }

  .zalo-icon-badge {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
