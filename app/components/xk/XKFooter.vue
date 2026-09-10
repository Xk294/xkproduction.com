<template>
  <footer class="xk-footer" role="contentinfo">
    <div class="editorial-container footer-container">
      <!-- TOP STATEMENT ROW -->
      <div class="footer-top-strip">
        <div class="footer-manifesto">
          <span class="badge-v2 amber">CREATIVE PRODUCTION HOUSE</span>
          <h2 class="footer-statement-title">FROM IDEA TO FINAL WORK.</h2>
          <p class="footer-statement-sub">
            Đồng hành cùng nghệ sĩ, nhà sáng tạo và thương hiệu từ giai điệu sơ khởi đến bản thu phát hành chuẩn quốc tế.
          </p>
        </div>

        <div class="footer-cta-box">
          <NuxtLink to="/start-a-project" class="btn-footer-start">
            <span>KHỞI ĐỘNG DỰ ÁN</span>
            <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>
          <span class="footer-cta-meta text-meta-mono">PHẢN HỒI BRIEF TRONG 2 GIỜ LÀM VIỆC</span>
        </div>
      </div>

      <!-- MAIN LINKS & INFO COLUMNS -->
      <div class="footer-main-grid">
        <!-- COL 1: STUDIO IDENTITY & LOCATION -->
        <div class="footer-col col-identity">
          <div class="studio-logo-row">
            <img src="/images/logo-xkproduction.png" alt="XKProduction Logo" class="f-logo" width="44" height="44" />
            <div>
              <strong class="f-brand">XKPRODUCTION</strong>
              <span class="f-coords text-meta-mono">11.8350° N, 107.0150° E</span>
            </div>
          </div>
          <p class="studio-address">
            <i class="fa-solid fa-location-dot"></i>
            QL14 km25, xã Nghĩa Trung, Huyện Bù Đăng, Tỉnh Bình Phước
          </p>
          <div class="studio-direct-links">
            <a href="tel:0355356294" class="direct-link">
              <i class="fa-solid fa-phone"></i> 0355.356.294 (Hotline & Zalo)
            </a>
            <a href="mailto:nguyenxuankiet294@gmail.com" class="direct-link">
              <i class="fa-solid fa-envelope"></i> nguyenxuankiet294@gmail.com
            </a>
          </div>
        </div>

        <!-- COL 2: CAPABILITIES -->
        <div class="footer-col">
          <span class="col-title text-meta-mono">NĂNG LỰC SẢN XUẤT</span>
          <ul class="footer-links-list">
            <li><NuxtLink to="/services/music-production">Music Production</NuxtLink></li>
            <li><NuxtLink to="/services/creative-sound">Creative Sound (Mix & Master)</NuxtLink></li>
            <li><NuxtLink to="/services/live-production">Live Production & FOH</NuxtLink></li>
            <li><NuxtLink to="/services/project-production">Project Production (Trọn Gói)</NuxtLink></li>
            <li><NuxtLink to="/services">Tất Cả Giải Pháp</NuxtLink></li>
          </ul>
        </div>

        <!-- COL 3: EXPLORE -->
        <div class="footer-col">
          <span class="col-title text-meta-mono">KHÁM PHÁ</span>
          <ul class="footer-links-list">
            <li><NuxtLink to="/work">Work (Portfolio Dự Án)</NuxtLink></li>
            <li><NuxtLink to="/production">Production Process (8 Bước)</NuxtLink></li>
            <li><NuxtLink to="/releases">Releases (Kho Đĩa Số)</NuxtLink></li>
            <li><NuxtLink to="/about">About (Founder & Triết Lý)</NuxtLink></li>
            <li><NuxtLink to="/journal">Journal (Production Notes)</NuxtLink></li>
            <li><NuxtLink to="/build-project">Project Builder</NuxtLink></li>
          </ul>
        </div>

        <!-- COL 4: SOCIAL NETWORKS -->
        <div class="footer-col">
          <span class="col-title text-meta-mono">KÊNH TRUYỀN THÔNG</span>
          <ul class="footer-links-list">
            <li>
              <a href="https://www.youtube.com/@Xkstudio29" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-youtube"></i> YouTube Channel
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@xkstudio" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-tiktok"></i> TikTok Studio
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/ngxkiet" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-facebook"></i> Facebook Profile
              </a>
            </li>
            <li>
              <a href="https://zalo.me/0355356294" target="_blank" rel="noopener noreferrer">
                <i class="fa-solid fa-comment-dots"></i> Zalo Official
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- BOTTOM COPYRIGHT ROW -->
      <div class="footer-bottom-row">
        <span class="copyright-text">
          © {{ new Date().getFullYear() }} XKPRODUCTION. All rights reserved. Music Producer & Founder Nguyễn Xuân Kiệt.
        </span>
        <div class="footer-bottom-links">
          <NuxtLink to="/privacy">Chính sách bảo mật</NuxtLink>
          <NuxtLink to="/contact">Liên hệ trực tiếp</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.xk-footer {
  background-color: var(--bg-canvas);
  border-top: 1px solid var(--border-subtle);
  padding-top: 5rem;
  padding-bottom: 3.5rem;
  position: relative;
  z-index: 10;
}

.footer-top-strip {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 3.5rem;
  border-bottom: 1px solid var(--border-subtle);
  gap: 2rem;
  flex-wrap: wrap;
}

.footer-statement-title {
  font-size: clamp(2rem, 5vw, 3.8rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  line-height: 1.1;
}

.footer-statement-sub {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  max-width: 600px;
  line-height: 1.6;
}

.footer-cta-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
}

.btn-footer-start {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: var(--text-primary);
  color: var(--bg-canvas);
  font-weight: 800;
  font-size: 0.9375rem;
  letter-spacing: 0.06em;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.btn-footer-start:hover {
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 0 24px rgba(255, 255, 255, 0.3);
}

.footer-cta-meta {
  font-size: 0.6875rem;
  color: var(--text-subtle);
}

/* MAIN GRID */
.footer-main-grid {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1.2fr 1fr;
  gap: 3rem;
  padding: 4rem 0 3rem;
  border-bottom: 1px solid var(--border-subtle);
}

.col-identity {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.studio-logo-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.f-logo {
  border-radius: 8px;
}

.f-brand {
  display: block;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--text-primary);
}

.f-coords {
  font-size: 0.6875rem;
  color: var(--text-subtle);
}

.studio-address {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.studio-address i {
  color: #d97706;
  margin-top: 0.25rem;
}

.studio-direct-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.direct-link {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.15s ease;
}

.direct-link:hover {
  color: #fbbf24;
}

.col-title {
  display: block;
  font-size: 0.75rem;
  color: var(--text-subtle);
  margin-bottom: 1.25rem;
}

.footer-links-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links-list a {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.15s ease, transform 0.15s ease;
}

.footer-links-list a:hover {
  color: var(--text-primary);
  transform: translateX(3px);
}

/* BOTTOM ROW */
.footer-bottom-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
  font-size: 0.8125rem;
  color: var(--text-subtle);
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-bottom-links {
  display: flex;
  gap: 1.5rem;
}

.footer-bottom-links a {
  color: var(--text-subtle);
  text-decoration: none;
  transition: color 0.15s ease;
}

.footer-bottom-links a:hover {
  color: var(--text-primary);
}

@media (max-width: 1024px) {
  .footer-main-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 640px) {
  .footer-main-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
