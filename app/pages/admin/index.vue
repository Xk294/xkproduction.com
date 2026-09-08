<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import type { User } from 'firebase/auth'

definePageMeta({ ssr: false, robots: false })
useHead({
  title: 'Admin Dashboard & Studio CRM — XKProduction',
  meta: [{ name: 'robots', content: 'noindex,nofollow' }],
})

// ── Auth state ──────────────────────────────────────────────────────────────
type AuthState = 'loading' | 'unauthenticated' | 'forbidden' | 'authenticated'
const authState = ref<AuthState>('loading')
const user = ref<User | null>(null)
const idToken = ref<string | null>(null)

// ── Navigation & Views ───────────────────────────────────────────────────────
type AdminView = 'overview' | 'traffic' | 'leads' | 'qr-builder' | 'music-stats' | 'visitors' | 'events'
const activeView = ref<AdminView>('overview')
const sidebarOpen = ref(false)

// ── Data States ─────────────────────────────────────────────────────────────
const overview = ref<any>(null)
const leads = ref<any[]>([])
const leadsTotal = ref(0)
const visitors = ref<any[]>([])
const visitorsTotal = ref(0)
const events = ref<any>(null)
const musicStats = ref<any>(null)

// Traffic sources state
interface TrafficSourceItem {
  source: string
  count: number
  percentage: number
  type: 'utm' | 'referrer' | 'direct' | 'search' | 'social' | 'qr'
}
const trafficSources = ref<TrafficSourceItem[]>([])
const trafficTotal = ref(0)
const trafficRange = ref(30)
const trafficRangeInput = ref(30)
const trafficLoading = ref(false)

// Leads CRM Filters & State
const leadStatusFilter = ref('all')
const leadServiceFilter = ref('all')
const leadSearch = ref('')
const updatingLeadId = ref<number | null>(null)
const editingNoteId = ref<number | null>(null)
const editingNoteText = ref('')

// QR / UTM Builder State
const qrBaseUrl = ref('https://xkproduction.com/contact')
const qrSource = ref('tiktok')
const qrMedium = ref('bio')
const qrCampaign = ref('he-2026')
const qrContent = ref('')
const copiedLink = ref(false)

const loading = ref(false)

// ── Firebase auth ────────────────────────────────────────────────────────────
async function getFirebaseAuth() {
  const [{ initializeApp, getApps }, { getAuth }] = await Promise.all([
    import('firebase/app'),
    import('firebase/auth'),
  ])
  const config = useRuntimeConfig()
  const firebaseConfig = config.public.firebase as Record<string, string>
  const app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig)
  return getAuth(app)
}

async function getValidToken(): Promise<string | null> {
  if (!user.value) return idToken.value
  try {
    const token = await user.value.getIdToken()
    idToken.value = token
    return token
  } catch {
    return idToken.value
  }
}

async function signIn() {
  const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth')
  const auth = await getFirebaseAuth()
  try {
    await signInWithPopup(auth, new GoogleAuthProvider())
  } catch (e: any) {
    if (e.code !== 'auth/popup-closed-by-user') alert('Đăng nhập thất bại: ' + e.message)
  }
}

async function signOut() {
  const { signOut: fbSignOut } = await import('firebase/auth')
  const auth = await getFirebaseAuth()
  await fbSignOut(auth)
}

// ── Data Loaders ─────────────────────────────────────────────────────────────
async function loadOverview() {
  const token = await getValidToken()
  if (!token) return
  loading.value = true
  try {
    overview.value = await $fetch('/api/admin/overview', { headers: { Authorization: `Bearer ${token}` } })
  } finally {
    loading.value = false
  }
}

async function loadTrafficSources() {
  const token = await getValidToken()
  if (!token) return
  trafficLoading.value = true
  try {
    const data = await $fetch<any>('/api/admin/traffic-sources', {
      headers: { Authorization: `Bearer ${token}` },
      query: { range: trafficRange.value },
    })
    if (data?.ok) {
      trafficSources.value = data.sources || []
      trafficTotal.value = data.total || 0
      trafficRange.value = data.range || trafficRange.value
      trafficRangeInput.value = trafficRange.value
    }
  } catch (err) {
    console.error('Failed to load traffic sources', err)
  } finally {
    trafficLoading.value = false
  }
}

function applyTrafficRange(days?: number) {
  if (days) {
    trafficRangeInput.value = days
  }
  const parsed = Math.max(1, Math.min(365, Number(trafficRangeInput.value) || 30))
  trafficRange.value = parsed
  trafficRangeInput.value = parsed
  loadTrafficSources()
}

async function loadLeads() {
  const token = await getValidToken()
  if (!token) return
  loading.value = true
  try {
    const data = await $fetch<any>('/api/admin/leads', {
      headers: { Authorization: `Bearer ${token}` },
      query: {
        status: leadStatusFilter.value,
        service: leadServiceFilter.value,
        q: leadSearch.value.trim() || undefined,
        limit: 100,
      },
    })
    leads.value = data.leads || []
    leadsTotal.value = data.total || 0
  } finally {
    loading.value = false
  }
}

async function updateLeadStatus(id: number, status: string) {
  const token = await getValidToken()
  if (!token) return
  updatingLeadId.value = id
  try {
    await $fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: { status },
    })
    const item = leads.value.find((l) => l.id === id)
    if (item) item.status = status
    if (overview.value) await loadOverview()
  } catch (err: any) {
    alert('Không thể cập nhật trạng thái: ' + (err.message || 'Lỗi mạng'))
  } finally {
    updatingLeadId.value = null
  }
}

function startEditNote(lead: any) {
  editingNoteId.value = lead.id
  editingNoteText.value = lead.notes || ''
}

async function saveLeadNote(id: number) {
  const token = await getValidToken()
  if (!token) return
  updatingLeadId.value = id
  try {
    await $fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: { notes: editingNoteText.value.trim() },
    })
    const item = leads.value.find((l) => l.id === id)
    if (item) item.notes = editingNoteText.value.trim()
    editingNoteId.value = null
  } catch (err: any) {
    alert('Không thể lưu ghi chú: ' + (err.message || 'Lỗi mạng'))
  } finally {
    updatingLeadId.value = null
  }
}

async function loadMusicStats() {
  const token = await getValidToken()
  if (!token) return
  loading.value = true
  try {
    musicStats.value = await $fetch('/api/admin/events/music-stats', {
      headers: { Authorization: `Bearer ${token}` },
    })
  } finally {
    loading.value = false
  }
}

async function loadVisitors() {
  const token = await getValidToken()
  if (!token) return
  loading.value = true
  try {
    const data = await $fetch<any>('/api/admin/visitors', { headers: { Authorization: `Bearer ${token}` } })
    visitors.value = data.visitors || []
    visitorsTotal.value = data.total || 0
  } finally {
    loading.value = false
  }
}

async function loadEvents() {
  const token = await getValidToken()
  if (!token) return
  loading.value = true
  try {
    events.value = await $fetch<any>('/api/admin/events', { headers: { Authorization: `Bearer ${token}` } })
  } finally {
    loading.value = false
  }
}

async function switchView(view: AdminView) {
  activeView.value = view
  sidebarOpen.value = false
  if (view === 'overview') await loadOverview()
  if (view === 'traffic') await loadTrafficSources()
  if (view === 'leads') await loadLeads()
  if (view === 'music-stats') await loadMusicStats()
  if (view === 'visitors') await loadVisitors()
  if (view === 'events') await loadEvents()
}

// ── Watch lead filter changes ───────────────────────────────────────────────
watch([leadStatusFilter, leadServiceFilter], () => {
  if (activeView.value === 'leads') {
    loadLeads()
  }
})

// ── Export CSV for Leads ────────────────────────────────────────────────────
function exportLeadsCSV() {
  if (!leads.value.length) {
    alert('Không có dữ liệu leads để xuất.')
    return
  }

  const headers = ['ID', 'Họ tên', 'Số điện thoại', 'Email', 'Dịch vụ', 'Trạng thái', 'Nguồn', 'Lời nhắn', 'Ghi chú nội bộ', 'Ngày tạo']
  const rows = leads.value.map((l) => [
    l.id,
    `"${(l.name || '').replace(/"/g, '""')}"`,
    `"${l.phone || ''}"`,
    `"${l.email || ''}"`,
    `"${svcLabel(l.service)}"`,
    `"${statusMeta(l.status).label}"`,
    `"${l.source || ''}"`,
    `"${(l.message || '').replace(/"/g, '""')}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`,
    `"${l.created_at || ''}"`,
  ])

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\r\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `xkproduction-leads-${new Date().toISOString().slice(0, 10)}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// ── UTM & QR Code Builder Computeds ─────────────────────────────────────────
const generatedUtmUrl = computed(() => {
  try {
    const url = new URL(qrBaseUrl.value.startsWith('http') ? qrBaseUrl.value : `https://${qrBaseUrl.value}`)
    if (qrSource.value.trim()) url.searchParams.set('utm_source', qrSource.value.trim().toLowerCase())
    if (qrMedium.value.trim()) url.searchParams.set('utm_medium', qrMedium.value.trim().toLowerCase())
    if (qrCampaign.value.trim()) url.searchParams.set('utm_campaign', qrCampaign.value.trim().toLowerCase())
    if (qrContent.value.trim()) url.searchParams.set('utm_content', qrContent.value.trim().toLowerCase())
    return url.toString()
  } catch {
    return qrBaseUrl.value
  }
})

const qrImageUrl = computed(() => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=380x380&format=png&margin=12&data=${encodeURIComponent(generatedUtmUrl.value)}`
})

function copyUtmLink() {
  navigator.clipboard.writeText(generatedUtmUrl.value)
  copiedLink.value = true
  setTimeout(() => {
    copiedLink.value = false
  }, 2200)
}

// ── Labels & Helpers ────────────────────────────────────────────────────────
const serviceLabel: Record<string, string> = {
  'thu-am': '🎙 Thu âm',
  'mixing-mastering': '🎚 Mix & Master',
  'hoa-am': '🎵 Hoà âm',
  'mv-tvc': '🎬 MV/TVC',
  'live-band': '🎸 Live Band',
  'khoa-hoc': '🎓 Khoá học',
  other: 'Khác',
}
function svcLabel(s: string | null) {
  return s ? serviceLabel[s] ?? s : '—'
}

interface StatusMeta {
  label: string
  color: string
  bg: string
  icon: string
}
const statusConfig: Record<string, StatusMeta> = {
  new: { label: 'Mới nhận', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', icon: '🆕' },
  contacted: { label: 'Đã liên hệ', color: '#38bdf8', bg: 'rgba(56,189,248,0.12)', icon: '📞' },
  quoting: { label: 'Đang báo giá', color: '#a855f7', bg: 'rgba(168,85,247,0.12)', icon: '💬' },
  booked: { label: 'Đã chốt lịch', color: '#10b981', bg: 'rgba(16,185,129,0.12)', icon: '🎙️' },
  completed: { label: 'Hoàn thành', color: '#34d399', bg: 'rgba(52,211,153,0.12)', icon: '✅' },
  cancelled: { label: 'Huỷ / Không chốt', color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', icon: '❌' },
}
function statusMeta(status: string | null): StatusMeta {
  return (status && statusConfig[status]) || statusConfig.new!
}


function fmtDate(d: string) {
  if (!d) return '—'
  return new Date(d).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })
}
function maskPhone(p: string) {
  if (!p) return '—'
  return p.replace(/(\d{3})\d{4}(\d+)/, '$1****$2')
}
function cleanPhone(p: string) {
  return (p || '').replace(/\D/g, '')
}

// ── Init Lifecycle ──────────────────────────────────────────────────────────
onMounted(async () => {
  const [{ onAuthStateChanged }, auth] = await Promise.all([
    import('firebase/auth'),
    getFirebaseAuth(),
  ])

  onAuthStateChanged(auth, async (fbUser) => {
    if (!fbUser) {
      user.value = null
      idToken.value = null
      authState.value = 'unauthenticated'
      return
    }
    user.value = fbUser
    try {
      idToken.value = await fbUser.getIdToken()
      await loadOverview()
      authState.value = 'authenticated'
    } catch (e: any) {
      authState.value = e?.statusCode === 403 ? 'forbidden' : 'unauthenticated'
    }
  })
})
</script>

<template>
  <div class="admin-root">
    <!-- Auth Loading Screen -->
    <div v-if="authState === 'loading'" class="auth-center">
      <div class="spinner" />
      <p class="auth-loading-text">Đang xác thực hệ thống XKProduction...</p>
    </div>

    <!-- Login Screen -->
    <div v-else-if="authState === 'unauthenticated'" class="auth-center">
      <div class="login-box">
        <div class="login-brand">
          <div class="brand-badge">XK</div>
          <h1 class="brand-title">XKPRODUCTION</h1>
          <p class="brand-sub">Bảng Điều Khiển Quản Trị & Studio CRM</p>
        </div>

        <button class="btn-google-login" @click="signIn">
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Đăng nhập qua Google Admin
        </button>
      </div>
    </div>

    <!-- Forbidden Screen -->
    <div v-else-if="authState === 'forbidden'" class="auth-center">
      <div class="login-box forbidden-box">
        <div class="lock-icon">🔒</div>
        <h2>Quyền truy cập bị từ chối</h2>
        <p class="desc">Email <strong>{{ user?.email }}</strong> chưa được cấp quyền quản trị hệ thống.</p>
        <button class="btn-secondary" @click="signOut">Đăng xuất tài khoản</button>
      </div>
    </div>

    <!-- Main Admin Shell -->
    <div v-else class="admin-shell">
      <!-- Mobile Backdrop -->
      <div v-if="sidebarOpen" class="sidebar-backdrop" @click="sidebarOpen = false" />

      <!-- Sidebar -->
      <aside class="admin-sidebar" :class="{ 'sidebar--open': sidebarOpen }">
        <!-- Sidebar Brand Header -->
        <div class="sidebar-brand">
          <div class="brand-icon">
            <span class="icon-glyph">🎵</span>
          </div>
          <div class="brand-text">
            <div class="brand-name">XKPRODUCTION</div>
            <div class="brand-caption">Bảng Điều Khiển Quản Trị</div>
          </div>
          <button class="mobile-close-btn" @click="sidebarOpen = false" aria-label="Đóng menu">✕</button>
        </div>

        <!-- Navigation Menu -->
        <nav class="sidebar-nav">
          <div class="nav-group-title">VẬN HÀNH & PHÂN TÍCH</div>

          <button
            class="nav-item"
            :class="{ active: activeView === 'overview' }"
            @click="switchView('overview')"
          >
            <span class="nav-icon">📊</span>
            <span class="nav-label">Tổng Quan Hệ Thống</span>
          </button>

          <button
            class="nav-item"
            :class="{ active: activeView === 'traffic' }"
            @click="switchView('traffic')"
          >
            <span class="nav-icon">🌐</span>
            <span class="nav-label">Traffic Sources</span>
            <span class="nav-pill">Hot</span>
          </button>

          <button
            class="nav-item"
            :class="{ active: activeView === 'leads' }"
            @click="switchView('leads')"
          >
            <span class="nav-icon">📥</span>
            <span class="nav-label">Quản Lý Leads & CRM</span>
            <span v-if="leadsTotal > 0" class="nav-badge">{{ leadsTotal }}</span>
          </button>

          <button
            class="nav-item"
            :class="{ active: activeView === 'qr-builder' }"
            @click="switchView('qr-builder')"
          >
            <span class="nav-icon">🔗</span>
            <span class="nav-label">Lưu Lượng & Mã QR</span>
          </button>

          <button
            class="nav-item"
            :class="{ active: activeView === 'music-stats' }"
            @click="switchView('music-stats')"
          >
            <span class="nav-icon">🎧</span>
            <span class="nav-label">Nghe Demo & Tương Tác</span>
          </button>

          <button
            class="nav-item"
            :class="{ active: activeView === 'visitors' }"
            @click="switchView('visitors')"
          >
            <span class="nav-icon">👁️</span>
            <span class="nav-label">Nhật Ký Visitors</span>
          </button>

          <button
            class="nav-item"
            :class="{ active: activeView === 'events' }"
            @click="switchView('events')"
          >
            <span class="nav-icon">⚡</span>
            <span class="nav-label">Sự Kiện Hệ Thống</span>
          </button>

          <div class="nav-divider" />
          <div class="nav-group-title">ĐIỀU HƯỚNG NHANH</div>

          <a href="/" target="_blank" class="nav-item nav-item--external">
            <span class="nav-icon">🏠</span>
            <span class="nav-label">Về trang chủ Web</span>
            <span class="arrow-ext">↗</span>
          </a>

          <a href="/contact" target="_blank" class="nav-item nav-item--external">
            <span class="nav-icon">🎙️</span>
            <span class="nav-label">Trang Đặt Lịch & Báo Giá</span>
            <span class="arrow-ext">↗</span>
          </a>
        </nav>

        <!-- Sidebar User Footer -->
        <div class="sidebar-user">
          <img v-if="user?.photoURL" :src="user.photoURL" :alt="user.displayName || 'Admin'" class="user-avatar" referrerpolicy="no-referrer" />
          <div v-else class="user-avatar user-avatar--placeholder">XK</div>
          <div class="user-info">
            <div class="user-display">{{ user?.displayName || 'Admin Studio' }}</div>
            <div class="user-email" :title="user?.email || ''">{{ user?.email }}</div>
          </div>
          <button class="btn-logout-icon" title="Đăng xuất" @click="signOut">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </aside>

      <!-- Main Panel -->
      <div class="admin-content-area">
        <!-- Top Navigation Bar -->
        <header class="top-nav-bar">
          <div class="top-nav-left">
            <button class="hamburger-btn" @click="sidebarOpen = true" aria-label="Mở menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <div class="view-breadcrumb">
              <span class="bread-parent">XKAdmin</span>
              <span class="bread-sep">/</span>
              <span class="bread-current">
                {{
                  activeView === 'overview' ? 'Tổng Quan' :
                  activeView === 'traffic' ? 'Traffic Sources' :
                  activeView === 'leads' ? 'Leads & CRM' :
                  activeView === 'qr-builder' ? 'Lưu Lượng & Mã QR' :
                  activeView === 'music-stats' ? 'Demo Nhạc & Tương Tác' :
                  activeView === 'visitors' ? 'Visitors Log' : 'Events Log'
                }}
              </span>
            </div>
          </div>

          <div class="top-nav-right">
            <button class="btn-reload" :disabled="loading" @click="switchView(activeView)" title="Làm mới dữ liệu">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="{ 'spin-anim': loading }">
                <path d="M23 4v6h-6"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              <span class="btn-reload-text">Làm mới</span>
            </button>
          </div>
        </header>

        <!-- Loading indicator -->
        <div v-if="loading" class="top-loader-bar" />

        <!-- VIEW CONTAINER -->
        <main class="view-container">

          <!-- ═══════════════════════════════════════════════════════════════════
               1. VIEW: OVERVIEW
               ═══════════════════════════════════════════════════════════════════ -->
          <div v-if="activeView === 'overview'" class="view-block space-y-6">
            <div class="view-header">
              <div>
                <h1 class="view-title">Tổng Quan Hoạt Động Studio</h1>
                <p class="view-desc">Chỉ số chuyển đổi, lưu lượng khách hàng và tình hình đặt lịch</p>
              </div>
            </div>

            <!-- KPI Cards Grid -->
            <div class="stats-grid">
              <div class="stat-card" @click="switchView('visitors')">
                <div class="stat-icon-wrap bg-blue-glow">👁️</div>
                <div class="stat-info">
                  <div class="stat-num">{{ overview?.total_visitors?.toLocaleString('vi-VN') ?? '—' }}</div>
                  <div class="stat-text">Lượt xem trang</div>
                </div>
              </div>

              <div class="stat-card" @click="switchView('leads')">
                <div class="stat-icon-wrap bg-amber-glow">📥</div>
                <div class="stat-info">
                  <div class="stat-num">{{ overview?.total_leads?.toLocaleString('vi-VN') ?? '—' }}</div>
                  <div class="stat-text">Leads & Đặt lịch</div>
                </div>
              </div>

              <div class="stat-card" @click="switchView('music-stats')">
                <div class="stat-icon-wrap bg-purple-glow">🎵</div>
                <div class="stat-info">
                  <div class="stat-num">{{ overview?.total_audio_plays?.toLocaleString('vi-VN') ?? '—' }}</div>
                  <div class="stat-text">Lượt nghe Demo</div>
                </div>
              </div>

              <div class="stat-card" @click="switchView('traffic')">
                <div class="stat-icon-wrap bg-emerald-glow">🌐</div>
                <div class="stat-info">
                  <div class="stat-num truncate text-sm font-semibold" :title="overview?.top_pages?.[0]?.path">
                    {{ overview?.top_pages?.[0]?.path ?? '—' }}
                  </div>
                  <div class="stat-text">Trang vào nhiều nhất</div>
                </div>
              </div>
            </div>

            <!-- Dashboard 2-column Grid -->
            <div class="panel-grid-2">
              <!-- Top Pages -->
              <div class="dashboard-panel">
                <div class="panel-heading">
                  <h2 class="panel-h2">Top Trang Được Xem Nhiều Nhất</h2>
                </div>
                <div class="bar-chart-list">
                  <div v-for="pg in (overview?.top_pages ?? [])" :key="pg.path" class="chart-row">
                    <span class="chart-label" :title="pg.path">{{ pg.path }}</span>
                    <div class="chart-track">
                      <div class="chart-fill" :style="{ width: Math.min(100, (pg.visits / (overview?.top_pages?.[0]?.visits || 1)) * 100) + '%' }" />
                    </div>
                    <span class="chart-val">{{ pg.visits.toLocaleString('vi-VN') }}</span>
                  </div>
                  <div v-if="!overview?.top_pages?.length" class="empty-hint">Chưa có dữ liệu lượt xem</div>
                </div>
              </div>

              <!-- Leads by Service -->
              <div class="dashboard-panel">
                <div class="panel-heading">
                  <h2 class="panel-h2">Nhu Cầu Dịch Vụ Của Khách</h2>
                </div>
                <div class="service-pill-list">
                  <div v-for="s in (overview?.leads_by_service ?? [])" :key="s.service" class="service-pill-row">
                    <span class="service-name-tag">{{ svcLabel(s.service) }}</span>
                    <span class="service-count-tag">{{ s.count }} khách</span>
                  </div>
                  <div v-if="!overview?.leads_by_service?.length" class="empty-hint">Chưa có yêu cầu dịch vụ</div>
                </div>

                <div class="panel-subheading">Leads cần xử lý gần đây</div>
                <div class="recent-leads-mini">
                  <div v-for="l in (overview?.recent_leads?.slice(0, 5) ?? [])" :key="l.id" class="lead-mini-row">
                    <div class="lead-mini-main">
                      <strong class="lead-name">{{ l.name }}</strong>
                      <span class="badge-tag" :style="{ background: statusMeta(l.status).bg, color: statusMeta(l.status).color }">
                        {{ statusMeta(l.status).icon }} {{ statusMeta(l.status).label }}
                      </span>
                    </div>
                    <div class="lead-mini-sub">
                      <span>{{ maskPhone(l.phone) }}</span>
                      <span>·</span>
                      <span>{{ svcLabel(l.service) }}</span>
                      <span>·</span>
                      <span>{{ fmtDate(l.created_at) }}</span>
                    </div>
                  </div>
                  <div v-if="!overview?.recent_leads?.length" class="empty-hint">Chưa có leads gần đây</div>
                </div>
              </div>
            </div>
          </div>

          <!-- ═══════════════════════════════════════════════════════════════════
               2. VIEW: TRAFFIC SOURCES (Pixel-perfect replicate of reference)
               ═══════════════════════════════════════════════════════════════════ -->
          <div v-else-if="activeView === 'traffic'" class="view-block space-y-6">
            <!-- Header Section -->
            <div class="traffic-header">
              <div>
                <h1 class="text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
                  Traffic Sources
                </h1>
                <p class="text-slate-400 text-xs mt-1">
                  Every inbound channel (UTM + referrer), full list, no cap.
                </p>
              </div>

              <button class="back-link-btn" @click="switchView('overview')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="19" y1="12" x2="5" y2="12"/>
                  <polyline points="12 19 5 12 12 5"/>
                </svg>
                <span>Back to Overview</span>
              </button>
            </div>

            <!-- Controls Toolbar -->
            <div class="traffic-controls">
              <div class="range-box">
                <span class="range-label">Range</span>
                <input
                  v-model.number="trafficRangeInput"
                  type="number"
                  min="1"
                  max="365"
                  class="range-input"
                  @keyup.enter="applyTrafficRange()"
                />
                <span class="range-unit">days</span>
                <button
                  type="button"
                  class="btn-apply"
                  :disabled="trafficLoading"
                  @click="applyTrafficRange()"
                >
                  <span v-if="trafficLoading">...</span>
                  <span v-else>Apply</span>
                </button>
              </div>

              <div class="quick-ranges">
                <button class="quick-chip" :class="{ 'chip-active': trafficRange === 7 }" @click="applyTrafficRange(7)">7d</button>
                <button class="quick-chip" :class="{ 'chip-active': trafficRange === 30 }" @click="applyTrafficRange(30)">30d</button>
                <button class="quick-chip" :class="{ 'chip-active': trafficRange === 90 }" @click="applyTrafficRange(90)">90d</button>
              </div>
            </div>

            <!-- Main Card Container: SOURCES -->
            <div class="sources-card">
              <!-- Card Header -->
              <div class="sources-header">
                <h2 class="sources-title">SOURCES</h2>
                <span class="sources-meta">
                  last {{ trafficRange }}d • non-bot • {{ trafficTotal.toLocaleString('en-US') }} total
                </span>
              </div>

              <!-- Inflation Warning Notice -->
              <div class="inflation-notice">
                <div class="notice-icon">⚠️</div>
                <div class="notice-body">
                  <strong>direct</strong> is inflated — Zalo, Messenger and in-app browsers strip the referrer, so real channels land there. Read each row as that channel's floor, never as proof it is weak.
                </div>
              </div>

              <!-- Loading State -->
              <div v-if="trafficLoading && trafficSources.length === 0" class="loading-sources">
                <div v-for="i in 6" :key="i" class="skeleton-row">
                  <div class="sk-label" />
                  <div class="sk-bar" />
                  <div class="sk-count" />
                </div>
              </div>

              <!-- Empty State -->
              <div v-else-if="!trafficLoading && trafficSources.length === 0" class="empty-sources">
                <p class="empty-title">Không tìm thấy nguồn lưu lượng nào trong {{ trafficRange }} ngày qua.</p>
                <p class="empty-sub">Hãy thử mở rộng số ngày và bấm Apply.</p>
              </div>

              <!-- Inbound Sources Full List (No Cap) -->
              <div v-else class="sources-list">
                <div
                  v-for="item in trafficSources"
                  :key="item.source"
                  class="source-row group"
                >
                  <!-- Source Label -->
                  <div class="source-label" :title="item.source">
                    <span
                      v-if="item.source.startsWith('UTM ·') || item.source.startsWith('UTM -')"
                      class="label-utm"
                    >
                      {{ item.source }}
                    </span>
                    <span v-else-if="item.source === 'direct'" class="label-direct">
                      {{ item.source }}
                    </span>
                    <span v-else class="label-ref">
                      {{ item.source }}
                    </span>
                  </div>

                  <!-- Horizontal Bar -->
                  <div class="source-track">
                    <div
                      class="source-fill"
                      :class="{ 'fill-utm': item.source.startsWith('UTM'), 'fill-direct': item.source === 'direct' }"
                      :style="{ width: `${item.percentage}%` }"
                    />
                  </div>

                  <!-- Count Number -->
                  <div class="source-count">
                    {{ item.count.toLocaleString('en-US') }}
                  </div>

                  <!-- Percentage -->
                  <div class="source-percent">
                    {{ item.percentage }}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ═══════════════════════════════════════════════════════════════════
               3. VIEW: LEADS & CRM PIPELINE
               ═══════════════════════════════════════════════════════════════════ -->
          <div v-else-if="activeView === 'leads'" class="view-block space-y-6">
            <div class="view-header flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 class="view-title">Quản Lý Khách Hàng & Leads (Mini CRM)</h1>
                <p class="view-desc">Theo dõi tiến độ tư vấn, báo giá, gọi hotline hoặc chat Zalo 1-click</p>
              </div>

              <div class="flex items-center gap-3">
                <button class="btn-export" @click="exportLeadsCSV">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  <span>Xuất file Excel/CSV</span>
                </button>
              </div>
            </div>

            <!-- Leads Filters & Search Toolbar -->
            <div class="leads-toolbar">
              <div class="search-input-wrap">
                <span class="search-icon">🔍</span>
                <input
                  v-model="leadSearch"
                  type="text"
                  placeholder="Tìm tên, SĐT, ghi chú..."
                  class="search-input"
                  @keyup.enter="loadLeads"
                />
              </div>

              <div class="filter-dropdown-wrap">
                <label class="filter-lbl">Trạng thái:</label>
                <select v-model="leadStatusFilter" class="filter-select">
                  <option value="all">Tất cả trạng thái</option>
                  <option value="new">🆕 Mới nhận</option>
                  <option value="contacted">📞 Đã liên hệ</option>
                  <option value="quoting">💬 Đang báo giá</option>
                  <option value="booked">🎙️ Đã chốt lịch</option>
                  <option value="completed">✅ Hoàn thành</option>
                  <option value="cancelled">❌ Huỷ</option>
                </select>
              </div>

              <div class="filter-dropdown-wrap">
                <label class="filter-lbl">Dịch vụ:</label>
                <select v-model="leadServiceFilter" class="filter-select">
                  <option value="all">Tất cả dịch vụ</option>
                  <option value="thu-am">🎙 Thu âm</option>
                  <option value="mixing-mastering">🎚 Mix & Master</option>
                  <option value="hoa-am">🎵 Hoà âm phối khí</option>
                  <option value="mv-tvc">🎬 MV/TVC</option>
                  <option value="live-band">🎸 Live Band</option>
                  <option value="khoa-hoc">🎓 Khoá học</option>
                </select>
              </div>
            </div>

            <!-- Leads Table -->
            <div class="dashboard-panel table-panel">
              <div class="table-scroll-wrapper">
                <table class="leads-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Khách hàng</th>
                      <th>Liên hệ nhanh</th>
                      <th>Dịch vụ</th>
                      <th>Trạng thái Pipeline</th>
                      <th>Lời nhắn & Ghi chú nội bộ</th>
                      <th>Thời gian</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="l in leads" :key="l.id" :class="{ 'row-updating': updatingLeadId === l.id }">
                      <td class="td-lead-id">#{{ l.id }}</td>
                      <td class="td-lead-user">
                        <div class="lead-strong-name">{{ l.name }}</div>
                        <div v-if="l.email" class="lead-email-sub">{{ l.email }}</div>
                      </td>
                      <td class="td-lead-actions">
                        <div class="lead-phone-row">
                          <span class="phone-display">{{ l.phone }}</span>
                          <div class="quick-contact-btns">
                            <a :href="`tel:${cleanPhone(l.phone)}`" class="btn-quick-call" title="Gọi điện thoại ngay">
                              📞 Gọi
                            </a>
                            <a :href="`https://zalo.me/${cleanPhone(l.phone)}`" target="_blank" class="btn-quick-zalo" title="Mở chat Zalo">
                              💬 Zalo
                            </a>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="badge-service">{{ svcLabel(l.service) }}</span>
                        <div class="source-tag">Nguồn: {{ l.source || 'web' }}</div>
                      </td>
                      <td class="td-lead-status">
                        <select
                          :value="l.status || 'new'"
                          class="status-dropdown"
                          :style="{ borderColor: statusMeta(l.status).color, color: statusMeta(l.status).color }"
                          @change="updateLeadStatus(l.id, ($event.target as HTMLSelectElement).value)"
                        >
                          <option value="new">🆕 Mới nhận</option>
                          <option value="contacted">📞 Đã liên hệ</option>
                          <option value="quoting">💬 Đang báo giá</option>
                          <option value="booked">🎙️ Đã chốt lịch</option>
                          <option value="completed">✅ Hoàn thành</option>
                          <option value="cancelled">❌ Huỷ / Ko chốt</option>
                        </select>
                      </td>
                      <td class="td-lead-notes">
                        <div v-if="l.message" class="cust-message" :title="l.message">
                          "{{ l.message }}"
                        </div>
                        <!-- Note editing -->
                        <div v-if="editingNoteId === l.id" class="note-edit-box">
                          <textarea v-model="editingNoteText" class="note-textarea" rows="2" placeholder="Nhập ghi chú phòng thu..." />
                          <div class="note-btn-row">
                            <button class="btn-save-note" @click="saveLeadNote(l.id)">Lưu</button>
                            <button class="btn-cancel-note" @click="editingNoteId = null">Huỷ</button>
                          </div>
                        </div>
                        <div v-else class="note-display-box" @click="startEditNote(l)">
                          <span v-if="l.notes" class="note-text">📝 {{ l.notes }}</span>
                          <span v-else class="note-placeholder">+ Thêm ghi chú</span>
                        </div>
                      </td>
                      <td class="td-lead-date">
                        {{ fmtDate(l.created_at) }}
                      </td>
                    </tr>
                    <tr v-if="!leads.length">
                      <td colspan="7" class="empty-leads">
                        Không tìm thấy leads nào phù hợp bộ lọc.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- ═══════════════════════════════════════════════════════════════════
               4. VIEW: QR & UTM CAMPAIGN BUILDER
               ═══════════════════════════════════════════════════════════════════ -->
          <div v-else-if="activeView === 'qr-builder'" class="view-block space-y-6">
            <div class="view-header">
              <div>
                <h1 class="view-title">Bộ Tạo Link Chiến Dịch & Mã QR Studio</h1>
                <p class="view-desc">Tự động gắn thẻ UTM để đo lường chính xác khách đến từ TikTok, Facebook, Standee, Namecard</p>
              </div>
            </div>

            <div class="panel-grid-2">
              <!-- Form Builder -->
              <div class="dashboard-panel space-y-4">
                <div class="panel-heading">
                  <h2 class="panel-h2">1. Cấu Hình Tham Số Chiến Dịch</h2>
                </div>

                <div class="form-item">
                  <label class="form-lbl">Trang đích (Destination URL):</label>
                  <input v-model="qrBaseUrl" type="text" class="form-input" placeholder="https://xkproduction.com/thu-am" />
                  <div class="quick-destinations">
                    <button class="tag-btn" @click="qrBaseUrl = 'https://xkproduction.com/contact'">/contact</button>
                    <button class="tag-btn" @click="qrBaseUrl = 'https://xkproduction.com/thu-am'">/thu-am</button>
                    <button class="tag-btn" @click="qrBaseUrl = 'https://xkproduction.com/mix-master'">/mix-master</button>
                    <button class="tag-btn" @click="qrBaseUrl = 'https://xkproduction.com/courses'">/courses</button>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div class="form-item">
                    <label class="form-lbl">Nguồn (utm_source):</label>
                    <input v-model="qrSource" type="text" class="form-input" placeholder="tiktok, facebook, zalo, standee..." />
                    <div class="quick-destinations">
                      <button class="tag-btn" @click="qrSource = 'tiktok'">tiktok</button>
                      <button class="tag-btn" @click="qrSource = 'facebook'">facebook</button>
                      <button class="tag-btn" @click="qrSource = 'zalo'">zalo</button>
                      <button class="tag-btn" @click="qrSource = 'standee'">standee</button>
                    </div>
                  </div>

                  <div class="form-item">
                    <label class="form-lbl">Hình thức (utm_medium):</label>
                    <input v-model="qrMedium" type="text" class="form-input" placeholder="bio, reel, post, qr_print..." />
                    <div class="quick-destinations">
                      <button class="tag-btn" @click="qrMedium = 'bio'">bio</button>
                      <button class="tag-btn" @click="qrMedium = 'reel'">reel</button>
                      <button class="tag-btn" @click="qrMedium = 'post'">post</button>
                      <button class="tag-btn" @click="qrMedium = 'qr_print'">qr_print</button>
                    </div>
                  </div>
                </div>

                <div class="form-item">
                  <label class="form-lbl">Tên chiến dịch (utm_campaign):</label>
                  <input v-model="qrCampaign" type="text" class="form-input" placeholder="khuyen-mai-he, demo-rock, k12..." />
                </div>

                <div class="form-item">
                  <label class="form-lbl">Nội dung bổ sung (utm_content - tuỳ chọn):</label>
                  <input v-model="qrContent" type="text" class="form-input" placeholder="video-part1, poster-quay-mv..." />
                </div>

                <div class="generated-url-box">
                  <div class="url-lbl">Link Tracking Hoàn Chỉnh:</div>
                  <div class="url-text font-mono">{{ generatedUtmUrl }}</div>
                  <button class="btn-copy-url" @click="copyUtmLink">
                    <span v-if="copiedLink">✅ Đã sao chép link!</span>
                    <span v-else>📋 Sao chép Link</span>
                  </button>
                </div>
              </div>

              <!-- QR Code Preview & Download -->
              <div class="dashboard-panel qr-preview-panel">
                <div class="panel-heading">
                  <h2 class="panel-h2">2. Mã QR Chuẩn Vector In Ấn</h2>
                </div>

                <div class="qr-display-box">
                  <img :src="qrImageUrl" alt="Mã QR XKProduction" class="qr-image" />
                </div>

                <div class="qr-actions">
                  <a :href="qrImageUrl" download="xkproduction-qr.png" target="_blank" class="btn-download-qr">
                    💾 Tải Ảnh Mã QR (PNG Sắc Nét)
                  </a>
                </div>

                <div class="qr-guide-box">
                  <div class="guide-title">💡 Cách ứng dụng hiệu quả cho Studio:</div>
                  <ul class="guide-list">
                    <li>Dán mã QR lên <strong>Standee phòng thu</strong> hoặc <strong>Namecard</strong> với nguồn <code>standee</code> để biết khách quét từ phòng chờ.</li>
                    <li>Dán link kèm UTM vào <strong>Bio TikTok & Mô tả YouTube</strong> để xem video nào mang lại nhiều khách nhất trên tab <em>Traffic Sources</em>!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- ═══════════════════════════════════════════════════════════════════
               5. VIEW: MUSIC DEMO STATS & CONVERSIONS
               ═══════════════════════════════════════════════════════════════════ -->
          <div v-else-if="activeView === 'music-stats'" class="view-block space-y-6">
            <div class="view-header">
              <div>
                <h1 class="view-title">Thống Kê Demo Âm Nhạc & Chuyển Đổi</h1>
                <p class="view-desc">Đo lường bài hát demo nào thuyết phục khách hàng nhất và nút kêu gọi nào có tỷ lệ click cao nhất</p>
              </div>
            </div>

            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon-wrap bg-purple-glow">🎵</div>
                <div class="stat-info">
                  <div class="stat-num">{{ musicStats?.total_plays?.toLocaleString('vi-VN') ?? '0' }}</div>
                  <div class="stat-text">Tổng lượt bấm nghe Demo</div>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon-wrap bg-emerald-glow">⚡</div>
                <div class="stat-info">
                  <div class="stat-num">{{ musicStats?.total_ctas?.toLocaleString('vi-VN') ?? '0' }}</div>
                  <div class="stat-text">Tổng lượt click nút Liên hệ / CTA</div>
                </div>
              </div>
            </div>

            <div class="panel-grid-2">
              <!-- Top Demo Songs -->
              <div class="dashboard-panel">
                <div class="panel-heading">
                  <h2 class="panel-h2">Top Bản Demo Được Khách Nghe Nhiều Nhất</h2>
                </div>
                <div class="music-list">
                  <div v-for="(song, idx) in (musicStats?.top_demos ?? [])" :key="idx" class="song-row">
                    <div class="song-rank">{{ Number(idx) + 1 }}</div>
                    <div class="song-details">
                      <div class="song-title">{{ song.title }}</div>
                      <div class="song-sub">Lần nghe gần nhất: {{ fmtDate(song.last_played_at) }}</div>
                    </div>
                    <div class="song-plays">
                      <span class="plays-badge">{{ song.play_count }} lượt</span>
                    </div>
                  </div>
                  <div v-if="!musicStats?.top_demos?.length" class="empty-hint">
                    Chưa ghi nhận lượt nghe nào (sự kiện sẽ tự động xuất hiện khi khách bấm Play trên web).
                  </div>
                </div>
              </div>

              <!-- Top CTAs Clicked -->
              <div class="dashboard-panel">
                <div class="panel-heading">
                  <h2 class="panel-h2">Các Nút Hành Động Được Bấm Nhiều Nhất</h2>
                </div>
                <div class="music-list">
                  <div v-for="(cta, idx) in (musicStats?.top_ctas ?? [])" :key="idx" class="song-row">
                    <div class="song-rank song-rank--cta">{{ Number(idx) + 1 }}</div>
                    <div class="song-details">
                      <div class="song-title">{{ cta.button_name }}</div>
                      <div class="song-sub">Lần bấm gần nhất: {{ fmtDate(cta.last_clicked_at) }}</div>
                    </div>
                    <div class="song-plays">
                      <span class="plays-badge plays-badge--green">{{ cta.click_count }} click</span>
                    </div>
                  </div>
                  <div v-if="!musicStats?.top_ctas?.length" class="empty-hint">
                    Chưa ghi nhận sự kiện click nút CTA.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ═══════════════════════════════════════════════════════════════════
               6. VIEW: VISITORS LOG
               ═══════════════════════════════════════════════════════════════════ -->
          <div v-else-if="activeView === 'visitors'" class="view-block space-y-6">
            <div class="view-header">
              <div>
                <h1 class="view-title">Nhật Ký Khách Truy Cập (Visitor Logs)</h1>
                <p class="view-desc">Chi tiết IP (đã ẩn danh), đường dẫn, số lần xem và UTM của từng lượt ghé thăm</p>
              </div>
            </div>

            <div class="dashboard-panel table-panel">
              <div class="table-scroll-wrapper">
                <table class="leads-table">
                  <thead>
                    <tr>
                      <th>IP (Masked)</th>
                      <th>Trang xem</th>
                      <th>Lượt xem</th>
                      <th>Nguồn / Referrer</th>
                      <th>Chiến dịch UTM</th>
                      <th>Lần cuối ghé thăm</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="v in visitors" :key="v.id">
                      <td class="td-ip font-mono text-xs">{{ v.ip_masked }}</td>
                      <td class="td-path font-mono text-xs text-indigo-300">{{ v.path }}</td>
                      <td><span class="visit-badge">{{ v.visit_count }}</span></td>
                      <td class="td-ref font-mono text-xs">{{ v.referrer || 'direct' }}</td>
                      <td class="td-utm text-xs">
                        <span v-if="v.utm_source" class="utm-pill">UTM: {{ v.utm_source }}</span>
                        <span v-else class="text-slate-600">—</span>
                      </td>
                      <td class="td-date text-xs">{{ fmtDate(v.last_seen_at) }}</td>
                    </tr>
                    <tr v-if="!visitors.length">
                      <td colspan="6" class="empty-leads">Chưa có dữ liệu lượt truy cập.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- ═══════════════════════════════════════════════════════════════════
               7. VIEW: EVENTS LOG
               ═══════════════════════════════════════════════════════════════════ -->
          <div v-else-if="activeView === 'events'" class="view-block space-y-6">
            <div class="view-header">
              <div>
                <h1 class="view-title">Sự Kiện Hệ Thống (Action Logs)</h1>
                <p class="view-desc">Mọi hành vi tương tác trên website được ghi lại thời gian thực</p>
              </div>
            </div>

            <div class="panel-grid-2">
              <div class="dashboard-panel">
                <div class="panel-heading">
                  <h2 class="panel-h2">Phân Bổ Theo Hành Động</h2>
                </div>
                <div class="bar-chart-list">
                  <div v-for="e in (events?.by_action ?? [])" :key="e.action" class="chart-row">
                    <span class="chart-label font-mono">{{ e.action }}</span>
                    <div class="chart-track">
                      <div class="chart-fill bg-indigo-500" :style="{ width: (e.count / (events?.by_action?.[0]?.count || 1) * 100) + '%' }" />
                    </div>
                    <span class="chart-val font-mono">{{ e.count }}</span>
                  </div>
                  <div v-if="!events?.by_action?.length" class="empty-hint">Chưa có sự kiện nào</div>
                </div>
              </div>

              <div class="dashboard-panel">
                <div class="panel-heading">
                  <h2 class="panel-h2">Nhật Ký Sự Kiện Gần Nhất</h2>
                </div>
                <div class="recent-events-list">
                  <div v-for="(ev, idx) in (events?.recent ?? [])" :key="idx" class="event-row">
                    <div class="event-main">
                      <span class="event-badge">{{ ev.action }}</span>
                      <span v-if="ev.label" class="event-label font-mono text-xs text-slate-300">{{ ev.label }}</span>
                    </div>
                    <div class="event-meta text-xs text-slate-500">
                      <span>{{ ev.page || '—' }}</span>
                      <span>·</span>
                      <span>{{ fmtDate(ev.created_at) }}</span>
                    </div>
                  </div>
                  <div v-if="!events?.recent?.length" class="empty-hint">Chưa có sự kiện gần đây</div>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Reset & Layout Shell ─────────────────────────────────────────────────── */
.admin-root {
  min-height: 100dvh;
  background-color: #06080f;
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.auth-center {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.login-box {
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.75rem 2rem;
  width: min(440px, 92vw);
  text-align: center;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
}

.brand-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: linear-gradient(135deg, #4f46e5, #9333ea);
  color: #fff;
  font-weight: 800;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 0 24px rgba(79, 70, 229, 0.4);
}

.brand-title {
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #fff;
  margin-bottom: 0.25rem;
}

.brand-sub {
  font-size: 0.82rem;
  color: #94a3b8;
  margin-bottom: 2rem;
}

.btn-google-login {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: #fff;
  color: #0f172a;
  font-weight: 600;
  font-size: 0.92rem;
  padding: 0.8rem 1.25rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-google-login:hover {
  background: #f8fafc;
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.admin-shell {
  display: flex;
  min-height: 100dvh;
}

/* ── Sidebar ─────────────────────────────────────────────────────────────── */
.admin-sidebar {
  width: 260px;
  background: #090c15;
  border-right: 1px solid #172033;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  user-select: none;
  z-index: 50;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.sidebar-brand {
  padding: 1.25rem 1.25rem 1rem;
  border-bottom: 1px solid #172033;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.brand-name {
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #e0e7ff;
}

.brand-caption {
  font-size: 0.68rem;
  color: #64748b;
  font-weight: 500;
}

.mobile-close-btn {
  display: none;
  margin-left: auto;
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 1.2rem;
  cursor: pointer;
}

.sidebar-nav {
  flex: 1;
  padding: 0.85rem 0.65rem;
  overflow-y: auto;
}

.nav-group-title {
  padding: 0.5rem 0.65rem 0.25rem;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #475569;
  text-transform: uppercase;
}

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.6rem 0.75rem;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #94a3b8;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.15s ease;
  margin-bottom: 2px;
}
.nav-item:hover {
  background: rgba(255, 255, 255, 0.04);
  color: #f1f5f9;
}
.nav-item.active {
  background: rgba(99, 102, 241, 0.14);
  border-color: rgba(99, 102, 241, 0.28);
  color: #a5b4fc;
  font-weight: 600;
}

.nav-icon {
  font-size: 0.95rem;
}

.nav-label {
  flex: 1;
  text-align: left;
}

.nav-pill {
  font-size: 0.62rem;
  background: #4f46e5;
  color: #fff;
  font-weight: 700;
  padding: 0.1rem 0.4rem;
  border-radius: 9999px;
  text-transform: uppercase;
}

.nav-badge {
  font-size: 0.68rem;
  background: #f59e0b;
  color: #000;
  font-weight: 800;
  padding: 0.1rem 0.45rem;
  border-radius: 9999px;
}

.arrow-ext {
  font-size: 0.75rem;
  color: #475569;
}

.nav-divider {
  height: 1px;
  background: #172033;
  margin: 0.75rem 0.5rem;
}

.sidebar-user {
  padding: 0.85rem 1rem;
  border-top: 1px solid #172033;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  background: rgba(0, 0, 0, 0.15);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.user-avatar--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #312e81;
  color: #c7d2fe;
  font-weight: 700;
  font-size: 0.75rem;
}

.user-info {
  flex: 1;
  min-width: 0;
}
.user-display {
  font-size: 0.78rem;
  font-weight: 600;
  color: #f1f5f9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user-email {
  font-size: 0.68rem;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-logout-icon {
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 8px;
  transition: all 0.15s ease;
}
.btn-logout-icon:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

/* ── Content Area & Top Bar ──────────────────────────────────────────────── */
.admin-content-area {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.top-nav-bar {
  height: 56px;
  background: rgba(9, 12, 21, 0.85);
  border-bottom: 1px solid #172033;
  backdrop-filter: blur(12px);
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 30;
}

.top-nav-left {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.hamburger-btn {
  display: none;
  background: transparent;
  border: none;
  color: #cbd5e1;
  cursor: pointer;
}

.view-breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.82rem;
}
.bread-parent { color: #64748b; }
.bread-sep { color: #334155; }
.bread-current { color: #e2e8f0; font-weight: 600; }

.btn-reload {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #131a2b;
  border: 1px solid #1e293b;
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.btn-reload:hover {
  background: #1e293b;
  color: #f1f5f9;
}

.spin-anim {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.top-loader-bar {
  height: 2px;
  background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899);
  animation: pulse-loader 1.5s ease-in-out infinite;
}
@keyframes pulse-loader {
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
}

.view-container {
  flex: 1;
  padding: 1.5rem 2rem;
  max-width: 1380px;
  width: 100%;
  margin: 0 auto;
}

.view-header {
  margin-bottom: 1.25rem;
}
.view-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #f8fafc;
  letter-spacing: -0.02em;
}
.view-desc {
  font-size: 0.78rem;
  color: #94a3b8;
  margin-top: 0.2rem;
}

/* ── KPI Cards ───────────────────────────────────────────────────────────── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: #0d1220;
  border: 1px solid #172033;
  border-radius: 14px;
  padding: 1rem 1.2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.stat-card:hover {
  border-color: #2e3c59;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.stat-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}
.bg-blue-glow { background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.2); }
.bg-amber-glow { background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.2); }
.bg-purple-glow { background: rgba(168, 85, 247, 0.12); border: 1px solid rgba(168, 85, 247, 0.2); }
.bg-emerald-glow { background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.2); }

.stat-num {
  font-size: 1.45rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
}
.stat-text {
  font-size: 0.74rem;
  color: #64748b;
  font-weight: 500;
}

/* ── Panels & Grid ───────────────────────────────────────────────────────── */
.panel-grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 1.25rem;
}

.dashboard-panel {
  background: #0d1220;
  border: 1px solid #172033;
  border-radius: 16px;
  padding: 1.25rem 1.4rem;
}

.panel-heading {
  margin-bottom: 1rem;
}
.panel-h2 {
  font-size: 0.85rem;
  font-weight: 700;
  color: #e2e8f0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.panel-subheading {
  font-size: 0.75rem;
  font-weight: 700;
  color: #94a3b8;
  margin-top: 1.5rem;
  margin-bottom: 0.65rem;
  text-transform: uppercase;
}

/* ── Bar Charts ──────────────────────────────────────────────────────────── */
.bar-chart-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.chart-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.78rem;
}
.chart-label {
  width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #94a3b8;
}
.chart-track {
  flex: 1;
  height: 7px;
  background: #141c2e;
  border-radius: 9999px;
  overflow: hidden;
}
.chart-fill {
  height: 100%;
  background: #6366f1;
  border-radius: 9999px;
  transition: width 0.4s ease;
}
.chart-val {
  width: 45px;
  text-align: right;
  font-weight: 700;
  color: #f1f5f9;
}

.service-pill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.service-pill-row {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #131a2c;
  border: 1px solid #1e293b;
  padding: 0.35rem 0.65rem;
  border-radius: 8px;
  font-size: 0.76rem;
}
.service-name-tag { color: #e2e8f0; font-weight: 500; }
.service-count-tag { color: #38bdf8; font-weight: 700; }

.recent-leads-mini {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.lead-mini-row {
  padding: 0.5rem 0.65rem;
  background: #101626;
  border-radius: 8px;
  font-size: 0.76rem;
}
.lead-mini-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.lead-name { color: #f1f5f9; }
.lead-mini-sub {
  display: flex;
  gap: 0.35rem;
  font-size: 0.7rem;
  color: #64748b;
  margin-top: 0.2rem;
}

/* ═══════════════════════════════════════════════════════════════════════════
   TRAFFIC SOURCES (Matching reference UI)
   ═══════════════════════════════════════════════════════════════════════════ */
.traffic-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #172033;
}

.back-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: transparent;
  border: none;
  color: #818cf8;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.15s ease;
}
.back-link-btn:hover { color: #a5b4fc; }

.traffic-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.range-box {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #0d1220;
  border: 1px solid #172033;
  padding: 0.35rem 0.65rem;
  border-radius: 12px;
  font-size: 0.75rem;
}
.range-label { color: #94a3b8; font-weight: 500; }
.range-input {
  width: 52px;
  background: #06080f;
  border: 1px solid #1e293b;
  border-radius: 6px;
  color: #f1f5f9;
  text-align: center;
  font-family: monospace;
  font-size: 0.75rem;
  padding: 0.15rem 0.25rem;
}
.range-unit { color: #64748b; }

.btn-apply {
  background: #4f46e5;
  color: #fff;
  border: none;
  font-weight: 600;
  font-size: 0.72rem;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s ease;
}
.btn-apply:hover { background: #4338ca; }

.quick-ranges {
  display: flex;
  gap: 0.35rem;
}
.quick-chip {
  background: #0d1220;
  border: 1px solid #172033;
  color: #94a3b8;
  font-size: 0.72rem;
  padding: 0.35rem 0.6rem;
  border-radius: 8px;
  cursor: pointer;
}
.quick-chip:hover { color: #f1f5f9; border-color: #2e3c59; }
.chip-active {
  background: rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.4);
  color: #a5b4fc;
  font-weight: 600;
}

.sources-card {
  background: rgba(13, 18, 32, 0.9);
  border: 1px solid #172033;
  border-radius: 18px;
  padding: 1.5rem;
}

.sources-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #141c2e;
  padding-bottom: 0.75rem;
  margin-bottom: 0.85rem;
}
.sources-title {
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #e2e8f0;
}
.sources-meta {
  font-size: 0.72rem;
  color: #64748b;
  font-family: monospace;
}

.inflation-notice {
  background: rgba(10, 14, 26, 0.9);
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-size: 0.72rem;
  line-height: 1.45;
  color: #94a3b8;
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  margin-bottom: 1rem;
}
.notice-icon {
  font-size: 0.95rem;
  flex-shrink: 0;
}
.notice-body strong {
  color: #f1f5f9;
}

.sources-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.source-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  padding: 0.25rem 0.4rem;
  border-radius: 6px;
  transition: background 0.15s ease;
}
.source-row:hover {
  background: rgba(255, 255, 255, 0.03);
}

.source-label {
  width: 170px;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: monospace;
}
.label-utm { color: #a5b4fc; font-weight: 600; }
.label-direct { color: #fde047; font-weight: 600; }
.label-ref { color: #cbd5e1; }

.source-track {
  flex: 1;
  height: 9px;
  background: #06080f;
  border: 1px solid #172033;
  border-radius: 9999px;
  overflow: hidden;
}
.source-fill {
  height: 100%;
  background: #818cf8;
  border-radius: 9999px;
  transition: width 0.5s ease;
}
.fill-utm { background: #6366f1; }
.fill-direct { background: #f59e0b; }

.source-count {
  width: 50px;
  text-align: right;
  font-family: monospace;
  font-weight: 700;
  color: #f8fafc;
}
.source-percent {
  width: 38px;
  text-align: right;
  font-family: monospace;
  color: #64748b;
}

/* ═══════════════════════════════════════════════════════════════════════════
   LEADS CRM PIPELINE
   ═══════════════════════════════════════════════════════════════════════════ */
.leads-toolbar {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.search-input-wrap {
  position: relative;
  flex: 1;
  min-width: 220px;
}
.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.75rem;
  color: #64748b;
}
.search-input {
  width: 100%;
  background: #0d1220;
  border: 1px solid #172033;
  border-radius: 10px;
  padding: 0.55rem 0.75rem 0.55rem 2.2rem;
  font-size: 0.78rem;
  color: #f1f5f9;
}
.search-input:focus {
  outline: none;
  border-color: #6366f1;
}

.filter-dropdown-wrap {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}
.filter-lbl {
  font-size: 0.72rem;
  color: #64748b;
}
.filter-select {
  background: #0d1220;
  border: 1px solid #172033;
  border-radius: 8px;
  padding: 0.45rem 0.65rem;
  font-size: 0.75rem;
  color: #e2e8f0;
}

.btn-export {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: #10b981;
  color: #064e3b;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.5rem 0.9rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
}
.btn-export:hover {
  background: #34d399;
}

.table-panel {
  padding: 0;
  overflow: hidden;
}

.table-scroll-wrapper {
  overflow-x: auto;
}

.leads-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.78rem;
}

.leads-table th {
  background: #080c17;
  padding: 0.75rem 1rem;
  color: #64748b;
  font-weight: 700;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #172033;
}

.leads-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #101726;
  color: #cbd5e1;
  vertical-align: top;
}

.leads-table tr:hover td {
  background: rgba(255, 255, 255, 0.015);
}

.td-lead-id {
  font-family: monospace;
  color: #64748b;
}

.lead-strong-name {
  font-weight: 700;
  color: #f1f5f9;
}
.lead-email-sub {
  font-size: 0.7rem;
  color: #64748b;
}

.lead-phone-row {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.phone-display {
  font-weight: 600;
  font-family: monospace;
  color: #e2e8f0;
}

.quick-contact-btns {
  display: flex;
  gap: 0.35rem;
}
.btn-quick-call {
  display: inline-block;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.25);
  color: #38bdf8;
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.15rem 0.45rem;
  border-radius: 6px;
  text-decoration: none;
}
.btn-quick-zalo {
  display: inline-block;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: #10b981;
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.15rem 0.45rem;
  border-radius: 6px;
  text-decoration: none;
}

.badge-service {
  display: inline-block;
  background: rgba(99, 102, 241, 0.12);
  color: #a5b4fc;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
}
.source-tag {
  font-size: 0.68rem;
  color: #64748b;
  margin-top: 0.2rem;
}

.status-dropdown {
  background: #090c17;
  border: 1px solid #1e293b;
  border-radius: 8px;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.35rem 0.5rem;
  cursor: pointer;
}

.cust-message {
  font-style: italic;
  color: #94a3b8;
  margin-bottom: 0.4rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.note-display-box {
  background: #06080f;
  border: 1px dashed #1e293b;
  border-radius: 6px;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  font-size: 0.72rem;
}
.note-display-box:hover {
  border-color: #4f46e5;
}
.note-text { color: #fde047; }
.note-placeholder { color: #475569; }

.note-textarea {
  width: 100%;
  background: #06080f;
  border: 1px solid #4f46e5;
  border-radius: 6px;
  padding: 0.35rem;
  font-size: 0.72rem;
  color: #fff;
  resize: vertical;
}
.note-btn-row {
  display: flex;
  gap: 0.35rem;
  margin-top: 0.25rem;
}
.btn-save-note {
  background: #4f46e5;
  color: #fff;
  border: none;
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}
.btn-cancel-note {
  background: #1e293b;
  color: #94a3b8;
  border: none;
  font-size: 0.65rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}

/* ═══════════════════════════════════════════════════════════════════════════
   QR & UTM BUILDER
   ═══════════════════════════════════════════════════════════════════════════ */
.form-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.form-lbl {
  font-size: 0.74rem;
  font-weight: 600;
  color: #94a3b8;
}
.form-input {
  background: #06080f;
  border: 1px solid #1e293b;
  border-radius: 8px;
  padding: 0.55rem 0.75rem;
  font-size: 0.8rem;
  color: #f8fafc;
}
.form-input:focus {
  outline: none;
  border-color: #6366f1;
}

.quick-destinations {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
  margin-top: 0.2rem;
}
.tag-btn {
  background: #101626;
  border: 1px solid #1e293b;
  color: #818cf8;
  font-size: 0.68rem;
  padding: 0.15rem 0.45rem;
  border-radius: 6px;
  cursor: pointer;
}
.tag-btn:hover { background: #172033; }

.generated-url-box {
  background: #06080f;
  border: 1px solid #2e3c59;
  border-radius: 10px;
  padding: 0.85rem;
}
.url-lbl {
  font-size: 0.7rem;
  font-weight: 700;
  color: #38bdf8;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}
.url-text {
  font-size: 0.72rem;
  color: #f1f5f9;
  word-break: break-all;
  line-height: 1.4;
  margin-bottom: 0.65rem;
}
.btn-copy-url {
  background: #4f46e5;
  color: #fff;
  border: none;
  font-weight: 600;
  font-size: 0.74rem;
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
  cursor: pointer;
}

.qr-preview-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.qr-display-box {
  background: #fff;
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  margin: 1rem 0;
}
.qr-image {
  width: 200px;
  height: 200px;
  display: block;
}

.btn-download-qr {
  display: inline-block;
  background: #10b981;
  color: #064e3b;
  font-weight: 700;
  font-size: 0.78rem;
  padding: 0.55rem 1.25rem;
  border-radius: 10px;
  text-decoration: none;
}
.btn-download-qr:hover { background: #34d399; }

.qr-guide-box {
  margin-top: 1.5rem;
  background: #06080f;
  border: 1px solid #172033;
  border-radius: 10px;
  padding: 0.85rem;
  text-align: left;
  font-size: 0.72rem;
  color: #94a3b8;
}
.guide-title {
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 0.35rem;
}
.guide-list {
  padding-left: 1.2rem;
  line-height: 1.5;
}

/* ═══════════════════════════════════════════════════════════════════════════
   MUSIC STATS & ACTIONS
   ═══════════════════════════════════════════════════════════════════════════ */
.music-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}
.song-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  background: #101626;
  border: 1px solid #172033;
  border-radius: 10px;
  padding: 0.65rem 0.85rem;
}
.song-rank {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(168, 85, 247, 0.15);
  color: #c084fc;
  font-weight: 800;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.song-rank--cta {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
}
.song-details {
  flex: 1;
  min-width: 0;
}
.song-title {
  font-weight: 700;
  font-size: 0.8rem;
  color: #f1f5f9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.song-sub {
  font-size: 0.68rem;
  color: #64748b;
}
.plays-badge {
  background: rgba(168, 85, 247, 0.15);
  color: #e9d5ff;
  font-weight: 700;
  font-size: 0.72rem;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  font-family: monospace;
}
.plays-badge--green {
  background: rgba(16, 185, 129, 0.15);
  color: #a7f3d0;
}

.event-row {
  padding: 0.5rem 0;
  border-bottom: 1px solid #141c2e;
}
.event-badge {
  background: #1e293b;
  color: #a5b4fc;
  font-size: 0.7rem;
  font-family: monospace;
  font-weight: 600;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  margin-right: 0.4rem;
}

.empty-hint {
  font-size: 0.75rem;
  color: #64748b;
  text-align: center;
  padding: 1.5rem 0;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 1rem;
}

/* ── Responsive ──────────────────────────────────────────────────────────── */
@media (max-width: 960px) {
  .admin-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    transform: translateX(-100%);
  }
  .sidebar--open {
    transform: translateX(0);
  }
  .sidebar-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    z-index: 40;
  }
  .mobile-close-btn { display: block; }
  .hamburger-btn { display: block; }
  .view-container { padding: 1rem; }
}
</style>
