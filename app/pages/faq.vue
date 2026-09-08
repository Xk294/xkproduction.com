<template>
  <div class="faq-page-wrap">
    <!-- INTERACTIVE AMBIENT GLOW BACKDROP -->
    <div class="immersive-ambient-bg" aria-hidden="true">
      <div class="glow-spot spotlight-1"></div>
      <div class="glow-spot spotlight-2"></div>
    </div>

    <!-- ===== HERO SECTION ===== -->
    <section class="page-hero">
      <div class="max-width">
        <span class="hero-badge"><i class="fa-solid fa-circle-question"></i> HỎI &amp; ĐÁP</span>
        <h1 class="page-hero-title">Giải Đáp <span class="text-gradient-animated">Thắc Mắc</span></h1>
        <p class="page-hero-sub">Tổng hợp câu hỏi thường gặp về dịch vụ thu âm, hoà âm phối khí, mix &amp; master và chính sách tại XKProduction.</p>
      </div>
    </section>

    <!-- ===== FAQ CONTENT ACCORDION ===== -->
    <section class="section-block faq-section" aria-labelledby="faq-list-heading">
      <h2 id="faq-list-heading" class="sr-only">Danh sách câu hỏi thường gặp</h2>
      <div class="max-width faq-container">
        <FaqItem v-for="faq in faqs" :key="faq.question" :question="faq.question" :answer="faq.answer" />
      </div>
    </section>

    <!-- ===== FINAL CALL TO ACTION ===== -->
    <section class="section-block final-cta">
      <div class="max-width text-center">
        <div class="cta-box glass-card">
          <div class="cta-glow-spot"></div>
          <div class="cta-icon"><i class="fa-solid fa-headset"></i></div>
          <h2>Vẫn còn những câu hỏi khác?</h2>
          <p>Đừng ngần ngại liên hệ trực tiếp với chúng tôi. Đội ngũ tiếp nhận của XKProduction sẽ hỗ trợ giải đáp nhanh nhất trong vòng 24 giờ.</p>
          <div class="cta-actions">
            <NuxtLink to="/contact" class="btn btn-primary btn-pulse btn-large">Liên hệ tư vấn ngay</NuxtLink>
            <a href="https://zalo.me/0355356294" target="_blank" rel="noopener" class="btn btn-secondary btn-large">
              <i class="fa-solid fa-comment"></i> Nhắn qua Zalo
            </a>
          </div>
        </div>
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
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogUrl: 'https://xkproduction.com/faq',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  keywords: 'faq thu âm, câu hỏi phòng thu, giá thu âm bao nhiêu, mix master online, phát hành Spotify, XKProduction'
})

const faqs = [
  {
    question: 'Chi phí thu âm tại XKProduction là bao nhiêu?',
    answer: 'Chi phí thu âm tại XKProduction bắt đầu từ 350.000₫/bài đối với gói Demo/Cơ Bản (thu 1-2h, chỉnh sửa tuning và timing cơ bản) và lên đến 1.800.000₫+ cho các gói chuyên nghiệp không giới hạn thời gian thu, tích hợp coaching biểu cảm và vocal direction chuyên sâu. Vui lòng xem chi tiết đầy đủ tại bảng giá dịch vụ để chọn gói phù hợp.'
  },
  {
    question: 'Làm thế nào để đặt lịch thu âm hoặc sản xuất?',
    answer: 'Bạn có thể liên hệ trực tiếp qua Zalo Hotline 0355.356.294 hoặc hoàn thành form tại trang Liên hệ. Đội ngũ tiếp nhận sẽ phản hồi, tư vấn phương án phù hợp nhất trong vòng 2 giờ, sau đó hỗ trợ xếp lịch thu và gửi checklist chuẩn bị cụ thể cho bạn.'
  },
  {
    question: 'XKProduction có hỗ trợ thu âm online không?',
    answer: 'Có, chúng tôi hỗ trợ dịch vụ Hoà âm Phối khí Online và Mix & Master Online cực kỳ linh hoạt. Bạn chỉ cần gửi file thu âm vocal mộc (file thô thu tại nhà hoặc từ phòng thu địa phương khác) kèm demo qua Zalo hoặc Google Drive. Chúng tôi sẽ sản xuất bản phối mới, cân chỉnh vocal và hoàn thiện master đạt chuẩn Spotify.'
  },
  {
    question: 'XKProduction có hỗ trợ sản xuất MV, TVC, podcast không?',
    answer: 'Có, bên cạnh sản xuất âm thanh, chúng tôi sở hữu ekip media chuyên nghiệp chuyên sản xuất MV ca nhạc (Music Video), TVC quảng cáo doanh nghiệp, quay Live Session ban nhạc, và sản xuất Video Podcast trọn gói từ khâu lên ý tưởng kịch bản, quay phim đến dựng hậu kỳ, phân màu.'
  },
  {
    question: 'Thời gian hoàn thành dự án bao lâu?',
    answer: 'Thời gian hoàn thiện tuỳ thuộc vào quy mô dự án: Bản phối demo/beat cơ bản có thể bàn giao trong vòng 2-3 ngày làm việc; dịch vụ Mixing & Mastering chuyên nghiệp thường mất từ 3-7 ngày; đối với các dự án sản xuất MV, TVC quảng cáo trọn gói cần thời gian từ 2-4 tuần để chuẩn bị tiền kỳ và hậu kỳ kỹ lưỡng.'
  },
  {
    question: 'XKProduction hỗ trợ phát hành nhạc lên Spotify không?',
    answer: 'Có, khi đăng ký gói chuyên nghiệp hoặc gói combo sản xuất trọn gói, XKProduction sẽ hỗ trợ tư vấn và thực hiện thủ tục phân phối bản nhạc của bạn lên tất cả các nền tảng nhạc số lớn như Spotify, Apple Music, YouTube Music, TikTok... một cách chuyên nghiệp với đầy đủ thông tin tác giả và bản quyền.'
  },
  {
    question: 'Tôi có thể tham quan phòng thu trước khi đặt lịch không?',
    answer: 'Hoàn toàn có thể. Hãy liên hệ qua Hotline 0355.356.294 để đặt lịch hẹn ghé thăm phòng thu của chúng tôi hoàn toàn miễn phí, tham quan cơ sở vật chất, hệ thống trang thiết bị và trao đổi trực tiếp ý tưởng âm nhạc với đội ngũ kỹ sư âm thanh.'
  },
  {
    question: 'XKProduction có nhận dự án từ tỉnh thành khác không?',
    answer: 'Có, với quy trình làm việc từ xa chuẩn hoá, XKProduction thường xuyên hợp tác với các nghệ sĩ, khách hàng trên khắp cả nước (TP.HCM, Hà Nội, Đà Nẵng, các tỉnh miền Tây và Tây Nguyên). Việc trao đổi ý tưởng, gửi file demo và nhận phản hồi chỉnh sửa đều được thực hiện trực tuyến vô cùng thuận tiện.'
  },
  {
    question: 'Giờ làm việc của XKProduction là mấy giờ?',
    answer: 'Phòng thu hoạt động linh hoạt từ Thứ 2 đến Thứ 6 (7:00 – 22:00) và Thứ 7 – Chủ nhật (8:00 – 20:00). Để đảm bảo trải nghiệm thu âm không bị gián đoạn và nhận được sự hỗ trợ tốt nhất từ kỹ sư âm thanh, quý khách vui lòng đặt lịch hẹn trước tối thiểu 24 tiếng.'
  },
  {
    question: 'Tôi cần chuẩn bị gì trước khi đến thu âm?',
    answer: 'Để đạt hiệu quả thu âm cao nhất, bạn nên: 1. Học thuộc lòng lời bài hát và tập hát chuẩn nhịp với beat ở nhà; 2. Giữ sức khoẻ và giọng hát ở trạng thái tốt nhất (hạn chế thức khuya, uống nước đá hoặc rượu bia trước ngày thu); 3. Gửi trước beat hoặc demo (nếu có) để kỹ sư phòng thu setup project sẵn sàng.'
  },
  {
    question: 'Sau khi thu âm tôi nhận được những file gì?',
    answer: 'Sau khi hoàn thành dự án, bạn sẽ nhận được các file xuất chất lượng cao bao gồm: Bản Master hoàn chỉnh dạng WAV (24-bit/48kHz chuẩn phát hành) & MP3 (320kbps), bản Beat đã mix lại khớp với Vocal (nếu hát karaoke/cover) và các file Multi-track/Stems lẻ nếu gói dịch vụ của bạn có hỗ trợ.'
  }
]

useSchemaOrg([
  defineWebPage({
    name: 'Câu hỏi thường gặp - XKProduction',
    description: 'Giải đáp các câu hỏi về dịch vụ thu âm, mixing, mastering, hòa âm phối khí và sản xuất MV tại XKProduction.'
  }),
  {
    '@type': 'FAQPage',
    'mainEntity': faqs.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  }
])
</script>

<style scoped>
.faq-page-wrap {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-dark);
}

/* ==============================================
   INTERACTIVE AMBIENT GLOW BACKDROP
   ============================================== */
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
  top: -10%;
  left: -10%;
  background: rgba(125, 211, 252, 0.35);
}

.spotlight-2 {
  width: 650px;
  height: 650px;
  bottom: -10%;
  right: -10%;
  background: rgba(56, 189, 248, 0.22);
}

/* ==============================================
   PAGE HERO
   ============================================== */
.page-hero {
  padding-top: 190px;
  padding-bottom: 5rem;
  text-align: center;
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
  font-size: clamp(2.3rem, 5vw, 3.6rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-main);
  margin-bottom: 1.2rem;
  line-height: 1.15;
}

.page-hero-sub {
  font-size: clamp(0.95rem, 1.4vw, 1.08rem);
  color: var(--text-light);
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ==============================================
   FAQ ACCORDION LIST
   ============================================== */
.faq-section {
  padding: 60px 0 100px;
  position: relative;
  z-index: 1;
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

/* ==============================================
   FINAL CALL TO ACTION
   ============================================== */
.final-cta {
  padding-bottom: 140px;
  position: relative;
  z-index: 1;
}

.cta-box {
  padding: 5rem 2.5rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(125, 211, 252, 0.12);
  background: radial-gradient(circle at top left, rgba(125, 211, 252, 0.05), transparent 30%),
              var(--glass-bg);
}

.cta-icon {
  font-size: 2.2rem;
  color: var(--accent);
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 10px rgba(125, 211, 252, 0.35));
  display: inline-block;
}

.cta-box h2 {
  font-size: clamp(1.8rem, 3vw, 2.3rem);
  color: var(--text-main);
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.cta-box p {
  color: var(--text-light);
  margin-bottom: 2.2rem;
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-large {
  padding: 0.95rem 2.2rem;
  font-size: 0.92rem;
  border-radius: 12px;
}

/* ==============================================
   RESPONSIVE
   ============================================== */
@media (max-width: 768px) {
  .page-hero { padding-top: 150px; padding-bottom: 3.5rem; }
  .faq-section { padding: 40px 0 80px; }
  .final-cta { padding-bottom: 80px; }
  .cta-box { padding: 3.5rem 1.5rem; }
}
</style>
