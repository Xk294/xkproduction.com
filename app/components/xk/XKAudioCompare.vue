<template>
  <div class="xk-audio-compare matte-card" role="region" aria-label="Console so sánh âm thanh Thô và Master">
    <!-- HEADER BAR: STUDIO HARDWARE METADATA -->
    <div class="console-top-bar">
      <div class="console-branding">
        <span class="live-dot" :class="{ active: isPlaying }"></span>
        <span class="text-meta-mono">XK CONSOLE · AB-COMPARISON ENGINE V2</span>
      </div>
      <div class="channel-indicator">
        <span class="mode-tag" :class="{ 'is-active': activeChannel === 'raw' }">CHANNEL A: RAW TAKE</span>
        <span class="cross-divider">⇄</span>
        <span class="mode-tag" :class="{ 'is-active': activeChannel === 'master' }">CHANNEL B: MASTERED</span>
      </div>
    </div>

    <!-- MAIN INTERACTIVE SLIDER CANVAS -->
    <div
      class="comparison-stage"
      ref="stageRef"
      @mousedown="startDrag"
      @touchstart="startTouchDrag"
    >
      <!-- WAVEFORM RAW BACKGROUND (LEFT) -->
      <div class="waveform-layer raw-layer">
        <div class="layer-content">
          <div class="wave-graphic raw-wave">
            <span v-for="n in 36" :key="'raw-'+n" class="wave-stick" :style="{ height: `${Math.sin(n * 0.4) * 20 + 25}%` }"></span>
          </div>
          <div class="layer-badge left-badge">
            <span class="badge-title">BẢN THU MỘC (RAW)</span>
            <span class="badge-desc">Chưa qua xử lý EQ, nén dải tần hay định hình không gian</span>
          </div>
        </div>
      </div>

      <!-- WAVEFORM MASTERED LAYER (RIGHT CLIP-PATH) -->
      <div class="waveform-layer master-layer" :style="{ clipPath: `inset(0 0 0 ${splitPosition}%)` }">
        <div class="layer-content">
          <div class="wave-graphic master-wave">
            <span v-for="n in 36" :key="'mst-'+n" class="wave-stick mastered" :style="{ height: `${Math.sin(n * 0.4) * 35 + 48}%` }"></span>
          </div>
          <div class="layer-badge right-badge">
            <span class="badge-title">MASTER CHUẨN SPOTIFY</span>
            <span class="badge-desc">-14 LUFS · Dải trầm sâu sắc · Không gian Stereo 3D</span>
          </div>
        </div>
      </div>

      <!-- INTERACTIVE DRAGGABLE DIVIDER FADER -->
      <div class="draggable-fader" :style="{ left: `${splitPosition}%` }">
        <div class="fader-line"></div>
        <div class="fader-knob" title="Kéo ngang để so sánh">
          <i class="fa-solid fa-arrows-left-right"></i>
          <span class="fader-label text-meta-mono">{{ splitPosition < 50 ? 'RAW' : 'MASTER' }}</span>
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
          :aria-label="isPlaying ? 'Tạm dừng so sánh' : 'Phát so sánh âm thanh'"
        >
          <i :class="isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'"></i>
          <span>{{ isPlaying ? 'TẠM DỪNG' : 'NGHE SO SÁNH TRỰC DIỆN' }}</span>
        </button>

        <!-- DIRECT CHANNEL TOGGLE BUTTONS -->
        <div class="channel-quick-buttons">
          <button
            type="button"
            class="channel-btn"
            :class="{ active: splitPosition <= 10 }"
            @click="setSplit(0)"
          >
            Nghe Bản Mộc
          </button>
          <button
            type="button"
            class="channel-btn"
            :class="{ active: splitPosition >= 90 }"
            @click="setSplit(100)"
          >
            Nghe Bản Master
          </button>
          <button
            type="button"
            class="channel-btn"
            :class="{ active: splitPosition > 40 && splitPosition < 60 }"
            @click="setSplit(50)"
          >
            Chia Đôi (50/50)
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
          <strong>1. Kiểm Soát Dải Trầm (Low-End Dynamics)</strong>
          <p>Thu gọn dải tần dưới 35Hz và nén đa dải (multiband compression) 60-120Hz giúp tiếng kick và bass gọn gàng, không bị ù rền.</p>
        </div>
      </div>

      <div class="note-card">
        <div class="note-icon"><i class="fa-solid fa-microphone"></i></div>
        <div class="note-content">
          <strong>2. Vocal Presence & Nhạc Cụ 3D</strong>
          <p>Tăng cường độ sáng tự nhiên ở dải 3.5kHz và 12kHz, đưa giọng ca lên phía trước và mở rộng không gian stereo sang hai bên tai.</p>
        </div>
      </div>

      <div class="note-card">
        <div class="note-icon"><i class="fa-solid fa-sliders"></i></div>
        <div class="note-content">
          <strong>3. Chuẩn Âm Lượng Số (-14 LUFS)</strong>
          <p>Mastering bảo toàn dynamic range nguyên bản, kiểm tra triệt để lỗi phase và độ tương thích mono trên loa điện thoại.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

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
const isDragging = ref(false)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

let rawAudio: HTMLAudioElement | null = null
let masterAudio: HTMLAudioElement | null = null

watch(isGlobalAudioPlaying, (globalPlaying) => {
  if (globalPlaying && isPlaying.value) {
    rawAudio?.pause()
    masterAudio?.pause()
    isPlaying.value = false
  }
})

const activeChannel = computed(() => {
  if (splitPosition.value < 45) return 'raw'
  return 'master'
})

function formatTime(sec: number) {
  if (isNaN(sec) || !isFinite(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

function updateAudioBalance() {
  if (!rawAudio || !masterAudio) return
  // Seamless crossfade based on fader position
  // 0% = 100% raw, 0% master
  // 100% = 0% raw, 100% master
  const ratio = splitPosition.value / 100
  rawAudio.volume = Math.cos(ratio * 0.5 * Math.PI)
  masterAudio.volume = Math.sin(ratio * 0.5 * Math.PI)
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
    }
  })

  masterAudio.addEventListener('ended', () => {
    isPlaying.value = false
    currentTime.value = 0
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

function setSplit(val: number) {
  splitPosition.value = val
  updateAudioBalance()
}

function handlePointerMove(clientX: number) {
  if (!stageRef.value) return
  const rect = stageRef.value.getBoundingClientRect()
  const offsetX = clientX - rect.left
  const percent = Math.max(0, Math.min(100, (offsetX / rect.width) * 100))
  splitPosition.value = Math.round(percent)
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
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
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
  font-family: ui-monospace, monospace;
  font-size: 0.75rem;
}

.mode-tag {
  color: var(--text-subtle);
  transition: color 0.2s ease;
}

.mode-tag.is-active {
  color: #fbbf24;
  font-weight: 700;
}

.cross-divider {
  color: var(--border-hover);
}

/* COMPARISON STAGE */
.comparison-stage {
  position: relative;
  height: 240px;
  background: #090b10;
  cursor: ew-resize;
  user-select: none;
  overflow: hidden;
  touch-action: none;
}

.waveform-layer {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.raw-layer {
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.6) 0%, rgba(9, 11, 16, 0.95) 100%);
}

.master-layer {
  background: linear-gradient(180deg, rgba(217, 119, 6, 0.08) 0%, rgba(9, 11, 16, 0.95) 100%);
}

.layer-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  position: relative;
}

.wave-graphic {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  height: 100px;
  margin-top: auto;
  margin-bottom: auto;
  padding: 0 1rem;
}

.wave-stick {
  flex: 1;
  background: rgba(148, 163, 184, 0.35);
  border-radius: 2px;
  transition: height 0.2s ease;
}

.wave-stick.mastered {
  background: linear-gradient(180deg, #d97706, #0d9488);
  box-shadow: 0 0 6px rgba(217, 119, 6, 0.3);
}

.layer-badge {
  position: absolute;
  bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.left-badge {
  left: 1.5rem;
}

.right-badge {
  right: 1.5rem;
  text-align: right;
}

.badge-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.05em;
}

.badge-desc {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

/* DRAGGABLE FADER */
.draggable-fader {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 10;
}

.fader-line {
  width: 100%;
  height: 100%;
  background: #fbbf24;
  box-shadow: 0 0 10px rgba(251, 191, 36, 0.6);
}

.fader-knob {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72px;
  height: 38px;
  border-radius: 20px;
  background: #161920;
  border: 2px solid #fbbf24;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.8), 0 0 12px rgba(251, 191, 36, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fbbf24;
  gap: 2px;
}

.fader-knob i {
  font-size: 0.75rem;
}

.fader-label {
  font-size: 0.625rem;
  font-weight: 800;
  color: #ffffff;
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
}

.channel-btn {
  padding: 0.5rem 0.9rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.15s ease;
}

.channel-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
}

.channel-btn.active {
  background: rgba(217, 119, 6, 0.15);
  border-color: rgba(217, 119, 6, 0.4);
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
    justify-content: space-between;
  }
  .channel-btn {
    flex: 1;
    text-align: center;
    padding: 0.5rem 0.4rem;
    font-size: 0.75rem;
  }
  .fader-knob {
    width: 60px;
    height: 32px;
  }
}
</style>
