<template>
  <div class="sticky-contact" :class="{ visible: isVisible }" role="complementary" aria-label="Liên hệ nhanh XKProduction">

    <!-- Messenger / Facebook button (new) -->
    <a
      href="https://m.me/ngxkiet"
      target="_blank"
      rel="noopener"
      class="sticky-btn messenger-btn"
      title="Nhắn Messenger"
      aria-label="Nhắn tin qua Facebook Messenger"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.145 2 11.243c0 3.09 1.507 5.843 3.86 7.668V22l3.525-1.938A10.56 10.56 0 0 0 12 20.486c5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.022 12.457-2.548-2.72-4.97 2.72 5.468-5.803 2.61 2.72 4.908-2.72-5.468 5.803z"/>
      </svg>
      <span class="btn-label">Messenger</span>
    </a>

    <!-- Zalo button -->
    <a
      href="https://zalo.me/0355356294"
      target="_blank"
      rel="noopener"
      class="sticky-btn zalo-btn"
      title="Nhắn Zalo ngay"
      aria-label="Liên hệ Zalo XKProduction"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 3C6.48 3 2 6.94 2 11.8c0 2.8 1.46 5.3 3.75 6.92-.16.96-.68 2.5-1.57 3.65 1.5-.2 3.32-.82 4.67-1.8.98.28 2.04.43 3.15.43 5.52 0 10-3.94 10-8.8S17.52 3 12 3zm1.6 11.8h-4.3c-.3 0-.5-.2-.4-.5l2.6-4.5h-2.1c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h4c.3 0 .5.2.4.5l-2.6 4.5h2.4c.3 0 .5.2.5.5s-.2.5-.5.5z"/>
      </svg>
      <span class="btn-label">Zalo</span>
      <span class="btn-ping" aria-hidden="true"></span>
    </a>

    <!-- Phone button -->
    <a
      href="tel:0355356294"
      class="sticky-btn phone-btn"
      title="Gọi ngay 0355.356.294"
      aria-label="Gọi điện XKProduction"
    >
      <i class="fa-solid fa-phone" aria-hidden="true"></i>
      <span class="btn-label">Gọi ngay</span>
    </a>
  </div>
</template>

<script setup lang="ts">
const isVisible = ref(false)

onMounted(() => {
  let ticking = false
  const toggle = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        isVisible.value = window.scrollY > 200
        ticking = false
      })
      ticking = true
    }
  }
  // Show immediately on mobile (scrollY can be 0)
  if (window.innerWidth <= 768) isVisible.value = true
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
  gap: 0.55rem;
  align-items: flex-end;
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
  box-shadow: 0 8px 25px rgba(0,0,0,0.45);
  transition: all 0.28s cubic-bezier(0.23,1,0.32,1);
  position: relative;
  overflow: visible;
  border: 1px solid rgba(255,255,255,0.12);
}
.sticky-btn:hover {
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 14px 38px rgba(0,0,0,0.55);
}
.sticky-btn:active { transform: scale(0.97); }

/* Messenger */
.messenger-btn {
  background: linear-gradient(135deg, #0668E1 0%, #A335E9 100%);
  color: #fff;
}
.messenger-btn svg { width: 20px; height: 20px; flex-shrink: 0; }

/* Zalo */
.zalo-btn {
  background: linear-gradient(135deg, #0068ff 0%, #00b4ff 100%);
  color: #fff;
}
.zalo-btn svg { width: 22px; height: 22px; flex-shrink: 0; }

/* Pulsing online dot */
.btn-ping {
  position: absolute;
  top: -3px; right: -3px;
  width: 10px; height: 10px;
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

/* Mobile: icon only */
@media (max-width: 768px) {
  .sticky-contact {
    opacity: 1 !important;
    transform: translateX(0) !important;
    pointer-events: auto !important;
    bottom: 1.2rem;
    right: 1rem;
    gap: 0.45rem;
  }
}
@media (max-width: 480px) {
  .btn-label { display: none; }
  .sticky-btn {
    padding: 0.85rem;
    border-radius: 50%;
    width: 52px; height: 52px;
    justify-content: center;
  }
  .sticky-btn svg,
  .sticky-btn i { font-size: 1.2rem; width: 24px; height: 24px; }
}
</style>
