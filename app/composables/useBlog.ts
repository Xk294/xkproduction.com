export interface BlogSection {
  id: string
  heading: string
  body: string[]
  quote?: string
  callout?: string
  bullets?: string[]
  image?: string
  videoEmbed?: string
}

export interface BlogPost {
  slug: string
  title: string
  subtitle: string
  excerpt: string
  category: string
  icon: string
  author: string
  authorRole: string
  date: string
  isoDate: string
  readTime: string
  thumb: string
  cover: string
  content: string
  sections: BlogSection[]
  tags?: string[]
}

const postModules = import.meta.glob<BlogPost>('../../public/data/journal/*.json', { eager: true, import: 'default' })

const rawPosts: BlogPost[] = Object.entries(postModules)
  .filter(([path]) => !path.endsWith('/index.json'))
  .map(([, post]) => post)

const allBlogPosts: BlogPost[] = rawPosts.map(post => ({
  ...post,
  sections: post.sections || [],
  content: post.content || ''
}))

export const useBlog = () => {

  const getPostBySlug = (slug: string): BlogPost | undefined => {
    return allBlogPosts.find(p => p.slug === slug)
  }

  const getRelatedPosts = (slug: string, limit = 3) => {
    const post = allBlogPosts.find(p => p.slug === slug)
    if (!post) return allBlogPosts.slice(0, limit)

    const sameTagPosts = allBlogPosts
      .filter(p => p.slug !== slug)
      .map(p => ({
        post: p,
        score: (p.tags || []).filter(tag => post.tags?.includes(tag)).length + (p.category === post.category ? 2 : 0)
      }))
      .sort((a, b) => b.score - a.score)
      .map(item => item.post)

    return sameTagPosts.slice(0, limit)
  }

  return {
    allBlogPosts,
    getPostBySlug,
    getRelatedPosts
  }
}
