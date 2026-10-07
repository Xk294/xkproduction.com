<template>
  <div class="faq-page-wrap">
    <!-- INTERACTIVE AMBIENT GLOW BACKDROP -->
    <div class="immersive-ambient-bg" aria-hidden="true">
      <div class="glow-spot spotlight-1"></div>
      <div class="glow-spot spotlight-2"></div>
    </div>

    <!-- ===== HERO SECTION ===== -->
    <section class="page-hero">
      <div class="editorial-container">
        <span class="badge-v2 amber"><i class="fa-solid fa-circle-question"></i> HỎI &amp; ĐÁP</span>
        <h1 class="page-hero-title">Giải Đáp <span class="text-gold-gradient">Thắc Mắc</span></h1>
        <p class="page-hero-sub">Tổng hợp câu hỏi thường gặp về dịch vụ sản xuất âm nhạc, hoà âm phối khí, mix &amp; master và chính sách tại XKProduction.</p>
      </div>
    </section>

    <!-- ===== FAQ CONTENT ACCORDION ===== -->
    <section class="section-block faq-section" aria-labelledby="faq-list-heading">
      <h2 id="faq-list-heading" class="sr-only">Danh sách câu hỏi thường gặp</h2>
      <div class="editorial-container faq-container">
        <FaqItem v-for="faq in faqs" :key="faq.question" :question="faq.question" :answer="faq.answer" />
      </div>
    </section>

    <!-- ===== FINAL CALL TO ACTION ===== -->
    <section class="section-block final-cta">
      <div class="editorial-container text-center">
        <div class="cta-box matte-card">
          <span class="badge-v2 amber">HỖ TRỢ TRỰC TIẾP</span>
          <h2 class="mt-3">Vẫn còn những câu hỏi khác?</h2>
          <p>Đừng ngần ngại liên hệ trực tiếp với chúng tôi. Đội ngũ sản xuất của XKProduction sẽ tư vấn chi tiết phương án phù hợp nhất cho bài hát của bạn.</p>
          <div class="cta-actions">
            <NuxtLink to="/start-a-project" class="btn btn-primary btn-large">Gửi Yêu Cầu Dự Án</NuxtLink>
            <a href="https://zalo.me/0355356294" target="_blank" rel="noopener" class="btn btn-secondary btn-large">
              <i class="fa-solid fa-comment-dots"></i> Nhắn Zalo Studio
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Hỏi & Đáp - Câu hỏi thường gặp về Sản Xuất Âm Nhạc, Phối Khí & Kí Âm | XKProduction',
  description: 'Giải đáp câu hỏi về sản xuất âm nhạc, hoà âm phối khí, dịch vụ kí âm viết sheet nhạc (từ 200k), hỗ trợ phát hành nhạc số miễn phí Spotify... tại XKProduction.',
  ogTitle: 'Câu hỏi thường gặp về Sản Xuất Âm Nhạc & Kí Âm - XKProduction',
  ogDescription: 'Tìm hiểu về dịch vụ hoà âm phối khí, quy trình sản xuất, kí âm sheet nhạc và chính sách hỗ trợ phát hành Spotify miễn phí tại XKProduction.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogUrl: 'https://xkproduction.com/faq',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  keywords: 'faq sản xuất âm nhạc, hoà âm phối khí, kí âm viết sheet nhạc, giá kí âm, phát hành spotify miễn phí, XKProduction'
})

const faqs = [
  {
    question: 'Trọng tâm dịch vụ chính của XKProduction là gì?',
    answer: 'Trọng tâm của XKProduction là Sản Xuất Âm Nhạc và Hoà Âm Phối Khí độc bản. Dù xuất phát điểm chỉ là một giai điệu mộc mạc hay bản thu thô trên điện thoại, Producer của chúng tôi sẽ cùng bạn phát triển thành một tác phẩm hoàn chỉnh: từ định hình phong cách, sáng tác beat may đo theo màu giọng, thu thanh tỉ mỉ đến hoàn thiện master đạt chuẩn streaming và đồng hành phát hành số đưa âm nhạc đến với khán giả.'
  },
  {
    question: 'XKProduction có dịch vụ Kí âm (viết sheet nhạc) không? Chi phí thế nào?',
    answer: 'Có. Dịch vụ Kí âm (Transcription) tại XKProduction giúp chuyển tải giai điệu, ca từ và hợp âm từ bản thu mộc hoặc tệp âm thanh thành bản sheet nhạc (Lead Sheet / Score) chuẩn mực. Tác phẩm được trình bày chỉn chu, bàn giao định dạng PDF chuẩn in ấn và file MIDI phục vụ tập dượt cùng ban nhạc hoặc hoàn thiện hồ sơ đăng ký quyền tác giả. Chi phí dao động từ 200.000₫ – 500.000₫/bài tuỳ độ dài và độ phức tạp cấu trúc.'
  },
  {
    question: 'XKProduction hỗ trợ phát hành nhạc lên Spotify và các nền tảng số có mất phí không?',
    answer: 'Hoàn toàn 0đ. Đối với mọi dự án sản xuất âm nhạc và hoà âm phối khí tại XKProduction, chúng tôi hỗ trợ phát hành tác phẩm lên toàn bộ các nền tảng streaming âm nhạc phổ biến (Spotify, Apple Music, YouTube Music, Zing MP3, TikTok...). Toàn bộ bản quyền tác phẩm và 100% doanh thu nhạc số thuộc về nghệ sĩ.'
  },
  {
    question: 'Làm thế nào để bắt đầu làm nhạc hoặc đặt lịch với studio?',
    answer: 'Bạn có thể gửi tệp demo qua mục "Khởi Động Dự Án" hoặc liên hệ trực tiếp qua Hotline/Zalo 0355.356.294. Music Producer Nguyễn Xuân Kiệt sẽ trực tiếp lắng nghe bản demo, trao đổi định hướng âm nhạc và đề xuất giải pháp sản xuất tối ưu nhất cho tác phẩm.'
  },
  {
    question: 'XKProduction có hỗ trợ làm việc online từ xa không?',
    answer: 'Có. XKProduction thường xuyên hợp tác sản xuất từ xa với các nghệ sĩ trên toàn quốc và hải ngoại. Quy trình làm việc online được chuẩn hóa chặt chẽ qua Google Drive và trao đổi trực tiếp: Producer cập nhật bản phối từng giai đoạn để bạn duyệt chi tiết, đảm bảo sự ăn ý và chất lượng tương đương làm việc tại studio.'
  },
  {
    question: 'Thời gian hoàn thành một bài hát thường mất bao lâu?',
    answer: 'Kí âm sheet nhạc hoàn thành trong 1 — 2 ngày. Bản phác thảo hoà âm demo để bạn duyệt nghe thử thực hiện trong 3 — 5 ngày. Dự án sản xuất hoàn thiện từ giai điệu mộc đến bản master cuối cùng thường từ 7 — 10 ngày làm việc.'
  },
  {
    question: 'Chi phí thu âm tại XKProduction là bao nhiêu?',
    answer: 'Chi phí thu âm tại studio từ 499.000₫/buổi (khoảng 2 — 3 giờ). Không gian phòng thu được xử lý âm học tiêu chuẩn, trang bị microphone condenser cao cấp và luôn có kỹ thuật viên kiên nhẫn định hướng xử lý thanh nhạc, cách bắt nhịp và biểu cảm câu chữ để bạn tự tin thể hiện trọn vẹn cảm xúc.'
  },
  {
    question: 'Tôi có thể ghé thăm studio trước khi làm việc không?',
    answer: 'Chúng tôi luôn sẵn sàng đón tiếp bạn. Bạn vui lòng liên hệ trước qua Zalo 0355.356.294 để sắp xếp lịch hẹn, trải nghiệm không gian làm việc của studio và trao đổi trực tiếp cùng Music Producer về định hướng tác phẩm trước khi tiến hành dự án.'
  },
  {
    question: 'Tôi cần chuẩn bị gì trước khi đến thu âm?',
    answer: 'Để buổi thu đạt chất lượng tốt nhất, bạn nên: 1. Nắm chắc ca từ và cấu trúc bài hát; 2. Giữ giọng và tinh thần thoải mái, hạn chế thức khuya và đồ uống lạnh trước ngày thu; 3. Giữ tâm lý thư giãn — Producer sẽ đồng hành hướng dẫn kỹ thuật thanh nhạc và bắt nhịp trong suốt buổi thu.'
  },
  {
    question: 'Sau khi hoàn thành tôi nhận được những file gì?',
    answer: 'Bạn sẽ nhận được trọn bộ sản phẩm hoàn thiện: File Master chất lượng cao (WAV 24-bit không nén & MP3 320kbps) đạt chuẩn streaming, Beat Playback (Instrumental/Karaoke) để biểu diễn, và bộ Stems đa kênh (theo yêu cầu) để lưu trữ vĩnh viễn.'
  }
]

useSchemaOrg([
  defineWebPage({
    name: 'Câu hỏi thường gặp - XKProduction',
    description: 'Giải đáp các câu hỏi về dịch vụ thu âm, mixing, mastering, hòa âm phối khí và sản xuất MV tại XKProduction.'
  }),
  ...faqs.map(item => defineQuestion({
    name: item.question,
    acceptedAnswer: item.answer
  }))
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
