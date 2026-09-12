<template>
  <div class="capability-detail-page">
    <template v-if="cap">
      <!-- HERO -->
      <section class="cap-hero">
        <div class="editorial-container">
          <NuxtLink to="/services" class="back-link">
            <i class="fa-solid fa-arrow-left"></i>
            <span>{{ isVi ? 'Tất cả dịch vụ sản xuất' : 'All Production Services' }}</span>
          </NuxtLink>

          <div class="cap-badge-row">
            <span class="badge-v2 amber">{{ isVi ? cap.badge : (cap.enBadge || cap.badge) }}</span>
            <span class="text-meta-mono">{{ isVi ? cap.timeline : (cap.enTimeline || cap.timeline) }}</span>
          </div>

          <h1 class="cap-hero-title">{{ isVi ? (cap.viTitle || cap.title) : (cap.enTitle || cap.title) }}</h1>
          <p class="cap-hero-sub">{{ isVi ? cap.subtitle : (cap.enSubtitle || cap.subtitle) }}</p>
          <p class="cap-hero-desc">{{ isVi ? cap.summary : (cap.enSummary || cap.summary) }}</p>

          <div class="cap-hero-actions">
            <NuxtLink :to="`/start-a-project?service=${cap.slug}`" class="btn-start-cap">
              <span>{{ isVi ? 'BẮT ĐẦU DỰ ÁN' : 'START A PROJECT' }}</span>
              <i class="fa-solid fa-arrow-right"></i>
            </NuxtLink>
            <div class="cap-price-tag">
              <div class="price-tag-header">
                <span class="text-meta-mono">{{ isVi ? 'CHI PHÍ TỪ:' : 'STARTING FROM:' }}</span>
                <span v-if="cap.discountBadge" class="discount-pill">
                  {{ isVi ? cap.discountBadge : (cap.enDiscountBadge || cap.discountBadge) }}
                </span>
              </div>
              <div class="price-val-row">
                <span v-if="cap.originalPrice" class="meta-val-struck text-meta-mono">{{ cap.originalPrice }}</span>
                <strong>{{ isVi ? cap.investmentStarting : (cap.enInvestmentStarting || cap.investmentStarting) }}</strong>
              </div>
            </div>
          </div>

          <!-- TECHNICAL SPECIFICATIONS STRIP -->
          <div v-if="cap.techSpecs && cap.techSpecs.length" class="cap-tech-specs-strip">
            <div v-for="(spec, sIdx) in cap.techSpecs" :key="sIdx" class="spec-strip-card matte-card">
              <span class="spec-label text-meta-mono">{{ isVi ? spec.label : (spec.enLabel || spec.label) }}</span>
              <strong class="spec-value">{{ isVi ? spec.value : (spec.enValue || spec.value) }}</strong>
              <p class="spec-desc">{{ isVi ? spec.desc : (spec.enDesc || spec.desc) }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- DELIVERABLES & FEATURES -->
      <section class="cap-features-section">
        <div class="editorial-container features-layout">
          <!-- MAIN FEATURES -->
          <div class="features-main-col">
            <h2 class="col-heading">{{ isVi ? 'Điểm Tựa Cảm Xúc &amp; Quyền Lợi Của Bạn' : 'Emotional Care &amp; Studio Benefits' }}</h2>
            <div class="features-list">
              <div v-for="(feat, fIdx) in cap.features" :key="fIdx" class="feature-card matte-card">
                <div class="feat-num text-meta-mono">0{{ fIdx + 1 }}</div>
                <strong class="feat-title">{{ isVi ? feat.title : (feat.enTitle || feat.title) }}</strong>
                <p class="feat-desc">{{ isVi ? feat.description : (feat.enDescription || feat.description) }}</p>
              </div>
            </div>

            <!-- WORKFLOW SECTION -->
            <div v-if="cap.workflow && cap.workflow.length" class="cap-workflow-block">
              <h2 class="col-heading">{{ isVi ? 'Hành Trình Đồng Hành Cùng Bạn' : 'How We Walk Beside You' }}</h2>
              <div class="workflow-steps-list">
                <div v-for="(step, stIdx) in cap.workflow" :key="stIdx" class="workflow-step-card matte-card">
                  <div class="step-badge text-meta-mono">{{ isVi ? step.step : (step.enStep || step.step) }}</div>
                  <div class="step-content">
                    <strong class="step-title">{{ isVi ? step.title : (step.enTitle || step.title) }}</strong>
                    <p class="step-desc">{{ isVi ? step.desc : (step.enDesc || step.desc) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- FAQ SECTION -->
            <div v-if="cap.faq && cap.faq.length" class="cap-faq-block">
              <h2 class="col-heading">{{ isVi ? 'Câu Hỏi Thường Gặp' : 'Frequently Asked Questions' }}</h2>
              <div class="faq-accordion">
                <div v-for="(q, qIdx) in cap.faq" :key="qIdx" class="faq-item matte-card">
                  <strong class="faq-question">{{ isVi ? q.question : (q.enQuestion || q.question) }}</strong>
                  <p class="faq-answer">{{ isVi ? q.answer : (q.enAnswer || q.answer) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- SIDEBAR DELIVERABLES -->
          <aside class="deliverables-sidebar-col">
            <div class="sidebar-box matte-card">
              <span class="text-meta-mono s-badge">{{ isVi ? 'KẾT QUẢ BÀN GIAO' : 'PACKAGE DELIVERABLES' }}</span>
              <ul class="d-items-list">
                <li v-for="(del, dIdx) in (isVi ? cap.deliverables : (cap.enDeliverables || cap.deliverables))" :key="dIdx">
                  <i class="fa-solid fa-check"></i>
                  <span>{{ del }}</span>
                </li>
              </ul>

              <div class="sidebar-meta-item">
                <span class="text-meta-mono">{{ isVi ? 'TIẾN ĐỘ THỰC HIỆN' : 'ESTIMATED TIMELINE' }}</span>
                <strong>{{ isVi ? cap.timeline : (cap.enTimeline || cap.timeline) }}</strong>
              </div>

              <!-- STUDIO GUARANTEES -->
              <div v-if="cap.guarantees && cap.guarantees.length" class="sidebar-guarantees-section">
                <span class="text-meta-mono s-badge">{{ isVi ? 'CAM KẾT CỦA STUDIO' : 'STUDIO ASSURANCE' }}</span>
                <ul class="guarantees-list">
                  <li v-for="(g, gIdx) in cap.guarantees" :key="gIdx" class="guarantee-item">
                    <i class="fa-solid fa-shield-halved"></i>
                    <div>
                      <strong>{{ isVi ? g.title : (g.enTitle || g.title) }}</strong>
                      <p>{{ isVi ? g.desc : (g.enDesc || g.desc) }}</p>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- DIRECT STUDIO CONSULTATION -->
              <div class="sidebar-direct-contact">
                <span class="text-meta-mono s-badge">{{ isVi ? 'TƯ VẤN TRỰC TIẾP' : 'DIRECT ADVICE' }}</span>
                <p class="direct-contact-note">
                  {{ isVi ? 'Cần nghe thử demo hoặc trao đổi nhanh về bài hát của bạn?' : 'Want to discuss your track or demo directly?' }}
                </p>
                <a href="https://zalo.me/0355356294" target="_blank" rel="noopener noreferrer" class="btn-zalo-direct">
                  <i class="fa-solid fa-comment-dots"></i>
                  <span>Zalo: 0355.356.294 (Studio)</span>
                </a>
              </div>

              <NuxtLink :to="`/start-a-project?service=${cap.slug}`" class="btn-sidebar-submit">
                <span>{{ isVi ? 'GỬI YÊU CẦU DỰ ÁN' : 'SUBMIT PROJECT BRIEF' }}</span>
                <i class="fa-solid fa-arrow-right"></i>
              </NuxtLink>
            </div>
          </aside>
        </div>
      </section>
    </template>

    <div v-else class="editorial-container text-center not-found-wrap">
      <span class="badge-v2 amber">404</span>
      <h1>{{ isVi ? 'Không Tìm Thấy Dịch Vụ' : 'Service Not Found' }}</h1>
      <NuxtLink to="/services" class="btn-start-cap">{{ isVi ? 'Xem Tất Cả Dịch Vụ' : 'View All Services' }}</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '~/composables/useLocale'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const { isVi } = useLocale()

const { getCapabilityBySlug } = useProductionProjects()
const cap = computed(() => getCapabilityBySlug(slug.value))

if (!cap.value && import.meta.server) {
  const event = useRequestEvent()
  if (event) {
    setResponseStatus(event, 404)
  }
}

useSeoMeta({
  title: () => cap.value
    ? `${isVi.value ? (cap.value.viTitle || cap.value.title) : (cap.value.enTitle || cap.value.title)} — ${isVi.value ? cap.value.subtitle : (cap.value.enSubtitle || cap.value.subtitle)} | XKProduction`
    : 'Dịch Vụ | XKProduction',
  description: () => cap.value ? (isVi.value ? cap.value.summary : (cap.value.enSummary || cap.value.summary)) : '',
  ogTitle: () => cap.value ? `${isVi.value ? (cap.value.viTitle || cap.value.title) : (cap.value.enTitle || cap.value.title)} | XKProduction` : 'XKProduction Capabilities',
  ogDescription: () => cap.value ? (isVi.value ? cap.value.summary : (cap.value.enSummary || cap.value.summary)) : '',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogUrl: () => `https://xkproduction.com/services/${slug.value}`,
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
})

useSchemaOrg([
  defineWebPage({
    name: () => cap.value ? `${cap.value.viTitle || cap.value.title} - XKProduction` : 'XKProduction Service',
    description: () => cap.value?.summary || ''
  })
])
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
  gap: 0.2rem;
}

.price-tag-header {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.discount-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.35);
  color: #fbbf24;
  line-height: 1.2;
}

.price-val-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.meta-val-struck {
  font-size: 0.9375rem;
  color: var(--text-subtle);
  text-decoration: line-through;
  opacity: 0.7;
}

.cap-price-tag span.text-meta-mono {
  font-size: 0.6875rem;
}

.cap-price-tag strong {
  font-size: 1.25rem;
  color: var(--text-primary);
}

/* TECH SPECS STRIP */
.cap-tech-specs-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-top: 2.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--border-subtle);
  width: 100%;
}

.spec-strip-card {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.spec-label {
  font-size: 0.6875rem;
  color: #fbbf24;
  letter-spacing: 0.06em;
}

.spec-value {
  font-size: 1.125rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.3;
}

.spec-desc {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-top: 0.25rem;
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

/* WORKFLOW BLOCK */
.cap-workflow-block {
  margin-top: 1rem;
}

.workflow-steps-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.workflow-step-card {
  padding: 1.75rem 2rem;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.step-badge {
  font-size: 0.75rem;
  font-weight: 800;
  color: #14b8a6;
  background: rgba(20, 184, 166, 0.12);
  border: 1px solid rgba(20, 184, 166, 0.3);
  padding: 0.35rem 0.65rem;
  border-radius: 4px;
  white-space: nowrap;
  letter-spacing: 0.05em;
  flex-shrink: 0;
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.step-title {
  font-size: 1.125rem;
  color: var(--text-primary);
  font-weight: 700;
}

.step-desc {
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

/* SIDEBAR GUARANTEES */
.sidebar-guarantees-section {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-subtle);
}

.guarantees-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.guarantee-item {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
}

.guarantee-item i {
  color: #fbbf24;
  font-size: 0.8125rem;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.guarantee-item strong {
  display: block;
  font-size: 0.8125rem;
  color: var(--text-primary);
  line-height: 1.35;
  margin-bottom: 0.15rem;
}

.guarantee-item p {
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.45;
}

/* SIDEBAR DIRECT CONTACT */
.sidebar-direct-contact {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-subtle);
}

.direct-contact-note {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.45;
}

.btn-zalo-direct {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(22, 119, 255, 0.12);
  border: 1px solid rgba(22, 119, 255, 0.3);
  color: #60cfff;
  font-weight: 700;
  font-size: 0.8125rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-zalo-direct:hover {
  background: rgba(22, 119, 255, 0.22);
  border-color: rgba(22, 119, 255, 0.55);
  color: #ffffff;
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
  .cap-tech-specs-strip {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .cap-tech-specs-strip {
    grid-template-columns: 1fr;
  }
  .workflow-step-card {
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.5rem;
  }
}
</style>
