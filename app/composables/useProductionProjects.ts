import type { XKProject, XKRelease, XKCapability } from '~/types/production'
import projectsRaw from '../../public/data/projects.json'
import releasesRaw from '../../public/data/releases.json'
import capabilitiesRaw from '../../public/data/capabilities.json'

export const xkProjects: XKProject[] = projectsRaw as XKProject[]
export const xkReleases: XKRelease[] = releasesRaw as XKRelease[]
export const xkCapabilities: XKCapability[] = capabilitiesRaw as XKCapability[]

export function useProductionProjects() {
  const getProjectBySlug = (slug: string): XKProject | undefined => {
    return xkProjects.find(p => p.slug === slug || p.id === slug)
  }

  const getFeaturedProjects = (): XKProject[] => {
    return xkProjects.filter(p => p.featured)
  }

  const getRelatedProjects = (currentSlug: string, limit = 3): XKProject[] => {
    return xkProjects.filter(p => p.slug !== currentSlug).slice(0, limit)
  }

  const getCapabilityBySlug = (slug: string): XKCapability | undefined => {
    return xkCapabilities.find(c => c.slug === slug || c.id === slug)
  }

  return {
    projects: xkProjects,
    releases: xkReleases,
    capabilities: xkCapabilities,
    getProjectBySlug,
    getFeaturedProjects,
    getRelatedProjects,
    getCapabilityBySlug
  }
}
