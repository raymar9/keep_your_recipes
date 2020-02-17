const dbHandler = require('../utils/db_handler.js');
const config = require('../config.js').APP_CONFIG;


dbHandler.initialize(config.databaseName);

function Recipe(title, complexity, tags, ingredients, preparation, image) {
    // mandatory properties
    this.title = validateTitle(title);
    this.complexity = validateComplexity(complexity);
    this.tags = validateTags(tags);
    // optional properties
    this.ingredients = validateIngredients(ingredients); // must be an array (>= 0 elements)
    this.preparation = isString(preparation) ? preparation.trim() : undefined;
    this.image = isString(image) ? image.trim() : undefined;
}

class RecipeValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

function addRecipeToDatabase(recipe) {
    if (!(recipe instanceof Recipe)) {
        throw new RecipeValidationError('Argument is not a recipe.');
    }
    return dbHandler.insertEntry(recipe, config.recipeCollection);
}

function modifyDatabaseRecipe(recipeId, recipeUpdate) {
    return dbHandler.updateEntryById(recipeId, validatePartialRecipe(recipeUpdate), config.recipeCollection);
}

function removeRecipeFromDatabase(recipeId) {
    return dbHandler.removeEntrybyId(recipeId, config.recipeCollection);
}

function getAllRecipesFromDatabase() {
    return dbHandler.getEntries({}, config.recipeCollection);
}

async function getOneRecipeFromDatabase(recipeId) {
    let entry = await dbHandler.getEntrybyId(recipeId, config.recipeCollection);
    if (!entry) {
        throw Error('Could not find a recipe with this ID.');
    }
    return entry;
}

function isString(obj) {
    return (typeof(obj) == 'string');
}

function validateTitle(str) {
    if (!isString(str) || str.trim().length == 0) {
        throw new Error("Recipe title not valid.");
    }
    return str.trim();
}

function validateComplexity(integer) {
    if ((typeof(integer) != 'number') || (integer > 3 || integer < 1)) {
        throw new Error("Recipe complexity not valid."); 
    }
    return integer;
}

function validateTags(tags) {
    if (!Array.isArray(tags)) throw new Error("Recipe tags is not array.");
    let vTags = [];
    tags.forEach(element => {
        if (isString(element) && element.length > 0) {
            let elTrimmed = element.trim();
            if (!/\s/.test(elTrimmed)) {
                // no whitespace in tag
                vTags.push(elTrimmed);
            }
        }
    });
    return vTags;
}

function validateIngredients(ingredients) {
    if (!Array.isArray(ingredients)) throw new Error("Recipe ingredients is not array.");
    let vIngredients = [];
    ingredients.forEach(element => {
        let elTrimmed = element.trim();
        if (!isString(elTrimmed) || elTrimmed.length == 0) {
            throw new Error("Recipe ingredients has a no string element.");
        }
        vIngredients.push(elTrimmed);
    });
    return vIngredients;
}

function validatePartialRecipe(obj) {
    let validObj = {};
    for (let key in obj) {
        switch (key) {
            case 'title':
                validObj[key] = validateTitle(obj[key]);
                break;
            case 'complexity':
                validObj[key] = validateComplexity(obj[key]);
                break;
            case 'tags':
                validObj[key] = validateTags(obj[key]);
                break;
            case 'ingredients':
                validObj[key] = validateIngredients(obj[key]);
                break;
            case 'preparation':
                validObj[key] = isString(obj[key]) ? obj[key].trim() : undefined;
                break;
            case 'image':
                validObj[key] = isString(obj[key]) ? obj[key].trim() : undefined;
                break;
        }
    }
    return validObj;
}

module.exports = {
    Recipe,
    RecipeValidationError,
    addRecipeToDatabase,
    modifyDatabaseRecipe,
    removeRecipeFromDatabase,
    getAllRecipesFromDatabase,
    getOneRecipeFromDatabase
}