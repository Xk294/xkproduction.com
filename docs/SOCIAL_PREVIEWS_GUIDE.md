# Open Graph, Social Previews & Website Embed Guide

## Overview

This guide explains how to use the new Open Graph (OG) meta tags, social preview cards, and website embed functionality in XKProduction website.

## Features Implemented

### 1. **Global Open Graph Configuration** (app.vue)
- Default OG meta tags for all pages
- Twitter Card support
- JSON-LD structured data for rich snippets
- Canonical URLs and alternate links
- Social platform metadata

### 2. **Composables**

#### `useOpenGraph()`
Global composable for managing OG meta tags.

**Location**: `app/composables/useOpenGraph.ts`

**Features**:
- Set custom OG tags per page
- Generate social share links
- Create JSON-LD structured data
- Support for article and product pages

**Usage**:
```typescript
// In any component
useOpenGraph({
  title: 'Custom Page Title',
  description: 'Page description',
  image: 'https://example.com/image.jpg',
  type: 'article',
  publishedTime: '2025-01-01T00:00:00Z',
  keywords: ['keyword1', 'keyword2'],
})
```

#### `usePageMetadata()`
Page-specific metadata utility.

**Location**: `app/composables/usePageMetadata.ts`

**Usage in Page Components**:
```typescript
<script setup lang="ts">
import { usePageMetadata } from '~/composables/usePageMetadata'

usePageMetadata({
  title: 'Thu Âm Bài Hát - XKProduction',
  description: 'Dịch vụ thu âm chuyên nghiệp...',
  type: 'article',
  publishedTime: '2025-01-15T10:00:00Z',
  modifiedTime: '2025-01-16T15:30:00Z',
  keywords: ['thu âm', 'bài hát', 'studio'],
  author: 'XKProduction Team',
})
</script>
```

#### `useSocialPreview()`
Utilities for generating social preview cards and embeds.

**Location**: `app/composables/useSocialPreview.ts`

**Available Functions**:
```typescript
// Generate OG meta tags
generateFacebookMeta(options)
generateTwitterMeta(options)
generateLinkedInMeta(options)

// Generate embeds
generateWebsiteEmbed(options)

// Share links
generateWhatsAppShare(options)
generateTelegramShare(options)
generatePinterestPin(options)

// JSON-LD
generateSocialJsonLd(options)

// Preview HTML (for testing)
generateSocialPreviewPreview(options)
```

### 3. **Components**

#### `SocialShareButtons.vue`
Responsive social share button component.

**Location**: `app/components/SocialShareButtons.vue`

**Features**:
- Multiple platform support (Facebook, Twitter, LinkedIn, WhatsApp, Telegram, Pinterest, Email)
- Customizable size (sm, md, lg)
- Customizable layout (horizontal, vertical)
- Customizable style (ghost, outline, solid)
- Accessibility features

**Usage**:
```vue
<template>
  <SocialShareButtons
    title="Amazing Title"
    description="Page description"
    url="https://xkproduction.com/page"
    image="https://xkproduction.com/images/preview.jpg"
    direction="horizontal"
    size="md"
    variant="ghost"
    :platforms="['facebook', 'twitter', 'linkedin', 'whatsapp']"
    label="Chia sẻ"
  />
</template>
```

#### `SocialPreviewCard.vue`
Component to preview how your page will appear on different social platforms.

**Location**: `app/components/SocialPreviewCard.vue`

**Features**:
- Preview tabs for Facebook, Twitter, LinkedIn
- Real-time preview of how links will look
- Copy URL functionality
- Responsive design

**Usage**:
```vue
<template>
  <SocialPreviewCard
    title="Your Title"
    description="Your description"
    url="https://xkproduction.com/page"
    image="https://xkproduction.com/images/preview.jpg"
  />
</template>
```

## Implementation Examples

### Example 1: Blog Article Page

```vue
<script setup lang="ts">
import { usePageMetadata } from '~/composables/usePageMetadata'

const article = {
  title: 'Thu Âm Bài Hát Giá Bao Nhiêu 2025',
  description: 'Bảng giá thu âm chuyên nghiệp tại XKProduction...',
  date: '2025-01-15',
  author: 'Nguyễn Xuân Kiệt',
  image: '/images/blog-thu-am-gia.jpg',
}

usePageMetadata({
  title: `${article.title} | XKProduction Blog`,
  description: article.description,
  image: article.image,
  type: 'article',
  publishedTime: `${article.date}T10:00:00Z`,
  author: article.author,
  keywords: ['thu âm', 'bảng giá', 'phòng thu'],
})
</script>

<template>
  <article>
    <h1>{{ article.title }}</h1>
    <meta :content="article.date" property="article:published_time" />
    <!-- Article content here -->
    
    <SocialShareButtons
      :title="article.title"
      :description="article.description"
      url="https://xkproduction.com/blog/thu-am-gia"
      :image="article.image"
      label="Chia sẻ bài viết"
    />
  </article>
</template>
```

### Example 2: Service Page with Preview

```vue
<script setup lang="ts">
import { usePageMetadata } from '~/composables/usePageMetadata'

usePageMetadata({
  title: 'Dịch Vụ Thu Âm Chuyên Nghiệp - XKProduction',
  description: 'Thu âm bài hát chuyên nghiệp với thiết bị hiện đại, giá cạnh tranh từ 350.000₫',
  image: 'https://xkproduction.com/images/services-banner.jpg',
  type: 'product',
  keywords: ['thu âm', 'hoà âm phối khí', 'mix master', 'phòng thu'],
})
</script>

<template>
  <div>
    <h1>Dịch Vụ Thu Âm</h1>
    
    <!-- Service content -->
    
    <!-- Social Preview for testing -->
    <SocialPreviewCard
      title="Dịch Vụ Thu Âm Chuyên Nghiệp - XKProduction"
      description="Thu âm bài hát chuyên nghiệp với thiết bị hiện đại, giá cạnh tranh từ 350.000₫"
      url="https://xkproduction.com/services"
      image="https://xkproduction.com/images/services-banner.jpg"
    />
    
    <!-- Social sharing buttons -->
    <SocialShareButtons
      title="Dịch Vụ Thu Âm Chuyên Nghiệp - XKProduction"
      description="Thu âm bài hát chuyên nghiệp với thiết bị hiện đại"
      url="https://xkproduction.com/services"
      direction="vertical"
      size="lg"
      variant="outline"
    />
  </div>
</template>
```

## Open Graph Image Specs

**Recommended Dimensions**:
- Width: 1200px
- Height: 630px
- File format: JPG/PNG
- File size: < 5MB
- Aspect ratio: 1.91:1

**Current OG Image**: `https://xkproduction.com/images/Xkpreviewnew.png`

## Testing Social Previews

### Tools:
1. **Facebook**: https://developers.facebook.com/tools/debug/
2. **Twitter**: https://cards-dev.twitter.com/validator
3. **LinkedIn**: https://www.linkedin.com/post-inspector/inspect/
4. **Telegram**: https://core.telegram.org/bots/links#plain-links
5. **General**: https://metatags.io/

### Steps:
1. Copy your page URL
2. Paste into the testing tool
3. Review how it appears in social preview
4. Adjust OG tags if needed

## Meta Tags Reference

| Tag | Purpose | Example |
|-----|---------|---------|
| `og:title` | Page title | XKProduction - Phòng Thu Âm |
| `og:description` | Page description | Phòng thu âm chuyên nghiệp... |
| `og:image` | Preview image | https://xkproduction.com/images/preview.jpg |
| `og:url` | Canonical URL | https://xkproduction.com/services |
| `og:type` | Content type | website/article/business.business |
| `twitter:card` | Twitter card type | summary_large_image |
| `article:published_time` | Article date | 2025-01-15T10:00:00Z |
| `article:modified_time` | Last modified | 2025-01-16T15:30:00Z |

## Best Practices

1. **Unique Titles**: Each page should have a unique, descriptive title (50-60 characters)
2. **Compelling Descriptions**: Write clear descriptions (150-160 characters)
3. **High-Quality Images**: Use clear, relevant images in OG format
4. **Consistent Branding**: Maintain brand identity across all previews
5. **Test Regularly**: Use preview tools to verify changes
6. **Mobile Optimization**: Ensure previews look good on mobile devices
7. **Keywords**: Include relevant keywords in description
8. **Call-to-Action**: Add CTAs in descriptions when appropriate

## Troubleshooting

### Preview not updating:
- Check if canonical URL is correct
- Verify image URL is accessible
- Use cache clearing in preview tools
- Wait 24 hours for social platforms to refresh

### Image not showing:
- Ensure image URL is publicly accessible
- Verify image dimensions (1200x630px)
- Check image file format (JPG/PNG)
- Test with https:// URLs only

### Wrong preview appearing:
- Ensure meta tags are in `<head>` section
- Check for duplicate og: tags
- Verify tag syntax (property, not name)
- Check page crawl errors

## Resources

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started)
- [LinkedIn Developer](https://www.linkedin.com/developers/)
- [Schema.org](https://schema.org/)
- [JSON-LD Documentation](https://json-ld.org/)
