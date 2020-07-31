const express = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const {
    isEmpty,
    isUndefined
  } = require('underscore');


const accessTokenSecret = process.env.SECRET_TOKEN;
const refreshTokenSecret = process.env.REFRESH_TOKEN;


var refreshTokens = [];

// login

exports.login = (req, res) => {
    let body = req.body;
    Usuario.findOne({
        email: body.email
    }, (erro, usuarioDB) => {
        if (erro) {
            return res.status(500).json({
                ok: false,
                err: erro
            })
        }
        // Verifica que exista un usuario con el mail escrito por el usuario.
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            })
        }
        // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            });
        }
        // Genera el token de autenticación
        let accessToken  = jwt.sign({
            usuario: usuarioDB,
        }, accessTokenSecret, {
            expiresIn: process.env.CADUCIDAD_TOKEN
        });

        //Genera token de refresh
        let refreshToken = jwt.sign({
            usuario: usuarioDB,
            role: usuarioDB.role
        }, refreshTokenSecret);

        refreshTokens.push(refreshToken);

        let options = {
            path:"/",
            sameSite:true,
            maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
            httpOnly: true, // The cookie only accessible by the web server
        }
    
        res.cookie('authorization',accessToken, options) 
   
  
       res.json({
            ok: true,
            usuario: usuarioDB,
            accessToken,
            refreshToken,
        })

    })
};

//token

exports.token = (req, res) => {
    const {  token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({
            username: user.username,
            role: user.role
        }, accessTokenSecret, {
            expiresIn: '20m'
        });

        res.json({
            accessToken
        });
    });
};

//register

exports.register = (req, res) => {
    let body = req.body;
    let { username, email, password, role } = body;
    let usuario = new Usuario({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
      role
    });
  usuario.save((err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
           ok: false,
           err,
        });
      }
      res.json({
            ok: true,
            usuario: usuarioDB
         });
      })
  };

  //logout
//Still need to improve this method...

exports.logout = (req, res) => {
    const {  token} = req.body;
    refreshTokens = refreshTokens.filter(token => t !== token);

    res.send("Logout successful");
};
