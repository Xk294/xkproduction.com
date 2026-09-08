<script setup lang="ts">
// Pricing bundles component
</script>

<template>
  <section class="pricing-bundles max-width">
    <div class="section-header text-center">
      <span class="header-tag">GÓI COMBO</span>
      <h2>Tiết Kiệm Khi Mua Gói Trọn Gói</h2>
      <p class="subtitle">Kết hợp nhiều dịch vụ với giá ưu đãi — tối ưu chi phí, đảm bảo chất lượng đồng bộ từ đầu đến cuối</p>
    </div>

    <div class="bundles-grid">
      <!-- Bundle 1 -->
      <div class="glass-card bundle-card hover-lift">
        <div class="card-icon">
          <i class="fa-solid fa-microphone-lines"></i>
        </div>
        <h3 class="bundle-name">Gói Solo Artist (1 bài)</h3>
        <div class="price-section">
          <div class="price">900.000₫</div>
          <div class="price-compare">
            <span class="original-price">1.000.000₫</span>
            <span class="badge discount">TIẾT KIỆM 100.000₫</span>
          </div>
        </div>
        <ul class="features-list">
          <li><i class="fa-solid fa-check"></i> Thu âm tiêu chuẩn (1-2 tiếng)</li>
          <li><i class="fa-solid fa-check"></i> Vocal production đầy đủ (tune, timing)</li>
          <li><i class="fa-solid fa-check"></i> Mix & Master chuẩn Spotify</li>
          <li><i class="fa-solid fa-check"></i> Xuất file WAV + MP3 chất lượng cao</li>
          <li><i class="fa-solid fa-check"></i> 2 lần revision chỉnh sửa</li>
        </ul>
        <NuxtLink to="/contact?service=combo-solo" class="btn btn-secondary full-width">Chọn Gói Này</NuxtLink>
      </div>

      <!-- Bundle 2: Featured -->
      <div class="glass-card bundle-card featured hover-lift">
        <div class="featured-badge">PHỔ BIẾN NHẤT</div>
        <div class="card-icon">
          <i class="fa-solid fa-star"></i>
        </div>
        <h3 class="bundle-name">Gói Artist Pro (1 bài)</h3>
        <div class="price-section">
          <div class="price">3.500.000₫</div>
          <div class="price-compare">
            <span class="original-price">4.000.000₫</span>
            <span class="badge discount">TIẾT KIỆM 500.000₫</span>
          </div>
        </div>
        <ul class="features-list">
          <li><i class="fa-solid fa-check"></i> <strong>Hoà âm phối khí độc quyền</strong> (1 bài mới)</li>
          <li><i class="fa-solid fa-check"></i> Thu âm không giới hạn session</li>
          <li><i class="fa-solid fa-check"></i> Vocal coaching & direction chi tiết</li>
          <li><i class="fa-solid fa-check"></i> Mix & Master chuẩn phát hành thương mại</li>
          <li><i class="fa-solid fa-check"></i> 3 lần revision theo brief</li>
          <li><i class="fa-solid fa-check"></i> Bàn giao đầy đủ file Master & Multi-track stems</li>
        </ul>
        <NuxtLink to="/contact?service=combo-artist" class="btn btn-primary full-width">Chọn Gói Này</NuxtLink>
      </div>

      <!-- Bundle 3 -->
      <div class="glass-card bundle-card hover-lift">
        <div class="card-icon">
          <i class="fa-solid fa-compact-disc"></i>
        </div>
        <h3 class="bundle-name">Gói EP (3 bài)</h3>
        <div class="price-section">
          <div class="price">4.800.000₫</div>
          <div class="price-compare">
            <span class="original-price">5.800.000₫</span>
            <span class="badge discount">TIẾT KIỆM 1.000.000₫</span>
          </div>
        </div>
        <ul class="features-list">
          <li><i class="fa-solid fa-check"></i> Thu âm trọn bộ 3 bài hoàn chỉnh</li>
          <li><i class="fa-solid fa-check"></i> Mix & Master multi-track cả EP (3 bài)</li>
          <li><i class="fa-solid fa-check"></i> Concept mastering đồng bộ toàn EP</li>
          <li><i class="fa-solid fa-check"></i> Xuất đa định dạng chuẩn phát hành số</li>
          <li><i class="fa-solid fa-check"></i> Ưu tiên lịch thu (Priority booking)</li>
          <li><i class="fa-solid fa-check"></i> Hỗ trợ release strategy & tư vấn phân phối</li>
        </ul>
        <NuxtLink to="/contact?service=combo-ep" class="btn btn-secondary full-width">Chọn Gói Này</NuxtLink>
      </div>
    </div>

    <p class="bottom-note text-center">Giá trên là ước tính, liên hệ để nhận báo giá chính xác cho dự án của bạn</p>
  </section>
</template>

<style scoped>
.pricing-bundles {
  padding: 6rem 0;
}

.section-header {
  margin-bottom: 4rem;
}

.header-tag {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(26, 140, 255, 0.1);
  color: var(--primary);
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.subtitle {
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
}

.bundles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
  padding-top: 1.5rem;
  align-items: stretch;
}

.bundle-card {
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: visible !important;
}

.bundle-card.featured {
  border-color: rgba(26, 140, 255, 0.45);
  background: linear-gradient(180deg, rgba(26, 140, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  box-shadow: 0 12px 40px rgba(26, 140, 255, 0.18), 0 0 0 1px rgba(26, 140, 255, 0.25);
  transform: translateY(-10px);
  overflow: visible !important;
}

.bundle-card.featured:hover {
  transform: translateY(-14px);
  box-shadow: 0 16px 48px rgba(26, 140, 255, 0.25), 0 0 0 1px rgba(26, 140, 255, 0.4);
}

.featured-badge {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #1a8cff 0%, #00d4aa 100%);
  color: #fff;
  padding: 0.35rem 1.15rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(26, 140, 255, 0.45);
  z-index: 10;
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  color: var(--primary);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.bundle-card.featured .card-icon {
  background: rgba(26, 140, 255, 0.15);
  color: #1a8cff;
  border: 1px solid rgba(26, 140, 255, 0.3);
  box-shadow: 0 0 16px rgba(26, 140, 255, 0.2);
}

.bundle-name {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.price-section {
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1.5rem;
}

.price {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1;
  margin-bottom: 0.6rem;
  letter-spacing: -0.5px;
}

.price-compare {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.original-price {
  text-decoration: line-through;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.discount {
  background: rgba(0, 212, 170, 0.15);
  border: 1px solid rgba(0, 212, 170, 0.3);
  color: #00d4aa;
  padding: 0.2rem 0.65rem;
  border-radius: 8px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.3px;
  display: inline-block;
}

.features-list {
  list-style: none;
  flex-grow: 1;
  margin-bottom: 2rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.features-list li {
  color: var(--text-light);
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.92rem;
  line-height: 1.5;
}

.features-list i {
  color: #00d4aa;
  margin-top: 0.2rem;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.full-width {
  width: 100%;
  text-align: center;
  padding: 0.9rem 1.5rem;
  display: block;
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  margin-top: auto;
}

.bundle-card .btn-secondary {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.bundle-card .btn-secondary:hover {
  background: rgba(26, 140, 255, 0.15);
  border-color: rgba(26, 140, 255, 0.5);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(26, 140, 255, 0.25);
}

.bundle-card.featured .btn-primary {
  background: linear-gradient(135deg, #1a8cff 0%, #0070e0 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  box-shadow: 0 6px 24px rgba(26, 140, 255, 0.4);
}

.bundle-card.featured .btn-primary:hover {
  box-shadow: 0 8px 32px rgba(26, 140, 255, 0.6);
  transform: translateY(-2px);
}

.bottom-note {
  color: var(--text-muted);
  font-size: 0.9rem;
}

@media (max-width: 992px) {
  .bundles-grid {
    grid-template-columns: 1fr;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 1rem;
    gap: 2.5rem;
  }
  
  .bundle-card.featured {
    transform: none;
  }
  
  .bundle-card.featured:hover {
    transform: translateY(-4px);
  }
}
</style>
