<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    rawSrc?: string
    mixedSrc?: string
    rawLabel?: string
    mixedLabel?: string
    trackTitle?: string
    artistName?: string
  }>(),
  {
    rawSrc: '/product-audio-demo/pop-rnb-1-Gm-raw.mp3',
    mixedSrc: '/product-audio-demo/pop-rnb-1-Gm.102.mp3',
    rawLabel: 'Bản Thu Thô (Chưa Mix)',
    mixedLabel: 'Bản Master Chuẩn Quốc Tế',
    trackTitle: 'Pop R&B Special Demo',
    artistName: 'Sản xuất bởi XKProduction'
  }
)

const activeChannel = ref<'raw' | 'mixed'>('mixed')
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(0.9)

let rawAudio: HTMLAudioElement | null = null
let mixedAudio: HTMLAudioElement | null = null
let currentAudio: HTMLAudioElement | null = null

const isSameSource = computed(() => props.rawSrc === props.mixedSrc)

const formatTime = (time: number) => {
  if (isNaN(time) || !isFinite(time)) return '0:00'
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const updateProgress = () => {
  if (currentAudio) {
    currentTime.value = currentAudio.currentTime
  }
}

const setupAudio = () => {
  if (!import.meta.client) return

  rawAudio = new Audio(props.rawSrc)
  mixedAudio = new Audio(props.mixedSrc)

  const list = [rawAudio, mixedAudio]
  list.forEach((audio, idx) => {
    audio.preload = 'metadata'
    audio.volume = volume.value
    audio.addEventListener('timeupdate', () => {
      if (currentAudio === audio) updateProgress()
    })
    audio.addEventListener('loadedmetadata', () => {
      if (audio.duration && (!duration.value || idx === 1)) {
        duration.value = audio.duration
      }
    })
    audio.addEventListener('ended', () => {
      isPlaying.value = false
      currentTime.value = 0
    })
  })

  currentAudio = activeChannel.value === 'raw' ? rawAudio : mixedAudio
}

const togglePlay = async () => {
  if (!currentAudio) setupAudio()
  if (!currentAudio) return

  if (isPlaying.value) {
    currentAudio.pause()
    isPlaying.value = false
  } else {
    try {
      await currentAudio.play()
      isPlaying.value = true
      try {
        const { trackAudioPlay } = useAnalytics()
        trackAudioPlay(`${props.trackTitle || 'Audio Compare'} (${activeChannel.value})`)
      } catch {}
    } catch (e) {
      console.warn('[StudioAudioCompare] Lỗi phát nhạc:', e)
    }
  }
}

const switchChannel = (channel: 'raw' | 'mixed') => {
  if (activeChannel.value === channel) return
  const wasPlaying = isPlaying.value
  const targetTime = currentAudio ? currentAudio.currentTime : 0

  if (currentAudio) {
    currentAudio.pause()
  }

  activeChannel.value = channel
  currentAudio = channel === 'raw' ? rawAudio : mixedAudio

  if (currentAudio) {
    currentAudio.currentTime = targetTime
    if (wasPlaying) {
      currentAudio.play().catch(() => {})
    }
  }
}

const seek = (e: Event) => {
  const target = e.target as HTMLInputElement
  const time = parseFloat(target.value)
  if (currentAudio) {
    currentAudio.currentTime = time
    currentTime.value = time
  }
  if (rawAudio) rawAudio.currentTime = time
  if (mixedAudio) mixedAudio.currentTime = time
}

onMounted(() => {
  setupAudio()
})

onUnmounted(() => {
  if (rawAudio) {
    rawAudio.pause()
    rawAudio.src = ''
    rawAudio = null
  }
  if (mixedAudio) {
    mixedAudio.pause()
    mixedAudio.src = ''
    mixedAudio = null
  }
})
</script>

<template>
  <div class="studio-compare-container">
    <!-- Top Console Header Bar -->
    <div class="console-rack-header">
      <div class="console-screws left">
        <span class="screw"></span>
        <span class="screw"></span>
      </div>
      <div class="console-identity">
        <span class="brand-badge">XK-4000 PRO MASTERING CONSOLE</span>
        <div class="console-status-led" :class="{ 'is-active': isPlaying }">
          <span class="status-indicator"></span>
          <span>{{ isPlaying ? 'PLAYBACK ACTIVE · 96kHz / 24-bit' : 'MONITOR READY' }}</span>
        </div>
      </div>
      <div class="console-screws right">
        <span class="screw"></span>
        <span class="screw"></span>
      </div>
    </div>

    <!-- Main Console Body -->
    <div class="console-rack-body">
      <!-- Title & Track Info -->
      <div class="track-header-row">
        <div class="track-info">
          <div class="track-title-wrap">
            <span class="track-kicker">DEMO A/B SO SÁNH TRỰC DIỆN</span>
            <h4 class="track-title">{{ trackTitle }}</h4>
          </div>
          <span class="track-artist">{{ artistName }}</span>
        </div>

        <!-- A/B Physical Switcher -->
        <div class="ab-switch-group" role="group" aria-label="Kênh so sánh A/B">
          <button
            type="button"
            class="ab-btn"
            :class="{ active: activeChannel === 'raw' }"
            @click="switchChannel('raw')"
          >
            <span class="ab-marker">A</span>
            <span class="ab-text">THU MỘC</span>
          </button>
          <button
            type="button"
            class="ab-btn"
            :class="{ active: activeChannel === 'mixed' }"
            @click="switchChannel('mixed')"
          >
            <span class="ab-marker">B</span>
            <span class="ab-text">BẢN MASTER</span>
            <span class="master-star"><i class="fa-solid fa-sparkles"></i></span>
          </button>
        </div>
      </div>

      <!-- Live Channel Feedback Banner -->
      <div class="channel-feedback-banner" :class="activeChannel">
        <div class="banner-badge">
          <i :class="activeChannel === 'raw' ? 'fa-solid fa-microphone' : 'fa-solid fa-sliders'"></i>
          <strong>{{ activeChannel === 'raw' ? rawLabel : mixedLabel }}</strong>
        </div>
        <p class="banner-explain">
          {{ activeChannel === 'raw' 
            ? 'Âm thanh thô sau khi thu mic: Giọng chưa tune phô, thiếu độ dày không gian, âm trầm mỏng và dải cao chát.' 
            : 'Sau xử lý độc quyền tại XKProduction: Vocal đã tune ngọt tự nhiên, dải bass đầm ấm, stereo tách bạch, âm lượng tối đa chuẩn Spotify/Apple Music.' 
          }}
        </p>
      </div>

      <!-- Visual Audio Spectrum Display -->
      <div class="spectrum-visualizer-card" :class="{ playing: isPlaying, mastered: activeChannel === 'mixed' }">
        <div class="spectrum-bars">
          <span
            v-for="i in 36"
            :key="i"
            class="spectrum-bar"
            :style="{
              '--bar-height': `${Math.sin(i * 0.25) * 40 + 55}%`,
              '--bar-delay': `${(i % 12) * 0.08}s`
            }"
          ></span>
        </div>

        <!-- Hardware Mastering Knobs / Indicators -->
        <div class="mastering-indicators-row">
          <div class="indicator-cell" :class="{ boosted: activeChannel === 'mixed' && isPlaying }">
            <span class="cell-label">STEREO WIDTH</span>
            <span class="cell-val">{{ activeChannel === 'mixed' ? '142% IMMERSIVE' : '100% MONO/NARROW' }}</span>
          </div>
          <div class="indicator-cell" :class="{ boosted: activeChannel === 'mixed' && isPlaying }">
            <span class="cell-label">LOUDNESS (LUFS)</span>
            <span class="cell-val">{{ activeChannel === 'mixed' ? '-14.0 LUFS (CHUẨN)' : '-24.8 LUFS (YẾU)' }}</span>
          </div>
          <div class="indicator-cell" :class="{ boosted: activeChannel === 'mixed' && isPlaying }">
            <span class="cell-label">AIR PRESENCE</span>
            <span class="cell-val">{{ activeChannel === 'mixed' ? 'CRISP & WARM' : 'DRY & FLAT' }}</span>
          </div>
        </div>
      </div>

      <!-- Player Controls Bar -->
      <div class="player-controls-strip">
        <button
          type="button"
          class="master-play-btn"
          :class="{ playing: isPlaying }"
          :aria-label="isPlaying ? 'Tạm dừng' : 'Phát bản so sánh'"
          @click="togglePlay"
        >
          <i class="fa-solid" :class="isPlaying ? 'fa-pause' : 'fa-play'"></i>
        </button>

        <div class="track-timeline">
          <div class="time-readout">
            <span class="current-time">{{ formatTime(currentTime) }}</span>
            <span class="time-sep">/</span>
            <span class="total-duration">{{ formatTime(duration) }}</span>
          </div>

          <div class="seek-track-wrapper">
            <input
              type="range"
              class="seek-slider"
              min="0"
              :max="duration || 100"
              step="0.1"
              :value="currentTime"
              @input="seek"
              aria-label="Thanh tua âm thanh"
            />
          </div>
        </div>

        <div class="channel-quick-pill" :class="activeChannel">
          <span>KÊNH {{ activeChannel === 'raw' ? 'A (THÔ)' : 'B (MASTER)' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.studio-compare-container {
  background: #090c14;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 128, 255, 0.06);
  overflow: hidden;
  position: relative;
  margin: 1.5rem 0;
}

/* Console Header */
.console-rack-header {
  background: linear-gradient(180deg, #161b26 0%, #0d121c 100%);
  padding: 0.8rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.console-screws {
  display: flex;
  gap: 0.5rem;
}

.screw {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #2a3142;
  border: 1px solid #141720;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.2);
  display: block;
}

.console-identity {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.brand-badge {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: #94a3b8;
  font-family: 'JetBrains Mono', monospace, sans-serif;
}

.console-status-led {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.5px;
}

.console-status-led.is-active {
  color: var(--teal);
}

.status-indicator {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #334155;
  transition: all 0.3s ease;
}

.console-status-led.is-active .status-indicator {
  background: var(--teal);
  box-shadow: 0 0 10px var(--teal);
}

/* Console Body */
.console-rack-body {
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
}

.track-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.track-kicker {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: var(--accent);
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.2rem;
}

.track-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
}

.track-artist {
  font-size: 0.85rem;
  color: #94a3b8;
}

/* Physical A/B Switch */
.ab-switch-group {
  display: inline-flex;
  background: #06080d;
  padding: 4px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.ab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.1rem;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: #64748b;
  font-weight: 800;
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.25s var(--ease-out-expo);
  letter-spacing: 0.5px;
}

.ab-marker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  font-size: 0.72rem;
  font-weight: 900;
}

.ab-btn.active {
  background: #141926;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.ab-btn:last-child.active {
  background: linear-gradient(135deg, rgba(0, 128, 255, 0.3) 0%, rgba(0, 229, 163, 0.3) 100%);
  color: #fff;
  border: 1px solid rgba(0, 229, 163, 0.4);
}

.ab-btn.active .ab-marker {
  background: var(--primary);
  color: #fff;
}

.ab-btn:last-child.active .ab-marker {
  background: var(--teal);
  color: #06080d;
}

.master-star {
  color: #fbbf24;
  font-size: 0.75rem;
  margin-left: 2px;
}

/* Feedback Banner */
.channel-feedback-banner {
  padding: 0.9rem 1.25rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  transition: all 0.3s ease;
}

.channel-feedback-banner.raw {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.channel-feedback-banner.mixed {
  background: linear-gradient(90deg, rgba(0, 128, 255, 0.08) 0%, rgba(0, 229, 163, 0.08) 100%);
  border: 1px solid rgba(0, 229, 163, 0.25);
}

.banner-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.channel-feedback-banner.raw .banner-badge {
  color: #94a3b8;
}

.channel-feedback-banner.mixed .banner-badge {
  color: var(--teal);
}

.banner-explain {
  font-size: 0.84rem;
  color: #cbd5e1;
  line-height: 1.5;
  margin: 0;
}

/* Spectrum Visualizer Card */
.spectrum-visualizer-card {
  background: #040609;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 1.2rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.spectrum-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 52px;
  gap: 3px;
  padding: 0 4px;
}

.spectrum-bar {
  flex: 1;
  height: 6px;
  background: #1e293b;
  border-radius: 3px;
  transition: height 0.15s ease, background-color 0.3s ease;
}

.spectrum-visualizer-card.playing .spectrum-bar {
  animation: spectrumBounce 0.8s ease-in-out infinite alternate;
  animation-delay: var(--bar-delay);
  background: linear-gradient(180deg, var(--primary) 0%, #0284c7 100%);
}

.spectrum-visualizer-card.playing.mastered .spectrum-bar {
  background: linear-gradient(180deg, #fbbf24 0%, var(--teal) 50%, #0080ff 100%);
}

@keyframes spectrumBounce {
  0% { height: 8%; opacity: 0.4; }
  100% { height: var(--bar-height); opacity: 1; }
}

/* Mastering Indicators */
.mastering-indicators-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 0.85rem;
}

.indicator-cell {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  padding: 0.55rem 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  transition: all 0.3s ease;
}

.indicator-cell.boosted {
  border-color: rgba(0, 229, 163, 0.3);
  background: rgba(0, 229, 163, 0.04);
}

.cell-label {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: #64748b;
}

.cell-val {
  font-size: 0.76rem;
  font-weight: 800;
  color: #94a3b8;
  font-family: 'JetBrains Mono', monospace, sans-serif;
}

.indicator-cell.boosted .cell-val {
  color: var(--teal);
}

/* Player Controls Strip */
.player-controls-strip {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: #0e131d;
  padding: 0.9rem 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.master-play-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0080ff 0%, #00e5a3 100%);
  border: none;
  color: #fff;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 128, 255, 0.4);
  transition: all 0.25s var(--ease-out-expo);
  flex-shrink: 0;
}

.master-play-btn:hover {
  transform: scale(1.06);
  box-shadow: 0 8px 24px rgba(0, 128, 255, 0.55);
}

.master-play-btn.playing {
  background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.4);
}

.track-timeline {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.time-readout {
  font-size: 0.75rem;
  font-weight: 700;
  color: #94a3b8;
  font-family: 'JetBrains Mono', monospace, sans-serif;
  display: flex;
  gap: 0.3rem;
}

.time-sep {
  color: #475569;
}

.seek-track-wrapper {
  width: 100%;
}

.seek-slider {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 5px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  outline: none;
  cursor: pointer;
}

.seek-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--teal);
  box-shadow: 0 0 8px var(--teal);
  cursor: pointer;
  transition: transform 0.15s ease;
}

.seek-slider::-webkit-slider-thumb:hover {
  transform: scale(1.3);
}

.channel-quick-pill {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 1px;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  white-space: nowrap;
}

.channel-quick-pill.raw {
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
}

.channel-quick-pill.mixed {
  background: rgba(0, 229, 163, 0.15);
  color: var(--teal);
  border: 1px solid rgba(0, 229, 163, 0.3);
}

@media (max-width: 640px) {
  .console-rack-body {
    padding: 1.25rem 1rem;
  }
  .mastering-indicators-row {
    grid-template-columns: 1fr;
    gap: 0.4rem;
  }
  .player-controls-strip {
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  .channel-quick-pill {
    display: none;
  }
}
</style>
