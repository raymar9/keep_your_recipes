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
app.route('/recipes')
    // Get all recipes
    .get((req, res) => {
        console.debug('GET request: get all recipes');
        recipeManager.getAllRecipesFromDatabase()
            .then((result) => res.json(result))
            .catch((error) => {
                console.error(error.message);
                res.sendStatus(404);
            });
    })

    // Add new recipe
    .post((req, res) => {
        console.debug('POST request: add new recipe');
        let rB = req.body;
        let newRecipe = new recipeManager.Recipe(rB.title, rB.complexity, rB.tags, rB.ingredients, rB. preparation, rB.image);
        recipeManager.addRecipeToDatabase(newRecipe)
            .then(() => res.sendStatus(201))
            .catch((error) => {
                console.error(error.message);
                res.sendStatus(404);
            });
    });

    // Update recipe
app.put('/recipes/:recipeId', (req, res) => {
    console.debug('PUT request: modify recipe with ID: ' + req.params.recipeId);
    console.debug(JSON.stringify(req.body));
    recipeManager.modifyDatabaseRecipe(req.params.recipeId, req.body)
        .then(() => res.sendStatus(200))
        .catch((error) => {
            console.error(error.message);
            res.sendStatus(404);
        });
});

// Start backend application by listening on port...
app.listen(8081);
