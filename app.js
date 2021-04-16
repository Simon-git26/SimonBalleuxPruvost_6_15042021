
//On importe Express
const express = require('express');

//Importer body parser
const bodyParser = require('body-parser');

//Importer Mongoose
const mongoose = require('mongoose');

//Importer le model mongoose Sauce
const Sauce = require('./models/Sauce');


//Importer le router
const userRoutes = require('./routes/user');


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



app.post('/api/new-sauce', (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistrer' }))
    .catch(error => res.status(400).json({ error }));
});


//Tableau sauce
app.use('api/new-sauce', (req, res, next) => {
    const sauce = [
        {
            _id: 'oeihfzeoi',
            title: 'Mon premier objet',
            manufacturer: 'So Pekocko',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            ingredient: 'du poivre',
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Mon deuxième objet',
            manufacturer: 'So Pekocko',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            ingredient: 'du poivre',
            userId: 'qsomihvqios',
        },
    ];
    res.status(200).json(sauce);
});


//En,registrer le routes
app.use('/api/auth', userRoutes);

//Exporter cettte application pour que je puisse y accéder depuis les autre fichier de mon projet
module.exports = app;