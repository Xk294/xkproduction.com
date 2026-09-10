# Tách Nhạc — Hướng Dẫn Tích Hợp Partner Attribution (XKProduction → Tách Nhạc)

Tài liệu này hướng dẫn đội ngũ kỹ thuật **Tách Nhạc (`tachnhac.com`)** tích hợp cơ chế ghi nhận nguồn đối tác (Cross-Site Partner Attribution) từ **XKProduction (`xkproduction.com`)**.

---

## 1. Chuẩn UTM Đối Tác Canonical

Khi người dùng nhấn vào bất kỳ liên kết giới thiệu nào từ XKProduction sang Tách Nhạc, URL sẽ luôn tuân thủ chuẩn canonical:

- `utm_source=xkproduction` (bắt buộc, chữ thường)
- `utm_medium=referral` (bắt buộc, chữ thường)
- `utm_campaign=xkproduction_v2` (bắt buộc, chữ thường)
- `utm_content=<placement>` (tùy chọn theo vị trí hiển thị)
- `utm_term=<term>` (tùy chọn)

### Bảng Vị Trí Canonical (Placements)
| Placement | Vị Trí Hiển Thị Trên XKProduction |
|---|---|
| `navbar_tachnhac` | Menu dịch vụ mở rộng (Desktop Navbar Flyout) |
| `mobile_nav_tachnhac` | Drawer điều hướng trên thiết bị di động |
| `footer_tachnhac` | Cột công cụ âm thanh ở chân trang (Footer) |
| `services_banner_tachnhac` | Banner nổi bật công cụ AI tại trang `/services` |
| `presets_companion_tachnhac` | Hộp công cụ đồng hành tại trang `/presets` |
| `mix_online_callout_tachnhac` | Khối lưu ý tách stem tại trang `/mix-online` |

---

## 2. Các File Mã Nguồn Cần Đặt Vào Dự Án Tách Nhạc

Các file mã nguồn TypeScript sẵn sàng sản xuất đã được cấu trúc tương thích trực tiếp với Nuxt 4:

1. **`types/attribution.ts`** → Copy vào `app/types/attribution.ts`
   - Định nghĩa `AttributionRecord`, `AttributionStore`, `AnalyticsAttributionPayload`.
2. **`utils/attribution.ts`** → Copy vào `app/utils/attribution.ts`
   - Xử lý sanitize an toàn (chống XSS, kiểm tra độ dài, trích xuất referrer, chuẩn hóa chữ thường).
3. **`composables/useAttribution.ts`** → Copy vào `app/composables/useAttribution.ts`
   - Composable Nuxt 4 quản lý state phản ứng (`useState`), lưu trữ bền vững (`localStorage`), hỗ trợ cả 2 mô hình First-Touch và Last-Touch.
4. **`plugins/attribution.client.ts`** → Copy vào `app/plugins/attribution.client.ts`
   - Tự động bắt UTM khi người dùng vào trang lần đầu, không gây hydration mismatch, không lặp pageview.

---

## 3. Mô Hình Attribution: First-Touch vs Last-Touch

Hệ thống được thiết kế theo mô hình lai (Hybrid Attribution Model):

- **First-Touch (Gốc chuyển đổi / Acquisition Source)**:
  - Được lưu trữ vĩnh viễn trong phiên duyệt web của người dùng và giữ nguyên xuyên suốt hành trình (`/` → `/vocal-remover` → `/audio-cutter` → refresh).
  - Điều hướng nội bộ thông thường **tuyệt đối không ghi đè** hoặc xóa First-Touch.
- **Last-Touch (Chiến dịch gần nhất)**:
  - Nếu người dùng sau này bấm vào một chiến dịch quảng cáo hoặc link đối tác khác, `lastTouch` sẽ cập nhật nguồn mới nhất, nhưng `firstTouch` vẫn được bảo toàn để trả lời câu hỏi *"Ai là người đầu tiên giới thiệu user này?"*.

---

## 4. Gắn Kết Với Sự Kiện & Analytics Hiện Tại Của Tách Nhạc

Trong các component xử lý tác vụ chính (ví dụ: Tách nhạc thành công, Tải file, Đăng ký):

```vue
<script setup lang="ts">
import { useAttribution } from '~/composables/useAttribution'

const { isFromXKProduction, getAttributionForAnalytics } = useAttribution()

function onStemSeparationSuccess() {
  const attribution = getAttributionForAnalytics('first-touch')
  
  // Gửi kèm dữ liệu attribution vào event analytics hiện tại:
  // Ví dụ: Cloudflare Pages Web Analytics, Plausible, hoặc Google Analytics:
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'tool_success', {
      tool_name: 'vocal_remover',
      acquisition_source: attribution.source,
      acquisition_medium: attribution.medium,
      acquisition_campaign: attribution.campaign,
      acquisition_content: attribution.content,
      is_partner: attribution.is_partner,
    })
  }
}
</script>
```

---

## 5. Lưu Ý Kỹ Thuật & Bảo Mật

1. **SSR / Hydration Safety**: Không đọc `window` hoặc `localStorage` trong quá trình Server-Side Rendering. Mọi thao tác truy xuất storage được bọc trong `import.meta.client`.
2. **Referrer Context**: `document.referrer` được thu thập độc lập như một ngữ cảnh bổ trợ kỹ thuật, không thay thế cho tham số UTM có chủ đích.
3. **Lưu ý nghiệp vụ**: Tham số UTM là khai báo từ link chiến dịch, không phải chữ ký mật mã chống gian lận (tamper-proof). Do đó, dữ liệu UTM đại diện cho *"nguồn giới thiệu được khai báo qua đường dẫn đối tác"*.
