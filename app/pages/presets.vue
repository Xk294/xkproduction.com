<template>
  <div class="presets-page-wrap">
    <!-- INTERACTIVE AMBIENT GLOW BACKDROP -->
    <div class="immersive-ambient-bg" aria-hidden="true">
      <div class="glow-spot spotlight-1"></div>
      <div class="glow-spot spotlight-2"></div>
    </div>

    <!-- ===== HERO SECTION ===== -->
    <section class="page-hero">
      <div class="max-width text-center">
        <span class="hero-badge"><i class="fa-solid fa-wand-magic-sparkles"></i> DIGITAL PRODUCTS &amp; PRESETS</span>
        <h1 class="page-hero-title">Kho Vocal Presets &amp; <br><span class="text-gradient-animated">Tài Nguyên Studio</span></h1>
        <p class="page-hero-sub">
          Bộ chuỗi xử lý âm thanh Vocal Chain &amp; Template dự án do chính Producer Nguyễn Xuân Kiệt đúc kết từ 2000+ dự án. 
          Giúp bạn có vocal dày, sáng, sạch chuẩn studio ngay tại nhà trong 1 cú click.
        </p>
        <div class="hero-actions" style="margin-top: 2rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <a href="#presets-list" class="btn btn-primary btn-pulse">
            <i class="fa-solid fa-download"></i> Xem kho Preset
          </a>
          <NuxtLink to="/mix-online" class="btn btn-secondary">
            <i class="fa-solid fa-cloud-arrow-up"></i> Dịch vụ Mix Online
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ===== VALUE PROPOSITION BANNER ===== -->
    <section class="value-props-section">
      <div class="editorial-container">
        <div class="props-grid glass-card">
          <div class="prop-item text-center">
            <div class="prop-icon"><i class="fa-solid fa-bolt-lightning"></i></div>
            <h4>Cài Đặt Trong 3 Phút</h4>
            <p>Kèm video hướng dẫn chi tiết từng bước, chỉ cần kéo thả vào DAW là hát được ngay.</p>
          </div>
          <div class="prop-item text-center">
            <div class="prop-icon"><i class="fa-solid fa-sliders"></i></div>
            <h4>Tối Ưu Cả Stock &amp; 3rd Plugin</h4>
            <p>Có phiên bản dùng 100% plugin có sẵn của DAW (Logic Pro, FL Studio) không cần mua plugin ngoài đắt đỏ.</p>
          </div>
          <div class="prop-item text-center">
            <div class="prop-icon"><i class="fa-solid fa-infinity"></i></div>
            <h4>Sử Dụng Trọn Đời</h4>
            <p>Nhận link Google Drive lưu trữ vĩnh viễn, cập nhật miễn phí khi có phiên bản mới.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== PRESETS CATALOG ===== -->
    <section id="presets-list" class="section-block presets-catalog">
      <div class="editorial-container">
        <div class="section-header-center text-center" style="margin-bottom: 3.5rem;">
          <span class="header-tag">BỘ SƯU TẬP PRESETS</span>
          <h2 class="section-heading-heavy text-center">Chọn Preset Phù Hợp Với Bạn</h2>
          <p class="section-subtitle">Đầy đủ các dòng nhạc phổ biến từ Pop Ballad sâu lắng đến Rap R&amp;B thời thượng</p>
        </div>

        <div class="presets-grid">
          <!-- Preset 1 -->
          <div class="preset-card glass-card hover-lift">
            <div class="card-top-tag">BALLAD &amp; ACOUSTIC</div>
            <div class="preset-icon-wrap">
              <i class="fa-solid fa-microphone-lines"></i>
            </div>
            <h3 class="preset-name">Vocal Warm Ballad (Dày &amp; Ấm)</h3>
            <p class="preset-desc">Tối ưu cho giọng nam/nữ hát trữ tình, nhạc acoustic. Giúp vocal đầy đặn dải trung trầm, không gian reverb phòng hoà nhạc sâu lắng.</p>
            
            <div class="preset-specs">
              <span><i class="fa-solid fa-check"></i> EQ cắt tần số bùn đục (Muddy)</span>
              <span><i class="fa-solid fa-check"></i> 2 tầng Opto/FET Compression</span>
              <span><i class="fa-solid fa-check"></i> Hall Reverb + Warm Delay Aux</span>
              <span><i class="fa-solid fa-compact-disc"></i> Hỗ trợ: Logic Pro X, FL Studio, Cubase</span>
            </div>

            <div class="preset-price-box">
              <div class="price-val">199.000₫</div>
              <span class="price-old">350.000₫</span>
            </div>

            <button type="button" class="btn btn-secondary full-width" @click="openCheckout('Vocal Warm Ballad', 199000)">
              <i class="fa-solid fa-qrcode"></i> Nhận Preset Ngay
            </button>
          </div>

          <!-- Preset 2: Featured -->
          <div class="preset-card glass-card hover-lift featured-preset">
            <div class="featured-badge">PHỔ BIẾN NHẤT</div>
            <div class="card-top-tag">POP &amp; MODERN VOCAL</div>
            <div class="preset-icon-wrap">
              <i class="fa-solid fa-star"></i>
            </div>
            <h3 class="preset-name">Vocal Bright &amp; Airy (Sáng Sang)</h3>
            <p class="preset-desc">Vũ khí bí mật cho giọng hát cover hiện đại. Đẩy độ mượt mà của dải tần 10-14kHz, kiểm soát hoàn toàn âm 'x', 's' chói gắt bằng De-Esser chuẩn.</p>
            
            <div class="preset-specs">
              <span><i class="fa-solid fa-check"></i> Dynamic EQ triệt tiêu chói 3-4kHz</span>
              <span><i class="fa-solid fa-check"></i> Vocal Air &amp; Sheen Band độc quyền</span>
              <span><i class="fa-solid fa-check"></i> Parallel Vocal Compression dày tiếng</span>
              <span><i class="fa-solid fa-compact-disc"></i> Hỗ trợ: Logic Pro X, FL Studio, Studio One</span>
            </div>

            <div class="preset-price-box">
              <div class="price-val text-gradient-animated">199.000₫</div>
              <span class="price-old">400.000₫</span>
            </div>

            <button type="button" class="btn btn-primary full-width btn-pulse" @click="openCheckout('Vocal Bright Airy', 199000)">
              <i class="fa-solid fa-qrcode"></i> Nhận Preset Ngay
            </button>
          </div>

          <!-- Preset 3 -->
          <div class="preset-card glass-card hover-lift">
            <div class="card-top-tag">RAP, HIPHOP &amp; R&amp;B</div>
            <div class="preset-icon-wrap">
              <i class="fa-solid fa-bolt"></i>
            </div>
            <h3 class="preset-name">Modern Rap / Trap Autotune</h3>
            <p class="preset-desc">Cấu hình tuning nhanh hiện đại, xử lý vocal dày dặn nổi bật trên 808 bass căng tràn. Kèm hiệu ứng slap delay và doubler stereo rộng mở.</p>
            
            <div class="preset-specs">
              <span><i class="fa-solid fa-check"></i> Fast Retune Speed Template</span>
              <span><i class="fa-solid fa-check"></i> Sidechain Ducking Reverb theo giọng</span>
              <span><i class="fa-solid fa-check"></i> Stereo Imager mở rộng không gian</span>
              <span><i class="fa-solid fa-compact-disc"></i> Hỗ trợ: FL Studio, Logic Pro, Cubase</span>
            </div>

            <div class="preset-price-box">
              <div class="price-val">249.000₫</div>
              <span class="price-old">450.000₫</span>
            </div>

            <button type="button" class="btn btn-secondary full-width" @click="openCheckout('Rap Trap Autotune', 249000)">
              <i class="fa-solid fa-qrcode"></i> Nhận Preset Ngay
            </button>
          </div>

          <!-- Preset 4: Mega Bundle -->
          <div class="preset-card glass-card hover-lift mega-bundle">
            <div class="bundle-super-badge">TRỌN BỘ SIÊU TIẾT KIỆM</div>
            <div class="card-top-tag">ALL-IN-ONE PRODUCER SUITE</div>
            <div class="preset-icon-wrap bundle-glow">
              <i class="fa-solid fa-crown"></i>
            </div>
            <h3 class="preset-name">Full Studio Vocal Suite + Template DAW</h3>
            <p class="preset-desc">Trọn bộ 10 Vocal Presets đầy đủ thể loại (Ballad, Pop, Rap, R&amp;B, Acoustic) + 01 Template Project Logic Pro X setup sẵn toàn bộ routing mixing của studio.</p>
            
            <div class="preset-specs">
              <span><i class="fa-solid fa-check"></i> Đầy đủ 10 Vocal Chain Presets cao cấp</span>
              <span><i class="fa-solid fa-check"></i> Full Template Mix/Master Logic Pro X</span>
              <span><i class="fa-solid fa-check"></i> Bộ 20 Impulse Response Reverb độc quyền</span>
              <span><i class="fa-solid fa-check"></i> Video 15 phút hướng dẫn căn chỉnh cho từng giọng</span>
            </div>

            <div class="preset-price-box">
              <div class="price-val text-gradient-animated">499.000₫</div>
              <span class="price-old">1.200.000₫</span>
            </div>

            <button type="button" class="btn btn-primary full-width btn-pulse" @click="openCheckout('All-in-One Studio Bundle', 499000)">
              <i class="fa-solid fa-gift"></i> Mua Trọn Bộ 499.000₫ (Tiết kiệm 60%)
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CHECKOUT MODAL POPUP ===== -->
    <Transition name="fade">
      <div v-if="selectedPreset" class="checkout-modal-backdrop" @click.self="closeCheckout">
        <div class="checkout-modal-glass glass-card">
          <button type="button" class="modal-close-btn" @click="closeCheckout" aria-label="Đóng">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="modal-header text-center">
            <span class="header-tag">TẢI FILE NHANH CHÓNG</span>
            <h3>Tải Gói {{ selectedPreset.title }}</h3>
            <p class="modal-sub">Quét mã QR thanh toán và nhận ngay link Google Drive tốc độ cao qua Zalo</p>
          </div>

          <div class="modal-body">
            <div class="client-input-row">
              <label for="client-phone">Số điện thoại của bạn (để xác nhận tải file):</label>
              <input 
                id="client-phone" 
                v-model="clientPhone" 
                type="tel" 
                placeholder="Nhập SĐT của bạn (VD: 09xx...)" 
                class="phone-input"
              />
            </div>

            <VietQRPayment 
              :amount="selectedPreset.price" 
              :service-name="`PRESET ${selectedPreset.code}`" 
              :client-name="clientPhone || 'KHACH HANG'" 
            />

            <div class="instant-access-box glass-card text-center">
              <i class="fa-solid fa-shield-check" style="color: var(--teal); font-size: 1.5rem; margin-bottom: 0.5rem;"></i>
              <p>Sau khi quét mã, vui lòng bấm nút bên dưới để gửi tin nhắn xác nhận qua Zalo. Đội ngũ XKProduction sẽ gửi ngay link tải tốc độ cao!</p>
              <a 
                :href="`https://zalo.me/0355356294?text=${encodeURIComponent(`Chào XKProduction, tôi vừa chuyển khoản mua ${selectedPreset.title} qua SĐT ${clientPhone}`)}`" 
                target="_blank" 
                rel="noopener" 
                class="btn btn-primary full-width"
                style="margin-top: 1rem;"
              >
                <i class="fa-solid fa-comment-dots"></i> Nhận Link File Qua Zalo (0355.356.294)
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ===== COMPANION AI TOOL BANNER ===== -->
    <section class="section-block companion-tool-section">
      <div class="editorial-container">
        <div class="companion-tool-card glass-card hover-lift">
          <div class="companion-content">
            <span class="header-tag" style="display: inline-flex; align-items: center; gap: 0.4rem;">
              <i class="fa-solid fa-wand-magic-sparkles"></i> CÔNG CỤ MIỄN PHÍ ĐỒNG HÀNH
            </span>
            <h3 class="companion-title">Cần Tách Vocal Acapella Để Thử Preset Hoặc Tách Beat Karaoke?</h3>
            <p class="companion-desc">
              Trải nghiệm ngay <strong>TáchNhạc.com</strong> — nền tảng AI trực tuyến miễn phí do chính chúng tôi phát triển, giúp bạn bóc tách giọng hát, tách beat sạch sẽ và khử tiếng ồn chỉ trong 10 giây trước khi đưa vào DAW xử lý.
            </p>
          </div>
          <div class="companion-cta">
            <a :href="createTachnhacReferralUrl('presets_companion_tachnhac')" target="_blank" rel="noopener" class="btn btn-primary btn-pulse">
              <span>Mở TáchNhạc.com</span>
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== FAQ FOR PRESETS ===== -->
    <section class="section-block presets-faq">
      <div class="editorial-container">
        <div class="section-header-center text-center" style="margin-bottom: 2.5rem;">
          <h2 class="section-heading-heavy text-center">Câu Hỏi Thường Gặp Về Preset</h2>
        </div>

        <div class="faq-accordion glass-card">
          <div class="faq-row">
            <h4><i class="fa-solid fa-circle-question" style="color: var(--primary);"></i> Tôi dùng micro bình dân (USB/Focusrite) có hiệu quả không?</h4>
            <p>Hoàn toàn hiệu quả! Các preset này được thiết kế dựa trên tần số trung thực, chuyên xử lý những nhược điểm cố hữu của phòng thu tại nhà chưa cách âm hoàn hảo (ù dải trầm, tiếng gió, dải cao bị gắt).</p>
          </div>
          <div class="faq-row">
            <h4><i class="fa-solid fa-circle-question" style="color: var(--primary);"></i> Tôi chưa từng mix nhạc bao giờ có dùng được không?</h4>
            <p>Rất dễ sử dụng. Video hướng dẫn đi kèm chỉ dài 3 phút chỉ rõ từng cú click chuột. Bạn chỉ cần mở bài hát, chọn import preset vào track vocal là xong.</p>
          </div>
          <div class="faq-row">
            <h4><i class="fa-solid fa-circle-question" style="color: var(--primary);"></i> Tôi có được hỗ trợ cài đặt nếu gặp khó khăn không?</h4>
            <p>Có. Đội ngũ kỹ thuật XKProduction hỗ trợ trực tiếp qua Zalo 0355.356.294 hoặc UltraViewer nếu bạn cần trợ giúp kỹ thuật.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const clientPhone = ref('')
const selectedPreset = ref<{ title: string; price: number; code: string } | null>(null)

const openCheckout = (title: string, price: number) => {
  const code = title.replace(/\s+/g, '').toUpperCase().slice(0, 10)
  selectedPreset.value = { title, price, code }
}

const closeCheckout = () => {
  selectedPreset.value = null
}

useSeoMeta({
  title: 'Kho Vocal Presets & Template Phòng Thu — Logic Pro, FL Studio | XKProduction',
  description: 'Tải bộ Vocal Chain Presets và Template phòng thu chuyên nghiệp từ XKProduction. Cài đặt 3 phút, tối ưu giọng hát dày ấm, sáng sang chuẩn phát hành Spotify ngay tại nhà.',
  keywords: 'vocal preset logic pro, vocal preset fl studio, template thu am, mix vocal cover tai nha, preset vocal dep, xkproduction presets',
  ogTitle: 'Kho Vocal Presets & Template Phòng Thu — XKProduction',
  ogDescription: 'Tải bộ chuỗi xử lý âm thanh Vocal Chain & Template dự án chuẩn studio do Nguyễn Xuân Kiệt thiết kế.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogType: 'website',
  ogUrl: 'https://xkproduction.com/presets',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
})

useSchemaOrg([
  defineWebPage({
    name: 'Kho Vocal Presets & Template Phòng Thu — XKProduction',
    description: 'Tải bộ chuỗi xử lý âm thanh Vocal Chain & Template dự án chuẩn studio do Nguyễn Xuân Kiệt thiết kế.'
  }),
  defineProduct({
    name: 'Vocal Warm Ballad Preset',
    offers: [{ price: '199000', priceCurrency: 'VND' }]
  }),
  defineProduct({
    name: 'Vocal Bright & Airy Preset',
    offers: [{ price: '199000', priceCurrency: 'VND' }]
  }),
  defineProduct({
    name: 'Modern Rap / Trap Autotune Preset',
    offers: [{ price: '249000', priceCurrency: 'VND' }]
  }),
  defineProduct({
    name: 'Full Studio Vocal Suite + Template DAW',
    offers: [{ price: '499000', priceCurrency: 'VND' }]
  })
])
</script>

<style scoped>
.presets-page-wrap {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-dark);
  min-height: 100vh;
}

.immersive-ambient-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-color: var(--bg-dark);
}

.glow-spot {
  position: absolute;
  border-radius: 50%;
  filter: blur(150px);
  opacity: 0.16;
}

.spotlight-1 {
  width: 550px;
  height: 550px;
  top: -12%;
  left: -12%;
  background: rgba(125, 211, 252, 0.32);
}

.spotlight-2 {
  width: 650px;
  height: 650px;
  bottom: -12%;
  right: -12%;
  background: rgba(56, 189, 248, 0.2);
}

.page-hero {
  padding-top: 190px;
  padding-bottom: 4.5rem;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 1.6rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.page-hero-title {
  font-size: clamp(2.3rem, 5vw, 3.8rem);
  font-weight: 800;
  letter-spacing: -0.005em;
  color: var(--text-main);
  margin-bottom: 1.2rem;
  line-height: 1.22;
  text-wrap: balance;
}

.page-hero-sub {
  font-size: clamp(0.95rem, 1.4vw, 1.1rem);
  color: var(--text-light);
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.75;
}

/* Value props banner */
.value-props-section {
  position: relative;
  z-index: 1;
  margin-bottom: 5rem;
}

.props-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  padding: 3rem 2.5rem;
}

.prop-icon {
  width: 54px;
  height: 54px;
  border-radius: 14px;
  background: rgba(26, 140, 255, 0.12);
  color: var(--primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
}

.prop-item h4 {
  font-size: 1.15rem;
  color: #fff;
  margin-bottom: 0.5rem;
}

.prop-item p {
  font-size: 0.88rem;
  color: var(--text-light);
  line-height: 1.6;
}

/* Presets Catalog */
.presets-catalog {
  position: relative;
  z-index: 1;
  padding-bottom: 6rem;
}

.presets-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
}

.preset-card {
  padding: 2.8rem 2.2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 20px;
  overflow: visible !important;
}

.card-top-tag {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 1.2px;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.preset-icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  color: var(--primary);
  margin-bottom: 1.2rem;
}

.preset-name {
  font-size: 1.45rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.8rem;
}

.preset-desc {
  color: var(--text-light);
  font-size: 0.92rem;
  line-height: 1.65;
  margin-bottom: 1.8rem;
}

.preset-specs {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 2rem;
  padding-bottom: 1.8rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.preset-specs span {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: var(--text-main);
  font-size: 0.88rem;
}

.preset-specs i {
  color: var(--teal);
  font-size: 0.82rem;
}

.preset-price-box {
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
  margin-bottom: 1.8rem;
  margin-top: auto;
}

.price-val {
  font-size: 2.2rem;
  font-weight: 850;
  color: #fff;
  line-height: 1;
}

.price-old {
  font-size: 1.05rem;
  color: var(--text-muted);
  text-decoration: line-through;
}

.full-width {
  width: 100%;
}

/* Featured styles */
.featured-preset {
  border-color: rgba(26, 140, 255, 0.4);
  background: linear-gradient(180deg, rgba(26, 140, 255, 0.09) 0%, rgba(255, 255, 255, 0.03) 100%);
  box-shadow: 0 16px 48px rgba(26, 140, 255, 0.16);
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
}

.mega-bundle {
  grid-column: 1 / -1;
  background: radial-gradient(circle at top right, rgba(0, 212, 170, 0.12), transparent 40%),
              radial-gradient(circle at bottom left, rgba(26, 140, 255, 0.14), transparent 50%),
              rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(0, 212, 170, 0.35);
  box-shadow: 0 20px 60px rgba(0, 212, 170, 0.12);
}

.bundle-super-badge {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #00d4aa 0%, #1a8cff 100%);
  color: #030a14;
  padding: 0.4rem 1.4rem;
  border-radius: 20px;
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 4px 20px rgba(0, 212, 170, 0.5);
}

.bundle-glow {
  background: rgba(0, 212, 170, 0.18);
  color: #00d4aa;
}

/* Modal Popup */
.checkout-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.82);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.checkout-modal-glass {
  max-width: 680px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2.8rem 2.2rem;
  border-radius: 24px;
  position: relative;
  background: #09121d;
  border: 1px solid rgba(26, 140, 255, 0.35);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.8);
}

.modal-close-btn {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

.modal-close-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.08);
}

.modal-header h3 {
  font-size: 1.6rem;
  color: #fff;
  margin: 0.6rem 0 0.4rem;
}

.modal-sub {
  color: var(--text-light);
  font-size: 0.92rem;
}

.client-input-row {
  margin: 1.8rem 0 1.2rem;
}

.client-input-row label {
  display: block;
  color: var(--text-main);
  font-size: 0.88rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.phone-input {
  width: 100%;
  padding: 0.85rem 1.2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  color: #fff;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.28s ease;
}

.phone-input:focus {
  border-color: var(--primary);
}

.instant-access-box {
  margin-top: 1.8rem;
  padding: 1.5rem;
  border-radius: 14px;
}

.instant-access-box p {
  color: var(--text-light);
  font-size: 0.88rem;
  line-height: 1.6;
}

/* FAQ for presets */
.presets-faq {
  position: relative;
  z-index: 1;
  padding-bottom: 7rem;
}

.faq-accordion {
  padding: 2rem 2.5rem;
  border-radius: 20px;
}

.faq-row {
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.faq-row:last-child {
  border-bottom: none;
}

.faq-row h4 {
  font-size: 1.1rem;
  color: #fff;
  margin-bottom: 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.faq-row p {
  color: var(--text-light);
  font-size: 0.92rem;
  line-height: 1.7;
  padding-left: 1.8rem;
}

/* Responsive */
@media (max-width: 992px) {
  .props-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .presets-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-hero {
    padding-top: 140px;
  }
  .preset-card {
    padding: 2.2rem 1.6rem;
  }
  .faq-row p {
    padding-left: 0;
  }
}

/* COMPANION TOOL CARD */
.companion-tool-section {
  padding: 2rem 0 3rem;
}

.companion-tool-card {
  padding: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(20, 24, 33, 0.8) 100%);
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-radius: 16px;
}

.companion-content {
  flex: 1;
  max-width: 720px;
}

.companion-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #fff;
  margin: 0.75rem 0 0.5rem;
  line-height: 1.3;
}

.companion-desc {
  color: var(--text-light);
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

.companion-desc strong {
  color: #fbbf24;
}

.companion-cta {
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .companion-tool-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem 1.5rem;
  }
  .companion-cta {
    width: 100%;
  }
  .companion-cta a {
    width: 100%;
    justify-content: center;
  }
}
</style>
