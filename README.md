# AV List

* APIs realizadas con Node.js y Express.js
* CRUD de peliculas y usuarios en mongoDB
* Registro y acceso por roles mediante JWT (Json web token) en cada endpoint
* Integración con API externa de películas ([OMDB](http://www.omdbapi.com/))
* Tests unitarios con Jest y Supertest
* Pug como motor de vistas con bootstrap
* Pantallas de registro, login y pantalla principal

*Pantalla principal: (Al ingresar hace una llamada al servicio de OMDB y muestra una búsqueda de 5 películas y 5 series)*

**Una vez descargado, ejecutar en terminal:**

```
npm install
```

**Para correr los tests con Jest y Supertest:**
```
npm test
```

> [!IMPORTANT]
>
> Para poder testear las funcionalidades, es importane tener instalado [mongoDB](https://www.mongodb.com/try/download/community?tck=docs_server).
>
>Luego, agregar en el server local de mongoDB los usuarios agregados dentro de usersDB.txt (o crear usuarios nuevos mediante el endpoint /register).
>
>Una vez configurado todo, para ingresar a la vista, correr la aplicacion con *[nodemon](https://nodemon.io/)* o el debugger de Node.js
>
>Se ejecutará en http://localhost:3000

# WORKING API ENDPOINTS

**Register (POST)**
http://localhost:3000/register


```json
{
    "role" : "ADMIN",
    "username" : "admin",
    "email" : "admin@mail.com",
    "password" : "hola"
}
```

**Login (POST)**
http://localhost:3000/login
```json
{
    "email" : "admin@mail.com",
    "password" : "hola"
}
```
**Search 5 movies and 5 Series with details in OMDB (GET)**
http://localhost:3000/omdb/searchFive
```json
{
	"searchTitle": "friends",
	"year":"2000"
}
```

**Search Movies and Series in OMDB (GET)**
http://localhost:3000/omdb/search
```json
{
	"title": "The Holy Mountain",
	"type": "movie",
	"year": "1973",
	"plot": "full"
}
```

**Create a new Movie (POST)**
http://localhost:3000/movies
```json
{
        "title": "Drive (2011)",
        "content": "A movie by Nicholas Winding Refn"
}
```
**Retrieve all movies (GET)**
http://localhost:3000/movies
```json
{}
```
**Retrieve a single movie with movieId (GET)**
http://localhost:3000/movies/:movieId

`http://localhost:3000/movies/5f2b5a79d379db3324a2f5ba`

**Update a Movie with movieId (PUT)**
http://localhost:3000/movies/:movieId
```json
{
	"title": "The Holy Mountain",
	"content": "Tarot will teach you how to create a soul"
}
```
**Delete a Movie with movieId (DELETE)**
http://localhost:3000/movies/:movieId

`http://localhost:3000/movies/5f2b5a79d379db3324a2f5ba`







