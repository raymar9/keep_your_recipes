const express = require('express');
const recipeManager = require('../model/recipe_manager');

const router = express.Router();

router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// for parsing application/json
router.use(express.json());

// REST interface routing

router.route('/recipes')
    // Get all recipes
    .get((_, res) => {
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
        let newRecipe;
        try {
            newRecipe = new recipeManager.Recipe(rB.title, rB.complexity, rB.tags, rB.ingredients, rB. preparation, rB.image);
        } catch (error) {
            console.error(error.message);
            res.status(403).send('Validation error: ' + error.message);
        }
        recipeManager.addRecipeToDatabase(newRecipe)
            .then(() => res.sendStatus(201))
            .catch((error) => {
                console.error(error.message);
                res.sendStatus(404);
            });
    });

router.route('/recipes/:recipeId')
    // Get a specific recipe
    .get((req, res) => {
        console.debug('GET request: get recipe with ID: ' + req.params.recipeId);
        recipeManager.getOneRecipeFromDatabase(req.params.recipeId)
            .then((result) => res.json(result))
            .catch((error) => {
                console.error(error.message);
                res.sendStatus(404);
            });
    })

    // Update recipe
    .put((req, res) => {
        console.debug('PUT request: modify recipe with ID: ' + req.params.recipeId);
        recipeManager.modifyDatabaseRecipe(req.params.recipeId, req.body)
            .then(() => res.sendStatus(200))
            .catch((error) => {
                console.error(error.message);
                if (error instanceof recipeManager.RecipeValidationError) {
                    res.status(403).send('Validation error: ' + error.message);
                } else {
                    res.sendStatus(404);
                }
            });
    })

    // Remove recipe
    .delete((req, res) => {
        console.debug('DELETE request: remove recipe with ID: ' + req.params.recipeId);
        recipeManager.removeRecipeFromDatabase(req.params.recipeId)
            .then(() => res.sendStatus(200))
            .catch((error) => {
                console.error(error.message);
                res.sendStatus(404);
            });
    });

module.exports = router