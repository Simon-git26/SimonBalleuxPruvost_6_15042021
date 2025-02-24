
//On importe Express
const express = require('express');

//Importer Mongoose
const mongoose = require('mongoose');


//Importer le router
const userRoutes = require('./routes/user');

//Importer le router sauce
const sauceRoutes = require('./routes/sauce');


//PATH on importe pour le chemin pour que sa donne accé au chemin ligne 48
const path = require('path'); 

//Importer dotenv
require('dotenv').config();


//Importer helmet
const helmet = require('helmet');

//Crée une constant qui sera notre application
const app = express();

//Helmet installer
app.use(helmet());


//Rate Limit
const rateLimit = require('express-rate-limit');

const  apiLimiter  =  rateLimit ( { 
  windowMs : 15 * 60 * 1000 ,  // 15 minutes 
  max : 3 // nb dessaie 3
});

app.use("/api/auth/login", apiLimiter);

//Mongoose conection a mon appli
mongoose.connect(process.env.MONGO_ENV,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


//-----------------------------------Les Middleware--------------------------------

 //------CORS----- cela permet a lappli d'acceder a l'API sans probleme
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_APP_URL);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());


//Pour dire a express de servir le dossier images quand je fait une requete a /images je crée un middleware qui repond au requetes envoyé par images et qui serve 
//le dossier static image donc on utilise la methode express.static mais on ne connais pas le chemins a l'avance donc on fait un const path
app.use('/images', express.static(path.join(__dirname, 'images')));

//En,registrer le routes
app.use('/api/auth', userRoutes);

app.use('/api', sauceRoutes);

//Exporter cettte application pour que je puisse y accéder depuis les autre fichier de mon projet
module.exports = app;