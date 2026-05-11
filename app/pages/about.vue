<template>
  <div>
    <section class="page-hero">
      <div class="max-width">
        <h1>Giới Thiệu XKProduction</h1>
        <p class="page-hero-sub">Câu chuyện và sứ mệnh đằng sau những dự án âm nhạc</p>
      </div>
    </section>

    <section id="story" style="padding: 5rem 0;">
      <div class="max-width">
        <div class="section-title"><h2>Câu chuyện của chúng tôi</h2><p>Hành trình từ một phòng thu nhỏ đến trung tâm âm thanh chuyên nghiệp</p></div>
        <div class="grid-2" style="gap: 3rem; margin-top: 3rem;">
          <div>
            <p style="color: var(--text-light); line-height: 1.8; font-size: 1.05rem; margin-bottom: 1.5rem;">
              XKProduction được thành lập với sứ mệnh đơn giản: tạo ra một không gian nơi các nghệ sĩ, nhà sản xuất và doanh nghiệp có thể hiện thực hoá ý tưởng âm thanh của mình một cách chuyên nghiệp và hiệu quả nhất.
            </p>
            <p style="color: var(--text-light); line-height: 1.8; font-size: 1.05rem;">
              Trải qua hơn 7 năm, chúng tôi đã hoàn thiện kỹ năng, đầu tư vào thiết bị hiện đại và xây dựng đội ngũ gồm các kỹ thuật viên, producer và mix engineer có tư duy sáng tạo, kinh nghiệm thực chiến trên thị trường Việt Nam.
            </p>
          </div>
          <div style="background: linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(139,92,246,0.08) 100%); border-radius: 12px; padding: 2.5rem; border: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; min-height: 280px;">
            <div style="text-align: center;">
              <div style="margin-bottom: 1.5rem;">
                <img src="/images/founder-kiet.jpg" alt="Nguyễn Xuân Kiệt - Founder & Music Producer tại XKProduction" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 3px solid var(--primary); box-shadow: 0 0 20px rgba(0, 162, 255, 0.2);" />
              </div>
              <p style="color: var(--text-muted); font-size: 0.95rem;">Hơn 7 năm đồng hành cùng nghệ sĩ & doanh nghiệp Việt Nam</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NGHỆ SĨ TIÊU BIỂU -->
    <section id="artists" class="artists-section">
      <div class="max-width">
        <div class="section-title">
          <h2>Nghệ Sĩ Đã Tin Tưởng XKProduction</h2>
          <p>Những giọng ca tài năng đã chọn XKProduction để hiện thực hóa âm nhạc của mình</p>
        </div>
        <div class="artists-grid">
          <!-- Cao Thành Lâm -->
          <div class="artist-card">
            <div class="artist-photo-wrap">
              <img src="/images/cao-thanh-lam.jpg" alt="Cao Thành Lâm - Singer tại XKProduction Bình Phước" class="artist-photo" loading="lazy" />
              <div class="artist-photo-glow"></div>
            </div>
            <div class="artist-info">
              <strong class="artist-name">Cao Thành Lâm</strong>
              <span class="artist-role"><i class="fa-solid fa-microphone"></i> Singer</span>
              <blockquote class="artist-quote">
                "XKProduction hiểu điều mà nhiều studio không có — sự tôn trọng giọng hát tự nhiên. Mỗi session ở đây đều thoải mái và hiệu quả, chắc chắn sẽ quay lại."
              </blockquote>
            </div>
          </div>

          <!-- Revan -->
          <div class="artist-card">
            <div class="artist-photo-wrap">
              <img src="/images/revan.jpg" alt="Revan - Rapper tại XKProduction" class="artist-photo" loading="lazy" />
              <div class="artist-photo-glow"></div>
            </div>
            <div class="artist-info">
              <strong class="artist-name">Revan</strong>
              <span class="artist-role"><i class="fa-solid fa-music"></i> Nghệ Sĩ / Rapper</span>
              <blockquote class="artist-quote">
                "XKProduction là nơi đầu tiên mình cảm thấy âm nhạc thực sự được lắng nghe. Từ tư vấn concept đến bản mix hoàn thiện — mọi chi tiết đều được chăm chút."
              </blockquote>
            </div>
          </div>

          <!-- Howl -->
          <div class="artist-card">
            <div class="artist-photo-wrap">
              <img src="/images/howl.jpg" alt="Howl - Rapper tại XKProduction" class="artist-photo" loading="lazy" />
              <div class="artist-photo-glow"></div>
            </div>
            <div class="artist-info">
              <strong class="artist-name">Howl</strong>
              <span class="artist-role"><i class="fa-solid fa-music"></i> Nghệ Sĩ / Rapper</span>
              <blockquote class="artist-quote">
                "Kết quả cuối cùng vượt xa những gì mình tưởng tượng. Sound rõ ràng, sắc nét, và đúng chất. Đội ngũ chuyên nghiệp, phản hồi nhanh."
              </blockquote>
            </div>
          </div>

          <!-- Fesu -->
          <div class="artist-card">
            <div class="artist-photo-wrap">
              <img src="/images/fesu.jpg" alt="Fesu - Singer tại XKProduction" class="artist-photo" loading="lazy" />
              <div class="artist-photo-glow"></div>
            </div>
            <div class="artist-info">
              <strong class="artist-name">Fesu</strong>
              <span class="artist-role"><i class="fa-solid fa-microphone"></i> Singer</span>
              <blockquote class="artist-quote">
                "XKProduction có một điều mà không phải studio nào cũng có — sự kiên nhẫn. Không rush, không qua loa. Sản phẩm ra lò chất lượng, mình tự hào chia sẻ."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="mission" style="padding: 4rem 0; background: var(--bg-surface);">
      <div class="max-width">
        <div class="section-title"><h2>Sứ mệnh & Giá trị</h2><p>Những nguyên tắc định hướng mọi dự án chúng tôi thực hiện</p></div>
        <div class="grid-2" style="margin-top: 3rem;">
          <div class="card">
            <div style="font-size: 2rem; margin-bottom: 1rem;"><i class="fa-solid fa-bullseye" style="color: var(--primary);"></i></div>
            <h3>Sứ mệnh</h3>
            <p style="color: var(--text-light);">Trao quyền cho nghệ sĩ và doanh nghiệp thông qua các giải pháp sản xuất âm thanh chuyên nghiệp, truyền cảm hứng và tạo ra tác động thực sự.</p>
          </div>
          <div class="card">
            <div style="font-size: 2rem; margin-bottom: 1rem;"><i class="fa-solid fa-star" style="color: var(--primary);"></i></div>
            <h3>Giá trị cốt lõi</h3>
            <ul style="text-align: left; color: var(--text-light); list-style: none; padding: 0;">
              <li style="margin-bottom: 0.6rem;"><i class="fa-solid fa-check" style="color: var(--primary); margin-right: 0.5rem;"></i>Chất lượng trong từng dự án</li>
              <li style="margin-bottom: 0.6rem;"><i class="fa-solid fa-check" style="color: var(--primary); margin-right: 0.5rem;"></i>Minh bạch &amp; chuyên nghiệp</li>
              <li style="margin-bottom: 0.6rem;"><i class="fa-solid fa-check" style="color: var(--primary); margin-right: 0.5rem;"></i>Sáng tạo &amp; đổi mới liên tục</li>
              <li style="margin-bottom: 0.6rem;"><i class="fa-solid fa-check" style="color: var(--primary); margin-right: 0.5rem;"></i>Đồng hành &amp; lắng nghe khách hàng</li>
              <li><i class="fa-solid fa-check" style="color: var(--primary); margin-right: 0.5rem;"></i>Cam kết đúng timeline &amp; ngân sách</li>
            </ul>
          </div>
        </div>
      </div>
    </section>


    <section id="cta" style="text-align: center; padding: 5rem 2rem; background: var(--bg-surface);">
      <h2 style="font-size: 2.2rem; margin-bottom: 1rem;">Hãy cùng tạo ra điều tuyệt vời</h2>
      <p style="font-size: 1.05rem; color: var(--text-light); margin-bottom: 2rem; max-width: 560px; margin-left: auto; margin-right: auto;">Chia sẻ ý tưởng của bạn — chúng tôi sẽ đề xuất giải pháp phù hợp nhất.</p>
      <NuxtLink to="/contact" class="btn btn-primary">Liên hệ ngay</NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Giới Thiệu XKProduction - Phòng Thu Âm & Âm Thanh Ánh Sáng Chuyên Nghiệp',
  description: 'XKProduction — Phòng thu âm và media production chương nghiệp. Hơn 7 năm đồng hành cùng 2000+ dự án âm nhạc, 30+ đối tác, 50+ học viên đào tạo. Founder: Nguyễn Xuân Kiệt — Music Producer & Sound Engineer.',
  ogTitle: 'Giới Thiệu XKProduction - Phòng Thu Âm & Media Production',
  ogDescription: 'Khám phá câu chuyện XKProduction: Hơn 7 năm xây dựng, 2000+ dự án, đội ngũ Founder Nguyễn Xuân Kiệt và sứ mệnh nâng tầm âm nhạc Việt.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Nguyễn Xuân Kiệt - Founder & Music Producer XKProduction',
  ogUrl: 'https://xkproduction.com/about',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  keywords: 'giới thiệu XKProduction, Nguyễn Xuân Kiệt, founder XKProduction, music producer, phòng thu âm chuyên nghiệp, về chúng tôi'
})

useSchemaOrg([
  defineWebPage({
    name: 'Giới Thiệu XKProduction',
    description: 'Tìm hiểu về XKProduction, Founder Nguyễn Xuân Kiệt và hành trình kiến tạo âm thanh chuyên nghiệp. Đội ngũ kỹ thuật viên giàu kinh nghiệm.'
  }),
  {
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Trang chủ', 'item': 'https://xkproduction.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Giới Thiệu XKProduction', 'item': 'https://xkproduction.com/about' }
    ]
  },
  definePerson({
    name: 'Nguyễn Xuân Kiệt',
    jobTitle: 'Founder & Music Producer',
    worksFor: { name: 'XKProduction', url: 'https://xkproduction.com' },
    description: 'Music Producer & Sound Engineer với hơn 7 năm kinh nghiệm, Founder của XKProduction.',
    image: 'https://xkproduction.com/images/founder-kiet.jpg',
    sameAs: ['https://www.facebook.com/ngxkiet']
  })
])

</script>

<style scoped>
.page-hero {
  padding-top: 140px;
  padding-bottom: 4rem;
  background: linear-gradient(135deg, #06080f 0%, #0d1117 100%);
  text-align: center;
}

.page-hero h1 {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 1rem;
}

.page-hero-sub {
  font-size: 1.05rem;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
}

.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }

@media (max-width: 992px) {
  .grid-2 { grid-template-columns: 1fr; }
  .grid-4 { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 576px) {
  .grid-4 { grid-template-columns: 1fr; }
  .page-hero h1 { font-size: 2rem; }
}

.section-title { text-align: center; }
.section-title h2 { font-size: 2rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem; }
.section-title p { color: var(--text-light); }

/* ===== ARTISTS SECTION ===== */
.artists-section {
  padding: 5rem 0;
  background: linear-gradient(180deg, #06080f 0%, #0a0d18 100%);
}
.artists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
}
.artist-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(26,140,255,0.1);
  border-radius: 18px;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
  backdrop-filter: blur(12px);
}
.artist-card:hover {
  transform: translateY(-6px);
  border-color: rgba(26,140,255,0.28);
  background: rgba(26,140,255,0.06);
  box-shadow: 0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(26,140,255,0.08);
}
.artist-photo-wrap {
  position: relative;
  width: 100px;
  height: 100px;
  margin-bottom: 1.25rem;
  flex-shrink: 0;
}
.artist-photo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(26,140,255,0.35);
  box-shadow: 0 0 20px rgba(26,140,255,0.25);
  transition: border-color 0.35s, box-shadow 0.35s;
}
.artist-card:hover .artist-photo {
  border-color: rgba(26,140,255,0.7);
  box-shadow: 0 0 30px rgba(26,140,255,0.45);
}
.artist-photo-glow {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #1a8cff, #00e5c0, #8b5cf6, #1a8cff);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.4s;
  filter: blur(6px);
}
.artist-card:hover .artist-photo-glow { opacity: 0.5; }

.artist-info { width: 100%; }
.artist-name {
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.35rem;
}
.artist-role {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: #5bbfff;
  font-weight: 600;
  margin-bottom: 1rem;
}
.artist-role i { font-size: 0.75rem; }
.artist-quote {
  margin: 0;
  padding: 0;
  border: none;
  font-size: 0.85rem;
  color: var(--text-light);
  line-height: 1.7;
  font-style: italic;
}

@media (max-width: 768px) {
  .artists-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .artists-grid { grid-template-columns: 1fr; }
}
</style>
