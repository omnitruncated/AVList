const omdb = require('../services/omdb.js');
const authenticateJWT = require('../middleware/auth').authenticateJWT;

module.exports = (app) => {

    //search movies by title
    app.get('/search', authenticateJWT, omdb.search);


}