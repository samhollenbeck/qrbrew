'use server'

import { pool } from '../db'
import bcrypt from 'bcrypt'

export async function registerUser(username: string, rawPassword: string) {
  const hashedPassword = await bcrypt.hash(rawPassword, 12)
  await pool.query('INSERT INTO users (username, password_hashed) VALUES ($1, $2)', [
    username,
    hashedPassword,
  ])
}
