<template>
  <div class="social-preview-container">
    <div class="preview-tabs">
      <button
        v-for="platform in ['facebook', 'twitter', 'linkedin']"
        :key="platform"
        :class="['preview-tab', { active: activePlatform === platform }]"
        @click="activePlatform = platform"
      >
        {{ getPlatformName(platform) }}
      </button>
    </div>

    <div class="preview-content">
      <!-- Facebook Preview -->
      <div v-if="activePlatform === 'facebook'" class="preview-frame facebook-preview">
        <div class="preview-thumbnail">
          <img :src="image" :alt="title" class="preview-image" />
        </div>
        <div class="preview-text">
          <div class="preview-domain">{{ getDomain(url) }}</div>
          <div class="preview-title">{{ title }}</div>
          <div class="preview-description">{{ truncateText(description, 100) }}</div>
        </div>
      </div>

      <!-- Twitter Preview -->
      <div v-if="activePlatform === 'twitter'" class="preview-frame twitter-preview">
        <div class="preview-card-twitter">
          <img :src="image" :alt="title" class="preview-image-large" />
          <div class="preview-text-twitter">
            <div class="preview-domain">{{ getDomain(url) }}</div>
            <div class="preview-title">{{ title }}</div>
            <div class="preview-description">{{ truncateText(description, 110) }}</div>
          </div>
        </div>
      </div>

      <!-- LinkedIn Preview -->
      <div v-if="activePlatform === 'linkedin'" class="preview-frame linkedin-preview">
        <div class="preview-card-linkedin">
          <img :src="image" :alt="title" class="preview-image-large" />
          <div class="preview-text-linkedin">
            <div class="preview-domain-upper">{{ getDomain(url) }}</div>
            <div class="preview-title">{{ title }}</div>
            <div class="preview-description">{{ truncateText(description, 100) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Share URL Display -->
    <div class="preview-url">
      <div class="url-label">Preview URL:</div>
      <div class="url-display">{{ url }}</div>
      <button class="copy-btn" @click="copyToClipboard(url)">
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  url?: string
  image?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'XKProduction - Phòng Thu Âm Chuyên Nghiệp',
  description: 'Phòng thu âm chuyên nghiệp XKProduction tại Bình Phước. Thu âm bài hát, hoà âm phối khí, mix & master chuẩn Spotify, quay MV/TVC.',
  url: 'https://xkproduction.com',
  image: 'https://xkproduction.com/images/Xkpreviewnew.png',
})

const activePlatform = ref<'facebook' | 'twitter' | 'linkedin'>('facebook')
const copied = ref(false)

const title = computed(() => props.title)
const description = computed(() => props.description)
const url = computed(() => props.url)
const image = computed(() => props.image)

const getDomain = (fullUrl: string): string => {
  try {
    return new URL(fullUrl).hostname
  } catch {
    return 'xkproduction.com'
  }
}

const truncateText = (text: string, length: number): string => {
  return text.length > length ? text.substring(0, length) + '...' : text
}

const getPlatformName = (platform: string): string => {
  const names: Record<string, string> = {
    facebook: 'Facebook',
    twitter: 'Twitter / X',
    linkedin: 'LinkedIn',
  }
  return names[platform] || platform
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<style scoped lang="css">
.social-preview-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(26, 140, 255, 0.1) 100%);
  border: 1.5px solid rgba(26, 140, 255, 0.15);
  border-radius: 12px;
  backdrop-filter: blur(28px);
}

.preview-tabs {
  display: flex;
  gap: 12px;
  border-bottom: 2px solid rgba(26, 140, 255, 0.1);
  padding-bottom: 12px;
}

.preview-tab {
  padding: 8px 16px;
  background: transparent;
  border: 1.5px solid rgba(26, 140, 255, 0.2);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  font-weight: 500;
}

.preview-tab:hover {
  border-color: rgba(26, 140, 255, 0.4);
  color: rgba(255, 255, 255, 0.9);
}

.preview-tab.active {
  background: rgba(26, 140, 255, 0.2);
  border-color: rgb(26, 140, 255);
  color: rgb(26, 140, 255);
  box-shadow: 0 0 20px rgba(26, 140, 255, 0.2);
}

.preview-content {
  display: flex;
  justify-content: center;
  min-height: 300px;
}

.preview-frame {
  width: 100%;
  max-width: 440px;
}

/* Facebook Preview */
.facebook-preview {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
}

.preview-thumbnail {
  width: 100%;
  height: 210px;
  overflow: hidden;
  background: #f0f0f0;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-text {
  padding: 12px 16px;
}

.preview-domain {
  font-size: 12px;
  color: #65676b;
  margin-bottom: 4px;
  text-transform: uppercase;
}

.preview-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #050505;
  line-height: 1.3;
}

.preview-description {
  font-size: 13px;
  color: #65676b;
  line-height: 1.4;
}

/* Twitter Preview */
.twitter-preview {
  background: #fff;
  border: 1px solid #cfd9de;
  border-radius: 16px;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
}

.preview-card-twitter {
  display: flex;
  flex-direction: column;
}

.preview-image-large {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.preview-text-twitter {
  padding: 12px 16px;
}

.preview-text-twitter .preview-title {
  font-size: 15px;
  color: #0f1419;
  font-weight: 700;
}

.preview-text-twitter .preview-description {
  font-size: 13px;
  color: #536471;
}

/* LinkedIn Preview */
.linkedin-preview {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
}

.preview-card-linkedin {
  display: flex;
  flex-direction: column;
}

.preview-text-linkedin {
  padding: 12px 16px;
}

.preview-domain-upper {
  font-size: 11px;
  color: #65676b;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.preview-text-linkedin .preview-title {
  font-size: 15px;
  color: #000;
  font-weight: 600;
}

.preview-text-linkedin .preview-description {
  font-size: 12px;
  color: #65676b;
}

/* URL Display */
.preview-url {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(26, 140, 255, 0.1);
  border: 1px solid rgba(26, 140, 255, 0.2);
  border-radius: 8px;
}

.url-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  white-space: nowrap;
}

.url-display {
  flex: 1;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Courier New', monospace;
  word-break: break-all;
  overflow: hidden;
  max-height: 40px;
}

.copy-btn {
  padding: 6px 12px;
  background: rgba(26, 140, 255, 0.3);
  border: 1px solid rgba(26, 140, 255, 0.5);
  border-radius: 6px;
  color: rgb(26, 140, 255);
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  background: rgba(26, 140, 255, 0.4);
  border-color: rgb(26, 140, 255);
}

/* Responsive */
@media (max-width: 640px) {
  .social-preview-container {
    padding: 16px;
    gap: 16px;
  }

  .preview-frame {
    max-width: 100%;
  }

  .preview-text {
    padding: 10px 12px;
  }

  .preview-title {
    font-size: 14px;
  }

  .preview-description {
    font-size: 12px;
  }
}
</style>
