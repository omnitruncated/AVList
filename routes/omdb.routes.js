const omdb = require('../services/omdb.js');
const authenticateJWT = require('../middleware/authenticateJWT').authenticateJWT;

module.exports = (app) => {

    //search multple movies
    app.get('/omdb/search', authenticateJWT, omdb.search);

    app.get('/omdb/searchFive', authenticateJWT, omdb.searchFiveById);

}