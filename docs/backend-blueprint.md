# Cloudflare Edge + Nuxt 4 + Firebase + D1 Backend Blueprint

> Tài liệu kiến trúc và hướng dẫn tái sử dụng backend Serverless Edge cho dự án mới (Nuxt 4 / Nitro + Cloudflare Pages + D1 Database + Firebase Auth).

---

## 1. Triết Lý & Kiến Trúc Tổng Thể

Hệ thống được thiết kế theo mô hình **Serverless Full-Stack tại Edge (Cloudflare Network)**:
- **Zero Server Management**: Không cần VPS, không Docker, không duy trì backend Node.js truyền thống.
- **Tốc độ cực cao & Chi phí $0**: Chạy trên Cloudflare Pages Functions (hàng trăm PoP toàn cầu, cold-start gần như bằng 0).
- **Public-Repo Safe**: Code server có thể public mã nguồn mà không sợ lộ lọt secret hay bị bypass bảo mật.
- **Không dùng `firebase-admin`**: Xác thực JWT Google/Firebase offline trực tiếp tại Edge qua Web Crypto API (`crypto.subtle`) chuẩn RS256. Không tốn dung lượng bundle, không bị hạn chế runtime.

```
                    [Client / Trình duyệt]
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
       Static Assets / Pages        API Requests (/api/*)
               │                             │
    Cloudflare Pages (CDN)         Cloudflare Edge Worker (Nitro)
                                             │
                       ┌─────────────────────┼─────────────────────┐
                       ▼                     ▼                     ▼
               Security Layer        Auth Verification       D1 Database
             • Turnstile Token     • RS256 crypto.subtle   • SQLite on Edge
             • Origin Check        • Google JWKS Cache     • Zero Latency
             • Honeypot Field      • Admin Email List      • Auto-healing schema
             • Rate Limiting
```

---

## 2. Cấu Trúc Thư Mục Backend Mẫu

Khi triển khai dự án mới, hãy tổ chức thư mục `server/` như sau:

```
server/
├── api/
│   ├── admin/                         # Endpoints yêu cầu quyền Admin
│   │   ├── contributions/
│   │   │   ├── [id].delete.ts         # Xóa bài đóng góp
│   │   │   ├── [id].patch.ts          # Duyệt / Từ chối bài
│   │   │   ├── batch.patch.ts         # Duyệt hàng loạt
│   │   │   └── index.get.ts           # Danh sách bài đóng góp theo status
│   │   ├── overview/
│   │   │   └── index.get.ts           # Dashboard KPI & số liệu thống kê
│   │   ├── ratings/
│   │   │   ├── [id].delete.ts         # Xóa đánh giá spam
│   │   │   └── index.get.ts           # Danh sách toàn bộ đánh giá
│   │   ├── traffic-sources/
│   │   │   └── index.get.ts           # Phân tích nguồn truy cập & UTM
│   │   ├── users/
│   │   │   └── index.get.ts           # Danh sách người dùng đăng ký
│   │   └── visitors/
│   │       └── index.get.ts           # Nhật ký IP & traffic chi tiết
│   ├── analytics/
│   │   ├── event.post.ts              # Log hành vi người dùng (quiz, tour, click)
│   │   └── visit.post.ts              # Tự động ghi nhận lượt xem trang (upsert IP+path)
│   ├── me/
│   │   └── sync.post.ts               # Đồng bộ user Firebase vào D1 sau khi login
│   ├── ratings/
│   │   ├── index.get.ts               # Lấy điểm TB, phân bố sao, comment mới nhất
│   │   └── index.post.ts              # Gửi đánh giá (cần đăng nhập Google)
│   ├── contribute.post.ts             # Form submit public (chống bot Turnstile + honeypot)
│   └── _sitemap-urls.ts               # Tạo danh sách URL động cho sitemap
└── utils/
    ├── auth.ts                        # Verify JWT Firebase bằng crypto.subtle + requireAdmin
    ├── turnstile.ts                   # Verify Cloudflare Turnstile + requireClient
    └── schema.ts                      # Self-healing D1 migrations (tự thêm cột nếu thiếu)
```

---

## 3. Database Schema (`schema.sql`)

Hệ sinh thái lưu trữ sử dụng SQLite trên Cloudflare D1. Dưới đây là schema chuẩn cho 5 nghiệp vụ:

```sql
-- 1. Bảng người dùng (Đồng bộ từ Firebase Auth)
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  uid            TEXT PRIMARY KEY,
  email          TEXT NOT NULL UNIQUE,
  display_name   TEXT,
  photo_url      TEXT,
  email_verified INTEGER NOT NULL DEFAULT 0,
  provider       TEXT,
  created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_seen_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Nhật ký lượt truy cập (Gộp IP + Path, đếm số lần xem)
DROP TABLE IF EXISTS visitor_logs;
CREATE TABLE visitor_logs (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  ip             TEXT NOT NULL,
  email          TEXT,
  display_name   TEXT,
  path           TEXT NOT NULL,
  user_agent     TEXT,
  referrer       TEXT,
  utm_source     TEXT,
  visit_count    INTEGER NOT NULL DEFAULT 1,
  first_seen_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_seen_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(ip, path)
);
CREATE INDEX IF NOT EXISTS idx_visitor_path ON visitor_logs(path, last_seen_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_ip   ON visitor_logs(ip);

-- 3. Bài đóng góp từ cộng đồng (Duyệt bài 2 bước)
DROP TABLE IF EXISTS contributions;
CREATE TABLE contributions (
  id            TEXT PRIMARY KEY,
  type          TEXT NOT NULL CHECK(type IN ('story','photo','document','memory','artwork','research')),
  author_name   TEXT NOT NULL,
  author_role   TEXT NOT NULL DEFAULT '',
  title         TEXT NOT NULL CHECK(length(title) BETWEEN 5 AND 200),
  content       TEXT NOT NULL CHECK(length(content) BETWEEN 20 AND 10000),
  heritage_id   TEXT,
  files_data    TEXT,
  status        TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','approved','rejected')),
  ip            TEXT,
  review_note   TEXT,
  reviewed_at   DATETIME,
  reviewed_by   TEXT,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_contributions_status ON contributions(status, created_at DESC);

-- 4. Đánh giá & Bình luận (Mỗi tài khoản Google 1 đánh giá)
DROP TABLE IF EXISTS ratings;
CREATE TABLE ratings (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  uid           TEXT NOT NULL UNIQUE,
  email         TEXT,
  display_name  TEXT,
  photo_url     TEXT,
  ip            TEXT,
  stars         INTEGER CHECK(stars IS NULL OR (stars BETWEEN 1 AND 5)),
  comment       TEXT CHECK(length(comment) <= 500),
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_ratings_stars ON ratings(stars);
CREATE INDEX IF NOT EXISTS idx_ratings_uid   ON ratings(uid);

-- 5. Sự kiện tính năng (Feature Engagement Tracking)
DROP TABLE IF EXISTS events;
CREATE TABLE events (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  ip           TEXT NOT NULL,
  uid          TEXT,
  tool         TEXT NOT NULL,
  action       TEXT NOT NULL DEFAULT 'start' CHECK(action IN ('start','complete')),
  heritage_id  TEXT,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_events_tool ON events(tool, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_ip   ON events(ip);
```

---

## 4. Các File Tiện Ích Lõi (Core Utilities)

### 4.1. Xác thực Firebase không cần SDK (`server/utils/auth.ts`)
Verify Google JWT ID Token bằng native `crypto.subtle` (chuẩn RS256, lấy public key từ Google JWKS endpoint có in-memory cache 1 giờ):

```typescript
import type { H3Event } from 'h3'

const FIREBASE_PROJECT_ID = 'your-firebase-project-id'
const JWKS_URL = 'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'

const ADMIN_EMAILS = [
  'admin@example.com',
]

export interface FirebaseClaims {
  uid: string
  email: string
  name?: string
  picture?: string
  email_verified: boolean
  iat: number
  exp: number
  firebase?: { sign_in_provider: string }
}

interface JwkKey {
  kty: string
  kid: string
  n: string
  e: string
  alg: string
  use: string
}

let keyCache: Map<string, CryptoKey> | null = null
let keyCachedAt = 0
const KEY_CACHE_TTL_MS = 60 * 60 * 1000

async function getPublicKeys(): Promise<Map<string, CryptoKey>> {
  const now = Date.now()
  if (keyCache && now - keyCachedAt < KEY_CACHE_TTL_MS) return keyCache

  const res = await fetch(JWKS_URL)
  if (!res.ok) throw createError({ statusCode: 503, message: 'Cannot fetch Firebase public keys' })

  const jwks = (await res.json()) as { keys: JwkKey[] }
  const map = new Map<string, CryptoKey>()

  for (const jwk of jwks.keys) {
    const key = await crypto.subtle.importKey(
      'jwk',
      jwk,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['verify'],
    )
    map.set(jwk.kid, key)
  }

  keyCache = map
  keyCachedAt = now
  return map
}

function b64urlDecode(str: string): Uint8Array {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

export async function verifyFirebaseToken(token: string): Promise<FirebaseClaims> {
  const parts = token.split('.')
  if (parts.length !== 3) throw createError({ statusCode: 401, message: 'Invalid token format' })

  const [headerB64, payloadB64, sigB64] = parts

  let header: { alg: string; kid: string }
  try {
    header = JSON.parse(new TextDecoder().decode(b64urlDecode(headerB64!)))
  } catch {
    throw createError({ statusCode: 401, message: 'Invalid token header' })
  }

  if (header.alg !== 'RS256') throw createError({ statusCode: 401, message: 'Unsupported token algorithm' })

  const keys = await getPublicKeys()
  let cryptoKey = keys.get(header.kid)
  if (!cryptoKey) {
    keyCache = null
    const freshKeys = await getPublicKeys()
    cryptoKey = freshKeys.get(header.kid)
    if (!cryptoKey) throw createError({ statusCode: 401, message: 'Unknown key ID' })
  }

  const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`)
  const sigRaw = b64urlDecode(sigB64!)
  const sig = new Uint8Array(sigRaw.buffer as ArrayBuffer, sigRaw.byteOffset, sigRaw.byteLength)
  const dataFixed = new Uint8Array(data.buffer as ArrayBuffer, data.byteOffset, data.byteLength)

  const valid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', cryptoKey, sig, dataFixed)
  if (!valid) throw createError({ statusCode: 401, message: 'Invalid token signature' })

  let payload: Record<string, unknown>
  try {
    payload = JSON.parse(new TextDecoder().decode(b64urlDecode(payloadB64!)))
  } catch {
    throw createError({ statusCode: 401, message: 'Invalid token payload' })
  }

  const now = Math.floor(Date.now() / 1000)
  if ((payload.exp as number) < now) throw createError({ statusCode: 401, message: 'Token expired' })
  if (payload.iss !== `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`) {
    throw createError({ statusCode: 401, message: 'Invalid token issuer' })
  }
  if (payload.aud !== FIREBASE_PROJECT_ID) throw createError({ statusCode: 401, message: 'Invalid token audience' })
  if (!payload.sub) throw createError({ statusCode: 401, message: 'Missing token subject' })

  return {
    uid: payload.sub as string,
    email: payload.email as string,
    name: payload.name as string | undefined,
    picture: payload.picture as string | undefined,
    email_verified: Boolean(payload.email_verified),
    iat: payload.iat as number,
    exp: payload.exp as number,
    firebase: payload.firebase as FirebaseClaims['firebase'],
  }
}

export async function requireAdmin(event: H3Event): Promise<FirebaseClaims> {
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, message: 'Missing or invalid Authorization header' })
  }

  const token = authHeader.slice(7).trim()
  const claims = await verifyFirebaseToken(token)

  const email = (claims.email || '').trim().toLowerCase()
  if (!ADMIN_EMAILS.some((adm) => adm.trim().toLowerCase() === email)) {
    throw createError({ statusCode: 403, message: 'Forbidden: admin access only' })
  }

  return claims
}
```

---

### 4.2. Chống Bot & Bảo Vệ Write Endpoint (`server/utils/turnstile.ts`)

```typescript
import type { H3Event } from 'h3'

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export async function verifyTurnstile(token: string | undefined, ip: string): Promise<void> {
  if (import.meta.dev) return // Bỏ qua ở local dev

  if (!token) throw createError({ statusCode: 400, message: 'Bot verification token required' })

  const config = useRuntimeConfig()
  const secret = config.turnstileSecretKey
  if (!secret) throw createError({ statusCode: 503, message: 'Turnstile not configured on server' })

  const res = await fetch(SITEVERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token, remoteip: ip }),
  })

  if (!res.ok) throw createError({ statusCode: 503, message: 'Turnstile service unavailable' })

  const data = (await res.json()) as { success: boolean }
  if (!data.success) throw createError({ statusCode: 403, message: 'Bot verification failed' })
}

export async function requireClient(
  event: H3Event,
  token: string | undefined,
): Promise<{ ip: string }> {
  if (!import.meta.dev) {
    const origin = getHeader(event, 'origin') ?? ''
    const isAllowed = origin === 'https://yourdomain.com' || origin.endsWith('.pages.dev')
    if (!isAllowed) throw createError({ statusCode: 403, message: 'Invalid request origin' })
  }

  const ip =
    getHeader(event, 'cf-connecting-ip') ??
    getHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim() ??
    '0.0.0.0'

  await verifyTurnstile(token, ip)
  return { ip }
}
```

---

### 4.3. Schema Tự Phục Hồi & Tự Động Migration (`server/utils/schema.ts`)

Tránh gãy hệ thống khi deploy code mới chưa kịp chạy migration D1:

```typescript
let schemaEnsured = false
let schemaPromise: Promise<void> | null = null

export async function ensureAnalyticsSchema(db: any): Promise<void> {
  if (!db || schemaEnsured) return
  if (schemaPromise) return schemaPromise

  schemaPromise = (async () => {
    try {
      const tableInfo = (await db.prepare('PRAGMA table_info(visitor_logs)').all()) as {
        results?: Array<{ name: string }>
      }
      const cols = new Set((tableInfo.results ?? []).map((r: { name: string }) => r.name))

      if (!cols.has('user_agent')) {
        await db.prepare('ALTER TABLE visitor_logs ADD COLUMN user_agent TEXT').run().catch(() => {})
      }
      if (!cols.has('referrer')) {
        await db.prepare('ALTER TABLE visitor_logs ADD COLUMN referrer TEXT').run().catch(() => {})
      }
      if (!cols.has('utm_source')) {
        await db.prepare('ALTER TABLE visitor_logs ADD COLUMN utm_source TEXT').run().catch(() => {})
      }

      await db.prepare(`
        CREATE TABLE IF NOT EXISTS events (
          id           INTEGER PRIMARY KEY AUTOINCREMENT,
          ip           TEXT NOT NULL,
          uid          TEXT,
          tool         TEXT NOT NULL,
          action       TEXT NOT NULL DEFAULT 'start',
          heritage_id  TEXT,
          created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `).run().catch(() => {})

      schemaEnsured = true
    } catch (err) {
      console.error('[schema] Auto migration error:', err)
    } finally {
      schemaPromise = null
    }
  })()

  return schemaPromise
}
```

---

## 5. Cấu Hình Dự Án

### 5.1. `wrangler.toml` (Cloudflare Pages Binding)

```toml
name = "your-app-name"
pages_build_output_dir = "dist"
compatibility_date = "2024-04-05"

[[d1_databases]]
binding = "DB"
database_name = "your-app-db"
database_id = "<your-d1-database-uuid>"

[vars]
NUXT_PUBLIC_TURNSTILE_SITE_KEY = "<your-turnstile-site-key>"

# Secret thiết lập qua lệnh: wrangler secret put NUXT_TURNSTILE_SECRET_KEY
```

### 5.2. `nuxt.config.ts` (Nitro Preset & SPA Routes)

```typescript
export default defineNuxtConfig({
  $production: {
    nitro: {
      preset: 'cloudflare-pages',
    },
  },

  routeRules: {
    '/admin/**': { ssr: false }, // Dashboard quản trị dùng SPA mode
    '/me/**': { ssr: false },
  },

  runtimeConfig: {
    turnstileSecretKey: '', // Tự nạp từ env NUXT_TURNSTILE_SECRET_KEY
    public: {
      adminEmails: ['admin@example.com'],
      turnstileSiteKey: '',
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        appId: process.env.FIREBASE_APP_ID,
      },
    },
  },
})
```

### 5.3. `package.json` Scripts cho Database

```json
{
  "scripts": {
    "db.init.local": "rm -rf .wrangler/state/v3/d1 && wrangler d1 execute your-app-db --local --file=schema.sql",
    "db.push": "wrangler d1 execute your-app-db --remote --file=schema.sql"
  }
}
```

---

## 6. Quy Trình Vận Hành & Khởi Tạo Dự Án Mới (Step-by-step)

1. **Tạo Cloudflare D1 Database**:
   ```bash
   npx wrangler d1 create your-app-db
   ```
   Lấy `database_id` điền vào `wrangler.toml`.

2. **Khởi tạo schema trên remote**:
   ```bash
   npm run db.push
   ```

3. **Cấu hình Cloudflare Turnstile**:
   - Vào Cloudflare Dashboard → Turnstile → Add site.
   - Thêm domain production + localhost (nếu muốn test local).
   - Lấy Site Key cấu hình vào `NUXT_PUBLIC_TURNSTILE_SITE_KEY`.
   - Lấy Secret Key cấu hình:
     ```bash
     npx wrangler secret put NUXT_TURNSTILE_SECRET_KEY
     ```

4. **Tạo Firebase Project (Authentication)**:
   - Tạo project trên Firebase Console.
   - Bật Authentication với Google Provider.
   - Lấy config Firebase điền vào `nuxt.config.ts` (`runtimeConfig.public.firebase`).
   - Cập nhật danh sách email admin trong `server/utils/auth.ts` và `nuxt.config.ts`.

5. **Deploy lên Cloudflare Pages**:
   - Kết nối GitHub repository với Cloudflare Pages.
   - Build command: `npm run build` hoặc `npx nuxt build`.
   - Build output directory: `dist`.
   - Trong phần **Settings > Functions > D1 Database Bindings**: Gán tên biến `DB` tương ứng với D1 database đã tạo.
