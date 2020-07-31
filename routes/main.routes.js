const authenticateJWT = require('../middleware/authenticateJWT').authenticateJWT;


module.exports = (app) => {
//Index
app.get('/', function (req, res) {
    res.render('index'); //view
  });

  //Movies
  app.get('/main', authenticateJWT, function (req, res) {
    res.render('main', {user: req.user.usuario.username}); //view
  });

}