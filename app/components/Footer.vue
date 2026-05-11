<template>
  <footer class="footer" role="contentinfo" itemscope itemtype="https://schema.org/Organization">
    <div class="max-width">
      <div class="footer-content">

        <!-- Brand Column -->
        <div class="footer-column footer-brand">
          <NuxtLink to="/" class="footer-logo-wrap" aria-label="XKProduction trang chủ">
            <img src="/images/Logoxkfix.png" alt="XKProduction Logo" class="footer-logo-img" />
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
            <li><NuxtLink to="/services#thu-am">Thu âm &amp; Vocal Production</NuxtLink></li>
            <li><NuxtLink to="/services#mix-master">Mixing &amp; Mastering</NuxtLink></li>
            <li><NuxtLink to="/services#hoa-am">Hòa âm phối khí</NuxtLink></li>
            <li><NuxtLink to="/services">Quay MV &amp; TVC</NuxtLink></li>
            <li><NuxtLink to="/live-band">Live Band &amp; Sự kiện</NuxtLink></li>
            <li><NuxtLink to="/courses">Khoá học Music Producer</NuxtLink></li>
          </ul>
        </div>

        <!-- Trang -->
        <div class="footer-column">
          <h4><i class="fa-solid fa-sitemap"></i> Trang</h4>
          <ul>
            <li><NuxtLink to="/">Trang chủ</NuxtLink></li>
            <li><NuxtLink to="/about">Giới Thiệu</NuxtLink></li>
            <li><NuxtLink to="/products">Sản phẩm</NuxtLink></li>
            <li><NuxtLink to="/blog">Blog & Kiến thức</NuxtLink></li>
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
              <a href="mailto:xkstudio29@gmail.com" itemprop="email" title="Email XKProduction">
                <i class="fa-solid fa-envelope"></i>
                <span>xkstudio29@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="https://zalo.me/0355356294" target="_blank" rel="noopener noreferrer" title="Zalo XKProduction">
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
        <p>© {{ new Date().getFullYear() }} <strong>XKProduction</strong> — <a href="https://xkproduction.com">xkproduction.com</a>. Tất cả quyền được bảo lưu.</p>
        <p class="footer-tagline">Chạm đến trái tim bằng âm thanh 🎵</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(180deg, var(--bg-surface) 0%, #06080f 100%);
  border-top: 1px solid rgba(26, 140, 255, 0.1);
  margin-top: 0;
  padding: 4rem 2rem 0;
  position: relative;
  z-index: 1;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0; left: 50%; transform: translateX(-50%);
  width: 600px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(26,140,255,0.4), transparent);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

/* Brand column */
.footer-brand {}
.footer-logo-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  margin-bottom: 1rem;
}
.footer-logo-img {
  width: 40px; height: 40px;
  object-fit: cover; border-radius: 50%;
  filter: drop-shadow(0 0 8px rgba(26,140,255,0.5));
  transition: filter 0.3s ease;
}
.footer-logo-wrap:hover .footer-logo-img {
  filter: drop-shadow(0 0 14px rgba(26,140,255,0.9));
}
.footer-logo-text {
  font-size: 1.25rem; font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.3px;
}

.footer-column p {
  color: var(--text-light);
  font-size: 0.88rem;
  line-height: 1.7;
  margin-bottom: 1.25rem;
}

.footer-column h4 {
  color: var(--text-main);
  margin-bottom: 1.25rem;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.footer-column h4 i {
  color: var(--primary);
  font-size: 0.85rem;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column ul li {
  margin-bottom: 0.6rem;
}

.footer-column a {
  color: var(--text-light);
  text-decoration: none;
  transition: color 0.25s ease, padding-left 0.25s ease;
  font-size: 0.88rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.footer-column a:hover {
  color: var(--primary);
  padding-left: 4px;
}

/* Contact list */
.contact-list li { margin-bottom: 0.75rem; }
.contact-list a {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding-left: 0 !important;
}
.contact-list a:hover { padding-left: 0 !important; color: var(--primary); }
.contact-list i {
  color: var(--primary);
  font-size: 0.85rem;
  margin-top: 0.1rem;
  flex-shrink: 0;
}

.footer-address {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  color: var(--text-light);
  font-size: 0.88rem;
  line-height: 1.5;
}
.footer-address i { color: var(--primary); font-size: 0.85rem; margin-top: 0.1rem; flex-shrink: 0; }

.footer-hours {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  margin-top: 0.85rem;
  padding: 0.6rem 0.85rem;
  background: rgba(26,140,255,0.04);
  border: 1px solid rgba(26,140,255,0.1);
  border-radius: 8px;
}
.footer-hours > i { color: var(--primary); font-size: 0.85rem; margin-top: 0.15rem; flex-shrink: 0; }
.footer-hours > div { display: flex; flex-direction: column; gap: 0.15rem; }
.footer-hours-title { color: var(--text-main); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.3px; }
.footer-hours span:not(.footer-hours-title) { color: var(--text-light); font-size: 0.8rem; }

.footer-domain {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.5rem 0.85rem;
  background: rgba(26,140,255,0.06);
  border: 1px solid rgba(26,140,255,0.15);
  border-radius: 8px;
  width: fit-content;
}
.footer-domain i { color: var(--primary); font-size: 0.8rem; }
.footer-domain a {
  color: var(--primary);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.3px;
}
.footer-domain a:hover { color: var(--accent); padding-left: 0; }

/* Social links */
.social-links {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.5rem;
}

.social-links a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px; height: 36px;
  background: rgba(255,255,255,0.05);
  color: var(--text-light);
  text-decoration: none;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.07);
  transition: all 0.28s ease;
  font-size: 0.85rem;
  padding-left: 0 !important;
}

.social-links a:hover {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
  box-shadow: 0 0 16px rgba(26,140,255,0.4);
  transform: translateY(-2px);
}

/* Footer bottom */
.footer-bottom {
  text-align: center;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255,255,255,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.footer-bottom p {
  color: var(--text-muted);
  font-size: 0.82rem;
}
.footer-bottom strong { color: var(--text-light); }
.footer-bottom a { color: var(--primary); font-weight: 600; }
.footer-bottom a:hover { color: var(--accent); }
.footer-tagline {
  color: var(--text-muted);
  font-size: 0.8rem;
  font-style: italic;
}

/* Responsive */
@media (max-width: 992px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 600px) {
  .footer { padding: 3rem 1.5rem 0; }
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
