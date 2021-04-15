
//On importe Express
const express = require('express');

//Crée une constant qui sera notre application
const app = express();



//-----------------------------------Les Middleware--------------------------------

app.use((req, res, next) => {
    console.log('Requete recu');
    //Pour renvoyé une réponse et passer au prochain middleware mettre la methode next()
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});


//Crée une route pour notre application pour avoir une réponse du serveur !
app.use((req, res, next) => {
    res.json({ message: 'Votre requete à bien été recu !'});
    next();
});

app.use((req, res) => {
    console.log('Réponse a été envoyé avec succé');
});




//Exporter cettte application pour que je puisse y accéder depuis les autre fichier de mon projet
module.exports = app;