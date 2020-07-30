require('./config/config');

const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//Motor de vistas
app.set('view engine', 'pug');

// parse application/json
app.use(bodyParser.json())

// Configuracion global de rutas
app.use(require('./routes/routes'));

require('./routes/movie.routes')(app);

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
    console.log("Escuchando en puerto 3000");
})