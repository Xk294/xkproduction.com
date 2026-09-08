<template>
  <div class="product-detail-page">
    <!-- INTERACTIVE AMBIENT GLOW BACKDROP -->
    <div class="immersive-ambient-bg" aria-hidden="true">
      <div class="glow-spot spotlight-1"></div>
      <div class="glow-spot spotlight-2"></div>
    </div>

    <template v-if="project">
      <!-- HERO BANNER -->
      <section class="detail-hero">
        <div class="hero-cover-wrap">
          <img v-if="project.thumb" :src="project.thumb" :alt="project.title" class="hero-cover-img" />
          <div class="cover-gradient-overlay"></div>
        </div>
        
        <div class="max-width hero-content-overlay">
          <NuxtLink to="/products" class="back-link">
            <i class="fa-solid fa-arrow-left"></i> Quay lại thư viện sản phẩm
          </NuxtLink>
          
          <div class="header-metadata">
            <span class="meta-tag">{{ project.category }}</span>
            <span class="meta-year" v-if="project.year">{{ project.year }}</span>
          </div>
          
          <h1 class="project-title">{{ project.title }}</h1>
          <p class="project-subtitle">Hợp tác cùng nghệ sĩ <strong class="artist-name">{{ project.artist }}</strong></p>
        </div>
      </section>

      <!-- CASE STUDY BODY -->
      <section class="case-study-section">
        <div class="max-width case-study-layout">
          <!-- Main storytelling text -->
          <main class="storytelling-main">
            <!-- YouTube Embed Video Card -->
            <div v-if="project.embedId" class="embed-video-card glass-card">
              <div class="video-ratio-wrapper">
                <iframe
                  :src="'https://www.youtube.com/embed/' + project.embedId + '?rel=0'"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowfullscreen
                  class="video-iframe"
                  loading="lazy"
                  :title="project.title"
                ></iframe>
              </div>
            </div>

            <!-- Tik Tok Video Link Placeholder if no embedId but has link -->
            <div v-else-if="project.link" class="tiktok-link-card glass-card text-center">
              <i class="fa-brands fa-tiktok fa-3x tiktok-icon"></i>
              <h3>Dự án được phát hành trên TikTok</h3>
              <p>Xem toàn bộ quá trình sản xuất thực tế và tương tác của khán giả trực tiếp tại kênh TikTok.</p>
              <a :href="project.link" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                <span>Xem trên TikTok</span> <i class="fa-solid fa-arrow-up-right-from-square" style="margin-left:0.5rem"></i>
              </a>
            </div>

            <div class="story-blocks">
              <div class="story-block">
                <div class="block-indicator"></div>
                <h2>Bối cảnh dự án</h2>
                <p>{{ project.storyDetails.context }}</p>
              </div>

              <div class="story-block">
                <div class="block-indicator"></div>
                <h2>Mục tiêu nghệ thuật</h2>
                <p>{{ project.storyDetails.goal }}</p>
              </div>

              <div class="story-block">
                <div class="block-indicator"></div>
                <h2>Cách thức thực hiện</h2>
                <p>{{ project.storyDetails.process }}</p>
              </div>

              <div class="story-block">
                <div class="block-indicator"></div>
                <h2>Kết quả & Giá trị</h2>
                <p>{{ project.storyDetails.outcome }}</p>
              </div>
            </div>
          </main>

          <!-- Sidebar details -->
          <aside class="storytelling-sidebar">
            <div class="sidebar-card glass-card">
              <h3>Thông tin dự án</h3>
              
              <div class="info-item">
                <span class="info-label">Nghệ sĩ</span>
                <span class="info-val">{{ project.artist }}</span>
              </div>
              <div class="info-item" v-if="project.year">
                <span class="info-label">Năm phát hành</span>
                <span class="info-val">{{ project.year }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Hạng mục</span>
                <span class="info-val">{{ project.category }}</span>
              </div>

              <div class="sidebar-divider"></div>
              
              <h3>Đội ngũ sản xuất</h3>
              <div v-for="c in project.credits" :key="c.role" class="credit-item">
                <span class="credit-role-label">{{ c.role }}</span>
                <strong class="credit-name-val">{{ c.name }}</strong>
              </div>
            </div>

            <div class="sidebar-card glass-card text-center advisory-box">
              <i class="fa-solid fa-microphone-lines advisory-icon"></i>
              <h3>Khởi động dự án của riêng bạn</h3>
              <p>Bạn đang ấp ủ một giai điệu hay muốn hoàn thiện bản phối? Hãy liên hệ ngay với chúng tôi.</p>
              <NuxtLink :to="getContactLink(project.category)" class="btn btn-primary btn-full">Tư vấn miễn phí</NuxtLink>
            </div>
          </aside>
        </div>
      </section>
    </template>

    <!-- NOT FOUND STATE -->
    <section v-else class="not-found-section">
      <div class="max-width text-center">
        <span class="badge-pill orange">404 Error</span>
        <h1>Không tìm thấy dự án</h1>
        <p>Dự án này có thể không tồn tại hoặc đã được cập nhật đường dẫn mới.</p>
        <NuxtLink to="/products" class="btn btn-primary">Quay lại thư viện</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const id = computed(() => route.params.id as string)

const projectsData: Record<string, any> = {
  'nhat-ki-cua-me': {
    id: 'nhat-ki-cua-me',
    title: 'Nhật Kí Của Mẹ',
    artist: 'Mai Linh (Cover)',
    category: 'Hoà âm phối khí',
    year: '2025',
    link: 'https://www.youtube.com/watch?v=F5tPTow1xkE',
    thumb: 'https://img.youtube.com/vi/F5tPTow1xkE/hqdefault.jpg',
    embedId: 'F5tPTow1xkE',
    credits: [
      { role: 'Sáng tác', name: 'Nguyễn Văn Chung' },
      { role: 'Thể hiện', name: 'Mai Linh' },
      { role: 'Hoà âm - Phối khí', name: 'Xkprod ft LacAnh' },
      { role: 'Thu âm (Rec)', name: 'XKProduction' },
      { role: 'Mixing & Mastering', name: 'Xkprod ft LacAnh' }
    ],
    storyDetails: {
      context: 'Ca khúc bất hủ "Nhật Kí Của Mẹ" của nhạc sĩ Nguyễn Văn Chung là tượng đài âm nhạc thiêng liêng về tình mẫu tử. Nữ ca sĩ Mai Linh cùng XKProduction mong muốn tái hiện tác phẩm theo một góc nhìn mộc mạc, gần gũi và đong đầy xúc cảm chân phương.',
      goal: 'Thiết kế bản phối Grand Piano kết hợp dàn nhạc dây (Strings) da diết, thu âm vocal đạt độ chi tiết cao để từng nhịp thở, từng nốt ngân đều chuyên chở trọn vẹn tình mẹ.',
      process: 'XKProduction ft LacAnh khởi tạo bản phối 3/4 ở tempo 82 BPM, lấy tiếng đàn Piano mộc làm nền tảng dẫn lối. Quá trình thu âm vocal của Mai Linh được chăm chút tỉ mỉ tại phòng thu, giữ trọn những rung cảm tự nhiên và hạn chế lạm dụng tuning. Khâu mix & master tối ưu hóa không gian 3D và chuẩn phát hành số YouTube/Spotify.',
      outcome: 'Bản cover chạm đến trái tim của đông đảo thính giả, trở thành một minh chứng tiêu biểu cho năng lực sản xuất âm nhạc trọn gói giàu cảm xúc tại XKProduction.'
    }
  },
  'love-du-phong': {
    id: 'love-du-phong',
    title: 'Love Dự Phòng',
    artist: 'Howl',
    category: 'Hoà âm phối khí',
    year: '2025',
    link: 'https://www.youtube.com/watch?v=OCnKTCslJUU',
    thumb: 'https://img.youtube.com/vi/OCnKTCslJUU/hqdefault.jpg',
    embedId: 'OCnKTCslJUU',
    credits: [
      { role: 'Music Producer', name: 'Nguyễn Xuân Kiệt' },
      { role: 'Mixing & Mastering', name: 'Nguyễn Xuân Kiệt' }
    ],
    storyDetails: {
      context: 'Howl mong muốn tạo ra một bản cover mộc mạc nhưng sâu lắng cho ca khúc "Love Dự Phòng", thoát khỏi các cấu trúc phối xập xình quen thuộc trên thị trường để chạm đến góc sâu nhất trong tâm sự của người nghe.',
      goal: 'Xây dựng một không gian Acoustic tinh tế, làm nổi bật chất giọng ấm áp, tự sự của ca sĩ trên nền các nhạc cụ mộc mạc và chân thực nhất.',
      process: 'XKProduction đã phối lại toàn bộ bài hát theo nhịp thở của Acoustic tự do. Điểm nhấn là tiếng Guitar nylon đầm ấm kết hợp tiếng Piano lơ lửng và dải strings mỏng mở rộng không gian. Vocal được thu âm tỉ mỉ và Vocal production được căn chỉnh tinh tế để giữ trọn vẹn cảm xúc nguyên bản.',
      outcome: 'Bản phối nhận được sự đón nhận nồng nhiệt từ khán giả, chứng minh âm nhạc mộc mạc, ít nhạc cụ nhưng giàu tính sắp đặt không gian vẫn luôn tạo ra sức nặng cảm xúc vô cùng lớn.'
    }
  },
  'chang-muon-noi-nhieu-loi': {
    id: 'chang-muon-noi-nhieu-loi',
    title: 'Chẳng Muốn Nói Nhiều Lời',
    artist: 'Revan',
    category: 'Mix & Master',
    year: '2025',
    link: 'https://www.youtube.com/watch?v=IxlFvQQP_4c',
    thumb: 'https://img.youtube.com/vi/IxlFvQQP_4c/hqdefault.jpg',
    embedId: 'IxlFvQQP_4c',
    credits: [
      { role: 'Mixing & Mastering', name: 'Nguyễn Xuân Kiệt' },
      { role: 'Guitarist', name: 'Nguyễn Xuân Kiệt' }
    ],
    storyDetails: {
      context: 'Revan gửi đến XKProduction bản demo R&B hiện đại. Yêu cầu đặt ra là làm thế nào để bản mix nghe "đắt tiền", dày dặn, sắc nét và có chiều sâu không gian đa chiều, đáp ứng tiêu chuẩn phát hành thương mại số.',
      goal: 'Mixing & Mastering multi-track chi tiết, tách bạch nhạc cụ, định hình vocal ấm áp và tạo hiệu ứng không gian 3D mượt mà cho bài hát R&B.',
      process: 'Chúng tôi áp dụng quy trình xử lý dynamics kỹ lưỡng cho từng track vocal chính và backing vocals. Sử dụng EQ và Compressor phần cứng chuyên dụng để tạo độ ấm tự nhiên, sau đó dải tần được tối ưu hóa ở khâu mastering để đạt Loudness chuẩn phát hành Spotify/Apple Music mà không làm mất đi lực bass của con beat R&B.',
      outcome: 'Bản phối sắc nét, giọng hát nổi bật và rõ ràng trên mọi thiết bị nghe nhạc từ tai nghe phổ thông đến hệ thống loa lớn.'
    }
  },
  'ly-do-bat-dau': {
    id: 'ly-do-bat-dau',
    title: 'Lý Do Bắt Đầu',
    artist: 'Revan',
    category: 'Hoà âm phối khí',
    year: '2025',
    link: 'https://www.youtube.com/watch?v=vzfr1ddayYY',
    thumb: 'https://img.youtube.com/vi/vzfr1ddayYY/hqdefault.jpg',
    embedId: 'vzfr1ddayYY',
    credits: [
      { role: 'Music Producer', name: 'Nguyễn Xuân Kiệt' },
      { role: 'Mixing & Mastering', name: 'Nguyễn Xuân Kiệt' }
    ],
    storyDetails: {
      context: 'Dự án Rap Hip-hop đầy nội lực kể về hành trình và lý do Revan theo đuổi đam mê. Con beat đòi hỏi độ nảy lớn, âm bass đầm ấm và năng lượng tràn trề để làm bệ phóng cho phần rap gai góc.',
      goal: 'Sản xuất beat phối khí Hip-hop/Rap mang chất liệu hiện đại, bassline căng tràn năng lượng và dải âm trường rộng lớn.',
      process: 'XKProduction thiết kế một bassline dày ấm kết hợp các âm synth điện tử bay bổng và nhịp drum đập dứt khoát. Vocal được đẩy lên phía trước bản phối kết hợp các hiệu ứng double, ad-libs được panning rộng để bao trùm người nghe.',
      outcome: 'Một bản track Rap Hip-hop bùng nổ, có chiều sâu câu chuyện và mang đậm dấu ấn cá nhân của nghệ sĩ.'
    }
  },
  'kiep-sau': {
    id: 'kiep-sau',
    title: 'Kiếp Sau',
    artist: 'Phương Thanh Tuyền (Cover)',
    category: 'Thu âm',
    year: '2024',
    link: 'https://www.youtube.com/watch?v=z4GB-X1OiPg',
    thumb: 'https://img.youtube.com/vi/z4GB-X1OiPg/hqdefault.jpg',
    embedId: 'z4GB-X1OiPg',
    credits: [
      { role: 'Recording / Mixing / Master', name: 'Nguyễn Xuân Kiệt' }
    ],
    storyDetails: {
      context: 'Dự án thu âm cover một bản tình ca đầy hoài niệm của nữ ca sĩ Phương Thanh Tuyền. Yêu cầu là tái hiện giọng hát ấm áp, sạch sẽ nhưng phải giữ được sự mềm mại tự nhiên.',
      goal: 'Tối ưu hóa quy trình thu âm phòng thu, vocal coaching tại chỗ để hỗ trợ nghệ sĩ đạt được độ rung cảm tốt nhất.',
      process: 'Sử dụng microphone condenser cao cấp trong phòng thu tiêu chuẩn, căn chỉnh vocal pre-amp phần cứng tỉ mỉ. Quá trình hậu kỳ tập trung vào cân chỉnh âm sắc (Tuning & Timing) thủ công từng nốt để tránh méo tiếng.',
      outcome: 'Bản thu đạt độ ấm áp, sạch sẽ tối đa, nhận được nhiều lời khen từ người nghe trên kênh YouTube cá nhân của ca sĩ.'
    }
  },
  'viet-tiep-cau-chuyen-hoa-binh': {
    id: 'viet-tiep-cau-chuyen-hoa-binh',
    title: 'Viết Tiếp Câu Chuyện Hoà Bình',
    artist: 'Mai Linh (Cover)',
    category: 'Video & TVC',
    year: '2024',
    link: 'https://www.youtube.com/watch?v=P8FPXHJe_go',
    thumb: 'https://img.youtube.com/vi/P8FPXHJe_go/hqdefault.jpg',
    embedId: 'P8FPXHJe_go',
    credits: [
      { role: 'Director / Video Editor', name: 'Nguyễn Xuân Kiệt' }
    ],
    storyDetails: {
      context: 'Sản phẩm âm nhạc mang thông điệp hào hùng, tri ân lịch sử. Dự án đòi hỏi một MV cinematic truyền tải trọn vẹn tinh thần hào sảng của bài hát.',
      goal: 'Quay dựng MV sân khấu kết hợp tư liệu lịch sử, mang tông màu điện ảnh cao cấp và chuyển cảnh mượt mà theo tiết tấu nhạc.',
      process: 'Sử dụng hệ thống 5 góc máy quay chuyên dụng trong studio và ngoại cảnh. Ekip thiết lập ánh sáng tương phản cao và hiệu ứng khói mờ ảo để tạo chiều sâu cinematic. Khâu hậu kỳ chỉnh màu (Color Grading) theo tone lạnh cổ điển.',
      outcome: 'Một video hoàn chỉnh, xúc động, hào hùng, nhận được đánh giá cao từ giới chuyên môn về mặt hình ảnh lẫn âm thanh.'
    }
  },
  'ao-cu-tinh-moi': {
    id: 'ao-cu-tinh-moi',
    title: 'Áo Cũ Tình Mới',
    artist: 'Remake Remix',
    category: 'Hoà âm phối khí',
    year: '2024',
    link: 'https://www.youtube.com/watch?v=hlvg9YBxRqY',
    thumb: 'https://img.youtube.com/vi/hlvg9YBxRqY/hqdefault.jpg',
    embedId: 'hlvg9YBxRqY',
    credits: [
      { role: 'Music Producer', name: 'Nguyễn Xuân Kiệt' },
      { role: 'Mixing & Mastering', name: 'Nguyễn Xuân Kiệt' }
    ],
    storyDetails: {
      context: 'Mong muốn biến một bài hát pop ballad quen thuộc thành một bản nhạc House thời thượng, sôi động phục vụ các sân khấu tiệc và live set.',
      goal: 'Thiết kế nhịp drop bốc lửa, bassline căng tràn năng lượng và các sound synth điện tử bắt tai để làm mới hoàn toàn ca khúc.',
      process: 'Producer Nguyễn Xuân Kiệt đã giữ lại phần vocal truyền cảm, xây dựng lại hệ thống hoà thanh và tăng tốc độ (BPM). Khâu drop được thiết kế chi tiết bằng phần mềm ảo chuyên nghiệp, mix sound sắc nét trên dải tần cao để tạo năng lượng phấn khích.',
      outcome: 'Bản remix tạo hiệu ứng cực kỳ tốt tại các sự kiện trực tiếp, thu hút hàng chục ngàn lượt xem trên các nền tảng số.'
    }
  },
  'tet-xa-cover': {
    id: 'tet-xa-cover',
    title: 'Tết Xa (Cover)',
    artist: 'Khánh Linh',
    category: 'Thu âm',
    year: '2024',
    link: 'https://www.tiktok.com/@xkstudio/video/7589982843418266901?lang=vi-VN',
    thumb: '/images/quocchi-3.jpg',
    credits: [
      { role: 'Recording / Mixing', name: 'Nguyễn Xuân Kiệt' }
    ],
    storyDetails: {
      context: 'Dự án thu âm và làm video ngắn chất lượng cao phát hành dịp Tết Nguyên Đán cho ca sĩ Khánh Linh, kể về nỗi lòng những người con xa xứ.',
      goal: 'Thu âm vocal chân thật, ấm cúng và mix mượt mà trên nền nhạc cũ để tối ưu định dạng phân phối trên TikTok.',
      process: 'Vocal được thu trực tiếp tại studio dưới sự hướng dẫn của Xuân Kiệt. Hậu kỳ chú trọng mix ấm, thêm hiệu ứng reverb mỏng để tạo chiều sâu tự nhiên. Thiết lập khung hình video dọc 9:16 tối ưu cho thuật toán di động.',
      outcome: 'Video ngắn đạt lượt tương tác cao trên kênh TikTok, lan toả cảm xúc ấm áp đến hàng ngàn người nghe.'
    }
  }
}

const project = computed(() => projectsData[id.value] || null)

const getContactLink = (category: string) => {
  const map: Record<string, string> = {
    'Hoà âm phối khí': 'hoa-am',
    'Mix & Master': 'mixing-mastering',
    'Mixing & Mastering': 'mixing-mastering',
    'Thu âm & Vocal Production': 'thu-am',
    'Thu âm': 'thu-am',
    'Video & TVC': 'mv-tvc',
    'Live Band & Sự kiện': 'live-band',
    'Khoá học': 'khoa-hoc'
  }
  const param = map[category]
  return param ? `/contact?service=${param}` : '/contact'
}

const projectOgImage = computed(() => {
  if (!project.value?.thumb) return 'https://xkproduction.com/images/Xkpreviewnew.png'
  if (project.value.thumb.startsWith('http')) return project.value.thumb
  return `https://xkproduction.com${project.value.thumb}`
})

useSeoMeta({
  title: () => project.value ? `${project.value.title} — Chi Tiết Dự Án | XKProduction` : 'Không tìm thấy dự án | XKProduction',
  description: () => project.value ? `Khám phá câu chuyện sản xuất đằng sau tác phẩm ${project.value.title} cùng nghệ sĩ ${project.value.artist} thực hiện tại XKProduction.` : 'Dự án không tồn tại trên XKProduction.',
  ogTitle: () => project.value ? `${project.value.title} — Câu Chuyện Dự Án | XKProduction` : 'XKProduction Portfolio',
  ogDescription: () => project.value ? `Quá trình hoà âm, phối khí, mix & master cho ca khúc ${project.value.title}.` : 'Khám phá các sản phẩm âm nhạc tiêu biểu.',
  ogImage: () => projectOgImage.value,
  ogType: 'website',
  ogUrl: () => `https://xkproduction.com/products/${id.value}`,
  twitterCard: 'summary_large_image',
  twitterImage: () => projectOgImage.value
})

useSchemaOrg([
  project.value ? {
    '@type': 'CreativeWork',
    'name': project.value.title,
    'headline': project.value.title,
    'description': project.value.storyDetails?.context,
    'creator': {
      '@type': 'Person',
      'name': 'Nguyễn Xuân Kiệt',
      'jobTitle': 'Music Producer'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'XKProduction',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://xkproduction.com/images/logo-xkproduction.png'
      }
    },
    'datePublished': project.value.year ? `${project.value.year}-01-01` : undefined,
    'image': project.value.thumb
  } : undefined
].filter(Boolean))
</script>

<style scoped>
.product-detail-page {
  position: relative;
  overflow: hidden;
  background-color: var(--bg-dark);
  min-height: 100vh;
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
  opacity: 0.15;
}

.spotlight-1 {
  width: 600px;
  height: 600px;
  top: -10%;
  left: -10%;
  background: rgba(125, 211, 252, 0.35);
}

.spotlight-2 {
  width: 700px;
  height: 700px;
  bottom: -10%;
  right: -10%;
  background: rgba(56, 189, 248, 0.22);
}

/* ==============================================
   HERO BANNER
   ============================================== */
.detail-hero {
  height: 480px;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding-bottom: 4rem;
  z-index: 1;
}

.hero-cover-wrap {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background-color: #03060a;
}

.hero-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.4) saturate(0.8) blur(4px);
  transform: scale(1.02);
}

.cover-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(7, 16, 24, 0.2) 0%, rgba(7, 16, 24, 0.95) 100%);
}

.hero-content-overlay {
  width: 100%;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-light);
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: var(--accent);
}

.header-metadata {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  margin-bottom: 0.8rem;
}

.meta-tag {
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: 2px;
  text-transform: uppercase;
  background: rgba(125, 211, 252, 0.12);
  border: 1px solid rgba(125, 211, 252, 0.22);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
}

.meta-year {
  font-size: 0.85rem;
  color: var(--text-light);
  font-weight: 600;
}

.project-title {
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 850;
  color: var(--text-main);
  line-height: 1.15;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.project-subtitle {
  font-size: 1.05rem;
  color: var(--text-light);
}

.artist-name {
  color: var(--text-main);
}

/* ==============================================
   CASE STUDY BODY
   ============================================== */
.case-study-section {
  padding-bottom: 120px;
  position: relative;
  z-index: 1;
}

.case-study-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 3.5rem;
  align-items: start;
}

/* Main content */
.storytelling-main {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.embed-video-card {
  border-radius: 20px;
  padding: 0.6rem;
}

.video-ratio-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
  border-radius: 14px;
  background: #000;
}

.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.tiktok-link-card {
  padding: 4rem 2rem;
  border: 1px dashed rgba(255, 255, 255, 0.15);
}

.tiktok-icon {
  color: var(--accent);
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 12px rgba(125, 211, 252, 0.4));
}

.tiktok-link-card h3 {
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 0.6rem;
  color: var(--text-main);
}

.tiktok-link-card p {
  color: var(--text-light);
  margin-bottom: 2rem;
  max-width: 460px;
  margin-left: auto;
  margin-right: auto;
  font-size: 0.9rem;
  line-height: 1.6;
}

/* Text blocks for story */
.story-blocks {
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
}

.story-block {
  position: relative;
  padding-left: 1.8rem;
}

.block-indicator {
  position: absolute;
  left: 0;
  top: 0.35rem;
  width: 4px;
  height: 20px;
  background: var(--gradient-primary);
  border-radius: 4px;
}

.story-block h2 {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}

.story-block p {
  color: var(--text-light);
  font-size: 0.96rem;
  line-height: 1.8;
}

/* Sidebar area */
.storytelling-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-card {
  padding: 2.2rem;
}

.sidebar-card h3 {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
}

.info-item, .credit-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1.25rem;
}

.info-item:last-of-type, .credit-item:last-of-type {
  margin-bottom: 0;
}

.info-label, .credit-role-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-val, .credit-name-val {
  font-size: 0.92rem;
  color: var(--text-main);
  font-weight: 600;
}

.credit-name-val {
  color: var(--accent);
}

.sidebar-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
  margin: 1.8rem 0;
}

.advisory-box {
  background: radial-gradient(circle at top left, rgba(125, 211, 252, 0.04), transparent 40%),
              var(--glass-bg);
  border-color: rgba(125, 211, 252, 0.1);
}

.advisory-icon {
  font-size: 2.2rem;
  color: var(--accent);
  margin-bottom: 1.2rem;
  filter: drop-shadow(0 0 10px rgba(125, 211, 252, 0.35));
  display: inline-block;
}

.advisory-box h3 {
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.advisory-box p {
  font-size: 0.85rem;
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 1.8rem;
}

.btn-full {
  width: 100%;
}

/* ==============================================
   NOT FOUND SECTION
   ============================================== */
.not-found-section {
  padding: 220px 0 120px;
  z-index: 1;
  position: relative;
}

.not-found-section h1 {
  font-size: 3rem;
  font-weight: 850;
  color: var(--text-main);
  margin: 1.5rem 0 1rem;
}

.not-found-section p {
  color: var(--text-light);
  margin-bottom: 2.5rem;
}

/* ==============================================
   RESPONSIVE
   ============================================== */
@media (max-width: 1024px) {
  .case-study-layout { grid-template-columns: 1fr; gap: 3rem; }
  .storytelling-sidebar { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
}

@media (max-width: 768px) {
  .detail-hero { height: 380px; padding-bottom: 2rem; }
  .project-title { font-size: 2rem; }
  .case-study-section { padding-bottom: 60px; }
  .story-blocks { gap: 2rem; }
  .storytelling-sidebar { grid-template-columns: 1fr; }
}
</style>
