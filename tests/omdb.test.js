const request = require('supertest');
const app = require('../app'); // the express server

/*
  declare the token variable in a scope accessible
  by the entire test suite
*/
let token;

beforeAll((done) => {
  process.env.NODE_ENV = 'test'; //Corremos en el ambiente de test...

  request(app)
    .post('/login')
    .send({
      email: "admin@gmail.com",
      password: "hola"
    })
    .end((err, response) => {
      token = response.res.rawHeaders[3]; // save the token!
      done();
    });
});


describe('GET /omdb/searchFive', () => {
  // token not being sent - should respond with a 401
  test('It should require authorization', () => {
    return request(app)
      .get('/omdb/searchFive')
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });
  // send the token - should respond with a 200
  test('It responds with JSON', () => {
    jest.setTimeout(30000);
    return request(app)
      .get('/omdb/searchFive')
      .set('Cookie', token)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');

      });
  });
  test('Response has 5 movies', () => {
    jest.setTimeout(30000);
    return request(app)
      .get('/omdb/searchFive')
      .set('Cookie', token)
      .send({
        searchTitle: "friends",
        year: "2000"
      })
      .then((response) => {
        expect(response.body.data.movies.length).toBe(5);
        debugger
      });
  });
  test('Response has 5 series', () => {
    jest.setTimeout(30000);
    return request(app)
      .get('/omdb/searchFive')
      .set('Cookie', token)
      .send({
        searchTitle: "friends",
        year: "2000"
      })
      .then((response) => {
        expect(response.body.data.series.length).toBe(5);
        debugger
      });
  });

  test('Movies are sorted alphabetically, by rating and by date', () => {
    jest.setTimeout(30000);
    return request(app)
      .get('/omdb/searchFive')
      .set('Cookie', token)
      .send({
        searchTitle: "friends",
        year: "2000"
      })
      .then((response) => {
        var orderedData = response.body.data.movies;
          //MOVIES ORDER RESULT
          orderedData.sort(function (a, b) {

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
        expect(response.body.data.movies).toEqual(orderedData);
      });
  });

  test('Series are sorted by seasons and by nominations', () => {
    jest.setTimeout(30000);
    return request(app)
      .get('/omdb/searchFive')
      .set('Cookie', token)
      .send({
        searchTitle: "friends",
        year: "2000"
      })
      .then((response) => {
        var orderedData = response.body.data.series;
          //SERIES ORDER RESULT
          orderedData.sort(function (a, b) {

            //Cantidad de temporadas
            if (a.details.totalSeasons < b.details.totalSeasons) return -1;
            else if (a.details.totalSeasons > b.details.totalSeasons) return 1;
        
            //Nominaciones
            else if (a.details.Awards < b.details.Awards) return -1;
            else if (a.details.Awards > b.details.Awards) return 1;
        
            else return 0;
            
          });
        expect(response.body.data.series).toEqual(orderedData);
      });
  });

});


