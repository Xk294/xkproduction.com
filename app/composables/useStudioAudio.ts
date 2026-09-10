import { ref, computed } from 'vue'

export interface StudioTrack {
  id: string
  title: string
  artist: string
  category: string
  audioSrc: string
  coverImg: string
  theme?: string
  youtubeUrl?: string
  genre?: string
  tempo?: string
  lufs?: string
  key?: string
}

export const studioPlaylist: StudioTrack[] = [
  {
    id: 'pop-rnb-demo',
    title: 'Pop R&B Special Demo',
    artist: 'XKProduction Showcase',
    category: 'Beat Phối Khí Độc Quyền',
    genre: 'R&B / Soul Pop',
    tempo: '102 BPM',
    lufs: '-14.1 LUFS',
    key: 'G Minor',
    audioSrc: '/product-audio-demo/pop-rnb-1-Gm.102.mp3',
    coverImg: '/images/blog-hoa-am.jpg',
    theme: 'blue'
  },
  {
    id: 'nhat-ki-cua-me',
    title: 'Nhật Kí Của Mẹ',
    artist: 'Mai Linh (Cover) · XKProduction',
    category: 'Hoà Âm & Mix Master',
    genre: 'Ballad / Acoustic Grand Piano',
    tempo: '82 BPM',
    lufs: '-14.0 LUFS',
    key: 'C Major',
    audioSrc: '/product-audio-demo/Nhatkicuame-Linh-Finalxkprod.wav',
    coverImg: 'https://img.youtube.com/vi/F5tPTow1xkE/maxresdefault.jpg',
    theme: 'blue',
    youtubeUrl: 'https://www.youtube.com/watch?v=F5tPTow1xkE'
  },
  {
    id: 'ao-cu-tinh-moi',
    title: 'Áo Cũ Tình Mới',
    artist: 'XKProduction Remix',
    category: 'Hoà Âm Phối Khí & EDM Remix',
    genre: 'House / EDM Remix',
    tempo: '140 BPM',
    lufs: '-9.8 LUFS',
    key: 'F Minor',
    audioSrc: '/product-audio-demo/Áo cũ tình mới remix-xkstudio.wav',
    coverImg: 'https://img.youtube.com/vi/hlvg9YBxRqY/maxresdefault.jpg',
    theme: 'amber',
    youtubeUrl: 'https://www.youtube.com/watch?v=hlvg9YBxRqY'
  },
  {
    id: 'love-du-phong',
    title: 'Love Dự Phòng',
    artist: 'Howl · XKProduction',
    category: 'Vocal Production / Acoustic',
    genre: 'Acoustic Guitar Nylon',
    tempo: '88 BPM',
    lufs: '-14.2 LUFS',
    key: 'A Major',
    audioSrc: '/product-audio-demo/Love Du Phong-VOCAL-Master1525.wav',
    coverImg: 'https://img.youtube.com/vi/OCnKTCslJUU/maxresdefault.jpg',
    theme: 'red',
    youtubeUrl: 'https://www.youtube.com/watch?v=OCnKTCslJUU'
  }
]

// Global shared state across whole app
const currentTrackIdx = ref(0)
const isPlaying = ref(false)
const isDockOpen = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)
const volume = ref(0.9)
const isMuted = ref(false)
const vuLeft = ref(0)
const vuRight = ref(0)
let lastVolume = 0.9

let globalAudio: HTMLAudioElement | null = null
let audioCtx: AudioContext | null = null
let analyserNode: AnalyserNode | null = null
let sourceNode: MediaElementAudioSourceNode | null = null
let vuAnimId: number | null = null

function initWebAudio() {
  if (!import.meta.client || !globalAudio || analyserNode) return
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return
    audioCtx = new AudioContextClass()
    analyserNode = audioCtx.createAnalyser()
    analyserNode.fftSize = 64
    analyserNode.smoothingTimeConstant = 0.8
    sourceNode = audioCtx.createMediaElementSource(globalAudio)
    sourceNode.connect(analyserNode)
    analyserNode.connect(audioCtx.destination)
  } catch (err) {
    console.warn('[StudioAudio] Web Audio fallback to organic emulation:', err)
  }
}

function startVuLoop() {
  if (vuAnimId) return
  const dataArray = analyserNode ? new Uint8Array(analyserNode.frequencyBinCount) : null

  const loop = () => {
    if (!isPlaying.value) {
      vuLeft.value = Math.max(0, vuLeft.value * 0.85)
      vuRight.value = Math.max(0, vuRight.value * 0.85)
      if (vuLeft.value > 1 || vuRight.value > 1) {
        vuAnimId = requestAnimationFrame(loop)
      } else {
        vuLeft.value = 0
        vuRight.value = 0
        vuAnimId = null
      }
      return
    }

    if (analyserNode && dataArray) {
      analyserNode.getByteFrequencyData(dataArray)
      let sumL = 0
      let sumR = 0
      const half = Math.floor(dataArray.length / 2)
      for (let i = 0; i < half; i++) sumL += dataArray[i] || 0
      for (let i = half; i < dataArray.length; i++) sumR += dataArray[i] || 0
      const rawL = (sumL / half / 255) * 100
      const rawR = (sumR / (dataArray.length - half) / 255) * 100
      const targetL = Math.min(98, Math.max(8, rawL * 1.15))
      const targetR = Math.min(98, Math.max(8, rawR * 1.15))
      vuLeft.value = vuLeft.value * 0.5 + targetL * 0.5
      vuRight.value = vuRight.value * 0.5 + targetR * 0.5
    } else {
      const time = Date.now() * 0.007
      const base = 48 + Math.sin(time) * 22 + Math.cos(time * 2.3) * 14
      vuLeft.value = Math.min(96, Math.max(10, base + Math.sin(time * 3) * 10))
      vuRight.value = Math.min(96, Math.max(10, base + Math.cos(time * 2.7) * 12))
    }

    vuAnimId = requestAnimationFrame(loop)
  }

  vuAnimId = requestAnimationFrame(loop)
}

export function useStudioAudio() {
  const currentTrack = computed(() => studioPlaylist[currentTrackIdx.value] || studioPlaylist[0])

  const formatSeconds = (sec: number) => {
    if (isNaN(sec) || !isFinite(sec)) return '0:00'
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const onTimeUpdate = () => {
    if (!globalAudio) return
    currentTime.value = globalAudio.currentTime
    if (globalAudio.duration) {
      duration.value = globalAudio.duration
      progress.value = (globalAudio.currentTime / globalAudio.duration) * 100
    }
  }

  const onLoadedMetadata = () => {
    if (globalAudio?.duration) {
      duration.value = globalAudio.duration
    }
  }

  const onEnded = () => {
    nextTrack()
  }

  const initGlobalAudio = () => {
    if (!import.meta.client || globalAudio) return

    globalAudio = new Audio()
    globalAudio.preload = 'metadata'
    globalAudio.volume = isMuted.value ? 0 : volume.value
    const track = currentTrack.value || studioPlaylist[0]
    if (track) {
      globalAudio.src = track.audioSrc
    }

    globalAudio.addEventListener('timeupdate', onTimeUpdate)
    globalAudio.addEventListener('loadedmetadata', onLoadedMetadata)
    globalAudio.addEventListener('ended', onEnded)

    initWebAudio()
  }

  const cleanupGlobalAudio = () => {
    if (globalAudio) {
      globalAudio.pause()
      globalAudio.removeEventListener('timeupdate', onTimeUpdate)
      globalAudio.removeEventListener('loadedmetadata', onLoadedMetadata)
      globalAudio.removeEventListener('ended', onEnded)
      globalAudio.src = ''
      globalAudio = null
      isPlaying.value = false
    }
    if (sourceNode) {
      try { sourceNode.disconnect() } catch {}
      sourceNode = null
    }
    if (analyserNode) {
      try { analyserNode.disconnect() } catch {}
      analyserNode = null
    }
    if (vuAnimId) {
      cancelAnimationFrame(vuAnimId)
      vuAnimId = null
    }
  }

  const playTrack = async (idx?: number) => {
    initGlobalAudio()
    if (!globalAudio) return

    if (typeof idx === 'number' && idx !== currentTrackIdx.value) {
      currentTrackIdx.value = idx
      const selected = studioPlaylist[idx]
      if (selected) {
        globalAudio.src = selected.audioSrc
      }
      currentTime.value = 0
      progress.value = 0
    }

    try {
      if (audioCtx && audioCtx.state === 'suspended') {
        await audioCtx.resume()
      }
      initWebAudio()
      await globalAudio.play()
      isPlaying.value = true
      isDockOpen.value = true
      startVuLoop()
      try {
        const { trackAudioPlay } = useAnalytics()
        trackAudioPlay(currentTrack.value?.title || 'Studio Audio Demo')
      } catch {
        // Safe fallback if composable unavailable
      }
    } catch (e) {
      console.warn('[StudioAudio] Playback prevented:', e)
    }
  }

  const playTrackById = (id: string) => {
    const idx = studioPlaylist.findIndex(t => t.id === id)
    if (idx !== -1) {
      playTrack(idx)
    }
  }

  const pauseTrack = () => {
    if (globalAudio) {
      globalAudio.pause()
      isPlaying.value = false
    }
  }

  const togglePlay = () => {
    if (isPlaying.value) {
      pauseTrack()
    } else {
      playTrack()
    }
  }

  const nextTrack = () => {
    const nextIdx = (currentTrackIdx.value + 1) % studioPlaylist.length
    playTrack(nextIdx)
  }

  const prevTrack = () => {
    const prevIdx = (currentTrackIdx.value - 1 + studioPlaylist.length) % studioPlaylist.length
    playTrack(prevIdx)
  }

  const seekTo = (percent: number) => {
    if (globalAudio && globalAudio.duration) {
      globalAudio.currentTime = (percent / 100) * globalAudio.duration
    }
  }

  const seekRelative = (seconds: number) => {
    if (globalAudio && globalAudio.duration) {
      const target = Math.max(0, Math.min(globalAudio.duration, globalAudio.currentTime + seconds))
      globalAudio.currentTime = target
    }
  }

  const setVolume = (val: number) => {
    volume.value = Math.max(0, Math.min(1, val))
    if (val > 0) isMuted.value = false
    if (globalAudio) {
      globalAudio.volume = isMuted.value ? 0 : volume.value
    }
  }

  const toggleMute = () => {
    if (isMuted.value) {
      isMuted.value = false
      volume.value = lastVolume || 0.8
    } else {
      lastVolume = volume.value
      isMuted.value = true
    }
    if (globalAudio) {
      globalAudio.volume = isMuted.value ? 0 : volume.value
    }
  }

  return {
    playlist: studioPlaylist,
    currentTrack,
    currentTrackIdx,
    isPlaying,
    isDockOpen,
    currentTime,
    duration,
    progress,
    volume,
    isMuted,
    vuLeft,
    vuRight,
    currentTimeFormatted: computed(() => formatSeconds(currentTime.value)),
    durationFormatted: computed(() => formatSeconds(duration.value)),
    playTrack,
    playTrackById,
    pauseTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    seekRelative,
    setVolume,
    toggleMute,
    cleanupGlobalAudio
  }
}
