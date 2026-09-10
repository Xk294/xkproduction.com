# Quy Chuẩn Partner Attribution: XKProduction → Tách Nhạc

Tài liệu quy định kiến trúc và cơ chế điều hướng đối tác chiến lược giữa **XKProduction (`xkproduction.com`)** và **Tách Nhạc (`tachnhac.com`)**.

---

## 1. Vai Trò Đối Tác
- **XKProduction**: Đối tác giới thiệu lưu lượng truy cập (Traffic Source / Referral Partner).
- **Tách Nhạc**: Nền tảng công cụ xử lý âm thanh trực tuyến bằng AI (Collaboration Destination Project).

---

## 2. Chuẩn Canonical UTM

Mọi liên kết từ XKProduction trỏ đến Tách Nhạc **bắt buộc** phải tuân thủ nghiêm ngặt định dạng:

```
https://tachnhac.com/?utm_source=xkproduction&utm_medium=referral&utm_campaign=xkproduction_v2&utm_content=<placement>
```

- `utm_source`: `xkproduction` (chữ thường)
- `utm_medium`: `referral` (chữ thường)
- `utm_campaign`: `xkproduction_v2` (chữ thường)
- `utm_content`: Mã định danh vị trí click hiển thị trên giao diện (chữ thường, ngăn cách bằng dấu gạch dưới).

---

## 3. Danh Sách Canonical Placements

| Placement Key | Tên Vị Trí / Component | Đường Dẫn Nguồn |
|---|---|---|
| `navbar_tachnhac` | Flyout Bar trong Desktop Header | `app/components/xk/XKHeader.vue` |
| `mobile_nav_tachnhac` | Drawer Menu trên Mobile | `app/components/xk/XKHeader.vue` |
| `footer_tachnhac` | Cột liên kết công cụ tại Footer | `app/components/xk/XKFooter.vue` |
| `services_banner_tachnhac` | Banner CTA "Trải nghiệm TáchNhạc.com" | `app/pages/services/index.vue` |
| `presets_companion_tachnhac` | CTA "Công Cụ Đồng Hành" | `app/pages/presets.vue` |
| `mix_online_callout_tachnhac` | Callout hướng dẫn tách beat/vocal | `app/pages/mix-online.vue` |

---

## 4. Cách Tạo Liên Kết Mới Trong Codebase

Không viết thủ công chuỗi UTM vào template. Luôn sử dụng hàm tập trung `createTachnhacReferralUrl` (tự động import tại `app/utils/partnerAttribution.ts`):

```vue
<template>
  <!-- Trỏ đến trang chủ Tách Nhạc với placement -->
  <a
    :href="createTachnhacReferralUrl('navbar_tachnhac')"
    target="_blank"
    rel="noopener noreferrer"
  >
    Tách Nhạc AI
  </a>

  <!-- Trỏ đến trang chức năng sâu (Deep Link) -->
  <a
    :href="createTachnhacReferralUrl('services_banner_tachnhac', '/vocal-remover')"
    target="_blank"
    rel="noopener noreferrer"
  >
    Bóc tách vocal
  </a>
</template>
```

Hàm `createTachnhacReferralUrl` bảo đảm:
- Giữ nguyên query parameters sẵn có (nếu có), không bao giờ tạo URL lỗi cú pháp dạng `??` hay `&&`.
- Bảo toàn hash fragment (ví dụ `#faq`).
- Tự động mã hóa URL (encodeURIComponent) an toàn.

---

## 5. Mô Hình Ghi Nhận (Attribution Model)

1. **First-Touch Persistence**: Tách Nhạc lưu giữ nguồn gốc người dùng từ XKProduction xuyên suốt quá trình người dùng chuyển trang nội bộ hoặc làm mới trình duyệt.
2. **Last-Touch Extension**: Nếu người dùng sau đó đến từ một chiến dịch khác, lần tương tác gần nhất sẽ được ghi nhận bổ sung mà không làm mất dấu ấn ban đầu của XKProduction.
3. **Phân Tách Với Referrer**: `document.referrer` của trình duyệt chỉ là thông tin phụ trợ, không thể thay thế cho tham số UTM có chủ đích.
4. **Lưu Ý Bảo Mật**: Tham số UTM là thông tin tự khai báo (self-declared) gắn trên URL, không phải chứng chỉ mật mã chống giả mạo. Cả hai bên sử dụng hệ thống này cho mục đích đo lường chiến dịch và tối ưu trải nghiệm người dùng.
