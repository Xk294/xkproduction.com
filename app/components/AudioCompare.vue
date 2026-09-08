<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const { trackAudioPlay } = useAnalytics();


const props = defineProps({

  rawSrc: { type: String, required: true },
  mixedSrc: { type: String, required: true },
  rawLabel: { type: String, default: 'Trước khi Mix' },
  mixedLabel: { type: String, default: 'Sau khi Mix' },
  title: { type: String, required: false }
});

const activeTab = ref<'raw' | 'mixed'>('mixed');
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);

let audioEl: HTMLAudioElement | null = null;
let rawAudio: HTMLAudioElement | null = null;
let mixedAudio: HTMLAudioElement | null = null;
let currentAudio: HTMLAudioElement | null = null;

let audioCtx: AudioContext | null = null;
let sourceNode: MediaElementAudioSourceNode | null = null;
let lowpassNode: BiquadFilterNode | null = null;
let highpassNode: BiquadFilterNode | null = null;
let gainNode: GainNode | null = null;

const isSameSource = computed(() => props.rawSrc === props.mixedSrc);

const applyFilter = (tab: 'raw' | 'mixed') => {
  if (!audioCtx || !gainNode || !lowpassNode || !highpassNode) return;
  const now = audioCtx.currentTime;
  if (tab === 'raw') {
    // Unmastered / dry raw demo sound: rolled off highs, reduced sub punch, lower loudness
    gainNode.gain.setTargetAtTime(0.55, now, 0.05);
    lowpassNode.frequency.setTargetAtTime(5400, now, 0.05);
    highpassNode.frequency.setTargetAtTime(140, now, 0.05);
  } else {
    // Polished Master: full frequency response, punchy low-end, crisp air, full loudness
    gainNode.gain.setTargetAtTime(1.0, now, 0.05);
    lowpassNode.frequency.setTargetAtTime(22000, now, 0.05);
    highpassNode.frequency.setTargetAtTime(20, now, 0.05);
  }
};

const setupWebAudio = (audio: HTMLAudioElement) => {
  if (audioCtx) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
    sourceNode = audioCtx.createMediaElementSource(audio);
    lowpassNode = audioCtx.createBiquadFilter();
    lowpassNode.type = 'lowpass';
    lowpassNode.frequency.value = activeTab.value === 'raw' ? 5400 : 22000;

    highpassNode = audioCtx.createBiquadFilter();
    highpassNode.type = 'highpass';
    highpassNode.frequency.value = activeTab.value === 'raw' ? 140 : 20;

    gainNode = audioCtx.createGain();
    gainNode.gain.value = activeTab.value === 'raw' ? 0.55 : 1.0;

    sourceNode.connect(lowpassNode);
    lowpassNode.connect(highpassNode);
    highpassNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);
  } catch (err) {
    console.warn('Web Audio API not supported or already connected', err);
  }
};

const initAudio = () => {
  if (!import.meta.client) return;

  if (isSameSource.value) {
    audioEl = new Audio(props.mixedSrc);
    audioEl.crossOrigin = 'anonymous';
    audioEl.addEventListener('timeupdate', updateProgress);
    audioEl.addEventListener('loadedmetadata', () => {
      if (duration.value === 0 && audioEl) duration.value = audioEl.duration;
    });
    audioEl.addEventListener('ended', () => {
      isPlaying.value = false;
      currentTime.value = 0;
    });
    currentAudio = audioEl;
  } else {
    rawAudio = new Audio(props.rawSrc);
    mixedAudio = new Audio(props.mixedSrc);
    
    [rawAudio, mixedAudio].forEach(audio => {
      if (audio) {
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', () => {
          if (duration.value === 0) duration.value = audio.duration;
        });
        audio.addEventListener('ended', () => {
          isPlaying.value = false;
          currentTime.value = 0;
        });
      }
    });
    currentAudio = mixedAudio;
  }
};

const updateProgress = () => {
  if (currentAudio) {
    currentTime.value = currentAudio.currentTime;
  }
};

const togglePlay = async () => {
  if (!currentAudio) return;

  if (isSameSource.value && audioEl) {
    if (!audioCtx) {
      setupWebAudio(audioEl);
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }
  }

  if (isPlaying.value) {
    currentAudio.pause();
  } else {
    try {
      await currentAudio.play();
      trackAudioPlay(props.title || 'Demo Track');
    } catch (e) {
      console.warn('Playback error:', e);
    }
  }
  isPlaying.value = !isPlaying.value;
};

const switchTab = (tab: 'raw' | 'mixed') => {
  if (activeTab.value === tab) return;
  activeTab.value = tab;

  if (isSameSource.value) {
    if (audioCtx) {
      applyFilter(tab);
    }
    return;
  }

  const wasPlaying = isPlaying.value;
  const time = currentAudio ? currentAudio.currentTime : 0;

  if (currentAudio) {
    currentAudio.pause();
  }

  currentAudio = tab === 'raw' ? rawAudio : mixedAudio;

  if (currentAudio) {
    currentAudio.currentTime = time;
    if (wasPlaying) {
      currentAudio.play();
    }
  }
};

const seek = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const time = parseFloat(target.value);
  if (currentAudio) {
    currentAudio.currentTime = time;
    currentTime.value = time;
  }
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

onMounted(() => {
  initAudio();
});

onUnmounted(() => {
  if (audioEl) {
    audioEl.pause();
    audioEl.src = '';
  }
  if (rawAudio) {
    rawAudio.pause();
    rawAudio.src = '';
  }
  if (mixedAudio) {
    mixedAudio.pause();
    mixedAudio.src = '';
  }
  if (audioCtx && audioCtx.state !== 'closed') {
    audioCtx.close().catch(() => {});
  }
});
</script>

<template>
  <div class="audio-compare max-width">
    <div class="glass-card compare-container">
      <h3 v-if="title" class="compare-title">{{ title }}</h3>
      
      <div class="tabs-container">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'raw' }"
          @click="switchTab('raw')"
        >
          TRƯỚC
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'mixed' }"
          @click="switchTab('mixed')"
        >
          SAU
        </button>
      </div>

      <div class="info-section">
        <div class="badge" :class="activeTab">{{ activeTab === 'raw' ? rawLabel : mixedLabel }}</div>
        <p class="description">Nhấn để nghe bản {{ activeTab === 'raw' ? 'raw' : 'mix' }} và so sánh sự khác biệt</p>
      </div>

      <div class="player-section">
        <button class="play-btn btn btn-primary" @click="togglePlay">
          <i class="fa-solid" :class="isPlaying ? 'fa-pause' : 'fa-play'"></i>
        </button>
        
        <div class="progress-container">
          <span class="time">{{ formatTime(currentTime) }}</span>
          <input 
            type="range" 
            class="progress-bar"
            min="0"
            :max="duration || 100"
            :value="currentTime"
            @input="seek"
          />
          <span class="time">{{ formatTime(duration) }}</span>
        </div>
      </div>
      
      <div class="waveform" :class="{ playing: isPlaying }">
        <div v-for="i in 20" :key="i" class="bar" :style="{ animationDelay: `${i * 0.05}s` }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.audio-compare {
  margin: 4rem auto;
}

.compare-container {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.compare-title {
  text-align: center;
  font-size: 1.5rem;
  color: var(--text-main);
  margin-bottom: 1rem;
}

.tabs-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.tab-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-light);
  padding: 0.75rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s var(--ease-out-expo);
}

.tab-btn.active {
  background: var(--gradient-primary);
  color: #fff;
  border-color: transparent;
}

.info-section {
  text-align: center;
}

.badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.badge.raw {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-light);
}

.badge.mixed {
  background: rgba(0, 212, 170, 0.15);
  color: var(--teal);
}

.description {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.player-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.play-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
}

.progress-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.time {
  font-size: 0.875rem;
  color: var(--text-light);
  font-variant-numeric: tabular-nums;
}

.progress-bar {
  flex-grow: 1;
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0.1);
  height: 4px;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}

.progress-bar::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  cursor: pointer;
}

.waveform {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  gap: 4px;
  margin-top: 1rem;
}

.bar {
  width: 4px;
  height: 4px;
  background: var(--primary);
  border-radius: 2px;
  transition: height 0.2s;
  opacity: 0.3;
}

.waveform.playing .bar {
  opacity: 1;
  animation: oscillate 1s infinite alternate;
}

@keyframes oscillate {
  0% { height: 4px; }
  100% { height: 36px; }
}

@media (max-width: 640px) {
  .player-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .play-btn {
    align-self: center;
  }
}
</style>
