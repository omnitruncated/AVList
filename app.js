require('./config/config');
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


//Para manejar las cookies
app.use(cookieParser())

//Motor de vistas
app.set('view engine', 'pug');

// parse application/json
app.use(bodyParser.json())

// Configuracion global de rutas

require('./routes/movie.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/omdb.routes')(app);
require('./routes/main.routes')(app);

//Path de archivos estáticos
app.use(express.static(path.join(__dirname, './public')));


//-----------------------------
 
mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) throw err;
  console.log("Base de datos online");
});


app.listen(process.env.PORT, ()=> {
    console.log("Escuchando en puerto " + process.env.PORT);
});

module.exports = app;
