const movies = require('../api/movies.js');
const authenticateJWT = require('../middleware/auth').authenticateJWT;

module.exports = (app) => {

    // Create a new Note
    app.post('/movies', authenticateJWT, movies.create);

    // Retrieve all movies
    app.get('/movies', authenticateJWT, movies.findAll);

    // Retrieve a single Note with movieId
    app.get('/movies/:movieId', authenticateJWT, movies.findOne);

    // Update a Note with movieId
    app.put('/movies/:movieId', authenticateJWT, movies.update);

    // Delete a Note with movieId
    app.delete('/movies/:movieId', authenticateJWT, movies.delete);
}