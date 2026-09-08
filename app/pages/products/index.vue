<template>
  <div class="products-page-wrap">
    <!-- INTERACTIVE AMBIENT GLOW BACKDROP -->
    <div class="immersive-ambient-bg" aria-hidden="true">
      <div class="glow-spot spotlight-1"></div>
      <div class="glow-spot spotlight-2"></div>
    </div>

    <!-- ===== HERO SECTION ===== -->
    <section class="page-hero">
      <div class="max-width">
        <span class="hero-badge"><i class="fa-solid fa-compact-disc"></i> TÁC PHẨM</span>
        <h1 class="page-hero-title">Sản Phẩm <span class="text-gradient-animated">Âm Nhạc</span></h1>
        <p class="page-hero-sub">Những dự án tiêu biểu do XKProduction sản xuất, mix & master, hòa âm phối khí và audio demo chất lượng cao.</p>
      </div>
    </section>

    <!-- ===== GALLERY SECTION ===== -->
    <section class="gallery-section">
      <div class="max-width">
        <!-- Category Filter Chips -->
        <div class="filter-header-wrap glass-card">
          <span class="filter-label"><i class="fa-solid fa-sliders"></i> Bộ lọc:</span>
          <div class="filter-group">
            <button
              v-for="cat in categories" :key="cat"
              class="filter-btn"
              :class="{ active: activeCategory === cat }"
              @click="activeCategory = cat"
            >{{ cat }}</button>
          </div>
        </div>

        <!-- Portfolio Grid -->
        <div class="products-grid">
          <div 
            v-for="item in filteredProducts" 
            :key="item.id" 
            class="product-card glass-card hover-lift"
            :class="{ 'product-card-audio': item.kind === 'audio' }"
          >
            <!-- EMBED PROJECT (Video / Single release) -->
            <template v-if="item.kind === 'embed'">
              <div class="product-cover">
                <img v-if="item.thumb" :src="item.thumb" :alt="item.title" class="cover-thumb" loading="lazy" />
                <div v-else class="cover-placeholder"><i class="fa-solid fa-music fa-2x"></i></div>
                <div class="cover-overlay-dark"></div>
                <div class="product-hover-overlay">
                  <NuxtLink :to="'/products/' + item.id" class="action-btn-story btn btn-primary">
                    <i class="fa-solid fa-book-open"></i> Xem chi tiết
                  </NuxtLink>
                  <a v-if="item.link" :href="item.link" target="_blank" rel="noopener" class="action-btn-external btn btn-secondary">
                    <i :class="item.link.includes('tiktok') ? 'fa-brands fa-tiktok' : 'fa-brands fa-youtube'"></i> Xem video
                  </a>
                </div>
              </div>
              <div class="product-info">
                <div class="info-header">
                  <span class="tag-category">{{ item.category }}</span>
                  <span class="tag-year" v-if="item.year">{{ item.year }}</span>
                </div>
                <h3 class="product-title-text">{{ item.title }}</h3>
                <p class="product-artist-text">{{ item.artist }}</p>
                <div class="product-divider"></div>
                <ul class="product-credits">
                  <li v-for="c in item.credits" :key="`${item.id}-${c.role}`">
                    <span class="credit-role">{{ c.role }}:</span>
                    <span class="credit-name">{{ c.name }}</span>
                  </li>
                </ul>
              </div>
            </template>

            <!-- AUDIO DEMO PROJECT -->
            <template v-else>
              <div class="audio-card-top">
                <div class="audio-meta-left">
                  <span class="audio-badge"><i class="fa-solid fa-wave-square"></i> Audio Demo</span>
                  <h3>{{ item.title }}</h3>
                  <p class="product-artist">{{ item.fileName }}</p>
                </div>
                <button
                  type="button"
                  class="btn btn-primary audio-toggle"
                  :disabled="!audioStates[item.id]?.ready && !audioStates[item.id]?.playing"
                  @click="toggleAudio(item.id)"
                  aria-label="Phát nhạc demo"
                >
                  <i :class="audioStates[item.id]?.playing ? 'fa-solid fa-pause' : 'fa-solid fa-play'"></i>
                  <span>{{ audioStates[item.id]?.playing ? 'Tạm dừng' : 'Nghe Beat' }}</span>
                </button>
              </div>

              <div class="audio-waveform-shell">
                <div :ref="setWaveformRef(item.id)" class="audio-waveform" :data-audio-id="item.id"></div>
                <div v-if="audioStates[item.id]?.loading" class="audio-state-text">
                  <i class="fa-solid fa-spinner fa-spin"></i> Đang tải dữ liệu âm thanh...
                </div>
                <div v-else-if="audioStates[item.id]?.error" class="audio-state-text error">
                  <i class="fa-solid fa-triangle-exclamation"></i> {{ audioStates[item.id]?.error }}
                </div>
                <div v-else class="audio-state-text">
                  <i class="fa-solid fa-circle-info"></i> Click trực tiếp lên waveform để tua nhanh.
                </div>
              </div>

              <div class="product-info-audio">
                <div class="product-tags">
                  <span class="tag-chip">{{ item.category }}</span>
                  <span class="tag-chip"><i class="fa-solid fa-file-audio"></i> {{ item.fileName }}.mp3</span>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div v-if="filteredProducts.length === 0" class="empty-state glass-card">
          <i class="fa-solid fa-magnifying-glass-chart"></i>
          <p>Chưa có sản phẩm trong danh mục này.</p>
        </div>
      </div>
    </section>

    <!-- ===== FOOTER CALL TO ACTION ===== -->
    <section class="cta-section">
      <div class="max-width text-center">
        <div class="cta-box glass-card">
          <div class="cta-glow-spot"></div>
          <h2>Bạn muốn dự án tiếp theo có sự góp sức của XKProduction?</h2>
          <p>Đồng hành cùng nghệ sĩ xây dựng ý tưởng âm nhạc chuyên nghiệp, phối khí sang trọng, và master chuẩn quốc tế.</p>
          <NuxtLink to="/contact" class="btn btn-primary btn-pulse btn-large">Bắt đầu sản xuất ngay</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'

type ProductCredit = {
  role: string
  name: string
}

type EmbedProduct = {
  kind: 'embed'
  id: string
  title: string
  artist: string
  category: string
  year?: string
  link?: string
  thumb?: string
  credits: ProductCredit[]
}

type AudioProduct = {
  kind: 'audio'
  id: string
  title: string
  artist: string
  category: string
  fileName: string
  audioUrl: string
  credits: ProductCredit[]
}

type ProductItem = EmbedProduct | AudioProduct

type AudioState = {
  ready: boolean
  playing: boolean
  loading: boolean
  error: string | null
}

const audioDemoSources: Record<string, string> = {
  '../../public/product-audio-demo/pop-rnb-1-Gm.102.mp3': '/product-audio-demo/pop-rnb-1-Gm.102.mp3'
}

useSeoMeta({
  title: 'Sản phẩm Âm nhạc tiêu biểu - XKProduction',
  description: 'Các dự án âm nhạc tiêu biểu do XKProduction thực hiện: Hoà âm phối khí, mix & master cho nghệ sĩ Revan, Howl, Phương Thanh Tuyền... Nâng tầm sản phẩm âm nhạc của bạn.',
  ogTitle: 'Sản phẩm Âm nhạc tiêu biểu - XKProduction',
  ogDescription: 'Nghe các tác phẩm thực tế do XKProduction sản xuất: Hoà âm phối khí, mixing & mastering, thu âm chuyên nghiệp cho 2000+ dự án.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Sản phẩm âm nhạc XKProduction - Hoà âm phối khí & Mix Master',
  ogUrl: 'https://xkproduction.com/products',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  keywords: 'XKProduction, sản phẩm âm nhạc, dự án âm nhạc, hoà âm phối khí, thu âm chuyên nghiệp, mixing, mastering'
})

useSchemaOrg([
  defineWebPage({
    name: 'Sản phẩm tiêu biểu',
    description: 'Các sản phẩm âm nhạc tiêu biểu do XKProduction thực hiện: Thu âm, mixing, mastering và hòa âm phối khí tại Việt Nam.'
  }),
  {
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Trang chủ', 'item': 'https://xkproduction.com' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Sản phẩm Âm nhạc Tiêu biểu', 'item': 'https://xkproduction.com/products' }
    ]
  },
  {
    '@type': 'MusicRecording',
    'name': 'Chẳng Muốn Nói Nhiều Lời',
    'byArtist': { '@type': 'MusicGroup', 'name': 'Revan' },
    'producer': { '@type': 'Person', 'name': 'Nguyễn Xuân Kiệt', 'url': 'https://xkproduction.com' },
    'url': 'https://www.youtube.com/watch?v=IxlFvQQP_4c',
    'inAlbum': { '@type': 'MusicAlbum', 'name': 'Chẳng Muốn Nói Nhiều Lời - Single', 'datePublished': '2025' }
  },
  {
    '@type': 'MusicRecording',
    'name': 'Love Dự Phòng',
    'byArtist': { '@type': 'MusicGroup', 'name': 'Howl' },
    'producer': { '@type': 'Person', 'name': 'Nguyễn Xuân Kiệt', 'url': 'https://xkproduction.com' },
    'url': 'https://www.youtube.com/watch?v=OCnKTCslJUU',
    'inAlbum': { '@type': 'MusicAlbum', 'name': 'Love Dự Phòng - Single', 'datePublished': '2025' }
  },
  {
    '@type': 'MusicRecording',
    'name': 'Lý Do Bắt Đầu',
    'byArtist': { '@type': 'MusicGroup', 'name': 'Revan' },
    'producer': { '@type': 'Person', 'name': 'Nguyễn Xuân Kiệt', 'url': 'https://xkproduction.com' },
    'url': 'https://www.youtube.com/watch?v=vzfr1ddayYY',
    'inAlbum': { '@type': 'MusicAlbum', 'name': 'Lý Do Bắt Đầu - Single', 'datePublished': '2025' }
  }
])

const activeCategory = ref('Tất cả')

const staticProducts: EmbedProduct[] = [
  {
    kind: 'embed',
    id: 'love-du-phong',
    title: 'Love Dự Phòng',
    artist: 'Howl',
    category: 'Hoà âm phối khí',
    year: '2025',
    link: 'https://www.youtube.com/watch?v=OCnKTCslJUU',
    thumb: 'https://img.youtube.com/vi/OCnKTCslJUU/hqdefault.jpg',
    credits: [
      { role: 'Music Producer', name: 'Nguyễn Xuân Kiệt' },
      { role: 'Mixing & Mastering', name: 'Nguyễn Xuân Kiệt' }
    ]
  },
  {
    kind: 'embed',
    id: 'chang-muon-noi-nhieu-loi',
    title: 'Chẳng Muốn Nói Nhiều Lời',
    artist: 'Revan',
    category: 'Mix & Master',
    year: '2025',
    link: 'https://www.youtube.com/watch?v=IxlFvQQP_4c',
    thumb: 'https://img.youtube.com/vi/IxlFvQQP_4c/hqdefault.jpg',
    credits: [
      { role: 'Mixing & Mastering', name: 'Nguyễn Xuân Kiệt' },
      { role: 'Guitarist', name: 'Nguyễn Xuân Kiệt' }
    ]
  },
  {
    kind: 'embed',
    id: 'ly-do-bat-dau',
    title: 'Lý Do Bắt Đầu',
    artist: 'Revan',
    category: 'Hoà âm phối khí',
    year: '2025',
    link: 'https://www.youtube.com/watch?v=vzfr1ddayYY',
    thumb: 'https://img.youtube.com/vi/vzfr1ddayYY/hqdefault.jpg',
    credits: [
      { role: 'Music Producer', name: 'Nguyễn Xuân Kiệt' },
      { role: 'Mixing & Mastering', name: 'Nguyễn Xuân Kiệt' }
    ]
  },
  {
    kind: 'embed',
    id: 'kiep-sau',
    title: 'Kiếp Sau',
    artist: 'Phương Thanh Tuyền (Cover)',
    category: 'Thu âm',
    year: '2024',
    link: 'https://www.youtube.com/watch?v=z4GB-X1OiPg',
    thumb: 'https://img.youtube.com/vi/z4GB-X1OiPg/hqdefault.jpg',
    credits: [
      { role: 'Recording / Mixing / Master', name: 'Nguyễn Xuân Kiệt' }
    ]
  },
  {
    kind: 'embed',
    id: 'viet-tiep-cau-chuyen-hoa-binh',
    title: 'Viết Tiếp Câu Chuyện Hoà Bình',
    artist: 'Mai Linh (Cover)',
    category: 'Video & TVC',
    year: '2024',
    link: 'https://www.youtube.com/watch?v=P8FPXHJe_go',
    thumb: 'https://img.youtube.com/vi/P8FPXHJe_go/hqdefault.jpg',
    credits: [
      { role: 'Director', name: 'Nguyễn Xuân Kiệt' }
    ]
  },
  {
    kind: 'embed',
    id: 'ao-cu-tinh-moi',
    title: 'Áo Cũ Tình Mới',
    artist: 'Remake Remix',
    category: 'Hoà âm phối khí',
    year: '2024',
    link: 'https://www.youtube.com/watch?v=hlvg9YBxRqY',
    thumb: 'https://img.youtube.com/vi/hlvg9YBxRqY/hqdefault.jpg',
    credits: [
      { role: 'Music Producer', name: 'Nguyễn Xuân Kiệt' },
      { role: 'Mixing & Mastering', name: 'Nguyễn Xuân Kiệt' }
    ]
  },
  {
    kind: 'embed',
    id: 'tet-xa-cover',
    title: 'Tết Xa (Cover)',
    artist: 'Khánh Linh',
    category: 'Thu âm',
    year: '2024',
    link: 'https://www.tiktok.com/@xkstudio/video/7589982843418266901?lang=vi-VN',
    thumb: '/images/quocchi-3.jpg',
    credits: [
      { role: 'Recording / Mixing', name: 'Nguyễn Xuân Kiệt' }
    ]
  }
]

const prettifyAudioName = (value: string) => value
  .replace(/[-_.]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .replace(/\b\w/g, char => char.toUpperCase())

const audioProducts = computed<AudioProduct[]>(() => Object.entries(audioDemoSources)
  .sort(([leftPath], [rightPath]) => leftPath.localeCompare(rightPath))
  .map(([sourcePath, audioUrl], index) => {
    const fileName = sourcePath.split('/').pop()?.replace(/\.mp3$/i, '') ?? `audio-demo-${index + 1}`
    const id = `audio-demo-${index + 1}-${fileName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

    return {
      kind: 'audio',
      id,
      title: prettifyAudioName(fileName),
      artist: 'Audio demo',
      category: 'Audio demo',
      fileName,
      audioUrl,
      credits: [
        { role: 'File', name: `${fileName}.mp3` }
      ]
    }
  }))

const products = computed<ProductItem[]>(() => [...staticProducts, ...audioProducts.value])

const categories = computed(() => ['Tất cả', ...new Set(products.value.map((product: ProductItem) => product.category))])

const filteredProducts = computed(() => {
  if (activeCategory.value === 'Tất cả') return products.value
  return products.value.filter((product: ProductItem) => product.category === activeCategory.value)
})

const audioWaveformContainers = reactive<Record<string, HTMLDivElement | null>>({})
const audioStates = reactive<Record<string, AudioState>>({})
const audioWaveSurfers = new Map<string, any>()

const ensureAudioState = (id: string) => {
  if (!audioStates[id]) {
    audioStates[id] = {
      ready: false,
      playing: false,
      loading: true,
      error: null
    }
  }
  return audioStates[id]
}

const setWaveformRef = (id: string) => (element: any) => {
  audioWaveformContainers[id] = element instanceof Element ? element : element?.$el ?? null
}

const toggleAudio = (id: string) => {
  const waveSurfer = audioWaveSurfers.get(id)
  if (!waveSurfer) return

  if (waveSurfer.isPlaying()) {
    waveSurfer.pause()
  } else {
    waveSurfer.play()
  }
}

const initWaveSurfers = async () => {
  if (!import.meta.client) return
  if (audioProducts.value.length === 0) return

  audioWaveSurfers.forEach((waveSurfer) => {
    try {
      waveSurfer.destroy()
    } catch (e) {
      console.warn('[WaveSurfer] Error destroying instance:', e)
    }
  })
  audioWaveSurfers.clear()

  const { default: WaveSurfer } = await import('wavesurfer.js')
  await nextTick()

  filteredProducts.value.forEach((item: ProductItem) => {
    if (item.kind !== 'audio') return
    const container = audioWaveformContainers[item.id]
    if (!container) return

    const state = ensureAudioState(item.id)
    state.loading = true
    state.ready = false
    state.playing = false
    state.error = null

    const waveSurfer = WaveSurfer.create({
      container,
      url: item.audioUrl,
      height: 72,
      waveColor: 'rgba(148, 163, 184, 0.25)',
      progressColor: '#7dd3fc',
      cursorColor: '#38bdf8',
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      normalize: true,
      interact: true,
      hideScrollbar: true
    })

    waveSurfer.on('ready', () => {
      state.ready = true
      state.loading = false
    })

    waveSurfer.on('play', () => {
      state.playing = true
    })

    waveSurfer.on('pause', () => {
      state.playing = false
    })

    waveSurfer.on('finish', () => {
      state.playing = false
    })

    waveSurfer.on('error', (error: unknown) => {
      state.error = error instanceof Error ? error.message : String(error)
      state.loading = false
    })

    audioWaveSurfers.set(item.id, waveSurfer)
  })
}

onMounted(async () => {
  await initWaveSurfers()
})

watch(filteredProducts, async () => {
  await initWaveSurfers()
})

onBeforeUnmount(() => {
  audioWaveSurfers.forEach(waveSurfer => {
    try {
      waveSurfer.destroy()
    } catch (e) {}
  })
  audioWaveSurfers.clear()
})
</script>

<style scoped>
.products-page-wrap {
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

/* ==============================================
   PAGE HERO
   ============================================= */
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
   GALLERY / FILTERS
   ============================================= */
.gallery-section {
  padding: 80px 0 140px;
  position: relative;
  z-index: 1;
}

.filter-header-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 2rem;
  margin-bottom: 3.5rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.filter-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-light);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-label i {
  color: var(--accent);
}

.filter-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.55rem 1.2rem;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text-light);
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: all 0.3s var(--ease-out-expo);
}

.filter-btn:hover {
  color: var(--text-main);
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.05);
}

.filter-btn.active {
  background: var(--gradient-primary);
  color: #fff;
  border-color: transparent;
  box-shadow: var(--shadow-glow);
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 2rem;
}

/* Card Design */
.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card-audio {
  padding: 2rem 2rem 2.2rem;
}

/* Thumbnail / Cover image */
.product-cover {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
  background: #000;
  border-radius: 16px 16px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out-expo);
}

.product-card:hover .cover-thumb {
  transform: scale(1.06);
}

.cover-overlay-dark {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(7, 16, 24, 0.95) 100%);
  pointer-events: none;
}

.cover-placeholder {
  font-size: 3rem;
  color: var(--accent);
}

/* Hover overlay play/details triggers */
.product-hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(7, 16, 24, 0.72);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  opacity: 0;
  transition: opacity 0.4s var(--ease-out-expo);
  padding: 2rem;
}

.product-card:hover .product-hover-overlay {
  opacity: 1;
}

.product-hover-overlay .btn {
  width: 160px;
  font-size: 0.8rem;
  padding: 0.65rem 1rem;
}

/* Card Info Body */
.product-info {
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.tag-category {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.tag-year {
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 600;
}

.product-title-text {
  font-size: 1.15rem;
  font-weight: 750;
  color: var(--text-main);
  margin-bottom: 0.35rem;
  line-height: 1.35;
}

.product-artist-text {
  font-size: 0.88rem;
  color: var(--text-light);
  margin-bottom: 1.2rem;
}

.product-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 1.2rem;
}

.product-credits {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: auto;
}

.product-credits li {
  font-size: 0.78rem;
  line-height: 1.45;
  display: flex;
  justify-content: space-between;
}

.credit-role {
  color: var(--text-muted);
}

.credit-name {
  color: var(--text-light);
  font-weight: 600;
}

/* Waveform audio layout styles */
.audio-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.audio-meta-left {
  flex-grow: 1;
}

.audio-meta-left h3 {
  color: var(--text-main);
  font-size: 1.15rem;
  font-weight: 750;
  margin-top: 0.4rem;
  line-height: 1.35;
}

.audio-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border-radius: 99px;
  background: rgba(125, 211, 252, 0.08);
  border: 1px solid rgba(125, 211, 252, 0.15);
  color: var(--accent);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.audio-toggle {
  flex-shrink: 0;
  min-width: 100px;
  padding: 0.6rem 1rem;
  font-size: 0.75rem;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.audio-toggle:disabled {
  opacity: 0.6;
  cursor: wait;
}

.audio-waveform-shell {
  padding: 1.2rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 1.5rem;
  position: relative;
}

.audio-waveform {
  min-height: 72px;
}

.audio-state-text {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-top: 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.audio-state-text.error {
  color: #fca5a5;
}

.audio-state-text i {
  color: var(--accent);
}

.product-info-audio {
  margin-top: auto;
}

.product-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag-chip {
  padding: 0.25rem 0.7rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: var(--text-muted);
  font-size: 0.72rem;
  font-weight: 500;
}

/* ==============================================
   CALL TO ACTION
   ============================================= */
.cta-section {
  padding: 0 0 140px;
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

.btn-large {
  padding: 0.95rem 2.2rem;
  font-size: 0.92rem;
  border-radius: 12px;
}

/* ==============================================
   RESPONSIVE
   ============================================= */
@media (max-width: 768px) {
  .page-hero { padding-top: 150px; padding-bottom: 3.5rem; }
  .filter-header-wrap { padding: 1.25rem; flex-direction: column; align-items: stretch; margin-bottom: 2.5rem; }
  .gallery-section { padding: 40px 0 80px; }
  .products-grid { grid-template-columns: 1fr; }
  .audio-card-top { flex-direction: column; align-items: stretch; }
  .audio-toggle { width: 100%; margin-top: 0.5rem; }
  .cta-section { padding-bottom: 80px; }
  .cta-box { padding: 3.5rem 1.5rem; }
}
</style>
