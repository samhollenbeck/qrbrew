import { camelCase } from 'change-case' // or lodash
import { Bottle } from '@/types/bottle'
import { getBottleFromSlug, getAdditionsBySlug } from './db/queries'
import {
  calculateAcidity,
  calculateCarbination,
  calculateCarbs,
  calculateSweetness,
} from './logic/nutrition'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toCamelCase(row: Record<string, any> | null | undefined): any {
  if (!row || typeof row !== 'object') return row; // Return as-is if null/undefined/not an object
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => [camelCase(key), value])
  );
}

export async function getBottleCompleteData(slug: string): Promise<Bottle | null> {
  const bottle = await getBottleFromSlug(slug)
  if (!bottle) return null

  const additions = await getAdditionsBySlug(slug)
  bottle.carbination = calculateCarbination(bottle.volumeInMl, bottle.isSterilized, additions)
  bottle.carbs = calculateCarbs(bottle.isSterilized, additions)
  bottle.acidity = calculateAcidity(bottle.volumeInMl, additions)
  bottle.sweetness = calculateSweetness(bottle.volumeInMl, bottle.isSterilized, additions)

  bottle.additions = additions

  return bottle
}
