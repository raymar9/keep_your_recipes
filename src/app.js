const express = require('express');
const recipeManager = require('./model/recipe_manager');

const app = express();

app.set('x-powered-by', false);

// Routing

// provide static content
app.use(express.static('public'));
// for parsing application/json
app.use(express.json());

// REST routing
// GET all recipes
app.route('/recipes')
    .get((req, res, next) => {
        console.debug('GET request: get all recipes');
        recipeManager.getAllRecipesFromDatabase()
            .then((result) => res.json(result))
            .catch(next);
    })

    .post((req, res, next) => {
        console.debug('POST request: add new recipe');
        let rB = req.body;
        let newRecipe = new recipeManager.Recipe(rB.title, rB.complexity, rB.tags, rB.ingredients, rB. preparation, rB.image);
        recipeManager.addRecipeToDatabase(newRecipe)
            .then(() => res.sendStatus(201))
            .catch(next);
    })

// Start backend application by listening on port...
app.listen(8081);
