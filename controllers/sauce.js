
const mongoose = require('mongoose');

//Importer le model mongoose Sauce
const Sauce = require('../models/Sauce');


//Crée un nouvel article
exports.create = (req, res, next) => {
    const objetSauce = JSON.parse(req.body.sauce);

    delete objetSauce._id;

    const sauce = new Sauce({
        title: objetSauce.name,
        manufacturer: objetSauce.manufacturer,
        description: objetSauce.description,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        ingredient: objetSauce.mainPepper,
        userId: objetSauce.userId
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error: error, message: "Erreur la" }));
};


//Modifier un article
exports.modify = (req, res, next) => {
    const sauceObjectModify = req.file ?
    { 
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObjectModify, _id: req.params.id })
    .then(() => res.status(200).json({ mesage: "Objet Modifié !"}))
    .catch(error => res.status(400).json({ error }));
};


//Obtenir la liste darticle
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