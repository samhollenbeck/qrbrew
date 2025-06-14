import { Additions } from './additions'

export type Bottle = {
  id: number
  slug: string
  bottledOn: Date
  note?: string
  isSterilized: boolean
  batchName: string
  descriptionFun: string
  gravityFinal: number
  startFermentOn: Date
  secondFermentOn?: Date
  recipeName: string
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
}
