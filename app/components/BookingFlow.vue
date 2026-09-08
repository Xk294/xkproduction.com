<script setup lang="ts">
import { ref, computed } from 'vue';

const step = ref(1);

const services = [
  { id: 'thu-am', name: 'Thu Âm Bài Hát', icon: 'fa-microphone' },
  { id: 'mix-master', name: 'Mix & Master', icon: 'fa-sliders' },
  { id: 'hoa-am', name: 'Hoà Âm Phối Khí', icon: 'fa-keyboard' },
  { id: 'mix-online', name: 'Mix Online', icon: 'fa-cloud-upload-alt' },
  { id: 'combo', name: 'Gói Combo', icon: 'fa-compact-disc' },
  { id: 'tu-van', name: 'Tư vấn / Khác', icon: 'fa-question-circle' },
];

const form = ref({
  service: '',
  date: '',
  timeSlot: '',
  name: '',
  phone: '',
  email: '',
  notes: ''
});

const isSubmitting = ref(false);
const errorMsg = ref('');

const nextStep = () => {
  if (step.value < 3) step.value++;
};

const prevStep = () => {
  if (step.value > 1) step.value--;
};

const canProceedStep1 = computed(() => !!form.value.service);
const canProceedStep2 = computed(() => !!form.value.date && !!form.value.timeSlot);

const today = computed(() => {
  const d = new Date();
  return d.toISOString().split('T')[0];
});

const validatePhone = (phone: string) => {
  const p = phone.replace(/[.\s-]/g, '').replace(/^\+84/, '0');
  return /^(0[3-9]\d{8})$/.test(p);
};

const submitBooking = async () => {
  errorMsg.value = '';
  
  if (!form.value.name || !form.value.phone) {
    errorMsg.value = 'Vui lòng nhập tên và số điện thoại';
    return;
  }
  
  if (!validatePhone(form.value.phone)) {
    errorMsg.value = 'Số điện thoại không hợp lệ (cần 10 chữ số)';
    return;
  }

  isSubmitting.value = true;
  const cleanPhone = form.value.phone.replace(/[.\s-]/g, '').replace(/^\+84/, '0');
  const payload = {
    name: form.value.name,
    phone: cleanPhone,
    email: form.value.email || '',
    service: form.value.service,
    message: `Ngày: ${form.value.date} - Thời gian: ${form.value.timeSlot}. Ghi chú: ${form.value.notes}`,
    source: 'booking-flow'
  };
  
  try {
    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (res.ok) {
      step.value = 4; // success
      return;
    }
    throw new Error(`API error ${res.status}`);
  } catch (err) {
    console.warn('[booking-flow] API nội bộ không phản hồi, thử fallback sang Formspree:', err);
    try {
      const config = useRuntimeConfig();
      const endpoint = config.public.formspreeEndpoint;
      if (endpoint) {
        const fbRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            ...payload,
            _subject: `[XKProduction Đặt Lịch] ${payload.name} (${payload.phone})`
          })
        });
        if (fbRes.ok) {
          step.value = 4;
          return;
        }
      }
    } catch (fbErr) {
      console.error('[booking-flow] Fallback Formspree lỗi:', fbErr);
    }
    errorMsg.value = 'Có lỗi xảy ra. Vui lòng thử lại hoặc nhắn trực tiếp qua Zalo 0355.356.294.';
  } finally {
    isSubmitting.value = false;
  }
};

const resetFlow = () => {
  form.value = {
    service: '',
    date: '',
    timeSlot: '',
    name: '',
    phone: '',
    email: '',
    notes: ''
  };
  step.value = 1;
};
</script>

<template>
  <section class="booking-flow max-width">
    <div class="glass-card flow-container">
      
      <!-- Progress Indicator -->
      <div v-if="step <= 3" class="progress-indicator">
        <div class="step" :class="{ active: step === 1, done: step > 1 }">
          <div class="circle">1</div>
          <span>Dịch vụ</span>
        </div>
        <div class="line" :class="{ done: step > 1 }"></div>
        <div class="step" :class="{ active: step === 2, done: step > 2 }">
          <div class="circle">2</div>
          <span>Thời gian</span>
        </div>
        <div class="line" :class="{ done: step > 2 }"></div>
        <div class="step" :class="{ active: step === 3 }">
          <div class="circle">3</div>
          <span>Liên hệ</span>
        </div>
      </div>

      <Transition name="slide" mode="out-in">
        <!-- Step 1: Chọn dịch vụ -->
        <div v-if="step === 1" class="step-content" key="step1">
          <h2 class="step-title">Bạn cần dịch vụ nào?</h2>
          <div class="services-grid">
            <div 
              v-for="s in services" 
              :key="s.id"
              class="service-card glass-card hover-lift"
              :class="{ selected: form.service === s.name }"
              @click="form.service = s.name"
            >
              <i class="fa-solid" :class="s.icon"></i>
              <span>{{ s.name }}</span>
            </div>
          </div>
          <div class="actions">
            <button class="btn btn-primary" :disabled="!canProceedStep1" @click="nextStep">Tiếp theo</button>
          </div>
        </div>

        <!-- Step 2: Chọn thời gian -->
        <div v-else-if="step === 2" class="step-content" key="step2">
          <h2 class="step-title">Thời gian mong muốn?</h2>
          <div class="time-form">
            <div class="form-group">
              <label>Ngày dự kiến</label>
              <input type="date" v-model="form.date" :min="today" class="form-input" />
            </div>
            
            <div class="form-group">
              <label>Buổi trong ngày</label>
              <div class="time-slots">
                <label class="time-slot" :class="{ active: form.timeSlot === 'Sáng (7:00–12:00)' }">
                  <input type="radio" v-model="form.timeSlot" value="Sáng (7:00–12:00)" class="hidden" />
                  Sáng (7:00–12:00)
                </label>
                <label class="time-slot" :class="{ active: form.timeSlot === 'Chiều (12:00–17:00)' }">
                  <input type="radio" v-model="form.timeSlot" value="Chiều (12:00–17:00)" class="hidden" />
                  Chiều (12:00–17:00)
                </label>
                <label class="time-slot" :class="{ active: form.timeSlot === 'Tối (17:00–22:00)' }">
                  <input type="radio" v-model="form.timeSlot" value="Tối (17:00–22:00)" class="hidden" />
                  Tối (17:00–22:00)
                </label>
              </div>
            </div>
            
            <p class="note-text">Đây là thời gian bạn ưu thích. XKProduction sẽ xác nhận lịch chính xác qua Zalo/điện thoại.</p>
          </div>
          
          <div class="actions split">
            <button class="btn btn-secondary" @click="prevStep">Quay lại</button>
            <button class="btn btn-primary" :disabled="!canProceedStep2" @click="nextStep">Tiếp theo</button>
          </div>
        </div>

        <!-- Step 3: Thông liên hệ -->
        <div v-else-if="step === 3" class="step-content" key="step3">
          <h2 class="step-title">Thông tin liên hệ</h2>
          <div class="contact-form">
            <div class="form-group">
              <input type="text" v-model="form.name" placeholder="Họ và tên (*)" class="form-input" required />
            </div>
            <div class="form-group">
              <input type="tel" v-model="form.phone" placeholder="Số điện thoại (*)" class="form-input" required />
            </div>
            <div class="form-group">
              <input type="email" v-model="form.email" placeholder="Email (Không bắt buộc)" class="form-input" />
            </div>
            <div class="form-group">
              <textarea v-model="form.notes" placeholder="Ghi chú thêm cho dự án của bạn..." class="form-input textarea" rows="4"></textarea>
            </div>
            
            <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
          </div>
          
          <div class="actions split">
            <button class="btn btn-secondary" @click="prevStep">Quay lại</button>
            <button class="btn btn-primary" :disabled="isSubmitting" @click="submitBooking">
              <i v-if="isSubmitting" class="fa-solid fa-spinner fa-spin"></i>
              {{ isSubmitting ? 'Đang gửi...' : 'Xác Nhận Đặt Lịch' }}
            </button>
          </div>
        </div>

        <!-- Success State -->
        <div v-else class="step-content success-state" key="step4">
          <i class="fa-solid fa-circle-check success-icon"></i>
          <h2 class="step-title">Đặt lịch thành công!</h2>
          <p class="success-text">XKProduction đã nhận yêu cầu của bạn. Chúng tôi sẽ liên hệ xác nhận lịch qua Zalo hoặc điện thoại trong vòng 2 giờ (giờ làm việc).</p>
          
          <div class="success-actions">
            <a href="https://zalo.me/0355356294" target="_blank" class="btn btn-primary">
              <i class="fa-solid fa-comment-dots"></i> Nhắn Zalo ngay để nhanh hơn
            </a>
            <button class="btn btn-secondary" @click="resetFlow">Đặt lịch mới</button>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.booking-flow {
  padding: 4rem 0;
}

.flow-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem;
  overflow: hidden;
}

.progress-indicator {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
  padding: 0 2rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.step.active, .step.done {
  color: var(--text-main);
}

.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.step.active .circle {
  border-color: var(--primary);
  color: var(--primary);
}

.step.done .circle {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}

.line {
  flex-grow: 1;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 1rem;
  margin-bottom: 1.5rem;
  transition: background 0.3s ease;
}

.line.done {
  background: var(--primary);
}

.step-content {
  width: 100%;
}

.step-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.75rem;
}

/* Step 1 */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.service-card {
  padding: 2rem 1rem;
  text-align: center;
  cursor: pointer;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  transition: all 0.3s ease;
}

.service-card.selected {
  border-color: var(--primary);
  background: rgba(26, 140, 255, 0.05);
}

.service-card i {
  font-size: 2rem;
  color: var(--teal);
}

/* Step 2 & 3 */
.time-form, .contact-form {
  max-width: 500px;
  margin: 0 auto 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-light);
}

.form-input {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: var(--text-main);
  font-family: inherit;
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
}

.textarea {
  resize: vertical;
}

.time-slots {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.time-slot {
  flex: 1 1 calc(33.333% - 1rem);
  min-width: 140px;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.time-slot.active {
  background: var(--gradient-primary);
  border-color: transparent;
  color: #fff;
}

.note-text {
  color: var(--text-muted);
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1rem;
}

.error-msg {
  color: #ef4444;
  margin-bottom: 1rem;
  text-align: center;
}

/* Actions */
.actions {
  display: flex;
  justify-content: center;
}

.actions.split {
  justify-content: space-between;
}

.actions .btn {
  padding: 1rem 3rem;
  border-radius: 10px;
  cursor: pointer;
}

.actions .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Success */
.success-state {
  text-align: center;
}

.success-icon {
  font-size: 5rem;
  color: var(--teal);
  margin-bottom: 1.5rem;
}

.success-text {
  color: var(--text-light);
  margin-bottom: 2rem;
  max-width: 500px;
  margin-inline: auto;
}

.success-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.success-actions .btn {
  padding: 1rem 2rem;
  border-radius: 10px;
  text-decoration: none;
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s var(--ease-out-expo, ease-out);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .time-slot {
    flex: 1 1 100%;
  }
  
  .progress-indicator {
    padding: 0;
  }
  
  .actions.split {
    flex-direction: column;
    gap: 1rem;
  }
  
  .actions.split .btn {
    width: 100%;
  }
}
</style>
