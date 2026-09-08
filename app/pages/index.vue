<template>
<div class="home-page">
  <!-- Interactive Ambient Studio Atmosphere -->
  <div class="studio-ambient-backdrop" aria-hidden="true">
    <div class="ambient-glow-mesh"></div>
    <div class="ambient-spotlight spot-top-left"></div>
    <div class="ambient-spotlight spot-bottom-right"></div>
  </div>

  <!-- ==============================================
       SECTION 01: HERO CINEMATIC (First Impression)
       ============================================== -->
  <section class="hero-section">
    <div class="max-width hero-layout-grid">
      <!-- Left Content Column -->
      <div class="hero-text-col">
        <!-- Live Status Pill -->
        <div class="hero-status-pill">
          <span class="live-dot"></span>
          <span>STUDIO ACTIVE · NHẬN DỰ ÁN MỚI THÁNG NÀY</span>
        </div>

        <!-- Main H1 Headline -->
        <h1 class="hero-main-title">
          ÂM THANH ĐẮT TIỀN.<br />
          <span class="text-gradient-animated">CẢM XÚC NGUYÊN BẢN.</span>
        </h1>

        <!-- Subtitle & Value Proposition -->
        <p class="hero-lead-desc">
          Phòng thu âm &amp; Sản xuất âm nhạc tiêu chuẩn phát hành quốc tế tại Bình Phước. Hoà âm phối khí độc bản, Vocal Coaching chuyên sâu và Mix &amp; Master chuẩn Spotify / Apple Music.
        </p>

        <!-- CTA Action Buttons -->
        <div class="hero-actions-row">
          <button type="button" class="btn btn-primary btn-pulse hero-btn-demo" @click="handleHeroPlayDemo">
            <i class="fa-solid fa-play"></i>
            <span>Nghe Demo Âm Thanh</span>
          </button>
          <NuxtLink to="/contact" class="btn btn-secondary hero-btn-booking">
            <i class="fa-solid fa-calendar-check"></i>
            <span>Đặt Lịch Phòng Thu</span>
          </NuxtLink>
        </div>

        <!-- Real Credibility Stats Row -->
        <div class="hero-metrics-strip glass-card">
          <div class="metric-item">
            <strong class="metric-number">2,000+</strong>
            <span class="metric-label">Dự Án Hoàn Tất</span>
          </div>
          <div class="metric-divider"></div>
          <div class="metric-item">
            <strong class="metric-number">200+</strong>
            <span class="metric-label">Nghệ Sĩ Đồng Hành</span>
          </div>
          <div class="metric-divider"></div>
          <div class="metric-item">
            <strong class="metric-number">7+ Năm</strong>
            <span class="metric-label">Kinh Nghiệm Studio</span>
          </div>
          <div class="metric-divider"></div>
          <div class="metric-item">
            <div class="metric-rating">
              <span class="rating-val">5.0</span>
              <div class="stars-row">
                <i v-for="s in 5" :key="s" class="fa-solid fa-star"></i>
              </div>
            </div>
            <span class="metric-label">Đánh Giá Tuyệt Đối</span>
          </div>
        </div>
      </div>

      <!-- Right Visual Column (Cinematic Studio Frame) -->
      <div class="hero-visual-col">
        <div class="hero-studio-frame glass-card">
          <div class="studio-frame-inner">
            <img
              src="/images/hero_studio_cinematic.png"
              alt="Phòng thu âm chuyên nghiệp XKProduction"
              class="hero-studio-img"
              width="600"
              height="580"
              fetchpriority="high"
            />
            <div class="frame-glass-reflection"></div>
            <div class="frame-ambient-glow"></div>

            <!-- Floating Studio Hardware Tags -->
            <div class="studio-tag tag-top-right">
              <span class="tag-icon"><i class="fa-solid fa-certificate"></i></span>
              <div class="tag-content">
                <strong>Chuẩn Spotify &amp; Apple Music</strong>
                <span>-14 LUFS Loudness</span>
              </div>
            </div>

            <div class="studio-tag tag-bottom-left">
              <span class="tag-icon"><i class="fa-solid fa-headphones-simple"></i></span>
              <div class="tag-content">
                <strong>Vocal Tuning Tự Nhiên</strong>
                <span>Melodyne &amp; Auto-Tune Pro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- ==============================================
       SECTION 02: THE SOUND PROOF (Before vs After Hardware Console)
       ============================================== -->
  <section id="audio-comparison" class="section-container sound-proof-section">
    <div class="max-width">
      <div class="section-title-wrap text-center">
        <span class="studio-pill">
          <span class="live-dot"></span>
          CHẤT LƯỢNG THỰC TẾ NÓI LÊN TẤT CẢ
        </span>
        <h2 class="section-heading-heavy">Trải Nghiệm Trực Diện: Thô vs Master</h2>
        <p class="section-subtitle">
          Gạt cần A/B trên bàn console để nghe rõ sự khác biệt đẳng cấp giữa bản thu mộc và tác phẩm sau khi được xử lý chuyên sâu tại XKProduction.
        </p>
      </div>

      <!-- Live Master Compare Component -->
      <StudioAudioCompare />
    </div>
  </section>


  <!-- ==============================================
       SECTION 03: SELECTED WORKS (Portfolio Releases)
       ============================================== -->
  <section id="featured-works" class="section-container featured-works-section">
    <div class="max-width">
      <div class="section-title-header-split">
        <div>
          <span class="header-tag">TÁC PHẨM TIÊU BIỂU</span>
          <h2 class="section-heading-heavy">Những Bản Phối Chạm Đến Triệu Người Nghe</h2>
        </div>
        <NuxtLink to="/products" class="link-arrow">
          <span>Xem tất cả sản phẩm</span>
          <i class="fa-solid fa-arrow-right"></i>
        </NuxtLink>
      </div>

      <!-- Works Grid -->
      <div class="works-portfolio-grid">
        <div
          v-for="(w, idx) in works"
          :key="w.title"
          class="work-card glass-card hover-lift"
          @click="openLightbox(w)"
        >
          <div class="work-thumb-wrapper">
            <img
              :src="w.thumb"
              :alt="w.title"
              class="work-thumb-img"
              loading="lazy"
              width="480"
              height="270"
            />
            <div class="work-overlay-scrim"></div>
            
            <button
              type="button"
              class="work-play-badge"
              :aria-label="`Xem ${w.title}`"
            >
              <i class="fa-solid fa-play"></i>
            </button>
            <span class="work-category-pill">{{ w.category }}</span>
          </div>

          <div class="work-card-content">
            <h3 class="work-card-title">{{ w.title }}</h3>
            <span class="work-card-artist">{{ w.artist }}</span>
            <p class="work-card-story">{{ w.story }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- ==============================================
       SECTION 04: CORE SERVICES & COMBO BUNDLES
       ============================================== -->
  <section id="services-and-pricing" class="section-container services-bundles-section">
    <div class="max-width">
      <div class="section-title-wrap text-center">
        <span class="header-tag">DỊCH VỤ &amp; GIẢI PHÁP</span>
        <h2 class="section-heading-heavy">Mọi Khâu Cho Bản Phối Hoàn Hảo</h2>
        <p class="section-subtitle">
          Từ thu âm cơ bản đến sản xuất trọn gói bài hát thương mại — Báo giá rõ ràng, không chi phí ẩn, cam kết đúng hẹn.
        </p>
      </div>

      <!-- 4 Pillars of Studio Services -->
      <div class="services-pillars-grid">
        <div class="pillar-card glass-card hover-lift">
          <div class="pillar-icon-box">
            <i class="fa-solid fa-microphone-lines"></i>
          </div>
          <span class="pillar-price-tag">Từ 350.000₫ / buổi</span>
          <h3 class="pillar-title">Thu Âm Bài Hát</h3>
          <p class="pillar-desc">Phòng thu tiêu âm chuẩn quốc tế, micro condenser cao cấp. Kỹ thuật viên kèm cặp, chỉnh sửa phát âm và hơi thở từng câu chữ.</p>
          <NuxtLink to="/thu-am" class="pillar-link">
            <span>Chi tiết dịch vụ</span>
            <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>
        </div>

        <div class="pillar-card glass-card hover-lift featured-pillar">
          <div class="pillar-badge">PHỔ BIẾN NHẤT</div>
          <div class="pillar-icon-box">
            <i class="fa-solid fa-sliders"></i>
          </div>
          <span class="pillar-price-tag">Từ 300.000₫ / bài</span>
          <h3 class="pillar-title">Mixing &amp; Mastering</h3>
          <p class="pillar-desc">Xử lý dải âm sâu sắc, làm sạch vocal, cân bằng không gian đa chiều và mastering đạt chuẩn âm lượng phát hành Spotify / Apple Music.</p>
          <NuxtLink to="/mix-master" class="pillar-link">
            <span>Chi tiết dịch vụ</span>
            <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>
        </div>

        <div class="pillar-card glass-card hover-lift">
          <div class="pillar-icon-box">
            <i class="fa-solid fa-music"></i>
          </div>
          <span class="pillar-price-tag">Từ 1.500.000₫ / bài</span>
          <h3 class="pillar-title">Hoà Âm Phối Khí</h3>
          <p class="pillar-desc">Sáng tác và dựng beat phối khí độc quyền từ ý tưởng demo thô. Nhạc cụ ảo hiện đại kết hợp sound design riêng biệt theo cá tính nghệ sĩ.</p>
          <NuxtLink to="/hoa-am-phoi-khi" class="pillar-link">
            <span>Chi tiết dịch vụ</span>
            <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>
        </div>

        <div class="pillar-card glass-card hover-lift">
          <div class="pillar-icon-box">
            <i class="fa-solid fa-guitar"></i>
          </div>
          <span class="pillar-price-tag">Liên hệ báo giá</span>
          <h3 class="pillar-title">Live Band &amp; Âm Thanh</h3>
          <p class="pillar-desc">Cho thuê âm thanh ánh sáng sân khấu, vận hành bàn mixer Midas M32R chuyên nghiệp cho sự kiện, tiệc cưới và acoustic live band.</p>
          <NuxtLink to="/live-band" class="pillar-link">
            <span>Chi tiết dịch vụ</span>
            <i class="fa-solid fa-arrow-right"></i>
          </NuxtLink>
        </div>
      </div>

      <!-- Combo Pricing Packages Component -->
      <PricingBundles />
    </div>
  </section>


  <!-- ==============================================
       SECTION 05: INTERACTIVE PROJECT ESTIMATOR
       ============================================== -->
  <section id="project-calculator" class="section-container estimator-section">
    <div class="max-width">
      <ProjectEstimator />
    </div>
  </section>


  <!-- ==============================================
       SECTION 06: THE STUDIO, FOUNDER & TRUST
       ============================================== -->
  <section class="section-container studio-founder-section">
    <div class="max-width">
      <div class="founder-split-layout glass-card">
        <!-- Founder Image Column -->
        <div class="founder-visual-box">
          <img
            src="/images/kiet-live-sound-wide.jpg"
            alt="Kỹ sư âm thanh Nguyễn Xuân Kiệt tại bàn mixer"
            class="founder-real-img"
            loading="lazy"
            width="600"
            height="450"
          />
          <div class="founder-visual-overlay"></div>
          <div class="founder-badge-card">
            <strong>Nguyễn Xuân Kiệt</strong>
            <span>Founder &amp; Lead Music Producer</span>
          </div>
        </div>

        <!-- Founder Story & Studio Principles -->
        <div class="founder-content-box">
          <span class="header-tag">CON NGƯỜI &amp; TRIẾT LÝ</span>
          <h2 class="founder-headline">Chúng Tôi Không Sản Xuất Đại Trà</h2>
          <p class="founder-quote">
            "Âm nhạc hay không chỉ nằm ở dàn máy đắt tiền hay plugins xịn — nó nằm ở sự đồng cảm của người sản xuất với từng câu hát của nghệ sĩ. Tại XKProduction, chúng tôi kiên nhẫn với từng chi tiết nhỏ nhất để tạo nên bản thu khiến bạn tự hào."
          </p>

          <!-- 4 Core Pillars of Trust -->
          <div class="principles-grid">
            <div v-for="p in whyChooseUs" :key="p.title" class="principle-item">
              <div class="principle-icon">
                <i :class="p.icon"></i>
              </div>
              <div class="principle-text">
                <strong>{{ p.title }}</strong>
                <p>{{ p.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Testimonials / Artist Voices -->
      <div class="testimonials-carousel-block">
        <div class="section-title-wrap text-center" style="margin-top: 4rem; margin-bottom: 2.5rem;">
          <span class="header-tag">CẢM NHẬN NGHỆ SĨ</span>
          <h2 class="section-heading-heavy">Những Người Đã Trải Nghiệm</h2>
        </div>

        <div class="testimonials-grid">
          <div v-for="t in testimonials" :key="t.name" class="testimonial-card glass-card">
            <div class="testimonial-top">
              <img :src="t.avatar" :alt="t.name" class="test-avatar" loading="lazy" width="56" height="56" />
              <div class="test-author-info">
                <strong>{{ t.name }}</strong>
                <span>{{ t.role }}</span>
              </div>
              <div class="test-stars">
                <i v-for="s in 5" :key="s" class="fa-solid fa-star"></i>
              </div>
            </div>
            <p class="test-body">“{{ t.body }}”</p>
            <span v-if="t.project" class="test-project-tag">
              <i class="fa-solid fa-music"></i> {{ t.project }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- ==============================================
       SECTION 07: FAST CONTACT & CONSULTATION
       ============================================== -->
  <section class="section-container quick-contact-section">
    <div class="max-width">
      <div class="contact-card-split glass-card">
        <div class="contact-info-col">
          <span class="header-tag">KẾT NỐI TRỰC TIẾP</span>
          <h2 class="contact-section-title">Bạn Đã Sẵn Sàng Bắt Đầu Bản Phối Tiếp Theo?</h2>
          <p class="contact-section-desc">
            Để lại thông tin hoặc nhắn trực tiếp qua Zalo. Đội ngũ sản xuất sẽ lắng nghe demo thô và phản hồi giải pháp tối ưu trong vòng 2 giờ.
          </p>

          <div class="direct-contact-items">
            <a href="tel:0355356294" class="direct-item">
              <div class="direct-icon"><i class="fa-solid fa-phone"></i></div>
              <div>
                <span class="direct-label">Hotline &amp; Zalo</span>
                <strong class="direct-val">0355.356.294</strong>
              </div>
            </a>
            <div class="direct-item">
              <div class="direct-icon"><i class="fa-solid fa-location-dot"></i></div>
              <div>
                <span class="direct-label">Địa chỉ Studio</span>
                <strong class="direct-val">QL14 km25 xã Nghĩa Trung, Bù Đăng, Bình Phước</strong>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-form-col">
          <Transition name="toast">
            <div v-if="formToast !== 'idle'" class="form-toast" :class="`form-toast-${formToast}`" role="alert">
              <i :class="formToast === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation'"></i>
              <span>{{ formToast === 'success' ? 'Gửi thành công! XKProduction sẽ liên hệ bạn sớm.' : formErrorMessage }}</span>
            </div>
          </Transition>

          <form class="luxury-form" @submit.prevent="submitForm" novalidate>
            <div class="form-group-premium">
              <label for="home-name">Họ và tên <span class="req">*</span></label>
              <input id="home-name" v-model="form.name" type="text" placeholder="Tên nghệ danh hoặc họ tên của bạn..." :class="{ error: formErrors.name }" @blur="validateField('name')" />
              <span v-if="formErrors.name" class="field-error-text">{{ formErrors.name }}</span>
            </div>

            <div class="form-row-premium">
              <div class="form-group-premium">
                <label for="home-phone">Số điện thoại / Zalo <span class="req">*</span></label>
                <input id="home-phone" v-model="form.phone" type="tel" placeholder="09xx.xxx.xxx" :class="{ error: formErrors.phone }" @blur="validateField('phone')" />
                <span v-if="formErrors.phone" class="field-error-text">{{ formErrors.phone }}</span>
              </div>
              <div class="form-group-premium">
                <label for="home-type">Dịch vụ quan tâm</label>
                <div class="custom-select-wrap">
                  <select id="home-type" v-model="form.type">
                    <option value="">Chọn dịch vụ...</option>
                    <option>Thu âm bài hát</option>
                    <option>Mix &amp; Master</option>
                    <option>Hoà âm phối khí</option>
                    <option>Gói Combo trọn gói</option>
                    <option>Quay MV phòng thu</option>
                    <option>Live Band &amp; Âm thanh sự kiện</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-group-premium">
              <label for="home-message">Mô tả sơ bộ về dự án</label>
              <textarea id="home-message" v-model="form.message" placeholder="Ví dụ: Mình muốn thu 1 bài acoustic cover, đã có beat sẵn..." rows="3"></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-full-width" :disabled="formSubmitting">
              <i v-if="formSubmitting" class="fa-solid fa-spinner fa-spin" style="margin-right: 0.5rem"></i>
              <span>{{ formSubmitting ? 'ĐANG GỬI...' : 'GỬI YÊU CẦU TƯ VẤN MIỄN PHÍ' }}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Lead Magnet: Checklist Thu Am -->
  <EmailCapture />

  <!-- Video Lightbox Modal -->
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div v-if="lightbox.open" class="lightbox-backdrop" @click.self="closeLightbox" aria-modal="true" role="dialog">
        <div class="lightbox-inner">
          <button class="lightbox-close" @click="closeLightbox" aria-label="Đóng">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <template v-if="lightbox.embedId">
            <iframe
              :src="'https://www.youtube.com/embed/' + lightbox.embedId + '?autoplay=1&rel=0'"
              allow="autoplay; encrypted-media"
              allowfullscreen
              class="lightbox-iframe"
              loading="lazy"
            ></iframe>
          </template>
          <template v-else>
            <a :href="lightbox.url" target="_blank" rel="noopener noreferrer" class="lightbox-tiktok-link">
              <i class="fa-brands fa-tiktok"></i>
              <span>Xem trên TikTok</span>
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </template>
          <div class="lightbox-info">
            <strong>{{ lightbox.title }}</strong>
            <span>{{ lightbox.artist }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted } from 'vue'

// Hook global studio audio player
const { playTrack } = useStudioAudio()

const handleHeroPlayDemo = () => {
  playTrack(0)
}

useSeoMeta({
  title: 'XKProduction — Music Production & Phòng Thu Âm Chuyên Nghiệp',
  description: 'XKProduction — Music production cho nghệ sĩ muốn bản phối nghe đắt tiền, rõ, và đúng chất. 2000+ dự án. Bắt đầu tư vấn miễn phí.',
  ogTitle: 'XKProduction — Music Production & Phòng Thu Âm Chuyên Nghiệp',
  ogDescription: 'XKProduction — Music production cho nghệ sĩ muốn bản phối nghe đắt tiền, rõ, và đúng chất. 2000+ dự án thành công. Hotline: 0355.356.294.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'XKProduction - Phòng thu âm chuyên nghiệp tại Bình Phước',
  ogType: 'website',
  ogUrl: 'https://xkproduction.com',
  twitterCard: 'summary_large_image',
  twitterTitle: 'XKProduction — Music Production & Phòng Thu Âm Chuyên Nghiệp',
  twitterDescription: 'Music production cho nghệ sĩ muốn bản phối nghe đắt tiền, rõ, và đúng chất. 2000+ dự án. Hotline: 0355.356.294',
  twitterImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  keywords: 'XKProduction, xkproduction.com, phòng thu âm, phòng thu âm chuyên nghiệp, thu âm bài hát, hoà âm phối khí, mix master, mixing mastering, sân khấu sự kiện, âm thanh ánh sáng, quay mv, quay tvc, phòng thu âm bình phước, phòng thu âm uy tín, bảng giá thu âm, studio bình phước, nhạc sĩ, sản xuất âm nhạc',
  author: 'Nguyễn Xuân Kiệt - XKProduction',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MusicStore",
        "name": "XKProduction",
        "alternateName": "XK Production Studio",
        "url": "https://xkproduction.com",
        "logo": "https://xkproduction.com/images/logo-xkproduction.png",
        "image": "https://xkproduction.com/images/Xkpreviewnew.png",
        "description": "Phòng thu âm chuyên nghiệp — Hoà âm phối khí — Mix & Master chuẩn quốc tế — Sân khấu sự kiện & Âm thanh ánh sáng trọn gói tại Bình Phước.",
        "telephone": "+84355356294",
        "email": "nguyenxuankiet294@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "QL14 km25, Nghĩa Trung",
          "addressLocality": "Bù Đăng",
          "addressRegion": "Bình Phước",
          "addressCountry": "VN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 11.8350,
          "longitude": 107.0150
        },
        "priceRange": "₫₫",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": 2000,
          "bestRating": "5"
        },
        "founder": {
          "@type": "Person",
          "name": "Nguyễn Xuân Kiệt",
          "jobTitle": "Music Producer & Founder"
        }
      })
    }
  ]
})

useSchemaOrg([
  defineWebPage({
    name: 'XKProduction - Phòng Thu Âm Chuyên Nghiệp | Hoà Âm | Mix Master | Bình Phước',
    description: 'Phòng thu âm chuyên nghiệp XKProduction: Thu âm bài hát, mix & master chuẩn Spotify, hoà âm phối khí, quay MV/TVC tại Bình Phước. 2000+ dự án thành công.'
  }),
  defineLocalBusiness({
    '@id': 'https://xkproduction.com/#localbusiness',
    name: 'XKProduction',
    image: 'https://xkproduction.com/images/Xkpreviewnew.png',
    logo: 'https://xkproduction.com/images/logo-xkproduction.png',
    telephone: '+84355356294',
    email: 'nguyenxuankiet294@gmail.com',
    url: 'https://xkproduction.com',
    priceRange: '350.000₫ – 3.500.000₫'
  })
])

/* === FEATURED WORKS DATA === */
const works = [
  {
    title: 'Nhật Kí Của Mẹ',
    artist: 'Mai Linh (Cover)',
    category: 'Hoà Âm & Mix Master',
    story: 'Bản phối ballad da diết do Xkprod ft LacAnh hoà âm. Từng nhịp piano chạm thẳng vào cảm xúc người nghe.',
    url: 'https://www.youtube.com/watch?v=F5tPTow1xkE',
    thumb: 'https://img.youtube.com/vi/F5tPTow1xkE/hqdefault.jpg',
    embedId: 'F5tPTow1xkE'
  },
  {
    title: 'Chẳng Muốn Nói Nhiều Lời',
    artist: 'Revan',
    category: 'Sản Xuất R&B',
    story: 'Xử lý không gian đa chiều tinh tế kết hợp vocal ấm áp tạo nên điểm tựa cảm xúc sâu sắc cho giọng ca.',
    url: 'https://www.youtube.com/watch?v=IxlFvQQP_4c',
    thumb: 'https://img.youtube.com/vi/IxlFvQQP_4c/hqdefault.jpg',
    embedId: 'IxlFvQQP_4c'
  },
  {
    title: 'Love Dự Phòng',
    artist: 'Howl',
    category: 'Vocal Production / Acoustic',
    story: 'Tập trung triệt để vào sự mộc mạc và chân thật. Vocal nổi bật trên nền guitar acoustic được căn chỉnh chuẩn mực.',
    url: 'https://www.youtube.com/watch?v=OCnKTCslJUU',
    thumb: 'https://img.youtube.com/vi/OCnKTCslJUU/hqdefault.jpg',
    embedId: 'OCnKTCslJUU'
  },
  {
    title: 'Kiếp Sau',
    artist: 'Phương Thanh Tuyền',
    category: 'Mixing & Mastering',
    story: 'Bản ballad được mastering chuẩn phát hành số với dải âm rộng mở, giọng ca ấm áp và không bị gắt ở dải cao.',
    url: 'https://www.youtube.com/watch?v=z4GB-X1OiPg',
    thumb: 'https://img.youtube.com/vi/z4GB-X1OiPg/hqdefault.jpg',
    embedId: 'z4GB-X1OiPg'
  },
  {
    title: 'Lý Do Bắt Đầu',
    artist: 'Revan',
    category: 'Hip-Hop / Rap Production',
    story: 'Bass 808 căng tràn năng lượng và vocal flow bùng nổ, khẳng định tư duy sản xuất sắc nét của studio.',
    url: 'https://www.youtube.com/watch?v=vzfr1ddayYY',
    thumb: 'https://img.youtube.com/vi/vzfr1ddayYY/hqdefault.jpg',
    embedId: 'vzfr1ddayYY'
  },
  {
    title: 'Áo Cũ Tình Mới',
    artist: 'Remake Remix',
    category: 'EDM / Remix Production',
    story: 'Nhịp drop bốc lửa, bassline thiết kế tinh xảo, thổi luồng sinh khí sôi động cuốn hút vào bản phối.',
    url: 'https://www.youtube.com/watch?v=hlvg9YBxRqY',
    thumb: 'https://img.youtube.com/vi/hlvg9YBxRqY/hqdefault.jpg',
    embedId: 'hlvg9YBxRqY'
  }
]

/* === STUDIO PRINCIPLES === */
const whyChooseUs = [
  {
    icon: 'fa-solid fa-signature',
    title: 'Không sản xuất đại trà',
    desc: 'Mỗi bài hát là một thực thể độc bản. Dành trọn tâm huyết nghiên cứu chất giọng và cá tính riêng của bạn.'
  },
  {
    icon: 'fa-solid fa-wand-magic-sparkles',
    title: 'Không dùng template có sẵn',
    desc: 'Toàn bộ nhạc cụ ảo và pattern phối khí được xây dựng thủ công từ đầu, bảo đảm tính nguyên bản cao nhất.'
  },
  {
    icon: 'fa-solid fa-heart-pulse',
    title: 'Vocal coaching tận tâm',
    desc: 'Không hề hối thúc ca sĩ. Tận tình hướng dẫn lấy hơi, cảm xúc và nhả chữ để lấy được take thu đẹp nhất.'
  },
  {
    icon: 'fa-solid fa-handshake-angle',
    title: 'Đồng hành đến khi phát hành',
    desc: 'Tư vấn từ bản demo thô, hỗ trợ chỉnh sửa tỉ mỉ cho đến khi bài hát chính thức xuất hiện trên Spotify & YouTube.'
  }
]

/* === TESTIMONIALS === */
const testimonials = [
  {
    name: 'Revan',
    role: 'Nghệ Sĩ / Rapper',
    avatar: '/images/revan.jpg',
    project: 'Chẳng Muốn Nói Nhiều Lời',
    body: 'Mình đã làm qua không ít phòng thu, nhưng XKProduction là nơi đầu tiên mình cảm thấy âm nhạc của mình được thực sự lắng nghe. Kiệt và team không chỉ làm đúng yêu cầu — họ còn biết cách đẩy bản nhạc lên một tầng cao hơn.'
  },
  {
    name: 'Howl',
    role: 'Nghệ Sĩ / Rapper',
    avatar: '/images/howl.jpg',
    project: 'Love Dự Phòng',
    body: 'Đến XKProduction lần đầu mình không kỳ vọng nhiều, nhưng kết quả cuối cùng vượt xa những gì mình tưởng tượng. Sound rõ ràng, sắc nét và đúng chất nghệ sĩ.'
  },
  {
    name: 'Cao Thành Lâm',
    role: 'Ca Sĩ Tự Do',
    avatar: '/images/cao-thanh-lam.jpg',
    project: '',
    body: 'Với mình, giọng hát là tất cả. XKProduction biết cách thu âm để giọng ca tự nhiên nhất, không bị xử lý quá tay. Mỗi session ở đây đều rất thoải mái và hiệu quả.'
  },
  {
    name: 'Fesu',
    role: 'Ca Sĩ / Singer',
    avatar: '/images/fesu.jpg',
    project: 'Sản xuất âm nhạc & Vocal',
    body: 'Tôi đánh giá cao sự kiên nhẫn và đôi tai tinh tế của anh Kiệt. Tận tình coaching từng câu chữ để lấy được cảm xúc đẹp nhất. Rất đáng giá!'
  }
]

/* === LIGHTBOX MODAL === */
const lightbox = reactive({
  open: false,
  title: '',
  artist: '',
  url: '',
  embedId: ''
})

function openLightbox(w: any) {
  lightbox.title = w.title
  lightbox.artist = w.artist
  lightbox.url = w.url || ''
  lightbox.embedId = w.embedId || ''
  lightbox.open = true
  if (import.meta.client) document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightbox.open = false
  if (import.meta.client) document.body.style.overflow = ''
}

if (import.meta.client) {
  const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox() }
  onMounted(() => window.addEventListener('keydown', handler))
  onUnmounted(() => window.removeEventListener('keydown', handler))
}

/* === CONTACT FORM === */
const form = reactive({ name: '', phone: '', type: '', message: '' })
const formErrors = reactive({ name: '', phone: '' })
const formToast = ref<'idle' | 'success' | 'error'>('idle')
const formErrorMessage = ref('')
const formSubmitting = ref(false)

function validateField(field: 'name' | 'phone') {
  if (field === 'name') {
    formErrors.name = form.name.trim().length < 2 ? 'Vui lòng nhập họ và tên của bạn' : ''
  }
  if (field === 'phone') {
    const p = form.phone.replace(/[.\s-]/g, '')
    formErrors.phone = !/^(0[3-9]\d{8})$/.test(p) ? 'Số điện thoại không hợp lệ (10 chữ số)' : ''
  }
}

async function submitForm() {
  validateField('name')
  validateField('phone')
  if (formErrors.name || formErrors.phone) return

  formSubmitting.value = true
  formToast.value = 'idle'
  try {
    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        service: form.type,
        message: form.message,
        source: 'index-hero-v4'
      })
    })
    formSubmitting.value = false
    if (res.ok) {
      formToast.value = 'success'
      Object.assign(form, { name: '', phone: '', type: '', message: '' })
    } else {
      formToast.value = 'error'
      formErrorMessage.value = 'Gửi thông tin chưa thành công. Bạn vui lòng nhắn trực tiếp qua Zalo 0355.356.294 nhé!'
    }
  } catch (err) {
    formSubmitting.value = false
    formToast.value = 'error'
    formErrorMessage.value = 'Có lỗi kết nối. Bạn vui lòng liên hệ trực tiếp qua hotline 0355.356.294.'
  }
  setTimeout(() => { formToast.value = 'idle' }, 6000)
}
</script>

<style scoped>
/* Base Page Layout */
.home-page {
  position: relative;
  background-color: var(--bg-dark);
  color: var(--text-main);
  overflow-x: hidden;
  padding-top: 75px;
}

/* Ambient Studio Atmosphere */
.studio-ambient-backdrop {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: var(--bg-dark);
  overflow: hidden;
}

.ambient-glow-mesh {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.7;
}

.ambient-spotlight {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(140px);
  opacity: 0.18;
  pointer-events: none;
}

.spot-top-left {
  top: -150px;
  left: -100px;
  background: radial-gradient(circle, #0080ff, #00d4aa);
}

.spot-bottom-right {
  bottom: 10%;
  right: -150px;
  background: radial-gradient(circle, #0284c7, #38bdf8);
}

/* Common Section Rhythm */
.section-container {
  padding: 5.5rem 0;
  position: relative;
  z-index: 1;
}

.section-title-wrap {
  max-width: 680px;
  margin: 0 auto 3rem;
}

.section-title-header-split {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  gap: 1.5rem;
  flex-wrap: wrap;
}

/* ==============================================
   SECTION 01: HERO
   ============================================== */
.hero-section {
  padding: 5rem 0 4rem;
  position: relative;
  z-index: 1;
}

.hero-layout-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 3.5rem;
  align-items: center;
}

.hero-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.95rem;
  background: rgba(0, 229, 163, 0.08);
  border: 1px solid rgba(0, 229, 163, 0.25);
  border-radius: 100px;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: var(--teal);
  margin-bottom: 1.5rem;
}

.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--teal);
  box-shadow: 0 0 10px var(--teal);
  animation: liveDotPulse 1.8s infinite;
}

@keyframes liveDotPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

.hero-main-title {
  font-size: clamp(2.4rem, 4.8vw, 3.8rem);
  font-weight: 900;
  line-height: 1.12;
  letter-spacing: -0.025em;
  color: #fff;
  margin-bottom: 1.5rem;
}

.hero-lead-desc {
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  color: #94a3b8;
  line-height: 1.7;
  max-width: 580px;
  margin-bottom: 2rem;
}

.hero-actions-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.hero-btn-demo {
  padding: 0.9rem 1.8rem;
  font-size: 0.92rem;
}

.hero-btn-booking {
  padding: 0.9rem 1.8rem;
  font-size: 0.92rem;
}

/* Metrics Strip */
.hero-metrics-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 1.6rem;
  border-radius: 16px;
  max-width: 600px;
}

.metric-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.metric-number {
  font-size: 1.25rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.02em;
}

.metric-label {
  font-size: 0.72rem;
  color: #64748b;
  font-weight: 600;
}

.metric-divider {
  width: 1px;
  height: 28px;
  background: rgba(255, 255, 255, 0.08);
}

.metric-rating {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.rating-val {
  font-size: 1.2rem;
  font-weight: 900;
  color: #fbbf24;
}

.stars-row {
  display: flex;
  gap: 2px;
  color: #fbbf24;
  font-size: 0.65rem;
}

/* Right Visual Column */
.hero-studio-frame {
  padding: 0.75rem;
  border-radius: 22px;
}

.studio-frame-inner {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
}

.hero-studio-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform 0.6s var(--ease-out-expo);
}

.hero-studio-frame:hover .hero-studio-img {
  transform: scale(1.04);
}

.frame-glass-reflection {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 40%, rgba(0, 0, 0, 0.4) 100%);
  pointer-events: none;
}

.studio-tag {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.6rem 0.9rem;
  background: rgba(10, 14, 23, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.tag-top-right {
  top: 1.2rem;
  right: 1.2rem;
}

.tag-bottom-left {
  bottom: 1.2rem;
  left: 1.2rem;
}

.tag-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: rgba(0, 128, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  font-size: 0.85rem;
}

.tag-content {
  display: flex;
  flex-direction: column;
}

.tag-content strong {
  font-size: 0.78rem;
  color: #fff;
  white-space: nowrap;
}

.tag-content span {
  font-size: 0.68rem;
  color: #94a3b8;
}

/* ==============================================
   SECTION 03: WORKS PORTFOLIO
   ============================================== */
.works-portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.work-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
}

.work-thumb-wrapper {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.work-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s var(--ease-out-expo);
}

.work-card:hover .work-thumb-img {
  transform: scale(1.08);
}

.work-overlay-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(6, 8, 13, 0.85) 100%);
}

.work-play-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(0, 128, 255, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s var(--ease-out-expo);
  box-shadow: 0 4px 18px rgba(0, 128, 255, 0.5);
  cursor: pointer;
}

.work-card:hover .work-play-badge {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.work-category-pill {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.25rem 0.65rem;
  background: rgba(6, 8, 13, 0.75);
  backdrop-filter: blur(8px);
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.5px;
}

.work-card-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
}

.work-card-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.25;
}

.work-card-artist {
  font-size: 0.82rem;
  color: var(--teal);
  font-weight: 700;
}

.work-card-story {
  font-size: 0.82rem;
  color: #94a3b8;
  line-height: 1.5;
  margin-top: 0.4rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ==============================================
   SECTION 04: SERVICES PILLARS
   ============================================== */
.services-pillars-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.pillar-card {
  padding: 1.8rem 1.4rem;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 18px;
}

.featured-pillar {
  border-color: rgba(0, 128, 255, 0.4);
  background: linear-gradient(180deg, rgba(0, 128, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%), var(--bg-surface);
}

.pillar-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.2rem 0.5rem;
  background: var(--primary);
  color: #fff;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.pillar-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(0, 128, 255, 0.1);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  margin-bottom: 1.1rem;
}

.pillar-price-tag {
  font-size: 0.76rem;
  font-weight: 800;
  color: var(--teal);
  margin-bottom: 0.4rem;
  letter-spacing: 0.5px;
}

.pillar-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.6rem;
}

.pillar-desc {
  font-size: 0.84rem;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
}

.pillar-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--accent);
  transition: gap 0.2s ease;
}

.pillar-link:hover {
  gap: 0.7rem;
  color: #fff;
}

/* ==============================================
   SECTION 06: FOUNDER & TESTIMONIALS
   ============================================== */
.founder-split-layout {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  border-radius: 24px;
  overflow: hidden;
}

.founder-visual-box {
  position: relative;
  min-height: 420px;
}

.founder-real-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.founder-visual-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 60%, var(--bg-surface) 100%);
}

.founder-badge-card {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  padding: 0.8rem 1.2rem;
  background: rgba(8, 11, 18, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
}

.founder-badge-card strong {
  font-size: 0.95rem;
  color: #fff;
}

.founder-badge-card span {
  font-size: 0.75rem;
  color: var(--accent);
}

.founder-content-box {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.founder-headline {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 900;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.founder-quote {
  font-size: 0.95rem;
  color: #cbd5e1;
  line-height: 1.7;
  font-style: italic;
  margin-bottom: 2rem;
  border-left: 2px solid var(--primary);
  padding-left: 1rem;
}

.principles-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.principle-item {
  display: flex;
  gap: 0.75rem;
}

.principle-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(0, 128, 255, 0.1);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.principle-text strong {
  font-size: 0.85rem;
  color: #fff;
  display: block;
  margin-bottom: 0.2rem;
}

.principle-text p {
  font-size: 0.78rem;
  color: #94a3b8;
  line-height: 1.45;
  margin: 0;
}

/* Testimonials Grid */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.testimonial-card {
  padding: 1.5rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.testimonial-top {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.test-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.test-author-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.test-author-info strong {
  font-size: 0.85rem;
  color: #fff;
}

.test-author-info span {
  font-size: 0.72rem;
  color: #64748b;
}

.test-stars {
  color: #fbbf24;
  font-size: 0.65rem;
  display: flex;
  gap: 1px;
}

.test-body {
  font-size: 0.82rem;
  color: #cbd5e1;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
  flex: 1;
}

.test-project-tag {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--teal);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

/* ==============================================
   SECTION 07: FAST CONTACT
   ============================================== */
.contact-card-split {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  border-radius: 24px;
  overflow: hidden;
}

.contact-info-col {
  padding: 3rem;
  background: linear-gradient(135deg, rgba(0, 128, 255, 0.08) 0%, transparent 100%), var(--bg-surface-elevated);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.contact-section-title {
  font-size: clamp(1.6rem, 2.8vw, 2.2rem);
  font-weight: 900;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.contact-section-desc {
  font-size: 0.92rem;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.direct-contact-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.direct-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  text-decoration: none;
}

.direct-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(0, 128, 255, 0.1);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.direct-label {
  font-size: 0.72rem;
  color: #64748b;
  display: block;
}

.direct-val {
  font-size: 0.95rem;
  color: #fff;
}

.contact-form-col {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--bg-surface);
}

/* Lightbox Modal */
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(3, 5, 8, 0.9);
  backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox-inner {
  position: relative;
  width: 100%;
  max-width: 860px;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.8);
}

.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.lightbox-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.lightbox-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem 1.5rem;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
  display: flex;
  flex-direction: column;
}

.lightbox-info strong {
  font-size: 1.1rem;
  color: #fff;
}

.lightbox-info span {
  font-size: 0.82rem;
  color: #94a3b8;
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

/* Responsive Media Queries */
@media (max-width: 1024px) {
  .hero-layout-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .works-portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .services-pillars-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .founder-split-layout {
    grid-template-columns: 1fr;
  }
  .founder-visual-box {
    min-height: 280px;
  }
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .contact-card-split {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .hero-section {
    padding: 3rem 0 2rem;
  }
  .section-container {
    padding: 3.5rem 0;
  }
  .hero-metrics-strip {
    flex-wrap: wrap;
    gap: 1rem;
  }
  .metric-divider {
    display: none;
  }
  .works-portfolio-grid {
    grid-template-columns: 1fr;
  }
  .services-pillars-grid {
    grid-template-columns: 1fr;
  }
  .principles-grid {
    grid-template-columns: 1fr;
  }
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
  .contact-info-col,
  .contact-form-col {
    padding: 1.75rem 1.25rem;
  }
  .founder-content-box {
    padding: 1.75rem 1.25rem;
  }
}
</style>
