# XKPRODUCTION V2 — STRATEGIC MASTER PLAN & ARCHITECTURAL BLUEPRINT
## THE DIGITAL FLAGSHIP OF A MUSIC & CREATIVE PRODUCTION HOUSE

> **Author**: Creative Director, Brand Strategist, UX Architect & Senior Nuxt 4 Engineer  
> **Target Release**: XKProduction V2  
> **Status**: Ready for Executive Review & Stakeholder Approval  
> **Primary Objective**: Chuyển dịch vị thế thương hiệu từ *"Phòng thu âm địa phương tại Bình Phước"* thành *"Production House chuẩn mực – Đồng hành từ Ý niệm ban đầu (Idea) đến Tác phẩm hoàn chỉnh (Final Work)"*.

---

## 01. CURRENT SITE AUDIT (ĐÁNH GIÁ HỆ THỐNG V1)

Dựa trên việc kiểm tra toàn diện mã nguồn hiện tại (`app/pages/`, `app/components/`, `app/composables/`, `public/images/`, `nuxt.config.ts`), dưới đây là ma trận phân loại chi tiết:

| Hạng mục V1 | Trạng thái hiện tại | Đánh giá chuyên môn | Phân loại | Định hướng V2 |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Section** | Text lớn, badge nhấp nháy, stats strip (2000+ dự án, 5.0 sao) | Quá giống website dịch vụ / agency tiếp thị giá rẻ. Trưng bày số liệu ngay lập tức làm giảm tính nghệ thuật và chiều sâu thương hiệu. | **REBUILD** | Full viewport cinematic hero, 1 khẩu hiệu duy nhất, video/ảnh thực tế studio, tối giản metadata, CTA chính: `EXPLORE WORK` & `START A PROJECT`. |
| **Bảng giá / Pricing Cards** | "Từ 500.000₫ / buổi", badge "Phổ biến nhất", gói combo SaaS-style | Hạ thấp giá trị sản xuất. Biến dịch vụ sáng tạo thành món hàng đóng gói đại trà. | **REWRITE & REBUILD** | Tách khỏi trang chủ. Đưa vào `Services` & `Project Builder` dưới dạng mức đầu tư khởi điểm (`Starting from`), phân loại theo năng lực thực thi (`Capability`). |
| **Portfolio / Sản phẩm** | Grid 6 cards YouTube thumbnail, xem qua modal lightbox | Bố cục thẻ đồng dạng, thiếu tính phân cấp nghệ thuật (editorial), chưa có trang case study chuyên sâu chuẩn điện ảnh. | **REBUILD** | Chuyển thành trung tâm của V2 (`WORK`). Layout bất đối xứng nghệ thuật (Art-directed editorial grid), mỗi dự án có trang `/work/[slug]` dạng case study phim. |
| **Audio Comparison (A/B)** | `StudioAudioCompare.vue` với raw & mixed audio | Ý tưởng lõi rất xuất sắc (chứng minh năng lực bằng âm thanh thực tế), nhưng giao diện nút bấm kiểu bàn mixer giả lập hơi thô. | **REBUILD & KEEP DATA** | Nâng cấp thành Signature Interaction **"HEAR THE DIFFERENCE"** dạng thanh gạt trượt (draggable slider), waveform kép đồng bộ, producer note giải thích lý do xử lý. |
| **Project Estimator** | `ProjectEstimator.vue` tính giá theo số bài + addon | Logic tính toán tốt nhưng ngôn ngữ mang tính "tính tiền / giảm giá" như sàn TMĐT. | **REBUILD** | Tái định hình thành **"BUILD YOUR PROJECT"** (Pre-production Room) – Wizard 8 bước hoạch định quy mô, định hướng thể loại, timeline, ngân sách và upload demo. |
| **Founder Section** | Ảnh anh Kiệt bên bàn mixer Midas M32R, quote triết lý | Bức ảnh thực tế rất đắt giá và chân thực, nhưng bố cục card còn đơn điệu. | **KEEP & REBUILD** | Giữ ảnh thật và quote đắt giá, nâng cấp thành phần giới thiệu Creator & Production Network trong hệ sinh thái V2, không để website biến thành portfolio cá nhân đơn lẻ. |
| **Testimonials / Cảm nhận** | Revan, Howl, Cao Thành Lâm, Fesu | Toàn bộ là nghệ sĩ thật, review thật, có ảnh avatar thật – tài sản cực kỳ uy tín. | **KEEP & MERGE** | Tích hợp trực tiếp vào từng Case Study của nghệ sĩ đó trên trang `/work/[slug]`, chỉ giữ lại 3 trích dẫn editorial tinh tế trên trang chủ. |
| **Dịch vụ chi tiết** | 5-6 trang riêng (`/thu-am`, `/mix-master`, `/hoa-am-phoi-khi`, `/live-band`, `/quay-mv-tvc`) | Nội dung chi tiết, SEO tốt, nhưng visual bị vụn và trùng lặp layout. | **MERGE & REBUILD** | Tái cấu trúc thành 4 Trụ cột Năng lực chính (`Music Production`, `Creative Sound`, `Live Production`, `Project Production`), hỗ trợ dynamic routing `/services/[slug]`. |
| **Blog / Kiến thức** | `useBlog.ts` với 11 bài viết chuyên sâu về kỹ thuật thu âm, mix master, hậu trường | Bài viết hậu trường "Nhật Kí Của Mẹ" và kỹ thuật thu âm cực kỳ sâu sắc, chuẩn chuyên gia. | **REWRITE & RENAME** | Chuyển thành **JOURNAL / PRODUCTION NOTES** (`/journal`). Biến blog SEO thông thường thành nơi ghi lại nhật ký sản xuất đằng sau các bản hit. |
| **Hệ thống Menu / Navbar** | `Navbar.vue` dropdown truyền thống | Nhiều menu con gây rối mắt trên mobile, thiếu chiều sâu thương hiệu. | **REBUILD** | Minimal Header: `WORK`, `SERVICES`, `PRODUCTION`, `RELEASES`, `ABOUT`, `JOURNAL`, `START A PROJECT`. Dropdown thông minh hiển thị visual preview. |
| **Audio Player toàn trang** | `StudioAudioDock.vue` thanh dock dưới đáy | Tiện lợi nhưng giao diện còn đơn giản, chưa có playlist, queue, visualizer mượt mà. | **NEW** | Xây dựng **XK GLOBAL AUDIO ENGINE** hoàn chỉnh: persistent bottom bar, waveform tương tác, hiển thị artwork, credits, hỗ trợ phím tắt (`Space`, `Arrows`). |
| **Form liên hệ** | `contact.vue` & lead capture popup | Đầy đủ validation và kết nối API D1/Telegram/Formspree. | **KEEP LOGIC & REBUILD UI** | Giữ nguyên logic backend serverless Cloudflare D1/Telegram/Firebase, thay thế UI bằng Brief Submission Form thanh lịch, không dùng alert/popup xấu xí. |

---

## 02. COMPETITOR & BENCHMARK ANALYSIS

### A. Hệ quy chiếu quốc tế & khu vực
1. **Âm nhạc & Sound Production (Abbey Road, Hans Zimmer Remote Control Productions, MassiveMusic, Squeak E. Clean Studios)**:
   - *Nguyên tắc rút ra*: Không bao giờ bán "giờ thu âm". Họ bán "Tầm nhìn âm thanh" (Sonic Vision). Mọi hình ảnh đều tối màu, giàu chất điện ảnh, tập trung vào con người làm việc bên nhạc cụ và máy móc analog.
2. **Hãng phim & Creative Production Houses (A24, Somesuch, Media.Monks, Buck)**:
   - *Nguyên tắc rút ra*: Portfolio dạng Video-first và Full-bleed Imagery. Tên dự án cực lớn (Typographic dominance), credit chi tiết từng vị trí sáng tạo.
3. **Studio sáng tạo kỹ thuật số & Kiến trúc cao cấp (Disanbudang.com, Studio Thomas, Bureau Borsche)**:
   - *Nguyên tắc rút ra*: Khai thác khoảng lặng (whitespace/silence), chuyển động camera-like tự nhiên, tiết chế màu sắc rực rỡ, typography sắc bén hỗ trợ đầy đủ dấu tiếng Việt.

### B. Bài học từ Disanbudang.com (Experiential UX Reference)
- **Áp dụng**: Cách dẫn dắt người xem qua một câu chuyện có mở bài, thắt nút, cao trào và kết thúc; sự mượt mà trong việc hé lộ nội dung theo nhịp cuộn (progressive disclosure).
- **Tuyệt đối KHÔNG sao chép**: Tone màu văn hoá thổ cẩm/đất đỏ, graphic dân tộc, font chữ vintage cổ truyền. Thế giới của XK là: **Âm học, Băng từ, Phòng thu, Ánh sáng sân khấu, Màn hình DAW, Sự cộng hưởng kim loại và gỗ.**

---

## 03. BRAND STRATEGY & POSITIONING

```
           [ V1: LOCAL RECORDING STUDIO ]
           "Phòng thu âm - Mix nhạc - Cho thuê dàn nhạc"
                                │
                                ▼ TRANSFORMATION
           [ V2: CREATIVE PRODUCTION HOUSE ]
       "Music + Sound + Production + Live Execution"
       "Từ Ý Niệm Đầu Tiên Đến Tác Phẩm Cuối Cùng"
```

### Strategic Territories (4 Trụ Cột Chiến Lược)
1. **MUSIC**: Sáng tác, Hoà âm phối khí độc bản, Vocal Production, Định hình phong cách nghệ sĩ.
2. **SOUND**: Kỹ nghệ Mixing & Mastering chuẩn quốc tế, Sound Design, Âm thanh quảng cáo & thương hiệu.
3. **PRODUCTION**: Đảm nhiệm vai trò Music Producer toàn diện (Pre-production -> Recording -> Post-production -> Release).
4. **LIVE**: Giám đốc âm nhạc (Music Direction), Live Band sự kiện, FOH Engine & Âm thanh biểu diễn trực tiếp.

---

## 04. THE DESIGN THESIS (TRIẾT LÝ THIẾT KẾ V2)

> **"XKProduction V2 không phải là cuốn catalogue giới thiệu phòng thu âm, mà là phòng điều khiển của một production house đang vận hành liên tục. Mọi chi tiết trên website đều phải cư xử như một thước phim điện ảnh: âm thanh không phải vật trang trí mà là định dạng nội dung cốt lõi; khoảng lặng thị giác có sức nặng tương đương những nốt ngắt trong bản phối; và sự chuyển dịch từ ý niệm thô ráp đến tác phẩm phát hành hoàn mỹ là câu chuyện xuyên suốt người xem được trực tiếp trải nghiệm. Khách hàng bước vào không phải để 'mua một giờ thu', mà để uỷ thác ý tưởng âm nhạc của họ cho một đội ngũ có đủ tư duy nghệ thuật, công nghệ chuẩn xác và sự kiên nhẫn tối thượng."**

---

## 05. USER PERSONAS (5 ĐỐI TƯỢNG TRỌNG TÂM)

1. **The Independent Artist (Ca sĩ / Rapper tự do)**:
   - *Nhu cầu*: Muốn bài hát của mình nghe "đắt tiền", chuẩn Spotify, có vocal coach kèm cặp, không bị biến thành sản phẩm đại trà.
   - *Điểm chạm V2*: Trang `/work`, tính năng "Hear The Difference" (nghe A/B), Case Study quy trình sản xuất.
2. **The Creator (YouTuber, Podcaster, Đạo diễn phim ngắn)**:
   - *Nhu cầu*: Cần âm thanh sạch, nhạc phim/intro độc quyền, sound design tăng cảm xúc câu chuyện.
   - *Điểm chạm V2*: `/services/creative-sound`, dynamic audio player, gói dịch vụ dự án.
3. **The Brand (Nhãn hàng / Agency tiếp thị)**:
   - *Nhu cầu*: Bài hát truyền thông thương hiệu (Brand Song), TVC Audio, quy trình làm việc chuẩn mực, hoá đơn chứng từ minh bạch, đúng deadline.
   - *Điểm chạm V2*: `/services/project-production`, Trust system, hồ sơ năng lực dự án lớn.
4. **The Event Client (Ban tổ chức lễ hội / Sự kiện / Tiệc cưới cao cấp)**:
   - *Nhu cầu*: Ban nhạc live acoustic chất lượng cao, kỹ sư FOH vận hành mixer chuyên nghiệp, âm thanh không bị rú rít.
   - *Điểm chạm V2*: `/services/live-production`, video biểu diễn thực tế sân khấu.
5. **The Musician / Aspiring Producer (Người đam mê sản xuất âm nhạc)**:
   - *Nhu cầu*: Học nghề bài bản từ người làm nghề thực chiến, tìm kiếm tài nguyên preset chuẩn studio.
   - *Điểm chạm V2*: `/journal` (Behind the track), `/about` (Founder Kiệt), Toolbox.

---

## 06. USER JOURNEYS (HÀNH TRÌNH TÂM LÝ)

```
[ DISCOVER ]  ──►  [ SEE ]  ──►  [ HEAR ]  ──►  [ UNDERSTAND ]  ──►  [ TRUST ]  ──►  [ CONFIGURE ]  ──►  [ START ]
  Hero Full-Bleed    Selected      Hear The        Production Map      Verified        Project Builder      Project Brief
  Atmosphere         Works Grid    Difference      8-Stage Flow        Credits & BTS   (Custom Scope)       Submission
```

- **Bước 1 (Discover)**: Chạm mắt với không gian studio thực thụ, âm thanh analog và tuyên ngôn thương hiệu dứt khoát.
- **Bước 2 (See)**: Chiêm ngưỡng tác phẩm hoàn thiện trước tiên – không phải bảng giá.
- **Bước 3 (Hear)**: Thao tác kéo cần A/B để đôi tai tự cảm nhận độ nảy của bass, độ mịn của vocal.
- **Bước 4 (Understand)**: Thấy rõ sơ đồ 8 bước biến 1 bản ghi âm điện thoại thành bài hát phát hành.
- **Bước 5 (Trust)**: Kiểm chứng qua con người thực tế (Founder Kiệt), nghệ sĩ thật (Revan, Howl, Mai Linh).
- **Bước 6 (Configure)**: Tự do phác thảo quy mô dự án trên Project Builder mà không bị áp lực bán hàng.
- **Bước 7 (Start)**: Gửi brief dự án kèm bản demo thô chỉ trong 60 giây.

---

## 07. NEW SITEMAP & URL ARCHITECTURE

```
├── /                          (The Production House — Homepage Trailer)
├── /work                      (Editorial Archive of Works)
│   └── /work/[slug]           (Case Study / Documentary Detail)
├── /services                  (4 Core Capabilities Matrix)
│   ├── /services/music-production
│   ├── /services/creative-sound
│   ├── /services/live-production
│   └── /services/project-production
├── /production                (Flagship Process: From Idea to Final Work)
├── /releases                  (Public Music Catalog / Streaming Links)
├── /about                     (Philosophy, Origin, Founder & Network)
├── /journal                   (Production Notes, Behind The Track)
│   └── /journal/[slug]        (Technical Breakdown / Editorial Article)
├── /build-project             (Interactive Project Builder & Estimator)
├── /start-a-project           (Primary Conversion Brief Page)
└── /privacy                   (Legal & Data Protection)
```

---

## 08. CONTENT MIGRATION MAP (BẢN ĐỒ DỊCH CHUYỂN DỮ LIỆU)

| Trang V1 cũ | Vị trí mới V2 | Thao tác | Lý do & Hướng xử lý |
| :--- | :--- | :--- | :--- |
| `/` (Trang chủ V1) | `/` | **REBUILD** | Tái kiến trúc thành Cinematic Flagship Trailer. |
| `/products` | `/work` | **MIGRATE & 301 REDIRECT** | `/work` thể hiện đẳng cấp sản xuất hơn là "products" (bán hàng). Giữ 301 redirect bảo toàn SEO. |
| `/products/[id]` | `/work/[slug]` | **MIGRATE & REWRITE** | Nâng cấp thành case study chuẩn điện ảnh: The Idea -> The Challenge -> The Approach -> The Sound -> Visuals -> Credits. |
| `/thu-am` | `/services/music-production#recording` | **MERGE & REDIRECT** | Tích hợp thành capability con của Music Production, duy trì alias URL để giữ thứ hạng từ khóa Google. |
| `/mix-master` | `/services/music-production#mix-master` | **MERGE & REDIRECT** | Giữ landing page chuyên sâu tối ưu SEO từ khóa `mix master`, đồng bộ visual mới. |
| `/hoa-am-phoi-khi` | `/services/music-production#arrangement` | **MERGE & REDIRECT** | Tương tự, kết nối trực tiếp với các demo âm thanh thực tế. |
| `/live-band` | `/services/live-production` | **MIGRATE** | Nâng tầm thành giải pháp Âm thanh sân khấu & Điều phối ban nhạc chuyên nghiệp. |
| `/quay-mv-tvc` | `/services/project-production#visual` | **MERGE** | Nhập vào năng lực sản xuất toàn diện trọn gói. |
| `/blog` | `/journal` | **MIGRATE & REDIRECT** | Đổi tên thành Journal, phân loại theo `Production Notes`, `Behind The Track`, `Sound Engineering`. |
| `/contact` | `/start-a-project` | **REBUILD & ALIAS** | Biến form liên hệ khô khan thành màn khởi tạo Project Brief chuẩn creative studio. |
| `/b2b`, `/courses`, `/presets` | Tích hợp theo chuyên mục | **KEEP & RE-SKIN** | Giữ nguyên các route này để phục vụ chuyển đổi chuyên biệt nhưng đồng bộ hệ token V2. |

---

## 09. HOMEPAGE NARRATIVE WIREFRAME (THE FILM TRAILER)

```
01. OPENING SEQUENCE  ──  Màn đen tĩnh lặng ──► Logo XK tối giản xuất hiện ──► Âm hưởng phòng thu khởi động
02. THE HERO          ──  Full Viewport Visual ──► Khẩu hiệu duy nhất: "FROM IDEA TO FINAL WORK."
                          Metadata: VIETNAM · MUSIC / SOUND / LIVE · EST. 2019
03. SELECTED WORK     ──  Curated Editorial Grid: 1 tác phẩm khổng lồ (Nhật Kí Của Mẹ) + 2 tác phẩm phá cách
04. THE PRODUCTION    ──  "Chúng tôi không chỉ thu âm. Chúng tôi kiến tạo toàn bộ tác phẩm."
    HOUSE MOMENT          Khoảnh khắc nhận thức: People + Process + Sound + Craft
05. 4 CAPABILITIES    ──  Âm nhạc (Music), Âm thanh (Sound), Sân khấu (Live), Toàn diện (Production)
06. FEATURED CASE     ──  Tác phẩm điểm nhấn: Hậu trường Logic Pro X, track vocal mộc, quyết định nghệ thuật
07. HEAR THE DIFF     ──  Signature A/B Fader: Kéo trượt giữa Vocal Thô vs Master Hoàn Thiện
08. PRODUCTION MAP    ──  Hành trình 8 bước trực quan từ Ghi âm Voice Memo điện thoại đến Bàn giao Master
09. RELEASE WALL      ──  Tường đĩa phát hành số kết nối Spotify / Apple Music / YouTube
10. PEOPLE & NETWORK  ──  Founder Nguyễn Xuân Kiệt & Đội ngũ cộng tác viên (Producers, Musicians)
11. PRODUCTION NOTES  ──  3 bài Journal đắt giá: "Tại sao chúng tôi bỏ bớt tiếng guitar ở điệp khúc"
12. THE PROOF (TRUST) ──  Nghệ sĩ thật, chứng thực thật từ những người đã đồng hành
13. START A PROJECT   ──  Lời mời hợp tác tinh tế: "Mỗi dự án vĩ đại đều bắt đầu bằng một lý do."
14. FOOTER            ──  Địa chỉ studio Nghĩa Trung - Bù Đăng, toạ độ âm thanh, hotline, social links
```

---

## 10. DESIGN SYSTEM & VISUAL TOKENS (MATTE & ARCHITECTURAL)

### A. Bảng màu (Color Palette)
- **Background Deep Canvas**: `#07080a` (Near-black chiều sâu vô tận, không dùng đen tuyệt đối `#000000`).
- **Surface Elevation 1**: `#0f1115` (Matte slate, kiến trúc kim loại phòng thu).
- **Surface Elevation 2**: `#161920` (Độ tương phản cho cards và panels).
- **Text Primary**: `#f3f4f6` (Warm off-white, đọc êm mắt, không chói gắt).
- **Text Secondary**: `#9ca3af` (Muted silver gray).
- **Subtle Accent Bronze/Amber**: `#d97706` (Màu đèn bóng đèn tiền khuếch đại vacuum tube).
- **Subtle Acoustic Teal**: `#0d9488` (Màu đèn tín hiệu metering analog chuẩn xác).
- *Loại bỏ hoàn toàn*: Màu xanh neon game thủ, gradient cầu vồng, hiệu ứng đổ bóng kính (glassmorphism) rẻ tiền.

### B. Thang độ chữ (Editorial Typography)
- **Primary Font**: `Inter` / `Manrope` (hỗ trợ trọn vẹn dấu tiếng Việt UTF-8).
- **Secondary Display / Editorial Font**: `Playfair Display` hoặc `Cinzel` cho các tiêu đề chương nghệ thuật điểm xuyết.
- **Scale Tokens**:
  - `Hero Title`: `clamp(3.5rem, 8vw, 9.5rem)`
  - `Section Heading`: `clamp(2.5rem, 5vw, 5.5rem)`
  - `Project Title`: `clamp(2rem, 4vw, 4.5rem)`
  - `Body Lead`: `1.25rem (20px)`
  - `Body Standard`: `1rem (16px)`
  - `Technical Meta`: `0.75rem – 0.8125rem (12–13px)` với `letter-spacing: 0.08em`

### C. Lưới & Bề mặt (Grid & Geometry)
- **Lưới 12 cột**: Max-width `1520px` với padding `clamp(1.5rem, 4vw, 4rem)`.
- **Border Radius**: Cực kỳ tiết chế `4px – 6px` cho cấu trúc kỹ thuật, `12px` cho cards lớn. Tuyệt đối không bo tròn dạng viên thuốc (pill) tràn lan.
- **Chất liệu**: Bề mặt mờ (Matte), viền kim loại mảnh `1px solid rgba(255, 255, 255, 0.08)`.

---

## 11. MOTION SYSTEM (BEHAVING LIKE A CAMERA)

```
[ MICRO ]   Hover trên project link ──► Dòng chữ trượt nhẹ 4px, con trỏ phóng to dạng vòng tròn mờ
[ MESO ]    Scroll qua section     ──► Clip-path trượt mở từ từ, ảnh parallax tỷ lệ 1.05 nhẹ nhàng
[ MACRO ]   Chuyển trang           ──► Màn trập đen fade mượt 350ms, âm thanh không bị ngắt đột ngột
```

- **Motion Curves**:
  - Tự nhiên, điện ảnh: `cubic-bezier(0.16, 1, 0.3, 1)` (Expo Out).
  - Thời lượng chuẩn: Micro (150ms), Meso (450ms), Macro (700ms).
- **Khả năng tiếp cận**: Tuân thủ nghiêm ngặt `@media (prefers-reduced-motion: reduce)` – tắt toàn bộ animation di chuyển phức tạp, chuyển sang fade đơn giản.

---

## 12. FEATURE ARCHITECTURE (SIGNATURE EXPERIENCES)

### 1. Global Audio Engine (Trình phát âm thanh độc quyền XK)
- Thanh dock âm thanh tinh tế nằm cố định đáy trang (sticky bottom).
- Tích hợp WaveSurfer canvas siêu nhẹ hoặc HTML5 Audio Canvas visualizer.
- Lưu giữ trạng thái phát khi chuyển trang mà không bị ngắt nhạc (SPA client-side navigation).
- Hỗ trợ phím tắt: `Space` (Play/Pause), `M` (Mute), phím mũi tên tua 5 giây.

### 2. "Hear The Difference" — A/B Comparison Console
- Thanh trượt kéo ngang (interactive draggable handle) chia đôi màn hình/khung sóng âm.
- Đồng bộ timeline giữa 2 file: File A (Bản thu mộc microphone) và File B (Bản Master hoàn thiện).
- Bổ sung ghi chú của Kỹ sư âm thanh: *Tại sao nén dải trầm, tại sao mở rộng không gian stereo*.

### 3. "The Production Map" — Trực quan hoá 8 công đoạn
- Một thanh timeline nằm ngang/dọc phản ánh tiến trình dự án:
  `Idea (Voice memo)` -> `Direction (Hợp âm & Tempo)` -> `Production (Dựng Beat)` -> `Recording (Thu Vocal & Nhạc cụ)` -> `Editing (Tuning & Timing)` -> `Mix (Không gian & Dải tần)` -> `Master (Loudness & Chuẩn số)` -> `Release`.
- Khi người dùng click từng chặng: hình ảnh hậu trường, ghi chú DAW và đoạn audio mẫu thay đổi tương ứng.

### 4. "Build Your Project" — Pre-production Configurator
- Thay thế máy tính giá thô sơ bằng quy trình tư vấn thông minh 6 bước:
  1. *Định dạng*: Single / EP / Album / TVC / Live Sound.
  2. *Tài nguyên hiện có*: Mới là ý tưởng / Đã có bản demo / Đã thu xong vocal.
  3. *Năng lực cần*: Hoà âm phối khí / Mix Master / Vocal coaching / Trọn gói.
  4. *Quy mô*: Số lượng bài hát, nhạc cụ mong muốn.
  5. *Tiến độ*: Tiêu chuẩn (7-10 ngày) / Cần gấp.
  6. *File đính kèm*: Cho phép đính kèm link Drive / file voice memo.
- Kết xuất bản tóm tắt dự án (Project Brief Summary) để gửi trực tiếp qua Zalo hoặc D1/Telegram API.

---

## 13. COMPONENT ARCHITECTURE (DANH MỤC THÀNH PHẦN V2)

```
app/
├── components/
│   ├── xk/
│   │   ├── XKHeader.vue             (Minimal Fixed Navigation with Visual Flyout)
│   │   ├── XKFooter.vue             (Architectural Editorial Footer)
│   │   ├── XKCursor.vue             (Desktop Custom Magnetic Cursor)
│   │   ├── XKAudioEngine.vue        (Global Persistent Audio Controller)
│   │   ├── XKAudioCompare.vue       (Signature A/B Draggable Slider)
│   │   ├── XKHeroCinematic.vue      (Full Viewport Hero with Single Statement)
│   │   ├── XKProjectGrid.vue        (Editorial Asymmetrical Works Showcase)
│   │   ├── XKProjectCard.vue        (Hover Media & Metadata Reveal Item)
│   │   ├── XKCaseStudyHero.vue      (Massive Typographic Case Study Header)
│   │   ├── XKProductionMap.vue      (Interactive 8-Step Timeline Journey)
│   │   ├── XKProductionNotes.vue    (Behind-the-scenes Decisions & Insights)
│   │   ├── XKReleaseWall.vue        (Public Discography & Streaming Embeds)
│   │   ├── XKCapabilityMatrix.vue   (4 Strategic Capabilities Display)
│   │   ├── XKProjectBuilder.vue     (Multi-step Intelligent Wizard)
│   │   ├── XKPeopleNetwork.vue      (Verified Creators & Production Network)
│   │   └── XKTrustEditorial.vue     (Artist Quotes & Verified Credits)
```

---

## 14. DATA MODELS & TYPESCRIPT CONTRACTS

```typescript
// types/production.ts

export interface ProjectCredit {
  role: string          // e.g. "Music Producer", "Mixing Engineer", "Vocal Coach"
  name: string          // e.g. "Nguyễn Xuân Kiệt", "LacAnh"
}

export interface ProductionDecision {
  stage: 'Arrangement' | 'Recording' | 'Mixing' | 'Mastering'
  title: string         // e.g. "Tại sao đoạn điệp khúc được đẩy rộng không gian 3D"
  rationale: string     // Chi tiết chuyên môn giải thích quyết định nghệ thuật
  audioSnippetUrl?: string
}

export interface XKProject {
  id: string
  slug: string
  title: string
  subtitle?: string
  artist: string
  client?: string
  year: number
  category: 'Music Production' | 'Mix & Master' | 'Arrangement' | 'Live Band' | 'Sound Design'
  featured: boolean
  published: boolean
  
  // Media Assets
  coverImage: string
  heroBannerImage: string
  videoEmbedId?: string
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
  }
}

export interface XKRelease {
  id: string
  title: string
  artist: string
  cover: string
  releaseDate: string
  streamingUrl: string
  platform: 'Spotify' | 'Apple Music' | 'YouTube'
  productionRole: string
}
```

---

## 15. SEO SYSTEM & SEARCH INTENT STRATEGY

### Keyword Architecture (Phân cấp từ khoá tự nhiên)
1. **Tier 1 (Core Authority)**:
   - `sản xuất âm nhạc chuyên nghiệp`
   - `music production house vietnam`
   - `hoà âm phối khí bài hát`
   - `phòng thu âm chuyên nghiệp`
   - `kỹ sư âm thanh mix master`
2. **Tier 2 (Intent-Driven Search)**:
   - `chi phí sản xuất một bài hát hoàn chỉnh`
   - `quy trình sản xuất âm nhạc từ bản demo`
   - `khác biệt giữa thu âm và sản xuất âm nhạc`
   - `chuẩn âm lượng spotify -14 lufs`
3. **Tier 3 (Local & High-Trust)**:
   - `phòng thu âm uy tín bình phước`
   - `dịch vụ mix vocal online chuyên nghiệp`

### Structured Data Graph (JSON-LD)
- Triển khai liên kết thực thể mạnh mẽ:
  `Organization` (`XKProduction`) <---> `Person` (`Nguyễn Xuân Kiệt`) <---> `MusicRecording` / `CreativeWork` (Từng bài hát sản xuất) <---> `Service` (Các năng lực cốt lõi).

---

## 16. PERFORMANCE, ACCESSIBILITY & CLOUDFLARE SSG

1. **Hiệu năng truyền thông (Media Pipeline)**:
   - Toàn bộ hình ảnh chuyển sang định dạng WebP/AVIF tối ưu hoá dung lượng.
   - Video hero dùng `poster frame` chất lượng cao, chỉ kích hoạt phát khi khung nhìn tiến vào vùng xem (IntersectionObserver).
   - Tuyệt đối không tự động phát âm thanh (No loud autoplay) – chỉ phát khi người dùng chủ động tương tác.
2. **Core Web Vitals Targets**:
   - LCP (Largest Contentful Paint) < 1.2s.
   - CLS (Cumulative Layout Shift) = 0.
   - INP (Interaction to Next Paint) < 100ms.
3. **Tương thích Cloudflare Pages SSG**:
   - Build tĩnh hoàn toàn (`nuxt generate` / `nitro.prerender`).
   - Mọi API route (`/api/contact`, `/api/analytics`) hoạt động trên Cloudflare Pages Functions & D1 serverless.

---

## 17. IMPLEMENTATION ROADMAP (24 GIAI ĐOẠN TRIỂN KHAI)

```
[ GIAI ĐOẠN 01 — 06: NỀN MÓNG & NỘI DUNG ]
01. Audit & Phê duyệt Master Plan (Hiện tại)
02. Thiết lập Design Tokens V2 trong CSS (Matte Black, Typographic clamp, Grid)
03. Chuẩn hoá Data Layer & TypeScript Contracts cho Projects, Releases, Services
04. Hoàn thiện Content Migration & SEO Redirects map (giữ trọn vẹn thứ hạng V1)
05. Xây dựng Layout Framework mới: Minimal Header, Intelligent Menu & Studio Footer
06. Tích hợp XK Global Audio Engine (Persistent bar, audio context, waveform)

[ GIAI ĐOẠN 07 — 14: GIAO DIỆN CỐT LÕI & TƯƠNG TÁC ĐẶC TRƯNG ]
07. Xây dựng Cinematic Opening Sequence & Full-Viewport Hero
08. Triển khai Curated Selected Works (Editorial Grid bất đối xứng)
09. Hiện thực hoá The Production House Moment & 4 Core Capabilities
10. Lập trình Signature Interaction "Hear The Difference" (Draggable A/B Fader)
11. Lập trình Signature Interaction "The Production Map" (8-stage documentary)
12. Xây dựng Case Study System `/work/[slug]` với cấu trúc Documentary Film
13. Xây dựng trang Năng lực Dịch vụ `/services` & Capability details
14. Thiết lập Living Archive `/releases` (Release Wall kết nối streaming)

[ GIAI ĐOẠN 15 — 19: CHUYỂN ĐỔI & CHIỀU SÂU THƯƠNG HIỆU ]
15. Tái cấu trúc bộ công cụ thành "Build Your Project" Configurator
16. Xây dựng trang `/start-a-project` với quy trình nộp Project Brief thanh lịch
17. Nâng cấp trang `/about` & People Network (Founder Kiệt & Collaborators)
18. Chuyển đổi Blog sang `/journal` (Production Notes & Behind The Track)
19. Tinh chỉnh trải nghiệm Mobile Responsive chuyên sâu (Snap rail, Touch targets)

[ GIAI ĐOẠN 20 — 24: TỐI ƯU HÓA, KIỂM TOÁN & PHÁT HÀNH ]
20. Tối ưu hoá Media, Fonts, Lazy loading & Core Web Vitals
21. Kiểm toán khả năng tiếp cận (A11y ARIA, Keyboard Navigation, Reduced Motion)
22. Cấu hình Schema.org Graph, Canonical URLs, Social Preview Metadata
23. Tích hợp theo dõi chuyển đổi D1 & Inbound Analytics
24. Kiểm thử toàn diện SSG Build, 404 Branded Page & Sẵn sàng bàn giao
```

---

> [!IMPORTANT]
> Kế hoạch này bảo toàn 100% dữ liệu thực tế, các thành quả dự án và thứ hạng SEO hiện có của XKProduction, đồng thời nâng tầm trải nghiệm thị giác và định vị thương hiệu lên tiêu chuẩn của một Creative Production House tầm cỡ.
