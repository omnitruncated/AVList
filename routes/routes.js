
const express = require('express');
const app = express()

app.use(require('../api/auth'));
app.use(require('../api/register'));
app.use(require('../services/omdb'));



//Index
app.get('/', function (req, res) {
    res.render('index'); //view
  });
  

module.exports = app;