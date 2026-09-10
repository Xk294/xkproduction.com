<template>
  <div class="xk-audio-compare matte-card" role="region" :aria-label="isVi ? 'Console so sánh âm thanh Thô và Master' : 'A/B Audio Comparison Console'">
    <!-- SVG GRADIENT DEFS -->
    <svg width="0" height="0" class="svg-defs-hidden" aria-hidden="true">
      <defs>
        <!-- RAW GRADIENTS -->
        <linearGradient id="rawAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2dd4bf" stop-opacity="0.32" />
          <stop offset="55%" stop-color="#0f766e" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#042f2e" stop-opacity="0.0" />
        </linearGradient>
        <linearGradient id="rawPlayedAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#5eead4" stop-opacity="0.75" />
          <stop offset="45%" stop-color="#14b8a6" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#0d9488" stop-opacity="0.03" />
        </linearGradient>

        <!-- MASTER GRADIENTS -->
        <linearGradient id="masterAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.38" />
          <stop offset="55%" stop-color="#d97706" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#78350f" stop-opacity="0.0" />
        </linearGradient>
        <linearGradient id="masterPlayedAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fef08a" stop-opacity="0.88" />
          <stop offset="35%" stop-color="#fbbf24" stop-opacity="0.5" />
          <stop offset="70%" stop-color="#d97706" stop-opacity="0.22" />
          <stop offset="100%" stop-color="#92400e" stop-opacity="0.03" />
        </linearGradient>
      </defs>
    </svg>

    <!-- HEADER BAR: STUDIO HARDWARE METADATA -->
    <div class="console-top-bar">
      <div class="console-branding">
        <span class="live-dot" :class="{ active: isPlaying }"></span>
        <span class="text-meta-mono">{{ isVi ? 'BÀN KIỂM ÂM XK · CÔNG NGHỆ SO SÁNH A/B' : 'XK CONSOLE · AB-COMPARISON ENGINE V2' }}</span>
      </div>
      <div class="channel-indicator">
        <button
          type="button"
          class="mode-tag-btn"
          :class="{ 'is-active': activeChannel === 'raw' }"
          @click="selectChannel('raw')"
          :title="isVi ? 'Chuyển sang Bản Thu Mộc' : 'Switch to Raw Take'"
        >
          <span class="channel-dot raw"></span>
          {{ isVi ? 'KÊNH A: BẢN THU MỘC' : 'CHANNEL A: RAW TAKE' }}
        </button>
        <span class="cross-divider">⇄</span>
        <button
          type="button"
          class="mode-tag-btn"
          :class="{ 'is-active': activeChannel === 'master' }"
          @click="selectChannel('master')"
          :title="isVi ? 'Chuyển sang Bản Master' : 'Switch to Mastered'"
        >
          <span class="channel-dot master"></span>
          {{ isVi ? 'KÊNH B: BẢN MASTER' : 'CHANNEL B: MASTERED' }}
        </button>
      </div>
    </div>

    <!-- MAIN INTERACTIVE SLIDER CANVAS -->
    <div
      class="comparison-stage"
      ref="stageRef"
      @mousedown="startDrag"
      @touchstart="startTouchDrag"
    >
      <!-- ANALOG REFERENCE GRID GUIDELINES -->
      <div class="studio-grid-lines" aria-hidden="true">
        <div class="grid-line line-plus3"><span class="grid-tag">+3dB PEAK</span></div>
        <div class="grid-line line-0db"><span class="grid-tag">0dB REF</span></div>
        <div class="grid-line line-minus6"><span class="grid-tag">-6dB RMS</span></div>
        <div class="grid-line line-minus18"><span class="grid-tag">-18dB FLOOR</span></div>
      </div>

      <!-- WAVEFORM RAW BACKGROUND (LEFT) -->
      <div class="waveform-layer raw-layer" :class="{ 'is-focused': activeChannel === 'raw' }">
        <div class="waveform-svg-container">
          <svg class="waveform-svg raw-wave-svg" viewBox="0 0 1000 160" preserveAspectRatio="none">
            <!-- Unplayed base wave -->
            <path :d="rawWaveData.areaPath" class="wave-area unplayed" />
            <path :d="rawWaveData.topStroke" class="wave-crest unplayed" />
            <path :d="rawWaveData.bottomStroke" class="wave-reflection unplayed" />

            <!-- Played active wave (revealed by playProgress) -->
            <g :style="{ clipPath: `inset(0 ${100 - playProgress}% 0 0)` }">
              <path :d="rawWaveData.areaPath" class="wave-area played" />
              <path :d="rawWaveData.topStroke" class="wave-crest played" :class="{ 'pulse-live': isPlaying }" />
              <path :d="rawWaveData.bottomStroke" class="wave-reflection played" />
            </g>
          </svg>
        </div>

        <div class="layer-badge left-badge" @click.stop="selectChannel('raw')">
          <span class="badge-title">
            <span class="badge-status-dot raw" :class="{ 'is-lit': activeChannel === 'raw' }"></span>
            {{ isVi ? 'BẢN THU MỘC (RAW)' : 'RAW RECORDING' }}
          </span>
          <span class="badge-desc">{{ isVi ? 'Chưa qua xử lý EQ, nén dải tần hay định hình không gian' : 'Unprocessed microphone audio without EQ, compression, or spatial design' }}</span>
        </div>
      </div>

      <!-- WAVEFORM MASTERED LAYER (RIGHT CLIP-PATH) -->
      <div
        class="waveform-layer master-layer"
        :class="{ 'is-focused': activeChannel === 'master' }"
        :style="{ clipPath: `inset(0 0 0 ${splitPosition}%)` }"
      >
        <div class="waveform-svg-container">
          <svg class="waveform-svg master-wave-svg" viewBox="0 0 1000 160" preserveAspectRatio="none">
            <!-- Unplayed base wave -->
            <path :d="masterWaveData.areaPath" class="wave-area unplayed" />
            <path :d="masterWaveData.topStroke" class="wave-crest unplayed" />
            <path :d="masterWaveData.bottomStroke" class="wave-reflection unplayed" />

            <!-- Played active wave (revealed by playProgress) -->
            <g :style="{ clipPath: `inset(0 ${100 - playProgress}% 0 0)` }">
              <path :d="masterWaveData.areaPath" class="wave-area played" />
              <path :d="masterWaveData.topStroke" class="wave-crest played" :class="{ 'pulse-live-master': isPlaying }" />
              <path :d="masterWaveData.bottomStroke" class="wave-reflection played" />
            </g>
          </svg>
        </div>

        <div class="layer-badge right-badge" @click.stop="selectChannel('master')">
          <span class="badge-title">
            <span class="badge-status-dot master" :class="{ 'is-lit': activeChannel === 'master' }"></span>
            {{ isVi ? 'MASTER CHUẨN QUỐC TẾ' : 'SPOTIFY-STANDARD MASTER' }}
          </span>
          <span class="badge-desc">{{ isVi ? '-14 LUFS · Dải trầm sâu sắc · Không gian Stereo 3D' : '-14 LUFS · Deep punchy low-end · Immersive 3D soundstage' }}</span>
        </div>
      </div>

      <!-- ANALOG dB SCALE RACK TICKS -->
      <div class="fader-scale-ticks" aria-hidden="true">
        <span class="scale-tick">+6dB</span>
        <span class="scale-tick">+3dB</span>
        <span class="scale-tick center-0db">0dB</span>
        <span class="scale-tick">-3dB</span>
        <span class="scale-tick">-6dB</span>
        <span class="scale-tick">-12dB</span>
        <span class="scale-tick">-24dB</span>
        <span class="scale-tick">-∞</span>
      </div>

      <!-- REALTIME PLAYHEAD TRACKER -->
      <div
        class="playhead-tracker"
        :style="{ left: `${playProgress}%` }"
        v-show="duration > 0"
        aria-hidden="true"
      >
        <div class="playhead-needle"></div>
        <div class="playhead-beam"></div>
      </div>

      <!-- INTERACTIVE DRAGGABLE DIVIDER FADER -->
      <div class="draggable-fader" :style="{ left: `${splitPosition}%` }">
        <div class="fader-line"></div>
        <div class="fader-knob" :title="isVi ? 'Kéo ngang để so sánh' : 'Drag horizontally to compare'">
          <div class="knob-led" :class="activeChannel"></div>
          <div class="knob-ridges">
            <span></span><span></span><span></span>
          </div>
          <span class="fader-label font-mono">{{ activeChannel === 'raw' ? (isVi ? 'MỘC' : 'RAW') : 'MASTER' }}</span>
          <span class="fader-lufs-live font-mono">{{ activeChannel === 'raw' ? '-24 LUFS' : '-14 LUFS' }}</span>
        </div>
      </div>
    </div>

    <!-- PLAYBACK CONTROLS & TIMECODE -->
    <div class="console-controls-bar">
      <div class="playback-actions">
        <button
          type="button"
          class="btn-play-compare"
          @click="togglePlay"
          :aria-label="isPlaying ? (isVi ? 'Tạm dừng so sánh' : 'Pause comparison') : (isVi ? 'Phát so sánh âm thanh' : 'Play comparison')"
        >
          <i :class="isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'"></i>
          <span>{{ isPlaying ? (isVi ? 'TẠM DỪNG' : 'PAUSE') : (isVi ? 'NGHE SO SÁNH TRỰC DIỆN' : 'LISTEN COMPARISON') }}</span>
        </button>

        <!-- DIRECT CHANNEL TOGGLE BUTTONS -->
        <div class="channel-quick-buttons">
          <button
            type="button"
            class="channel-btn"
            :class="{ active: activeChannel === 'raw' && splitPosition <= 30 }"
            @click="selectChannel('raw')"
          >
            <i class="fa-solid fa-microphone mr-1"></i>
            {{ isVi ? 'Nghe Bản Mộc' : 'Raw Track' }}
          </button>
          <button
            type="button"
            class="channel-btn"
            :class="{ active: activeChannel === 'master' && splitPosition >= 70 }"
            @click="selectChannel('master')"
          >
            <i class="fa-solid fa-compact-disc mr-1"></i>
            {{ isVi ? 'Nghe Bản Master' : 'Master Track' }}
          </button>
          <button
            type="button"
            class="channel-btn btn-split"
            :class="{ active: splitPosition > 35 && splitPosition < 65 }"
            @click="toggleSplit5050"
            :title="isVi ? 'Đặt fader ở giữa 50/50 và chuyển đổi kênh mượt mà' : 'Center fader at 50/50 and toggle channel'"
          >
            <i class="fa-solid fa-sliders mr-1"></i>
            {{ isVi ? 'Chia Đôi (50/50)' : 'Split 50/50' }}
            <span class="active-badge" :class="activeChannel">
              {{ activeChannel === 'raw' ? (isVi ? 'Đang phát Mộc' : 'Playing Raw') : (isVi ? 'Đang phát Master' : 'Playing Master') }}
            </span>
          </button>
        </div>
      </div>

      <div class="timecode-box text-meta-mono">
        <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
      </div>
    </div>

    <!-- SOUND ENGINEER RATIONALE (BTS DECISIONS) -->
    <div class="engineer-notes-grid">
      <div class="note-card">
        <div class="note-icon"><i class="fa-solid fa-wave-square"></i></div>
        <div class="note-content">
          <strong>{{ isVi ? '1. Xử Lý Tiếng Trống & Âm Trầm' : '1. Low-End & Drum Dynamics' }}</strong>
          <p>{{ isVi ? 'Lọc bỏ tạp âm tần số thấp và nén gọn âm bass, giúp bài hát nghe chắc tiếng, không bị rè hay ù tai.' : 'Filtering muddy subsonic rumble and controlling bass dynamics for clean, tight low-end punch.' }}</p>
        </div>
      </div>

      <div class="note-card">
        <div class="note-icon"><i class="fa-solid fa-microphone"></i></div>
        <div class="note-content">
          <strong>{{ isVi ? '2. Giọng Hát Sáng Rõ & Tự Nhiên' : '2. Vocal Clarity & Warm Presence' }}</strong>
          <p>{{ isVi ? 'Cân chỉnh tần số để giọng ca trong trẻo, nổi bật trên nền nhạc và tạo độ vang vừa vặn, ấm áp.' : 'Tuning frequencies so the vocal sits right in front of the music with natural air and warmth.' }}</p>
        </div>
      </div>

      <div class="note-card">
        <div class="note-icon"><i class="fa-solid fa-sliders"></i></div>
        <div class="note-content">
          <strong>{{ isVi ? '3. Cân Bằng Âm Lượng Chuẩn' : '3. Balanced Streaming Loudness' }}</strong>
          <p>{{ isVi ? 'Bảo đảm bài hát đạt độ lớn chuẩn, nghe rõ ràng và tròn tiếng trên cả điện thoại, tai nghe và loa xe hơi.' : 'Mastered to optimal streaming loudness so your track sounds full and clear across phones, earphones, and car speakers.' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { useLocale } from '~/composables/useLocale'

const { isVi } = useLocale()
const { pauseTrack: pauseGlobalAudio, isPlaying: isGlobalAudioPlaying } = useStudioAudio()

const props = withDefaults(
  defineProps<{
    rawSrc?: string
    masterSrc?: string
  }>(),
  {
    rawSrc: '/product-audio-demo/pop-rnb-1-Gm-raw.mp3',
    masterSrc: '/product-audio-demo/pop-rnb-1-Gm.102.mp3'
  }
)

const stageRef = ref<HTMLElement | null>(null)
const splitPosition = ref(50) // percentage 0 to 100
const activeChannel = ref<'raw' | 'master'>('master') // strictly mutually exclusive audio channel
const isDragging = ref(false)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

let rawAudio: HTMLAudioElement | null = null
let masterAudio: HTMLAudioElement | null = null

// 72-point true peak audio envelope extracted directly from the actual studio demo files
const rawPeaks = [
  31, 22, 23, 23, 23, 24, 23, 24, 22, 25, 20, 23, 34, 27, 24, 22, 25, 25, 30, 29, 26, 22, 27, 31,
  48, 59, 57, 50, 48, 60, 59, 54, 60, 54, 53, 62, 55, 65, 64, 58, 49, 54, 56, 54, 56, 56, 51, 63,
  76, 62, 66, 62, 56, 50, 65, 53, 58, 58, 48, 61, 50, 58, 68, 44, 44, 35, 41, 42, 39, 63, 42, 22
]

const masterPeaks = [
  58, 56, 63, 66, 68, 56, 56, 59, 61, 64, 69, 56, 66, 60, 66, 62, 63, 70, 67, 65, 63, 63, 66, 70,
  82, 98, 97, 98, 100, 97, 96, 100, 95, 100, 100, 99, 100, 100, 95, 97, 98, 100, 97, 96, 100, 99,
  98, 100, 100, 100, 100, 98, 100, 100, 98, 98, 100, 100, 97, 97, 100, 98, 96, 100, 76, 78, 78, 86,
  84, 96, 73, 37
]

// Generate continuous cubic bezier spline paths (Catmull-Rom to Bezier) for SoundCloud-style smooth wave
function generateSmoothWavePaths(peaks: number[]) {
  const n = peaks.length
  const width = 1000
  const centerY = 80
  const topMaxHeight = 65
  const bottomMaxHeight = 44

  const topPts: { x: number; y: number }[] = []
  const bottomPts: { x: number; y: number }[] = []

  for (let i = 0; i < n; i++) {
    const x = Math.round((i / (n - 1)) * width * 10) / 10
    const amp = (peaks[i] ?? 20) / 100
    const yT = Math.round((centerY - amp * topMaxHeight) * 10) / 10
    const yB = Math.round((centerY + amp * bottomMaxHeight) * 10) / 10
    topPts.push({ x, y: yT })
    bottomPts.push({ x, y: yB })
  }

  function spline(pts: { x: number; y: number }[]) {
    let d = `M ${pts[0]!.x} ${pts[0]!.y}`
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)]!
      const p1 = pts[i]!
      const p2 = pts[i + 1]!
      const p3 = pts[Math.min(pts.length - 1, i + 2)]!

      const cp1x = Math.round((p1.x + (p2.x - p0.x) / 6) * 10) / 10
      const cp1y = Math.round((p1.y + (p2.y - p0.y) / 6) * 10) / 10
      const cp2x = Math.round((p2.x - (p3.x - p1.x) / 6) * 10) / 10
      const cp2y = Math.round((p2.y - (p3.y - p1.y) / 6) * 10) / 10

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
    }
    return d
  }

  const topStroke = spline(topPts)
  const bottomStroke = spline(bottomPts)

  // Form closed polygon for lush area fill
  const revBottom = [...bottomPts].reverse()
  let areaPath = topStroke
  areaPath += ` L ${revBottom[0]!.x} ${revBottom[0]!.y}`
  for (let i = 0; i < revBottom.length - 1; i++) {
    const p0 = revBottom[Math.max(0, i - 1)]!
    const p1 = revBottom[i]!
    const p2 = revBottom[i + 1]!
    const p3 = revBottom[Math.min(revBottom.length - 1, i + 2)]!

    const cp1x = Math.round((p1.x + (p2.x - p0.x) / 6) * 10) / 10
    const cp1y = Math.round((p1.y + (p2.y - p0.y) / 6) * 10) / 10
    const cp2x = Math.round((p2.x - (p3.x - p1.x) / 6) * 10) / 10
    const cp2y = Math.round((p2.y - (p3.y - p1.y) / 6) * 10) / 10

    areaPath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
  }
  areaPath += ' Z'

  return { topStroke, bottomStroke, areaPath }
}

const rawWaveData = computed(() => generateSmoothWavePaths(rawPeaks))
const masterWaveData = computed(() => generateSmoothWavePaths(masterPeaks))

const playProgress = computed(() => {
  if (!duration.value || duration.value <= 0) return 0
  return (currentTime.value / duration.value) * 100
})

watch(isGlobalAudioPlaying, (globalPlaying) => {
  if (globalPlaying && isPlaying.value) {
    rawAudio?.pause()
    masterAudio?.pause()
    isPlaying.value = false
  }
})

function formatTime(sec: number) {
  if (isNaN(sec) || !isFinite(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

function updateAudioBalance() {
  if (!rawAudio || !masterAudio) return
  // MUTUALLY EXCLUSIVE PLAYBACK:
  // Never play both audio tracks simultaneously. Only one track outputs sound at any millisecond.
  if (activeChannel.value === 'raw') {
    rawAudio.volume = 1
    masterAudio.volume = 0
  } else {
    rawAudio.volume = 0
    masterAudio.volume = 1
  }
}

function selectChannel(channel: 'raw' | 'master') {
  activeChannel.value = channel
  // Move fader gracefully to the selected channel's visual focus area
  if (channel === 'raw') {
    splitPosition.value = 20
  } else {
    splitPosition.value = 80
  }
  updateAudioBalance()
}

function toggleSplit5050() {
  if (splitPosition.value !== 50) {
    splitPosition.value = 50
  } else {
    // If already at 50/50, toggles between Raw and Master cleanly for direct A/B testing
    activeChannel.value = activeChannel.value === 'master' ? 'raw' : 'master'
  }
  updateAudioBalance()
}

function initAudios() {
  if (!import.meta.client || rawAudio) return

  rawAudio = new Audio(props.rawSrc)
  masterAudio = new Audio(props.masterSrc)

  rawAudio.preload = 'metadata'
  masterAudio.preload = 'metadata'

  masterAudio.addEventListener('loadedmetadata', () => {
    if (masterAudio?.duration) {
      duration.value = masterAudio.duration
    }
  })

  masterAudio.addEventListener('timeupdate', () => {
    if (masterAudio) {
      currentTime.value = masterAudio.currentTime
      // Prevent clock drift between raw and master tracks
      if (rawAudio && Math.abs(rawAudio.currentTime - masterAudio.currentTime) > 0.04) {
        rawAudio.currentTime = masterAudio.currentTime
      }
    }
  })

  masterAudio.addEventListener('ended', () => {
    isPlaying.value = false
    currentTime.value = 0
    if (rawAudio) rawAudio.currentTime = 0
  })

  updateAudioBalance()
}

async function togglePlay() {
  initAudios()
  if (!rawAudio || !masterAudio) return

  if (isPlaying.value) {
    rawAudio.pause()
    masterAudio.pause()
    isPlaying.value = false
  } else {
    try {
      // Pause global audio engine if running
      pauseGlobalAudio()

      // Sync timecode precisely
      rawAudio.currentTime = masterAudio.currentTime
      updateAudioBalance()
      await Promise.all([rawAudio.play(), masterAudio.play()])
      isPlaying.value = true

      try {
        const { trackAudioPlay } = useAnalytics()
        trackAudioPlay(`Audio Compare: ${activeChannel.value}`)
      } catch {}
    } catch (e) {
      console.warn('[XKAudioCompare] Playback error:', e)
    }
  }
}

function handlePointerMove(clientX: number) {
  if (!stageRef.value) return
  const rect = stageRef.value.getBoundingClientRect()
  const offsetX = clientX - rect.left
  const percent = Math.max(0, Math.min(100, (offsetX / rect.width) * 100))
  splitPosition.value = Math.round(percent)

  // As the fader crosses the 50% threshold, cleanly flip active audio channel without overlap
  if (splitPosition.value < 50) {
    activeChannel.value = 'raw'
  } else if (splitPosition.value > 50) {
    activeChannel.value = 'master'
  }
  updateAudioBalance()
}

function startDrag(e: MouseEvent) {
  isDragging.value = true
  handlePointerMove(e.clientX)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', stopDrag)
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging.value) return
  handlePointerMove(e.clientX)
}

function stopDrag() {
  isDragging.value = false
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', stopDrag)
}

function startTouchDrag(e: TouchEvent) {
  if (e.touches[0]) {
    isDragging.value = true
    handlePointerMove(e.touches[0].clientX)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', stopTouchDrag)
    window.addEventListener('touchcancel', stopTouchDrag)
  }
}

function onTouchMove(e: TouchEvent) {
  if (!isDragging.value || !e.touches[0]) return
  handlePointerMove(e.touches[0].clientX)
}

function stopTouchDrag() {
  isDragging.value = false
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend', stopTouchDrag)
  window.removeEventListener('touchcancel', stopTouchDrag)
}

onUnmounted(() => {
  if (rawAudio) {
    rawAudio.pause()
    rawAudio = null
  }
  if (masterAudio) {
    masterAudio.pause()
    masterAudio = null
  }
  stopDrag()
  stopTouchDrag()
})
</script>

<style scoped>
.xk-audio-compare {
  background: var(--bg-surface-1);
  border: 1px solid var(--border-subtle);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.svg-defs-hidden {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
}

/* TOP STATUS BAR */
.console-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid var(--border-subtle);
}

.console-branding {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #64748b;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.live-dot.active {
  background: #0d9488;
  box-shadow: 0 0 10px rgba(13, 148, 136, 0.8);
}

.channel-indicator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.75rem;
}

.mode-tag-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0.2rem 0.5rem;
  color: var(--text-subtle);
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-tag-btn:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.04);
}

.mode-tag-btn.is-active {
  color: #fbbf24;
  font-weight: 700;
  border-color: rgba(251, 191, 36, 0.3);
  background: rgba(251, 191, 36, 0.08);
}

.channel-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.5;
}

.mode-tag-btn.is-active .channel-dot.raw {
  background: #2dd4bf;
  box-shadow: 0 0 6px #2dd4bf;
  opacity: 1;
}

.mode-tag-btn.is-active .channel-dot.master {
  background: #fbbf24;
  box-shadow: 0 0 6px #fbbf24;
  opacity: 1;
}

.cross-divider {
  color: var(--border-hover);
  font-size: 0.8rem;
}

/* COMPARISON STAGE */
.comparison-stage {
  position: relative;
  height: 250px;
  background: radial-gradient(circle at 50% 50%, #0d121c 0%, #06080d 100%);
  cursor: ew-resize;
  user-select: none;
  overflow: hidden;
  touch-action: none;
}

/* ANALOG STUDIO GRID LINES */
.studio-grid-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2.2rem 1.5rem 2.8rem;
  opacity: 0.35;
}

.grid-line {
  position: relative;
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
}

.grid-line.line-plus3 {
  background: rgba(244, 63, 94, 0.15);
}

.grid-line.line-0db {
  background: linear-gradient(90deg, rgba(45, 212, 191, 0.2) 0%, rgba(251, 191, 36, 0.35) 50%, rgba(217, 119, 6, 0.2) 100%);
}

.grid-tag {
  position: absolute;
  right: 0;
  top: -9px;
  font-family: ui-monospace, monospace;
  font-size: 0.5625rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.22);
  letter-spacing: 0.05em;
}

/* WAVEFORM LAYERS */
.waveform-layer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: opacity 0.3s ease;
}

.raw-layer {
  background: linear-gradient(180deg, rgba(13, 148, 136, 0.04) 0%, rgba(6, 8, 13, 0.8) 100%);
}

.master-layer {
  background: linear-gradient(180deg, rgba(217, 119, 6, 0.08) 0%, rgba(6, 8, 13, 0.8) 100%);
}

.waveform-svg-container {
  position: absolute;
  top: 1.5rem;
  bottom: 2.5rem;
  left: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 3;
}

.waveform-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* RAW SVG PATH STYLES */
.raw-wave-svg .wave-area.unplayed {
  fill: url(#rawAreaGrad);
  opacity: 0.4;
}

.raw-wave-svg .wave-crest.unplayed {
  fill: none;
  stroke: rgba(45, 212, 191, 0.35);
  stroke-width: 1.8;
  stroke-linecap: round;
}

.raw-wave-svg .wave-reflection.unplayed {
  fill: none;
  stroke: rgba(20, 184, 166, 0.18);
  stroke-width: 1.2;
}

.raw-wave-svg .wave-area.played {
  fill: url(#rawPlayedAreaGrad);
  opacity: 0.9;
}

.raw-wave-svg .wave-crest.played {
  fill: none;
  stroke: #2dd4bf;
  stroke-width: 2.8;
  stroke-linecap: round;
  filter: drop-shadow(0 0 8px rgba(45, 212, 191, 0.85));
}

.raw-wave-svg .wave-reflection.played {
  fill: none;
  stroke: rgba(45, 212, 191, 0.45);
  stroke-width: 1.5;
}

/* MASTER SVG PATH STYLES */
.master-wave-svg .wave-area.unplayed {
  fill: url(#masterAreaGrad);
  opacity: 0.42;
}

.master-wave-svg .wave-crest.unplayed {
  fill: none;
  stroke: rgba(251, 191, 36, 0.4);
  stroke-width: 2;
  stroke-linecap: round;
}

.master-wave-svg .wave-reflection.unplayed {
  fill: none;
  stroke: rgba(217, 119, 6, 0.22);
  stroke-width: 1.2;
}

.master-wave-svg .wave-area.played {
  fill: url(#masterPlayedAreaGrad);
  opacity: 0.95;
}

.master-wave-svg .wave-crest.played {
  fill: none;
  stroke: #fbbf24;
  stroke-width: 3.2;
  stroke-linecap: round;
  filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.9)) drop-shadow(0 0 20px rgba(245, 158, 11, 0.45));
}

.master-wave-svg .wave-reflection.played {
  fill: none;
  stroke: rgba(251, 191, 36, 0.6);
  stroke-width: 1.6;
}

.pulse-live {
  animation: crestBreathe 2s infinite ease-in-out;
}

.pulse-live-master {
  animation: crestBreatheMaster 1.8s infinite ease-in-out;
}

@keyframes crestBreathe {
  0%, 100% { filter: drop-shadow(0 0 6px rgba(45, 212, 191, 0.7)); }
  50% { filter: drop-shadow(0 0 12px rgba(45, 212, 191, 1)); }
}

@keyframes crestBreatheMaster {
  0%, 100% { filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.8)); }
  50% { filter: drop-shadow(0 0 16px rgba(251, 191, 36, 1)) drop-shadow(0 0 24px rgba(245, 158, 11, 0.6)); }
}

/* ANALOG dB SCALE TICKS */
.fader-scale-ticks {
  position: absolute;
  top: 0.85rem;
  left: 1.5rem;
  right: 1.5rem;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 5;
}

.scale-tick {
  font-family: ui-monospace, SFMono-Regular, monospace;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.25);
}

.scale-tick.center-0db {
  color: #fbbf24;
}

/* LAYER BADGES */
.layer-badge {
  position: absolute;
  bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  cursor: pointer;
  z-index: 4;
  transition: opacity 0.2s ease;
}

.left-badge {
  left: 1.5rem;
}

.right-badge {
  right: 1.5rem;
  text-align: right;
  align-items: flex-end;
}

.badge-title {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.05em;
}

.badge-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #475569;
  transition: all 0.25s ease;
}

.badge-status-dot.raw.is-lit {
  background: #2dd4bf;
  box-shadow: 0 0 10px #2dd4bf;
}

.badge-status-dot.master.is-lit {
  background: #fbbf24;
  box-shadow: 0 0 10px #fbbf24;
}

.badge-desc {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

/* REALTIME PLAYHEAD TRACKER */
.playhead-tracker {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 7;
  transition: left 0.1s linear;
}

.playhead-needle {
  position: absolute;
  top: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 8px #ffffff, 0 0 16px rgba(251, 191, 36, 0.8);
}

.playhead-beam {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.85) 0%, rgba(251, 191, 36, 0.6) 50%, rgba(45, 212, 191, 0.4) 100%);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
}

/* DRAGGABLE FADER */
.draggable-fader {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3px;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 10;
}

.fader-line {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #d4af37 0%, #fbbf24 50%, #d4af37 100%);
  box-shadow: 0 0 14px rgba(251, 191, 36, 0.85);
}

.fader-knob {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 82px;
  height: 54px;
  border-radius: 8px;
  background: linear-gradient(180deg, #1f2430 0%, #11141c 50%, #0d0f15 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.45);
  border-bottom: 2px solid #000000;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.85), 0 0 18px rgba(251, 191, 36, 0.35);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fbbf24;
  gap: 2px;
  cursor: grab;
  pointer-events: auto;
}

.fader-knob:active {
  cursor: grabbing;
}

.knob-led {
  width: 14px;
  height: 3px;
  border-radius: 2px;
  background: #64748b;
  margin-bottom: 1px;
  transition: all 0.2s ease;
}

.knob-led.raw {
  background: #2dd4bf;
  box-shadow: 0 0 8px #2dd4bf;
}

.knob-led.master {
  background: #fbbf24;
  box-shadow: 0 0 8px #fbbf24;
}

.knob-ridges {
  display: flex;
  gap: 3px;
  margin-bottom: 2px;
}

.knob-ridges span {
  width: 12px;
  height: 2px;
  background: rgba(251, 191, 36, 0.55);
  border-radius: 1px;
}

.fader-label {
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #ffffff;
}

.fader-lufs-live {
  font-size: 0.58rem;
  color: #fbbf24;
  font-weight: 700;
}

/* CONTROLS BAR */
.console-controls-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  background: rgba(255, 255, 255, 0.015);
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
  gap: 1rem;
}

.playback-actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.btn-play-compare {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.4rem;
  background: var(--text-primary);
  color: var(--bg-canvas);
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease;
}

.btn-play-compare:hover {
  background: #ffffff;
  transform: scale(1.02);
}

.channel-quick-buttons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.channel-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 0.95rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.channel-btn:hover {
  background: rgba(255, 255, 255, 0.09);
  color: var(--text-primary);
}

.channel-btn.active {
  background: rgba(217, 119, 6, 0.15);
  border-color: rgba(251, 191, 36, 0.45);
  color: #fbbf24;
  box-shadow: 0 0 12px rgba(251, 191, 36, 0.15);
}

.btn-split {
  position: relative;
}

.active-badge {
  display: inline-block;
  font-size: 0.65rem;
  padding: 0.1rem 0.4rem;
  border-radius: 9999px;
  margin-left: 0.25rem;
  font-weight: 700;
}

.active-badge.raw {
  background: rgba(45, 212, 191, 0.2);
  color: #2dd4bf;
}

.active-badge.master {
  background: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
}

.timecode-box {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* ENGINEER NOTES */
.engineer-notes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
}

.note-card {
  display: flex;
  gap: 0.9rem;
}

.note-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d97706;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.note-content strong {
  display: block;
  font-size: 0.875rem;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
}

.note-content p {
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--text-secondary);
}

@media (max-width: 900px) {
  .engineer-notes-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .console-top-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .console-controls-bar {
    flex-direction: column;
    align-items: flex-start;
  }
  .channel-quick-buttons {
    width: 100%;
    flex-wrap: wrap;
  }
  .channel-btn {
    flex: 1;
    min-width: 120px;
    justify-content: center;
    padding: 0.5rem 0.4rem;
    font-size: 0.75rem;
  }
  .fader-knob {
    width: 68px;
    height: 44px;
  }
}
</style>
