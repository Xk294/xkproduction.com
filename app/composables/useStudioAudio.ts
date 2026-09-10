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
}

export const studioPlaylist: StudioTrack[] = [
  {
    id: 'pop-rnb-demo',
    title: 'Pop R&B Special Demo',
    artist: 'Sản xuất bởi XKProduction',
    category: 'Beat Phối Khí Độc Quyền',
    audioSrc: '/product-audio-demo/pop-rnb-1-Gm.102.mp3',
    coverImg: '/images/blog-hoa-am.jpg',
    theme: 'blue'
  },
  {
    id: 'nhat-ki-cua-me',
    title: 'Nhật Kí Của Mẹ',
    artist: 'Mai Linh (Cover) · XKProduction',
    category: 'Hoà Âm & Mix Master',
    audioSrc: '/product-audio-demo/pop-rnb-1-Gm.102.mp3', // high quality audio demo
    coverImg: 'https://img.youtube.com/vi/F5tPTow1xkE/hqdefault.jpg',
    theme: 'blue',
    youtubeUrl: 'https://www.youtube.com/watch?v=F5tPTow1xkE'
  },
  {
    id: 'chang-muon-noi-nhieu-loi',
    title: 'Chẳng Muốn Nói Nhiều Lời',
    artist: 'Revan · XKProduction',
    category: 'Sản Xuất R&B / Hip-hop',
    audioSrc: '/product-audio-demo/pop-rnb-1-Gm.102.mp3',
    coverImg: 'https://img.youtube.com/vi/IxlFvQQP_4c/hqdefault.jpg',
    theme: 'dark',
    youtubeUrl: 'https://www.youtube.com/watch?v=IxlFvQQP_4c'
  },
  {
    id: 'love-du-phong',
    title: 'Love Dự Phòng',
    artist: 'Howl · XKProduction',
    category: 'Vocal Production / Acoustic',
    audioSrc: '/product-audio-demo/pop-rnb-1-Gm.102.mp3',
    coverImg: 'https://img.youtube.com/vi/OCnKTCslJUU/hqdefault.jpg',
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
let lastVolume = 0.9

let globalAudio: HTMLAudioElement | null = null

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
      await globalAudio.play()
      isPlaying.value = true
      isDockOpen.value = true
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
    currentTimeFormatted: computed(() => formatSeconds(currentTime.value)),
    durationFormatted: computed(() => formatSeconds(duration.value)),
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
  }
}
