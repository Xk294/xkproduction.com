<template>
  <div class="capability-detail-page">
    <template v-if="cap">
      <!-- HERO -->
      <section class="cap-hero">
        <div class="editorial-container">
          <NuxtLink to="/services" class="back-link">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Tất cả năng lực sản xuất</span>
          </NuxtLink>

          <div class="cap-badge-row">
            <span class="badge-v2 amber">{{ cap.badge }}</span>
            <span class="text-meta-mono">{{ cap.timeline }}</span>
          </div>

          <h1 class="cap-hero-title">{{ cap.title }}</h1>
          <p class="cap-hero-sub">{{ cap.subtitle }}</p>
          <p class="cap-hero-desc">{{ cap.summary }}</p>

          <div class="cap-hero-actions">
            <NuxtLink to="/start-a-project" class="btn-start-cap">
              <span>BẮT ĐẦU DỰ ÁN</span>
              <i class="fa-solid fa-arrow-right"></i>
            </NuxtLink>
            <div class="cap-price-tag">
              <span class="text-meta-mono">MỨC ĐẦU TƯ:</span>
              <strong>{{ cap.investmentStarting }}</strong>
            </div>
          </div>
        </div>
      </section>

      <!-- DELIVERABLES & FEATURES -->
      <section class="cap-features-section">
        <div class="editorial-container features-layout">
          <!-- MAIN FEATURES -->
          <div class="features-main-col">
            <h2 class="col-heading">Điểm Khác Biệt Trong Kỹ Nghệ Sản Xuất</h2>
            <div class="features-list">
              <div v-for="(feat, fIdx) in cap.features" :key="fIdx" class="feature-card matte-card">
                <div class="feat-num text-meta-mono">0{{ fIdx + 1 }}</div>
                <strong class="feat-title">{{ feat.title }}</strong>
                <p class="feat-desc">{{ feat.description }}</p>
              </div>
            </div>

            <!-- FAQ SECTION -->
            <div v-if="cap.faq && cap.faq.length" class="cap-faq-block">
              <h2 class="col-heading">Câu Hỏi Thường Gặp</h2>
              <div class="faq-accordion">
                <div v-for="(q, qIdx) in cap.faq" :key="qIdx" class="faq-item matte-card">
                  <strong class="faq-question">{{ q.question }}</strong>
                  <p class="faq-answer">{{ q.answer }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- SIDEBAR DELIVERABLES -->
          <aside class="deliverables-sidebar-col">
            <div class="sidebar-box matte-card">
              <span class="text-meta-mono s-badge">HỒ SƠ BÀN GIAO</span>
              <ul class="d-items-list">
                <li v-for="(del, dIdx) in cap.deliverables" :key="dIdx">
                  <i class="fa-solid fa-check"></i>
                  <span>{{ del }}</span>
                </li>
              </ul>

              <div class="sidebar-meta-item">
                <span class="text-meta-mono">TIẾN ĐỘ THỰC HIỆN</span>
                <strong>{{ cap.timeline }}</strong>
              </div>

              <NuxtLink to="/start-a-project" class="btn-sidebar-submit">
                <span>GỬI PROJECT BRIEF</span>
                <i class="fa-solid fa-arrow-right"></i>
              </NuxtLink>
            </div>
          </aside>
        </div>
      </section>
    </template>

    <div v-else class="editorial-container text-center not-found-wrap">
      <span class="badge-v2 amber">404</span>
      <h1>Không Tìm Thấy Dịch Vụ</h1>
      <NuxtLink to="/services" class="btn-start-cap">Xem Tất Cả Dịch Vụ</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { getCapabilityBySlug } = useProductionProjects()
const cap = computed(() => getCapabilityBySlug(slug.value))

useSeoMeta({
  title: () => cap.value ? `${cap.value.title} — ${cap.value.subtitle} | XKProduction` : 'Dịch Vụ | XKProduction',
  description: () => cap.value ? cap.value.summary : '',
  ogTitle: () => cap.value ? `${cap.value.title} | XKProduction` : 'XKProduction Capabilities',
  ogDescription: () => cap.value ? cap.value.summary : '',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogUrl: () => `https://xkproduction.com/services/${slug.value}`
})
</script>

<style scoped>
.capability-detail-page {
  padding-top: clamp(7.5rem, 14vw, 11rem);
  padding-bottom: 6rem;
  background-color: var(--bg-canvas);
  color: var(--text-primary);
  min-height: 100vh;
}

.cap-hero {
  padding-bottom: 3.5rem;
  border-bottom: 1px solid var(--border-subtle);
  margin-bottom: 4rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: var(--text-secondary);
  text-decoration: none;
  margin-bottom: 2rem;
  transition: color 0.15s ease;
}

.back-link:hover {
  color: #fbbf24;
}

.cap-badge-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.cap-hero-title {
  font-size: clamp(2.8rem, 6.5vw, 6rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin-bottom: 0.75rem;
}

.cap-hero-sub {
  font-size: 1.25rem;
  font-weight: 600;
  color: #fbbf24;
  margin-bottom: 1rem;
}

.cap-hero-desc {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 800px;
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.cap-hero-actions {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.btn-start-cap {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 2.25rem;
  background: var(--text-primary);
  color: var(--bg-canvas);
  font-weight: 800;
  font-size: 0.875rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-start-cap:hover {
  background: #ffffff;
  transform: translateY(-2px);
}

.cap-price-tag {
  display: flex;
  flex-direction: column;
}

.cap-price-tag span {
  font-size: 0.6875rem;
}

.cap-price-tag strong {
  font-size: 1.25rem;
  color: var(--text-primary);
}

/* FEATURES LAYOUT */
.features-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
}

.features-main-col {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.col-heading {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.feature-card {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feat-num {
  font-size: 0.75rem;
  color: #d97706;
}

.feat-title {
  font-size: 1.25rem;
  color: var(--text-primary);
}

.feat-desc {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* FAQ */
.cap-faq-block {
  margin-top: 2rem;
}

.faq-accordion {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.faq-question {
  font-size: 1.0625rem;
  color: var(--text-primary);
}

.faq-answer {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* SIDEBAR */
.sidebar-box {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: sticky;
  top: 100px;
}

.s-badge {
  font-size: 0.75rem;
  color: var(--text-subtle);
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 0.5rem;
}

.d-items-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.d-items-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.875rem;
  color: var(--text-primary);
  line-height: 1.45;
}

.d-items-list i {
  color: #0d9488;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.sidebar-meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-subtle);
}

.sidebar-meta-item strong {
  font-size: 1rem;
  color: var(--text-primary);
}

.btn-sidebar-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.95rem;
  background: var(--text-primary);
  color: var(--bg-canvas);
  font-weight: 800;
  font-size: 0.8125rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-sidebar-submit:hover {
  background: #ffffff;
}

@media (max-width: 1024px) {
  .features-layout {
    grid-template-columns: 1fr;
  }
}
</style>
