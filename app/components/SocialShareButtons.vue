<template>
  <div class="social-share-container" :class="containerClass">
    <div class="social-share-label" v-if="label">{{ label }}</div>
    <div class="social-share-buttons" :class="directionClass">
      <a 
        v-for="(link, platform) in shareLinks" 
        :key="platform"
        :href="link"
        :title="`Chia sẻ trên ${getPlatformName(platform)}`"
        :class="['social-share-btn', `social-share-btn-${platform}`]"
        target="_blank"
        rel="noopener noreferrer"
        @click.prevent="openShareWindow(link)"
      >
        <Icon :name="`mdi:${getIconName(platform)}`" />
        <span class="sr-only">{{ getPlatformName(platform) }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateShareLinks } from '~/composables/useOpenGraph'

interface Props {
  title?: string
  description?: string
  url?: string
  image?: string
  direction?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline' | 'ghost'
  label?: string
  platforms?: Array<'facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'telegram' | 'pinterest' | 'email'>
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  size: 'md',
  variant: 'ghost',
  platforms: () => ['facebook', 'twitter', 'linkedin', 'whatsapp'],
})

const route = useRoute()

const title = computed(() => props.title || document.title)
const description = computed(() => props.description || (document.querySelector('meta[name="description"]')?.getAttribute('content') || ''))
const url = computed(() => props.url || `https://xkproduction.com${route.path}`)

const shareLinks = computed(() => {
  const links = generateShareLinks({
    title: title.value,
    description: description.value,
    url: url.value,
    image: props.image,
  })
  
  // Filter to only include requested platforms
  const filtered: Record<string, string> = {}
  props.platforms.forEach(platform => {
    filtered[platform] = links[platform]
  })
  return filtered
})

const directionClass = computed(() => `social-share-buttons-${props.direction}`)
const containerClass = computed(() => `social-share-container-${props.size} social-share-container-${props.variant}`)

const getPlatformName = (platform: string): string => {
  const names: Record<string, string> = {
    facebook: 'Facebook',
    twitter: 'Twitter / X',
    linkedin: 'LinkedIn',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    pinterest: 'Pinterest',
    email: 'Email',
  }
  return names[platform] || platform
}

const getIconName = (platform: string): string => {
  const icons: Record<string, string> = {
    facebook: 'facebook',
    twitter: 'twitter',
    linkedin: 'linkedin',
    whatsapp: 'whatsapp',
    telegram: 'telegram',
    pinterest: 'pinterest',
    email: 'email',
  }
  return icons[platform] || 'share-variant'
}

const openShareWindow = (url: string) => {
  const width = 600
  const height = 400
  const left = (window.innerWidth - width) / 2
  const top = (window.innerHeight - height) / 2
  
  window.open(
    url,
    'share',
    `width=${width},height=${height},left=${left},top=${top}`
  )
}
</script>

<style scoped lang="css">
.social-share-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.social-share-label {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: max-content;
}

.social-share-buttons {
  display: flex;
  gap: 8px;
}

.social-share-buttons-vertical {
  flex-direction: column;
}

.social-share-buttons-horizontal {
  flex-direction: row;
}

/* Size variants */
.social-share-container-sm .social-share-btn {
  width: 32px;
  height: 32px;
  font-size: 16px;
}

.social-share-container-md .social-share-btn {
  width: 40px;
  height: 40px;
  font-size: 20px;
}

.social-share-container-lg .social-share-btn {
  width: 48px;
  height: 48px;
  font-size: 24px;
}

/* Style variants */
.social-share-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  text-decoration: none;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
}

.social-share-container-ghost .social-share-btn {
  background: transparent;
  border: 1.5px solid rgba(26, 140, 255, 0.3);
}

.social-share-container-ghost .social-share-btn:hover {
  background: rgba(26, 140, 255, 0.1);
  border-color: rgba(26, 140, 255, 0.6);
  color: rgb(26, 140, 255);
  box-shadow: 0 0 20px rgba(26, 140, 255, 0.2);
}

.social-share-container-outline .social-share-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1.5px solid rgba(26, 140, 255, 0.4);
}

.social-share-container-outline .social-share-btn:hover {
  background: rgba(26, 140, 255, 0.15);
  border-color: rgb(26, 140, 255);
  color: rgb(26, 140, 255);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(26, 140, 255, 0.25);
}

.social-share-container-solid .social-share-btn {
  background: rgb(26, 140, 255);
  border: none;
  color: white;
}

.social-share-container-solid .social-share-btn:hover {
  background: rgb(20, 110, 210);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(26, 140, 255, 0.3);
}

/* Platform-specific colors on hover */
.social-share-btn-facebook:hover {
  --platform-color: #1877F2;
}

.social-share-btn-twitter:hover {
  --platform-color: #000000;
}

.social-share-btn-linkedin:hover {
  --platform-color: #0A66C2;
}

.social-share-btn-whatsapp:hover {
  --platform-color: #25D366;
}

.social-share-btn-telegram:hover {
  --platform-color: #0088cc;
}

.social-share-btn-pinterest:hover {
  --platform-color: #E60023;
}

.social-share-btn-email:hover {
  --platform-color: #EA4335;
}

/* Accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
