<template>
  <div class="vietqr-container glass-card">
    <div class="qr-header">
      <div class="qr-badge">
        <i class="fa-solid fa-qrcode"></i>
        <span>THANH TOÁN & ĐẶT CỌC</span>
      </div>
      <h3 class="qr-title">Quét Mã QR Chuyển Khoản Nhanh</h3>
      <p class="qr-sub">Hỗ trợ tất cả ứng dụng ngân hàng chuẩn VietQR NAPAS 247 và ví điện tử MoMo</p>
    </div>

    <!-- Payment Method Tabs -->
    <div class="method-tabs" role="tablist" aria-label="Phương thức thanh toán">
      <button 
        type="button" 
        role="tab" 
        :aria-selected="paymentMethod === 'bank'" 
        class="tab-btn" 
        :class="{ active: paymentMethod === 'bank' }" 
        @click="paymentMethod = 'bank'"
      >
        <i class="fa-solid fa-building-columns"></i>
        <span>Ngân Hàng (VietQR NAPAS)</span>
      </button>
      <button 
        type="button" 
        role="tab" 
        :aria-selected="paymentMethod === 'momo'" 
        class="tab-btn" 
        :class="{ active: paymentMethod === 'momo' }" 
        @click="paymentMethod = 'momo'"
      >
        <i class="fa-solid fa-wallet"></i>
        <span>Ví MoMo</span>
      </button>
    </div>

    <div class="qr-content-grid">
      <!-- QR Image Display -->
      <div class="qr-image-wrapper">
        <div class="qr-frame">
          <img 
            :src="qrUrl" 
            :alt="paymentMethod === 'bank' ? 'Mã VietQR NAPAS ngân hàng MB Bank XKProduction' : 'Mã QR ví điện tử MoMo XKProduction'" 
            class="qr-img" 
            loading="lazy"
          />
          <div class="qr-scan-hint">
            <i class="fa-solid fa-camera"></i>
            <span>{{ paymentMethod === 'bank' ? 'Mở App Ngân Hàng bất kỳ để quét' : 'Mở App MoMo để quét' }}</span>
          </div>
        </div>
      </div>

      <!-- Account Info Cards -->
      <div class="qr-details">
        <div class="info-card">
          <div class="info-row">
            <span class="info-label">Chủ tài khoản:</span>
            <strong class="info-val highlight">NGUYỄN XUÂN KIỆT</strong>
          </div>

          <div v-if="paymentMethod === 'bank'" class="info-row">
            <span class="info-label">Ngân hàng thụ hưởng:</span>
            <strong class="info-val">MB Bank (Ngân Hàng Quân Đội)</strong>
          </div>

          <div class="info-row">
            <span class="info-label">{{ paymentMethod === 'bank' ? 'Số tài khoản MB Bank:' : 'Số điện thoại Ví MoMo:' }}</span>
            <div class="val-with-copy">
              <strong class="info-val highlight">0355 356 294</strong>
              <button 
                type="button" 
                class="btn-copy" 
                @click="copyText('0355356294', 'account')"
                :title="copiedField === 'account' ? 'Đã sao chép' : 'Sao chép STK'"
              >
                <i :class="copiedField === 'account' ? 'fa-solid fa-check text-success' : 'fa-regular fa-copy'"></i>
                <span>{{ copiedField === 'account' ? 'Đã chép' : 'Chép STK' }}</span>
              </button>
            </div>
          </div>

          <div v-if="amount > 0" class="info-row">
            <span class="info-label">Số tiền:</span>
            <strong class="info-val highlight" style="color: var(--teal); font-size: 1.1rem;">{{ formatCurrency(amount) }}</strong>
          </div>

          <div class="info-row">
            <span class="info-label">Cú pháp chuyển khoản:</span>
            <div class="syntax-box">
              <code>{{ transferSyntax }}</code>
              <button 
                type="button" 
                class="btn-copy-syntax" 
                @click="copyText(transferSyntax, 'syntax')"
              >
                <i :class="copiedField === 'syntax' ? 'fa-solid fa-check text-success' : 'fa-regular fa-copy'"></i>
                <span>{{ copiedField === 'syntax' ? 'Đã sao chép cú pháp' : 'Sao chép cú pháp' }}</span>
              </button>
            </div>
          </div>

          <div class="info-row">
            <span class="info-label">Hotline hỗ trợ:</span>
            <a href="tel:0355356294" class="info-link">0355.356.294</a>
          </div>
        </div>

        <div class="deposit-notice">
          <i class="fa-solid fa-shield-check"></i>
          <div>
            <strong>Lưu ý đặt lịch & thanh toán:</strong>
            <p>Sau khi chuyển khoản, vui lòng chụp màn hình biên lai và gửi qua Zalo để studio xác nhận và khóa lịch / kích hoạt dịch vụ ngay cho bạn.</p>
          </div>
        </div>

        <div class="qr-actions">
          <a 
            href="https://zalo.me/0355356294" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-primary btn-zalo-confirm"
          >
            <i class="fa-solid fa-comment-dots"></i>
            <span>Gửi Biên Lai Qua Zalo (0355.356.294)</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  amount?: number
  serviceName?: string
  clientName?: string
  /** Mã đơn hàng duy nhất (VD: XK8821). Khi có, ưu tiên dùng làm nội dung chuyển khoản thay vì transferSyntax. */
  orderCode?: string
}>(), {
  amount: 0,
  serviceName: 'Dat lich thu am',
  clientName: '',
  orderCode: ''
})

const paymentMethod = ref<'bank' | 'momo'>('bank')
const copiedField = ref('')

function stripVietnameseDiacritics(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-zA-Z0-9 -]/g, '')
    .trim()
}

const transferSyntax = computed(() => {
  // Khi có order_code duy nhất: dùng luôn làm nội dung chuyển khoản (ngắn gọn, dễ nhận diện bởi webhook)
  if (props.orderCode) return props.orderCode
  const name = props.clientName ? props.clientName.trim().replace(/\s+/g, ' ') : 'KHACH HANG'
  const service = props.serviceName ? props.serviceName.trim() : 'DAT LICH'
  const raw = `${name} - ${service}`.toUpperCase()
  const stripped = stripVietnameseDiacritics(raw)
  // Napas 247 safe memo length (max 25 characters to prevent bank app rejection)
  return stripped.length > 25 ? stripped.slice(0, 25).trim() : stripped
})

const qrUrl = computed(() => {
  const desc = encodeURIComponent(transferSyntax.value)
  const amt = props.amount > 0 ? props.amount : ''
  
  if (paymentMethod.value === 'bank') {
    // VietQR.io chuẩn NAPAS 247 — Tương thích 100% App Ngân Hàng Việt Nam
    return `https://img.vietqr.io/image/MB-0355356294-compact2.jpg?amount=${amt}&addInfo=${desc}&accountName=NGUYEN%20XUAN%20KIET`
  } else {
    // MoMo P2P format
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent('2|99|0355356294|NGUYEN XUAN KIET||0|0|' + amt + '|' + desc)}`
  }
})

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)
}

const copyText = async (text: string, field: string) => {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(text)
    copiedField.value = field
    setTimeout(() => {
      copiedField.value = ''
    }, 2500)
  } catch (err) {
    console.error('Clipboard copy failed:', err)
  }
}
</script>

<style scoped>
.vietqr-container {
  padding: 2.5rem;
  margin: 3rem 0;
  border: 1px solid rgba(26, 140, 255, 0.2);
  background: radial-gradient(circle at top right, rgba(26, 140, 255, 0.08), transparent 45%),
              var(--glass-bg);
}

.qr-header {
  text-align: center;
  margin-bottom: 1.75rem;
}

.qr-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1rem;
  border-radius: 20px;
  background: rgba(26, 140, 255, 0.1);
  border: 1px solid rgba(26, 140, 255, 0.25);
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.qr-title {
  font-size: clamp(1.4rem, 2.5vw, 1.85rem);
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.qr-sub {
  color: var(--text-light);
  font-size: 0.92rem;
  max-width: 550px;
  margin: 0 auto;
}

.method-tabs {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-light);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background: rgba(26, 140, 255, 0.1);
  border-color: rgba(26, 140, 255, 0.3);
  color: var(--text-main);
}

.tab-btn.active {
  background: rgba(26, 140, 255, 0.2);
  border-color: var(--accent);
  color: #ffffff;
  box-shadow: 0 0 15px rgba(26, 140, 255, 0.25);
}

.qr-content-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2.5rem;
  align-items: center;
}

.qr-image-wrapper {
  display: flex;
  justify-content: center;
}

.qr-frame {
  background: #ffffff;
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 30px rgba(26, 140, 255, 0.2);
  text-align: center;
}

.qr-img {
  width: 220px;
  height: 220px;
  display: block;
  border-radius: 8px;
  object-fit: contain;
}

.qr-scan-hint {
  margin-top: 0.6rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #071018;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.qr-details {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.info-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

@media (min-width: 640px) {
  .info-row {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.info-label {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.info-val {
  font-size: 0.95rem;
  color: var(--text-main);
}

.info-val.highlight {
  color: var(--accent);
  font-weight: 800;
  letter-spacing: 0.5px;
}

.val-with-copy {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-copy, .btn-copy-syntax {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-light);
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  font-size: 0.72rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.2s ease;
}

.btn-copy:hover, .btn-copy-syntax:hover {
  background: rgba(26, 140, 255, 0.15);
  color: var(--accent);
  border-color: rgba(26, 140, 255, 0.3);
}

.syntax-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
  border: 1px dashed rgba(26, 140, 255, 0.3);
}

.syntax-box code {
  font-family: monospace;
  font-size: 0.82rem;
  color: var(--teal);
  font-weight: 700;
}

.info-link {
  color: var(--accent);
  text-decoration: none;
  font-weight: 700;
}

.info-link:hover {
  text-decoration: underline;
}

.deposit-notice {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  background: rgba(0, 212, 170, 0.06);
  border: 1px solid rgba(0, 212, 170, 0.2);
  font-size: 0.82rem;
  color: var(--text-light);
}

.deposit-notice i {
  color: var(--teal);
  font-size: 1.1rem;
  margin-top: 0.1rem;
}

.deposit-notice strong {
  color: var(--text-main);
}

.deposit-notice p {
  margin: 0.15rem 0 0;
  line-height: 1.4;
}

.text-success {
  color: var(--teal) !important;
}

.qr-actions {
  display: flex;
  gap: 1rem;
}

.btn-zalo-confirm {
  width: 100%;
  padding: 0.85rem 1.5rem;
  font-size: 0.92rem;
  gap: 0.6rem;
}

@media (max-width: 860px) {
  .qr-content-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
