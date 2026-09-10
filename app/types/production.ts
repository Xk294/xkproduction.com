export interface ProjectCredit {
  role: string
  name: string
}

export interface ProductionDecision {
  stage: 'Arrangement' | 'Recording' | 'Mixing' | 'Mastering' | 'Direction'
  title: string
  rationale: string
  audioSnippetUrl?: string
}

export interface XKProject {
  id: string
  slug: string
  title: string
  subtitle?: string
  artist: string
  client?: string
  year: number | string
  category: 'Music Production' | 'Mix & Master' | 'Arrangement' | 'Live Band' | 'Sound Design' | 'Thu âm'
  categoryLabel: string
  featured: boolean
  published: boolean
  
  // Media Assets
  coverImage: string
  heroBannerImage?: string
  videoEmbedId?: string
  videoUrl?: string
  audioDemoUrl?: string
  rawAudioUrl?: string
  masterAudioUrl?: string
  
  // Documentary Storytelling
  story: {
    origin: string       // Điểm khởi đầu & mong muốn của nghệ sĩ
    challenge: string    // Thách thức âm học / hoà thanh
    approach: string     // Giải pháp sản xuất tại XKStudio
    outcome: string      // Kết quả và sức lan toả
  }
  
  decisions?: ProductionDecision[]
  credits: ProjectCredit[]
  streamingLinks?: {
    spotify?: string
    appleMusic?: string
    youtube?: string
    tiktok?: string
  }
}

export interface XKRelease {
  id: string
  title: string
  artist: string
  cover: string
  releaseDate: string
  streamingUrl: string
  platform: 'Spotify' | 'Apple Music' | 'YouTube' | 'TikTok'
  productionRole: string
  audioPreviewUrl?: string
}

export interface XKCapability {
  id: string
  slug: string
  title: string
  subtitle: string
  badge: string
  summary: string
  deliverables: string[]
  investmentStarting: string
  timeline: string
  icon: string
  viTitle?: string
  enTitle?: string
  enSubtitle?: string
  enBadge?: string
  enSummary?: string
  enDeliverables?: string[]
  enInvestmentStarting?: string
  enTimeline?: string
  features: {
    title: string
    description: string
    enTitle?: string
    enDescription?: string
  }[]
  faq: {
    question: string
    answer: string
    enQuestion?: string
    enAnswer?: string
  }[]
}

