# Fix Log — Ngày 05/05/2026 (XKStudio)

> **Thực hiện:** Antigravity AI  
> **Ngày:** 04–05/05/2026  
> **Repo:** `Xkstudio-dev` → `xkproduction.com`
> **Brand Update:** XKStudio → **XKProduction**

---

## 1. ✅ Logo hình tròn (Navbar + Footer + Head/Tab)

**Vấn đề:** Logo hiển thị vuông trong tab trình duyệt (favicon) và bo tròn không đều ở giao diện.

**Đã fix:**
- Cập nhật favicon và apple-touch-icon từ `xk-logo.png` → `xk-logo-new.jpg` trong `nuxt.config.ts`.
- Áp dụng `object-fit: cover` và `border-radius: 50%` cho toàn bộ logo trong `Navbar.vue` và `Footer.vue`.
- **Lưu ý:** Favicon trình duyệt thường được cache rất lâu. Bạn cần Clear Cache hoặc mở link ảnh trực tiếp để trình duyệt cập nhật icon mới.

---

## 2. ✅ Đổi tên thương hiệu: XKStudio → XKProduction

**Yêu cầu:** Đổi toàn bộ tên thương hiệu nhưng giữ nguyên các câu mô tả dịch vụ.

**Đã thực hiện:**
- Cập nhật `site.name` và `site.description` trong `nuxt.config.ts`.
- Cập nhật `useSeoMeta` (title, ogTitle, twitterTitle, keywords, author) trên **TẤT CẢ** các trang (`index`, `about`, `services`, `contact`, `blog`, `courses`, `live-band`, `products`, `faq`, `privacy`).
- Cập nhật Schema Organization và LocalBusiness.
- Cập nhật text hiển thị trong `Navbar` và `Footer`.
- Giữ nguyên câu: *"Phòng Thu Âm Chuyên Nghiệp | Hoà Âm Phối Khí | Mix Master..."* theo đúng yêu cầu.

**Đã làm:**
- Xóa file `public/images/hero-studio.png` khỏi project
- Thay thế trong `index.vue`: xóa `<img>` tag và parallax JS handler dùng ảnh này
- Background trang chủ được thay bằng **CSS gradient thuần** (radial + linear gradient) — nhẹ hơn, không cần request ảnh, vẫn giữ hiệu ứng tối
- Xóa toàn bộ references `hero-studio.png` trong `nuxt.config.ts` (sitemap images)
- File: `index.vue`, `nuxt.config.ts`

---

## 3. ✅ Tạo `public/_headers` (Cloudflare Pages)

**Lý do:** Nitro `routeRules` headers chỉ hoạt động với server-side. Với Cloudflare Pages (static), cần file `_headers` để set headers tại edge CDN.

**File tạo:** `public/_headers`
```
/*
  Cache-Control: public, max-age=3600, s-maxage=86400
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Robots-Tag: index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1

/images/*
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/privacy
  X-Robots-Tag: noindex, follow
```

**Lợi ích:**
- Images và static assets cache **1 năm** (immutable)
- HTML cache 1 tiếng local / 24 tiếng CDN
- SEO headers `max-image-preview:large` hoạt động ở edge level

---

## 4. ✅ Schema `LocalBusiness` với `@id` rõ ràng

**Vấn đề:** Khi có 2 trang (index + contact) đều khai báo `LocalBusiness`, Google có thể coi là 2 entity khác nhau.

**Đã fix:** Thêm `'@id': 'https://xkproduction.com/#localbusiness'` vào cả 2 nơi khai báo:
- `app/pages/index.vue`
- `app/pages/contact.vue`

Khi `@id` giống nhau, Google hiểu đây là cùng 1 entity, sẽ merge thông tin thay vì tạo duplicate.

---

## 5. ✅ Sitemap images cập nhật

Thay tất cả `hero-studio.png` trong sitemap bằng ảnh thực của project:
- `/`: `xk-logo-new.jpg` + `founder-kiet.jpg`
- `/services`: `xk-logo-new.jpg`
- `/courses`: `xk-logo-new.jpg`
- `/products`: `revan.jpg` + `howl.jpg`

---

## 6. ℹ️ Các mục KHÔNG làm (giải thích)

| Mục | Lý do không làm |
|-----|-----------------|
| **OG Image riêng cho từng trang** | Sẽ cần tạo ảnh thực cho từng page → người dùng cần cung cấp ảnh. Hiện dùng `xk-logo-new.jpg` làm ảnh chung — hoạt động tốt cho social sharing |
| **Google Search Console** | Đây là thao tác thủ công trên Google Search Console dashboard → cần chủ sở hữu domain xác minh, sau đó submit `https://xkproduction.com/sitemap.xml` |
| **Structured Data Testing** | Công cụ online: https://search.google.com/test/rich-results — paste URL sau khi deploy |
| **Blog entries có URL riêng** | Đây là thay đổi lớn về kiến trúc routing (tạo dynamic routes `/blog/[slug]`), cần tách nội dung blog thành data file riêng — user đã dặn không thay đổi layout/structure |

---

## Tóm tắt file thay đổi

| File | Thay đổi |
|------|----------|
| `public/images/hero-studio.png` | 🗑️ Xóa |
| `public/_headers` | ✨ Tạo mới |
| `nuxt.config.ts` | Favicon → `xk-logo-new.jpg`, sitemap images cập nhật |
| `app/pages/index.vue` | Xóa `<img>` hero-studio, thay bằng CSS gradient; thêm `@id` LocalBusiness |
| `app/pages/contact.vue` | Thêm `@id` LocalBusiness |
| `app/components/Navbar.vue` | Logo → `xk-logo-new.jpg`, `object-fit: cover` |
| `app/components/Footer.vue` | Logo → `xk-logo-new.jpg`, `object-fit: cover` |
| `app/app.vue` | Schema Organization logo → `xk-logo-new.jpg` |
| `app/pages/blog.vue` | Publisher logo → `xk-logo-new.jpg` |
| All pages | `ogImage`, `twitterImage` → URL tuyệt đối `xk-logo-new.jpg` |
