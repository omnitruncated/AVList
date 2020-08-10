// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Puerto
process.env.PORT = process.env.PORT || process.env.NODE_ENV === 'test' ? 3001 : 3000;

// BASE DE DATOS
let urlDB = "mongodb://localhost:27017/discovery";

if (process.env.NODE_ENV === 'dev') {
    urlDB = "mongodb://localhost:27017/discovery";
} else if (process.env.NODE_ENV === 'test') {
    urlDB = "mongodb://localhost:27017/discovery";
} else {
    urlDB = "here write the mongo connection with mongo atlas and other type of connection mode"
};

process.env.URLDB = urlDB;

// Vencimiento del token

process.env.CADUCIDAD_TOKEN = '1h';

// SEED de autenticación / Token Secreto

process.env.SECRET_TOKEN = process.env.SECRET_TOKEN || 'be-water-my-friend';


//SEED DE REFRESCO

process.env.REFRESH_TOKEN = process.env.REFRESH_TOKEN || 'be-shapeless-formless';