import { toCamelCase } from '../helpers'
import { pool } from './db'

export async function getAllRecipes() {
  const res = await pool.query('SELECT * FROM recipes')
  return res.rows
}

export async function getAllBottles() {
  const query = `SELECT
      bottles.id,
      bottles.slug,
      bottles.bottled_on,
      bottles.is_sterilized,

      batches.name AS batch_name,
      batches.description_fun,
      batches.gravity_final,
      batches.start_ferment_on,
      batches.second_ferment_on,

      recipes.name AS recipe_name,
      recipes.description,
      recipes.expected_abv,
      recipes.gravity_original,
      recipes.url_photo AS recipe_photo,

      -- Glassware
      glassware_types.volume,
      glassware_types.url_photo AS glassware_photo

    FROM bottles
    JOIN batches ON bottles.batch_id = batches.id
    JOIN recipes ON batches.recipe_id = recipes.id
    JOIN glassware_types ON bottles.glassware_type_id = glassware_types.id
    ORDER BY bottles.id;`
  const res = await pool.query(query)
  return res.rows
}

export async function getBottleFromSlug(slug: string) {
  const query = `SELECT
      bottles.id,
      bottles.slug,
      bottles.bottled_on,
      bottles.is_sterilized,

      batches.name AS batch_name,
      batches.description_fun,
      batches.gravity_final,
      batches.start_ferment_on,
      batches.second_ferment_on,

      recipes.name AS recipe_name,
      recipes.description,
      recipes.expected_abv,
      recipes.gravity_original,
      recipes.url_photo AS recipe_photo,

      -- Glassware
      glassware_types.volume_in_ml,
      glassware_types.url_photo AS glassware_photo

    FROM bottles
    JOIN batches ON bottles.batch_id = batches.id
    JOIN recipes ON batches.recipe_id = recipes.id
    JOIN glassware_types ON bottles.glassware_type_id = glassware_types.id

    WHERE bottles.slug = $1;`
  const values = [slug]
  const res = await pool.query(query, values)
  return toCamelCase(res.rows[0])
}

export async function getAdditionsBySlug(slug: string) {
  const query = `SELECT
      additions.id,
      additions.amount_in_grams,
      addition_types.name,
      addition_types.type,
      sugar_addition_types.is_real,
      sugar_addition_types.sweetness_factor
    FROM additions
    JOIN bottles ON additions.bottle_id = bottles.id
    JOIN addition_types ON additions.addition_types_id = addition_types.id
    LEFT JOIN sugar_addition_types
      ON sugar_addition_types.addition_types_id = addition_types.id
    WHERE bottles.slug = $1;`
  const values = [slug]
  const res = await pool.query(query, values)
  return res.rows.map(toCamelCase)
}
