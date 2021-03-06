const Movie = require('../models/movie.js');


// Create and Save a new Movie
exports.create = (req, res) => {

    if (req.user.usuario.role !== 'ADMIN') {
        return res.status(403).send({
            message: "You have no pemission to do that"
        });
    }

    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Movie content can not be empty"
        });
    }

    // Create a Movie
    const movie = new Movie({
        title: req.body.title || "Untitled Movie", 
        content: req.body.content
    });

    // Save Movie in the database
    movie.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Movie."
        });
    });
};

// Retrieve and return all movies from the database.
exports.findAll = (req, res) => {
    Movie.find()
    .then(movies => {
        res.send(movies);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving movies."
        });
    });
    
};

// Find a single movie with a movieId
exports.findOne = (req, res) => {
    Movie.findById(req.params.movieId)
    .then(movie => {
        if(!movie) {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });            
        }
        res.send(movie);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving movie with id " + req.params.movieId
        });
    });
};

// Update a movie identified by the movieId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Movie content can not be empty"
        });
    }

    // Find movie and update it with the request body
    Movie.findByIdAndUpdate(req.params.movieId, {
        title: req.body.title || "Untitled movie",
        content: req.body.content
    }, {new: true})
    .then(movie => {
        if(!movie) {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });
        }
        res.send(movie);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "movie not found with id " + req.params.movieId
            });                
        }
        return res.status(500).send({
            message: "Error updating movie with id " + req.params.movieId
        });
    });
};

// Delete a movie with the specified movieId in the request
exports.delete = (req, res) => {
    Movie.findByIdAndRemove(req.params.movieId)
    .then(movie => {
        if(!movie) {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });
        }
        res.send({message: "Movie deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });                
        }
        return res.status(500).send({
            message: "Could not delete movie with id " + req.params.movieId
        });
    });
};
