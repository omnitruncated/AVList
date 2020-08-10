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
      token = response.res.rawHeaders[3]; //debugger // save the token!
      done();
    });
});


describe('GET /', () => {
  // token not being sent - should respond with a 401
  test('It should require authorization', () => {
    return request(app)
      .get('/main')
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });
  // send the token - should respond with a 200
  test('It responds OK with text/html', () => {
    jest.setTimeout(30000);
    return request(app)
      .get('/main')
      .set('Cookie', token)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('text/html');

      });
  });
});