# Quick Start: Using Social Previews in Pages

## Step 1: Add Page Metadata

In any page component (e.g., `pages/services.vue`):

```vue
<script setup lang="ts">
import { usePageMetadata } from '~/composables/usePageMetadata'

usePageMetadata({
  title: 'Dịch Vụ Thu Âm Chuyên Nghiệp - XKProduction',
  description: 'Thu âm bài hát, hoà âm phối khí, mix & master chuẩn Spotify',
  type: 'website',
  keywords: ['thu âm', 'hoà âm', 'mix master'],
})
</script>

<template>
  <div>
    <!-- Your page content -->
  </div>
</template>
```

## Step 2: Add Social Share Buttons

```vue
<template>
  <div>
    <!-- Page content -->
    
    <!-- Social share buttons at bottom -->
    <SocialShareButtons
      title="Dịch Vụ Thu Âm Chuyên Nghiệp - XKProduction"
      description="Thu âm bài hát với thiết bị chuyên nghiệp"
      url="https://xkproduction.com/services"
      direction="horizontal"
      size="md"
      variant="ghost"
    />
  </div>
</template>
```

## Step 3: Add Preview Card (Optional for Testing)

```vue
<template>
  <div>
    <!-- For development/testing only -->
    <SocialPreviewCard
      title="Dịch Vụ Thu Âm"
      description="Thu âm bài hát chuyên nghiệp"
      url="https://xkproduction.com/services"
      image="https://xkproduction.com/images/services-banner.jpg"
    />
  </div>
</template>
```

## Complete Page Example

```vue
<script setup lang="ts">
import { usePageMetadata } from '~/composables/usePageMetadata'

usePageMetadata({
  title: 'Dịch Vụ Thu Âm Chuyên Nghiệp - XKProduction',
  description: 'Thu âm bài hát chuyên nghiệp với thiết bị hiện đại, giá cạnh tranh từ 350.000₫',
  image: '/images/services-banner.jpg',
  type: 'product',
  keywords: ['thu âm', 'hoà âm', 'mix master', 'phòng thu'],
})

const services = [
  { name: 'Thu Âm', price: '350K' },
  { name: 'Hoà Âm Phối Khí', price: 'Liên hệ' },
  { name: 'Mix Master', price: 'Liên hệ' },
]
</script>

<template>
  <div class="services-page">
    <h1>Dịch Vụ</h1>
    
    <div class="services-grid">
      <div v-for="service in services" :key="service.name" class="service-card">
        <h3>{{ service.name }}</h3>
        <p>{{ service.price }}</p>
      </div>
    </div>
    
    <!-- Social sharing -->
    <div class="share-section">
      <h3>Chia sẻ dịch vụ này</h3>
      <SocialShareButtons
        title="Dịch Vụ Thu Âm Chuyên Nghiệp - XKProduction"
        description="Thu âm bài hát với thiết bị chuyên nghiệp, giá cạnh tranh"
        url="https://xkproduction.com/services"
        direction="horizontal"
        size="md"
        variant="outline"
        :platforms="['facebook', 'twitter', 'whatsapp', 'email']"
      />
    </div>
  </div>
</template>

<style scoped>
.services-page {
  padding: 40px 20px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.service-card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.share-section {
  margin-top: 40px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  text-align: center;
}
</style>
```

## Available Props

### usePageMetadata()
```typescript
{
  title: string;              // Page title (required)
  description: string;        // Meta description (required)
  image?: string;            // OG image URL
  imageAlt?: string;         // Image alt text
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;    // ISO date for articles
  modifiedTime?: string;     // ISO date for articles
  author?: string;           // Author name
  keywords?: string[];       // Keywords array
  canonicalUrl?: string;     // Override canonical URL
}
```

### SocialShareButtons Props
```typescript
{
  title?: string;                          // Share title
  description?: string;                    // Share description
  url?: string;                           // Share URL
  image?: string;                         // Share image
  direction?: 'horizontal' | 'vertical';  // Layout
  size?: 'sm' | 'md' | 'lg';             // Button size
  variant?: 'solid' | 'outline' | 'ghost'; // Style
  label?: string;                        // Label text
  platforms?: Array<'facebook' | 'twitter' | 'linkedin' | ...>; // Platforms
}
```

### SocialPreviewCard Props
```typescript
{
  title?: string;       // Preview title
  description?: string; // Preview description
  url?: string;        // Page URL
  image?: string;      // Preview image
}
```

## Testing Your Implementation

1. **Visual Testing**:
   - Add `<SocialPreviewCard />` temporarily to see previews
   - Check each platform tab

2. **Tools**:
   - [Meta Tags Inspector](https://metatags.io/)
   - [Facebook Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

3. **Production Testing**:
   - Share a link on each platform
   - Verify preview appearance
   - Adjust meta tags if needed

## Supported Social Platforms

✅ Facebook  
✅ Twitter / X  
✅ LinkedIn  
✅ WhatsApp  
✅ Telegram  
✅ Pinterest  
✅ Email

## Troubleshooting

### Preview not showing?
- Check image URL is publicly accessible
- Verify meta tags in browser DevTools
- Clear cache and retry

### Wrong title/description?
- Ensure `usePageMetadata()` is called in `<script setup>`
- Check for typos in property names
- Verify strings are not cut off

### Image distorted?
- Use recommended size: 1200x630px
- Try different image aspect ratios
- Test with social platform tools

## Best Practices

✅ Use unique title and description for each page  
✅ Include relevant keywords in description  
✅ Use high-quality, clear images  
✅ Keep descriptions 150-160 characters  
✅ Test on all platforms before publishing  
✅ Update og:image when changing page branding  

---

**Need more help?** See [SOCIAL_PREVIEWS_GUIDE.md](./SOCIAL_PREVIEWS_GUIDE.md) for detailed documentation.
