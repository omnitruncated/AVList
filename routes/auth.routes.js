const auth = require('../api/auth.js');
const authenticateJWT = require('../middleware/auth').authenticateJWT;

module.exports = (app) => {

    // Login
    app.post('/login', auth.login);

    // Register
    app.post('/register', auth.register);

    //Get refresh token
    app.post('/token', auth.token);

    //Logout
    app.post('/logout', authenticateJWT, auth.logout);


}