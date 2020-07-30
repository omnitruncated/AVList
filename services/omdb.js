const express = require('express');
const app = express();
const axios = require('axios');


app.get('/getMovies', function (req, res) {

    var title = req.body.name;
    var url = 'http://omdbapi.com/?' + 't=' + title + '&plot=full&apikey=70d4d638';

    function getMovies() {
        return axios.get(url).then(response => {
            // returning the data here allows the caller to get it through another .then(...)
            return response.data
        })
    }

    getMovies()
        .then(data => {
            res.json({
                message: 'Request received!',
                data
            })
        })
        .catch(err => console.log(err))


});

module.exports = app;