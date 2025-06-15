import { Additions as Additions } from '@/types/additions'

export function calculateTotalRealSugar(additions: Additions): number {
  const totalGrams = additions?.length
    ? additions
        .filter((addition) => addition.isReal)
        .reduce((sum, addition) => sum + addition.amountInGrams, 0)
    : 0
  return totalGrams
}

export function calculateCitricAcid(additions: Additions): number {
  const totalGrams = additions?.length
    ? additions
        .filter((addition) => addition.name === 'citric acid')
        .reduce((sum, addition) => sum + addition.amountInGrams, 0)
    : 0
  return totalGrams
}

export function calculateCarbination(
  volume: number,
  isSterilized: boolean,
  additions: Additions
): 'none' | 'low' | 'moderate' | 'heavy' {
  if (isSterilized) return 'none'

  const totalGrams = calculateTotalRealSugar(additions)

  const volumeLiters = volume / 1000

  if (volumeLiters === 0) return 'none' // avoid division by zero

  const estimatedVolumesCO2 = totalGrams / (4 * volumeLiters)

  if (estimatedVolumesCO2 < 1.5) return 'low'
  if (estimatedVolumesCO2 < 2.5) return 'moderate'
  return 'heavy'
}

export function calculateCarbs(isSterilized: boolean, additions: Additions): number {
  if (!isSterilized) return 0

  const totalGrams = calculateTotalRealSugar(additions)

  return totalGrams
}

export function calculateAcidity(
  volume: number,
  additions: Additions
): 'none' | 'light' | 'balanced' | 'crisp' | 'bright' | 'bold' {
  const concentration = calculateCitricAcid(additions) / (volume / 1000) // g/L

  if (concentration === 0) return 'none'
  if (concentration < 1) return 'light'
  if (concentration < 1.5) return 'balanced'
  if (concentration < 2.25) return 'crisp'
  if (concentration < 3.5) return 'bright'
  return 'bold'
}

export function calculateSweetness(
  volume: number,
  isSterilized: boolean,
  additions: Additions
): 'dry' | 'off-dry' | 'semi-sweet' | 'sweet' | 'super-sweet' {
  const totalPerceivedSweetness = additions?.length
    ? additions
        .filter((addition) => {
          const isSugar = addition.type === 'sugar'
          const survivesFermentation = isSterilized || !addition.isReal
          return isSugar && survivesFermentation
        })
        .reduce((sum, addition) => sum + addition.amountInGrams * addition.sweetnessFactor, 0)
    : 0

  const volumeLiters = volume / 1000

  if (volumeLiters === 0) return 'dry' // avoid division by zero

  const sweetnessPerLiter = totalPerceivedSweetness / volumeLiters

  // You can tune these thresholds to match your palate or sensory testing
  if (sweetnessPerLiter < 10) return 'dry'
  if (sweetnessPerLiter < 25) return 'off-dry'
  if (sweetnessPerLiter < 55) return 'semi-sweet'
  if (sweetnessPerLiter < 70) return 'sweet'
  return 'super-sweet'
}
