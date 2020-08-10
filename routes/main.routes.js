const authenticateJWT = require('../middleware/authenticateJWT').authenticateJWT;
const jwt = require('jsonwebtoken');
const axios = require('axios');

module.exports = (app) => {
  //Index
  app.get('/', function (req, res) {
    const cookie = "Bearer " + req.cookies['authorization'];

    if (cookie) {
      const token = cookie.split(' ')[1];
      jwt.verify(token, process.env.SECRET_TOKEN, (err) => {
        if (err) {
          res.render('index'); //view
        } else {
          res.redirect('/main');
        }
      });
    } else {
      res.render('index'); //view
    }

  });

  //Movies
  app.get('/main', authenticateJWT, function (req, res) {


    async function getOMDBData() {

      var getMoreDataURL = 'http://localhost:' + process.env.PORT + '/omdb/searchFive/';
      var getMoreData = await axios.get(getMoreDataURL, {
        data: {
          "searchTitle": "friends",
          "year": "2000"
        },
        headers: {
          Cookie: "authorization=" + req.cookies['authorization']
        }
      });

      return getMoreData.data;
    }

    getOMDBData().then(data => {
      res.render('main', {
        user: req.user.usuario.username,
        data: data
      }); //view
    }).catch(err => console.log(err))

    /*     res.render('main', {
          user: req.user.usuario.username,
        }); //view */
  });

}