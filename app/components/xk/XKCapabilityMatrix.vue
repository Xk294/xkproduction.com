<template>
  <div class="xk-capability-matrix" role="region" :aria-label="isVi ? 'Hệ thống trụ cột năng lực sản xuất' : 'Core Production Capabilities Matrix'">
    <div class="capabilities-grid">
      <div
        v-for="(cap, idx) in capabilities"
        :key="cap.slug"
        class="capability-card matte-card"
      >
        <div class="card-top-row">
          <div class="cap-icon-box"><i :class="cap.icon"></i></div>
          <span class="badge-v2" :class="idx % 2 === 0 ? 'amber' : 'teal'">
            {{ isVi ? cap.badge : (cap.enBadge || cap.badge) }}
          </span>
        </div>

        <h3 class="cap-card-title">{{ isVi ? (cap.viTitle || cap.title) : (cap.enTitle || cap.title) }}</h3>
        <p class="cap-card-sub">{{ isVi ? cap.subtitle : (cap.enSubtitle || cap.subtitle) }}</p>
        <p class="cap-card-summary">{{ isVi ? cap.summary : (cap.enSummary || cap.summary) }}</p>

        <!-- DELIVERABLES LIST -->
        <div class="deliverables-box">
          <span class="text-meta-mono d-label">{{ isVi ? 'SẢN PHẨM BÀN GIAO:' : 'KEY DELIVERABLES:' }}</span>
          <ul class="deliverables-list">
            <li v-for="(item, dIdx) in (isVi ? cap.deliverables : (cap.enDeliverables || cap.deliverables)).slice(0, 3)" :key="dIdx">
              <i class="fa-solid fa-check"></i>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- FOOTER INVESTMENT & LINK -->
        <div class="cap-card-footer">
          <div class="investment-info">
            <span class="text-meta-mono">{{ isVi ? 'MỨC ĐẦU TƯ:' : 'INVESTMENT:' }}</span>
            <strong class="investment-val">{{ isVi ? cap.investmentStarting : (cap.enInvestmentStarting || cap.investmentStarting) }}</strong>
          </div>

          <NuxtLink :to="`/services/${cap.slug}`" class="btn-cap-details">
            <span>{{ isVi ? 'Chi tiết' : 'Details' }}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { XKCapability } from '~/types/production'
import { useLocale } from '~/composables/useLocale'

const { isVi } = useLocale()

defineProps<{
  capabilities: XKCapability[]
}>()
</script>

<style scoped>
.capabilities-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.capability-card {
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s var(--ease-out-expo), border-color 0.25s ease;
}

.capability-card:hover {
  transform: translateY(-4px);
  border-color: rgba(217, 119, 6, 0.4);
}

.card-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.cap-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #fbbf24;
}

.cap-card-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
}

.cap-card-sub {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #fbbf24;
  margin-bottom: 1rem;
}

.cap-card-summary {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.75rem;
  flex: 1;
}

.deliverables-box {
  background: rgba(0, 0, 0, 0.25);
  padding: 1.25rem;
  border-radius: 8px;
  border: 1px solid var(--border-subtle);
  margin-bottom: 1.75rem;
}

.d-label {
  display: block;
  font-size: 0.6875rem;
  color: var(--text-subtle);
  margin-bottom: 0.75rem;
}

.deliverables-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.deliverables-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.8125rem;
  color: var(--text-primary);
  line-height: 1.45;
}

.deliverables-list i {
  color: #0d9488;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.cap-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-subtle);
  gap: 1rem;
}

.investment-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.investment-info span {
  font-size: 0.6875rem;
}

.investment-val {
  font-size: 1rem;
  font-weight: 800;
  color: var(--text-primary);
}

.btn-cap-details {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-size: 0.8125rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.15s ease;
}

.btn-cap-details:hover {
  background: #ffffff;
  color: var(--bg-canvas);
  border-color: #ffffff;
}

@media (max-width: 900px) {
  .capabilities-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
