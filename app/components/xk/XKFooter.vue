<template>
  <footer class="xk-footer" role="contentinfo">
    <div class="editorial-container footer-container">
      <!-- TOP STATEMENT ROW -->
      <div class="footer-top-strip">
        <div class="footer-manifesto">
          <span class="badge-v2 amber">{{ isVi ? 'PHÒNG THU ÂM XKPRODUCTION' : 'XKPRODUCTION STUDIO' }}</span>
          <h2 class="footer-statement-title">{{ isVi ? 'ĐỒNG HÀNH CÙNG BẠN TỪ BẢN THU ĐẦU TIÊN.' : 'FROM YOUR FIRST DEMO TO FINAL MASTER.' }}</h2>
          <p class="footer-statement-sub">
            {{ isVi
              ? 'Phòng thu âm chuyên nghiệp, hoà âm phối khí và hoàn thiện bài hát tận tâm tại Thủ Đức, TP. Hồ Chí Minh & nhận làm online toàn quốc.'
              : 'Dedicated studio recording, custom music production, and balanced mix & mastering in Thu Duc, HCMC and online nationwide.'
            }}
          </p>
        </div>

        <div class="footer-cta-box">
          <NuxtLink to="/start-a-project" class="btn-footer-start">
            <span>{{ isVi ? 'LIÊN HỆ TƯ VẤN' : 'CONTACT STUDIO' }}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>
          <span class="footer-cta-meta text-meta-mono">{{ isVi ? 'HỖ TRỢ & TƯ VẤN NHANH TRONG NGÀY' : 'RESPONSE WITHIN 2 BUSINESS HOURS' }}</span>
        </div>
      </div>

      <!-- MAIN LINKS & INFO COLUMNS -->
      <div class="footer-main-grid">
        <!-- COL 1: STUDIO IDENTITY & LOCATION -->
        <div class="footer-col col-identity">
          <div class="studio-logo-row">
            <img src="/logo.png" alt="XKProduction Logo" class="f-logo" width="44" height="44" />
            <div>
              <strong class="f-brand">XKPRODUCTION</strong>
              <span class="f-coords text-meta-mono">10.8494° N, 106.7537° E</span>
            </div>
          </div>
          <p class="studio-address">
            <i class="fa-solid fa-location-dot"></i>
            Thủ Đức, Thành phố Hồ Chí Minh
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
          <span class="col-title text-meta-mono">{{ isVi ? 'NĂNG LỰC SẢN XUẤT' : 'CAPABILITIES' }}</span>
          <ul class="footer-links-list">
            <li><NuxtLink to="/services/music-production">{{ isVi ? 'Sản Xuất Âm Nhạc Trọn Gói' : 'Music Production' }}</NuxtLink></li>
            <li><NuxtLink to="/services/creative-sound">{{ isVi ? 'Kỹ Thuật Mix & Master' : 'Creative Sound (Mix & Master)' }}</NuxtLink></li>
            <li><NuxtLink to="/services/studio-recording">{{ isVi ? 'Thu Âm Studio Chuyên Nghiệp' : 'Studio Recording' }}</NuxtLink></li>
            <li><NuxtLink to="/services/project-production">{{ isVi ? 'Sản Xuất Đĩa & Album Dự Án' : 'Project Production' }}</NuxtLink></li>
            <li><NuxtLink to="/services/live-production">{{ isVi ? 'Âm Thanh Biểu Diễn & Sân Khấu' : 'Live Production & FOH' }}</NuxtLink></li>
            <li><NuxtLink to="/services/commercial-audio">{{ isVi ? 'Âm Thanh Quảng Cáo & TVC' : 'Commercial Audio & TVC' }}</NuxtLink></li>
            <li><NuxtLink to="/services">{{ isVi ? 'Tất Cả Giải Pháp' : 'All Services' }}</NuxtLink></li>
          </ul>
        </div>

        <!-- COL 3: EXPLORE -->
        <div class="footer-col">
          <span class="col-title text-meta-mono">{{ isVi ? 'KHÁM PHÁ' : 'EXPLORE' }}</span>
          <ul class="footer-links-list">
            <li><NuxtLink to="/work">{{ isVi ? 'Tác Phẩm Tuyển Chọn' : 'Selected Works' }}</NuxtLink></li>
            <li><NuxtLink to="/production">{{ isVi ? 'Quy Trình Sản Xuất (8 Bước)' : 'Production Process' }}</NuxtLink></li>
            <li><NuxtLink to="/about">{{ isVi ? 'Về Chúng Tôi & Triết Lý' : 'About & Philosophy' }}</NuxtLink></li>
            <li><NuxtLink to="/journal">{{ isVi ? 'Nhật Ký Phòng Thu' : 'Production Journal' }}</NuxtLink></li>
            <li><NuxtLink to="/build-project">{{ isVi ? 'Dự Toán Chi Phí Dự Án' : 'Project Builder' }}</NuxtLink></li>
            <li>
              <a :href="createTachnhacReferralUrl('footer_tachnhac')" target="_blank" rel="noopener" class="footer-tool-link" :title="isVi ? 'Tách beat, vocal & lọc tạp âm online bằng AI' : 'Free AI Vocal & Stem Separator'">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
                <span>{{ isVi ? 'Tách Nhạc AI (tachnhac.com)' : 'AI Stem Separator (tachnhac.com)' }}</span>
                <i class="fa-solid fa-arrow-up-right-from-square footer-ext-icon"></i>
              </a>
            </li>
          </ul>
        </div>

        <!-- COL 4: SOCIAL NETWORKS -->
        <div class="footer-col">
          <span class="col-title text-meta-mono">{{ isVi ? 'KÊNH TRUYỀN THÔNG' : 'CONNECT' }}</span>
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
          © {{ new Date().getFullYear() }} XKPRODUCTION. {{ isVi ? 'Bảo lưu mọi quyền. Nhà sản xuất âm nhạc Nguyễn Xuân Kiệt.' : 'All rights reserved. Music Producer & Founder Nguyen Xuan Kiet.' }}
        </span>
        <div class="footer-bottom-links">
          <NuxtLink to="/privacy">{{ isVi ? 'Chính sách bảo mật' : 'Privacy Policy' }}</NuxtLink>
          <NuxtLink to="/contact">{{ isVi ? 'Liên hệ trực tiếp' : 'Direct Contact' }}</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useLocale } from '~/composables/useLocale'

const { isVi } = useLocale()
</script>

<style scoped>
.xk-footer {
  background-color: var(--bg-canvas);
  border-top: 1px solid rgba(22, 119, 255, 0.2);
  padding-top: 5rem;
  padding-bottom: 3.5rem;
  position: relative;
  z-index: 10;
  box-shadow: 0 -1px 40px rgba(22, 119, 255, 0.06);
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
  letter-spacing: -0.005em;
  color: var(--text-primary);
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  line-height: 1.22;
  text-wrap: balance;
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
  background: linear-gradient(135deg, #1677FF 0%, #00B8FF 100%);
  color: #ffffff;
  font-weight: 800;
  font-size: 0.9375rem;
  letter-spacing: 0.06em;
  border-radius: 8px;
  border: 1px solid rgba(22, 119, 255, 0.5);
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 18px rgba(22, 119, 255, 0.32);
}

.btn-footer-start:hover {
  background: linear-gradient(135deg, #2488FF 0%, #22c5ff 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(22, 119, 255, 0.5);
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
  color: #60CFFF;
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
  color: #60CFFF;
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

.footer-tool-link {
  color: #fbbf24 !important;
}

.footer-tool-link i.fa-wand-magic-sparkles {
  color: #fbbf24;
}

.footer-ext-icon {
  font-size: 0.6875rem;
  opacity: 0.75;
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

@media (max-width: 768px) {
  .xk-footer {
    padding-bottom: calc(6.5rem + env(safe-area-inset-bottom, 0px));
  }
}

@media (max-width: 640px) {
  .footer-main-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
