
const mongoose = require('mongoose');

//Importer le model mongoose Sauce
const Sauce = require('../models/Sauce');



exports.create = (req, res, next) => {
    console.log(req.body);
    delete req.body._id;
    
    const sauce = new Sauce({
        title: req.body.title,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        ingredient: req.body.ingredient,
        userId: req.body.userId
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error: error, message: "Erreur la" }));
    next();
};


exports.findAll = (req, res) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error: "Une erreur ici !" }));
};




/*

//trouver un objeyt preci

app.get('/api/sauces/:id', (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
});

*/