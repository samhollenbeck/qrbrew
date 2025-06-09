import { Pool } from 'pg'

const globalForPool = global as unknown as { pgPool: Pool }

if (!process.env.NEON_DATABASE_URL) {
  throw new Error('NEON_DATABASE_URL must be a Neon postgres connection string')
}

export const pool =
  globalForPool.pgPool ||
  new Pool({
    connectionString: process.env.NEON_DATABASE_URL,
  })

if (process.env.NODE_ENV !== 'production') globalForPool.pgPool = pool
