/**
 * Composable for managing Open Graph meta tags and social previews
 * Provides unified interface for setting OG tags, Twitter cards, and social sharing data
 */

export interface OpenGraphOptions {
  title?: string;
  description?: string;
  image?: string;
  imageWidth?: string | number;
  imageHeight?: string | number;
  imageAlt?: string;
  imageType?: string;
  url?: string;
  type?: 'website' | 'article' | 'business.business' | 'profile';
  siteName?: string;
  locale?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  twitterHandle?: string;
  twitterCreator?: string;
}

const BASE_URL = 'https://xkproduction.com';
const DEFAULT_OG_IMAGE = 'https://xkproduction.com/images/xk-studio-production.jpg';
const DEFAULT_TWITTER_IMAGE = 'https://xkproduction.com/images/xk-studio-production.jpg';

export const useOpenGraph = (options: OpenGraphOptions = {}) => {
  const route = useRoute();
  
  const config = {
    title: options.title || 'XKProduction - Phòng Thu Âm Chuyên Nghiệp',
    description: options.description || 'XKProduction — Phòng thu âm chuyên nghiệp tại Bình Phước. Thu âm bài hát, hoà âm phối khí, mix & master, quay MV/TVC, cho thuê âm thanh ánh sáng sự kiện.',
    image: options.image || DEFAULT_OG_IMAGE,
    imageWidth: options.imageWidth || '1200',
    imageHeight: options.imageHeight || '630',
    imageAlt: options.imageAlt || 'XKProduction - Phòng Thu Âm Chuyên Nghiệp',
    imageType: options.imageType || 'image/png',
    url: options.url || `${BASE_URL}${route.path}`,
    type: options.type || 'website',
    siteName: options.siteName || 'XKProduction',
    locale: options.locale || 'vi_VN',
    author: options.author || 'XKProduction - Nguyễn Xuân Kiệt',
    publishedTime: options.publishedTime,
    modifiedTime: options.modifiedTime,
    section: options.section,
    tags: options.tags || [],
    twitterHandle: options.twitterHandle || '@xkproduction',
    twitterCreator: options.twitterCreator || '@xkproduction',
  };

  // Set SEO Meta Tags
  useSeoMeta({
    titleTemplate: (titleChunk) => titleChunk || config.title,
    description: config.description,
    ogTitle: config.title,
    ogDescription: config.description,
    ogImage: config.image,
    ogImageWidth: String(config.imageWidth),
    ogImageHeight: String(config.imageHeight),
    ogImageAlt: config.imageAlt,
    ogImageType: config.imageType,
    ogUrl: config.url,
    ogType: config.type,
    ogSiteName: config.siteName,
    ogLocale: config.locale,
    twitterCard: 'summary_large_image',
    twitterImage: config.image,
    twitterSite: config.twitterHandle,
    twitterCreator: config.twitterCreator,
    author: config.author,
  });

  // Set canonical URL and alternate links
  useHead(() => {
    const head: any = {
      link: [
        { rel: 'canonical', href: config.url },
        { rel: 'alternate', hreflang: 'vi-VN', href: config.url },
        { rel: 'alternate', hreflang: 'x-default', href: config.url },
        {
          rel: 'image_src',
          href: config.image,
        },
      ],
    };

    // Add article-specific metadata
    if (config.type === 'article') {
      if (config.publishedTime) {
        head.meta = head.meta || [];
        head.meta.push({
          property: 'article:published_time',
          content: config.publishedTime,
        });
      }
      if (config.modifiedTime) {
        head.meta = head.meta || [];
        head.meta.push({
          property: 'article:modified_time',
          content: config.modifiedTime,
        });
      }
      if (config.section) {
        head.meta = head.meta || [];
        head.meta.push({
          property: 'article:section',
          content: config.section,
        });
      }
      if (config.tags && config.tags.length > 0) {
        head.meta = head.meta || [];
        config.tags.forEach((tag) => {
          head.meta.push({
            property: 'article:tag',
            content: tag,
          });
        });
      }
    }

    return head;
  });

  // Return configuration for JSON-LD generation
  return {
    config,
    generateJsonLd: () => generateJsonLd(config),
  };
};

/**
 * Generate JSON-LD structured data for social sharing and SEO
 */
function generateJsonLd(config: any) {
  const jsonLd: any = {
    '@context': 'https://schema.org',
  };

  if (config.type === 'article') {
    jsonLd['@type'] = 'NewsArticle';
    jsonLd.headline = config.title;
    jsonLd.description = config.description;
    jsonLd.image = {
      '@type': 'ImageObject',
      url: config.image,
      width: config.imageWidth,
      height: config.imageHeight,
    };
    jsonLd.author = {
      '@type': 'Person',
      name: config.author,
    };
    jsonLd.datePublished = config.publishedTime;
    jsonLd.dateModified = config.modifiedTime || config.publishedTime;
  } else {
    jsonLd['@type'] = 'Organization';
    jsonLd.name = config.siteName;
    jsonLd.url = config.url;
    jsonLd.logo = config.image;
    jsonLd.description = config.description;
    jsonLd.sameAs = [
      'https://www.facebook.com/xkproduction',
      'https://www.youtube.com/@xkproduction',
      'https://www.instagram.com/xkproduction',
    ];
  }

  return jsonLd;
}

/**
 * Generate social share links
 */
export const generateShareLinks = (options: {
  title: string;
  description: string;
  url: string;
  image?: string;
}) => {
  const { title, description, url, image } = options;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedImage = image ? encodeURIComponent(image) : '';

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedDescription}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };
};
