//Verifica que el usuario esté logueado

const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.SECRET_TOKEN;
const middlewares = {

    authenticateJWT: (req, res, next) => {

        //Gets token from cookie
        const cookie = "Bearer " + req.cookies['authorization'];

        //Gets token from header authorization
        // const authHeader = req.headers.authorization;

        if (cookie) {
            const token = cookie.split(' ')[1];

            jwt.verify(token, accessTokenSecret, (err, user) => {
                if (err) {
                    return res.sendStatus(401);
                }

                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    }


};
module.exports = middlewares;