/**
 * Utility for setting page-specific Open Graph metadata
 * Use this in individual page components to override global OG settings
 */

export interface PageMetadataOptions {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  keywords?: string[];
  canonicalUrl?: string;
}

export const usePageMetadata = (options: PageMetadataOptions) => {
  const route = useRoute();
  const BASE_URL = 'https://xkproduction.com';
  
  const finalOptions = {
    ...options,
    canonicalUrl: options.canonicalUrl || `${BASE_URL}${route.path}`,
    image: options.image || 'https://xkproduction.com/images/Xkpreviewnew.png',
    imageAlt: options.imageAlt || options.title,
  };

  // Set SEO meta tags
  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogImage: finalOptions.image,
    ogImageWidth: '1200',
    ogImageHeight: '630',
    ogImageAlt: finalOptions.imageAlt,
    ogType: options.type || 'website',
    ogUrl: finalOptions.canonicalUrl,
    twitterCard: 'summary_large_image',
    twitterImage: finalOptions.image,
    keywords: options.keywords?.join(', '),
    author: options.author || 'XKProduction',
  });

  // Set canonical and article metadata
  useHead(() => {
    const head: any = {
      link: [
        { rel: 'canonical', href: finalOptions.canonicalUrl },
      ],
    };

    if (options.type === 'article') {
      head.meta = head.meta || [];
      
      if (options.publishedTime) {
        head.meta.push({
          property: 'article:published_time',
          content: options.publishedTime,
        });
      }
      
      if (options.modifiedTime) {
        head.meta.push({
          property: 'article:modified_time',
          content: options.modifiedTime,
        });
      }
      
      if (options.section) {
        head.meta.push({
          property: 'article:section',
          content: options.section,
        });
      }
      
      if (options.keywords) {
        options.keywords.forEach((keyword) => {
          head.meta.push({
            property: 'article:tag',
            content: keyword,
          });
        });
      }
    }

    return head;
  });

  // Generate JSON-LD structured data
  const generateJsonLd = () => {
    const baseUrl = 'https://xkproduction.com';
    const path = route.path;

    const jsonLd: any = {
      '@context': 'https://schema.org',
      '@id': `${baseUrl}${path}`,
      url: finalOptions.canonicalUrl,
      name: options.title,
      description: options.description,
    };

    if (options.type === 'article') {
      jsonLd['@type'] = 'Article';
      jsonLd.headline = options.title;
      jsonLd.image = finalOptions.image;
      if (options.author) {
        jsonLd.author = {
          '@type': 'Person',
          name: options.author,
        };
      }
      if (options.publishedTime) {
        jsonLd.datePublished = options.publishedTime;
      }
      if (options.modifiedTime) {
        jsonLd.dateModified = options.modifiedTime;
      }
    } else if (options.type === 'product') {
      jsonLd['@type'] = 'Product';
      jsonLd.image = finalOptions.image;
    } else {
      jsonLd['@type'] = 'WebPage';
      jsonLd.image = finalOptions.image;
    }

    return jsonLd;
  };

  return {
    options: finalOptions,
    generateJsonLd,
  };
};

/**
 * Example usage in a page component:
 * 
 * <script setup lang="ts">
 * import { usePageMetadata } from '~/composables/usePageMetadata'
 * 
 * usePageMetadata({
 *   title: 'Thu Âm Bài Hát | XKProduction',
 *   description: 'Dịch vụ thu âm bài hát chuyên nghiệp tại XKProduction...',
 *   image: 'https://xkproduction.com/images/recording-studio.jpg',
 *   type: 'article',
 *   publishedTime: '2025-01-01T00:00:00Z',
 *   keywords: ['thu âm', 'bài hát', 'studio'],
 * })
 * </script>
 */
