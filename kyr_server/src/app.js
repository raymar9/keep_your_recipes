const express = require('express');
const recipeRouter = require('./controller/recipes_router');

const app = express();

app.set('x-powered-by', false);

// provide static content (website)
app.use(express.static('public'));

app.use('/', recipeRouter);

// Start backend application by listening on port...
app.listen(8081);
