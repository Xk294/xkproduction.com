/**
 * Social Preview Card utilities
 * Generates preview HTML/embeds for different social platforms
 * Supports: Facebook, Twitter, LinkedIn, Pinterest, Telegram, WhatsApp
 */

export interface SocialPreviewOptions {
  title: string;
  description: string;
  url: string;
  image: string;
  author?: string;
  publishedDate?: string;
}

/**
 * Generate meta tags for Facebook Open Graph
 */
export const generateFacebookMeta = (options: SocialPreviewOptions): string => {
  const { title, description, url, image } = options;
  return `
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  `.trim();
};

/**
 * Generate meta tags for Twitter Card
 */
export const generateTwitterMeta = (options: SocialPreviewOptions): string => {
  const { title, description, url, image } = options;
  return `
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${url}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:creator" content="@xkproduction" />
  `.trim();
};

/**
 * Generate meta tags for LinkedIn
 */
export const generateLinkedInMeta = (options: SocialPreviewOptions): string => {
  const { title, description, url, image } = options;
  return `
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
  `.trim();
};

/**
 * Generate embed code for website (iframe embeds)
 */
export const generateWebsiteEmbed = (options: {
  url: string;
  width?: string;
  height?: string;
  title?: string;
}): string => {
  const { url, width = '100%', height = '500', title = 'XKProduction' } = options;
  return `<iframe src="${url}" width="${width}" height="${height}" title="${title}" loading="lazy" allowFullScreen sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>`;
};

/**
 * Generate Open Graph meta tags programmatically
 */
export const generateOpenGraphMetaTags = (options: SocialPreviewOptions): Record<string, string> => {
  const { title, description, url, image, author, publishedDate } = options;

  const ogMeta: Record<string, string> = {
    'og:title': title,
    'og:description': description,
    'og:url': url,
    'og:image': image,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:type': 'website',
    'og:site_name': 'XKProduction',
    'og:locale': 'vi_VN',
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
    'twitter:creator': '@xkproduction',
  };

  if (author) {
    ogMeta['article:author'] = author;
  }

  if (publishedDate) {
    ogMeta['article:published_time'] = publishedDate;
  }

  return ogMeta;
};

/**
 * Generate JSON-LD for social sharing
 */
export const generateSocialJsonLd = (options: SocialPreviewOptions & { type?: 'article' | 'product' | 'event' }): string => {
  const { title, description, url, image, author, publishedDate, type = 'article' } = options;

  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'NewsArticle' : 'CreativeWork',
    headline: title,
    description: description,
    image: {
      '@type': 'ImageObject',
      url: image,
      width: 1200,
      height: 630,
    },
    url: url,
  };

  if (author) {
    (baseStructure as any).author = {
      '@type': 'Person',
      name: author,
    };
  }

  if (publishedDate) {
    (baseStructure as any).datePublished = publishedDate;
  }

  return JSON.stringify(baseStructure);
};

/**
 * Generate WhatsApp share link
 */
export const generateWhatsAppShare = (options: { title: string; url: string }): string => {
  const text = encodeURIComponent(`${options.title}\n\n${options.url}`);
  return `https://wa.me/?text=${text}`;
};

/**
 * Generate Telegram share link
 */
export const generateTelegramShare = (options: { title: string; url: string; description?: string }): string => {
  const text = encodeURIComponent(`${options.title}${options.description ? `\n\n${options.description}` : ''}`);
  return `https://t.me/share/url?url=${encodeURIComponent(options.url)}&text=${text}`;
};

/**
 * Generate Pinterest Pin URL
 */
export const generatePinterestPin = (options: { url: string; description: string; image: string }): string => {
  const params = new URLSearchParams({
    url: options.url,
    description: options.description,
    media: options.image,
  });
  return `https://pinterest.com/pin/create/button/?${params.toString()}`;
};

/**
 * Generate social preview card preview (for testing)
 */
export const generateSocialPreviewPreview = (options: SocialPreviewOptions & { platform: 'facebook' | 'twitter' | 'linkedin' }): string => {
  const { title, description, url, image, platform } = options;

  if (platform === 'facebook') {
    return `
      <div style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden; max-width: 400px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
        <img src="${image}" alt="${title}" style="width: 100%; height: 210px; object-fit: cover;" />
        <div style="padding: 12px 16px;">
          <div style="font-size: 12px; color: #65676b; margin-bottom: 4px;">${new URL(url).hostname}</div>
          <div style="font-size: 16px; font-weight: 600; margin-bottom: 4px; color: #000;">${title}</div>
          <div style="font-size: 13px; color: #65676b; line-height: 1.4;">${description}</div>
        </div>
      </div>
    `;
  } else if (platform === 'twitter') {
    return `
      <div style="border: 1px solid #cfd9de; border-radius: 16px; overflow: hidden; max-width: 400px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; background: #fff;">
        <img src="${image}" alt="${title}" style="width: 100%; height: 200px; object-fit: cover;" />
        <div style="padding: 12px 16px;">
          <div style="font-size: 13px; color: #536471; margin-bottom: 4px;">${new URL(url).hostname}</div>
          <div style="font-size: 15px; font-weight: 700; margin-bottom: 4px; color: #0f1419;">${title}</div>
          <div style="font-size: 13px; color: #536471; line-height: 1.4;">${description}</div>
        </div>
      </div>
    `;
  } else if (platform === 'linkedin') {
    return `
      <div style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden; max-width: 400px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
        <img src="${image}" alt="${title}" style="width: 100%; height: 200px; object-fit: cover;" />
        <div style="padding: 12px 16px;">
          <div style="font-size: 13px; color: #65676b; margin-bottom: 4px; text-transform: uppercase;">${new URL(url).hostname}</div>
          <div style="font-size: 15px; font-weight: 600; margin-bottom: 4px; color: #000;">${title}</div>
          <div style="font-size: 12px; color: #65676b; line-height: 1.4;">${description}</div>
        </div>
      </div>
    `;
  }

  return '';
};
