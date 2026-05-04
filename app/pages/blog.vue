<template>
  <div>
    <section class="page-hero">
      <div class="max-width">
        <h1>Blog & Kiến Thức Âm Nhạc</h1>
        <p class="page-hero-sub">Chia sẻ kinh nghiệm, mẹo thu âm, mix master và kiến thức sản xuất âm nhạc từ đội ngũ XKStudio</p>
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
    'description': 'Tổng hợp bảng giá thu âm bài hát mới nhất. Thu âm từ 350.000₫ tại XKStudio Bình Phước.',
    'image': 'https://xkproduction.com/images/blog-thu-am-gia.jpg',
    'author': { '@type': 'Organization', 'name': 'XKStudio', 'url': 'https://xkproduction.com' },
    'publisher': {
      '@type': 'Organization',
      'name': 'XKStudio',
      'logo': { '@type': 'ImageObject', 'url': 'https://xkproduction.com/images/xk-logo-new.jpg' }
    },
    'datePublished': '2026-04-28',
    'dateModified': '2026-04-28',
    'url': 'https://xkproduction.com/blog',
    'keywords': 'thu âm bài hát, giá thu âm, bảng giá thu âm, XKStudio Bình Phước'
  },
  {
    '@type': 'BlogPosting',
    'headline': 'Mix Master Là Gì? Hướng Dẫn Từ A-Z Cho Người Mới',
    'description': 'Hiểu rõ quy trình mixing và mastering — hai bước quan trọng nhất quyết định chất lượng bản nhạc.',
    'image': 'https://xkproduction.com/images/blog-mix-master.jpg',
    'author': { '@type': 'Person', 'name': 'Nguyễn Xuân Kiệt', 'url': 'https://xkproduction.com/about' },
    'publisher': {
      '@type': 'Organization',
      'name': 'XKStudio',
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
    'description': 'Tìm hiểu quy trình hoà âm phối khí online chuyên nghiệp và bảng giá chi tiết tại XKStudio.',
    'image': 'https://xkproduction.com/images/blog-hoa-am.jpg',
    'author': { '@type': 'Organization', 'name': 'XKStudio', 'url': 'https://xkproduction.com' },
    'publisher': {
      '@type': 'Organization',
      'name': 'XKStudio',
      'logo': { '@type': 'ImageObject', 'url': 'https://xkproduction.com/images/xk-logo-new.jpg' }
    },
    'datePublished': '2026-04-15',
    'dateModified': '2026-04-15',
    'url': 'https://xkproduction.com/blog',
    'keywords': 'hoà âm phối khí, hoà âm phối khí online, phối nhạc online, nhạc nền bài hát'
  },
  {
    '@type': 'BlogPosting',
    'headline': 'Phòng Thu Âm Bình Phước — Tại Sao Chọn XKStudio?',
    'description': 'Khám phá lý do XKStudio trở thành phòng thu âm được nhiều nghệ sĩ tin tưởng nhất tại Bình Phước.',
    'image': 'https://xkproduction.com/images/blog-phong-thu.jpg',
    'author': { '@type': 'Person', 'name': 'Nguyễn Xuân Kiệt', 'url': 'https://xkproduction.com/about' },
    'publisher': {
      '@type': 'Organization',
      'name': 'XKStudio',
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
    <h3>Bảng giá tham khảo tại XKStudio</h3>
    <ul>
      <li><strong>Gói Cơ Bản:</strong> Từ 350.000₫ — thu âm 1-2 tiếng, chỉnh sửa cơ bản, xuất file WAV/MP3</li>
      <li><strong>Gói Nâng Cao:</strong> Từ 550.000₫ — thu âm 2-3 tiếng, vocal production đầy đủ</li>
      <li><strong>Gói Pro:</strong> Từ 1.000.000₫ — thu âm không giới hạn session, vocal coaching</li>
      <li><strong>Gói Cao Cấp:</strong> Từ 1.800.000₫ — tất cả bao gồm, revision không giới hạn</li>
    </ul>
    <h3>Tại sao nên chọn XKStudio?</h3>
    <p>XKStudio có hơn <strong>7 năm kinh nghiệm</strong>, đã hoàn thành <strong>2000+ dự án</strong>. Chúng tôi cam kết chất lượng âm thanh chuẩn quốc tế với giá cả phải chăng nhất khu vực Bình Phước.</p>`,
    category: 'Bảng Giá',
    icon: 'fa-solid fa-tag',
    author: 'XKStudio',
    date: '28/04/2026',
    readTime: '3 phút đọc',
    thumb: '/images/blog-thu-am-gia.jpg',
    tags: ['Bảng Giá', 'Thu Âm']
  },
  {
    title: 'Phòng Thu Âm Bình Phước — Tại Sao Chọn XKStudio?',
    excerpt: 'Khám phá lý do XKStudio trở thành phòng thu âm được nhiều nghệ sĩ tin tưởng nhất tại Bình Phước với chất lượng chuẩn quốc tế.',
    content: `<h3>XKStudio — Phòng thu âm chuyên nghiệp tại Bình Phước</h3>
    <p>Tọa lạc tại QL14 km25, xã Nghĩa Trung, Huyện Bù Đăng, <strong>XKStudio</strong> là phòng thu âm chuyên nghiệp hàng đầu tại Bình Phước. Với hơn 7 năm kinh nghiệm và 2000+ dự án hoàn thiện, chúng tôi tự hào mang đến dịch vụ thu âm chất lượng chuẩn quốc tế.</p>
    <h3>Điểm khác biệt</h3>
    <ul>
      <li><strong>Founder có 7+ năm kinh nghiệm</strong> trong ngành sản xuất âm nhạc</li>
      <li><strong>Thiết bị chuyên nghiệp:</strong> Micro condenser, preamp, audio interface chất lượng cao</li>
      <li><strong>Không gian yên tĩnh:</strong> Phòng thu được cách âm theo tiêu chuẩn quốc tế</li>
      <li><strong>Giá cả hợp lý:</strong> Tiết kiệm hơn phòng thu tại TP.HCM nhưng chất lượng tương đương</li>
    </ul>
    <h3>Dịch vụ tại XKStudio</h3>
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
    <h3>Giá mix master tại XKStudio</h3>
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
    excerpt: 'Tìm hiểu quy trình hoà âm phối khí online chuyên nghiệp và bảng giá chi tiết tại XKStudio.',
    content: `<h3>Hoà âm phối khí là gì?</h3>
    <p><strong>Hoà âm phối khí</strong> là quá trình biên soạn và sắp xếp các nhạc cụ, giai điệu phụ hoạ cho một bài hát. Đây là bước đưa bài hát từ giai điệu đơn giản thành một tác phẩm âm nhạc hoàn chỉnh.</p>
    <h3>Quy trình hoà âm phối khí online tại XKStudio</h3>
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
    author: 'XKStudio',
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
    <p>Dù thu tại nhà, bạn vẫn nên gửi file raw vocal đến phòng thu chuyên nghiệp như <strong>XKStudio</strong> để mixing & mastering, đảm bảo chất lượng phát hành.</p>`,
    category: 'Mẹo Hay',
    icon: 'fa-solid fa-lightbulb',
    author: 'Nguyễn Xuân Kiệt',
    date: '10/04/2026',
    readTime: '3 phút đọc',
    thumb: '/images/blog-meo-thu-am.jpg',
    tags: ['Mẹo Hay', 'Thu Âm']
  },
  {
    title: 'Before & After: Vocal Raw vs Sau Mix Master',
    excerpt: 'Nghe sự khác biệt rõ rệt giữa giọng hát raw chưa xử lý và sau khi được mix master chuyên nghiệp tại XKStudio.',
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
    <p>Hãy liên hệ XKStudio để nghe demo before/after thực tế từ các dự án đã hoàn thành!</p>`,
    category: 'Before & After',
    icon: 'fa-solid fa-wand-magic-sparkles',
    author: 'XKStudio',
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
