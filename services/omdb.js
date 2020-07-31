const axios = require('axios');

//Get movie title data from omdb

exports.search = (req, res) => {

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


};

