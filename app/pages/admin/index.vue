<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import type { User } from 'firebase/auth'

definePageMeta({ ssr: false, robots: false })
useHead({ title: 'Admin Dashboard — XKProduction', meta: [{ name: 'robots', content: 'noindex,nofollow' }] })

// ── Auth state ──────────────────────────────────────────────────────────────
type AuthState = 'loading' | 'unauthenticated' | 'forbidden' | 'authenticated'
const authState = ref<AuthState>('loading')
const user = ref<User | null>(null)
const idToken = ref<string | null>(null)

// ── Data ────────────────────────────────────────────────────────────────────
const overview = ref<any>(null)
const leads = ref<any[]>([])
const leadsTotal = ref(0)
const visitors = ref<any[]>([])
const visitorsTotal = ref(0)
const events = ref<any>(null)
const loading = ref(false)
const activeTab = ref<'overview' | 'leads' | 'visitors' | 'events'>('overview')

// ── Firebase auth ────────────────────────────────────────────────────────────
async function getFirebaseAuth() {
  const [{ initializeApp, getApps }, { getAuth }] = await Promise.all([
    import('firebase/app'),
    import('firebase/auth')
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

async function loadLeads() {
  const token = await getValidToken()
  if (!token) return
  const data = await $fetch<any>('/api/admin/leads', { headers: { Authorization: `Bearer ${token}` } })
  leads.value = data.leads
  leadsTotal.value = data.total
}

async function loadVisitors() {
  const token = await getValidToken()
  if (!token) return
  const data = await $fetch<any>('/api/admin/visitors', { headers: { Authorization: `Bearer ${token}` } })
  visitors.value = data.visitors
  visitorsTotal.value = data.total
}

async function loadEvents() {
  const token = await getValidToken()
  if (!token) return
  const data = await $fetch<any>('/api/admin/events', { headers: { Authorization: `Bearer ${token}` } })
  events.value = data
}

async function switchTab(tab: typeof activeTab.value) {
  activeTab.value = tab
  if (tab === 'leads' && !leads.value.length) await loadLeads()
  if (tab === 'visitors' && !visitors.value.length) await loadVisitors()
  if (tab === 'events' && !events.value) await loadEvents()
}

// ── Init ─────────────────────────────────────────────────────────────────────
onMounted(async () => {
  const [{ onAuthStateChanged }, auth] = await Promise.all([
    import('firebase/auth'),
    getFirebaseAuth()
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

// ── Helpers ───────────────────────────────────────────────────────────────────
const serviceLabel: Record<string, string> = {
  'thu-am': '🎙 Thu âm', 'mixing-mastering': '🎚 Mix & Master',
  'hoa-am': '🎵 Hoà âm', 'mv-tvc': '🎬 MV/TVC',
  'live-band': '🎸 Live Band', 'khoa-hoc': '🎓 Khoá học', 'other': 'Khác',
}
function svcLabel(s: string | null) { return s ? (serviceLabel[s] ?? s) : '—' }
function fmtDate(d: string) { return new Date(d).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' }) }
function maskPhone(p: string) { return p.replace(/(\d{3})\d{4}(\d+)/, '$1****$2') }

const topPageMax = computed(() => overview.value?.top_pages?.[0]?.visits ?? 1)
</script>

<template>
  <!-- Loading -->
  <div v-if="authState === 'loading'" class="auth-screen">
    <div class="spinner" />
  </div>

  <!-- Login -->
  <div v-else-if="authState === 'unauthenticated'" class="auth-screen">
    <div class="login-card">
      <img src="/favicon/favicon-96x96.png" alt="Logo" class="login-logo" />
      <h1 class="login-title">XKProduction Admin</h1>
      <p class="login-sub">Đăng nhập để truy cập bảng điều khiển</p>
      <button class="google-btn" @click="signIn">
        <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
        Đăng nhập với Google
      </button>
    </div>
  </div>

  <!-- Forbidden -->
  <div v-else-if="authState === 'forbidden'" class="auth-screen">
    <div class="login-card">
      <div class="forbidden-icon">🔒</div>
      <h2>Không có quyền truy cập</h2>
      <p class="login-sub">Email <strong>{{ user?.email }}</strong> chưa được cấp quyền admin.</p>
      <button class="logout-btn" @click="signOut">Đăng xuất</button>
    </div>
  </div>

  <!-- Dashboard -->
  <div v-else class="admin-wrap">
    <!-- Header -->
    <header class="admin-header">
      <div class="header-brand">
        <span class="header-logo">🎵</span>
        <span class="header-name">XKProd Admin</span>
      </div>
      <div class="header-user">
        <img v-if="user?.photoURL" :src="user.photoURL" :alt="user.displayName ?? ''" class="avatar" referrerpolicy="no-referrer" />
        <span class="user-name">{{ user?.displayName }}</span>
        <button class="logout-btn" @click="signOut">Đăng xuất</button>
      </div>
    </header>

    <main class="admin-main">
      <!-- Loading overlay -->
      <div v-if="loading" class="loading-bar" />

      <!-- Stats row -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon visitors">👁</div>
          <div class="stat-body">
            <div class="stat-value">{{ overview?.total_visitors?.toLocaleString('vi-VN') ?? '—' }}</div>
            <div class="stat-label">Lượt xem trang</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon leads">📥</div>
          <div class="stat-body">
            <div class="stat-value">{{ overview?.total_leads?.toLocaleString('vi-VN') ?? '—' }}</div>
            <div class="stat-label">Leads nhận được</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon events">⚡</div>
          <div class="stat-body">
            <div class="stat-value">{{ overview?.total_events?.toLocaleString('vi-VN') ?? '—' }}</div>
            <div class="stat-label">Sự kiện hành vi</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon top">🏆</div>
          <div class="stat-body">
            <div class="stat-value stat-value--path">{{ overview?.top_pages?.[0]?.path ?? '—' }}</div>
            <div class="stat-label">Trang xem nhiều nhất</div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tabs">
        <button v-for="t in [
          { id: 'overview', label: '📊 Tổng quan' },
          { id: 'leads',    label: '📥 Leads' },
          { id: 'visitors', label: '👁 Visitors' },
          { id: 'events',   label: '⚡ Events' },
        ]" :key="t.id"
          class="tab-btn" :class="{ active: activeTab === t.id }"
          @click="switchTab(t.id as any)">
          {{ t.label }}
        </button>
      </div>

      <!-- Overview tab -->
      <div v-if="activeTab === 'overview'" class="tab-content two-col">
        <!-- Top pages chart -->
        <div class="panel">
          <h3 class="panel-title">Top trang được xem nhiều nhất</h3>
          <div class="bar-chart">
            <div v-for="pg in (overview?.top_pages ?? [])" :key="pg.path" class="bar-row">
              <span class="bar-label">{{ pg.path }}</span>
              <div class="bar-track">
                <div class="bar-fill" :style="{ width: (pg.visits / topPageMax * 100) + '%' }" />
              </div>
              <span class="bar-val">{{ pg.visits.toLocaleString('vi-VN') }}</span>
            </div>
          </div>
        </div>

        <!-- Leads by service -->
        <div class="panel">
          <h3 class="panel-title">Leads theo dịch vụ</h3>
          <div class="service-list">
            <div v-for="s in (overview?.leads_by_service ?? [])" :key="s.service" class="service-row">
              <span class="service-name">{{ svcLabel(s.service) }}</span>
              <span class="service-count badge">{{ s.count }}</span>
            </div>
            <div v-if="!overview?.leads_by_service?.length" class="empty-state">Chưa có dữ liệu</div>
          </div>

          <h3 class="panel-title" style="margin-top:2rem">Leads gần đây</h3>
          <div class="mini-table">
            <div v-for="l in (overview?.recent_leads ?? [])" :key="l.id" class="mini-row">
              <div class="mini-main">
                <strong>{{ l.name }}</strong>
                <span class="badge badge--service">{{ svcLabel(l.service) }}</span>
              </div>
              <div class="mini-sub">{{ maskPhone(l.phone) }} · {{ fmtDate(l.created_at) }}</div>
            </div>
            <div v-if="!overview?.recent_leads?.length" class="empty-state">Chưa có leads</div>
          </div>
        </div>
      </div>

      <!-- Leads tab -->
      <div v-if="activeTab === 'leads'" class="tab-content">
        <div class="panel">
          <div class="panel-header">
            <h3 class="panel-title">Tất cả Leads <span class="badge">{{ leadsTotal }}</span></h3>
          </div>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>#</th><th>Họ tên</th><th>SĐT</th><th>Email</th><th>Dịch vụ</th><th>Nguồn</th><th>Lời nhắn</th><th>Thời gian</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="l in leads" :key="l.id">
                  <td class="td-id">{{ l.id }}</td>
                  <td class="td-name">{{ l.name }}</td>
                  <td class="td-phone"><a :href="`tel:${l.phone}`">{{ l.phone }}</a></td>
                  <td>{{ l.email || '—' }}</td>
                  <td><span class="badge badge--service">{{ svcLabel(l.service) }}</span></td>
                  <td><span class="badge badge--source">{{ l.source }}</span></td>
                  <td class="td-msg">{{ l.message || '—' }}</td>
                  <td class="td-date">{{ fmtDate(l.created_at) }}</td>
                </tr>
                <tr v-if="!leads.length"><td colspan="8" class="empty-state">Chưa có leads nào</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Visitors tab -->
      <div v-if="activeTab === 'visitors'" class="tab-content">
        <div class="panel">
          <div class="panel-header">
            <h3 class="panel-title">Visitor Logs <span class="badge">{{ visitorsTotal }}</span></h3>
          </div>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr><th>IP</th><th>Trang</th><th>Lượt xem</th><th>Referrer</th><th>Lần cuối</th></tr>
              </thead>
              <tbody>
                <tr v-for="v in visitors" :key="v.id">
                  <td class="td-ip">{{ v.ip_masked }}</td>
                  <td class="td-path">{{ v.path }}</td>
                  <td class="td-count"><span class="badge">{{ v.visit_count }}</span></td>
                  <td class="td-ref">{{ v.referrer || '—' }}</td>
                  <td class="td-date">{{ fmtDate(v.last_seen_at) }}</td>
                </tr>
                <tr v-if="!visitors.length"><td colspan="5" class="empty-state">Chưa có dữ liệu</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Events tab -->
      <div v-if="activeTab === 'events'" class="tab-content two-col">
        <div class="panel">
          <h3 class="panel-title">Theo loại hành vi</h3>
          <div class="bar-chart">
            <div v-for="e in (events?.by_action ?? [])" :key="e.action" class="bar-row">
              <span class="bar-label">{{ e.action }}</span>
              <div class="bar-track">
                <div class="bar-fill bar-fill--purple" :style="{ width: (e.count / (events?.by_action?.[0]?.count ?? 1) * 100) + '%' }" />
              </div>
              <span class="bar-val">{{ e.count }}</span>
            </div>
            <div v-if="!events?.by_action?.length" class="empty-state">Chưa có events</div>
          </div>
        </div>
        <div class="panel">
          <h3 class="panel-title">Events gần đây</h3>
          <div class="mini-table">
            <div v-for="(e, i) in (events?.recent ?? [])" :key="i" class="mini-row">
              <div class="mini-main">
                <span class="badge badge--event">{{ e.action }}</span>
                <span v-if="e.label" class="mini-label">{{ e.label }}</span>
              </div>
              <div class="mini-sub">{{ e.page || '—' }} · {{ fmtDate(e.created_at) }}</div>
            </div>
            <div v-if="!events?.recent?.length" class="empty-state">Chưa có events</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* ── Tokens ─────────────────────────────────────────────────────────────── */
:root { color-scheme: dark; }
* { box-sizing: border-box; margin: 0; padding: 0; }

.admin-wrap, .auth-screen {
  min-height: 100dvh;
  background: #06080f;
  color: #e2e8f0;
  font-family: 'Manrope', sans-serif;
}

/* ── Auth screens ────────────────────────────────────────────────────────── */
.auth-screen {
  display: flex; align-items: center; justify-content: center;
}

.login-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  width: min(420px, 90vw);
  text-align: center;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 60px rgba(0,0,0,0.5);
}

.login-logo { width: 72px; height: 72px; border-radius: 16px; margin-bottom: 1.25rem; }
.login-title { font-size: 1.6rem; font-weight: 800; margin-bottom: .5rem; }
.login-sub { color: #94a3b8; margin-bottom: 2rem; line-height: 1.5; }
.forbidden-icon { font-size: 3rem; margin-bottom: 1rem; }

.google-btn {
  display: inline-flex; align-items: center; gap: .75rem;
  padding: .85rem 1.75rem;
  background: #fff; color: #1a1a1a;
  border: none; border-radius: 12px;
  font-size: .95rem; font-weight: 700; cursor: pointer;
  transition: transform .15s, box-shadow .15s;
  width: 100%; justify-content: center;
}
.google-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,255,255,.15); }

.spinner {
  width: 44px; height: 44px;
  border: 3px solid rgba(255,255,255,.1);
  border-top-color: #f5a623;
  border-radius: 50%;
  animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Header ─────────────────────────────────────────────────────────────── */
.admin-header {
  position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 2rem;
  height: 60px;
  background: rgba(6,8,15,.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255,255,255,.06);
}

.header-brand { display: flex; align-items: center; gap: .6rem; }
.header-logo { font-size: 1.3rem; }
.header-name { font-weight: 800; font-size: 1rem; letter-spacing: -.01em; }

.header-user { display: flex; align-items: center; gap: .75rem; }
.avatar { width: 32px; height: 32px; border-radius: 50%; border: 2px solid rgba(255,255,255,.15); }
.user-name { font-size: .85rem; color: #94a3b8; display: none; }
@media (min-width: 640px) { .user-name { display: block; } }

.logout-btn {
  padding: .4rem .9rem;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 8px;
  color: #cbd5e1; font-size: .8rem; cursor: pointer;
  transition: background .15s;
}
.logout-btn:hover { background: rgba(255,255,255,.1); }

/* ── Main ────────────────────────────────────────────────────────────────── */
.admin-main { padding: 1.5rem 2rem 3rem; max-width: 1400px; margin: 0 auto; }

.loading-bar {
  position: fixed; top: 60px; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, transparent, #f5a623, transparent);
  animation: slide 1.2s ease-in-out infinite;
  z-index: 99;
}
@keyframes slide { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }

/* ── Stats grid ──────────────────────────────────────────────────────────── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem; margin-bottom: 1.75rem;
}

.stat-card {
  display: flex; align-items: center; gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 16px;
  transition: border-color .2s;
}
.stat-card:hover { border-color: rgba(245,166,35,.3); }

.stat-icon {
  width: 44px; height: 44px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.25rem; flex-shrink: 0;
}
.stat-icon.visitors { background: rgba(59,130,246,.15); }
.stat-icon.leads { background: rgba(16,185,129,.15); }
.stat-icon.events { background: rgba(245,166,35,.15); }
.stat-icon.top { background: rgba(139,92,246,.15); }

.stat-value { font-size: 1.5rem; font-weight: 800; line-height: 1; }
.stat-value--path { font-size: 1rem; font-weight: 700; word-break: break-all; }
.stat-label { font-size: .75rem; color: #64748b; margin-top: .3rem; }

/* ── Tabs ────────────────────────────────────────────────────────────────── */
.tabs {
  display: flex; gap: .5rem; flex-wrap: wrap;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,.06);
  padding-bottom: .5rem;
}

.tab-btn {
  padding: .5rem 1.1rem;
  border: 1px solid transparent;
  border-radius: 10px;
  background: transparent;
  color: #64748b; font-size: .85rem; font-weight: 600; cursor: pointer;
  transition: all .15s;
}
.tab-btn:hover { color: #e2e8f0; background: rgba(255,255,255,.05); }
.tab-btn.active {
  color: #f5a623;
  background: rgba(245,166,35,.08);
  border-color: rgba(245,166,35,.25);
}

/* ── Tab content ─────────────────────────────────────────────────────────── */
.tab-content { animation: fadeIn .2s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

.two-col { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.25rem; }

.panel {
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 16px;
  padding: 1.5rem;
}

.panel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.panel-title { font-size: .95rem; font-weight: 700; color: #cbd5e1; margin-bottom: 1rem; display: flex; align-items: center; gap: .5rem; }

/* ── Bar chart ───────────────────────────────────────────────────────────── */
.bar-chart { display: flex; flex-direction: column; gap: .6rem; }
.bar-row { display: grid; grid-template-columns: 140px 1fr 48px; align-items: center; gap: .75rem; }
.bar-label { font-size: .78rem; color: #94a3b8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bar-track { height: 8px; background: rgba(255,255,255,.06); border-radius: 4px; overflow: hidden; }
.bar-fill { height: 100%; background: linear-gradient(90deg, #f5a623, #f59e0b); border-radius: 4px; transition: width .6s ease; }
.bar-fill--purple { background: linear-gradient(90deg, #8b5cf6, #7c3aed); }
.bar-val { font-size: .78rem; font-weight: 700; color: #e2e8f0; text-align: right; }

/* ── Service / mini list ─────────────────────────────────────────────────── */
.service-list { display: flex; flex-direction: column; gap: .5rem; }
.service-row { display: flex; align-items: center; justify-content: space-between; padding: .4rem 0; border-bottom: 1px solid rgba(255,255,255,.05); }
.service-name { font-size: .85rem; }
.service-count { font-weight: 700; }

.mini-table { display: flex; flex-direction: column; gap: .5rem; }
.mini-row { padding: .6rem .75rem; background: rgba(255,255,255,.03); border-radius: 10px; }
.mini-main { display: flex; align-items: center; gap: .5rem; margin-bottom: .2rem; }
.mini-label { font-size: .8rem; color: #94a3b8; }
.mini-sub { font-size: .75rem; color: #475569; }

/* ── Data table ──────────────────────────────────────────────────────────── */
.table-wrap { overflow-x: auto; border-radius: 12px; }

.data-table {
  width: 100%; border-collapse: collapse;
  font-size: .82rem; white-space: nowrap;
}
.data-table th {
  padding: .7rem 1rem; text-align: left;
  background: rgba(255,255,255,.04);
  color: #64748b; font-weight: 600; font-size: .75rem; text-transform: uppercase; letter-spacing: .04em;
  border-bottom: 1px solid rgba(255,255,255,.07);
}
.data-table td {
  padding: .75rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,.04);
  color: #cbd5e1;
  max-width: 220px; overflow: hidden; text-overflow: ellipsis;
}
.data-table tr:last-child td { border-bottom: none; }
.data-table tr:hover td { background: rgba(255,255,255,.02); }
.data-table a { color: #38bdf8; text-decoration: none; }
.data-table a:hover { text-decoration: underline; }

.td-id { color: #475569; width: 48px; }
.td-date { color: #64748b; white-space: nowrap; }
.td-ip, .td-path { font-family: monospace; font-size: .8rem; }

/* ── Badges ──────────────────────────────────────────────────────────────── */
.badge {
  display: inline-flex; align-items: center;
  padding: .15rem .55rem;
  background: rgba(255,255,255,.08);
  border-radius: 6px;
  font-size: .75rem; font-weight: 600;
}
.badge--service { background: rgba(245,166,35,.12); color: #fbbf24; }
.badge--source { background: rgba(59,130,246,.12); color: #60a5fa; }
.badge--event { background: rgba(139,92,246,.12); color: #a78bfa; }

.empty-state { color: #334155; text-align: center; padding: 2rem 0; font-size: .85rem; }
</style>
