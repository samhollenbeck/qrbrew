import { pool } from './db'

export async function getAllRecipes() {
  const res = await pool.query('SELECT * FROM recipes')
  return res.rows
}

export async function getAllBottles() {
  const query =
    `SELECT
      bottles.id AS bottle_id,
      bottles.slug,
      bottles.bottledOn,
      bottles.createdOn AS bottle_createdOn,

      batches.id AS batch_id,
      batches.name AS batch_name,
      batches.descriptionFun,
      batches.gravityFinal,
      batches.startFermentOn,
      batches.secondFermentOn,
      batches.createdOn AS batch_createdOn,

      recipes.id AS recipe_id,
      recipes.name AS recipe_name,
      recipes.description AS recipe_description,
      recipes.expectedABV,
      recipes.gravityOriginal,
      recipes.urlPhoto AS recipe_photo,
      recipes.createdOn AS recipe_createdOn,

      -- Glassware
      glasswareTypes.id AS glassware_id,
      glasswareTypes.volume AS glassware_volume,
      glasswareTypes.urlPhoto AS glassware_photo,
      glasswareTypes.createdOn AS glassware_createdOn

    FROM bottles
    JOIN batches ON bottles.batchId = batches.id
    JOIN recipes ON batches.recipeId = recipes.id
    JOIN glasswareTypes ON bottles.glasswareTypeId = glasswareTypes.id
    ORDER BY bottles.id;`
	const res = await pool.query(query)
	return res.rows
}

export async function getBottleFromSlug(slug: string) {
  const query =
    `SELECT
      bottles.id AS bottle_id,
      bottles.slug,
      bottles.bottledOn,
      bottles.createdOn AS bottle_createdOn,

      batches.id AS batch_id,
      batches.name AS batch_name,
      batches.descriptionFun,
      batches.gravityFinal,
      batches.startFermentOn,
      batches.secondFermentOn,
      batches.createdOn AS batch_createdOn,

      recipes.id AS recipe_id,
      recipes.name AS recipe_name,
      recipes.description AS recipe_description,
      recipes.expectedABV,
      recipes.gravityOriginal,
      recipes.urlPhoto AS recipe_photo,
      recipes.createdOn AS recipe_createdOn,

      -- Glassware
      glasswareTypes.id AS glassware_id,
      glasswareTypes.volume AS glassware_volume,
      glasswareTypes.urlPhoto AS glassware_photo,
      glasswareTypes.createdOn AS glassware_createdOn

    FROM bottles
    JOIN batches ON bottles.batchId = batches.id
    JOIN recipes ON batches.recipeId = recipes.id
    JOIN glasswareTypes ON bottles.glasswareTypeId = glasswareTypes.id

    WHERE bottles.slug = $1;`
  const values = [slug]
  const res = await pool.query(query, values)
  return res.rows[0]
}

export async function getSugarAdditionsBySlug(slug: string) {
  const query =
    `SELECT
      sugarAdditions.id AS sugar_addition_id,
      sugarAdditions.amountInGrams,
      sugarAdditions.createdOn AS sugar_addition_createdOn,

      sugarTypes.id AS sugar_type_id,
      sugarTypes.name AS sugar_type_name,
      sugarTypes.isReal,
      sugarTypes.createdOn AS sugar_type_createdOn

      FROM sugarAdditions
      JOIN bottles ON sugarAdditions.bottleId = bottles.id
      JOIN sugarTypes ON sugarAdditions.sugarTypesId = sugarTypes.id

      WHERE bottles.slug = $1;`
  const values = [slug]
  const res = await pool.query(query, values)
  return res.rows
}
