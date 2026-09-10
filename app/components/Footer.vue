<template>
  <footer class="footer" role="contentinfo" itemscope itemtype="https://schema.org/Organization">
    <div class="max-width">
      <div class="footer-content">

        <!-- Brand Column -->
        <div class="footer-column footer-brand">
          <NuxtLink to="/" class="footer-logo-wrap" aria-label="XKProduction trang chủ">
            <img src="/images/logo-xkproduction.png" alt="XKProduction Logo" class="footer-logo-img" width="32" height="32" />
            <span class="footer-logo-text" itemprop="name">XKProduction</span>
          </NuxtLink>
          <p itemprop="description">Phòng thu âm chuyên nghiệp — Hoà âm phối khí — Mix & Master chuẩn quốc tế — Sân khấu sự kiện & Âm thanh ánh sáng trọn gói.</p>
          <div class="social-links" aria-label="Mạng xã hội XKProduction">
            <a href="https://www.facebook.com/ngxkiet" title="Facebook XKProduction" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="https://www.youtube.com/@Xkstudio29" title="YouTube XKProduction" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
            <a href="https://www.tiktok.com/@xkstudio" title="TikTok XKProduction" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>
            <a href="https://zalo.me/0355356294" title="Zalo XKProduction" target="_blank" rel="noopener noreferrer" aria-label="Zalo"><i class="fa-solid fa-comment"></i></a>
          </div>
        </div>

        <!-- Dịch vụ -->
        <div class="footer-column">
          <h4><i class="fa-solid fa-layer-group"></i> Dịch vụ</h4>
          <ul>
            <li><NuxtLink to="/thu-am">Thu âm &amp; Vocal Production</NuxtLink></li>
            <li><NuxtLink to="/mix-master">Mixing &amp; Mastering</NuxtLink></li>
            <li><NuxtLink to="/mix-online">Mix &amp; Master Online</NuxtLink></li>
            <li><NuxtLink to="/hoa-am-phoi-khi">Hòa âm phối khí</NuxtLink></li>
            <li><NuxtLink to="/b2b">Âm nhạc Doanh Nghiệp (B2B)</NuxtLink></li>
            <li><NuxtLink to="/presets">Vocal Presets &amp; Tài Nguyên</NuxtLink></li>
            <li><NuxtLink to="/quay-mv-tvc">Quay MV &amp; TVC</NuxtLink></li>
            <li><NuxtLink to="/live-band">Live Band &amp; Sự kiện</NuxtLink></li>
            <li><NuxtLink to="/courses">Khoá học Music Producer</NuxtLink></li>
          </ul>
        </div>

        <!-- Trang -->
        <div class="footer-column">
          <h4><i class="fa-solid fa-sitemap"></i> Trang</h4>
          <ul>
            <li><NuxtLink to="/">Trang chủ</NuxtLink></li>
            <li><NuxtLink to="/services">Dịch vụ &amp; Bảng giá</NuxtLink></li>
            <li><NuxtLink to="/about">Giới Thiệu</NuxtLink></li>
            <li><NuxtLink to="/work">Dự án &amp; Tác phẩm</NuxtLink></li>
            <li><NuxtLink to="/journal">Journal &amp; Kiến thức</NuxtLink></li>
            <li><NuxtLink to="/faq">Hỏi &amp; Đáp (FAQ)</NuxtLink></li>
            <li><NuxtLink to="/contact">Liên hệ</NuxtLink></li>
            <li><NuxtLink to="/privacy">Chính sách Bảo mật</NuxtLink></li>
          </ul>
        </div>

        <!-- Liên hệ -->
        <div class="footer-column">
          <h4><i class="fa-solid fa-headset"></i> Liên hệ</h4>
          <ul class="contact-list" itemprop="contactPoint">
            <li>
              <a href="tel:0355356294" itemprop="telephone" title="Gọi điện cho XKProduction">
                <i class="fa-solid fa-phone"></i>
                <span>0355.356.294</span>
              </a>
            </li>
            <li>
              <a href="mailto:nguyenxuankiet294@gmail.com" itemprop="email" title="Email Nguyễn Xuân Kiệt">
                <i class="fa-solid fa-envelope"></i>
                <span>nguyenxuankiet294@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="https://zalo.me/0355356294" target="_blank" rel="noopener noreferrer" title="Zalo Nguyễn Xuân Kiệt">
                <i class="fa-solid fa-comment"></i>
                <span>Zalo: 0355.356.294</span>
              </a>
            </li>
            <li class="footer-address" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
              <i class="fa-solid fa-location-dot"></i>
              <span itemprop="streetAddress">QL14 km25, Nghĩa Trung, Bù Đăng, <span itemprop="addressRegion">Bình Phước</span></span>
            </li>
          </ul>
          <div class="footer-hours">
            <i class="fa-solid fa-clock"></i>
            <div>
              <span class="footer-hours-title">Giờ mở cửa</span>
              <span>T2–T6: 7:00 – 22:00</span>
              <span>T7–CN: 8:00 – 20:00</span>
            </div>
          </div>
          <div class="footer-domain">
            <i class="fa-solid fa-globe"></i>
            <a href="https://xkproduction.com" itemprop="url" rel="canonical">xkproduction.com</a>
          </div>
        </div>

      </div>

      <div class="footer-bottom">
        <p>© {{ new Date().getFullYear() }} <strong>Nguyễn Xuân Kiệt</strong> — <a href="https://xkproduction.com">xkproduction.com</a>. Tất cả quyền được bảo lưu.</p>
        <p class="footer-tagline">Chạm đến trái tim bằng âm thanh 🎵</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #030508;
  border-top: 1px solid rgba(255, 255, 255, 0.035);
  margin-top: 0;
  padding: 3.5rem 2rem 0;
  position: relative;
  z-index: 1;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.footer-logo-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  margin-bottom: 1.25rem;
}
.footer-logo-img {
  width: 32px; height: 32px;
  object-fit: cover; border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: border-color 0.3s ease;
}
.footer-logo-wrap:hover .footer-logo-img {
  border-color: var(--primary);
}
.footer-logo-text {
  font-size: 1.2rem; font-weight: 700;
  color: var(--text-main);
  letter-spacing: -0.01em;
}

.footer-column p {
  color: var(--text-light);
  font-size: 0.85rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.footer-column h4 {
  color: var(--text-main);
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
}
.footer-column h4 i {
  color: var(--primary);
  font-size: 0.8rem;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column ul li {
  margin-bottom: 0.75rem;
}

.footer-column a {
  color: var(--text-light);
  text-decoration: none;
  transition: color 0.25s ease;
  font-size: 0.82rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.footer-column a:hover {
  color: var(--text-main);
}

/* Contact list */
.contact-list li { margin-bottom: 0.85rem; }
.contact-list a {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
}
.contact-list i {
  color: var(--primary);
  font-size: 0.8rem;
  margin-top: 0.2rem;
  flex-shrink: 0;
}

.footer-address {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  color: var(--text-light);
  font-size: 0.82rem;
  line-height: 1.6;
}
.footer-address i { color: var(--primary); font-size: 0.8rem; margin-top: 0.2rem; flex-shrink: 0; }

.footer-hours {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  margin-top: 1rem;
  padding: 0.85rem 1.1rem;
  background: rgba(255, 255, 255, 0.015);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 6px;
}
.footer-hours > i { color: var(--primary); font-size: 0.8rem; margin-top: 0.15rem; flex-shrink: 0; }
.footer-hours > div { display: flex; flex-direction: column; gap: 0.25rem; }
.footer-hours-title { color: var(--text-main); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; }
.footer-hours span:not(.footer-hours-title) { color: var(--text-light); font-size: 0.78rem; }

.footer-domain {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
  padding: 0.6rem 1.1rem;
  background: rgba(255, 255, 255, 0.022);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  width: fit-content;
}
.footer-domain i { color: var(--primary); font-size: 0.8rem; }
.footer-domain a {
  color: var(--text-main);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.footer-domain a:hover { color: var(--primary); }

/* Social links */
.social-links {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.social-links a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px; height: 32px;
  background: rgba(255, 255, 255, 0.022);
  color: var(--text-light);
  text-decoration: none;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.28s ease;
  font-size: 0.8rem;
  padding: 0 !important;
}

.social-links a:hover {
  background: var(--text-main);
  color: var(--bg-dark);
  border-color: var(--text-main);
  transform: translateY(-2px);
}

/* Footer bottom */
.footer-bottom {
  text-align: center;
  padding: 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-bottom p {
  color: var(--text-muted);
  font-size: 0.8rem;
}
.footer-bottom strong { color: var(--text-light); }
.footer-bottom a { color: var(--text-light); font-weight: 600; }
.footer-bottom a:hover { color: var(--text-main); }
.footer-tagline {
  color: var(--text-muted);
  font-size: 0.78rem;
  font-style: italic;
}

/* Responsive */
@media (max-width: 992px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 600px) {
  .footer { padding: 4rem 1.5rem 0; }
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
}
</style>
