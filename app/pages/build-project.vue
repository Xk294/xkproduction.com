<template>
  <div class="build-project-page">
    <div class="editorial-container">
      <!-- TOP ANCHOR & HEADER -->
      <header class="page-header text-center">
        <div class="header-badge-wrap">
          <span class="badge-v2 amber">
            <span class="live-pulse-dot" aria-hidden="true"></span>
            {{ isVi ? 'PHÒNG HOẠCH ĐỊNH DỰ ÁN · PRE-PRODUCTION ROOM' : 'PRE-PRODUCTION CONFIGURATOR & ESTIMATOR' }}
          </span>
        </div>
        <h1 class="wizard-title font-display">
          {{ isVi ? 'Dự Toán Chi Phí & Hoạch Định Dự Án' : 'Project Builder & Instant Cost Estimator' }}
        </h1>
        <p class="wizard-subtitle">
          {{ isVi
            ? 'Minh bạch 100% — Nhận báo giá tức thì trong 10 giây, định hình quy mô và chuẩn bị brief trước khi sản xuất tại XKProduction.'
            : '100% Transparent — Instant pricing in 10 seconds, project scoping, and structured creative brief before studio production.'
          }}
        </p>

        <!-- MODE SWITCHER TABS -->
        <div class="mode-tabs-wrap" role="tablist" :aria-label="isVi ? 'Chế độ công cụ' : 'Tool Mode'">
          <button
            type="button"
            role="tab"
            :aria-selected="activeMode === 'quick'"
            class="mode-tab-btn"
            :class="{ 'is-active': activeMode === 'quick' }"
            @click="setMode('quick')"
          >
            <i class="fa-solid fa-bolt"></i>
            <span>{{ isVi ? 'Dự Toán Nhanh (10 Giây)' : 'Instant Estimator (10s)' }}</span>
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="activeMode === 'brief'"
            class="mode-tab-btn"
            :class="{ 'is-active': activeMode === 'brief' }"
            @click="setMode('brief')"
          >
            <i class="fa-solid fa-file-lines"></i>
            <span>{{ isVi ? 'Lập Hồ Sơ Dự Án (3 Bước)' : 'Detailed Project Brief (3 Steps)' }}</span>
            <span class="tab-badge-hint">{{ isVi ? 'Khuyên Dùng' : 'Recommended' }}</span>
          </button>
        </div>
      </header>

      <!-- ======================================================= -->
      <!-- MODE 1: INSTANT ESTIMATOR (1-SCREEN DYNAMIC CALCULATOR) -->
      <!-- ======================================================= -->
      <div v-if="activeMode === 'quick'" class="quick-estimator-section matte-card">
        <div class="estimator-grid-layout">
          <!-- LEFT: CONTROLS & SELECTORS -->
          <div class="estimator-controls-col">
            <!-- 0. QUICK SCENARIO PRESETS -->
            <div class="quick-preset-banner">
              <div class="quick-preset-header">
                <span class="preset-badge font-mono">
                  <i class="fa-solid fa-wand-magic-sparkles"></i>
                  {{ isVi ? 'GỢI Ý NHANH THEO MỤC TIÊU' : 'QUICK SCENARIO PRESETS' }}
                </span>
                <span class="preset-hint">
                  {{ isVi ? '1-Chạm cấu hình trọn gói phù hợp' : 'One-click setup for common artist goals' }}
                </span>
              </div>
              <div class="preset-chips-grid">
                <button
                  v-for="preset in quickPresets"
                  :key="preset.id"
                  type="button"
                  class="preset-card-btn"
                  :class="{ 'is-active': isPresetActive(preset) }"
                  @click="applyPreset(preset)"
                >
                  <div class="preset-top-row">
                    <div class="preset-icon-frame">
                      <i class="fa-solid" :class="preset.icon"></i>
                    </div>
                    <span v-if="preset.tag" class="preset-tag font-mono">{{ preset.tag }}</span>
                  </div>
                  <strong class="preset-name">{{ isVi ? preset.titleVi : preset.titleEn }}</strong>
                  <span class="preset-desc">{{ isVi ? preset.descVi : preset.descEn }}</span>
                </button>
              </div>
            </div>

            <!-- 1. SERVICE SELECTOR -->
            <div class="config-group">
              <div class="group-header">
                <span class="group-num font-mono">01</span>
                <div>
                  <h2 class="group-title">{{ isVi ? 'Chọn Dịch Vụ Cốt Lõi' : 'Select Core Service' }}</h2>
                  <p class="group-desc">{{ isVi ? 'Chọn dịch vụ âm nhạc hoặc sự kiện bạn cần thực hiện' : 'Choose the main production package' }}</p>
                </div>
              </div>

              <div class="services-cards-grid">
                <button
                  v-for="svc in serviceCatalog"
                  :key="svc.id"
                  type="button"
                  class="service-card-btn"
                  :class="{ 'is-selected': selectedServiceId === svc.id }"
                  @click="selectedServiceId = svc.id"
                >
                  <div class="svc-card-header">
                    <div class="svc-icon-frame">
                      <i class="fa-solid" :class="svc.icon"></i>
                    </div>
                    <span v-if="svc.badge" class="svc-hot-badge">{{ svc.badge }}</span>
                  </div>
                  <strong class="svc-name-text">{{ isVi ? svc.nameVi : svc.nameEn }}</strong>
                  <span class="svc-price-text">
                    {{ isVi ? 'từ' : 'from' }} <span class="price-highlight">{{ formatCurrency(svc.basePrice) }}</span>
                    <span class="svc-unit-text">/ {{ isVi ? svc.unitVi : svc.unitEn }}</span>
                  </span>
                  <p class="svc-desc-snippet">{{ isVi ? svc.descVi : svc.descEn }}</p>
                </button>
              </div>
            </div>

            <!-- 2. TRACK COUNT SELECTOR -->
            <div class="config-group">
              <div class="group-header">
                <span class="group-num font-mono">02</span>
                <div class="group-header-spread">
                  <div>
                    <h2 class="group-title">{{ isVi ? 'Số Lượng Bài Hát' : 'Number of Tracks' }}</h2>
                    <p class="group-desc">{{ isVi ? 'Ưu đãi chiết khấu khi làm từ 2 bài trở lên' : 'Automatic volume discounts for multi-track projects' }}</p>
                  </div>
                  <span v-if="songCount >= 3" class="discount-pill">
                    <i class="fa-solid fa-tag"></i> {{ isVi ? 'GIẢM 15% COMBO' : '15% OFF COMBO' }}
                  </span>
                  <span v-else-if="songCount === 2" class="discount-pill">
                    <i class="fa-solid fa-tag"></i> {{ isVi ? 'GIẢM 8% COMBO' : '8% OFF COMBO' }}
                  </span>
                </div>
              </div>

              <div class="song-count-chips-row">
                <button
                  v-for="countOpt in countOptions"
                  :key="countOpt.value"
                  type="button"
                  class="count-chip-btn"
                  :class="{ 'is-active': songCount === countOpt.value }"
                  @click="songCount = countOpt.value"
                >
                  <span class="chip-val font-mono">{{ countOpt.value }}</span>
                  <span class="chip-label">{{ isVi ? countOpt.labelVi : countOpt.labelEn }}</span>
                  <span v-if="countOpt.discount" class="chip-discount-tag">{{ countOpt.discount }}</span>
                </button>
              </div>
            </div>

            <!-- 3. ADD-ON OPTIONS -->
            <div class="config-group">
              <div class="group-header">
                <span class="group-num font-mono">03</span>
                <div>
                  <h2 class="group-title">{{ isVi ? 'Tùy Chọn Bổ Sung' : 'Optional Add-ons' }}</h2>
                  <p class="group-desc">{{ isVi ? 'Tùy chọn file stem và thời gian bàn giao' : 'Stem delivery and rush delivery options' }}</p>
                </div>
              </div>

              <div class="addons-list">
                <label class="addon-item-label" :class="{ 'is-checked': addStems }">
                  <input type="checkbox" v-model="addStems" class="addon-real-checkbox" />
                  <div class="addon-custom-box">
                    <i v-if="addStems" class="fa-solid fa-check"></i>
                  </div>
                  <div class="addon-info-text">
                    <div class="addon-title-row">
                      <strong>{{ isVi ? 'Bàn giao Multi-track Stems rời 24-bit' : 'Full 24-bit Multi-track Stem Delivery' }}</strong>
                      <span class="addon-fee font-mono">+200.000₫ / {{ isVi ? 'bài' : 'track' }}</span>
                    </div>
                    <p>{{ isVi ? 'Xuất riêng từng track vocal, beat, FX, acapella chất lượng cao để lưu trữ lâu dài.' : 'Export individual stem tracks (vocal, beat, instruments) for archiving.' }}</p>
                  </div>
                </label>

                <label class="addon-item-label" :class="{ 'is-checked': needRush }">
                  <input type="checkbox" v-model="needRush" class="addon-real-checkbox" />
                  <div class="addon-custom-box">
                    <i v-if="needRush" class="fa-solid fa-check"></i>
                  </div>
                  <div class="addon-info-text">
                    <div class="addon-title-row">
                      <strong>{{ isVi ? 'Ưu tiên bàn giao siêu tốc 24h — 48h' : 'Priority Rush Delivery (24h-48h)' }}</strong>
                      <span class="addon-fee font-mono">+300.000₫ / {{ isVi ? 'bài' : 'track' }}</span>
                    </div>
                    <p>{{ isVi ? 'Xếp lịch sản xuất khẩn cấp cho deadline sự kiện hoặc lịch phát hành gấp.' : 'Prioritized queue for tight event deadlines or urgent release schedules.' }}</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- RIGHT: LIVE RECEIPT & ACTIONS PANEL -->
          <div class="estimator-receipt-col">
            <div class="live-receipt-card">
              <div class="receipt-header">
                <span class="text-meta-mono receipt-kicker">{{ isVi ? 'DỰ TOÁN CHI PHÍ TỰ ĐỘNG' : 'DYNAMIC COST SUMMARY' }}</span>
                <span class="status-live-tag font-mono">
                  <span class="dot-blink"></span>
                  {{ isVi ? 'LIVE CALCULATOR' : 'LIVE CALCULATOR' }}
                </span>
              </div>

              <!-- TOTAL PRICE DISPLAY -->
              <div class="price-display-block">
                <span class="price-sub-label text-meta-mono">{{ isVi ? 'TỔNG CHI PHÍ ƯỚC TÍNH' : 'ESTIMATED TOTAL BUDGET' }}</span>
                <div class="price-number-row">
                  <span v-if="discountSavings > 0" class="original-price font-display"><del>{{ formatCurrency(rawOriginalPrice) }}</del></span>
                  <span class="main-price font-display">{{ formatCurrency(calculatedPrice) }}</span>
                </div>
                <div v-if="discountSavings > 0" class="savings-alert font-mono">
                  <i class="fa-solid fa-circle-check"></i>
                  <span>{{ isVi ? `Tiết kiệm được ${formatCurrency(discountSavings)} (Đã áp dụng combo)` : `Saved ${formatCurrency(discountSavings)} with combo discount` }}</span>
                </div>
              </div>

              <!-- TIMELINE & SPECS -->
              <div class="specs-pill-strip font-mono">
                <div class="spec-pill">
                  <i class="fa-solid fa-clock"></i>
                  <span>{{ isVi ? `Thời gian: ~${calculatedDays} ngày` : `Timeline: ~${calculatedDays} days` }}</span>
                </div>
                <div class="spec-pill">
                  <i class="fa-solid fa-sliders"></i>
                  <span>-14 LUFS Spotify</span>
                </div>
              </div>

              <!-- RECEIPT BREAKDOWN -->
              <div class="receipt-breakdown">
                <div class="breakdown-row">
                  <span class="row-label">{{ isVi ? currentService.nameVi : currentService.nameEn }}</span>
                  <span class="row-val font-mono">{{ formatCurrency(currentService.basePrice * songCount) }}</span>
                </div>
                <div v-if="discountSavings > 0" class="breakdown-row discount-row">
                  <span class="row-label">{{ isVi ? `Chiết khấu combo (${songCount} bài)` : `Volume Discount (${songCount} tracks)` }}</span>
                  <span class="row-val font-mono">-{{ formatCurrency(discountSavings) }}</span>
                </div>
                <div v-if="addStems" class="breakdown-row">
                  <span class="row-label">{{ isVi ? `Multi-track Stems (${songCount} bài)` : `Stem Delivery (${songCount} tracks)` }}</span>
                  <span class="row-val font-mono">+{{ formatCurrency(200000 * songCount) }}</span>
                </div>
                <div v-if="needRush" class="breakdown-row">
                  <span class="row-label">{{ isVi ? `Phụ phí làm gấp (${songCount} bài)` : `Rush Delivery (${songCount} tracks)` }}</span>
                  <span class="row-val font-mono">+{{ formatCurrency(300000 * songCount) }}</span>
                </div>
              </div>

              <!-- STUDIO COMMITMENT CHECKLIST -->
              <div class="receipt-perks-box">
                <span class="perks-title text-meta-mono">{{ isVi ? 'QUYỀN LỢI ĐI KÈM TRỌN GÓI:' : 'INCLUDED IN THIS PACKAGE:' }}</span>
                <ul class="perks-list">
                  <li><i class="fa-solid fa-check"></i> <span>{{ isVi ? 'Tặng kèm 02 lần chỉnh sửa (Revision) miễn phí' : '02 Free revisions until fully satisfied' }}</span></li>
                  <li><i class="fa-solid fa-check"></i> <span>{{ isVi ? 'Vocal Tuning Melodyne tự nhiên, giữ trọn cảm xúc' : 'Manual Melodyne vocal tuning preserving emotion' }}</span></li>
                  <li><i class="fa-solid fa-check"></i> <span>{{ isVi ? 'Cam kết bảo mật 100% bản quyền bài hát của bạn' : '100% Confidentiality & artist ownership' }}</span></li>
                  <li><i class="fa-solid fa-check"></i> <span>{{ isVi ? 'Bàn giao file Master WAV 24-bit + MP3 320kbps' : 'Export broadcast 24-bit WAV & 320kbps MP3' }}</span></li>
                </ul>
              </div>

              <!-- ACTION BUTTONS -->
              <div class="receipt-actions">
                <a
                  :href="quickZaloUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-action-zalo"
                  @click="trackEstimatorAction('Send Quick Zalo')"
                >
                  <i class="fa-solid fa-comment-dots"></i>
                  <span>{{ isVi ? 'GỬI DỰ TOÁN QUA ZALO STUDIO' : 'SEND QUOTE TO ZALO' }}</span>
                </a>

                <button
                  type="button"
                  class="btn-action-copy"
                  @click="copyQuickReceipt"
                >
                  <i class="fa-solid fa-copy"></i>
                  <span>{{ quickCopied ? (isVi ? 'ĐÃ SAO CHÉP BÁO GIÁ' : 'COPIED TO CLIPBOARD') : (isVi ? 'SAO CHÉP DỰ TOÁN' : 'COPY QUOTE') }}</span>
                </button>

                <button
                  type="button"
                  class="btn-switch-to-brief"
                  @click="setMode('brief')"
                >
                  <span>{{ isVi ? 'Hoặc chuyển sang Lập Brief Kèm File Demo' : 'Or switch to Detailed Brief with Demo' }}</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>

              <div class="direct-call-hint">
                <i class="fa-solid fa-phone"></i>
                <span>{{ isVi ? 'Cần tư vấn trực tiếp nhanh? Hotline / Zalo:' : 'Need instant phone consultation?' }} <strong>0355.356.294</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ======================================================= -->
      <!-- MODE 2: 3-STEP INTEGRATED PROJECT BRIEF WIZARD         -->
      <!-- ======================================================= -->
      <div v-else class="detailed-wizard-section">
        <!-- 3-STEP PROGRESS STRIP -->
        <div class="wizard-progress-strip">
          <div
            v-for="s in 3"
            :key="s"
            class="wizard-step-node"
            :class="{ 'is-active': briefStep === s, 'is-completed': briefStep > s }"
            @click="s < briefStep ? briefStep = s : null"
            role="button"
            :tabindex="s < briefStep ? 0 : -1"
            :aria-label="`Bước ${s}`"
          >
            <div class="step-num-circle font-mono">
              <i v-if="briefStep > s" class="fa-solid fa-check"></i>
              <span v-else>{{ s }}</span>
            </div>
            <div class="step-label-group">
              <span class="step-counter text-meta-mono font-mono">{{ isVi ? `BƯỚC 0${s}` : `STEP 0${s}` }}</span>
              <strong class="step-name">{{ isVi ? briefStepTitlesVi[s - 1] : briefStepTitlesEn[s - 1] }}</strong>
            </div>
          </div>
        </div>

        <!-- STEP CONTAINER -->
        <div class="wizard-content-box matte-card">
          <!-- STEP 1: SERVICE & SCOPE -->
          <div v-if="briefStep === 1" class="wizard-step-body">
            <div class="step-headline-wrap">
              <span class="badge-v2 amber">{{ isVi ? 'BƯỚC 1 / 3' : 'STEP 1 / 3' }}</span>
              <h2 class="step-title-main font-display">{{ isVi ? 'Gói Dịch Vụ & Quy Mô Bài Hát' : 'Production Scope & Services' }}</h2>
              <p class="step-desc-text">{{ isVi ? 'Chọn dịch vụ và quy mô dự án âm nhạc hoặc sự kiện của bạn.' : 'Select the services and project volume.' }}</p>
            </div>

            <!-- SERVICE SELECT -->
            <div class="wizard-section-divider">
              <span class="text-meta-mono">{{ isVi ? '1.1 DỊCH VỤ SẢN XUẤT' : '1.1 CORE SERVICE' }}</span>
            </div>
            <div class="services-cards-grid">
              <button
                v-for="svc in serviceCatalog"
                :key="svc.id"
                type="button"
                class="service-card-btn"
                :class="{ 'is-selected': selectedServiceId === svc.id }"
                @click="selectedServiceId = svc.id"
              >
                <div class="svc-card-header">
                  <div class="svc-icon-frame">
                    <i class="fa-solid" :class="svc.icon"></i>
                  </div>
                  <span v-if="svc.badge" class="svc-hot-badge">{{ svc.badge }}</span>
                </div>
                <strong class="svc-name-text">{{ isVi ? svc.nameVi : svc.nameEn }}</strong>
                <span class="svc-price-text">
                  {{ isVi ? 'từ' : 'from' }} <span class="price-highlight">{{ formatCurrency(svc.basePrice) }}</span>
                </span>
                <p class="svc-desc-snippet">{{ isVi ? svc.descVi : svc.descEn }}</p>
              </button>
            </div>

            <!-- SONG COUNT -->
            <div class="wizard-section-divider">
              <span class="text-meta-mono">{{ isVi ? '1.2 QUY MÔ SỐ LƯỢNG' : '1.2 NUMBER OF TRACKS' }}</span>
            </div>
            <div class="song-count-chips-row">
              <button
                v-for="countOpt in countOptions"
                :key="countOpt.value"
                type="button"
                class="count-chip-btn"
                :class="{ 'is-active': songCount === countOpt.value }"
                @click="songCount = countOpt.value"
              >
                <span class="chip-val font-mono">{{ countOpt.value }}</span>
                <span class="chip-label">{{ isVi ? countOpt.labelVi : countOpt.labelEn }}</span>
                <span v-if="countOpt.discount" class="chip-discount-tag">{{ countOpt.discount }}</span>
              </button>
            </div>

            <!-- LIVE PRICE ESTIMATE BANNER FOR STEP 1 -->
            <div class="step-live-estimate-banner">
              <div class="banner-left">
                <span class="text-meta-mono banner-tag">{{ isVi ? 'DỰ TOÁN TẠM TÍNH' : 'SUBTOTAL ESTIMATE' }}</span>
                <div class="banner-price-row font-display">
                  <span>{{ formatCurrency(calculatedPrice) }}</span>
                  <span class="banner-days font-mono">~{{ calculatedDays }} {{ isVi ? 'ngày' : 'days' }}</span>
                </div>
              </div>
              <div class="banner-right">
                <label class="inline-checkbox-label">
                  <input type="checkbox" v-model="addStems" />
                  <span>{{ isVi ? 'Nhận Stems (+200k/bài)' : 'Stems (+200k/track)' }}</span>
                </label>
                <label class="inline-checkbox-label">
                  <input type="checkbox" v-model="needRush" />
                  <span>{{ isVi ? 'Cần gấp 24h-48h (+300k/bài)' : 'Rush (+300k/track)' }}</span>
                </label>
              </div>
            </div>
          </div>

          <!-- STEP 2: FORMAT & ASSETS -->
          <div v-if="briefStep === 2" class="wizard-step-body">
            <div class="step-headline-wrap">
              <span class="badge-v2 amber">{{ isVi ? 'BƯỚC 2 / 3' : 'STEP 2 / 3' }}</span>
              <h2 class="step-title-main font-display">{{ isVi ? 'Định Dạng & Tài Nguyên Hiện Có' : 'Format & Existing Assets' }}</h2>
              <p class="step-desc-text">{{ isVi ? 'Giúp Producer hiểu rõ bạn đã chuẩn bị đến đâu để tư vấn lộ trình hiệu quả nhất.' : 'Help the Producer understand your current materials and direction.' }}</p>
            </div>

            <!-- FORMAT CHOICES -->
            <div class="wizard-section-divider">
              <span class="text-meta-mono">{{ isVi ? '2.1 ĐỊNH DẠNG TÁC PHẨM' : '2.1 PROJECT FORMAT' }}</span>
            </div>
            <div class="options-cards-grid">
              <div
                v-for="opt in formatCatalog"
                :key="opt.id"
                class="option-tile-card"
                :class="{ 'is-active': briefForm.format === opt.id }"
                @click="briefForm.format = opt.id"
              >
                <i :class="opt.icon"></i>
                <div class="tile-content">
                  <strong>{{ isVi ? opt.titleVi : opt.titleEn }}</strong>
                  <p>{{ isVi ? opt.descVi : opt.descEn }}</p>
                </div>
              </div>
            </div>

            <!-- ASSET CHOICES -->
            <div class="wizard-section-divider">
              <span class="text-meta-mono">{{ isVi ? '2.2 TÀI NGUYÊN BẠN ĐANG CÓ SẴN' : '2.2 CURRENT ASSETS ON HAND' }}</span>
            </div>
            <div class="options-cards-grid">
              <div
                v-for="opt in assetCatalog"
                :key="opt.id"
                class="option-tile-card"
                :class="{ 'is-active': briefForm.assetStatus === opt.id }"
                @click="briefForm.assetStatus = opt.id"
              >
                <i :class="opt.icon"></i>
                <div class="tile-content">
                  <strong>{{ isVi ? opt.titleVi : opt.titleEn }}</strong>
                  <p>{{ isVi ? opt.descVi : opt.descEn }}</p>
                </div>
              </div>
            </div>

            <!-- GENRE CHOICES -->
            <div class="wizard-section-divider">
              <span class="text-meta-mono">{{ isVi ? '2.3 THỂ LOẠI ÂM NHẠC MONG MUỐN' : '2.3 TARGET MUSICAL GENRE' }}</span>
            </div>
            <div class="genre-chips-wrap">
              <button
                v-for="genre in genreList"
                :key="genre"
                type="button"
                class="genre-chip"
                :class="{ 'is-selected': briefForm.genre === genre }"
                @click="briefForm.genre = genre"
              >
                {{ genre }}
              </button>
            </div>
          </div>

          <!-- STEP 3: CONTACT & BRIEF SUBMISSION -->
          <div v-if="briefStep === 3" class="wizard-step-body">
            <div class="step-headline-wrap">
              <span class="badge-v2 amber">{{ isVi ? 'BƯỚC 3 / 3' : 'STEP 3 / 3' }}</span>
              <h2 class="step-title-main font-display">{{ isVi ? 'Thông Tin & Gửi Hồ Sơ Dự Án' : 'Contact & Brief Submission' }}</h2>
              <p class="step-desc-text">{{ isVi ? 'Producer Kiệt sẽ trực tiếp đọc hồ sơ và liên hệ phản hồi cho bạn trong ngày.' : 'Producer Kiet will review your brief and contact you within the day.' }}</p>
            </div>

            <div class="brief-form-grid">
              <div class="form-field-group">
                <label for="f-name">{{ isVi ? 'Họ tên hoặc Nghệ danh' : 'Your Name / Artist Alias' }} <span class="req">*</span></label>
                <input
                  id="f-name"
                  v-model="briefForm.name"
                  type="text"
                  :placeholder="isVi ? 'Ví dụ: Tuấn Anh / Nghệ danh...' : 'e.g. Alex / Artist Name'"
                />
              </div>

              <div class="form-field-group">
                <label for="f-phone">{{ isVi ? 'Số điện thoại / Zalo' : 'Phone / Zalo Number' }} <span class="req">*</span></label>
                <input
                  id="f-phone"
                  v-model="briefForm.phone"
                  type="tel"
                  placeholder="09xx.xxx.xxx"
                />
              </div>

              <div class="form-field-group full-width">
                <label for="f-demo">{{ isVi ? 'Đường dẫn file demo / voice memo (Google Drive, Dropbox, YouTube unlisted...)' : 'Link to Demo / Voice Memo (Drive, Dropbox, YouTube...)' }}</label>
                <input
                  id="f-demo"
                  v-model="briefForm.demoUrl"
                  type="url"
                  placeholder="https://drive.google.com/..."
                />
              </div>

              <div class="form-field-group full-width">
                <label for="f-notes">{{ isVi ? 'Mô tả thêm về ý tưởng hoặc ca sĩ / bài hát tham chiếu bạn thích' : 'Reference tracks, creative ideas, or specific requests' }}</label>
                <textarea
                  id="f-notes"
                  v-model="briefForm.notes"
                  rows="3"
                  :placeholder="isVi ? 'Ví dụ: Bài hát phong cách Ballad acoustic nhẹ nhàng giống nhạc Vũ, tone nam trầm...' : 'e.g. Acoustic ballad, warm vocal tone, acoustic piano lead...'"
                ></textarea>
              </div>
            </div>

            <!-- COMPREHENSIVE BRIEF SUMMARY RECEIPT -->
            <div class="detailed-summary-box">
              <div class="summary-top-bar">
                <span class="text-meta-mono"><i class="fa-solid fa-file-invoice"></i> {{ isVi ? 'HỒ SƠ DỰ ÁN TỔNG HỢP' : 'PROJECT BRIEF SUMMARY' }}</span>
                <span class="summary-total-tag font-mono">{{ formatCurrency(calculatedPrice) }} · ~{{ calculatedDays }} {{ isVi ? 'ngày' : 'days' }}</span>
              </div>
              <div class="summary-details-grid">
                <div>
                  <span class="detail-label">{{ isVi ? 'Dịch vụ:' : 'Service:' }}</span>
                  <strong>{{ isVi ? currentService.nameVi : currentService.nameEn }} ({{ songCount }} {{ isVi ? 'bài' : 'tracks' }})</strong>
                </div>
                <div>
                  <span class="detail-label">{{ isVi ? 'Định dạng:' : 'Format:' }}</span>
                  <strong>{{ getFormatTitle(briefForm.format) }}</strong>
                </div>
                <div>
                  <span class="detail-label">{{ isVi ? 'Tài nguyên:' : 'Assets:' }}</span>
                  <strong>{{ getAssetTitle(briefForm.assetStatus) }}</strong>
                </div>
                <div>
                  <span class="detail-label">{{ isVi ? 'Thể loại:' : 'Genre:' }}</span>
                  <strong>{{ briefForm.genre }}</strong>
                </div>
                <div v-if="addStems || needRush" class="full-width-detail">
                  <span class="detail-label">{{ isVi ? 'Tùy chọn thêm:' : 'Add-ons:' }}</span>
                  <span class="detail-tag font-mono" v-if="addStems">{{ isVi ? '+Bàn giao Stems' : '+Stems' }}</span>
                  <span class="detail-tag font-mono" v-if="needRush">{{ isVi ? '+Ưu tiên làm gấp' : '+Rush' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- WIZARD STEP NAVIGATION BAR -->
          <div class="wizard-bottom-bar">
            <button
              v-if="briefStep > 1"
              type="button"
              class="btn-step-prev"
              @click="briefStep--"
            >
              <i class="fa-solid fa-arrow-left"></i>
              <span>{{ isVi ? 'Quay lại' : 'Back' }}</span>
            </button>
            <div v-else></div>

            <button
              v-if="briefStep < 3"
              type="button"
              class="btn-step-next"
              @click="briefStep++"
            >
              <span>{{ isVi ? 'Tiếp theo' : 'Next Step' }}</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>

            <div v-else class="step-final-actions">
              <button
                type="button"
                class="btn-brief-copy"
                @click="copyDetailedBrief"
              >
                <i class="fa-solid fa-copy"></i>
                <span>{{ briefCopied ? (isVi ? 'ĐÃ SAO CHÉP BRIEF' : 'COPIED') : (isVi ? 'SAO CHÉP BRIEF' : 'COPY BRIEF') }}</span>
              </button>

              <a
                :href="detailedZaloUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-brief-zalo"
                @click="trackEstimatorAction('Send Brief Zalo')"
              >
                <i class="fa-solid fa-comment-dots"></i>
                <span>{{ isVi ? 'GỬI BRIEF QUA ZALO PRODUCER' : 'SEND BRIEF TO ZALO' }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- BOTTOM TRUST PILLARS -->
      <section class="trust-pillars-strip">
        <div class="pillar-card">
          <div class="pillar-icon"><i class="fa-solid fa-shield-halved"></i></div>
          <div class="pillar-info">
            <strong>{{ isVi ? 'Bảo Mật 100% Bản Quyền' : '100% Artist Ownership' }}</strong>
            <p>{{ isVi ? 'Mọi giai điệu, voice memo hay bản demo bạn gửi đều thuộc toàn quyền sở hữu của bạn.' : 'Full commercial rights and privacy for all your demo recordings.' }}</p>
          </div>
        </div>

        <div class="pillar-card">
          <div class="pillar-icon"><i class="fa-solid fa-heart-pulse"></i></div>
          <div class="pillar-info">
            <strong>{{ isVi ? 'Tận Tâm & Không Phán Xét' : 'Patient Vocal Coaching' }}</strong>
            <p>{{ isVi ? 'Đồng hành kiên nhẫn từng câu, hướng dẫn lấy hơi và giữ cảm xúc chân thật nhất.' : 'Patient phrase-by-phrase guidance to bring out your natural vocal beauty.' }}</p>
          </div>
        </div>

        <div class="pillar-card">
          <div class="pillar-icon"><i class="fa-solid fa-handshake"></i></div>
          <div class="pillar-info">
            <strong>{{ isVi ? 'Minh Bạch & Đúng Hạn' : 'Transparent & On-Time' }}</strong>
            <p>{{ isVi ? 'Báo giá rõ ràng, không phát sinh chi phí ẩn, cam kết tiến độ bàn giao chuẩn chỉ.' : 'No hidden fees, transparent timeline, and professional master files.' }}</p>
          </div>
        </div>
      </section>

      <!-- ======================================================= -->
      <!-- STICKY MOBILE ACTION BAR (VISIBLE ON SCREENS <= 1024px) -->
      <!-- ======================================================= -->
      <aside v-if="activeMode === 'quick'" class="mobile-sticky-action-bar" aria-label="Mobile Price Summary">
        <div class="mobile-bar-inner">
          <div class="mobile-bar-price-col">
            <span class="mobile-scope-sub font-mono">
              {{ isVi ? currentService.nameVi : currentService.nameEn }} · {{ songCount }} {{ isVi ? 'bài' : 'track' }}
            </span>
            <div class="mobile-price-row font-display">
              <span v-if="discountSavings > 0" class="mobile-old-price"><del>{{ formatCurrency(rawOriginalPrice) }}</del></span>
              <span class="mobile-price-val">{{ formatCurrency(calculatedPrice) }}</span>
              <span v-if="discountSavings > 0" class="mobile-saved-pill font-mono">
                -{{ formatCurrency(discountSavings) }}
              </span>
            </div>
          </div>

          <div class="mobile-bar-actions">
            <a
              :href="quickZaloUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="mobile-btn-zalo"
              @click="trackEstimatorAction('Mobile Sticky Send Zalo')"
            >
              <i class="fa-solid fa-comment-dots"></i>
              <span>{{ isVi ? 'GỬI ZALO' : 'ZALO' }}</span>
            </a>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '~/composables/useLocale'
import { useAnalytics } from '~/composables/useAnalytics'

const { isVi } = useLocale()
const { trackCta } = useAnalytics()
const route = useRoute()

// MODE: 'quick' (10-second estimator) | 'brief' (3-step detailed wizard)
const activeMode = ref<'quick' | 'brief'>('quick')
const setMode = (mode: 'quick' | 'brief') => {
  activeMode.value = mode
  trackCta(`Project Builder Mode: ${mode}`)
}

// =========================================================================
// SERVICE CATALOG & PRICING ENGINE
// =========================================================================
interface ServiceItem {
  id: string
  nameVi: string
  nameEn: string
  basePrice: number
  unitVi: string
  unitEn: string
  timeDays: number
  icon: string
  badge?: string
  descVi: string
  descEn: string
}

const serviceCatalog: ServiceItem[] = [
  {
    id: 'hoa-am',
    nameVi: 'Hoà Âm Phối Khí Độc Quyền',
    nameEn: 'Custom Arrangement & Beat',
    basePrice: 2000000,
    unitVi: 'bản phối mới',
    unitEn: 'custom beat',
    timeDays: 7,
    icon: 'fa-music',
    badge: 'HOT',
    descVi: 'Phối khí độc bản theo quãng giọng riêng (Ballad, Pop, R&B, Hip-hop, Acoustic), tặng kèm Beat Karaoke.',
    descEn: 'Exclusive custom arrangement tailored to your vocal range, includes high-res karaoke beat.'
  },
  {
    id: 'combo-artist',
    nameVi: 'Combo Sản Xuất Trọn Gói A-Z',
    nameEn: 'Full Production Combo A-Z',
    basePrice: 2800000,
    unitVi: 'trọn gói A-Z',
    unitEn: 'full package',
    timeDays: 5,
    icon: 'fa-compact-disc',
    badge: 'TIẾT KIỆM 30%',
    descVi: 'Phối khí độc quyền + Thu âm thoải mái + Mix & Master hoàn thiện ra file Master chuẩn phát hành số.',
    descEn: 'Custom beat + studio recording session + Spotify-standard mix & master. Best value.'
  },
  {
    id: 'sound-light',
    nameVi: 'Sound & Light / Âm Thanh Ánh Sáng Sự Kiện',
    nameEn: 'Event Sound & Light Reinforcement',
    basePrice: 3000000,
    unitVi: 'sự kiện / show',
    unitEn: 'event / show',
    timeDays: 1,
    icon: 'fa-sliders',
    badge: 'TRỌN GÓI',
    descVi: 'Mixer Midas M32R chống hú, hệ thống loa công suất lớn và ánh sáng sân khấu chuyên nghiệp cho tiệc cưới, sự kiện.',
    descEn: 'Midas M32R digital console, premium stage audio reinforcement, and synchronized event lighting.'
  },
  {
    id: 'mix-master',
    nameVi: 'Mix & Master Chuẩn Spotify',
    nameEn: 'Mixing & Mastering -14 LUFS',
    basePrice: 350000,
    unitVi: 'bài hoàn chỉnh',
    unitEn: 'track',
    timeDays: 3,
    icon: 'fa-sliders',
    descVi: 'Vocal tuning Melodyne thủ công, cân bằng dải tần, nén động lực và mastering âm lượng chuẩn -14 LUFS.',
    descEn: 'Manual pitch correction, dynamic processing, spatial reverb, and streaming-ready master.'
  },
  {
    id: 'thu-am',
    nameVi: 'Thu Âm Bài Hát Chuyên Nghiệp',
    nameEn: 'Studio Vocal Recording',
    basePrice: 499000,
    unitVi: 'buổi (2-3h)',
    unitEn: 'session (2-3h)',
    timeDays: 1,
    icon: 'fa-microphone',
    descVi: 'Không gian thu âm tiêu chuẩn, micro condenser cao cấp, kỹ thuật viên hướng dẫn lấy hơi và cảm xúc từng câu.',
    descEn: 'Acoustically treated booth, premium condenser mic, and patient vocal guidance.'
  },
  {
    id: 'quay-mv',
    nameVi: 'Quay MV Studio 4K / Live Session',
    nameEn: '4K Studio Music Video',
    basePrice: 1500000,
    unitVi: 'video hoàn thiện',
    unitEn: 'completed video',
    timeDays: 4,
    icon: 'fa-film',
    descVi: 'Ghi hình 4K góc máy điện ảnh, setup ánh sáng moody, chỉnh màu đẹp cho YouTube/TikTok.',
    descEn: 'Cinematic 4K studio session video with moody lighting, color grading for TikTok & YouTube.'
  }
]

// CORE ESTIMATOR REACTIVE STATE
const selectedServiceId = ref<string>('hoa-am')
const songCount = ref<number>(1)
const addStems = ref<boolean>(false)
const needRush = ref<boolean>(false)

onMounted(() => {
  const q = route.query.service as string | undefined
  if (q && serviceCatalog.some(s => s.id === q)) {
    selectedServiceId.value = q
  }
})

const countOptions = [
  { value: 1, labelVi: '1 Bài (Single)', labelEn: '1 Track (Single)' },
  { value: 2, labelVi: '2 Bài Hát', labelEn: '2 Tracks', discount: 'Giảm 8%' },
  { value: 3, labelVi: '3 Bài (EP Mini)', labelEn: '3 Tracks (EP)', discount: 'Giảm 15%' },
  { value: 5, labelVi: '5+ Bài (Album)', labelEn: '5+ Tracks (Album)', discount: 'Giảm 15%' }
]

const defaultService: ServiceItem = serviceCatalog[0] as ServiceItem

const currentService = computed<ServiceItem>(() => {
  return serviceCatalog.find(s => s.id === selectedServiceId.value) || defaultService
})

// CALCULATION LOGIC
const calculatedPrice = computed(() => {
  const base = currentService.value.basePrice * songCount.value
  let discounted = base

  if (songCount.value >= 3) {
    discounted = base * 0.85 // 15% off
  } else if (songCount.value === 2) {
    discounted = base * 0.92 // 8% off
  }

  let extras = 0
  if (addStems.value) extras += 200000 * songCount.value
  if (needRush.value) extras += 300000 * songCount.value

  return Math.round(discounted + extras)
})

const discountSavings = computed(() => {
  const base = currentService.value.basePrice * songCount.value
  let discounted = base

  if (songCount.value >= 3) {
    discounted = base * 0.85
  } else if (songCount.value === 2) {
    discounted = base * 0.92
  }

  return Math.round(base - discounted)
})

const rawOriginalPrice = computed(() => {
  const base = currentService.value.basePrice * songCount.value
  let extras = 0
  if (addStems.value) extras += 200000 * songCount.value
  if (needRush.value) extras += 300000 * songCount.value
  return base + extras
})

const calculatedDays = computed(() => {
  let days = currentService.value.timeDays * Math.ceil(songCount.value * 0.7)
  if (needRush.value) {
    days = Math.max(1, Math.round(days * 0.5))
  }
  return Math.max(1, days)
})

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('vi-VN').format(amount) + '₫'
}

// QUICK SCENARIO PRESETS
interface QuickPreset {
  id: string
  icon: string
  titleVi: string
  titleEn: string
  descVi: string
  descEn: string
  tag?: string
  serviceId: string
  count: number
  stems: boolean
  rush: boolean
}

const quickPresets: QuickPreset[] = [
  {
    id: 'cover',
    icon: 'fa-microphone-lines',
    titleVi: 'Vocalist / Cover & TikTok',
    titleEn: 'Vocalist / Cover & TikTok',
    descVi: 'Mix & Master chuẩn Spotify -14 LUFS',
    descEn: 'Spotify-ready vocal mix & master',
    tag: 'Phổ biến nhất',
    serviceId: 'mix-master',
    count: 1,
    stems: false,
    rush: false
  },
  {
    id: 'composer',
    icon: 'fa-music',
    titleVi: 'Nhạc Sĩ / Sáng Tác Mới',
    titleEn: 'Songwriter / Custom Beat',
    descVi: 'Hoà âm độc quyền + Bàn giao Stems 24-bit',
    descEn: 'Exclusive custom beat & 24-bit stems',
    tag: 'Độc quyền',
    serviceId: 'hoa-am',
    count: 1,
    stems: true,
    rush: false
  },
  {
    id: 'full-artist',
    icon: 'fa-compact-disc',
    titleVi: 'Artist Chuyên Nghiệp A-Z',
    titleEn: 'Pro Artist Single / EP',
    descVi: 'Phối khí + Thu âm + Mix Master trọn gói',
    descEn: 'Beat + studio recording + mix master',
    tag: 'Tiết kiệm 30%',
    serviceId: 'combo-artist',
    count: 1,
    stems: true,
    rush: false
  }
]

const applyPreset = (preset: QuickPreset) => {
  selectedServiceId.value = preset.serviceId
  songCount.value = preset.count
  addStems.value = preset.stems
  needRush.value = preset.rush
  trackCta(`Applied Preset: ${preset.id}`)
}

const isPresetActive = (preset: QuickPreset) => {
  return (
    selectedServiceId.value === preset.serviceId &&
    songCount.value === preset.count &&
    addStems.value === preset.stems &&
    needRush.value === preset.rush
  )
}

// =========================================================================
// BRIEF WIZARD CATALOGS & REACTIVE FORM
// =========================================================================
const briefStep = ref<number>(1)
const briefStepTitlesVi = ['Dịch Vụ & Ngân Sách', 'Thể Loại & Tài Nguyên', 'Thông Tin & Gửi Brief']
const briefStepTitlesEn = ['Services & Budget', 'Format & Assets', 'Contact & Submission']

const briefForm = reactive({
  format: 'single',
  assetStatus: 'voice-memo',
  genre: 'Pop / Ballad',
  name: '',
  phone: '',
  demoUrl: '',
  notes: ''
})

const formatCatalog = [
  { id: 'single', titleVi: 'Single Ca Khúc', titleEn: 'Single Song', descVi: '1 bài hát hoàn chỉnh chuẩn bị phát hành MV hoặc streaming.', descEn: 'A complete single ready for digital streaming or MV.', icon: 'fa-solid fa-music' },
  { id: 'ep-album', titleVi: 'EP / Album Đĩa Nhạc', titleEn: 'EP / Album', descVi: 'Tuyển tập 3 đến 8 ca khúc với concept âm nhạc đồng nhất.', descEn: '3 to 8 tracks with cohesive production identity.', icon: 'fa-solid fa-compact-disc' },
  { id: 'cover', titleVi: 'Acoustic Cover / Remake', titleEn: 'Cover / Remake', descVi: 'Làm mới ca khúc quen thuộc theo phong cách riêng của bạn.', descEn: 'Reimagining existing songs with your own vocal style.', icon: 'fa-solid fa-guitar' },
  { id: 'commercial', titleVi: 'TVC & Brand Song', titleEn: 'Commercial Audio', descVi: 'Âm thanh quảng cáo, bài hát truyền thống doanh nghiệp.', descEn: 'Brand anthems and commercial voiceovers.', icon: 'fa-solid fa-bullhorn' }
]

const assetCatalog = [
  { id: 'idea', titleVi: 'Mới là Ý Niệm trong đầu', titleEn: 'Concept in Mind', descVi: 'Chưa có bản thu nào, cần tư vấn định hướng từ vạch xuất phát.', descEn: 'No audio yet, needing consultation from scratch.', icon: 'fa-solid fa-lightbulb' },
  { id: 'voice-memo', titleVi: 'Đã có Voice Memo điện thoại', titleEn: 'Phone Voice Memo', descVi: 'Có đoạn thu âm giai điệu hoặc đệm đàn sơ khảo qua điện thoại.', descEn: 'Rough vocal or acoustic guitar recording on phone.', icon: 'fa-solid fa-microphone' },
  { id: 'beat-ready', titleVi: 'Đã có Beat sẵn, cần Thu & Mix', titleEn: 'Beat Ready', descVi: 'Đã có beat hoàn chỉnh, cần đến studio thu vocal và mix master.', descEn: 'Finished instrumental track, needing vocal tracking & mix.', icon: 'fa-solid fa-headphones' },
  { id: 'stems-ready', titleVi: 'Đã thu xong Stems, cần Mix Master', titleEn: 'Stems Recorded', descVi: 'Đã có file vocal và nhạc cụ rời từ nơi khác cần mix chuẩn.', descEn: 'Multi-track stems recorded elsewhere needing master polish.', icon: 'fa-solid fa-file-audio' }
]

const genreList = [
  'Pop / Ballad',
  'Acoustic / Indie',
  'R&B / Soul',
  'Hip-hop / Rap',
  'EDM / Electronic',
  'Bolero / Trữ Tình',
  'Nhạc Doanh Nghiệp / TVC'
]

function getFormatTitle(id: string) {
  const item = formatCatalog.find(f => f.id === id)
  if (!item) return id
  return isVi.value ? item.titleVi : item.titleEn
}

function getAssetTitle(id: string) {
  const item = assetCatalog.find(a => a.id === id)
  if (!item) return id
  return isVi.value ? item.titleVi : item.titleEn
}

// =========================================================================
// ZALO & CLIPBOARD MESSAGING ENGINE
// =========================================================================
const quickBriefText = computed(() => {
  return `=== DỰ TOÁN CHI PHÍ XKPRODUCTION ===
- Dịch vụ: ${isVi.value ? currentService.value.nameVi : currentService.value.nameEn}
- Số lượng: ${songCount.value} bài hát
${addStems.value ? '- Kèm: Bàn giao Stems rời 24-bit\n' : ''}${needRush.value ? '- Kèm: Ưu tiên bàn giao siêu tốc 24h-48h\n' : ''}- Tổng ước tính: ${formatCurrency(calculatedPrice.value)}${discountSavings.value > 0 ? ` (Tiết kiệm: ${formatCurrency(discountSavings.value)})` : ''}
- Thời gian dự kiến: ~${calculatedDays.value} ngày
- Chuẩn âm lượng: -14 LUFS Spotify
====================================
Xin chào Producer Kiệt, mình muốn tư vấn đặt lịch theo gói dự toán này!`
})

const quickZaloUrl = computed(() => {
  return `https://zalo.me/0355356294?text=${encodeURIComponent(quickBriefText.value)}`
})

const quickCopied = ref(false)
async function copyQuickReceipt() {
  if (import.meta.client) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(quickBriefText.value)
      } else {
        const ta = document.createElement('textarea')
        ta.value = quickBriefText.value
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      quickCopied.value = true
      setTimeout(() => { quickCopied.value = false }, 2500)
      trackCta('Copy Quick Receipt')
    } catch (err) {
      console.warn('[Estimator] Clipboard copy failed:', err)
    }
  }
}

const detailedBriefText = computed(() => {
  return `=== HỒ SƠ DỰ ÁN ÂM NHẠC — XKPRODUCTION ===
1. THÔNG TIN KHÁCH HÀNG:
- Người gửi: ${briefForm.name || 'Nghệ sĩ'}
- SĐT / Zalo: ${briefForm.phone || 'Chưa cung cấp'}
- Link demo / tài liệu: ${briefForm.demoUrl || 'Chưa đính kèm'}
- Ghi chú: ${briefForm.notes || 'Không có ghi chú thêm'}

2. QUY MÔ & CHI PHÍ DỰ TOÁN:
- Dịch vụ: ${isVi.value ? currentService.value.nameVi : currentService.value.nameEn} (${songCount.value} bài)
- Định dạng: ${getFormatTitle(briefForm.format)}
- Tài nguyên: ${getAssetTitle(briefForm.assetStatus)}
- Thể loại: ${briefForm.genre}
${addStems.value ? '- Tùy chọn: Nhận Multi-track Stems\n' : ''}${needRush.value ? '- Tùy chọn: Ưu tiên làm gấp 24h-48h\n' : ''}- Tổng dự toán: ${formatCurrency(calculatedPrice.value)}
- Tiến độ: ~${calculatedDays.value} ngày
====================================`
})

const detailedZaloUrl = computed(() => {
  return `https://zalo.me/0355356294?text=${encodeURIComponent(detailedBriefText.value)}`
})

const briefCopied = ref(false)
async function copyDetailedBrief() {
  if (import.meta.client) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(detailedBriefText.value)
      } else {
        const ta = document.createElement('textarea')
        ta.value = detailedBriefText.value
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      briefCopied.value = true
      setTimeout(() => { briefCopied.value = false }, 2500)
      trackCta('Copy Detailed Brief')
    } catch (err) {
      console.warn('[Estimator] Clipboard copy failed:', err)
    }
  }
}

function trackEstimatorAction(action: string) {
  trackCta(action)
}

// SEO & META TAGS
useSeoMeta({
  title: 'Dự Toán Chi Phí Dự Án & Báo Giá Thu Âm Tức Thì | XKProduction',
  description: 'Công cụ dự toán chi phí âm nhạc tức thì trong 10 giây và lập hồ sơ sản xuất tại XKProduction. Báo giá minh bạch cho Thu âm, Hoà âm phối khí, Mix & Master, Quay MV Studio.',
  ogTitle: 'Dự Toán Chi Phí Dự Án & Báo Giá Thu Âm | XKProduction',
  ogDescription: 'Công cụ dự toán chi phí âm nhạc tức thì trong 10 giây và lập hồ sơ sản xuất tại XKProduction. Chuẩn phát hành số -14 LUFS.',
  ogImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
  ogUrl: 'https://xkproduction.com/build-project',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://xkproduction.com/images/Xkpreviewnew.png',
})

useSchemaOrg([
  defineWebPage({
    name: 'Dự Toán Chi Phí Dự Án & Báo Giá Thu Âm - XKProduction',
    description: 'Công cụ tính toán chi phí thu âm, hoà âm phối khí, mix & master trực tuyến tại XKProduction.'
  })
])
</script>

<style scoped>
.build-project-page {
  padding-top: clamp(6.5rem, 12vw, 9.5rem);
  padding-bottom: 6rem;
  background-color: var(--bg-canvas);
  color: var(--text-primary);
  min-height: 100vh;
}

/* HEADER */
.page-header {
  margin-bottom: 3rem;
}

.header-badge-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 0.75rem;
}

.live-pulse-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fbbf24;
  box-shadow: 0 0 10px #fbbf24;
  margin-right: 6px;
}

.wizard-title {
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 900;
  letter-spacing: -0.005em;
  line-height: 1.22;
  margin-bottom: 0.85rem;
  text-wrap: balance;
}

.wizard-subtitle {
  font-size: clamp(0.95rem, 1.8vw, 1.125rem);
  color: var(--text-secondary);
  max-width: 680px;
  margin: 0 auto 2.5rem;
  line-height: 1.68;
  text-wrap: pretty;
}

/* MODE SWITCHER TABS */
.mode-tabs-wrap {
  display: inline-flex;
  background: rgba(15, 29, 50, 0.85);
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  padding: 4px;
  gap: 4px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.mode-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.6rem;
  border-radius: 999px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-tab-btn:hover {
  color: var(--text-primary);
}

.mode-tab-btn.is-active {
  background: var(--gradient-amber);
  color: #050b14;
  box-shadow: 0 4px 16px rgba(217, 119, 6, 0.35);
}

.tab-badge-hint {
  font-size: 0.65rem;
  padding: 2px 6px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  letter-spacing: 0.5px;
}

.mode-tab-btn.is-active .tab-badge-hint {
  background: rgba(0, 0, 0, 0.2);
  color: #050b14;
}

/* ======================================================= */
/* QUICK ESTIMATOR LAYOUT                                  */
/* ======================================================= */
.quick-estimator-section {
  padding: clamp(1.5rem, 4vw, 3rem);
  border-radius: 16px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-surface-1);
}

.estimator-grid-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 2.5rem;
  align-items: start;
}

.config-group {
  margin-bottom: 2.25rem;
}

.group-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

/* QUICK PRESET BANNER */
.quick-preset-banner {
  margin-bottom: 2rem;
  padding: 1.25rem;
  background: rgba(15, 29, 50, 0.45);
  border: 1px dashed rgba(251, 191, 36, 0.28);
  border-radius: 14px;
}

.quick-preset-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

.preset-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #fbbf24;
  text-transform: uppercase;
}

.preset-hint {
  font-size: 0.75rem;
  color: var(--text-subtle);
}

.preset-chips-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.preset-card-btn {
  text-align: left;
  padding: 0.85rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: all 0.2s ease;
}

.preset-card-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.preset-card-btn.is-active {
  background: rgba(217, 119, 6, 0.12);
  border-color: #fbbf24;
  box-shadow: 0 0 16px rgba(251, 191, 36, 0.2);
}

.preset-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.2rem;
}

.preset-icon-frame {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgba(251, 191, 36, 0.12);
  color: #fbbf24;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8125rem;
}

.preset-card-btn.is-active .preset-icon-frame {
  background: #fbbf24;
  color: #0b1329;
}

.preset-tag {
  font-size: 0.625rem;
  font-weight: 800;
  color: #2dd4bf;
  background: rgba(13, 148, 136, 0.15);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.preset-name {
  font-size: 0.8125rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.3;
}

.preset-desc {
  font-size: 0.6875rem;
  color: var(--text-subtle);
  line-height: 1.35;
}

.group-header-spread {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.group-num {
  font-size: 1.25rem;
  font-weight: 900;
  color: #fbbf24;
  opacity: 0.7;
}

.group-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.2rem;
}

.group-desc {
  font-size: 0.8125rem;
  color: var(--text-subtle);
}

.discount-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 800;
  color: #2dd4bf;
  background: rgba(13, 148, 136, 0.15);
  border: 1px solid rgba(13, 148, 136, 0.35);
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
}

/* SERVICES GRID */
.services-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.service-card-btn {
  text-align: left;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  transition: all 0.2s ease;
  position: relative;
}

.service-card-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--border-hover);
  transform: translateY(-2px);
}

.service-card-btn.is-selected {
  background: rgba(217, 119, 6, 0.08);
  border-color: #d97706;
  box-shadow: 0 0 20px rgba(217, 119, 6, 0.18);
}

.svc-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.35rem;
}

.svc-icon-frame {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: rgba(251, 191, 36, 0.1);
  color: #fbbf24;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.is-selected .svc-icon-frame {
  background: #d97706;
  color: #ffffff;
}

.svc-hot-badge {
  font-size: 0.625rem;
  font-weight: 900;
  letter-spacing: 0.5px;
  padding: 2px 7px;
  background: rgba(217, 119, 6, 0.2);
  border: 1px solid rgba(217, 119, 6, 0.4);
  color: #fbbf24;
  border-radius: 999px;
}

.svc-name-text {
  font-size: 0.9375rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.3;
}

.svc-price-text {
  font-size: 0.8125rem;
  color: var(--text-subtle);
}

.price-highlight {
  font-weight: 800;
  color: #fbbf24;
}

.svc-unit-text {
  font-size: 0.75rem;
}

.svc-desc-snippet {
  font-size: 0.775rem;
  color: var(--text-secondary);
  line-height: 1.45;
  margin-top: 0.25rem;
}

/* SONG COUNT CHIPS */
.song-count-chips-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.count-chip-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 0.5rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 0.25rem;
  text-align: center;
}

.count-chip-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--border-hover);
}

.count-chip-btn.is-active {
  background: rgba(217, 119, 6, 0.12);
  border-color: #d97706;
}

.chip-val {
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--text-primary);
}

.count-chip-btn.is-active .chip-val {
  color: #fbbf24;
}

.chip-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.chip-discount-tag {
  font-size: 0.65rem;
  font-weight: 800;
  color: #2dd4bf;
  background: rgba(13, 148, 136, 0.15);
  padding: 1px 6px;
  border-radius: 4px;
}

/* ADD-ONS LIST */
.addons-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.addon-item-label {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.addon-item-label:hover {
  background: rgba(255, 255, 255, 0.04);
}

.addon-item-label.is-checked {
  background: rgba(13, 148, 136, 0.08);
  border-color: #0d9488;
}

.addon-real-checkbox {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.addon-custom-box {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid var(--border-subtle);
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2dd4bf;
  font-size: 0.75rem;
  margin-top: 2px;
  flex-shrink: 0;
}

.is-checked .addon-custom-box {
  background: #0d9488;
  border-color: #0d9488;
  color: #ffffff;
}

.addon-info-text {
  width: 100%;
}

.addon-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.addon-title-row strong {
  font-size: 0.875rem;
  color: var(--text-primary);
}

.addon-fee {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #fbbf24;
}

.addon-info-text p {
  font-size: 0.775rem;
  color: var(--text-subtle);
  line-height: 1.45;
}

/* ======================================================= */
/* LIVE RECEIPT CARD (RIGHT COL)                           */
/* ======================================================= */
.live-receipt-card {
  position: sticky;
  top: 6rem;
  background: linear-gradient(180deg, rgba(15, 29, 50, 0.95) 0%, rgba(10, 20, 36, 0.98) 100%);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 16px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
}

.receipt-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 0.85rem;
}

.receipt-kicker {
  font-size: 0.6875rem;
  color: #fbbf24;
}

.status-live-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.6875rem;
  font-weight: 700;
  color: #2dd4bf;
}

.dot-blink {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2dd4bf;
  box-shadow: 0 0 8px #2dd4bf;
}

.price-display-block {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.price-sub-label {
  font-size: 0.6875rem;
  color: var(--text-subtle);
}

.price-number-row {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.original-price {
  font-size: 1.15rem;
  color: var(--text-subtle);
  text-decoration: line-through;
  opacity: 0.65;
}

.main-price {
  font-size: clamp(2rem, 3vw, 2.75rem);
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 1.1;
  background: linear-gradient(135deg, #ffffff 40%, #fbbf24 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.savings-alert {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.775rem;
  color: #2dd4bf;
  margin-top: 0.35rem;
}

.specs-pill-strip {
  display: flex;
  gap: 0.5rem;
}

.spec-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.75rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.spec-pill i {
  color: #fbbf24;
}

.receipt-breakdown {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.85rem 0;
  border-top: 1px dashed var(--border-subtle);
  border-bottom: 1px dashed var(--border-subtle);
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.breakdown-row.discount-row {
  color: #2dd4bf;
}

.receipt-perks-box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.perks-title {
  font-size: 0.6875rem;
  color: var(--text-subtle);
}

.perks-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.perks-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.775rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.perks-list li i {
  color: #2dd4bf;
  margin-top: 2px;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.receipt-actions {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 0.5rem;
}

.btn-action-zalo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.95rem 1.25rem;
  background: #0d9488;
  color: #ffffff;
  font-weight: 800;
  font-size: 0.875rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(13, 148, 136, 0.35);
}

.btn-action-zalo:hover {
  background: #0f766e;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(13, 148, 136, 0.45);
}

.btn-action-copy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-size: 0.8125rem;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-action-copy:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--border-hover);
}

.btn-switch-to-brief {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background: transparent;
  border: none;
  color: #fbbf24;
  font-size: 0.775rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.15s ease;
}

.btn-switch-to-brief:hover {
  color: #fde68a;
  text-decoration: underline;
}

.direct-call-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: var(--text-subtle);
  text-align: center;
}

.direct-call-hint strong {
  color: var(--text-primary);
}

/* ======================================================= */
/* DETAILED 3-STEP WIZARD STYLES                           */
/* ======================================================= */
.wizard-progress-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.wizard-step-node {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.15rem 1.5rem;
  background: var(--bg-surface-1);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  opacity: 0.5;
  transition: all 0.2s ease;
  cursor: pointer;
}

.wizard-step-node.is-active,
.wizard-step-node.is-completed {
  opacity: 1;
}

.wizard-step-node.is-active {
  border-color: #d97706;
  background: rgba(217, 119, 6, 0.08);
}

.step-num-circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 800;
  color: var(--text-primary);
}

.is-active .step-num-circle {
  background: #d97706;
  border-color: #d97706;
  color: #ffffff;
}

.is-completed .step-num-circle {
  background: #0d9488;
  border-color: #0d9488;
  color: #ffffff;
}

.step-label-group {
  display: flex;
  flex-direction: column;
}

.step-counter {
  font-size: 0.6875rem;
  color: #fbbf24;
}

.step-name {
  font-size: 0.9375rem;
  font-weight: 800;
  color: var(--text-primary);
}

.wizard-content-box {
  padding: clamp(1.75rem, 5vw, 3.5rem);
  border-radius: 16px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-surface-1);
  margin-bottom: 3.5rem;
}

.step-headline-wrap {
  margin-bottom: 2.25rem;
}

.step-title-main {
  font-size: clamp(1.6rem, 3.5vw, 2.25rem);
  font-weight: 900;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.step-desc-text {
  font-size: 0.9375rem;
  color: var(--text-secondary);
}

.wizard-section-divider {
  margin: 2rem 0 1rem;
  font-size: 0.75rem;
  color: #fbbf24;
}

/* STEP 1 BANNER */
.step-live-estimate-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 1.25rem 1.5rem;
  background: rgba(15, 29, 50, 0.9);
  border: 1px solid rgba(251, 191, 36, 0.25);
  border-radius: 12px;
}

.banner-tag {
  font-size: 0.6875rem;
  color: #fbbf24;
  display: block;
  margin-bottom: 0.2rem;
}

.banner-price-row {
  display: flex;
  align-items: baseline;
  gap: 0.85rem;
  font-size: 1.75rem;
  font-weight: 900;
  color: #ffffff;
}

.banner-days {
  font-size: 0.875rem;
  color: #2dd4bf;
}

.banner-right {
  display: flex;
  gap: 1.25rem;
}

.inline-checkbox-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: var(--text-secondary);
  cursor: pointer;
}

/* STEP 2 OPTIONS TILES */
.options-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.option-tile-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.option-tile-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: var(--border-hover);
}

.option-tile-card.is-active {
  background: rgba(217, 119, 6, 0.1);
  border-color: #d97706;
}

.option-tile-card i {
  font-size: 1.35rem;
  color: #fbbf24;
  margin-top: 2px;
  flex-shrink: 0;
}

.tile-content strong {
  display: block;
  font-size: 0.9375rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.tile-content p {
  font-size: 0.775rem;
  color: var(--text-secondary);
  line-height: 1.45;
}

.genre-chips-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.genre-chip {
  padding: 0.55rem 1.15rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.genre-chip:hover {
  border-color: var(--border-hover);
  color: var(--text-primary);
}

.genre-chip.is-selected {
  background: #d97706;
  border-color: #d97706;
  color: #ffffff;
}

/* STEP 3 FORM & SUMMARY */
.brief-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.form-field-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.form-field-group.full-width {
  grid-column: 1 / -1;
}

.form-field-group label {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--text-secondary);
}

.form-field-group .req {
  color: #f87171;
}

.form-field-group input,
.form-field-group textarea {
  padding: 0.85rem 1.15rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.9375rem;
  transition: border-color 0.15s ease;
}

.form-field-group input:focus,
.form-field-group textarea:focus {
  outline: none;
  border-color: #d97706;
}

.detailed-summary-box {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 1.5rem;
}

.summary-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 0.65rem;
}

.summary-top-bar span {
  font-size: 0.75rem;
  color: #fbbf24;
}

.summary-total-tag {
  font-weight: 800;
  color: #2dd4bf !important;
}

.summary-details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
}

.summary-details-grid div {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.full-width-detail {
  grid-column: 1 / -1;
  flex-direction: row !important;
  align-items: center;
  gap: 0.5rem !important;
}

.detail-label {
  font-size: 0.725rem;
  color: var(--text-subtle);
}

.summary-details-grid strong {
  font-size: 0.875rem;
  color: var(--text-primary);
}

.detail-tag {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(13, 148, 136, 0.15);
  color: #2dd4bf;
  border: 1px solid rgba(13, 148, 136, 0.3);
}

/* WIZARD BOTTOM BAR */
.wizard-bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2.5rem;
  padding-top: 1.75rem;
  border-top: 1px solid var(--border-subtle);
}

.btn-step-prev {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.4rem;
  background: transparent;
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-step-prev:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.05);
}

.btn-step-next {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  background: var(--gradient-amber);
  color: #050b14;
  font-weight: 800;
  font-size: 0.875rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-step-next:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(217, 119, 6, 0.35);
}

.step-final-actions {
  display: flex;
  gap: 0.85rem;
}

.btn-brief-copy {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.4rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 8px;
  cursor: pointer;
}

.btn-brief-copy:hover {
  background: rgba(255, 255, 255, 0.1);
}

.btn-brief-zalo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.75rem;
  background: #0d9488;
  color: #ffffff;
  font-weight: 800;
  font-size: 0.875rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-brief-zalo:hover {
  background: #0f766e;
  transform: translateY(-2px);
}

/* ======================================================= */
/* TRUST PILLARS STRIP                                     */
/* ======================================================= */
.trust-pillars-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3.5rem;
}

.pillar-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-surface-1);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
}

.pillar-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: rgba(251, 191, 36, 0.1);
  color: #fbbf24;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  flex-shrink: 0;
}

.pillar-info strong {
  display: block;
  font-size: 0.9375rem;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
}

.pillar-info p {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* ======================================================= */
/* MOBILE STICKY ACTION BAR                                */
/* ======================================================= */
.mobile-sticky-action-bar {
  display: none;
}

/* ======================================================= */
/* RESPONSIVE BREAKPOINTS                                  */
/* ======================================================= */
@media (max-width: 1024px) {
  .build-project-page {
    padding-bottom: 7.5rem;
  }

  .preset-chips-grid {
    grid-template-columns: 1fr;
  }

  .estimator-grid-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .live-receipt-card {
    position: static;
  }
  .trust-pillars-strip {
    grid-template-columns: 1fr;
  }

  .mobile-sticky-action-bar {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 90;
    background: rgba(10, 20, 36, 0.94);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid rgba(251, 191, 36, 0.25);
    box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.65);
    padding: 0.75rem 1rem;
    padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
  }

  .mobile-bar-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .mobile-bar-price-col {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .mobile-scope-sub {
    font-size: 0.6875rem;
    color: var(--text-subtle);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
  }

  .mobile-price-row {
    display: flex;
    align-items: baseline;
    gap: 0.4rem;
  }

  .mobile-old-price {
    font-size: 0.8125rem;
    color: var(--text-subtle);
    text-decoration: line-through;
    opacity: 0.6;
  }

  .mobile-price-val {
    font-size: 1.25rem;
    font-weight: 900;
    color: #fbbf24;
    letter-spacing: 0;
  }

  .mobile-saved-pill {
    font-size: 0.625rem;
    font-weight: 800;
    color: #2dd4bf;
    background: rgba(13, 148, 136, 0.2);
    border: 1px solid rgba(13, 148, 136, 0.35);
    padding: 0.1rem 0.35rem;
    border-radius: 4px;
  }

  .mobile-bar-actions {
    flex-shrink: 0;
  }

  .mobile-btn-zalo {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.65rem 1.15rem;
    background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
    color: #ffffff;
    font-weight: 800;
    font-size: 0.8125rem;
    border-radius: 8px;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(13, 148, 136, 0.35);
  }
}

@media (max-width: 768px) {
  .services-cards-grid {
    grid-template-columns: 1fr;
  }
  .song-count-chips-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .options-cards-grid {
    grid-template-columns: 1fr;
  }
  .wizard-progress-strip {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  .brief-form-grid {
    grid-template-columns: 1fr;
  }
  .step-live-estimate-banner {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .banner-right {
    flex-direction: column;
    gap: 0.5rem;
  }
  .step-final-actions {
    flex-direction: column;
    width: 100%;
  }
  .btn-brief-copy,
  .btn-brief-zalo {
    width: 100%;
    justify-content: center;
  }
  .mode-tabs-wrap {
    width: 100%;
    flex-direction: column;
    border-radius: 12px;
  }
  .mode-tab-btn {
    width: 100%;
    justify-content: center;
    border-radius: 8px;
  }
}
</style>
