<template>
  <div>
    <section class="page-hero">
      <div class="max-width">
        <div class="hero-badge"><i class="fa-solid fa-circle-question"></i> HỎI &amp; ĐÁP</div>
        <h1>Câu hỏi thường gặp</h1>
        <p class="page-hero-sub">Giải đáp nhanh về dịch vụ, quy trình và bảng giá tại XKStudio</p>
      </div>
    </section>

    <section class="faq-section">
      <div class="max-width faq-container">
        <FaqItem v-for="faq in faqs" :key="faq.question" :question="faq.question" :answer="faq.answer" />
      </div>
    </section>

    <section class="cta-section">
      <div class="cta-inner">
        <div class="cta-icon"><i class="fa-solid fa-headset"></i></div>
        <h2>Vẫn còn câu hỏi?</h2>
        <p>Hãy liên hệ trực tiếp — chúng tôi sẽ tư vấn trong vòng 24 giờ.</p>
        <NuxtLink to="/contact" class="cta-btn">Liên hệ ngay <i class="fa-solid fa-arrow-right"></i></NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Hỏi & Đáp - Câu hỏi thường gặp về Thu âm, Mix Master | XKProduction',
  description: 'Giải đáp câu hỏi về giá thu âm (từ 350k), quy trình, thời gian hoàn thành, nhận mix master online, phát hành Spotify... tại XKProduction.',
  ogTitle: 'Câu hỏi thường gặp về Dịch vụ Thu âm & Mix Master - XKProduction',
  ogDescription: 'Tìm hiểu về giá thu âm, quy trình, hỗ trợ online, phát hành Spotify & các dịch vụ tại XKProduction.',
  ogImage: 'https://xkproduction.com/images/xk-logo-new.jpg',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogUrl: 'https://xkproduction.com/faq',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xkproduction.com/images/xk-logo-new.jpg',
  keywords: 'faq thu âm, câu hỏi phòng thu, giá thu âm bao nhiêu, mix master online, phát hành Spotify, XKProduction'
})

useSchemaOrg([
  defineWebPage({
    name: 'Câu hỏi thường gặp - XKProduction',
    description: 'Giải đáp các câu hỏi về dịch vụ thu âm, mixing, mastering, hòa âm phối khí và sản xuất MV tại XKStudio.'
  }),
  {
    '@type': 'FAQPage',
    'mainEntity': [
      { '@type': 'Question', 'name': 'Chi phí thu âm tại XKStudio là bao nhiêu?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Chi phí thu âm bắt đầu từ 350.000₫/bài cho gói Cơ Bản, đến 1.800.000₫+ cho gói Cao Cấp. Xem chi tiết tại trang Bảng giá.' } },
      { '@type': 'Question', 'name': 'Làm thế nào để đặt lịch thu âm hoặc sản xuất?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Bạn có thể liên hệ qua Zalo (0355.356.294), điện thoại hoặc form trên trang Liên hệ. Chúng tôi sẽ xác nhận lịch và gửi hướng dẫn chuẩn bị.' } },
      { '@type': 'Question', 'name': 'XKStudio có hỗ trợ phát hành nhạc lên Spotify không?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Có. XKStudio hỗ trợ phát hành lên Spotify, Apple Music, YouTube Music trong 1–2 tuần sau khi hoàn thành mastering.' } },
      { '@type': 'Question', 'name': 'Thời gian hoàn thành dự án bao lâu?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Demo/beat có thể trong 48h, mixing & mastering từ 3–7 ngày, sản xuất MV từ 2–4 tuần.' } },
      { '@type': 'Question', 'name': 'XKStudio có nhận dự án từ tỉnh thành khác không?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Có. Chúng tôi nhận mixing, mastering, hòa âm phối khí và tư vấn online cho khách hàng trên toàn quốc.' } },
      { '@type': 'Question', 'name': 'XKStudio có hỗ trợ sản xuất MV, TVC không?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Có. XKStudio cung cấp dịch vụ sản xuất MV, TVC, podcast với ekip đa chuyên môn từ tiền kỳ, hậu kỳ đến phát hành đa nền tảng.' } }
    ]
  }
])

const faqs = [
  { question: 'Chi phí thu âm tại XKStudio là bao nhiêu?', answer: 'Chi phí thu âm bắt đầu từ 350.000₫/bài cho gói Cơ Bản, đến 1.800.000₫+ cho gói Cao Cấp với coaching chuyên biệt. Xem chi tiết tại trang Bảng giá.' },
  { question: 'Làm thế nào để đặt lịch thu âm hoặc sản xuất?', answer: 'Bạn có thể liên hệ qua Zalo, điện thoại hoặc form trên trang Liên hệ. Chúng tôi sẽ xác nhận lịch, tư vấn kỹ thuật và gửi hướng dẫn chuẩn bị cho buổi thu.' },
  { question: 'XKStudio có hỗ trợ sản xuất MV, TVC, podcast không?', answer: 'Có. XKStudio cung cấp dịch vụ sản xuất MV, TVC, podcast với ekip đa chuyên môn từ tiền kỳ, hậu kỳ, sound design cho đến phát hành đa nền tảng.' },
  { question: 'Thời gian hoàn thành dự án bao lâu?', answer: 'Tùy theo quy mô dự án. Demo/beat có thể trong 48h, mixing & mastering từ 3–7 ngày, sản xuất MV từ 2–4 tuần. Timeline cụ thể sẽ được thảo luận khi tư vấn.' },
  { question: 'XKStudio hỗ trợ phát hành nhạc lên DSP không?', answer: 'Có. XKStudio hỗ trợ phát hành lên Spotify, Apple Music, YouTube Music trong 1–2 tuần sau khi hoàn thành mastering và xử lý metadata đầy đủ.' },
  { question: 'Tôi có thể nghe thử phòng thu trước khi đặt lịch không?', answer: 'Hoàn toàn có thể. Hãy liên hệ để đặt lịch tham quan phòng thu miễn phí và gặp gỡ đội ngũ trực tiếp.' },
  { question: 'XKStudio có nhận dự án từ tỉnh thành khác không?', answer: 'Có. Chúng tôi nhận mixing, mastering, hòa âm phối khí và tư vấn online cho khách hàng trên toàn quốc. File được trao đổi qua cloud storage và điều phối qua Zalo.' },
  { question: 'Tôi cần chuẩn bị gì trước khi đến thu âm?', answer: 'Bạn nên luyện tập bài hát thuần thục, mang file nhạc đệm (nếu có), và giọng hát trong tốt nhất. Ekip sẽ tư vấn thêm khi xác nhận lịch.' }
]
</script>

<style scoped>
.page-hero {
  padding-top: 140px;
  padding-bottom: 5rem;
  background: linear-gradient(160deg, #06080f 0%, #0d1117 60%, rgba(26, 140, 255, 0.04) 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.page-hero::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(26, 140, 255, 0.05) 0%, transparent 65%);
  top: -10%;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.2rem;
  border: 1px solid rgba(26, 140, 255, 0.25);
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--primary);
  margin-bottom: 1.5rem;
  background: rgba(26, 140, 255, 0.06);
}

.page-hero h1 {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #e6edf3 30%, #1a8cff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-hero-sub {
  font-size: 1.05rem;
  color: var(--text-light);
  max-width: 580px;
  margin: 0 auto;
  line-height: 1.7;
}

/* FAQ SECTION */
.faq-section {
  padding: 5rem 0;
  position: relative;
}

.faq-container {
  max-width: 780px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* CTA SECTION */
.cta-section {
  padding: 5rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(13, 17, 23, 0.8);
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.cta-inner {
  text-align: center;
  max-width: 520px;
  padding: 3.5rem 3rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(26, 140, 255, 0.15);
  border-radius: 20px;
  backdrop-filter: blur(12px);
  box-shadow: 0 0 60px rgba(26, 140, 255, 0.06), 0 20px 60px rgba(0, 0, 0, 0.3);
}

.cta-icon {
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: 1.25rem;
  filter: drop-shadow(0 0 12px rgba(26, 140, 255, 0.4));
}

.cta-inner h2 {
  font-size: 1.9rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 0.85rem;
}

.cta-inner p {
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 2rem;
  background: linear-gradient(135deg, #1a8cff 0%, #0066cc 100%);
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  border-radius: 10px;
  text-decoration: none;
  box-shadow: 0 0 25px rgba(26, 140, 255, 0.35);
  transition: all 0.3s ease;
  letter-spacing: 0.3px;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 40px rgba(26, 140, 255, 0.5), 0 8px 25px rgba(0, 0, 0, 0.3);
}

.cta-btn i {
  transition: transform 0.3s ease;
}

.cta-btn:hover i {
  transform: translateX(3px);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .page-hero h1 { font-size: 2rem; }
  .cta-inner { padding: 2.5rem 1.5rem; }
  .cta-inner h2 { font-size: 1.5rem; }
}

@media (max-width: 480px) {
  .page-hero h1 { font-size: 1.7rem; }
}
</style>
