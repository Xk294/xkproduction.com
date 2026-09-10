<script setup lang="ts">
const {
  currentTrack,
  isPlaying,
  isDockOpen,
  currentTimeFormatted,
  durationFormatted,
  progress,
  togglePlay,
  pauseTrack,
  nextTrack,
  prevTrack,
  seekTo
} = useStudioAudio()

const handleCloseDock = () => {
  pauseTrack()
  isDockOpen.value = false
}

const onSliderInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  seekTo(parseFloat(target.value))
}
</script>

<template>
  <Transition name="dock-slide">
    <div
      v-if="isDockOpen && currentTrack"
      class="studio-audio-dock"
      role="region"
      aria-label="Trình phát nhạc XKProduction"
    >
      <div class="dock-inner glass-card">
        <!-- Track Thumbnail -->
        <div class="dock-cover-wrap">
          <img
            :src="currentTrack.coverImg"
            :alt="currentTrack.title"
            class="dock-cover-img"
            :class="{ spinning: isPlaying }"
          />
          <div class="dock-vinyl-hole"></div>
        </div>

        <!-- Track Meta -->
        <div class="dock-meta">
          <div class="dock-title-row">
            <span class="dock-track-name">{{ currentTrack.title }}</span>
            <div class="dock-wave-indicator" :class="{ active: isPlaying }">
              <span v-for="n in 6" :key="n" class="mini-bar" :style="`--delay: ${n * 0.12}s`"></span>
            </div>
          </div>
          <span class="dock-artist-name">{{ currentTrack.artist }}</span>

          <!-- Time & Progress Bar -->
          <div class="dock-progress-row">
            <span class="dock-time">{{ currentTimeFormatted }}</span>
            <input
              type="range"
              class="dock-slider"
              min="0"
              max="100"
              step="0.5"
              :value="progress"
              @input="onSliderInput"
              aria-label="Tua nhạc"
            />
            <span class="dock-time">{{ durationFormatted }}</span>
          </div>
        </div>

        <!-- Controls -->
        <div class="dock-controls">
          <button
            type="button"
            class="dock-btn-icon"
            @click="prevTrack"
            aria-label="Bài trước"
          >
            <i class="fa-solid fa-backward-step"></i>
          </button>

          <button
            type="button"
            class="dock-play-btn"
            @click="togglePlay"
            :aria-label="isPlaying ? 'Tạm dừng' : 'Phát'"
          >
            <i class="fa-solid" :class="isPlaying ? 'fa-pause' : 'fa-play'"></i>
          </button>

          <button
            type="button"
            class="dock-btn-icon"
            @click="nextTrack"
            aria-label="Bài tiếp theo"
          >
            <i class="fa-solid fa-forward-step"></i>
          </button>

          <button
            type="button"
            class="dock-close-btn"
            @click="handleCloseDock"
            aria-label="Đóng trình phát"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.studio-audio-dock {
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
  z-index: 920;
  max-width: 480px;
  width: calc(100% - 3rem);
  pointer-events: auto;
}

.dock-inner {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(10, 13, 20, 0.88);
  backdrop-filter: blur(24px) saturate(1.4);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(0, 128, 255, 0.4);
  border-radius: 16px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 128, 255, 0.15);
}

.dock-cover-wrap {
  position: relative;
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.dock-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.dock-cover-img.spinning {
  animation: spinVinyl 6s linear infinite;
}

@keyframes spinVinyl {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.dock-vinyl-hole {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #06080d;
  border: 2px solid #38bdf8;
}

.dock-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.dock-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.dock-track-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dock-artist-name {
  font-size: 0.72rem;
  color: #94a3b8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dock-wave-indicator {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 12px;
}

.mini-bar {
  width: 2px;
  height: 3px;
  background: var(--teal);
  border-radius: 1px;
}

.dock-wave-indicator.active .mini-bar {
  animation: miniBounce 0.7s ease-in-out infinite alternate;
  animation-delay: var(--delay);
}

@keyframes miniBounce {
  0% { height: 3px; }
  100% { height: 12px; }
}

.dock-progress-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.25rem;
}

.dock-time {
  font-size: 0.65rem;
  color: #64748b;
  font-family: 'JetBrains Mono', monospace, sans-serif;
}

.dock-slider {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 3px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}

.dock-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
}

.dock-controls {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
}

.dock-btn-icon {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 0.82rem;
  cursor: pointer;
  padding: 0.35rem;
  transition: color 0.2s ease;
}

.dock-btn-icon:hover {
  color: #fff;
}

.dock-play-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0080ff 0%, #00e5a3 100%);
  border: none;
  color: #fff;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.dock-play-btn:hover {
  transform: scale(1.08);
}

.dock-close-btn {
  background: none;
  border: none;
  color: #64748b;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0.35rem;
  margin-left: 0.2rem;
  transition: color 0.2s ease;
}

.dock-close-btn:hover {
  color: #ef4444;
}

/* Slide Transition */
.dock-slide-enter-active,
.dock-slide-leave-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
}

.dock-slide-enter-from,
.dock-slide-leave-to {
  transform: translateY(100px);
  opacity: 0;
}

@media (max-width: 768px) {
  .studio-audio-dock {
    bottom: 5rem;
    left: 0.75rem;
    width: calc(100% - 1.5rem);
    max-width: none;
  }
}
</style>
