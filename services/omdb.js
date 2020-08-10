const axios = require('axios');
const {
    response
} = require('express');
const isUndefined = require('../utils/utils').isUndefined;

//Get movie title data from omdb

exports.search = (req, res) => {

    const API_KEY = '&apikey=70d4d638';
    var searchTitle = '&s=' + isUndefined(req.body.searchTitle);
    var title = '&t=' + isUndefined(req.body.title);
    var type = '&type=' + isUndefined(req.body.type);
    var page = '&page=' + isUndefined(req.body.page);
    var year = '&y=' + isUndefined(req.body.year);
    var plot = '&plot=' + isUndefined(req.body.plot);
    var imdbID = '&i=' + isUndefined(req.body.imdbID);

    var url = 'http://omdbapi.com/?' + title + searchTitle + page + year + type + plot + imdbID + API_KEY;

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


exports.searchFiveById = (req, res) => {

    const API_KEY = '&apikey=70d4d638';
    var searchTitle = '&s=' + isUndefined(req.body.searchTitle);
    var title = '&t=' + isUndefined(req.body.title);
    var page = '&page=' + isUndefined(req.body.page);
    var year = '&y=' + isUndefined(req.body.year);
    var plot = '&plot=' + isUndefined(req.body.plot);

    var maxResults = 5;
    var getMovies = 'http://omdbapi.com/?' + title + searchTitle + page + year + '&type=movie' + plot + API_KEY;
    var getSeries = 'http://omdbapi.com/?' + title + searchTitle + page + year + '&type=series' + plot + API_KEY;


    getMovies = axios.get(getMovies).then((response) => response.data).catch((error) => error);
    getSeries = axios.get(getSeries).then((response) => response.data).catch((error) => error);

    axios.all([getMovies, getSeries]).then(axios.spread((...responses) => {

        //To set the max number of results...
        for (var i in responses) {
            responses[i].Search.length = maxResults;
        }

        data = {
            movies: responses[0].Search,
            series: responses[1].Search
        }

        getDetails(data);



    })).catch((error) => res.json({
        message: 'Ups! Hubo un error',
        error: error.message
    }));

    //Making a request by each IMDB ID in order to get every movie details and saving it inside every element of the array
    async function getDetails(responseData) {
        for (i in responseData.movies) {

            var imdbID = '&i=' + isUndefined(responseData.movies[i].imdbID);
            var type = '&type=' + isUndefined(responseData.movies[i].type);
            var getMoreDataURL = 'http://omdbapi.com/?' + type + plot + imdbID + API_KEY;
            var getMoreData = await axios.get(getMoreDataURL);

            responseData.movies[i].details = getMoreData.data;
        }

        for (i in responseData.series) {

            var imdbID = '&i=' + isUndefined(responseData.series[i].imdbID);
            var type = '&type=' + isUndefined(responseData.series[i].type);
            var getMoreDataURL = 'http://omdbapi.com/?' + type + plot + imdbID + API_KEY;
            var getMoreData = await axios.get(getMoreDataURL);

            responseData.series[i].details = getMoreData.data;
        }

        //MOVIES ORDER RESULT
        responseData.movies.sort(function (a, b) {

            //Por titulo alfabeticamente
            if (a.Title.toLowerCase() < b.Title.toLowerCase()) return -1;
            else if (a.Title.toLowerCase() > b.Title.toLowerCase()) return 1;

            //Por Rating
            else if (a.details.imdbRating < b.details.imdbRating) return -1;
            else if (a.details.imdbRating > b.details.imdbRating) return 1;

            //Por Fecha
            else if (new Date(a.details.Released) < new Date(b.details.Released)) return -1;
            else if (new Date(a.details.Released) > new Date(b.details.Released)) return 1;

            else return 0;
        });


        //SERIES ORDER RESULT
        responseData.series.sort(function (a, b) {

            //Cantidad de temporadas
            if (a.details.totalSeasons < b.details.totalSeasons) return -1;
            else if (a.details.totalSeasons > b.details.totalSeasons) return 1;

            //Nominaciones
            else if (a.details.Awards < b.details.Awards) return -1;
            else if (a.details.Awards > b.details.Awards) return 1;

            else return 0;

        });

        data = {
            movies: responseData.movies,
            series: responseData.series
        }

        res.json({
            message: 'Request received!',
            data: data
        })
    }


};