import { Bottle } from '@/types/Bottle'
import { SugarAdditions } from '@/types/SugarAdditions'

export function calculateTotalRealSugar(sugars: SugarAdditions): number {
  const totalGrams = sugars
    .filter((sugar) => sugar.isReal)
    .reduce((sum, sugar) => sum + sugar.amountInGrams, 0)

  return totalGrams
}

export function calculateCarbonation(
  bottle: Bottle,
  sugars: SugarAdditions
): 'none' | 'low' | 'moderate' | 'heavy' {
  if (bottle.sterilized) return 'none'

  const totalGrams = calculateTotalRealSugar(sugars)

  const volumeLiters = bottle.glassware_volume / 1000

  if (volumeLiters === 0) return 'none' // avoid division by zero

  const estimatedVolumesCO2 = totalGrams / (4 * volumeLiters)

  if (estimatedVolumesCO2 < 1.5) return 'low'
  if (estimatedVolumesCO2 < 2.5) return 'moderate'
  return 'heavy'
}

export function calculateCarbs(bottle: Bottle, sugars: SugarAdditions): number {
  if (!bottle.sterilized) return 0

  const totalGrams = calculateTotalRealSugar(sugars)

  return totalGrams
}

export function calculateAcidity(
  bottle: Bottle
): 'none' | 'light' | 'balanced' | 'bright' | 'bold' {
  const concentration = bottle.citricAcidInGrams / (bottle.glassware_volume / 1000) // g/L

  if (concentration === 0) return 'none'
  if (concentration < 0.5) return 'light'
  if (concentration < 1.5) return 'balanced'
  if (concentration < 3) return 'bright'
  return 'bold'
}
