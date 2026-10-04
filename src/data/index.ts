import type { Category, Entry } from './types'
import { preface } from './preface'
import { phenomena } from './phenomena'
import { affliction } from './affliction'
import { locations } from './locations'
import { groups } from './groups'
import { documents } from './documents'
import { persons } from './persons'

export * from './types'
export { preface }

export const entries: Entry[] = [
  preface,
  ...phenomena,
  ...affliction,
  ...locations,
  ...groups,
  ...documents,
  ...persons,
]

export function getEntry(id: string): Entry | undefined {
  return entries.find((e) => e.id === id)
}

export function entriesByCategory(cat: Category): Entry[] {
  return entries.filter((e) => e.category === cat)
}

export const featuredEntries: Entry[] = entries.filter((e) => e.featured)

export const totalCount = entries.length
