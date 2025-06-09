import { pool } from './db'

export async function getRecipes() {
  const res = await pool.query('SELECT * FROM recipes')
  return res.rows
}

export async function getBottles() {
	const res = await pool.query('SELECT * FROM bottles')
	return res.rows
  }
