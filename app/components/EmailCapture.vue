<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  name: '',
  phone: '',
  email: ''
});

const isSubmitting = ref(false);
const isSuccess = ref(false);
const errorMsg = ref('');

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string) => {
  return /^\d{10}$/.test(phone);
};

const submitForm = async () => {
  errorMsg.value = '';
  
  if (!validatePhone(form.value.phone)) {
    errorMsg.value = 'Số điện thoại không hợp lệ (cần 10 số)';
    return;
  }
  
  if (!validateEmail(form.value.email)) {
    errorMsg.value = 'Email không hợp lệ';
    return;
  }

  isSubmitting.value = true;
  const payload = {
    name: form.value.name,
    phone: form.value.phone,
    email: form.value.email,
    service: 'lead-magnet',
    message: 'Download checklist',
    source: 'email-capture'
  };
  
  try {
    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (res.ok) {
      isSuccess.value = true;
      return;
    }
    throw new Error(`API error ${res.status}`);
  } catch (err) {
    console.warn('[email-capture] API nội bộ không phản hồi, thử fallback sang Formspree:', err);
    try {
      const config = useRuntimeConfig();
      const endpoint = config.public.formspreeEndpoint;
      if (endpoint) {
        const fbRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            ...payload,
            _subject: `[XKProduction Download Checklist] ${payload.name} (${payload.phone})`
          })
        });
        if (fbRes.ok) {
          isSuccess.value = true;
          return;
        }
      }
    } catch (fbErr) {
      console.error('[email-capture] Fallback Formspree lỗi:', fbErr);
    }
    errorMsg.value = 'Không thể kết nối. Vui lòng thử lại.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section class="email-capture max-width">
    <div class="glass-card capture-card">
      <div class="icon-wrapper">
        <i class="fa-solid fa-file-arrow-down glow-icon"></i>
      </div>
      
      <h2 class="title">Checklist Chuẩn Bị Thu Âm Chuyên Nghiệp</h2>
      <p class="subtitle">Tài liệu miễn phí dành cho nghệ sĩ — 20 bước chuẩn bị trước khi vào phòng thu để tiết kiệm thời gian và đạt kết quả tốt nhất</p>
      
      <ul class="benefits">
        <li><i class="fa-solid fa-check"></i> Danh sách thiết bị cần chuẩn bị</li>
        <li><i class="fa-solid fa-check"></i> Cách luyện trước khi thu</li>
        <li><i class="fa-solid fa-check"></i> Tip chọn tone và phong cách</li>
      </ul>
      
      <div v-if="!isSuccess" class="form-container">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <input type="text" v-model="form.name" placeholder="Họ và tên" class="form-input" required />
          </div>
          <div class="form-group">
            <input type="tel" v-model="form.phone" placeholder="09xx.xxx.xxx" class="form-input" required />
          </div>
          <div class="form-group">
            <input type="email" v-model="form.email" placeholder="Email để nhận tài liệu" class="form-input" required />
          </div>
          
          <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
          
          <button type="submit" class="btn btn-primary full-width" :disabled="isSubmitting">
            <i class="fa-solid" :class="isSubmitting ? 'fa-spinner fa-spin' : 'fa-download'"></i>
            {{ isSubmitting ? 'Đang xử lý...' : 'Tải Ngay Miễn Phí' }}
          </button>
        </form>
        <p class="security-note">🔒 Thông tin của bạn được bảo mật tuyệt đối. Không spam.</p>
      </div>
      
      <div v-else class="success-panel">
        <div class="success-icon"><i class="fa-solid fa-circle-check"></i></div>
        <h3>Đăng ký thành công!</h3>
        <p>Tải xuống bên dưới hoặc chờ XKProduction gửi qua email trong vòng 24 giờ</p>
        <a href="/checklist-thu-am.pdf" target="_blank" class="btn btn-primary download-link">
          <i class="fa-solid fa-download"></i> Tải Tài Liệu
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.email-capture {
  padding: 4rem 0;
}

.capture-card {
  padding: 4rem 2rem;
  text-align: center;
  background: radial-gradient(circle at center, rgba(26, 140, 255, 0.06) 0%, rgba(255, 255, 255, 0.04) 100%);
  max-width: 800px;
  margin: 0 auto;
}

.icon-wrapper {
  margin-bottom: 1.5rem;
}

.glow-icon {
  font-size: 3rem;
  color: var(--accent);
  text-shadow: 0 0 20px rgba(125, 211, 252, 0.5);
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.subtitle {
  color: var(--text-light);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-inline: auto;
}

.benefits {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.benefits li {
  color: var(--text-main);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.benefits i {
  color: var(--teal);
}

.form-container {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

.form-input {
  width: 100%;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: var(--text-main);
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
}

.error-msg {
  color: #ef4444;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.full-width {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.security-note {
  margin-top: 1rem;
  color: var(--text-muted);
  font-size: 0.875rem;
}

.success-panel {
  padding: 2rem;
}

.success-icon {
  font-size: 4rem;
  color: var(--teal);
  margin-bottom: 1rem;
}

.success-panel h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.success-panel p {
  color: var(--text-light);
  margin-bottom: 2rem;
}

.download-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 10px;
}
</style>
