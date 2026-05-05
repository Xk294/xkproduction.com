<template>
  <div>
    <section class="page-hero">
      <div class="max-width">
        <h1>Blog & Kiến Thức Âm Nhạc</h1>
        <p class="page-hero-sub">Chia sẻ kinh nghiệm, mẹo thu âm, mix master và kiến thức sản xuất âm nhạc từ đội ngũ XKProduction</p>
      </div>
    </section>

    <section class="blog-section">
      <div class="max-width">
        <!-- Filter Tags -->
        <div class="blog-filters">
          <button
            v-for="tag in tags" :key="tag"
            class="filter-tag"
            :class="{ active: activeTag === tag }"
            @click="activeTag = tag"
          >{{ tag }}</button>
        </div>

        <!-- Blog Grid -->
        <div class="blog-grid">
          <article
            v-for="(post, i) in filteredPosts" :key="i"
            class="blog-card"
            @click="togglePost(i)"
            role="button"
            tabindex="0"
            @keydown.enter="togglePost(i)"
          >
            <div class="blog-card-thumb">
              <img :src="post.thumb" :alt="post.title" loading="lazy" />
              <div class="blog-card-category">
                <i :class="post.icon"></i>
                <span>{{ post.category }}</span>
              </div>
            </div>
            <div class="blog-card-body">
              <h2 class="blog-card-title">{{ post.title }}</h2>
              <p class="blog-card-excerpt">{{ post.excerpt }}</p>
              <div class="blog-card-meta">
                <span><i class="fa-solid fa-user"></i> {{ post.author }}</span>
                <span><i class="fa-solid fa-calendar"></i> {{ post.date }}</span>
                <span><i class="fa-solid fa-clock"></i> {{ post.readTime }}</span>
              </div>
            </div>

            <!-- Expandable Content -->
            <Transition name="expand">
              <div v-if="expandedPost === i" class="blog-card-content" @click.stop>
                <div class="content-divider"></div>
                <div class="blog-full-content" v-html="post.content"></div>
                <div class="content-cta">
                  <NuxtLink to="/contact" class="btn btn-primary">Liên hệ tư vấn</NuxtLink>
                </div>
              </div>
            </Transition>
          </article>
        </div>

        <!-- CTA -->
        <div class="blog-cta-section">
          <div class="blog-cta-card">
            <i class="fa-solid fa-lightbulb"></i>
            <h3>Bạn muốn biết thêm về dịch vụ?</h3>
            <p>Liên hệ ngay để được tư vấn miễn phí về thu âm, mix master, hoà âm phối khí và các dịch vụ khác.</p>
            <NuxtLink to="/contact" class="btn btn-primary">Liên hệ tư vấn miễn phí</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Blog & Kiến Thức Âm Nhạc - Mẹo Thu Âm, Mix Master | XKProduction',
  description: 'Blog kiến thức âm nhạc từ XKProduction: Hướng dẫn thu âm tại nhà, mẹo mixing mastering, cách hoà âm phối khí, bảng giá phòng thu âm Bình Phước. Cập nhật mỗi tuần.',
  ogTitle: 'Blog Kiến Thức Âm Nhạc - XKProduction',
  ogDescription: 'Chia sẻ kinh nghiệm thu âm, mix master, hoà âm phối khí và kiến thức sản xuất âm nhạc chuyên nghiệp từ XKProduction.',
  ogImage: 'https://xkproduction.com/images/blog-thu-am-gia.jpg',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Blog kiến thức âm nhạc XKProduction',
  ogUrl: 'https://xkproduction.com/blog',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xkproduction.com/images/blog-thu-am-gia.jpg',
  keywords: 'blog âm nhạc, kiến thức thu âm, hướng dẫn mix master, cách hoà âm phối khí, phòng thu âm Bình Phước, thu âm bài hát giá bao nhiêu, mix master giá rẻ, hòa âm phối khí online, XKProduction blog'
})

useSchemaOrg([
  defineWebPage({
    name: 'Blog & Kiến Thức Âm Nhạc - XKProduction',
    description: 'Blog chia sẻ kiến thức về thu âm, mixing, mastering và sản xuất âm nhạc từ đội ngũ XKProduction.'
  }),
  {
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Trang chủ', 'item': 'https://xkproduction.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Blog & Kiến Thức Âm Nhạc', 'item': 'https://xkproduction.com/blog' }
    ]
  },
  // BlogPosting schema cho từng bài viết (boost SEO mạnh)
  {
    '@type': 'BlogPosting',
    'headline': 'Thu Âm Bài Hát Giá Bao Nhiêu? Bảng Giá Chi Tiết 2026',
    'description': 'Tổng hợp bảng giá thu âm bài hát mới nhất. Thu âm từ 350.000₫ tại XKProduction Bình Phước.',
    'image': 'https://xkproduction.com/images/blog-thu-am-gia.jpg',
    'author': { '@type': 'Organization', 'name': 'XKProduction', 'url': 'https://xkproduction.com' },
    'publisher': {
      '@type': 'Organization',
      'name': 'XKProduction',
      'logo': { '@type': 'ImageObject', 'url': 'https://xkproduction.com/images/xk-logo-new.jpg' }
    },
    'datePublished': '2026-04-28',
    'dateModified': '2026-04-28',
    'url': 'https://xkproduction.com/blog',
    'keywords': 'thu âm bài hát, giá thu âm, bảng giá thu âm, XKProduction Bình Phước'
  },
  {
    '@type': 'BlogPosting',
    'headline': 'Mix Master Là Gì? Hướng Dẫn Từ A-Z Cho Người Mới',
    'description': 'Hiểu rõ quy trình mixing và mastering — hai bước quan trọng nhất quyết định chất lượng bản nhạc.',
    'image': 'https://xkproduction.com/images/blog-mix-master.jpg',
    'author': { '@type': 'Person', 'name': 'Nguyễn Xuân Kiệt', 'url': 'https://xkproduction.com/about' },
    'publisher': {
      '@type': 'Organization',
      'name': 'XKProduction',
      'logo': { '@type': 'ImageObject', 'url': 'https://xkproduction.com/images/xk-logo-new.jpg' }
    },
    'datePublished': '2026-04-20',
    'dateModified': '2026-04-20',
    'url': 'https://xkproduction.com/blog',
    'keywords': 'mix master, mixing mastering, mix master giá rẻ, mixing mastering online'
  },
  {
    '@type': 'BlogPosting',
    'headline': 'Hoà Âm Phối Khí Online — Quy Trình & Chi Phí',
    'description': 'Tìm hiểu quy trình hoà âm phối khí online chuyên nghiệp và bảng giá chi tiết tại XKProduction.',
    'image': 'https://xkproduction.com/images/blog-hoa-am.jpg',
    'author': { '@type': 'Organization', 'name': 'XKProduction', 'url': 'https://xkproduction.com' },
    'publisher': {
      '@type': 'Organization',
      'name': 'XKProduction',
      'logo': { '@type': 'ImageObject', 'url': 'https://xkproduction.com/images/xk-logo-new.jpg' }
    },
    'datePublished': '2026-04-15',
    'dateModified': '2026-04-15',
    'url': 'https://xkproduction.com/blog',
    'keywords': 'hoà âm phối khí, hoà âm phối khí online, phối nhạc online, nhạc nền bài hát'
  },
  {
    '@type': 'BlogPosting',
    'headline': 'Phòng Thu Âm Bình Phước — Tại Sao Chọn XKProduction?',
    'description': 'Khám phá lý do XKProduction trở thành phòng thu âm được nhiều nghệ sĩ tin tưởng nhất tại Bình Phước.',
    'image': 'https://xkproduction.com/images/blog-phong-thu.jpg',
    'author': { '@type': 'Person', 'name': 'Nguyễn Xuân Kiệt', 'url': 'https://xkproduction.com/about' },
    'publisher': {
      '@type': 'Organization',
      'name': 'XKProduction',
      'logo': { '@type': 'ImageObject', 'url': 'https://xkproduction.com/images/xk-logo-new.jpg' }
    },
    'datePublished': '2026-04-25',
    'dateModified': '2026-04-25',
    'url': 'https://xkproduction.com/blog',
    'keywords': 'phòng thu âm Bình Phước, studio Bình Phước, thu âm Bình Phước'
  }
])

const activeTag = ref('Tất cả')
const expandedPost = ref<number | null>(null)

function togglePost(index: number) {
  expandedPost.value = expandedPost.value === index ? null : index
}

const blogPosts = [
  {
    title: 'Thu Âm Bài Hát Giá Bao Nhiêu? Bảng Giá Chi Tiết 2026',
    excerpt: 'Tổng hợp bảng giá thu âm bài hát mới nhất tại các phòng thu chuyên nghiệp. So sánh giá và chất lượng để lựa chọn phù hợp nhất.',
    content: `<h3>Giá thu âm bài hát phụ thuộc vào những yếu tố nào?</h3>
    <p>Giá thu âm phụ thuộc vào <strong>thiết bị phòng thu</strong>, <strong>kinh nghiệm kỹ sư âm thanh</strong>, <strong>thời gian thu âm</strong> và <strong>các dịch vụ kèm theo</strong> (chỉnh sửa, tune pitch, etc.).</p>
    <h3>Bảng giá tham khảo tại XKProduction</h3>
    <ul>
      <li><strong>Gói Cơ Bản:</strong> Từ 350.000₫ — thu âm 1-2 tiếng, chỉnh sửa cơ bản, xuất file WAV/MP3</li>
      <li><strong>Gói Nâng Cao:</strong> Từ 550.000₫ — thu âm 2-3 tiếng, vocal production đầy đủ</li>
      <li><strong>Gói Pro:</strong> Từ 1.000.000₫ — thu âm không giới hạn session, vocal coaching</li>
      <li><strong>Gói Cao Cấp:</strong> Từ 1.800.000₫ — tất cả bao gồm, revision không giới hạn</li>
    </ul>
    <h3>Tại sao nên chọn XKProduction?</h3>
    <p>XKProduction có hơn <strong>7 năm kinh nghiệm</strong>, đã hoàn thành <strong>2000+ dự án</strong>. Chúng tôi cam kết chất lượng âm thanh chuẩn quốc tế với giá cả phải chăng nhất khu vực Bình Phước.</p>`,
    category: 'Bảng Giá',
    icon: 'fa-solid fa-tag',
    author: 'XKProduction',
    date: '28/04/2026',
    readTime: '3 phút đọc',
    thumb: '/images/blog-thu-am-gia.jpg',
    tags: ['Bảng Giá', 'Thu Âm']
  },
  {
    title: 'Phòng Thu Âm Bình Phước — Tại Sao Chọn XKProduction?',
    excerpt: 'Khám phá lý do XKProduction trở thành phòng thu âm được nhiều nghệ sĩ tin tưởng nhất tại Bình Phước với chất lượng chuẩn quốc tế.',
    content: `<h3>XKProduction — Phòng thu âm chuyên nghiệp tại Bình Phước</h3>
    <p>Tọa lạc tại QL14 km25, xã Nghĩa Trung, Huyện Bù Đăng, <strong>XKProduction</strong> là phòng thu âm chuyên nghiệp hàng đầu tại Bình Phước. Với hơn 7 năm kinh nghiệm và 2000+ dự án hoàn thiện, chúng tôi tự hào mang đến dịch vụ thu âm chất lượng chuẩn quốc tế.</p>
    <h3>Điểm khác biệt</h3>
    <ul>
      <li><strong>Founder có 7+ năm kinh nghiệm</strong> trong ngành sản xuất âm nhạc</li>
      <li><strong>Thiết bị chuyên nghiệp:</strong> Micro condenser, preamp, audio interface chất lượng cao</li>
      <li><strong>Không gian yên tĩnh:</strong> Phòng thu được cách âm theo tiêu chuẩn quốc tế</li>
      <li><strong>Giá cả hợp lý:</strong> Tiết kiệm hơn phòng thu tại TP.HCM nhưng chất lượng tương đương</li>
    </ul>
    <h3>Dịch vụ tại XKProduction</h3>
    <p>Thu âm bài hát, mixing & mastering, hoà âm phối khí, quay MV/TVC, và cho thuê âm thanh ánh sáng sân khấu sự kiện.</p>`,
    category: 'Giới Thiệu',
    icon: 'fa-solid fa-building',
    author: 'Nguyễn Xuân Kiệt',
    date: '25/04/2026',
    readTime: '4 phút đọc',
    thumb: '/images/blog-phong-thu.jpg',
    tags: ['Giới Thiệu', 'Thu Âm']
  },
  {
    title: 'Mix Master Là Gì? Hướng Dẫn Từ A-Z Cho Người Mới',
    excerpt: 'Hiểu rõ quy trình mixing và mastering — hai bước quan trọng nhất quyết định chất lượng bản nhạc của bạn.',
    content: `<h3>Mixing là gì?</h3>
    <p><strong>Mixing (trộn âm)</strong> là quá trình cân bằng và xử lý các track âm thanh riêng lẻ (vocal, bass, drum, guitar...) thành một bản mix stereo hoàn chỉnh. Kỹ sư mixing sẽ sử dụng EQ, Compressor, Reverb, Delay... để tạo ra không gian và sự cân bằng cho bản nhạc.</p>
    <h3>Mastering là gì?</h3>
    <p><strong>Mastering</strong> là bước cuối cùng trước khi phát hành. Mục tiêu là đảm bảo bản nhạc có âm lượng phù hợp, cân bằng tần số, và nghe tốt trên mọi thiết bị (tai nghe, loa, điện thoại...).</p>
    <h3>Giá mix master tại XKProduction</h3>
    <ul>
      <li><strong>Mix & Master Cơ Bản:</strong> Từ 300.000₫ — stereo track + mastering chuẩn streaming</li>
      <li><strong>Mix & Master Chuyên Nghiệp:</strong> Từ 500.000₫ — multi-track, chuẩn Spotify/Apple Music</li>
    </ul>`,
    category: 'Kiến Thức',
    icon: 'fa-solid fa-graduation-cap',
    author: 'Nguyễn Xuân Kiệt',
    date: '20/04/2026',
    readTime: '5 phút đọc',
    thumb: '/images/blog-mix-master.jpg',
    tags: ['Kiến Thức', 'Mix & Master']
  },
  {
    title: 'Hoà Âm Phối Khí Online — Quy Trình & Chi Phí',
    excerpt: 'Tìm hiểu quy trình hoà âm phối khí online chuyên nghiệp và bảng giá chi tiết tại XKProduction.',
    content: `<h3>Hoà âm phối khí là gì?</h3>
    <p><strong>Hoà âm phối khí</strong> là quá trình biên soạn và sắp xếp các nhạc cụ, giai điệu phụ hoạ cho một bài hát. Đây là bước đưa bài hát từ giai điệu đơn giản thành một tác phẩm âm nhạc hoàn chỉnh.</p>
    <h3>Quy trình hoà âm phối khí online tại XKProduction</h3>
    <ol>
      <li><strong>Gửi demo/melody:</strong> Khách hàng gửi file ghi âm hoặc sheet nhạc</li>
      <li><strong>Tư vấn thể loại:</strong> Đội ngũ sẽ tư vấn phong cách phối khí phù hợp</li>
      <li><strong>Sản xuất:</strong> MIDI programming, nhạc cụ thật, mix sơ bộ</li>
      <li><strong>Revision:</strong> Chỉnh sửa theo feedback của khách hàng</li>
      <li><strong>Delivery:</strong> Giao file stem và mix final</li>
    </ol>
    <h3>Chi phí</h3>
    <ul>
      <li><strong>Gói Cơ bản:</strong> Từ 1.500.000₫ — phối khí 1 thể loại, MIDI programming</li>
      <li><strong>Gói Chuyên nghiệp:</strong> Từ 3.500.000₫ — đa thể loại, nhạc cụ thật, revision không giới hạn</li>
    </ul>`,
    category: 'Kiến Thức',
    icon: 'fa-solid fa-music',
    author: 'XKProduction',
    date: '15/04/2026',
    readTime: '4 phút đọc',
    thumb: '/images/blog-hoa-am.jpg',
    tags: ['Kiến Thức', 'Hoà Âm']
  },
  {
    title: '5 Mẹo Thu Âm Vocal Chuyên Nghiệp Tại Nhà',
    excerpt: 'Bạn muốn thu âm tại nhà nhưng không biết bắt đầu từ đâu? Đây là 5 mẹo giúp vocal của bạn nghe chuyên nghiệp hơn.',
    content: `<h3>1. Chọn phòng yên tĩnh nhất</h3>
    <p>Tránh phòng có tiếng ồn từ quạt, máy lạnh, đường phố. Phòng nhỏ có nhiều vải (rèm, chăn) sẽ giúp giảm vọng âm.</p>
    <h3>2. Khoảng cách micro hợp lý</h3>
    <p>Giữ khoảng cách khoảng <strong>15-20cm</strong> từ miệng đến micro. Sử dụng pop filter để giảm âm "p" và "b" bùng nổ.</p>
    <h3>3. Gain staging đúng cách</h3>
    <p>Đảm bảo tín hiệu đầu vào ở mức <strong>-18dB đến -12dB</strong>. Không để clipping (đèn đỏ).</p>
    <h3>4. Thu nhiều take</h3>
    <p>Luôn thu ít nhất <strong>3-5 take</strong> cho mỗi đoạn. Điều này giúp bạn và kỹ sư mix chọn được take tốt nhất.</p>
    <h3>5. Gửi phòng thu chuyên nghiệp xử lý</h3>
    <p>Dù thu tại nhà, bạn vẫn nên gửi file raw vocal đến phòng thu chuyên nghiệp như <strong>XKProduction</strong> để mixing & mastering, đảm bảo chất lượng phát hành.</p>`,
    category: 'Mẹo Hay',
    icon: 'fa-solid fa-lightbulb',
    author: 'Nguyễn Xuân Kiệt',
    date: '10/04/2026',
    readTime: '3 phút đọc',
    thumb: '/images/blog-meo-thu-am.jpg',
    tags: ['Mẹo Hay', 'Thu Âm']
  },

  {
    title: 'Thu Âm Tại Bình Phước — Có Đáng Tin Không? Sự Thật Sau 7 Năm',
    excerpt: 'Nhiều người vẫn nghĩ phải lên Sài Gòn mới có phòng thu tốt. Đây là sự thật mà chúng tôi muốn chia sẻ sau 7 năm hoạt động tại Bình Phước.',
    content: `<h3>Tại sao vẫn còn định kiến về phòng thu tỉnh lẻ?</h3>
    <p>Quan niệm "Sài Gòn mới có phòng thu chất" đã tồn tại lâu trong cộng đồng âm nhạc Việt Nam. Nhưng thực tế năm 2026 đã thay đổi rất nhiều. Thiết bị thu âm chuyên nghiệp ngày nay không còn là độc quyền của thành phố lớn — điều tạo nên sự khác biệt là <strong>con người và kỹ thuật</strong>, không phải địa lý.</p>
    <h3>Những gì XKProduction đã chứng minh qua 7 năm</h3>
    <ul>
      <li><strong>2000+ dự án hoàn thành</strong> — từ demo cá nhân đến MV phát hành chính thức</li>
      <li><strong>Khách hàng toàn quốc</strong> — nhiều ca sĩ TP.HCM, Hà Nội vẫn gửi file về để mix</li>
      <li><strong>Thiết bị chuẩn quốc tế</strong> — micro condenser, preamp Neve, interface chuyên nghiệp</li>
      <li><strong>Giá tiết kiệm 30-50%</strong> so với studio cùng chất lượng tại TP.HCM</li>
    </ul>
    <h3>Phòng thu tốt cần gì?</h3>
    <p>Cách âm tốt + thiết bị chuẩn + kỹ sư có tai nghe. Tất cả ba yếu tố này đều có mặt tại XKProduction Bình Phước. Kết quả không nói dối — hãy nghe thử các dự án đã hoàn thành.</p>`,
    category: 'Kiến Thức',
    icon: 'fa-solid fa-graduation-cap',
    author: 'Nguyễn Xuân Kiệt',
    date: '02/05/2026',
    readTime: '5 phút đọc',
    thumb: '/images/blog-phong-thu.jpg',
    tags: ['Kiến Thức', 'Thu Âm']
  },
  {
    title: 'Phần Mềm Mix Master Miễn Phí Tốt Nhất 2026 — Dùng Được Không?',
    excerpt: 'Audacity, GarageBand, LMMS... có thực sự đủ tốt để ra sản phẩm chuyên nghiệp? Chuyên gia âm thanh đánh giá thực tế.',
    content: `<h3>Phần mềm miễn phí nào đang được dùng nhiều nhất?</h3>
    <ul>
      <li><strong>Audacity</strong> — Ghi âm, chỉnh sửa cơ bản. Miễn phí hoàn toàn, đa nền tảng.</li>
      <li><strong>GarageBand (Mac)</strong> — Rất tốt để demo, phối nhạc đơn giản.</li>
      <li><strong>LMMS</strong> — DAW miễn phí mạnh nhất, hỗ trợ VST plugin.</li>
      <li><strong>Cakewalk by BandLab</strong> — DAW chuyên nghiệp, miễn phí 100% trên Windows.</li>
    </ul>
    <h3>Giới hạn thực sự của phần mềm miễn phí</h3>
    <p>Phần mềm miễn phí <strong>đủ dùng để học và demo</strong>, nhưng thiếu: plugin chất lượng cao (compressor, EQ), latency thấp cho thu âm thật, và workflow chuyên nghiệp. Để ra sản phẩm phát hành Spotify chuẩn, bạn vẫn cần DAW như Pro Tools, Logic Pro X hoặc Ableton.</p>
    <h3>Lời khuyên thực tế</h3>
    <p>Dùng phần mềm miễn phí để học, làm quen với âm nhạc. Khi cần ra sản phẩm thực sự, hãy để kỹ sư chuyên nghiệp tại XKProduction xử lý — tiết kiệm thời gian và đảm bảo chất lượng phát hành.</p>`,
    category: 'Kiến Thức',
    icon: 'fa-solid fa-graduation-cap',
    author: 'Nguyễn Xuân Kiệt',
    date: '01/05/2026',
    readTime: '6 phút đọc',
    thumb: '/images/blog-mix-master.jpg',
    tags: ['Kiến Thức', 'Mix & Master']
  },
  {
    title: 'Cách Chuẩn Bị Trước Khi Vào Phòng Thu — Checklist Đầy Đủ',
    excerpt: 'Nhiều ca sĩ lãng phí 1-2 tiếng đầu vì không chuẩn bị kỹ. Đây là checklist giúp bạn tận dụng 100% thời gian trong phòng thu.',
    content: `<h3>Trước buổi thu 1 tuần</h3>
    <ul>
      <li>Luyện bài hát <strong>ít nhất 20-30 lần</strong> — thuộc lời, thuộc giai điệu, thuộc cảm xúc</li>
      <li>Ghi âm thử tại nhà để tự đánh giá giọng và phát hiện điểm yếu</li>
      <li>Xác định tempo, key phù hợp với giọng của bạn</li>
    </ul>
    <h3>Trước buổi thu 1 ngày</h3>
    <ul>
      <li><strong>Không uống rượu bia, đồ lạnh, đồ cay</strong> — ảnh hưởng giọng rất nhiều</li>
      <li>Ngủ đủ giấc — giọng sau khi nghỉ ngơi tốt hơn 30%</li>
      <li>Chuẩn bị file nhạc đệm (MP3/WAV, không có vocal)</li>
    </ul>
    <h3>Trong buổi thu</h3>
    <ul>
      <li>Khởi động giọng 10-15 phút trước khi thu chính thức</li>
      <li>Uống nước ấm, không uống nước lạnh</li>
      <li>Đừng ngại thu nhiều take — kỹ sư sẽ chọn take tốt nhất cho bạn</li>
    </ul>`,
    category: 'Mẹo Hay',
    icon: 'fa-solid fa-lightbulb',
    author: 'XKProduction',
    date: '29/04/2026',
    readTime: '4 phút đọc',
    thumb: '/images/blog-meo-thu-am.jpg',
    tags: ['Mẹo Hay', 'Thu Âm']
  },
  {
    title: 'Mix Master Online Giá Rẻ Uy Tín — Làm Sao Không Bị Lừa?',
    excerpt: 'Thị trường mix master online đang bùng nổ nhưng cũng đầy rủi ro. Đây là 5 dấu hiệu nhận biết dịch vụ uy tín và cách bảo vệ bản thân.',
    content: `<h3>Tại sao mix master online ngày càng phổ biến?</h3>
    <p>Năm 2026, hơn 60% dự án âm nhạc cá nhân được thực hiện theo quy trình hybrid: <strong>thu âm tại studio địa phương, mix master online</strong>. Lý do đơn giản — tiết kiệm chi phí di chuyển, lựa chọn nhiều hơn.</p>
    <h3>5 dấu hiệu dịch vụ mix online uy tín</h3>
    <ol>
      <li><strong>Có portfolio thực tế</strong> — nghe được sản phẩm đã hoàn thành, không chỉ quảng cáo</li>
      <li><strong>Quy trình rõ ràng</strong> — timeline cụ thể, số lần revision được ghi rõ</li>
      <li><strong>Liên lạc minh bạch</strong> — có Zalo/phone thực, không chỉ inbox Facebook</li>
      <li><strong>Giá hợp lý</strong> — mix master chuyên nghiệp khó dưới 300k, cảnh giác với giá quá rẻ</li>
      <li><strong>Phản hồi từ khách cũ</strong> — testimonial thực, không phải review ảo</li>
    </ol>
    <h3>XKProduction cam kết gì?</h3>
    <p>Turnaround 3-5 ngày, revision theo gói, bàn giao file WAV/MP3 chuẩn Spotify. Xem bảng giá chi tiết tại trang Dịch vụ.</p>`,
    category: 'Bảng Giá',
    icon: 'fa-solid fa-tag',
    author: 'XKProduction',
    date: '27/04/2026',
    readTime: '5 phút đọc',
    thumb: '/images/blog-mix-master.jpg',
    tags: ['Bảng Giá', 'Mix & Master']
  },
  {
    title: 'Bảng Giá Hoà Âm Phối Khí 2026 — Tất Cả Những Gì Bạn Cần Biết',
    excerpt: 'Hoà âm phối khí là dịch vụ ít người hiểu rõ nhưng quyết định 70% chất lượng bài hát. Đây là bảng giá thực tế và những gì bạn nhận được.',
    content: `<h3>Hoà âm phối khí khác beat có sẵn như thế nào?</h3>
    <p><strong>Beat có sẵn</strong>: mua/thuê nhạc nền đã làm sẵn, nhanh và rẻ nhưng không có bản quyền riêng, không phù hợp tất cả giọng ca.</p>
    <p><strong>Hoà âm phối khí riêng</strong>: nhạc nền được sản xuất 100% theo bài hát của bạn, đúng key, đúng tempo, đúng phong cách — <strong>bản quyền thuộc về bạn hoàn toàn</strong>.</p>
    <h3>Bảng giá tham khảo 2026</h3>
    <ul>
      <li><strong>Gói Cơ bản:</strong> Từ 1.500.000₫ — Pop, Ballad, nhạc trẻ đơn giản</li>
      <li><strong>Gói Chuyên nghiệp:</strong> Từ 3.500.000₫ — Đa thể loại, nhạc cụ thật, revision không giới hạn</li>
      <li><strong>Gói Nhạc phim/TVC:</strong> Từ 5.000.000₫ — Orchestration đầy đủ, sync licensing</li>
    </ul>
    <h3>Thời gian hoàn thành</h3>
    <p>Phối khí cơ bản: 5-7 ngày. Phối khí phức tạp: 10-14 ngày. Có thể rút ngắn với phụ phí rush.</p>`,
    category: 'Bảng Giá',
    icon: 'fa-solid fa-tag',
    author: 'Nguyễn Xuân Kiệt',
    date: '25/04/2026',
    readTime: '5 phút đọc',
    thumb: '/images/blog-hoa-am.jpg',
    tags: ['Bảng Giá', 'Hoà Âm']
  },
  {
    title: 'Vocal Production Là Gì? Tại Sao Giọng Hát Cần Được "Sản Xuất"?',
    excerpt: 'Nhiều ca sĩ chỉ biết "thu âm" nhưng không hiểu Vocal Production — công đoạn biến giọng hát thô thành sản phẩm chuyên nghiệp.',
    content: `<h3>Vocal Production là gì?</h3>
    <p><strong>Vocal Production</strong> là quá trình làm việc với ca sĩ để khai thác tối đa hiệu suất giọng hát: từ hướng dẫn cảm xúc, kỹ thuật hát, chọn take tốt nhất, đến xử lý hậu kỳ (pitch correction, timing, layering).</p>
    <h3>Các bước trong Vocal Production</h3>
    <ol>
      <li><strong>Pre-production:</strong> Thảo luận concept, chọn key và tempo phù hợp</li>
      <li><strong>Vocal direction:</strong> Hướng dẫn cảm xúc, cách nhả chữ, breathing control</li>
      <li><strong>Recording:</strong> Thu nhiều take, chọn lọc phần hay nhất của mỗi đoạn</li>
      <li><strong>Comping:</strong> Ghép các take tốt nhất thành vocal track hoàn chỉnh</li>
      <li><strong>Pitch & timing:</strong> Chỉnh pitch nhẹ bằng Melodyne, timing bằng Flex</li>
      <li><strong>Layering:</strong> Thêm double track, harmonies để vocal dày và phong phú hơn</li>
    </ol>
    <h3>Tại sao cần Vocal Producer?</h3>
    <p>Kỹ sư âm thanh giỏi nghe được những gì bạn không nghe thấy — và biết cách khai thác tiềm năng giọng hát vượt mức bạn nghĩ mình có thể đạt được.</p>`,
    category: 'Kiến Thức',
    icon: 'fa-solid fa-graduation-cap',
    author: 'Nguyễn Xuân Kiệt',
    date: '22/04/2026',
    readTime: '6 phút đọc',
    thumb: '/images/blog-before-after.jpg',
    tags: ['Kiến Thức', 'Thu Âm']
  },
  {
    title: 'Phát Hành Nhạc Lên Spotify 2026 — Quy Trình Từ A Đến Z',
    excerpt: 'Từ mastering đến lúc track xuất hiện trên Spotify cần những bước gì? Hướng dẫn đầy đủ cho nghệ sĩ độc lập Việt Nam.',
    content: `<h3>Bước 1: Hoàn thiện âm thanh</h3>
    <p>Trước khi phát hành, bài hát cần được <strong>master chuẩn streaming</strong> — Loudness -14 LUFS, True Peak -1dBTP. Đây là tiêu chuẩn Spotify và Apple Music yêu cầu.</p>
    <h3>Bước 2: Chuẩn bị metadata</h3>
    <ul>
      <li>Tên bài hát, tên nghệ sĩ (chính xác, nhất quán)</li>
      <li>ISRC code (mã định danh bài hát quốc tế)</li>
      <li>Artwork 3000x3000px, JPG/PNG</li>
      <li>Thể loại, ngôn ngữ</li>
    </ul>
    <h3>Bước 3: Chọn distributor</h3>
    <p><strong>DistroKid</strong> ($22.99/năm, không giới hạn bài), <strong>TuneCore</strong> ($9.99/bài/năm), hoặc <strong>CD Baby</strong> (9% doanh thu). Chọn theo nhu cầu và ngân sách.</p>
    <h3>Bước 4: Submit và chờ</h3>
    <p>Thời gian duyệt thường 3-7 ngày làm việc. Nên submit trước ít nhất 2 tuần để có thể pitch cho Spotify Editorial Playlists.</p>
    <h3>XKProduction hỗ trợ toàn bộ quy trình này</h3>
    <p>Từ mastering chuẩn streaming đến hỗ trợ upload và kiểm tra chất lượng trước khi phát hành.</p>`,
    category: 'Kiến Thức',
    icon: 'fa-solid fa-graduation-cap',
    author: 'XKProduction',
    date: '18/04/2026',
    readTime: '7 phút đọc',
    thumb: '/images/blog-mix-master.jpg',
    tags: ['Kiến Thức', 'Mix & Master']
  },
  {
    title: 'EQ Là Gì? Hướng Dẫn Dùng EQ Cơ Bản Cho Người Mới Làm Nhạc',
    excerpt: 'EQ (Equalizer) là công cụ quan trọng nhất trong mixing. Hiểu EQ đúng cách giúp âm thanh của bạn sạch, rõ và chuyên nghiệp hơn.',
    content: `<h3>EQ là gì và tại sao quan trọng?</h3>
    <p><strong>EQ (Equalizer)</strong> là công cụ điều chỉnh âm lượng của từng dải tần số trong âm thanh. Mục tiêu: làm cho mỗi nhạc cụ và giọng hát "có chỗ" riêng trong bản mix, không chồng lấn nhau.</p>
    <h3>Các dải tần số cần biết</h3>
    <ul>
      <li><strong>Sub bass (20-60Hz):</strong> Cảm nhận được hơn là nghe — kick drum, bass guitar</li>
      <li><strong>Bass (60-250Hz):</strong> Độ ấm, "body" của âm thanh</li>
      <li><strong>Midrange (250Hz-4kHz):</strong> Vùng quan trọng nhất — vocal, guitar, piano sống ở đây</li>
      <li><strong>Presence (4-8kHz):</strong> Độ sắc nét, rõ ràng của vocal và nhạc cụ</li>
      <li><strong>Air (8kHz+):</strong> Độ "không khí", sáng và mở của bản mix</li>
    </ul>
    <h3>Lỗi EQ phổ biến nhất của người mới</h3>
    <p>Tăng quá nhiều thay vì cắt bớt tần số xấu. Nguyên tắc vàng: <strong>"Cut first, boost later"</strong> — xác định tần số gây vấn đề và cắt bớt trước khi tăng thứ gì đó.</p>`,
    category: 'Kiến Thức',
    icon: 'fa-solid fa-graduation-cap',
    author: 'Nguyễn Xuân Kiệt',
    date: '12/04/2026',
    readTime: '5 phút đọc',
    thumb: '/images/blog-mix-master.jpg',
    tags: ['Kiến Thức', 'Mix & Master']
  }
,

  {
    title: 'Compression Là Gì? Bí Quyết Dùng Compressor Cho Vocal Chuyên Nghiệp',
    excerpt: 'Compressor là công cụ mixing bí ẩn nhất với người mới. Hiểu đúng về compression giúp vocal của bạn đều đặn, khỏe và nghe như radio.',
    content: `<h3>Compression là gì?</h3>
    <p><strong>Compression</strong> là quá trình giảm dải động (dynamic range) của âm thanh — làm cho phần to bớt to và phần nhỏ to lên, tạo âm thanh đều đặn và ổn định hơn.</p>
    <h3>Các thông số cần hiểu</h3>
    <ul>
      <li><strong>Threshold:</strong> Mức âm lượng mà compressor bắt đầu hoạt động (VD: -20dB)</li>
      <li><strong>Ratio:</strong> Tỷ lệ nén (VD: 4:1 nghĩa là âm lượng vượt threshold sẽ bị nén 4 lần)</li>
      <li><strong>Attack:</strong> Tốc độ compressor phản ứng — nhanh sẽ bắt transient, chậm để transient qua</li>
      <li><strong>Release:</strong> Thời gian compressor nhả ra sau khi âm thanh xuống dưới threshold</li>
      <li><strong>Makeup Gain:</strong> Tăng volume sau khi nén để bù lại độ to đã mất</li>
    </ul>
    <h3>Setting cơ bản cho vocal</h3>
    <p>Threshold: -18dB | Ratio: 3:1 đến 4:1 | Attack: 10-20ms | Release: 50-100ms | Gain Reduction: 3-6dB. Đây là điểm khởi đầu an toàn, sau đó điều chỉnh theo tai nghe.</p>`,
    category: 'Kiến Thức',
    icon: 'fa-solid fa-graduation-cap',
    author: 'Nguyễn Xuân Kiệt',
    date: '08/04/2026',
    readTime: '6 phút đọc',
    thumb: '/images/blog-mix-master.jpg',
    tags: ['Kiến Thức', 'Mix & Master']
  },
  {
    title: 'Studio Âm Nhạc Tại Nhà — Cần Bao Nhiêu Tiền Để Setup Đúng Cách?',
    excerpt: 'Home studio từ 5 triệu đến 50 triệu — mỗi mức ngân sách có thể làm được gì? Hướng dẫn thực tế cho người mới bắt đầu.',
    content: `<h3>Tại sao cần home studio?</h3>
    <p>Home studio cho phép bạn <strong>demo ý tưởng nhanh, luyện tập thu âm</strong> và tiết kiệm chi phí phòng thu cho các bước sơ khai. Tuy nhiên, để ra sản phẩm phát hành, vẫn cần phòng thu chuyên nghiệp.</p>
    <h3>Budget 5-10 triệu — Starter Setup</h3>
    <ul>
      <li>Audio Interface: Focusrite Scarlett Solo (~2.5tr)</li>
      <li>Micro condenser: Audio-Technica AT2020 (~2tr)</li>
      <li>Tai nghe monitoring: Audio-Technica M20x (~1.5tr)</li>
      <li>Pop filter + mic stand (~500k)</li>
    </ul>
    <h3>Budget 15-25 triệu — Pro Home Setup</h3>
    <ul>
      <li>Audio Interface: Universal Audio Volt 276 (~5tr)</li>
      <li>Micro: Rode NT1 (~4.5tr)</li>
      <li>Monitor speakers: Yamaha HS5 (~7tr/cặp)</li>
      <li>Acoustic treatment cơ bản (~3-5tr)</li>
    </ul>
    <h3>Quan trọng nhất: Acoustic Treatment</h3>
    <p>Phòng tốt quan trọng hơn micro đắt tiền. Phòng cách âm kém sẽ phá hỏng mọi thiết bị tốt. Hãy đầu tư vào foam tiêu âm, bass trap trước khi nâng cấp gear.</p>`,
    category: 'Kiến Thức',
    icon: 'fa-solid fa-graduation-cap',
    author: 'Nguyễn Xuân Kiệt',
    date: '03/04/2026',
    readTime: '7 phút đọc',
    thumb: '/images/blog-phong-thu.jpg',
    tags: ['Kiến Thức', 'Thu Âm']
  },
  {
    title: 'Reverb & Delay — Cách Tạo Không Gian Và Chiều Sâu Cho Bản Mix',
    excerpt: 'Reverb và Delay là hai effect tạo nên "không gian" âm nhạc. Dùng đúng cách thì hay, dùng sai thì bản mix nghe như trong hang động.',
    content: `<h3>Reverb là gì?</h3>
    <p><strong>Reverb (âm vang)</strong> mô phỏng âm thanh phản xạ trong không gian — phòng nhỏ, sảnh lớn, nhà thờ, không gian ngoài trời. Reverb tạo cảm giác "ở đâu" cho âm thanh.</p>
    <h3>Delay là gì?</h3>
    <p><strong>Delay (âm vọng)</strong> là bản sao của âm thanh gốc được phát lại sau một khoảng thời gian nhất định. Stered delay phổ biến nhất trong nhạc pop và rock.</p>
    <h3>Tips dùng Reverb cho vocal</h3>
    <ul>
      <li>Dùng Reverb trên Send/Return (không insert trực tiếp) để kiểm soát tốt hơn</li>
      <li>Pre-delay 20-30ms giúp vocal nghe rõ ràng trước khi reverb vào</li>
      <li>High-pass filter reverb tail ở 200-300Hz để tránh muddy</li>
      <li>Decay time: 0.8-1.5s cho nhạc pop, 2-3s cho ballad</li>
    </ul>
    <h3>Lỗi phổ biến nhất</h3>
    <p>Dùng quá nhiều reverb làm vocal "chìm" trong mix. Nguyên tắc: nếu cảm giác được reverb, hãy giảm bớt đi 30%.</p>`,
    category: 'Kiến Thức',
    icon: 'fa-solid fa-graduation-cap',
    author: 'Nguyễn Xuân Kiệt',
    date: '01/04/2026',
    readTime: '5 phút đọc',
    thumb: '/images/blog-mix-master.jpg',
    tags: ['Kiến Thức', 'Mix & Master']
  },
  {
    title: 'Làm MV Ca Nhạc Cần Bao Nhiêu Tiền? Bảng Giá & Quy Trình 2026',
    excerpt: 'MV từ 5 triệu đến 500 triệu — mỗi mức có gì khác nhau? Đây là hướng dẫn thực tế để bạn lên ngân sách đúng.',
    content: `<h3>Các yếu tố quyết định giá MV</h3>
    <ul>
      <li><strong>Concept & kịch bản:</strong> MV story phức tạp cần nhiều ngày quay, nhiều bối cảnh</li>
      <li><strong>Số lượng máy quay:</strong> 1 máy vs 3-5 máy khác nhau hoàn toàn về góc độ và editing</li>
      <li><strong>Bối cảnh & props:</strong> Studio, ngoại cảnh, thuê địa điểm đặc biệt</li>
      <li><strong>Ekip:</strong> Đạo diễn, quay phim, ánh sáng, makeup, phục trang</li>
      <li><strong>Post-production:</strong> Color grading, VFX, motion graphics</li>
    </ul>
    <h3>Bảng giá tham khảo</h3>
    <ul>
      <li><strong>MV Cơ bản (1-2 ngày quay):</strong> Từ 5.000.000₫ — 1-2 bối cảnh, ekip nhỏ</li>
      <li><strong>MV Chuyên nghiệp:</strong> Từ 15.000.000₫ — concept rõ, color grading đẹp</li>
      <li><strong>MV Story/Cinematic:</strong> Từ 35.000.000₫ — nhiều bối cảnh, diễn xuất, VFX</li>
    </ul>
    <h3>XKProduction cung cấp dịch vụ MV</h3>
    <p>Từ kịch bản, quay phim đến hậu kỳ. Tư vấn miễn phí để xác định ngân sách phù hợp với concept của bạn.</p>`,
    category: 'Bảng Giá',
    icon: 'fa-solid fa-tag',
    author: 'XKProduction',
    date: '28/03/2026',
    readTime: '5 phút đọc',
    thumb: '/images/blog-thu-am-gia.jpg',
    tags: ['Bảng Giá', 'Kiến Thức']
  },
  {
    title: 'Sự Khác Biệt Giữa Pop, Ballad, R&B và EDM — Kỹ Thuật Sản Xuất Mỗi Thể Loại',
    excerpt: 'Mỗi thể loại âm nhạc có ngôn ngữ sản xuất riêng. Hiểu sự khác biệt giúp bạn giao tiếp với producer và kỹ sư hiệu quả hơn.',
    content: `<h3>Pop — Âm nhạc của đại chúng</h3>
    <p>Pop hiện đại (2020s) đặc trưng bởi: vocal melody rõ ràng, chorus bùng nổ, sản xuất layer dày. Drums thường tight và punchy, bass synth nổi bật. Loudness cao (~-9 LUFS integrated).</p>
    <h3>Ballad — Cảm xúc là vũ khí</h3>
    <p>Ballad Việt đặc trưng: vocal là trung tâm tuyệt đối, phối khí thường strings + piano, dynamic range rộng (phần verse nhẹ nhàng, chorus bùng cháy). Reverb nhiều hơn, không gian rộng hơn.</p>
    <h3>R&B/Soul — Groove và cảm xúc sâu</h3>
    <p>R&B hiện đại: vocal melismatic (nhiều note trên một âm tiết), bass line groove nổi bật, drums lazy/swung. Layers harmony vocal phức tạp. Rất coi trọng "pocket" — cảm giác nhịp điệu.</p>
    <h3>EDM — Kiến trúc năng lượng</h3>
    <p>EDM được xây dựng quanh cấu trúc build-up/drop. Kick drum là nền tảng, synth lead là linh hồn. Sidechain compression tạo "pumping" effect đặc trưng. Master loudness rất cao.</p>`,
    category: 'Kiến Thức',
    icon: 'fa-solid fa-graduation-cap',
    author: 'Nguyễn Xuân Kiệt',
    date: '25/03/2026',
    readTime: '6 phút đọc',
    thumb: '/images/blog-hoa-am.jpg',
    tags: ['Kiến Thức', 'Hoà Âm']
  }
,
  {
    title: 'Before & After: Vocal Raw vs Sau Mix Master',
    excerpt: 'Nghe sự khác biệt rõ rệt giữa giọng hát raw chưa xử lý và sau khi được mix master chuyên nghiệp tại XKProduction.',
    content: `<h3>Tại sao mix master quan trọng?</h3>
    <p>Nhiều nghệ sĩ mới thường bỏ qua bước <strong>mixing & mastering</strong>, dẫn đến bản nhạc phát hành nghe thiếu chuyên nghiệp, vocal bị chìm hoặc lấn át nhạc nền.</p>
    <h3>Những thay đổi khi mix master</h3>
    <ul>
      <li><strong>EQ:</strong> Loại bỏ tần số thừa, tăng độ sáng cho vocal</li>
      <li><strong>Compression:</strong> Cân bằng âm lượng, vocal đều đặn hơn</li>
      <li><strong>De-essing:</strong> Giảm âm "s" chói tai</li>
      <li><strong>Reverb & Delay:</strong> Tạo không gian, chiều sâu cho vocal</li>
      <li><strong>Mastering:</strong> Đưa âm lượng và clarity lên chuẩn phát hành</li>
    </ul>
    <p>Hãy liên hệ XKProduction để nghe demo before/after thực tế từ các dự án đã hoàn thành!</p>`,
    category: 'Before & After',
    icon: 'fa-solid fa-wand-magic-sparkles',
    author: 'XKProduction',
    date: '05/04/2026',
    readTime: '2 phút đọc',
    thumb: '/images/blog-before-after.jpg',
    tags: ['Before & After', 'Mix & Master']
  }
]

const tags = computed(() => ['Tất cả', ...new Set(blogPosts.flatMap(p => p.tags))])

const filteredPosts = computed(() => {
  if (activeTag.value === 'Tất cả') return blogPosts
  return blogPosts.filter(p => p.tags.includes(activeTag.value))
})
</script>

<style scoped>
/* ===== PAGE HERO ===== */
.page-hero {
  padding-top: 140px;
  padding-bottom: 4rem;
  background: linear-gradient(135deg, #06080f 0%, #0d1117 100%);
  text-align: center;
}
.page-hero h1 { font-size: 2.5rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem; }
.page-hero-sub { font-size: 1.05rem; color: var(--text-light); max-width: 680px; margin: 0 auto; line-height: 1.7; }

/* ===== BLOG SECTION ===== */
.blog-section { padding: 4rem 0 5rem; }

/* Filters */
.blog-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
  justify-content: center;
}
.filter-tag {
  padding: 0.5rem 1.1rem;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.1);
  background: transparent;
  color: var(--text-light);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}
.filter-tag:hover,
.filter-tag.active {
  background: var(--primary);
  color: var(--bg-dark);
  border-color: var(--primary);
  box-shadow: 0 0 18px rgba(26,140,255,0.25);
}

/* Blog Grid */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.75rem;
}

/* Blog Card */
.blog-card {
  background: var(--bg-surface);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
}
.blog-card:hover {
  transform: translateY(-5px);
  border-color: rgba(26,140,255,0.2);
  box-shadow: 0 16px 48px rgba(0,0,0,0.35), 0 0 30px rgba(26,140,255,0.08);
}

.blog-card-thumb {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}
.blog-card-thumb img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.23,1,0.32,1);
}
.blog-card:hover .blog-card-thumb img {
  transform: scale(1.08);
}
.blog-card-category {
  position: absolute;
  top: 1rem; left: 1rem;
  display: flex; align-items: center; gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 700;
  color: #5bbfff;
  letter-spacing: 0.5px;
}

.blog-card-body {
  padding: 1.5rem;
}
.blog-card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.65rem;
  line-height: 1.4;
  transition: color 0.25s;
}
.blog-card:hover .blog-card-title {
  color: #5bbfff;
}
.blog-card-excerpt {
  font-size: 0.88rem;
  color: var(--text-light);
  line-height: 1.65;
  margin-bottom: 1rem;
}
.blog-card-meta {
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
}
.blog-card-meta span {
  display: flex; align-items: center; gap: 0.35rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 600;
}
.blog-card-meta i {
  color: var(--primary);
  font-size: 0.7rem;
}

/* Expandable Content */
.blog-card-content {
  padding: 0 1.5rem 1.5rem;
}
.content-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(26,140,255,0.25), transparent);
  margin-bottom: 1.5rem;
}
.blog-full-content {
  color: var(--text-light);
  font-size: 0.92rem;
  line-height: 1.8;
}
.blog-full-content h3 {
  color: var(--text-main);
  font-size: 1.05rem;
  margin: 1.5rem 0 0.75rem;
  font-weight: 700;
}
.blog-full-content h3:first-child {
  margin-top: 0;
}
.blog-full-content p {
  margin-bottom: 0.8rem;
}
.blog-full-content ul,
.blog-full-content ol {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
.blog-full-content li {
  margin-bottom: 0.4rem;
  line-height: 1.7;
}
.blog-full-content strong {
  color: var(--text-main);
}
.content-cta {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.05);
}

/* Expand Transition */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

/* CTA Section */
.blog-cta-section {
  margin-top: 4rem;
}
.blog-cta-card {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--bg-surface);
  border: 1px solid rgba(26,140,255,0.1);
  border-radius: 16px;
}
.blog-cta-card i {
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: 1.25rem;
  display: block;
  filter: drop-shadow(0 0 16px rgba(26,140,255,0.5));
}
.blog-cta-card h3 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 1rem;
}
.blog-cta-card p {
  color: var(--text-light);
  max-width: 520px;
  margin: 0 auto 2rem;
  line-height: 1.7;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .page-hero h1 { font-size: 1.9rem; }
  .blog-grid { grid-template-columns: 1fr; }
  .blog-cta-card h3 { font-size: 1.4rem; }
}
</style>
