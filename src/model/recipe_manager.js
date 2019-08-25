const dbHandler = require('../utils/db_handler.js');
const config = require('../config.js').APP_CONFIG;

function Recipe(title, complexity, tags, ingredients, preparation, image) {
    this.title = title;
    if (complexity > 3) {
        this.complexity = 3;
    } else if (complexity < 1) {
        this.complexity = 1;
    }
    this.tags = tags.isArray() ? tags : undefined;
    this.ingredients = ingredients.isArray() ? ingredients : undefined;
    this.preparation = preparation;
    this.image = image;
}

function addRecipeToDatabase(recipe) {
    return dbHandler.insertEntry(recipe, config.recipeCollection);
}

function modifyDatabaseRecipe(recipeId, newRecipe) {
    return dbHandler.updateEntry({ _id: recipeId }, newRecipe, config.recipeCollection);
}

function removeRecipeFromDatabase(recipeId) {
    return dbHandler.removeEntry({ _id: recipeId }, config.recipeCollection);
}

function getAllRecipesFromDatabase() {
    return dbHandler.getEntries({}, config.recipeCollection);
}

async function getOneRecipeFromDatabase(recipeId) {
    let recipeArray;
    try {
        recipeArray = await dbHandler.getEntries({ _id: recipeId }, config.recipeCollection);
    } catch (error) {
        throw error;
    }
    if (recipeArray.length < 1) {
        throw Error('Could not find a recipe with this ID!');
    }
    return recipeArray[0];
}
