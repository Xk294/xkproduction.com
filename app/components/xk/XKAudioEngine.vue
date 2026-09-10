<template>
  <div
    v-show="isDockOpen"
    class="xk-audio-engine"
    :class="{ 'is-collapsed': isCollapsed, 'is-playing': isPlaying }"
    role="region"
    aria-label="XK Global Audio Engine"
  >
    <!-- TOP PROGRESS SCRUBBER -->
    <div
      class="scrubber-bar"
      @click="handleScrub"
      @mousemove="handleHoverScrub"
      @mouseleave="hoverProgress = null"
      ref="scrubberRef"
      role="slider"
      :aria-valuenow="Math.round(progress)"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Tiến độ phát nhạc"
    >
      <div class="scrubber-buffered" :style="{ width: '100%' }"></div>
      <div class="scrubber-played" :style="{ width: `${progress}%` }">
        <div class="scrubber-handle"></div>
      </div>
      <div
        v-if="hoverProgress !== null"
        class="scrubber-hover-preview"
        :style="{ left: `${hoverProgress}%` }"
      ></div>
    </div>

    <!-- MAIN CONSOLE INTERFACE -->
    <div class="engine-console editorial-container">
      <!-- LEFT: TRACK INFO -->
      <div v-if="currentTrack" class="track-meta-section">
        <div class="artwork-wrapper">
          <img
            :src="currentTrack.coverImg"
            :alt="currentTrack.title"
            class="artwork-img"
            width="48"
            height="48"
          />
          <div class="visualizer-overlay" v-if="isPlaying">
            <span class="v-bar bar-1"></span>
            <span class="v-bar bar-2"></span>
            <span class="v-bar bar-3"></span>
          </div>
        </div>

        <div class="track-info">
          <div class="title-row">
            <span class="track-title">{{ currentTrack.title }}</span>
            <span class="track-badge">{{ currentTrack.category }}</span>
          </div>
          <span class="track-artist">{{ currentTrack.artist }}</span>
        </div>
      </div>

      <!-- CENTER: PLAYBACK CONTROLS -->
      <div class="playback-controls-section">
        <div class="transport-buttons">
          <button
            type="button"
            class="ctrl-btn secondary"
            @click="prevTrack"
            aria-label="Bài trước"
            title="Bài trước"
          >
            <i class="fa-solid fa-backward-step"></i>
          </button>

          <button
            type="button"
            class="ctrl-btn play-pause-main"
            @click="togglePlay"
            :aria-label="isPlaying ? 'Tạm dừng' : 'Phát'"
            :title="isPlaying ? 'Tạm dừng (Phím Space)' : 'Phát (Phím Space)'"
          >
            <i :class="isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'"></i>
          </button>

          <button
            type="button"
            class="ctrl-btn secondary"
            @click="nextTrack"
            aria-label="Bài kế tiếp"
            title="Bài kế tiếp"
          >
            <i class="fa-solid fa-forward-step"></i>
          </button>
        </div>

        <!-- TIMECODE DISPLAY -->
        <div class="timecode-display text-meta-mono">
          <span class="time-current">{{ currentTimeFormatted }}</span>
          <span class="time-divider">/</span>
          <span class="time-duration">{{ durationFormatted }}</span>
        </div>
      </div>

      <!-- RIGHT: VOLUME & ACTION METRIC -->
      <div class="utilities-section">
        <!-- SHORTCUT HINT -->
        <div class="shortcut-tip" title="Phím tắt: Space (Phát/Dừng), M (Tắt tiếng), Mũi tên (Tua 5s)">
          <span class="key-cap">Space</span>
          <span class="tip-label">Play</span>
        </div>

        <!-- VOLUME SLIDER -->
        <div class="volume-control">
          <button
            type="button"
            class="volume-btn"
            @click="toggleMute"
            :aria-label="isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'"
            :title="isMuted ? 'Bật âm thanh (Phím M)' : 'Tắt tiếng (Phím M)'"
          >
            <i :class="volumeIcon"></i>
          </button>
          <div class="volume-slider-track" @click="handleVolumeClick" ref="volumeTrackRef">
            <div
              class="volume-slider-fill"
              :style="{ width: `${isMuted ? 0 : volume * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- CLOSE / MINIMIZE BUTTON -->
        <button
          type="button"
          class="collapse-btn"
          @click="isCollapsed = !isCollapsed"
          :title="isCollapsed ? 'Mở rộng' : 'Thu nhỏ'"
          :aria-label="isCollapsed ? 'Mở rộng' : 'Thu nhỏ'"
        >
          <i :class="isCollapsed ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>
        </button>

        <button
          type="button"
          class="dismiss-btn"
          @click="isDockOpen = false; pauseTrack()"
          title="Đóng trình phát"
          aria-label="Đóng trình phát âm thanh"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const {
  currentTrack,
  isPlaying,
  isDockOpen,
  currentTimeFormatted,
  durationFormatted,
  progress,
  volume,
  isMuted,
  playTrack,
  pauseTrack,
  togglePlay,
  nextTrack,
  prevTrack,
  seekTo,
  seekRelative,
  setVolume,
  toggleMute,
  cleanupGlobalAudio
} = useStudioAudio()

const isCollapsed = ref(false)
const hoverProgress = ref<number | null>(null)
const scrubberRef = ref<HTMLElement | null>(null)
const volumeTrackRef = ref<HTMLElement | null>(null)

const volumeIcon = computed(() => {
  if (isMuted.value || volume.value === 0) return 'fa-solid fa-volume-xmark'
  if (volume.value < 0.5) return 'fa-solid fa-volume-low'
  return 'fa-solid fa-volume-high'
})

function handleScrub(e: MouseEvent) {
  if (!scrubberRef.value) return
  const rect = scrubberRef.value.getBoundingClientRect()
  const clickX = e.clientX - rect.left
  const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100))
  seekTo(percent)
}

function handleHoverScrub(e: MouseEvent) {
  if (!scrubberRef.value) return
  const rect = scrubberRef.value.getBoundingClientRect()
  const clickX = e.clientX - rect.left
  hoverProgress.value = Math.max(0, Math.min(100, (clickX / rect.width) * 100))
}

function handleVolumeClick(e: MouseEvent) {
  if (!volumeTrackRef.value) return
  const rect = volumeTrackRef.value.getBoundingClientRect()
  const clickX = e.clientX - rect.left
  const newVol = Math.max(0, Math.min(1, clickX / rect.width))
  setVolume(newVol)
}

// Global Keyboard Navigation
function handleGlobalKeydown(e: KeyboardEvent) {
  const target = e.target as HTMLElement | null
  const tag = target?.tagName?.toLowerCase()
  if (tag === 'input' || tag === 'textarea' || tag === 'select' || tag === 'button' || target?.isContentEditable || target?.getAttribute('role') === 'button') {
    return
  }

  if (e.code === 'Space') {
    e.preventDefault()
    togglePlay()
  } else if (e.code === 'KeyM') {
    e.preventDefault()
    toggleMute()
  } else if (e.code === 'ArrowRight') {
    e.preventDefault()
    seekRelative(5)
  } else if (e.code === 'ArrowLeft') {
    e.preventDefault()
    seekRelative(-5)
  }
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('keydown', handleGlobalKeydown)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', handleGlobalKeydown)
    cleanupGlobalAudio()
  }
})
</script>

<style scoped>
.xk-audio-engine {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 990;
  background-color: rgba(11, 14, 22, 0.94);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--border-subtle);
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.6);
  transition: transform 0.35s var(--ease-out-expo);
}

.xk-audio-engine.is-collapsed {
  transform: translateY(calc(100% - 4px));
}

/* TOP SCRUBBER BAR */
.scrubber-bar {
  position: relative;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: height 0.2s ease;
}

.scrubber-bar:hover {
  height: 7px;
}

.scrubber-buffered {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
}

.scrubber-played {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(90deg, #0d9488, #d97706);
  position: relative;
}

.scrubber-handle {
  position: absolute;
  right: -5px;
  top: 50%;
  transform: translateY(-50%) scale(0);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
  transition: transform 0.15s ease;
}

.scrubber-bar:hover .scrubber-handle {
  transform: translateY(-50%) scale(1);
}

.scrubber-hover-preview {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(255, 255, 255, 0.6);
}

/* CONSOLE INNER */
.engine-console {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  gap: 1.5rem;
}

/* LEFT: TRACK INFO */
.track-meta-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 260px;
  max-width: 320px;
}

.artwork-wrapper {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  background: #11141c;
  flex-shrink: 0;
  border: 1px solid var(--border-subtle);
}

.artwork-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.visualizer-overlay {
  position: absolute;
  inset: 0;
  background: rgba(7, 8, 10, 0.55);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 3px;
  padding-bottom: 8px;
}

.v-bar {
  width: 3px;
  background: #d97706;
  border-radius: 2px;
  animation: v-pulse 0.9s infinite ease-in-out alternate;
}

.bar-1 { height: 14px; animation-delay: 0.1s; }
.bar-2 { height: 22px; animation-delay: 0.3s; }
.bar-3 { height: 16px; animation-delay: 0.2s; }

@keyframes v-pulse {
  0% { transform: scaleY(0.3); }
  100% { transform: scaleY(1); }
}

.track-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.track-title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-badge {
  font-size: 0.6875rem;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  background: rgba(13, 148, 136, 0.15);
  color: #2dd4bf;
  border: 1px solid rgba(13, 148, 136, 0.3);
  white-space: nowrap;
}

.track-artist {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* CENTER: PLAYBACK CONTROLS */
.playback-controls-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.transport-buttons {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.ctrl-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s ease, transform 0.15s ease;
}

.ctrl-btn.secondary {
  font-size: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.ctrl-btn.secondary:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.05);
}

.ctrl-btn.play-pause-main {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--text-primary);
  color: var(--bg-canvas);
  font-size: 1.05rem;
}

.ctrl-btn.play-pause-main:hover {
  transform: scale(1.06);
  background: #ffffff;
  box-shadow: 0 0 16px rgba(255, 255, 255, 0.3);
}

.timecode-display {
  font-size: 0.75rem;
  color: var(--text-subtle);
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

/* RIGHT: UTILITIES */
.utilities-section {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.shortcut-tip {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  opacity: 0.6;
  font-size: 0.75rem;
}

.key-cap {
  font-family: ui-monospace, monospace;
  font-size: 0.6875rem;
  padding: 0.15rem 0.4rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  color: var(--text-secondary);
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.volume-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.95rem;
  transition: color 0.15s ease;
}

.volume-btn:hover {
  color: var(--text-primary);
}

.volume-slider-track {
  width: 70px;
  height: 4px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.volume-slider-fill {
  height: 100%;
  background: #d97706;
  border-radius: 2px;
}

.collapse-btn,
.dismiss-btn {
  background: none;
  border: none;
  color: var(--text-subtle);
  cursor: pointer;
  font-size: 0.95rem;
  padding: 0.3rem;
  transition: color 0.15s ease;
}

.collapse-btn:hover,
.dismiss-btn:hover {
  color: var(--text-primary);
}

@media (max-width: 900px) {
  .shortcut-tip {
    display: none;
  }
  .volume-slider-track {
    width: 50px;
  }
}

@media (max-width: 640px) {
  .engine-console {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    gap: 0.75rem;
  }
  .track-meta-section {
    min-width: 140px;
    max-width: 180px;
  }
  .track-badge {
    display: none;
  }
  .volume-control {
    display: none;
  }
}
</style>
