import { Additions } from './additions'

export type Bottle = {
  id: number
  slug: string
  bottledOn: Date
  message?: string
  isPasteurized: boolean
  nameFirst: string
  descriptionFun: string
  gravityFinal: number
  startFermentOn: Date
  secondFermentOn?: Date
  nameLast?: string
  description: string
  expectedAbv: number
  gravityOriginal: number
  recipePhoto?: string
  volumeInMl: number
  glasswarePhoto?: string
  carbination: string
  carbs: number
  acidity: string
  sweetness: string
  additions: Additions
  standardDrinks: number
}
