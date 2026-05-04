# SEO Improvement — XKStudio (xkproduction.com)

> **Chuẩn tham khảo:** [lacvietanh/oscar-family](https://github.com/lacvietanh/oscar-family)  
> **Ngày thực hiện:** 2026-05-04  
> **Thực hiện bởi:** Antigravity AI

---

## Tóm tắt các vấn đề SEO được phát hiện

| Vấn đề | Mức độ | Trạng thái |
|--------|--------|------------|
| `canonical` URL cố định toàn cục (sai kỹ thuật SEO) | 🔴 Nghiêm trọng | ✅ Đã fix |
| `ogImage` dùng path tương đối thay vì URL tuyệt đối | 🔴 Nghiêm trọng | ✅ Đã fix |
| Thiếu `hreflang` alternate tags | 🟠 Quan trọng | ✅ Đã fix |
| Thiếu `ogUrl` trên mỗi page | 🟠 Quan trọng | ✅ Đã fix |
| Thiếu `twitterImage` URL tuyệt đối | 🟠 Quan trọng | ✅ Đã fix |
| Thiếu `ogImageWidth/Height` | 🟡 Trung bình | ✅ Đã fix |
| `BreadcrumbList` thiếu trên nhiều page | 🟠 Quan trọng | ✅ Đã fix |
| Sitemap thiếu `lastmod` và `images` | 🟡 Trung bình | ✅ Đã fix |
| Organization schema thiếu `contactPoint`, `address` toàn cục | 🟡 Trung bình | ✅ Đã fix |
| Thiếu `BlogPosting` schema cho blog articles | 🟠 Quan trọng | ✅ Đã fix |
| Thiếu `MusicRecording` schema cho portfolio | 🟡 Trung bình | ✅ Đã fix |
| Robots.txt chưa block `/_nuxt/` internal routes | 🟡 Trung bình | ✅ Đã fix |
| Thiếu `Permissions-Policy` và `X-Robots-Tag` headers | 🟡 Trung bình | ✅ Đã fix |

---

## Chi tiết các thay đổi

### 1. `app.vue` — Global SEO Foundation

**Thêm `canonical` + `hreflang` động theo route (theo chuẩn Oscar Family):**
```typescript
const route = useRoute()
useHead(() => {
  const currentUrl = `https://xkproduction.com${route.path}`
  return {
    link: [
      { rel: 'canonical', href: currentUrl },
      { rel: 'alternate', hreflang: 'vi-VN', href: currentUrl },
      { rel: 'alternate', hreflang: 'x-default', href: currentUrl }
    ]
  }
})
```

> **Tại sao quan trọng?** Trước đây `nuxt.config.ts` set canonical cố định là `https://xkproduction.com` cho TẤT CẢ pages — điều này cực kỳ sai về SEO vì Google sẽ nghĩ mọi page đều là duplicate của homepage.

**Cải thiện Organization schema:**
- Thêm `image`, `foundingDate`, `legalName`
- Thêm `address` (streetAddress, addressLocality, addressRegion)
- Thêm `contactPoint` với `telephone`, `contactType`, `availableLanguage`, `areaServed`
- Thêm `zalo.me` vào `sameAs`
- Thêm `inLanguage: 'vi-VN'` cho WebSite schema

---

### 2. `nuxt.config.ts` — Core SEO Config

**Xóa canonical cố định global:**
```typescript
// ❌ Trước (SAI - tất cả pages đều có cùng canonical /)
{ rel: 'canonical', href: 'https://xkproduction.com' }

// ✅ Sau - canonical được handle động qua app.vue
// (Canonical được handle động ở từng page)
```

**Cải thiện Sitemap với `lastmod` + `images`:**
- Thêm `lastmod` (ngày hiện tại) cho tất cả pages quan trọng
- Thêm `images` array với `loc`, `title`, `caption` cho mỗi page
- Giúp Google Image Search index được hình ảnh

**Cải thiện robots:**
```typescript
robots: {
  disallow: ['/cdn-cgi/', '/_nuxt/'],  // Block Nuxt internal
  allow: ['/$', '/*.html$'],
}
```

**Thêm security/SEO headers:**
```typescript
headers: {
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-Robots-Tag': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
}
```
- `max-image-preview:large` → Google hiển thị ảnh lớn trong kết quả tìm kiếm
- `max-snippet:-1` → Google hiển thị đoạn text dài trong snippet
- `/privacy` page set `noindex` vì không cần index

---

### 3. Tất cả Pages — ogImage URL Fix

**Vấn đề nghiêm trọng:** Social crawlers (Facebook, Twitter, Google) không thể resolve path tương đối:
```typescript
// ❌ Trước (SAI - Facebook/Twitter KHÔNG thể hiển thị)
ogImage: '/images/hero-studio.png'

// ✅ Sau (ĐÚNG - URL tuyệt đối)
ogImage: 'https://xkproduction.com/images/hero-studio.png'
ogImageWidth: '1200'
ogImageHeight: '630'
```

**Thêm `ogUrl` và `twitterImage` cho mỗi page:**
```typescript
ogUrl: 'https://xkproduction.com/services',  // Canonical URL cho OG
twitterImage: 'https://xkproduction.com/images/hero-studio.png'
```

---

### 4. `blog.vue` — BlogPosting Schema

Thêm **4 BlogPosting schema** cho 4 bài viết chính:
```json
{
  "@type": "BlogPosting",
  "headline": "Thu Âm Bài Hát Giá Bao Nhiêu? Bảng Giá Chi Tiết 2026",
  "image": "https://xkproduction.com/images/blog-thu-am-gia.jpg",
  "author": { "@type": "Organization", "name": "XKStudio" },
  "publisher": { "@type": "Organization", "name": "XKStudio" },
  "datePublished": "2026-04-28",
  "keywords": "thu âm bài hát, giá thu âm..."
}
```

> **Tại sao?** Google dùng BlogPosting schema để hiển thị **Rich Results** cho bài viết blog trong kết quả tìm kiếm, giúp CTR tăng đáng kể.

---

### 5. `products.vue` — MusicRecording Schema

Thêm **MusicRecording schema** cho portfolio âm nhạc:
```json
{
  "@type": "MusicRecording",
  "name": "Chẳng Muốn Nói Nhiều Lời",
  "byArtist": { "@type": "MusicGroup", "name": "Revan" },
  "producer": { "@type": "Person", "name": "Nguyễn Xuân Kiệt" },
  "url": "https://www.youtube.com/watch?v=IxlFvQQP_4c"
}
```

> Khi Google / AI crawlers đọc schema này, họ biết XKStudio là nơi sản xuất các bản nhạc cụ thể → tăng authority cho từ khóa âm nhạc.

---

### 6. BreadcrumbList — Thêm cho tất cả pages còn thiếu

Tất cả pages quan trọng đã được thêm BreadcrumbList:

| Page | BreadcrumbList |
|------|----------------|
| `/` | Trang chủ |
| `/services` | Trang chủ > Dịch vụ & Bảng giá |
| `/blog` | Trang chủ > Blog & Kiến Thức Âm Nhạc |
| `/about` | Trang chủ > Giới Thiệu XKStudio |
| `/courses` | *(tự kế thừa)* |
| `/products` | Trang chủ > Sản phẩm Âm nhạc Tiêu biểu |
| `/live-band` | Trang chủ > Quốc Chí Sound & Lighting |
| `/contact` | *(LocalBusiness schema đầy đủ)* |
| `/faq` | *(FAQPage schema đầy đủ)* |

---

## Bảng so sánh trước/sau

| Hạng mục | Trước | Sau |
|----------|-------|-----|
| Canonical URL | ❌ Cố định `/` cho mọi page | ✅ Động theo route |
| hreflang | ❌ Không có | ✅ `vi-VN` + `x-default` |
| ogImage | ❌ Path tương đối | ✅ URL tuyệt đối |
| ogImageWidth/Height | ❌ Không có | ✅ 1200×630 |
| ogUrl | ❌ Không có | ✅ Có trên mọi page |
| twitterImage | ❌ Chỉ homepage | ✅ Mọi page |
| Sitemap lastmod | ❌ Không có | ✅ Có |
| Sitemap images | ❌ Không có | ✅ Có với title/caption |
| BreadcrumbList | ❌ Chỉ homepage, blog | ✅ Tất cả pages |
| BlogPosting schema | ❌ Không có | ✅ 4 articles |
| MusicRecording schema | ❌ Không có | ✅ 3 tracks |
| Organization contactPoint | ❌ Không có | ✅ Đầy đủ |
| Robots X-Robots-Tag header | ❌ Không có | ✅ max-image-preview:large |
| Permissions-Policy header | ❌ Không có | ✅ Có |

---

## Chuẩn tham khảo Oscar Family

Dự án `lacvietanh/oscar-family` sử dụng các kỹ thuật SEO sau được áp dụng:

1. **Dynamic canonical per page** — `useRoute()` để lấy current URL
2. **hreflang alternate tags** — `vi-VN` và `x-default`
3. **Absolute URLs cho mọi meta image** — không dùng path tương đối
4. **Organization JSON-LD toàn cục** — inject ở `App.vue` / `app.vue`
5. **WebSite SearchAction schema** — giúp Google hiểu sitelink search
6. **BlogPosting schema** với `datePublished`, `publisher`, `author`
7. **BreadcrumbList** trên mọi page phụ
8. **robots: max-image-preview:large** — maximize preview size

---

## Các bước tiếp theo đề xuất

- [ ] **Tạo OG Image riêng cho từng trang** (1200×630px) thay vì dùng chung `hero-studio.png`
- [ ] **Thêm Google Search Console** và submit sitemap mới
- [ ] **Tạo `public/_headers`** (Cloudflare Pages) để thay thế route headers trong nitro
- [ ] **Thêm structured data testing** bằng Google Rich Results Test
- [ ] **Blog entries nên có URL riêng** (ví dụ `/blog/thu-am-bai-hat-gia-bao-nhieu`) để SEO mạnh hơn thay vì expandable cards
- [ ] **Schema `LocalBusiness` với `@id` rõ ràng** để tránh duplicate entity
