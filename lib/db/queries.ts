import { pool } from './db'

export async function getRecipes() {
  const res = await pool.query('SELECT * FROM recipes')
  return res.rows
}

export async function getBottles() {
	const res = await pool.query('SELECT * FROM bottles')
	return res.rows
}

export async function getBottle(id: number) {
  const query = 'SELECT * FROM bottles WHERE id = $1'
  const values = [id]
  const res = await pool.query(query, values)
  return res.rows[0]
}
