-- Table: recipes
CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    expectedABV NUMERIC(5,2) NOT NULL,
    gravityOriginal NUMERIC(6,3) NOT NULL,
    urlPhoto TEXT,
    createdOn TIMESTAMP DEFAULT now()
);

-- Table: batches
CREATE TABLE batches (
    id SERIAL PRIMARY KEY,
    recipeId INTEGER NOT NULL REFERENCES recipes(id),
    name TEXT NOT NULL,
    descriptionFun TEXT,
    gravityFinal NUMERIC(6,3) NOT NULL,
    startFermentOn TIMESTAMP NOT NULL,
    secondFermentOn TIMESTAMP,
    createdOn TIMESTAMP DEFAULT now()
);

-- Table: glasswareTypes
CREATE TABLE glasswareTypes (
    id SERIAL PRIMARY KEY,
    volume NUMERIC(6,2) NOT NULL,
    urlPhoto TEXT,
    createdOn TIMESTAMP DEFAULT now()
);

-- Table: bottles
CREATE TABLE bottles (
    id SERIAL PRIMARY KEY,
    batchId INTEGER NOT NULL REFERENCES batches(id),
    glasswareTypeId INTEGER NOT NULL REFERENCES glasswareTypes(id),
    slug TEXT UNIQUE NOT NULL,
    isSterilized BOOLEAN DEFAULT FALSE,
    bottledOn TIMESTAMP NOT NULL,
    createdOn TIMESTAMP DEFAULT now()
);

-- Table: additionTypes
CREATE TABLE additionTypes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    createdOn TIMESTAMP DEFAULT now()
);

-- Table: sugarAdditionTypes
CREATE TABLE sugarAdditionTypes (
    id SERIAL PRIMARY KEY,
    additionTypesId INTEGER NOT NULL REFERENCES additionTypes(id) ON DELETE CASCADE,
    sweetnessFactor NUMERIC(5,2) NOT NULL,
    isReal BOOLEAN DEFAULT TRUE,
    createdOn TIMESTAMP DEFAULT now()
);

-- Table: additions
CREATE TABLE additions (
    id SERIAL PRIMARY KEY,
    bottleId INTEGER NOT NULL REFERENCES bottles(id) ON DELETE CASCADE,
    additionTypesId INTEGER NOT NULL REFERENCES additionTypes(id),
    amountInGrams NUMERIC(6,2) NOT NULL,
    createdOn TIMESTAMP DEFAULT now()
);

-- Table: flavors
CREATE TABLE flavors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    createdOn TIMESTAMP DEFAULT now()
);

-- Table: alcoholTypes
CREATE TABLE alcoholTypes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    createdOn TIMESTAMP DEFAULT now()
);

-- Table: flavorsToRecipes
CREATE TABLE flavorsToRecipes (
    id SERIAL PRIMARY KEY,
    flavorId INTEGER NOT NULL REFERENCES flavors(id) ON DELETE CASCADE,
    recipeId INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    createdOn TIMESTAMP DEFAULT now()
);

-- Table: users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    passwordHashed TEXT NOT NULL,
    createdOn TIMESTAMP DEFAULT now()
);
