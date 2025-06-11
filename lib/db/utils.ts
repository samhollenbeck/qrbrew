import crypto from 'crypto'

export function createSlug(size: number): string {
  return crypto.randomBytes(size).toString('hex')
}
