
//On importe Express
const express = require('express');

//Importer body parser
const bodyParser = require('body-parser');


//Crée une constant qui sera notre application
const app = express();



//-----------------------------------Les Middleware--------------------------------

 //------CORS----- cela permet a lappli d'acceder a l'API sans probleme
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

//Le lien vers notre page
app.post('/api/auth/login', (req, res, next) => {
   console.log(req.body);
   res.status(201).json({
       message: 'Objet crée !'
   });
});


//Exporter cettte application pour que je puisse y accéder depuis les autre fichier de mon projet
module.exports = app;