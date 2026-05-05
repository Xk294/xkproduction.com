<template>
  <div>
    <!-- HERO -->
    <section class="page-hero">
      <div class="max-width">
        <div class="hero-tag">SOUND & LIGHT · LIVE BAND · SỰ KIỆN</div>
        <h1>Quốc Chí Sound & Lighting</h1>
        <p class="hero-subtitle">Giải pháp Âm thanh, Ánh sáng & Ban nhạc chuyên nghiệp cho mọi sự kiện.<br/>Đối tác chiến lược của XKProduction trong lĩnh vực event & biểu diễn trực tiếp.</p>
      </div>
    </section>

    <!-- INTRO -->
    <section class="lb-intro">
      <div class="max-width lb-intro-grid">
        <div class="lb-intro-text">
          <h2>Đồng hành cùng mọi sân khấu</h2>
          <p>
            Quốc Chí Sound & Lighting là đơn vị chuyên cung cấp dịch vụ âm thanh, ánh sáng và ban nhạc live cho các sự kiện từ quy mô nhỏ đến lớn: đám cưới, tiệc doanh nghiệp, gala dinner, lễ hội âm nhạc, hội nghị, ra mắt sản phẩm và các chương trình truyền hình.
          </p>
          <p>
            Với đội ngũ kỹ thuật viên dày dặn kinh nghiệm, thiết bị hiện đại và quy trình vận hành chuyên nghiệp, chúng tôi cam kết mang đến trải nghiệm âm thanh - ánh sáng hoàn hảo cho mọi không gian.
          </p>
        </div>
        <div class="lb-intro-highlights">
          <div class="highlight-item">
            <span class="highlight-icon"><i class="fa-solid fa-volume-high"></i></span>
            <div>
              <strong>Hệ thống Line Array</strong>
              <p>Loa array công suất lớn, phủ đều mọi không gian từ 50 đến 5000 khách.</p>
            </div>
          </div>
          <div class="highlight-item">
            <span class="highlight-icon"><i class="fa-solid fa-lightbulb"></i></span>
            <div>
              <strong>Ánh sáng chuyên nghiệp</strong>
              <p>Moving head, LED par, laser, màn hình LED – thiết kế sáng tạo theo concept.</p>
            </div>
          </div>
          <div class="highlight-item">
            <span class="highlight-icon"><i class="fa-solid fa-guitar"></i></span>
            <div>
              <strong>Ban nhạc Live</strong>
              <p>Acoustic duo, full band, DJ – biểu diễn đa phong cách, chuyên nghiệp.</p>
            </div>
          </div>
          <div class="highlight-item">
            <span class="highlight-icon"><i class="fa-solid fa-sliders"></i></span>
            <div>
              <strong>Kỹ thuật viên FOH/Monitor</strong>
              <p>Đội ngũ engineer kinh nghiệm thực chiến, đảm bảo chất lượng tuyệt đối.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- GALLERY -->
    <section class="lb-gallery">
      <div class="max-width">
        <h2 class="lb-gallery-title">Hình ảnh thực tế</h2>
        <div class="lb-gallery-grid">
          <div class="lb-gallery-item">
            <img src="/images/quocchi-2.jpg" alt="Hệ thống âm thanh ánh sáng sân khấu sự kiện XKProduction - Quốc Chí Sound & Lighting" />
          </div>
          <div class="lb-gallery-item">
            <img src="/images/quocchi-3.jpg" alt="Ban nhạc live biểu chuyên nghiệp tại sự kiện - XKProduction" />
          </div>
          <div class="lb-gallery-item">
            <img src="/images/quocchi-3.jpg" alt="Thiết kế sân khấu và lắp đặt âm thanh ánh sáng chuyên nghiệp" />
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section class="lb-services">
      <div class="max-width">
        <h2>Dịch vụ cung cấp</h2>
        <p class="section-subtitle">Giải pháp trọn gói hoặc riêng lẻ cho mọi nhu cầu sự kiện</p>

        <div class="lb-services-grid">
          <div v-for="s in services" :key="s.title" class="lb-service-card">
            <div class="lb-service-icon"><i :class="s.faIcon"></i></div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
            <ul>
              <li v-for="f in s.features" :key="f">{{ f }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- PACKAGES -->
    <section class="lb-packages">
      <div class="max-width">
        <h2>Gói dịch vụ tiêu biểu</h2>
        <p class="section-subtitle">Linh hoạt theo quy mô & ngân sách sự kiện</p>

        <div class="lb-packages-grid">
          <div v-for="pkg in packages" :key="pkg.name" class="lb-package-card" :class="{ featured: pkg.featured }">
            <span v-if="pkg.featured" class="badge">Phổ biến nhất</span>
            <h3>{{ pkg.name }}</h3>
            <p class="pkg-scale">{{ pkg.scale }}</p>
            <ul>
              <li v-for="item in pkg.includes" :key="item"><i class="fa-solid fa-check"></i> {{ item }}</li>
            </ul>
            <NuxtLink to="/contact" class="btn btn-primary pkg-cta">Nhận báo giá</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="lb-stats">
      <div class="max-width lb-stats-grid">
        <div class="lb-stat">
          <div class="lb-stat-number">500+</div>
          <p>Sự kiện đã triển khai thành công</p>
        </div>
        <div class="lb-stat">
          <div class="lb-stat-number">10 năm</div>
          <p>Kinh nghiệm trong lĩnh vực event</p>
        </div>
        <div class="lb-stat">
          <div class="lb-stat-number">50+</div>
          <p>Đối tác doanh nghiệp & agency</p>
        </div>
        <div class="lb-stat">
          <div class="lb-stat-number">100%</div>
          <p>Khách hàng hài lòng & quay lại</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="final-cta">
      <div class="max-width">
        <h2>Bạn đang chuẩn bị cho sự kiện tiếp theo?</h2>
        <p>Hãy chia sẻ quy mô, địa điểm và timeline – chúng tôi sẽ tư vấn giải pháp âm thanh, ánh sáng & ban nhạc phù hợp nhất.</p>

        <div class="cta-buttons">
          <NuxtLink to="/contact" class="btn btn-primary">Nhận báo giá sự kiện</NuxtLink>
          <NuxtLink to="/services" class="btn btn-secondary">Xem thêm dịch vụ Studio</NuxtLink>
        </div>

        <div class="cta-footer">
          <p><i class="fa-solid fa-phone"></i> Hotline: <a href="tel:0355356294">0355.356.294</a></p>
          <p><i class="fa-solid fa-envelope"></i> Email: <a href="mailto:xkstudio29@gmail.com">xkstudio29@gmail.com</a></p>
          <p><i class="fa-solid fa-comment"></i> Zalo: <a href="https://zalo.me/0355356294" target="_blank" rel="noopener">0355.356.294</a></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Cho thuê Âm thanh Ánh sáng, Ban nhạc Live & Sân khấu Sự kiện - XKProduction',
  description: 'Cho thuê âm thanh, ánh sáng sân khấu chuyên nghiệp & ban nhạc live cho đám cưới, gala, festival, hội nghị. Hệ thống line array, moving head, LED hiện đại. Hotline: 0355.356.294.',
  ogTitle: 'Cho thuê Âm thanh, Ánh sáng Sân khấu & Ban nhạc Sự kiện - XKProduction',
  ogDescription: 'Giải pháp trọn gói âm thanh, ánh sáng, sân khấu & ban nhạc live cho mọi quy mô sự kiện. Hệ thống line array JBL/RCF, moving head, laser chuyên nghiệp.',
  ogImage: 'https://xkproduction.com/images/quocchi-2.jpg',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Cho thuê âm thanh ánh sáng sân khấu XKProduction',
  ogUrl: 'https://xkproduction.com/live-band',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xkproduction.com/images/quocchi-2.jpg',
  keywords: 'cho thuê âm thanh, cho thuê ánh sáng, sân khấu sự kiện, âm thanh ánh sáng, ban nhạc live, band nhạc sự kiện, sound light, âm thanh ánh sáng đám cưới, XKProduction'
})

useSchemaOrg([
  defineWebPage({
    name: 'Cho thuê Âm thanh Ánh sáng & Sân khấu Sự kiện - XKProduction',
    description: 'Cho thuê âm thanh, ánh sáng sân khấu & ban nhạc live chuyên nghiệp cho mọi sự kiện tại XKProduction.'
  }),
  {
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Trang chủ', 'item': 'https://xkproduction.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Quốc Chí Sound & Lighting', 'item': 'https://xkproduction.com/live-band' }
    ]
  },
  defineProduct({
    name: 'Dịch vụ Cho Thuê Âm Thanh Sân Khấu',
    description: 'Hệ thống loa line array, sub, monitor chuyên nghiệp cho mọi không gian sự kiện.',
    provider: { name: 'XKProduction', url: 'https://xkproduction.com' }
  }),
  defineProduct({
    name: 'Dịch vụ Cho Thuê Ánh Sáng Sân Khấu',
    description: 'Thiết kế ánh sáng sân khấu từ cổ điển đến hiện đại: moving head, LED par, laser show, màn hình LED.',
    provider: { name: 'XKProduction', url: 'https://xkproduction.com' }
  }),
  defineProduct({
    name: 'Dịch vụ Ban Nhạc Live Sự Kiện',
    description: 'Cung cấp ban nhạc live chuyên nghiệp: Acoustic duo, full band 5-7 thành viên, DJ & MC cho mọi loại sự kiện.',
    provider: { name: 'XKProduction', url: 'https://xkproduction.com' }
  })
])

useScrollAnimation()

const services = [
  {
    faIcon: 'fa-solid fa-volume-high fa-2x',
    title: 'Cho thuê Âm thanh',
    desc: 'Hệ thống loa line array, sub, monitor chuyên nghiệp cho mọi không gian.',
    features: ['Loa line array JBL / RCF / QSC', 'Mixer digital Allen & Heath / Yamaha', 'Micro không dây Shure / Sennheiser', 'Kỹ thuật viên FOH & Monitor']
  },
  {
    faIcon: 'fa-solid fa-lightbulb fa-2x',
    title: 'Cho thuê Ánh sáng',
    desc: 'Thiết kế ánh sáng sân khấu từ cổ điển đến hiện đại, theo concept riêng.',
    features: ['Moving head beam / wash / spot', 'LED par, LED bar, strobe', 'Máy khói, laser show', 'Màn hình LED indoor / outdoor']
  },
  {
    faIcon: 'fa-solid fa-guitar fa-2x',
    title: 'Ban nhạc Live',
    desc: 'Cung cấp ban nhạc chuyên nghiệp, biểu diễn đa phong cách cho sự kiện.',
    features: ['Acoustic duo / trio', 'Full band (5-7 thành viên)', 'DJ & MC chuyên nghiệp', 'Ca sĩ khách mời theo yêu cầu']
  },
  {
    faIcon: 'fa-solid fa-star fa-2x',
    title: 'Setup Sân khấu trọn gói',
    desc: 'Thiết kế, dựng sân khấu và vận hành kỹ thuật toàn bộ chương trình.',
    features: ['Sân khấu modular linh hoạt', 'Backdrop & truss chuyên dụng', 'Hệ thống rigging an toàn', 'Đội ngũ stage manager']
  }
]

const packages = [
  {
    name: 'Gói Tiệc & Đám cưới',
    scale: '50 – 300 khách',
    featured: false,
    includes: ['Hệ thống loa active 2-4 top', 'Ánh sáng LED par + moving head', 'Micro không dây 2-4 cây', 'Acoustic duo hoặc DJ', 'Kỹ thuật viên vận hành']
  },
  {
    name: 'Gói Gala & Doanh nghiệp',
    scale: '300 – 1000 khách',
    featured: true,
    includes: ['Loa line array 8-12 top + sub', 'Full light show (beam, wash, LED)', 'Mixer digital + micro premium', 'Full band 5-7 thành viên', 'FOH + Monitor engineer', 'Màn hình LED sân khấu']
  },
  {
    name: 'Gói Festival & Ngoài trời',
    scale: '1000 – 5000+ khách',
    featured: false,
    includes: ['Line array đôi + delay tower', 'Light show + laser chuyên nghiệp', 'Sân khấu modular lớn + truss', 'Multiple band & DJ set', 'Đội ngũ kỹ thuật đầy đủ', 'Stage manager + giám sát']
  }
]
</script>

<style scoped>
.page-hero {
  padding-top: 140px;
  padding-bottom: 4rem;
  background: linear-gradient(135deg, #06080f 0%, #0d1117 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.page-hero::before {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(26, 140, 255, 0.06) 0%, transparent 70%);
  top: 30%;
  left: -10%;
  animation: float 8s ease-in-out infinite;
}

.page-hero::after {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(0, 212, 170, 0.04) 0%, transparent 70%);
  bottom: -15%;
  right: -5%;
  animation: float 10s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(20px); }
}

.hero-tag {
  display: inline-block;
  padding: 0.4rem 1.2rem;
  border: 1px solid rgba(26, 140, 255, 0.3);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 2px;
  color: var(--primary);
  margin-bottom: 2rem;
  background: rgba(26, 140, 255, 0.06);
}

/* QC Logo */
.qc-logo-wrap {
  margin: 0 auto 2rem;
  display: flex;
  justify-content: center;
}
.qc-logo {
  width: 220px;
  height: 220px;
  object-fit: contain;
  border-radius: 50%;
  box-shadow: 0 0 60px rgba(255, 165, 0, 0.3), 0 0 120px rgba(255, 165, 0, 0.1);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  animation: logoFloat 4s ease-in-out infinite;
}
.qc-logo:hover {
  transform: scale(1.05);
  box-shadow: 0 0 80px rgba(255, 165, 0, 0.5), 0 0 160px rgba(255, 165, 0, 0.2);
}
@keyframes logoFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.page-hero h1 {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.05rem;
  color: var(--text-light);
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.7;
}

/* GALLERY */
.lb-gallery {
  max-width: 1200px;
  margin: 2rem auto 4rem;
  padding: 0 2rem;
}

.lb-gallery-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 1.5rem;
  text-align: center;
}

.lb-gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
}

.lb-gallery-item {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(0, 162, 255, 0.2);
  aspect-ratio: 4/3;
  transition: all 0.4s ease;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.lb-gallery-item:hover {
  transform: translateY(-4px);
  border-color: rgba(0,162,255,0.55);
  box-shadow: 0 0 20px rgba(0,162,255,0.2), 0 12px 35px rgba(0,0,0,0.45);
}

.lb-gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.lb-gallery-item:hover img {
  transform: scale(1.05);
}

/* INTRO */
.lb-intro {
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
}

.lb-intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.lb-intro-text h2 {
  font-size: 2rem;
  color: var(--text-main);
  margin-bottom: 1.5rem;
}

.lb-intro-text p {
  color: var(--text-light);
  line-height: 1.8;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.lb-intro-highlights {
  display: grid;
  gap: 1.5rem;
}

.highlight-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.25rem;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.highlight-item:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(26, 140, 255, 0.08);
}

.highlight-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.highlight-item strong {
  color: var(--text-main);
  font-size: 0.95rem;
  display: block;
  margin-bottom: 0.3rem;
}

.highlight-item p {
  color: var(--text-light);
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0;
}

/* SERVICES */
.lb-services {
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
}

.lb-services h2 {
  text-align: center;
  font-size: 2.2rem;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.lb-services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.lb-service-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.lb-service-card:hover {
  border-color: var(--primary);
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(26, 140, 255, 0.1);
}

.lb-service-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.lb-service-card h3 {
  color: var(--text-main);
  font-size: 1.15rem;
  margin-bottom: 0.75rem;
}

.lb-service-card > p {
  color: var(--text-light);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.lb-service-card ul {
  list-style: none;
  padding: 0;
}

.lb-service-card ul li {
  color: var(--text-light);
  font-size: 0.85rem;
  padding-left: 1.2rem;
  margin-bottom: 0.4rem;
  position: relative;
}

.lb-service-card ul li::before {
  font-family: 'Font Awesome 6 Free';
  content: '\f00c';
  font-weight: 900;
  position: absolute;
  left: 0;
  color: var(--accent);
}

/* PACKAGES */
.lb-packages {
  max-width: 1200px;
  margin: 4rem auto;
  padding: 3rem 2rem;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.lb-packages h2 {
  text-align: center;
  font-size: 2.2rem;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.lb-packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.lb-package-card {
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
}

.lb-package-card.featured {
  border-color: var(--primary);
  box-shadow: 0 16px 40px rgba(26, 140, 255, 0.1);
}

.lb-package-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
}

.lb-package-card h3 {
  color: var(--primary);
  font-size: 1.15rem;
  margin-bottom: 0.5rem;
}

.pkg-scale {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin-bottom: 1.25rem;
  font-weight: 600;
}

.lb-package-card ul {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.lb-package-card ul li {
  color: var(--text-light);
  font-size: 0.88rem;
  padding: 0.35rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.pkg-cta {
  display: block;
  text-align: center;
  padding: 0.7rem 1.5rem;
  font-size: 0.9rem;
  border-radius: 6px;
}

/* STATS */
.lb-stats {
  max-width: 1200px;
  margin: 4rem auto;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, rgba(26, 140, 255, 0.04) 0%, rgba(0, 212, 170, 0.04) 100%);
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.lb-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.lb-stat {
  text-align: center;
}

.lb-stat-number {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.lb-stat p {
  color: var(--text-light);
  font-size: 0.9rem;
  margin: 0;
}

/* RESPONSIVE */
@media (max-width: 992px) {
  .lb-intro-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .page-hero h1 {
    font-size: 2rem;
  }

  .lb-services-grid,
  .lb-packages-grid {
    grid-template-columns: 1fr;
  }

  .lb-stats-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .lb-stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .lb-stat-number {
    font-size: 1.6rem;
  }
}
</style>
