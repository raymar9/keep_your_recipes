const express = require('express');

const app = express();

app.set('x-powered-by', false);

// static content
app.use(express.static('public'));

app.listen(8081);
