<template>
  <div class="courses-page-wrap">
    <!-- INTERACTIVE AMBIENT GLOW BACKDROP -->
    <div class="immersive-ambient-bg" aria-hidden="true">
      <div class="glow-spot spotlight-1"></div>
      <div class="glow-spot spotlight-2"></div>
    </div>

    <!-- ===== HERO SECTION ===== -->
    <section class="page-hero">
      <div class="editorial-container">
        <span class="badge-v2 amber"><i class="fa-solid fa-graduation-cap"></i> HỌC LÀM NHẠC ONLINE 1 KÈM 1</span>
        <h1 class="page-hero-title">Khóa Học <span class="text-gold-gradient">Làm Nhạc Online 1 Kèm 1</span></h1>
        <p class="page-hero-sub">Học trực tiếp trên chính máy tính của bạn qua Google Meet. Giảng viên mở máy cùng làm, sai đâu sửa đó ngay trong buổi. Dù chưa biết gì về nhạc lý, bạn vẫn tự tin tự làm beat, mix giọng và hoàn thiện bài hát của riêng mình.</p>
        <div class="hero-stats-row">
          <div class="hero-stat-pill"><i class="fa-solid fa-calendar-check text-amber"></i> Đúng 15 Buổi/Khóa (1 Kèm 1)</div>
          <div class="hero-stat-pill"><i class="fa-solid fa-laptop text-teal"></i> Học Trực Tiếp Trên Máy Bạn</div>
          <div class="hero-stat-pill"><i class="fa-solid fa-clock text-amber"></i> Giờ Học Linh Hoạt Theo Bạn</div>
          <div class="hero-stat-pill"><i class="fa-solid fa-compact-disc text-teal"></i> Tự Tay Làm Xong 1 Bài Hát</div>
        </div>
      </div>
    </section>

    <!-- ===== SECTION 1: WHY CHOOSE US ===== -->
    <section class="section-block">
      <div class="editorial-container">
        <div class="section-header-center text-center">
          <span class="badge-v2 amber">TẠI SAO HỌC CÙNG XK?</span>
          <h2 class="editorial-heading text-center mt-3">Học Thật, Làm Thật</h2>
          <p class="section-subtitle">Không dạy lý thuyết dài dòng, vào học là mở phần mềm cùng làm nhạc ngay</p>
        </div>

        <div class="why-grid">
          <div v-for="item in whyUs" :key="item.title" class="why-card matte-card hover-lift">
            <div class="why-icon"><i :class="item.icon"></i></div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SECTION 2: COURSES PROGRAM (3 KHÓA HỌC) ===== -->
    <section class="section-block section-courses" id="khoa-hoc">
      <div class="editorial-container">
        <div class="section-header-center text-center">
          <span class="badge-v2 teal">3 KHÓA HỌC ONLINE 1 KÈM 1</span>
          <h2 class="editorial-heading text-center mt-3">Chọn Khóa Học Phù Hợp Với Bạn</h2>
          <p class="section-subtitle">Mỗi khóa kéo dài đúng 15 buổi kèm 1-1, tập trung giải quyết đúng nhu cầu làm nhạc thực tế của bạn</p>
        </div>

        <div class="courses-grid">
          <!-- KHÓA 1: HOÀ ÂM PHỐI KHÍ (CƠ BẢN 7TR & NÂNG CAO 15TR) -->
          <div class="course-card matte-card hover-lift accent-blue">
            <div class="course-header">
              <div class="course-icon"><i class="fa-solid fa-keyboard"></i></div>
              <div class="course-meta">
                <span class="course-level text-meta-mono">KHÓA 01 • 15 BUỔI</span>
                <span class="course-duration"><i class="fa-regular fa-clock"></i> 1 Kèm 1 Online</span>
              </div>
            </div>

            <h3 class="course-title">Khóa Hoà Âm Phối Khí</h3>
            <p class="course-desc">Học cách tư duy và tự tay dựng bản beat từ đầu đến cuối. Khóa học chia làm 2 cấp độ tùy theo trình độ hiện tại của bạn:</p>

            <!-- SWITCH CẤP ĐỘ TRONG CARD -->
            <div class="level-switch-container">
              <button
                type="button"
                class="level-switch-btn"
                :class="{ active: hoaAmLevel === 'co-ban' }"
                @click="hoaAmLevel = 'co-ban'"
              >
                Cơ Bản (7tr)
              </button>
              <button
                type="button"
                class="level-switch-btn"
                :class="{ active: hoaAmLevel === 'nang-cao' }"
                @click="hoaAmLevel = 'nang-cao'"
              >
                Nâng Cao (15tr)
              </button>
            </div>

            <!-- NỘI DUNG THEO CẤP ĐỘ ĐANG CHỌN -->
            <div v-if="hoaAmLevel === 'co-ban'" class="level-detail-box">
              <div class="level-target-tag"><i class="fa-solid fa-user-check"></i> Dành cho người mới bắt đầu từ số 0, chưa biết nhạc lý</div>
              <ul class="course-topics">
                <li>Nhạc lý căn bản dễ nhớ ngay trên phím đàn ảo (cung, nửa cung, gam)</li>
                <li>Cách xếp các vòng hợp âm quen thuộc hay dùng trong Pop, Ballad</li>
                <li>Đảo thế bấm hợp âm êm tai và viết đường Bass vững chắc</li>
                <li>Chọn tiếng trống, đánh nhịp Kick-Snare nảy tai và tự nhiên</li>
                <li>Phối tiếng Piano, Guitar, Strings đệm lót không bị đè nhau</li>
                <li>Tự tay dựng hoàn chỉnh 1 bài beat từ Intro đến Outro</li>
              </ul>
              <div class="course-price-row">
                <div class="price-val text-gold-gradient">7.000.000₫</div>
                <span class="price-period">15 buổi (1 kèm 1)</span>
              </div>
              <div class="course-action-row">
                <button
                  type="button"
                  class="btn btn-outline-syllabus"
                  @click="selectCourseAndScroll('hoa-am-co-ban')"
                >
                  <i class="fa-solid fa-list-check"></i> Xem giáo án 15 buổi
                </button>
                <NuxtLink to="/start-a-project?service=khoa-hoc" class="btn btn-primary course-cta">Đăng ký học</NuxtLink>
              </div>
            </div>

            <div v-else class="level-detail-box">
              <div class="level-target-tag tag-purple"><i class="fa-solid fa-bolt"></i> Dành cho bạn đã biết làm beat, muốn nâng trình bài phối</div>
              <ul class="course-topics">
                <li>Hợp âm màu hiện đại: Hợp âm 7, 9, 11, hợp âm treo (sus) và hợp âm mượn</li>
                <li>Viết Bassline nâng cao: Đi nốt dẫn, trượt nốt (Slide), nhấn nhịp lệch</li>
                <li>Lập trình trống nâng cao: R&B Swing, Trap hi-hat rolls, ghost notes</li>
                <li>Phối dàn dây (Strings) da diết, phối kèn (Brass) và sound design độc bản</li>
                <li>Phân tầng tần số nhạc cụ để bản phối nhiều lớp mà không bị đục</li>
                <li>Bắt nhịp và phối khí trực tiếp trên vocal thu mộc của ca sĩ</li>
              </ul>
              <div class="course-price-row">
                <div class="price-val text-gold-gradient">15.000.000₫</div>
                <span class="price-period">15 buổi (1 kèm 1)</span>
              </div>
              <div class="course-action-row">
                <button
                  type="button"
                  class="btn btn-outline-syllabus"
                  @click="selectCourseAndScroll('hoa-am-nang-cao')"
                >
                  <i class="fa-solid fa-list-check"></i> Xem giáo án 15 buổi
                </button>
                <NuxtLink to="/start-a-project?service=khoa-hoc" class="btn btn-primary course-cta">Đăng ký học</NuxtLink>
              </div>
            </div>
          </div>

          <!-- KHÓA 2: MIX VOCAL (3TR) -->
          <div class="course-card matte-card hover-lift accent-green">
            <div class="course-header">
              <div class="course-icon"><i class="fa-solid fa-microphone-lines"></i></div>
              <div class="course-meta">
                <span class="course-level text-meta-mono">KHÓA 02 • 15 BUỔI</span>
                <span class="course-duration"><i class="fa-regular fa-clock"></i> 1 Kèm 1 Online</span>
              </div>
            </div>

            <h3 class="course-title">Khóa Mix Vocal</h3>
            <p class="course-desc">Học toàn bộ các bước xử lý giọng hát từ file thu âm mộc đến khi hòa quyện êm ái vào beat nhạc. Dành cho bạn muốn tự mix giọng của mình hoặc ca sĩ.</p>

            <div class="level-detail-box single-tier">
              <div class="level-target-tag tag-green"><i class="fa-solid fa-headphones"></i> Giọng hát sáng rõ, ngọt ngào, êm tai trên nền beat</div>
              <ul class="course-topics">
                <li>Dọn rác, cắt tiếng thở thừa và lọc tiếng ồn trên file thu âm</li>
                <li>Kéo nốt phô bằng Melodyne: Giữ giọng tự nhiên, không bị cứng</li>
                <li>Căn nhịp giọng hát chính và dàn bè khớp từng chữ vào phách trống</li>
                <li>Dùng Auto-Tune chỉnh mượt hoặc tạo màu nhạc hiện đại</li>
                <li>EQ cắt tiếng ù rè, làm giọng sáng rõ và có độ thở bay bổng</li>
                <li>Compressor nén đều đặn từng câu, thêm Reverb &amp; Delay mượt mà</li>
              </ul>
              <div class="course-price-row">
                <div class="price-val text-gold-gradient">3.000.000₫</div>
                <span class="price-period">15 buổi (1 kèm 1)</span>
              </div>
              <div class="course-action-row">
                <button
                  type="button"
                  class="btn btn-outline-syllabus"
                  @click="selectCourseAndScroll('mix-vocal')"
                >
                  <i class="fa-solid fa-list-check"></i> Xem giáo án 15 buổi
                </button>
                <NuxtLink to="/start-a-project?service=khoa-hoc" class="btn btn-primary course-cta">Đăng ký học</NuxtLink>
              </div>
            </div>
          </div>

          <!-- KHÓA 3: MIXING & MASTER TỔNG THỂ 1 BẢN PHỐI (5TR) -->
          <div class="course-card matte-card hover-lift accent-orange">
            <div class="course-header">
              <div class="course-icon"><i class="fa-solid fa-sliders"></i></div>
              <div class="course-meta">
                <span class="course-level text-meta-mono">KHÓA 03 • 15 BUỔI</span>
                <span class="course-duration"><i class="fa-regular fa-clock"></i> 1 Kèm 1 Online</span>
              </div>
            </div>

            <h3 class="course-title">Mixing &amp; Master Tổng Thể</h3>
            <p class="course-desc">Học cách trộn bản phối đa track (Multi-track) để các nhạc cụ và vocal gắn kết thành một khối, cân bằng tần số và đẩy bài hát to rõ đạt chuẩn phát hành.</p>

            <div class="level-detail-box single-tier">
              <div class="level-target-tag tag-orange"><i class="fa-solid fa-compact-disc"></i> Bài hát to rõ, lực căng đét, đạt chuẩn Spotify/YouTube</div>
              <ul class="course-topics">
                <li>Sắp xếp Stems đa track, cân âm lượng thô &amp; đảo vị trí trái phải 3D</li>
                <li>Kiểm tra và xử lý lệch pha (Phase) giữa Kick và Bass</li>
                <li>Mix bộ trống chắc nịch, Sidechain Kick &amp; Bass ăn khớp nhau</li>
                <li>Khoét EQ nhạc cụ đệm nhường chỗ cho vocal tỏa sáng</li>
                <li>Xử lý Mix Bus: Keo dính toàn bộ bài nhạc thành khối thống nhất</li>
                <li>Mastering: Đẩy độ to (Loudness) chuẩn LUFS không bị bể tiếng</li>
              </ul>
              <div class="course-price-row">
                <div class="price-val text-gold-gradient">5.000.000₫</div>
                <span class="price-period">15 buổi (1 kèm 1)</span>
              </div>
              <div class="course-action-row">
                <button
                  type="button"
                  class="btn btn-outline-syllabus"
                  @click="selectCourseAndScroll('mix-master')"
                >
                  <i class="fa-solid fa-list-check"></i> Xem giáo án 15 buổi
                </button>
                <NuxtLink to="/start-a-project?service=khoa-hoc" class="btn btn-primary course-cta">Đăng ký học</NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- KHỐI HỖ TRỢ & CHÍNH SÁCH HỌC TẬP THỰC TẾ -->
        <div class="support-info-card matte-card mt-5">
          <div class="support-header">
            <span class="badge-v2 amber"><i class="fa-solid fa-shield-heart"></i> ĐỒNG HÀNH CÙNG BẠN</span>
            <h3 class="support-title">Chính Sách &amp; Hỗ Trợ Học Tập Tại XKProduction</h3>
            <p class="support-sub">Chúng tôi hiểu rằng mỗi người có một tốc độ học khác nhau, nên mọi thứ đều được thiết kế để bạn học thoải mái và hiệu quả nhất.</p>
          </div>

          <div class="support-grid">
            <div class="support-item">
              <div class="support-icon"><i class="fa-solid fa-laptop-code text-teal"></i></div>
              <div>
                <strong>Cài sẵn phần mềm trên máy tính</strong>
                <span>Trước buổi học đầu tiên, studio kết nối từ xa hỗ trợ cài đặt phần mềm và tặng sẵn bộ sound tiếng cần dùng để vào học là làm được ngay.</span>
              </div>
            </div>

            <div class="support-item">
              <div class="support-icon"><i class="fa-solid fa-calendar-days text-amber"></i></div>
              <div>
                <strong>Lịch học linh hoạt theo bạn</strong>
                <span>Bạn rảnh khung giờ nào trong ngày thì báo studio sắp xếp, từ sáng, chiều đến tối. Bận đột xuất chỉ cần báo trước để dời lịch học.</span>
              </div>
            </div>

            <div class="support-item">
              <div class="support-icon"><i class="fa-solid fa-handshake-angle text-teal"></i></div>
              <div>
                <strong>Học phí chia làm 2 đợt đóng</strong>
                <span>Để bạn không bị áp lực tài chính, học phí của mọi khóa học đều được hỗ trợ chia làm 2 đợt đóng nhẹ nhàng trong quá trình học.</span>
              </div>
            </div>

            <div class="support-item">
              <div class="support-icon"><i class="fa-solid fa-comments text-amber"></i></div>
              <div>
                <strong>Hỗ trợ lâu dài sau khóa học</strong>
                <span>Học xong khi bạn tự làm bài mới ở nhà mà bị vướng chỗ nào, cứ gửi file project qua Zalo hoặc Drive, studio sẽ nghe và hướng dẫn thêm.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SECTION 3: SYLLABUS DETAIL (15 BUỔI CHI TIẾT THEO TỪNG KHÓA) ===== -->
    <section class="section-block section-syllabus" id="giao-an">
      <div class="editorial-container">
        <div class="section-header-center text-center">
          <span class="badge-v2 amber">GIÁO ÁN CHI TIẾT TỪNG BUỔI</span>
          <h2 class="editorial-heading text-center mt-3">Giáo Án 15 Buổi Thực Chiến</h2>
          <p class="section-subtitle">Bấm chọn từng khóa học dưới đây để xem chi tiết lộ trình 15 buổi học từ đầu đến cuối</p>
        </div>

        <!-- TABS CHỌN KHÓA HỌC ĐỂ XEM GIÁO ÁN -->
        <div class="syllabus-course-tabs">
          <button
            v-for="c in courseTabs"
            :key="c.id"
            type="button"
            class="syllabus-course-tab-btn"
            :class="[{ active: selectedCourseTab === c.id }, 'accent-' + c.accent]"
            @click="selectedCourseTab = c.id"
          >
            <span class="tab-course-name">{{ c.name }}</span>
            <span class="tab-course-badge">{{ c.badge }}</span>
          </button>
        </div>

        <!-- INFO BANNER CỦA KHÓA ĐANG CHỌN -->
        <div class="active-course-banner matte-card" :class="'border-' + activeCourseInfo.accent">
          <div class="active-banner-left">
            <div class="active-banner-tag">
              <i class="fa-solid fa-book-open"></i> Đang xem giáo án: <strong>{{ activeCourseInfo.name }}</strong>
            </div>
            <p class="active-banner-desc">{{ activeCourseInfo.desc }}</p>
          </div>
          <div class="active-banner-right">
            <div class="active-banner-fee text-gold-gradient">{{ activeCourseInfo.fee }}</div>
            <span class="active-banner-sessions">{{ activeCourseInfo.duration }}</span>
            <NuxtLink to="/start-a-project?service=khoa-hoc" class="btn btn-primary btn-sm mt-2">
              Đăng ký khóa này
            </NuxtLink>
          </div>
        </div>

        <!-- LƯỚI 15 BUỔI HỌC CỦA KHÓA ĐANG CHỌN -->
        <div class="syllabus-grid">
          <div
            v-for="s in currentSyllabus"
            :key="s.session"
            class="syllabus-card matte-card hover-lift"
            :class="'accent-' + activeCourseInfo.accent"
          >
            <div class="syllabus-card-header">
              <div class="session-num-badge">BUỔI {{ s.session }}</div>
              <span class="session-phase-tag">{{ activeCourseInfo.name }}</span>
            </div>

            <h3 class="session-card-title">{{ s.title }}</h3>
            <p class="session-card-desc">{{ s.desc }}</p>

            <div class="session-topics-box">
              <div class="topics-heading"><i class="fa-solid fa-list-check"></i> Nội dung bài giảng trọng tâm:</div>
              <ul class="session-topics-list">
                <li v-for="(t, idx) in s.topics" :key="idx">{{ t }}</li>
              </ul>
            </div>

            <div class="session-outcome-box">
              <div class="outcome-label"><i class="fa-solid fa-circle-check"></i> Sản phẩm đạt được sau buổi:</div>
              <p class="outcome-text">{{ s.outcome }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SECTION 4: FAQ ACCORDION ===== -->
    <section class="section-block section-faq">
      <div class="editorial-container">
        <div class="section-header-center text-center">
          <span class="badge-v2 teal">HỎI &amp; ĐÁP</span>
          <h2 class="editorial-heading text-center mt-3">Câu Hỏi Thường Gặp</h2>
          <p class="section-subtitle">Giải đáp nhanh các thắc mắc phổ biến của học viên trước khi bắt đầu khóa học</p>
        </div>

        <div class="faq-list">
          <div
            v-for="(faq, i) in faqs" :key="i"
            class="faq-accordion-item matte-card"
            :class="{ open: openFaq === i }"
            @click="openFaq = openFaq === i ? -1 : i"
          >
            <button class="faq-question-btn" :aria-expanded="openFaq === i">
              <span>{{ faq.q }}</span>
              <span class="faq-icon-wrap">
                <i class="fa-solid" :class="openFaq === i ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
              </span>
            </button>
            <div class="faq-answer-pane" v-show="openFaq === i">
              <p>{{ faq.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SECTION 5: FINAL CALL TO ACTION ===== -->
    <section class="section-block final-cta">
      <div class="editorial-container">
        <div class="cta-block matte-card text-center">
          <span class="badge-v2 amber">BẮT ĐẦU LÀM NHẠC</span>
          <h2 class="mt-3">Bạn muốn tự tay làm ra bài hát của riêng mình?</h2>
          <p>Nhắn tin qua Zalo hoặc để lại thông tin để studio tư vấn chọn khóa học phù hợp và sắp xếp khung giờ học cùng bạn nhé.</p>
          <div class="cta-actions">
            <NuxtLink to="/start-a-project?service=khoa-hoc" class="btn btn-primary btn-large">Đăng ký tư vấn khóa học</NuxtLink>
            <a href="https://zalo.me/0355356294" target="_blank" rel="noopener" class="btn btn-secondary btn-large btn-zalo">
              <i class="fa-solid fa-comment-dots"></i> Nhắn Zalo Giảng Viên
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

useSeoMeta({
  title: 'Khóa Học Làm Nhạc Online 1 Kèm 1 Thực Chiến (15 Buổi) - XKProduction',
  description: 'Khóa học làm nhạc Online 1 kèm 1 thực chiến 15 buổi tại XKProduction: Hoà âm phối khí (Cơ bản 7tr, Nâng cao 15tr), Mix Vocal (3tr), Mixing & Master tổng thể (5tr). Học trên chính máy tính của bạn.',
  ogTitle: 'Khóa Học Làm Nhạc Online 1 Kèm 1 Thực Chiến (15 Buổi) - XKProduction',
  ogDescription: 'Đào tạo làm nhạc Online 1 kèm 1 thực chiến 15 buổi: Hoà âm phối khí, Mix vocal, Mixing & Master tổng thể 1 bản phối. Học trực tiếp trên chính máy tính của bạn.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Khóa học Làm Nhạc Online 15 Buổi tại XKProduction',
  ogUrl: 'https://xkproduction.com/courses',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  keywords: 'khoá học làm nhạc online 1 kèm 1, học hoà âm phối khí online, học mix vocal online, học mixing master online, khoá học producer online, XKProduction'
})

useSchemaOrg([
  defineWebPage({
    name: 'Khóa Học Làm Nhạc Online 1 Kèm 1 - XKProduction',
    description: 'Chương trình đào tạo làm nhạc Online 1 kèm 1: Hoà âm phối khí (Cơ bản 7tr, Nâng cao 15tr), Mix Vocal (3tr), Mixing & Master tổng thể 1 bản phối (5tr) tại XKProduction.'
  }),
  defineCourse({
    name: 'Khóa Học Hoà Âm Phối Khí Cơ Bản (15 Buổi Online 1 Kèm 1)',
    description: 'Học làm beat từ số 0, nhạc lý ứng dụng dễ nhớ, xếp vòng hợp âm, chọn sound trống và tự làm trọn vẹn 1 bản beat.',
    provider: { name: 'XKProduction', url: 'https://xkproduction.com' },
    hasCourseInstance: [{ courseMode: 'online', duration: 'P2M', courseWorkload: 'PT25H', price: '7000000', priceCurrency: 'VND' }]
  }),
  defineCourse({
    name: 'Khóa Học Hoà Âm Phối Khí Nâng Cao (15 Buổi Online 1 Kèm 1)',
    description: 'Hợp âm màu 7, 9, 11, mượn hợp âm ngoài giọng, phối dàn dây Strings, kèn Brass, sound design hiện đại và phối khí trên vocal ca sĩ.',
    provider: { name: 'XKProduction', url: 'https://xkproduction.com' },
    hasCourseInstance: [{ courseMode: 'online', duration: 'P2M', courseWorkload: 'PT25H', price: '15000000', priceCurrency: 'VND' }]
  }),
  defineCourse({
    name: 'Khóa Học Mix Vocal Thực Chiến (15 Buổi Online 1 Kèm 1)',
    description: 'Kéo nốt phô Melodyne, Auto-Tune, căn nhịp, EQ, Compressor, Reverb & Delay cho giọng hát sáng rõ, ngọt ngào trên beat.',
    provider: { name: 'XKProduction', url: 'https://xkproduction.com' },
    hasCourseInstance: [{ courseMode: 'online', duration: 'P2M', courseWorkload: 'PT25H', price: '3000000', priceCurrency: 'VND' }]
  }),
  defineCourse({
    name: 'Khóa Học Mixing & Master Tổng Thể 1 Bản Phối (15 Buổi Online 1 Kèm 1)',
    description: 'Trộn Stems đa track nhạc cụ và vocal, xử lý lệch pha, Sidechain Kick & Bass, keo dính Mix Bus và Master to rõ đạt chuẩn phát hành.',
    provider: { name: 'XKProduction', url: 'https://xkproduction.com' },
    hasCourseInstance: [{ courseMode: 'online', duration: 'P2M', courseWorkload: 'PT25H', price: '5000000', priceCurrency: 'VND' }]
  })
])

const openFaq = ref(-1)
const hoaAmLevel = ref<'co-ban' | 'nang-cao'>('co-ban')
const selectedCourseTab = ref('hoa-am-co-ban')

const selectCourseAndScroll = (courseKey: string) => {
  selectedCourseTab.value = courseKey
  if (typeof document !== 'undefined') {
    const el = document.getElementById('giao-an')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

const whyUs = [
  { icon: 'fa-solid fa-user-tie', title: 'Kèm 1-1 qua mạng', desc: 'Thầy và trò cùng mở màn hình, làm tới đâu chỉ tới đó, sai chỗ nào sửa luôn chỗ đó trong buổi học.' },
  { icon: 'fa-solid fa-laptop', title: 'Học trên máy của bạn', desc: 'Cài đặt và chỉnh phần mềm ngay trên máy của bạn, học xong là tự tin mở máy ở nhà làm tiếp.' },
  { icon: 'fa-solid fa-music', title: 'Thực hành bài hát thật', desc: 'Lấy vocal thật của ca sĩ về phối beat và mix, không học lý thuyết suông trên bài mẫu có sẵn.' },
  { icon: 'fa-solid fa-comments', title: 'Hỗ trợ lâu dài', desc: 'Học xong khi tự làm bài mới bị vướng chỗ nào, cứ gửi file project để studio nghe và góp ý thêm.' }
]

interface CourseTab {
  id: string
  name: string
  fee: string
  duration: string
  badge: string
  accent: string
  desc: string
}

const defaultCourseTab: CourseTab = {
  id: 'hoa-am-co-ban',
  name: 'Hoà Âm Cơ Bản',
  fee: '7.000.000₫',
  duration: '15 buổi (1 kèm 1)',
  badge: 'Cơ bản • 7tr',
  accent: 'blue',
  desc: 'Dành cho người mới bắt đầu từ con số 0. Tự bấm hợp âm, chọn sound trống, viết bass và ghép hoàn chỉnh 1 bản beat từ đầu đến cuối.'
}

const courseTabs: CourseTab[] = [
  defaultCourseTab,
  {
    id: 'hoa-am-nang-cao',
    name: 'Hoà Âm Nâng Cao',
    fee: '15.000.000₫',
    duration: '15 buổi (1 kèm 1)',
    badge: 'Nâng cao • 15tr',
    accent: 'purple',
    desc: 'Dành cho bạn đã biết làm beat cơ bản. Nâng tầm hợp âm màu 7-9-11, phối dàn dây Strings, kèn Brass, sound design và phối khí trên vocal ca sĩ.'
  },
  {
    id: 'mix-vocal',
    name: 'Mix Vocal',
    fee: '3.000.000₫',
    duration: '15 buổi (1 kèm 1)',
    badge: 'Mix Vocal • 3tr',
    accent: 'green',
    desc: 'Dành cho bạn muốn tự mix giọng hát sạch đẹp: Sửa phô Melodyne, căn nhịp, Auto-Tune, EQ, Compressor, Reverb & Delay mượt mà trên nền beat.'
  },
  {
    id: 'mix-master',
    name: 'Mixing & Master Tổng Thể',
    fee: '5.000.000₫',
    duration: '15 buổi (1 kèm 1)',
    badge: 'Mix & Master • 5tr',
    accent: 'orange',
    desc: 'Dành cho bạn muốn làm chủ kỹ thuật trộn đa track nhạc cụ & vocal: Cân âm lượng thô, xử lý pha, Sidechain, keo dính Mix Bus và đẩy to chuẩn Spotify/YouTube.'
  }
]

const activeCourseInfo = computed<CourseTab>(() => {
  return courseTabs.find(c => c.id === selectedCourseTab.value) || defaultCourseTab
})

// BỘ DỮ LIỆU GIÁO ÁN CHI TIẾT 15 BUỔI CHO TỪNG KHÓA
const syllabuses: Record<string, Array<{
  session: string
  title: string
  desc: string
  topics: string[]
  outcome: string
}>> = {
  // ==========================================
  // KHÓA 1: HOÀ ÂM CƠ BẢN (7.000.000₫ - 15 BUỔI)
  // ==========================================
  'hoa-am-co-ban': [
    {
      session: '01',
      title: 'Làm Quen Phần Mềm & Xếp Đặt Dự Án Làm Nhạc',
      desc: 'Cài đặt và tinh chỉnh phần mềm làm nhạc chạy mượt trên máy của bạn, làm quen các nút bấm quan trọng.',
      topics: [
        'Làm quen giao diện làm việc (Logic Pro, Studio One hoặc FL Studio) và các phím tắt hay dùng',
        'Cách tạo project mới, đặt tempo (tốc độ bài hát), lưu file và sắp xếp thư mục gọn gàng',
        'Cách tải và mở các bộ tiếng ảo (Virtual Instruments) cơ bản trên phần mềm'
      ],
      outcome: 'Mở máy lên là biết bấm gì, thao tác mượt mà và không còn cảm thấy bỡ ngỡ.'
    },
    {
      session: '02',
      title: 'Nhạc Lý Cơ Bản Dễ Nhớ Ngay Trên Phím Đàn Ảo',
      desc: 'Tìm nốt nhạc trên đàn ảo, hiểu cung và nửa cung cực kỳ đơn giản mà không cần học xướng âm cổ điển.',
      topics: [
        'Tìm các nốt Đồ Rê Mi Pha Sol La Si trên bàn phím đàn và cách nhớ nhanh',
        'Hiểu cung và nửa cung qua khoảng cách các phím đàn trắng - đen',
        'Phân biệt thang âm trưởng (nghe vui tươi, trong trẻo) và thang âm thứ (nghe trầm buồn, tình cảm)'
      ],
      outcome: 'Nhìn vào phím đàn biết nốt nào bấm được, nốt nào bị phô và tự mò nốt giai điệu đơn giản.'
    },
    {
      session: '03',
      title: 'Cấu Tạo Hợp Âm & Cách Bấm Hợp Âm Cơ Bản',
      desc: 'Học công thức tạo hợp âm 3 nốt (Trưởng, Thứ) siêu dễ áp dụng ngay trên chuột máy tính.',
      topics: [
        'Công thức tạo hợp âm Trưởng (Major) và hợp âm Thứ (Minor) bằng cách đếm phím đàn',
        'Cách chấm nốt hợp âm bằng chuột trên Piano Roll hoặc dùng phím gõ máy tính',
        'Thực hành bấm các hợp âm quen thuộc hay gặp nhất trong bài hát Việt Nam'
      ],
      outcome: 'Tự bấm được các hợp âm căn bản nghe chuẩn tai, không bị chói hay lạc điệu.'
    },
    {
      session: '04',
      title: 'Các Vòng Hợp Âm Quốc Dân Cho Nhạc Pop & Ballad',
      desc: 'Khám phá các vòng hợp âm bắt tai nhất hay dùng trong các bài hát hit Pop, Ballad và Lofi.',
      topics: [
        'Các vòng hợp âm thịnh hành: Vòng 1-5-6-4, vòng 6-4-1-5, vòng Canon kinh điển',
        'Cách nghe giai điệu một câu hát để chọn vòng hợp âm đệm vào cho ăn khớp',
        'Thực hành đặt hợp âm thử cho một đoạn bài hát quen thuộc mà bạn yêu thích'
      ],
      outcome: 'Tự đặt được bộ khung hợp âm hoàn chỉnh cho một đoạn hát mộc.'
    },
    {
      session: '05',
      title: 'Đổi Thế Bấm Hợp Âm (Inversion) Để Tay Đàn Êm Tai',
      desc: 'Khắc phục lỗi chuyển hợp âm bị nhảy nốt lộ liễu, giúp tiếng đệm đàn nghe liền mạch như nghệ sĩ chơi.',
      topics: [
        'Tại sao bấm hợp âm nguyên bản nghe hay bị rời rạc và nhảy nốt quá xa',
        'Kỹ thuật đảo thế bấm hợp âm (giữ nốt bass thấp, kéo các nốt bè gần nhau)',
        'Thêm nốt dẫn đơn giản để chuyển giữa 2 hợp âm mượt mà hơn'
      ],
      outcome: 'Tiếng đàn đệm nghe liền mạch, êm ái, chuyển từ hợp âm này sang hợp âm khác rất mượt.'
    },
    {
      session: '06',
      title: 'Viết Tiếng Bass Đi Theo Vòng Hợp Âm',
      desc: 'Xây dựng đường đi của tiếng Bass — nền móng giữ cho toàn bộ bài hát vững chãi và ấm áp.',
      topics: [
        'Vai trò của tiếng Bass trong bài nhạc: Giữ nhịp và làm chỗ dựa cho hợp âm',
        'Cách lấy nốt gốc (Root note) của từng hợp âm để làm thành đường đi của Bass',
        'Nhấn nhịp tiếng Bass theo nhịp đập của bài để tạo cảm giác chuyển động nhịp nhàng'
      ],
      outcome: 'Có được đường Bass vững vàng đi cùng vòng hợp âm, bài nhạc nghe đã có lực trầm.'
    },
    {
      session: '07',
      title: 'Chọn Tiếng Trống Phù Hợp Với Thể Loại Bài Hát',
      desc: 'Phân biệt và lựa chọn bộ tiếng trống hợp với từng dòng nhạc để bài hát không bị lạc điệu.',
      topics: [
        'Phân biệt các tiếng trống: Kick (trống cái), Snare/Clap (tiếng vỗ tay), Hi-hat (tiếng xì xào)',
        'Cách nghe và chọn bộ sound trống hợp với nhạc Pop, Ballad nhẹ nhàng hay Lofi',
        'Tránh chọn tiếng trống quá đục hoặc quá đanh làm lấn át phần lời ca sĩ'
      ],
      outcome: 'Chọn được bộ sound trống ưng ý, vừa vặn với không khí bài hát định làm.'
    },
    {
      session: '08',
      title: 'Đánh Nhịp Trống Cơ Bản & Chỉnh Lực Đánh Tự Nhiên',
      desc: 'Cách chấm nhịp trống vào đúng phách mạnh nhẹ và chỉnh lực gõ để tiếng trống có hồn như người đánh.',
      topics: [
        'Cách chấm nhịp Kick - Snare vào đúng các phách trong ô nhịp 4/4',
        'Rải tiếng Hi-hat đều đặn để giữ nhịp cho người nghe nhịp chân theo bài',
        'Chỉnh lực đánh (Velocity) to nhỏ khác nhau để tiếng trống không bị cứng nhắc như robot'
      ],
      outcome: 'Tự dựng được đoạn nhịp trống nghe nảy, tự nhiên và cuốn hút người nghe.'
    },
    {
      session: '09',
      title: 'Thêm Tiếng Gõ Phụ (Percussion, Shaker, Rimshot)',
      desc: 'Thêm các tiếng lắc, tiếng gõ cạnh trống tạo độ rộn ràng và chuyển động tinh tế cho bài hát.',
      topics: [
        'Thêm tiếng lắc Shaker, Tambourine và tiếng gõ cạnh trống (Rimshot)',
        'Tạo độ xao động nhẹ (Swing/Groove) giúp nhịp trống mềm mại hơn',
        'Dọn dẹp những nốt thừa để bộ trống nghe thoáng đãng, không bị rối tai'
      ],
      outcome: 'Bộ trống nghe đầy đặn, có điểm nhấn và độ nảy bắt tai.'
    },
    {
      session: '10',
      title: 'Phối Tiếng Piano & Guitar Đệm Không Bị Đè Nhau',
      desc: 'Cách chọn tiếng và chia vai cho 2 nhạc cụ đệm chính để bài nhạc dày dặn mà vẫn rõ ràng.',
      topics: [
        'Chọn tiếng Piano mộc hoặc Guitar mộc phù hợp với màu sắc bài hát',
        'Cách chia vai: Nhạc cụ nào rải nốt chính, nhạc cụ nào đệm nền nhẹ phía sau',
        'Tránh để hai nhạc cụ đánh trùng nốt ở cùng một quãng làm đục tiếng bài phối'
      ],
      outcome: 'Hai tiếng đàn hòa quyện với nhau êm ái, nghe rõ từng nhạc cụ mà không bị đè nhau.'
    },
    {
      session: '11',
      title: 'Thêm Lớp Đàn Nền (Pad, Strings) Tạo Cảm Xúc',
      desc: 'Dùng tiếng Pad và Strings để lấp khoảng trống trong bài hát, tạo không gian sâu lắng, ấm áp.',
      topics: [
        'Dùng tiếng Pad và Strings để lấp đầy các khoảng hở giữa câu hát',
        'Cách giữ các nốt nền ngân dài để tạo không gian ấm áp, sâu lắng',
        'Điều chỉnh âm lượng đàn nền vừa đủ, không lấn át nhạc cụ đệm chính'
      ],
      outcome: 'Bản nhạc nghe dày dặn, giàu cảm xúc và không còn cảm giác trống trải.'
    },
    {
      session: '12',
      title: 'Viết Câu Dạo Đầu (Intro) & Giai Điệu Dẫn Dắt',
      desc: 'Nghĩ ra câu dạo đầu ngắn gọn, ấn tượng để mở đầu bài hát và câu bè len lỏi trong bài.',
      topics: [
        'Cách tạo câu dạo đầu (Intro) ngắn gọn 4 - 8 ô nhịp giữ chân người nghe',
        'Viết câu bè/lead phụ len lỏi giữa các khoảng ngắt nghỉ của ca sĩ',
        'Dùng câu dạo đầu làm đoạn nối (Interlude) hoặc kết bài (Outro)'
      ],
      outcome: 'Bài hát có phần mở đầu cuốn hút, giữ chân người nghe ngay từ những giây đầu.'
    },
    {
      session: '13',
      title: 'Xếp Dồn Trống (Drum Fills) & Tiếng Vuốt Chuyển Đoạn',
      desc: 'Đặt cú dồn trống và tiếng vuốt hiệu ứng để nối các đoạn nhạc với nhau thật mượt mà.',
      topics: [
        'Cách xếp cú dồn trống (Drum fill) trước khi bước vào đoạn điệp khúc',
        'Dùng tiếng vuốt lên (Riser), tiếng xì thả xuống (Downlifter) tạo đà tâm lý',
        'Tạo khoảng lặng (Drop/Stop) bất ngờ trước điệp khúc để tạo cao trào'
      ],
      outcome: 'Các đoạn nhạc nối tiếp nhau mượt mà, vào điệp khúc bùng nổ đã tai.'
    },
    {
      session: '14',
      title: 'Ghép Nối Bài Beat Hoàn Chỉnh Từ Đầu Đến Cuối',
      desc: 'Sắp xếp bố cục toàn bộ bài hát từ Intro, Phiên khúc đến Điệp khúc và Outro kết bài.',
      topics: [
        'Sắp xếp bố cục đầy đủ: Intro -> Đoạn 1 -> Điệp khúc -> Đoạn 2 -> Điệp khúc -> Outro',
        'Thêm bớt nhạc cụ qua từng đoạn để bài hát phát triển cao trào dần dần',
        'Cân bằng sơ bộ âm lượng giữa trống, bass và các nhạc cụ đệm'
      ],
      outcome: 'Hoàn thành khung bài beat dài 3-4 phút liền mạch từ đầu tới cuối.'
    },
    {
      session: '15',
      title: 'Hoàn Thiện Bản Beat & Sửa Bài 1-1 Chi Tiết',
      desc: 'Giảng viên cùng bạn nghe lại toàn bộ bản beat trên máy của bạn, nhặt lỗi và xuất file hoàn chỉnh.',
      topics: [
        'Nghe kiểm tra toàn diện: Nhặt các lỗi nốt phô, lỗi nhịp hoặc lỗi tiếng đè nhau',
        'Chỉnh sửa trực tiếp từng chi tiết nhỏ để bản beat đạt độ chỉn chu nhất',
        'Xuất file Audio hoàn chỉnh để bạn có thể hát thử hoặc gửi cho bạn bè nghe'
      ],
      outcome: 'Tự tay làm xong 1 bản beat hoàn chỉnh của riêng bạn từ con số 0.'
    }
  ],

  // ==========================================
  // KHÓA 2: HOÀ ÂM NÂNG CAO (15.000.000₫ - 15 BUỔI)
  // ==========================================
  'hoa-am-nang-cao': [
    {
      session: '01',
      title: 'Đánh Giá Tư Duy Phối Khí & Dọn Dẹp Thói Quen Cũ',
      desc: 'Nghe lại các bản phối cũ của bạn, chỉ ra điểm nghẽn khiến bài chưa sang và tối ưu quy trình làm việc.',
      topics: [
        'Thẩm định các bản phối cũ của bạn: Chỉ ra lỗi lặp hợp âm, chọn sound cũ kỹ',
        'Cách tư duy bố cục bản phối hiện đại theo tiêu chuẩn các bài hát thịnh hành',
        'Xây dựng template làm việc chuyên nghiệp giúp tiết kiệm 50% thời gian'
      ],
      outcome: 'Nhìn rõ điểm yếu cần cải thiện và có bộ template làm việc bài bản.'
    },
    {
      session: '02',
      title: 'Hợp Âm Màu & Hợp Âm Mở Rộng (Maj7, Min7, 9th, 11th)',
      desc: 'Thêm các nốt màu vào hợp âm 3 nốt quen thuộc để bài nghe Tây, sang trọng và có chiều sâu.',
      topics: [
        'Cấu tạo và cảm xúc của các hợp âm 4 nốt, 5 nốt hiện đại (Maj7, Min7, 9th, 11th)',
        'Cách thêm nốt màu vào vòng hợp âm quen thuộc để bài nghe tình cảm hơn hẳn',
        'Ứng dụng hợp âm treo (Sus2, Sus4) tạo cảm giác lơ lửng, mong manh'
      ],
      outcome: 'Vòng hợp âm nghe sang trọng, có chiều sâu cảm xúc rõ rệt.'
    },
    {
      session: '03',
      title: 'Mượn Hợp Âm Ngoài Giọng & Hợp Âm Dẫn (Secondary Dominant)',
      desc: 'Kỹ thuật mượn hợp âm giọng song song để tạo bất ngờ và dẫn lối về hợp âm đích ngọt ngào.',
      topics: [
        'Kỹ thuật mượn hợp âm giọng song song và giọng cùng tên tạo cảm xúc bất ngờ',
        'Dùng hợp âm át phụ (Secondary Dominant) dẫn lối về hợp âm đích cực kỳ ngọt ngào',
        'Cách giải quyết hợp âm nghịch về hợp âm thuận tự nhiên, không bị chói tai'
      ],
      outcome: 'Bài phối có những nốt chuyển đoạn bất ngờ, khiến người nghe phải trầm trồ.'
    },
    {
      session: '04',
      title: 'Vòng Hợp Âm Phong Cách R&B, Neo-Soul, City Pop & Indie',
      desc: 'Phân tích các vòng hợp âm đặc trưng của nhạc R&B hiện đại, Neo-Soul và City Pop.',
      topics: [
        'Các vòng hợp âm đặc trưng của âm nhạc Âu Mỹ hiện đại và nhạc Indie Việt',
        'Cách chơi hợp âm giật nhịp (Syncopation) tạo độ nảy cho bài hát',
        'Viết câu đệm phím điện Rhodes/Wurlitzer mượt mà, ấm áp'
      ],
      outcome: 'Tự dựng được khung hợp âm mang màu sắc hiện đại, thời thượng.'
    },
    {
      session: '05',
      title: 'Viết Bassline Nâng Cao: Nốt Dẫn, Lướt Nốt & Nhấn Nhịp Lệch',
      desc: 'Thoát khỏi lối đánh bass chỉ dậm chân tại nốt gốc đơn điệu, giúp đường Bass sống động.',
      topics: [
        'Cách đi nốt lướt (Passing notes), trượt nốt (Slide) kết nối giữa các hợp âm',
        'Kỹ thuật đánh Bass lệch phách (Off-beat) tạo lực đẩy cho toàn bộ bản phối',
        'Phối hợp ăn ý giữa tiếng Bass và nhịp đạp của Kick'
      ],
      outcome: 'Đường Bass sống động, uyển chuyển và kéo cả bài nhạc đi về phía trước.'
    },
    {
      session: '06',
      title: 'Lập Trình Trống Nâng Cao: R&B Swing, Trap Rolls, Ghost Notes',
      desc: 'Căn chỉnh độ trễ tự nhiên cho bộ gõ, chia nhịp lẻ và thêm tiếng gõ ẩn như tay trống chuyên nghiệp.',
      topics: [
        'Kỹ thuật căn chỉnh độ trễ tự nhiên (Micro-timing / Humanize) cho bộ gõ',
        'Cách chia nhịp lẻ, rải Hi-hat ba nốt (Triplets) và vuốt tốc độ (Pitch roll)',
        'Thêm tiếng gõ ẩn (Ghost notes) tạo cảm giác như tay trống chuyên nghiệp đang chơi'
      ],
      outcome: 'Bộ trống cực kỳ có hồn, đậm chất groove và chuyển động nhịp nhàng.'
    },
    {
      session: '07',
      title: 'Khai Thác Kho Nhạc Cụ Ảo Cao Cấp (Kontakt, Omnisphere, Serum)',
      desc: 'Khai thác các thư viện tiếng mẫu đắt giá và tự chỉnh sửa tiếng Synth tạo màu âm độc bản.',
      topics: [
        'Cách khai thác các thư viện tiếng mẫu chất lượng cao (Kontakt, Keyscape, Serum)',
        'Tự chỉnh sửa tiếng Synth cơ bản: ADSR, Filter, LFO để tạo màu âm độc bản',
        'Cách layer (xếp chồng) nhiều tiếng nhạc cụ để tạo ra âm thanh dày dặn riêng biệt'
      ],
      outcome: 'Sở hữu những âm sắc độc đáo, không bị đụng hàng với các beat trôi nổi.'
    },
    {
      session: '08',
      title: 'Phối Dàn Dây (Strings): Viết Bè Violon, Cello Tạo Cao Trào',
      desc: 'Hiểu âm vực và vai trò từng nhạc cụ trong dàn dây để viết bè đối âm nâng đỡ ca sĩ da diết.',
      topics: [
        'Hiểu âm vực: Cello (trầm), Viola (trung), Violin (cao) trong dàn dây',
        'Cách viết bè đối âm (Counter-melody) nâng đỡ giọng hát mà không tranh giành chỗ',
        'Dùng kỹ thuật vuốt phím (Expression / Modulation) tạo cảm xúc chân thực như dàn nhạc thật'
      ],
      outcome: 'Đoạn điệp khúc hoành tráng, da diết với dàn dây sống động.'
    },
    {
      session: '09',
      title: 'Phối Kèn (Brass) & Tiếng Synth Điện Tử Hiện Đại',
      desc: 'Viết các cú giật kèn tạo năng lượng sôi động kết hợp hài hòa với âm thanh điện tử.',
      topics: [
        'Cách viết các cú giật kèn (Brass hits/stabs) tạo năng lượng sôi động',
        'Xếp lớp tiếng Synth Pluck, Lead và Arpeggiator cho các đoạn bùng nổ',
        'Kết hợp hài hòa giữa nhạc cụ mộc mạc và âm thanh điện tử hiện đại'
      ],
      outcome: 'Bản phối đa dạng màu sắc, dày dặn năng lượng ở các phân đoạn đắt giá.'
    },
    {
      session: '10',
      title: 'Phân Tầng Tần Số Nhạc Cụ Để Bản Phối Không Bị Đục',
      desc: 'Xếp đặt không gian tần số và hai bên tai để bản phối 30-40 track vẫn trong trẻo, rõ từng tiếng.',
      topics: [
        'Xếp đặt không gian tần số: Nhạc cụ nào chiếm dải trầm, dải trung và dải sáng',
        'Kỹ thuật đảo vị trí hai bên tai (Panning) tạo sân khấu âm thanh rộng mở',
        'Dọn dẹp các nốt dư thừa cản trở không gian của ca sĩ ngay từ khâu phối khí'
      ],
      outcome: 'Bản phối nhiều track nhạc cụ vẫn trong trẻo, tách bạch từng tiếng.'
    },
    {
      session: '11',
      title: 'Làm Beat Các Thể Loại Xu Hướng (Synthwave, Afrobeat, UK Garage)',
      desc: 'Phân tích cấu trúc và sound đặc trưng của các thể loại đang thịnh hành và ứng dụng vào nhạc Việt.',
      topics: [
        'Phân tích cấu trúc và sound đặc trưng của các thể loại đang thịnh hành',
        'Thực hành làm một đoạn beat đúng chất xu hướng từ chọn tiếng đến nhịp điệu',
        'Mẹo bắt trend nhanh và ứng dụng vào bài hát Việt Nam'
      ],
      outcome: 'Tự tin sản xuất beat theo đúng màu sắc âm nhạc đang được giới trẻ ưa chuộng.'
    },
    {
      session: '12',
      title: 'Kỹ Thuật Đổi Giọng (Key Change) & Chuyển Đoạn Bất Ngờ',
      desc: 'Đổi giọng ở điệp khúc cuối để đẩy cảm xúc tột cùng và tạo đoạn nối (Bridge) khác biệt.',
      topics: [
        'Cách chuyển giọng lên nửa cung hoặc một cung ở đoạn điệp khúc cuối đẩy cảm xúc',
        'Dùng nhịp đảo hoặc đổi nhịp độ tạm thời để tạo điểm nhấn nghệ thuật',
        'Cách tạo đoạn nghỉ (Bridge) hoàn toàn khác biệt trước khi quay lại điệp khúc'
      ],
      outcome: 'Bài hát giữ được sự lôi cuốn từ đầu đến cuối mà không bị lặp lại nhàm chán.'
    },
    {
      session: '13',
      title: 'Bắt Nhịp & Phối Khí Trên Bản Thu Vocal Mộc Của Ca Sĩ (Acapella)',
      desc: 'Tiếp nhận file vocal ca sĩ thu không có nhạc, tự dò nhịp, dò giọng và dựng bản phối ôm khít vocal.',
      topics: [
        'Tiếp nhận file vocal ca sĩ thu không có nhạc, tự dò nhịp và dò tone chuẩn xác',
        'Xây dựng phần phối khí tôn vinh trọn vẹn điểm mạnh trong chất giọng ca sĩ',
        'Chỉnh sửa bản phối linh hoạt theo từng hơi thở và chỗ ngắt câu của ca sĩ'
      ],
      outcome: 'Bản phối ôm khít vào giọng hát ca sĩ, tạo nên một tác phẩm hoàn chỉnh ăn ý.'
    },
    {
      session: '14',
      title: 'Tinh Chỉnh Chi Tiết & Vẽ Automation Đẩy Cảm Xúc Đỉnh Điểm',
      desc: 'Tỉa tót từng nốt nhạc, vẽ âm lượng tự động và lọc tần số để bản phối đạt độ tinh xảo cao nhất.',
      topics: [
        'Tỉa tót từng nốt nhạc, từng hiệu ứng nhỏ để bản phối đạt độ tinh xảo cao nhất',
        'Vẽ âm lượng tự động (Volume Automation), lọc tần số từng giây',
        'Đảm bảo bản phối có độ thở tự nhiên, lúc trầm lắng lúc bùng nổ mãnh liệt'
      ],
      outcome: 'Bản phối hoàn thiện ở mức độ chỉn chu cao, sẵn sàng bước vào phòng thu.'
    },
    {
      session: '15',
      title: 'Xuất Stems Chuẩn Phòng Thu & Đánh Giá Bài Phối Hoàn Chỉnh',
      desc: 'Xuất các file track riêng biệt (Stems) đúng chuẩn gửi cho kỹ sư mix và thẩm định toàn diện tác phẩm.',
      topics: [
        'Cách xuất các file track riêng biệt (Stems) đúng chuẩn để gửi cho kỹ sư âm thanh mix bài',
        'Giảng viên nghe thẩm định toàn diện bài phối và chia sẻ kinh nghiệm làm việc với nghệ sĩ',
        'Hướng dẫn bảo vệ bản quyền tác phẩm và định hướng phong cách cá nhân'
      ],
      outcome: 'Tự tin sản xuất những bản phối khí chuyên nghiệp, đạt chuẩn thị trường.'
    }
  ],

  // ==========================================
  // KHÓA 3: MIX VOCAL (3.000.000₫ - 15 BUỔI)
  // ==========================================
  'mix-vocal': [
    {
      session: '01',
      title: 'Kiểm Tra File Thu Âm & Dọn Dẹp Tạp Âm Ban Đầu',
      desc: 'Nhận biết file thu âm tốt, dọn sạch khoảng lặng thừa, tiếng thở quá to và tạp âm phòng.',
      topics: [
        'Nhận biết file thu âm tốt và file bị lỗi (bị rè, bị vỡ tiếng, bị vọng tiếng phòng)',
        'Cắt bỏ những khoảng lặng thừa, tiếng lách cách chuột, tiếng thở quá to',
        'Dùng plugin khử ồn (Noise Gate / De-noise) làm sạch nền mà không méo tiếng'
      ],
      outcome: 'File giọng hát sạch sẽ, gọn gàng, sẵn sàng để bắt đầu làm đẹp.'
    },
    {
      session: '02',
      title: 'Kéo Nốt Phô Bằng Melodyne: Hiểu Cao Độ & Chỉnh Chuẩn Nốt',
      desc: 'Kéo những nốt bị non hoặc già về đúng vạch cao độ của bài hát mà vẫn giữ độ tự nhiên.',
      topics: [
        'Làm quen giao diện Melodyne, hiểu cách phần mềm hiển thị từng nốt hát',
        'Kéo những nốt bị non hoặc bị già về đúng vạch cao độ của bài hát',
        'Giữ lại độ luyến láy tự nhiên của ca sĩ, không kéo quá tay làm biến dạng giọng'
      ],
      outcome: 'Giọng hát hát đúng nốt chuẩn xác mà nghe vẫn tự nhiên, không bị cứng.'
    },
    {
      session: '03',
      title: 'Nắn Rung Giọng & Trường Độ Nốt Tự Nhiên Bằng Melodyne',
      desc: 'Điều chỉnh độ rung giọng quá gắt, làm đều những đoạn ngân dài và xử lý nốt lướt nhanh.',
      topics: [
        'Điều chỉnh độ rung giọng quá gắt hoặc làm đều lại những đoạn ngân dài',
        'Kéo dài hoặc thu ngắn nốt để câu hát gọn gàng, không bị lê thê',
        'Xử lý các nốt lướt nhanh cho mượt mà, êm tai'
      ],
      outcome: 'Từng câu hát nghe ngọt ngào, trau chuốt như ca sĩ chuyên nghiệp.'
    },
    {
      session: '04',
      title: 'Căn Nhịp Giọng Hát Chính Ăn Khớp Vào Phách Trống',
      desc: 'Đưa từng chữ của câu hát vào đúng phách nhịp của bài, khắc phục tật hát chậm hoặc cướp nhịp.',
      topics: [
        'Nhận biết những chỗ ca sĩ hát bị chậm nhịp hoặc bị cướp nhịp',
        'Dùng công cụ cắt dời hoặc co giãn nhịp để đưa từng chữ vào đúng phách',
        'Giữ lại độ trễ tình cảm tự nhiên của người hát, không chỉnh cứng nhắc'
      ],
      outcome: 'Giọng hát chính bám chắc vào nhịp trống, nghe chắc nịch và có lực.'
    },
    {
      session: '05',
      title: 'Xử Lý Giọng Bè: Căn Bè Khớp Từng Chữ & Chia Bè Sang 2 Tai',
      desc: 'Căn nhịp các track bè khớp từng milimet theo giọng chính và đảo bè sang hai bên tai.',
      topics: [
        'Căn nhịp các track bè chính xác tuyệt đối theo track giọng chính',
        'Chỉnh nốt cho bè 2, bè 3 hòa âm chuẩn xác với giọng chính',
        'Đảo bè sang hai bên tai (Pan trái/phải) để giọng chính đứng giữa thoáng đãng'
      ],
      outcome: 'Dàn bè nâng đỡ giọng chính dày dặn, mở rộng sang hai tai cực kỳ êm.'
    },
    {
      session: '06',
      title: 'Dùng Auto-Tune: Chỉnh Tốc Độ Bắt Nốt Mượt Hoặc Màu Hiện Đại',
      desc: 'Chọn đúng tone bài hát trên Auto-Tune và chỉnh tốc độ bắt nốt mượt mà hoặc hiệu ứng hiện đại.',
      topics: [
        'Chọn đúng tone (Key) và thang âm (Scale) của bài hát trên Auto-Tune',
        'Chỉnh tốc độ bắt nốt (Retune Speed) vừa phải để sửa phô nhẹ mà không lộ tiếng máy',
        'Cách chỉnh hiệu ứng Auto-Tune mạnh mẽ, bắt tai cho nhạc R&B, Trap, Hip-hop'
      ],
      outcome: 'Làm chủ công cụ Auto-Tune cho cả nhạc Pop mộc mạc lẫn nhạc hiện đại.'
    },
    {
      session: '07',
      title: 'Khử Tiếng Chói Gắt (De-Esser): Cắt Tiếng \'s\', \'x\' Nhức Tai',
      desc: 'Dò tìm dải tần chói gắt và dùng De-Esser ghìm xuống vừa đủ để giọng nghe êm dịu.',
      topics: [
        'Nguyên nhân gây ra những tiếng xì xì, tiếng \'x\', \'s\', \'ch\' chói tai khi thu âm gần mic',
        'Cách dò tìm dải tần chói gắt và dùng De-Esser ghìm xuống vừa đủ',
        'Tránh cắt quá tay khiến ca sĩ bị nói ngọng hoặc mất độ sáng của giọng'
      ],
      outcome: 'Giọng hát êm dịu, nghe lớn không bị buốt tai hay mệt óc.'
    },
    {
      session: '08',
      title: 'Dùng EQ Cho Giọng Hát: Cắt Ù Rền, Làm Sạch & Tăng Độ Sáng',
      desc: 'Cắt dải siêu trầm dọn sạch tiếng gió, khoét dải trung mũi bí bách và nâng dải cao sáng rõ.',
      topics: [
        'Cắt bỏ dải tần siêu trầm (Low-cut) để dọn sạch tiếng gió và tiếng đục ngầu',
        'Khoét nhẹ dải trung mũi (Mids) để giọng bớt bí bách, phát âm rõ chữ',
        'Nâng nhẹ dải cao (Air band) giúp giọng hát có độ thở bay bổng, sang trọng'
      ],
      outcome: 'Giọng hát sáng rõ, trong trẻo và nổi bật trên nền nhạc.'
    },
    {
      session: '09',
      title: 'Dùng Compressor Nén Giọng Hát: Giữ Âm Lượng Đều Đặn',
      desc: 'Kìm câu hát quá to và nâng câu hát quá nhỏ, giúp giọng hát đứng yên một chỗ vững chãi.',
      topics: [
        'Hiểu nguyên lý máy nén âm: Kìm câu hát quá to và nâng câu hát quá nhỏ',
        'Cách chỉnh Threshold, Ratio, Attack, Release cho giọng hát đầm và tự nhiên',
        'Mẹo nén 2 tầng (Serial Compression) giúp giọng hát đứng yên một chỗ vững chãi'
      ],
      outcome: 'Câu hát to nhỏ đều đặn, không có đoạn nào bị bé quá hay hét quá to.'
    },
    {
      session: '10',
      title: 'Dùng Saturation/Tube: Tạo Độ Ấm Áp & Làm Giọng Dày Dặn',
      desc: 'Thêm một chút màu sắc bóng đèn hoặc băng từ giúp giọng mỏng trở nên ấm áp, có da có thịt.',
      topics: [
        'Thêm một chút màu sắc bóng đèn (Tube) hoặc băng từ (Tape) vào giọng hát',
        'Giúp giọng mỏng trở nên dày dặn, có da có thịt và ấm áp hơn',
        'Tạo độ nhám nhẹ cá tính cho giọng hát mà không làm méo vỡ tiếng'
      ],
      outcome: 'Giọng hát nghe có độ ấm, sang và đượm màu sắc phòng thu.'
    },
    {
      session: '11',
      title: 'Thêm Tiếng Nhại (Delay): Nhảy Nhịp Theo Bài Hát Tạo Độ Bay',
      desc: 'Cài đặt thời gian nhại ăn khớp theo nhịp bài hát để câu hát có đuôi ngân dài cuốn hút.',
      topics: [
        'Chọn kiểu nhại: Nhại một bên, nhại nảy hai tai (Ping-pong) hay nhại mờ ảo',
        'Cài đặt thời gian nhại ăn khớp theo nhịp bài hát (1/4, 1/8 note)',
        'Lọc bớt trầm và bớt chói của tiếng nhại để không đè lên chữ ca sĩ hát tiếp theo'
      ],
      outcome: 'Câu hát có đuôi ngân dài cuốn hút, đưa người nghe vào không gian âm nhạc.'
    },
    {
      session: '12',
      title: 'Thêm Tiếng Vang (Reverb): Hòa Quyện Giọng Hát Vào Beat',
      desc: 'Chọn màu vang phù hợp, chỉnh Pre-delay và cắt đuôi vang để giọng quyện chặt vào bài nhạc.',
      topics: [
        'Chọn màu vang phù hợp: Vang phòng ấm áp hay vang hội trường sâu lắng',
        'Cách dùng Pre-delay để giữ tiếng hát gần gũi trước khi tiếng vang kịp xuất hiện',
        'Cắt đuôi vang gọn gàng để bài nhạc không bị mờ mịt, lùng bùng'
      ],
      outcome: 'Giọng hát và tiếng nhạc quyện chặt vào nhau như một, không còn cảm giác rời rạc.'
    },
    {
      session: '13',
      title: 'Hiệu Ứng Đặc Biệt Cho Vocal (Điện Thoại, Méo Tiếng, Reverse)',
      desc: 'Làm hiệu ứng giọng qua điện thoại, giọng ma mị hoặc tiếng vang ngược tạo điểm nhấn.',
      topics: [
        'Làm hiệu ứng giọng nói qua điện thoại (Telephone effect) cho đoạn dạo đầu',
        'Hiệu ứng giọng ma mị, giọng robot hoặc tiếng vang ngược (Reverse Reverb)',
        'Tạo điểm nhấn thú vị cho bài hát ở những câu hát đặc biệt'
      ],
      outcome: 'Bài hát có những chi tiết điểm nhấn bất ngờ, bắt tai người nghe.'
    },
    {
      session: '14',
      title: 'Cân Bằng Âm Lượng Giọng Hát Trên Beat Để Nổi Bật',
      desc: 'Vẽ âm lượng tự động nương theo cảm xúc bài hát, đảm bảo nghe rõ từng lời ca sĩ hát.',
      topics: [
        'So sánh âm lượng giữa vocal chính, vocal bè và toàn bộ bản beat',
        'Vẽ âm lượng tự động (Vocal Ride / Automation) nương theo từng cảm xúc bài hát',
        'Đảm bảo nghe rõ từng lời ca sĩ hát mà tiếng beat vẫn mạnh mẽ, không bị lu mờ'
      ],
      outcome: 'Giọng hát đứng uy nghiêm ở trung tâm bản nhạc, rõ từng lời từng chữ.'
    },
    {
      session: '15',
      title: 'Thực Hành Hoàn Thiện 1 Bài Mix Vocal & Sửa Bài Chi Tiết',
      desc: 'Tự tay bạn làm từ đầu đến cuối một bài mix vocal hoàn chỉnh trên máy của bạn và nhận góp ý.',
      topics: [
        'Tự tay bạn làm từ đầu đến cuối một bài mix vocal hoàn chỉnh trên máy của bạn',
        'Giảng viên nghe thẩm định và hướng dẫn tinh chỉnh từng milimet',
        'Xuất file hoàn chỉnh và chia sẻ mẹo tự luyện tai nghe ở nhà'
      ],
      outcome: 'Nắm chắc toàn bộ quy trình tự mix giọng hát sạch đẹp, tự tin làm bài cho mình.'
    }
  ],

  // ==========================================
  // KHÓA 4: MIXING & MASTER TỔNG THỂ (5.000.000₫ - 15 BUỔI)
  // ==========================================
  'mix-master': [
    {
      session: '01',
      title: 'Tiếp Nhận & Sắp Xếp File Stems Đa Track Chuyên Nghiệp',
      desc: 'Kiểm tra các track gửi đến, đổi màu, đặt tên và gom nhóm vào các đường Bus khoa học.',
      topics: [
        'Kiểm tra các track nhạc cụ và vocal gửi đến: Đúng nhịp, đúng chất lượng chưa',
        'Đổi màu, gán icon, đặt tên chuẩn và sắp xếp thứ tự các track logic',
        'Gom các track vào từng nhóm riêng biệt (Drum Bus, Bass Bus, Music Bus, Vocal Bus)'
      ],
      outcome: 'Bàn làm việc ngăn nắp, khoa học, mở project ra là thấy rõ ràng mọi thứ.'
    },
    {
      session: '02',
      title: 'Cân Âm Lượng Thô (Static Mix) & Đảo Vị Trí Trái Phải (Panning)',
      desc: 'Cân chỉnh âm lượng bằng cần gạt Fader và trải rộng các nhạc cụ tạo sân khấu âm thanh 3D.',
      topics: [
        'Cân chỉnh âm lượng chỉ bằng cần gạt Fader mà chưa dùng bất kỳ hiệu ứng nào',
        'Trải rộng các nhạc cụ sang hai bên tai để tạo sân khấu âm thanh 3D sống động',
        'Giữ các yếu tố nòng cốt (Kick, Snare, Bass, Vocal chính) vững vàng ở chính giữa'
      ],
      outcome: 'Bài hát nghe đã có sự cân đối và không gian rõ ràng dù chưa bật plugin nào.'
    },
    {
      session: '03',
      title: 'Kiểm Tra & Xử Lý Lệch Pha (Phase) Giữa Các Nhạc Cụ',
      desc: 'Hiểu hiện tượng lệch pha âm thanh và dùng đảo pha để tiếng bass và kick dầy, đầm nhất.',
      topics: [
        'Hiểu hiện tượng lệch pha âm thanh: Tại sao gộp tiếng lại nghe bị mỏng dính hoặc mất bass',
        'So pha giữa Kick trong và Kick ngoài, giữa tiếng Bass mộc và Bass điện tử',
        'Dùng nút đảo pha (Phase Invert) và căn chỉnh thời gian để tiếng dầy và đầm nhất'
      ],
      outcome: 'Các âm thanh cộng hưởng với nhau mạnh mẽ, không bị triệt tiêu âm lượng.'
    },
    {
      session: '04',
      title: 'Mix Bộ Trống Chi Tiết: Kick Nảy, Snare Đanh, Hi-hat Gọn',
      desc: 'Xử lý EQ và Compressor cho bộ trống chắc nịch, có lực đập rõ ràng vào ngực người nghe.',
      topics: [
        'Xử lý EQ cho tiếng Kick có độ nặng ở dải trầm và độ gõ tách bạch ở dải cao',
        'Nén Compressor cho tiếng Snare đanh thép, có lực đấm vào ngực người nghe',
        'Thu gọn đuôi Hi-hat và cymbals sáng mịn, không làm rát tai'
      ],
      outcome: 'Bộ trống nghe chắc nịch, có lực đập rõ ràng và giữ nhịp vững chãi.'
    },
    {
      session: '05',
      title: 'Mix Tiếng Bass: Gọt Dải Siêu Trầm, Rõ Nét Trên Loa Nhỏ',
      desc: 'Cắt dải siêu trầm thừa thãi và xử lý để tiếng Bass nghe rõ mồn một trên cả loa điện thoại.',
      topics: [
        'Cắt dải siêu trầm thừa thãi (Sub cut) để nhường năng lượng cho loa hoạt động tốt',
        'Tách dải Bass thành 2 phần: Phần trầm tạo lực rung và phần trung tạo độ rõ nốt',
        'Xử lý để tiếng Bass nghe rõ mồn một trên cả loa điện thoại lẫn tai nghe rẻ tiền'
      ],
      outcome: 'Tiếng Bass vừa sâu lắng, vừa nghe rõ từng nốt nhạc trên mọi loại loa.'
    },
    {
      session: '06',
      title: 'Sidechain Cho Kick & Bass Ăn Khớp, Không Đè Lẫn Nhau',
      desc: 'Cài đặt hiệu ứng Sidechain để khi Kick giẫm xuống thì Bass tự động né ra 1 tích tắc.',
      topics: [
        'Tại sao Kick và Bass thường xuyên đánh nhau làm rè bài nhạc',
        'Cài đặt hiệu ứng Sidechain: Khi tiếng Kick giẫm xuống thì tiếng Bass tự động né ra 1 tích tắc',
        'Chỉnh thời gian nhả (Release) để tiếng trầm liền mạch như một thể thống nhất'
      ],
      outcome: 'Kick và Bass hòa làm một, dải trầm sạch sẽ, có lực mà không bị ù rền.'
    },
    {
      session: '07',
      title: 'Mix Nhạc Cụ Đệm (Piano, Guitar, Synth): Khoét Chỗ Cho Vocal',
      desc: 'Dùng EQ khoét nhẹ dải tần số quan trọng trên nhạc cụ đệm để nhường chỗ cho ca sĩ tỏa sáng.',
      topics: [
        'Dùng EQ khoét nhẹ dải tần số quan trọng trên nhạc cụ đệm để nhường chỗ cho giọng hát',
        'Nén nhẹ các nhạc cụ đệm để giữ chúng nằm gọn gàng phía sau ca sĩ',
        'Xử lý mở rộng stereo cho đàn phím và synth bao bọc xung quanh người nghe'
      ],
      outcome: 'Nhạc cụ đệm đầy đặn nhưng không hề che lấp ca sĩ chính.'
    },
    {
      session: '08',
      title: 'Nén Âm Thanh Đa Kênh (Buses & Parallel Compression) Tạo Độ Dày',
      desc: 'Kỹ thuật nén song song giữ nguyên độ nảy tự nhiên mà bài vẫn dày cộp và gắn kết chặt chẽ.',
      topics: [
        'Kỹ thuật nén song song (Parallel Compression) giữ nguyên độ nảy tự nhiên mà bài vẫn dày cộp',
        'Dùng Glue Compressor trên Drum Bus gắn kết các tiếng trống lại với nhau như một bộ gõ duy nhất',
        'Thêm một chút độ bão hòa (Saturation) trên đường tổng tạo cảm giác analog ấm áp'
      ],
      outcome: 'Toàn bộ dàn nhạc nghe có lực, đầm tay và gắn kết chặt chẽ.'
    },
    {
      session: '09',
      title: 'Phối Hợp Reverb & Delay Cho Dàn Nhạc Không Làm Đục Bài',
      desc: 'Thiết lập các đường gửi hiệu ứng chung và dọn sạch tiếng vang của dải trầm.',
      topics: [
        'Thiết lập các đường gửi hiệu ứng (Send/Return) chung cho toàn bộ bài hát',
        'Đặt các nhạc cụ vào cùng một không gian phòng ảo để tạo sự đồng nhất',
        'Dùng EQ dọn sạch tiếng vang của dải trầm, giữ cho đuôi vang trong trẻo'
      ],
      outcome: 'Bài hát có chiều sâu không gian trước sau, xa gần chân thực mà không bị đục.'
    },
    {
      session: '10',
      title: 'Đưa Giọng Hát Vào Bản Phối Đa Kênh, Cân Chỉnh Vocal Làm Chủ',
      desc: 'Hòa trộn giọng hát đã xử lý vào bản phối tổng thể và dùng Dynamic EQ nhún nhường nhạc cụ.',
      topics: [
        'Hòa trộn giọng hát đã xử lý vào bản phối tổng thể của bài',
        'Cân bằng tương quan âm lượng giữa vocal và beat theo từng đoạn cao trào',
        'Xử lý Dynamic EQ để nhạc cụ tự động nhún nhường khi ca sĩ cất giọng hát'
      ],
      outcome: 'Ca sĩ tỏa sáng lộng lẫy trên nền nhạc, tạo nên một tổng thể cuốn hút.'
    },
    {
      session: '11',
      title: 'Xử Lý Mix Bus: Keo Dính Toàn Bộ Bài Nhạc Thành Khối Thống Nhất',
      desc: 'Chuỗi xử lý trên đường ra tổng trước khi chuyển sang khâu Mastering và kiểm soát khoảng trống.',
      topics: [
        'Chuỗi xử lý trên đường ra tổng (Mix Bus): Bus Compressor, Pultec EQ, Tape Machine',
        'Kỹ thuật kiểm soát dải động (Dynamic range) tinh tế trước khi chuyển sang khâu Mastering',
        'Đo đạc thông số Headroom (chừa khoảng trống) chuẩn xác để bản phối không bị kịch trần'
      ],
      outcome: 'Bản Mix đạt độ hoàn thiện cao, nghe như một đĩa nhạc phát hành chính thức.'
    },
    {
      session: '12',
      title: 'Vẽ Âm Lượng Tự Động (Volume Automation) Tạo Cao Trào',
      desc: 'Tăng âm lượng tinh tế ở đoạn điệp khúc và thu mở stereo để bài hát dâng trào cảm xúc.',
      topics: [
        'Tăng âm lượng tinh tế ở đoạn điệp khúc để tạo cảm giác bùng nổ năng lượng',
        'Thu hẹp stereo ở đoạn lời và bung rộng sang hai tai khi vào điệp khúc',
        'Tỉa tót từng khoảnh khắc chuyển đoạn để bài hát không bao giờ bị đều đều buồn ngủ'
      ],
      outcome: 'Bài hát có cảm xúc dâng trào, dẫn dắt tâm trạng người nghe trọn vẹn.'
    },
    {
      session: '13',
      title: 'Bắt Đầu Làm Master: So Sánh Với Bài Hit Chuẩn & Cân Chỉnh',
      desc: 'Nhập bài hit cùng thể loại để làm thước đo tham chiếu và cân chỉnh dải tần tổng thể.',
      topics: [
        'Nhập các bài hát hit cùng thể loại để làm thước đo tham chiếu (Reference track)',
        'So sánh độ cân bằng dải tần (Tonal balance) giữa bài của mình và bài của các nghệ sĩ lớn',
        'Dùng Master EQ chỉnh sửa những chỗ lệch nhỏ nhất để bài đạt chất lượng chuẩn'
      ],
      outcome: 'Nắm chắc bài hát của mình đang đứng ở đâu so với tiêu chuẩn ngành âm nhạc.'
    },
    {
      session: '14',
      title: 'Đẩy Độ To (Loudness) Đạt Chuẩn: Limiter/Clipper Không Bể Tiếng',
      desc: 'Dùng Limiter chuyên dụng đẩy âm lượng lên mức chuẩn thị trường mà không làm vỡ hay bẹp tiếng.',
      topics: [
        'Sử dụng Soft Clipper để cắt bớt các đỉnh nhọn mà tai người không nghe thấy',
        'Dùng Limiter chuyên dụng đẩy âm lượng lên mức chuẩn thị trường (-14 đến -9 LUFS)',
        'Kiểm soát True Peak để file không bị méo tiếng khi chuyển đổi sang định dạng MP3/AAC'
      ],
      outcome: 'Bản Master to rõ, lực căng đét ngang ngửa các bài trên Spotify, Apple Music.'
    },
    {
      session: '15',
      title: 'Kiểm Tra Trên Điện Thoại, Tai Nghe & Xuất File Chuẩn Phát Hành',
      desc: 'Nghe kiểm tra trên loa điện thoại, tai nghe earbuds, loa ô tô và xuất các định dạng chuẩn.',
      topics: [
        'Nghe kiểm tra trên loa điện thoại, tai nghe earbuds, loa ô tô để tìm lỗi sót lại',
        'Hướng dẫn xuất các định dạng: 24-bit/48kHz cho nền tảng số, 16-bit/44.1kHz cho đĩa CD',
        'Nhập metadata, gắn mã ISRC và cách chuẩn bị bài gửi cho các nhà phát hành'
      ],
      outcome: 'Có trong tay sản phẩm âm nhạc hoàn thiện 100% đạt chuẩn thương mại.'
    }
  ]
}

const currentSyllabus = computed(() => {
  return syllabuses[selectedCourseTab.value] || syllabuses['hoa-am-co-ban']
})

const faqs = [
  { q: 'Học qua mạng thì tương tác thế nào?', a: 'Học qua Google Meet hoặc Zoom. Bạn chia sẻ màn hình máy tính của bạn, giảng viên xem và nghe trực tiếp âm thanh từ phần mềm làm nhạc, làm sai chỗ nào chỉ chỗ đó ngay như ngồi cạnh nhau.' },
  { q: 'Lịch học có linh hoạt không?', a: 'Rất linh hoạt. Bạn rảnh khung giờ nào thì báo studio sắp xếp, từ sáng, chiều đến tối, các ngày trong tuần hay cuối tuần đều được. Nếu bận đột xuất bạn chỉ cần nhắn trước để dời lịch.' },
  { q: 'Chưa biết gì về nhạc lý có học được không?', a: 'Được chứ. Khóa Hoà Âm Cơ Bản được thiết kế riêng cho người mới từ số 0. Vì kèm 1-1 nên giảng viên hướng dẫn theo đúng tốc độ của bạn. Nhạc lý dạy thực tế ngay trên đàn ảo và phần mềm, không bắt học xướng âm hay lý thuyết cổ điển dài dòng.' },
  { q: 'Cần chuẩn bị máy tính gì trước khi học?', a: 'Chỉ cần 1 laptop hoặc máy bàn (Windows hay Mac đều được) và 1 tai nghe bất kỳ. Trước buổi học đầu tiên, studio sẽ kết nối từ xa hỗ trợ cài đặt phần mềm và gửi sẵn bộ tiếng trống, tiếng đàn cần dùng.' },
  { q: 'Mỗi buổi học kéo dài bao lâu?', a: 'Mỗi buổi học kéo dài khoảng 90 đến 120 phút. Vừa học lý thuyết ứng dụng, vừa cùng giảng viên thao tác làm bài trực tiếp trên máy của bạn.' },
  { q: 'Sau 15 buổi có tự làm được bài hoàn chỉnh không?', a: 'Chắc chắn. Đúng lộ trình 15 buổi học thực chiến, bạn sẽ tự tay làm xong sản phẩm của chính bạn (tự làm beat, tự mix giọng hoặc hoàn thiện bài hát) theo mục tiêu của từng khóa.' },
  { q: 'Học xong có được hỗ trợ tiếp không?', a: 'Có chứ. Sau khóa học, khi bạn tự làm bài mới ở nhà mà bị vướng chỗ nào, cứ gửi file project qua Zalo hoặc Drive, studio sẽ nghe và chỉ thêm cho bạn.' },
  { q: 'Học phí có được chia đợt đóng không?', a: 'Có, XKProduction hỗ trợ bạn chia học phí làm 2 đợt đóng để bạn thoải mái sắp xếp tài chính.' }
]
</script>

<style scoped>
.courses-page-wrap {
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
  max-width: 720px;
  margin: 0 auto;
  line-height: 1.7;
}

.hero-stats-row {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2.2rem;
}

.hero-stat-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.6rem 1.25rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-main);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.hero-stat-pill:hover {
  border-color: rgba(125, 211, 252, 0.3);
  background: rgba(125, 211, 252, 0.06);
  transform: translateY(-2px);
}

/* ==============================================
   SECTIONS
   ============================================== */
.section-block {
  padding: 130px 0;
  position: relative;
  z-index: 1;
}

.section-courses {
  border-top: 1px solid rgba(255, 255, 255, 0.03);
}

.section-faq {
  border-top: 1px solid rgba(255, 255, 255, 0.03);
}

.section-subtitle {
  color: var(--text-light);
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  margin-bottom: 3.5rem;
  max-width: 620px;
  margin-left: auto;
  margin-right: auto;
}

/* ==============================================
   WHY CHOOSE US GRID
   ============================================== */
.why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
}

.why-card {
  padding: 2.5rem 2rem;
  text-align: center;
}

.why-icon {
  font-size: 2.2rem;
  color: var(--accent);
  margin-bottom: 1.25rem;
  filter: drop-shadow(0 0 10px rgba(125, 211, 252, 0.35));
}

.why-card h3 {
  font-size: 1.1rem;
  font-weight: 750;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.why-card p {
  font-size: 0.86rem;
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 0;
}

/* ==============================================
   COURSES GRID (3 CARDS)
   ============================================== */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2rem;
  align-items: stretch;
}

.course-card {
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  height: 100%;
  border-radius: 18px;
}

.course-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
}

.course-card.accent-blue::before { background: var(--gradient-primary); }
.course-card.accent-green::before { background: linear-gradient(90deg, #10b981, #00d4aa); }
.course-card.accent-orange::before { background: linear-gradient(90deg, #f59e0b, #ff8c00); }

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.course-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--accent);
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.course-card.accent-green .course-icon {
  color: #34d399;
  border-color: rgba(52, 211, 153, 0.2);
}

.course-card.accent-orange .course-icon {
  color: #fbbf24;
  border-color: rgba(251, 191, 36, 0.2);
}

.course-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.35rem;
}

.course-level {
  font-size: 0.68rem;
  font-weight: 800;
  color: var(--accent);
  background: rgba(125, 211, 252, 0.1);
  border: 1px solid rgba(125, 211, 252, 0.15);
  padding: 0.25rem 0.65rem;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.course-duration {
  font-size: 0.72rem;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 600;
}

.course-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 0.6rem;
  letter-spacing: -0.015em;
}

.course-desc {
  font-size: 0.88rem;
  color: var(--text-light);
  line-height: 1.65;
  margin-bottom: 1.5rem;
}

/* SWITCH CẤP ĐỘ TRONG CARD HOÀ ÂM */
.level-switch-container {
  display: flex;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 0.3rem;
  gap: 0.35rem;
  margin-bottom: 1.4rem;
}

.level-switch-btn {
  flex: 1;
  padding: 0.55rem 0.75rem;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.82rem;
  font-weight: 750;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;
}

.level-switch-btn:hover {
  color: var(--text-main);
}

.level-switch-btn.active {
  background: rgba(125, 211, 252, 0.16);
  color: var(--accent);
  box-shadow: 0 0 12px rgba(125, 211, 252, 0.15);
}

/* KHỐI NỘI DUNG LEVEL */
.level-detail-box {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.level-target-tag {
  font-size: 0.74rem;
  font-weight: 700;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid rgba(56, 189, 248, 0.18);
  padding: 0.45rem 0.75rem;
  border-radius: 8px;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 1.45;
}

.level-target-tag.tag-purple {
  color: #c084fc;
  background: rgba(192, 132, 252, 0.08);
  border-color: rgba(192, 132, 252, 0.2);
}

.level-target-tag.tag-green {
  color: #34d399;
  background: rgba(52, 211, 153, 0.08);
  border-color: rgba(52, 211, 153, 0.2);
}

.level-target-tag.tag-orange {
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.08);
  border-color: rgba(251, 191, 36, 0.2);
}

.course-topics {
  list-style: none;
  padding: 0;
  margin: 0 0 1.8rem 0;
  flex-grow: 1;
}

.course-topics li {
  padding: 0.5rem 0;
  color: var(--text-light);
  font-size: 0.84rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.035);
  padding-left: 1.4rem;
  position: relative;
  line-height: 1.45;
}

.course-topics li::before {
  font-family: 'Font Awesome 6 Free';
  content: '\f00c';
  font-weight: 900;
  position: absolute;
  left: 0;
  top: 0.5rem;
  color: #34d399;
  font-size: 0.72rem;
}

.course-price-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1.1rem;
  margin-top: auto;
  margin-bottom: 1.25rem;
}

.price-val {
  font-size: 1.45rem;
  font-weight: 850;
  letter-spacing: -0.01em;
}

.price-period {
  font-size: 0.76rem;
  color: var(--text-muted);
  font-weight: 600;
}

.course-action-row {
  display: flex;
  gap: 0.65rem;
}

.btn-outline-syllabus {
  flex: 1;
  padding: 0.65rem 0.9rem;
  font-size: 0.8rem;
  font-weight: 750;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-light);
  border-radius: 10px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  transition: all 0.25s ease;
  font-family: inherit;
}

.btn-outline-syllabus:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.25);
  color: var(--text-main);
}

.course-cta {
  padding: 0.65rem 1.1rem;
  font-size: 0.8rem;
  font-weight: 750;
  border-radius: 10px;
  white-space: nowrap;
}

/* ==============================================
   SUPPORT & COMMITMENT CARD
   ============================================== */
.support-info-card {
  padding: 3rem 2.5rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.support-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 2.5rem auto;
}

.support-title {
  font-size: clamp(1.4rem, 2.5vw, 1.8rem);
  font-weight: 800;
  color: var(--text-main);
  margin-top: 0.85rem;
  margin-bottom: 0.65rem;
}

.support-sub {
  font-size: 0.9rem;
  color: var(--text-light);
  line-height: 1.65;
  margin: 0;
}

.support-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.support-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 14px;
}

.support-icon {
  font-size: 1.35rem;
  margin-top: 0.15rem;
  flex-shrink: 0;
}

.support-item strong {
  display: block;
  font-size: 0.92rem;
  color: var(--text-main);
  margin-bottom: 0.3rem;
}

.support-item span {
  font-size: 0.82rem;
  color: var(--text-light);
  line-height: 1.55;
  display: block;
}

/* ==============================================
   SYLLABUS DETAIL SECTION
   ============================================== */
.section-syllabus {
  border-top: 1px solid rgba(255, 255, 255, 0.03);
}

.syllabus-course-tabs {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.syllabus-course-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 1.4rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  color: var(--text-light);
  font-size: 0.85rem;
  font-weight: 750;
  cursor: pointer;
  transition: all 0.3s var(--ease-out-expo);
  font-family: inherit;
}

.syllabus-course-tab-btn:hover {
  color: var(--text-main);
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.06);
}

.syllabus-course-tab-btn.active.accent-blue {
  background: rgba(56, 189, 248, 0.12);
  border-color: #38bdf8;
  color: #38bdf8;
  box-shadow: 0 0 16px rgba(56, 189, 248, 0.2);
}

.syllabus-course-tab-btn.active.accent-purple {
  background: rgba(192, 132, 252, 0.12);
  border-color: #c084fc;
  color: #c084fc;
  box-shadow: 0 0 16px rgba(192, 132, 252, 0.2);
}

.syllabus-course-tab-btn.active.accent-green {
  background: rgba(52, 211, 153, 0.12);
  border-color: #34d399;
  color: #34d399;
  box-shadow: 0 0 16px rgba(52, 211, 153, 0.2);
}

.syllabus-course-tab-btn.active.accent-orange {
  background: rgba(251, 191, 36, 0.12);
  border-color: #fbbf24;
  color: #fbbf24;
  box-shadow: 0 0 16px rgba(251, 191, 36, 0.2);
}

.tab-course-badge {
  padding: 0.15rem 0.55rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  font-size: 0.72rem;
  font-weight: 600;
}

.syllabus-course-tab-btn.active .tab-course-badge {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}

/* ACTIVE COURSE BANNER */
.active-course-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 1.8rem 2.2rem;
  border-radius: 16px;
  margin-bottom: 3.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  flex-wrap: wrap;
}

.active-course-banner.border-blue { border-left: 4px solid #38bdf8; }
.active-course-banner.border-purple { border-left: 4px solid #c084fc; }
.active-course-banner.border-green { border-left: 4px solid #34d399; }
.active-course-banner.border-orange { border-left: 4px solid #fbbf24; }

.active-banner-left {
  flex: 1;
  min-width: 280px;
}

.active-banner-tag {
  font-size: 0.85rem;
  color: var(--text-main);
  margin-bottom: 0.4rem;
}

.active-banner-tag strong {
  color: var(--accent);
}

.active-banner-desc {
  font-size: 0.86rem;
  color: var(--text-light);
  line-height: 1.6;
  margin: 0;
}

.active-banner-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.active-banner-fee {
  font-size: 1.65rem;
  font-weight: 850;
  letter-spacing: -0.015em;
}

.active-banner-sessions {
  font-size: 0.76rem;
  color: var(--text-muted);
  font-weight: 600;
  margin-bottom: 0.4rem;
}

/* SYLLABUS CARDS GRID */
.syllabus-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 2rem;
}

.syllabus-card {
  padding: 2.2rem 1.85rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  height: 100%;
  border-radius: 16px;
}

.syllabus-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
}

.syllabus-card.accent-blue::before { background: var(--gradient-primary); }
.syllabus-card.accent-purple::before { background: linear-gradient(90deg, #a855f7, #c084fc); }
.syllabus-card.accent-green::before { background: linear-gradient(90deg, #10b981, #00d4aa); }
.syllabus-card.accent-orange::before { background: linear-gradient(90deg, #f59e0b, #ff8c00); }

.syllabus-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.session-num-badge {
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 1px;
  padding: 0.3rem 0.75rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-main);
}

.syllabus-card.accent-blue .session-num-badge {
  background: rgba(56, 189, 248, 0.12);
  border-color: rgba(56, 189, 248, 0.3);
  color: #38bdf8;
}

.syllabus-card.accent-purple .session-num-badge {
  background: rgba(192, 132, 252, 0.12);
  border-color: rgba(192, 132, 252, 0.3);
  color: #c084fc;
}

.syllabus-card.accent-green .session-num-badge {
  background: rgba(16, 185, 129, 0.12);
  border-color: rgba(16, 185, 129, 0.3);
  color: #34d399;
}

.syllabus-card.accent-orange .session-num-badge {
  background: rgba(245, 158, 11, 0.12);
  border-color: rgba(245, 158, 11, 0.3);
  color: #fbbf24;
}

.session-phase-tag {
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 600;
}

.session-card-title {
  font-size: 1.15rem;
  font-weight: 750;
  color: var(--text-main);
  line-height: 1.4;
  margin-bottom: 0.65rem;
}

.session-card-desc {
  font-size: 0.85rem;
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 1.4rem;
}

.session-topics-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1rem 1.1rem;
  margin-bottom: 1.25rem;
  flex-grow: 1;
}

.topics-heading {
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.65rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.session-topics-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.session-topics-list li {
  font-size: 0.82rem;
  color: var(--text-light);
  line-height: 1.5;
  padding: 0.35rem 0 0.35rem 1.25rem;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.025);
}

.session-topics-list li:last-child {
  border-bottom: none;
}

.session-topics-list li::before {
  content: '•';
  color: var(--accent);
  position: absolute;
  left: 0.25rem;
  font-weight: 900;
}

.session-outcome-box {
  background: rgba(125, 211, 252, 0.04);
  border: 1px solid rgba(125, 211, 252, 0.12);
  border-radius: 10px;
  padding: 0.9rem 1.1rem;
  margin-top: auto;
}

.outcome-label {
  font-size: 0.74rem;
  font-weight: 750;
  color: #34d399;
  margin-bottom: 0.35rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.outcome-text {
  font-size: 0.82rem;
  color: var(--text-main);
  line-height: 1.55;
  margin: 0;
  font-weight: 500;
}

/* ==============================================
   FAQ ACCORDION
   ============================================== */
.faq-list {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-accordion-item {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.faq-question-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem 1.75rem;
  background: transparent;
  border: none;
  color: var(--text-main);
  font-size: 0.98rem;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
  gap: 1.5rem;
  font-family: inherit;
}

.faq-icon-wrap {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: var(--text-muted);
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.faq-accordion-item.open .faq-icon-wrap {
  background: rgba(125, 211, 252, 0.15);
  border-color: var(--accent);
  color: var(--accent);
}

.faq-answer-pane {
  padding: 0 1.75rem 1.5rem 1.75rem;
}

.faq-answer-pane p {
  color: var(--text-light);
  font-size: 0.88rem;
  line-height: 1.7;
  margin: 0;
}

/* ==============================================
   FINAL CALL TO ACTION
   ============================================== */
.final-cta {
  padding-bottom: 140px;
}

.cta-block {
  padding: 5rem 2.5rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(125, 211, 252, 0.12);
  background: radial-gradient(circle at top left, rgba(125, 211, 252, 0.05), transparent 30%),
              var(--glass-bg);
  border-radius: 20px;
}

.cta-block h2 {
  font-size: clamp(1.8rem, 3vw, 2.3rem);
  color: var(--text-main);
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.cta-block p {
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

.btn-zalo {
  background: rgba(0, 104, 255, 0.15);
  border: 1px solid rgba(0, 104, 255, 0.3);
  color: #38bdf8;
}

.btn-zalo:hover {
  background: rgba(0, 104, 255, 0.25);
  border-color: rgba(0, 104, 255, 0.5);
}

/* ==============================================
   RESPONSIVE
   ============================================== */
@media (max-width: 768px) {
  .page-hero { padding-top: 150px; padding-bottom: 3.5rem; }
  .section-block { padding: 80px 0; }
  .hero-stats-row { flex-direction: column; align-items: stretch; max-width: 320px; margin-left: auto; margin-right: auto; }
  .hero-stat-pill { justify-content: center; }
  .why-grid, .courses-grid { grid-template-columns: 1fr; }
  .course-action-row { flex-direction: column; }
  .btn-outline-syllabus, .course-cta { width: 100%; text-align: center; justify-content: center; }
  .support-info-card { padding: 2.2rem 1.35rem; }
  .syllabus-course-tabs { flex-direction: column; align-items: stretch; gap: 0.5rem; }
  .syllabus-course-tab-btn { justify-content: space-between; }
  .active-course-banner { flex-direction: column; align-items: flex-start; gap: 1.25rem; padding: 1.5rem; }
  .active-banner-right { align-items: flex-start; text-align: left; }
  .syllabus-grid { grid-template-columns: 1fr; }
  .faq-question-btn { padding: 1.25rem 1rem; font-size: 0.9rem; }
  .faq-answer-pane { padding: 0 1rem 1.25rem; }
  .final-cta { padding-bottom: 80px; }
  .cta-block { padding: 3.5rem 1.5rem; }
}
</style>
