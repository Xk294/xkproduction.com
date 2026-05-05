<template>
  <div class="sticky-contact" :class="{ visible: isVisible }">
    <!-- Zalo button -->
    <a
      href="https://zalo.me/0355356294"
      target="_blank"
      rel="noopener"
      class="sticky-btn zalo-btn"
      title="Nhắn Zalo ngay"
      aria-label="Liên hệ Zalo XKProduction"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.238 2 11.4c0 2.9 1.386 5.516 3.574 7.27L4.9 22l3.63-1.927A10.83 10.83 0 0 0 12 20.8c5.523 0 10-4.238 10-9.4S17.523 2 12 2zm.879 12.689-2.015-2.143-3.937 2.213 4.331-4.589 2.015 2.143 3.937-2.213-4.331 4.589z"/>
      </svg>
      <span class="btn-label">Zalo</span>
      <span class="btn-ping"></span>
    </a>

    <!-- Phone button -->
    <a
      href="tel:0355356294"
      class="sticky-btn phone-btn"
      title="Gọi ngay 0355.356.294"
      aria-label="Gọi điện XKProduction"
    >
      <i class="fa-solid fa-phone"></i>
      <span class="btn-label">Gọi ngay</span>
    </a>
  </div>
</template>

<script setup lang="ts">
const isVisible = ref(false)

onMounted(() => {
  const toggle = () => { isVisible.value = window.scrollY > 300 }
  window.addEventListener('scroll', toggle, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', toggle))
})
</script>

<style scoped>
.sticky-contact {
  position: fixed;
  bottom: 1.75rem;
  right: 1.5rem;
  z-index: 900;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: flex-end;
  /* Hidden by default, shown after scroll */
  opacity: 0;
  transform: translateX(80px);
  transition: opacity 0.35s cubic-bezier(0.23,1,0.32,1), transform 0.35s cubic-bezier(0.23,1,0.32,1);
  pointer-events: none;
}
.sticky-contact.visible {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
}

.sticky-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.1rem 0.65rem 0.9rem;
  border-radius: 50px;
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 8px 25px rgba(0,0,0,0.4);
  transition: all 0.28s cubic-bezier(0.23,1,0.32,1);
  position: relative;
  overflow: visible;
}
.sticky-btn:hover {
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 14px 35px rgba(0,0,0,0.5);
}

/* Zalo */
.zalo-btn {
  background: linear-gradient(135deg, #0068ff 0%, #00b4ff 100%);
  color: #fff;
}
.zalo-btn svg { width: 22px; height: 22px; flex-shrink: 0; }

/* Pulsing ring on Zalo */
.btn-ping {
  position: absolute;
  top: -3px; right: -3px;
  width: 12px; height: 12px;
  background: #00e5c0;
  border-radius: 50%;
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
@keyframes ping {
  0% { transform: scale(1); opacity: 0.9; }
  70% { transform: scale(2.2); opacity: 0; }
  100% { transform: scale(2.2); opacity: 0; }
}

/* Phone */
.phone-btn {
  background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
  color: #fff;
  font-size: 0.8rem;
}
.phone-btn i { font-size: 0.9rem; }

/* Mobile: thu gọn chỉ còn icon */
@media (max-width: 768px) {
  /* Always visible on mobile for better conversion */
  .sticky-contact {
    opacity: 1 !important;
    transform: translateX(0) !important;
    pointer-events: auto !important;
  }
}
@media (max-width: 480px) {
  .sticky-contact { bottom: 1.2rem; right: 1rem; }
  .btn-label { display: none; }
  .sticky-btn { padding: 0.85rem; border-radius: 50%; width: 50px; height: 50px; justify-content: center; }
  .sticky-btn svg, .sticky-btn i { font-size: 1.2rem; width: 24px; height: 24px; }
}
</style>
