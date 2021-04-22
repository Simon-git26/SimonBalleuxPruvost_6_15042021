
//On importe Express
const express = require('express');

//Importer body parser
const bodyParser = require('body-parser');

//Importer Mongoose
const mongoose = require('mongoose');


//Importer le router
const userRoutes = require('./routes/user');

//Importer le router sauce
const sauceRoutes = require('./routes/sauce');

//Crée une constant qui sera notre application
const app = express();


//Mongoose conection a mon appli
mongoose.connect('mongodb+srv://Simon:Lamotodu26.@cluster0.6mtmj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


//-----------------------------------Les Middleware--------------------------------

 //------CORS----- cela permet a lappli d'acceder a l'API sans probleme
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());




//En,registrer le routes
app.use('/api/auth', userRoutes);

app.use('/api', sauceRoutes);

//Exporter cettte application pour que je puisse y accéder depuis les autre fichier de mon projet
module.exports = app;