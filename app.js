const express = require('express');
const db = require('./database.js');

const db_name = 'keep_your_recipes';

const app = express();

app.set('x-powered-by', false);

let db_client = new db.MongoDbHandler(db_name);
db_client.connect();

// static content
app.use(express.static('public'));

app.listen(8081);
