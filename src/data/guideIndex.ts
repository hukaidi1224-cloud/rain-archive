import type { GuideCategory, GuideEntry } from './guideTypes'
import { guideRules } from './guideRules'
import { guideZones } from './guideZones'
import { guideEntities } from './guideEntities'

export * from './guideTypes'
export { guideRules, guideZones, guideEntities }

export const guideEntries: GuideEntry[] = [...guideRules, ...guideZones, ...guideEntities]

export function getGuideEntry(id: string): GuideEntry | undefined {
  return guideEntries.find((e) => e.id === id)
}

export function guideByCategory(cat: GuideCategory): GuideEntry[] {
  return guideEntries.filter((e) => e.category === cat)
}

export const featuredGuide: GuideEntry[] = guideEntries.filter((e) => e.featured)

export const guideCount = guideEntries.length
