
const mongoose = require('mongoose');

//Importer le model mongoose Sauce
const Sauce = require('../models/Sauce');

//Importer package fs de node pour pouvoir accedez au systeme de fichier
const fs = require('fs');

//Crée un nouvel article
exports.create = (req, res, next) => {
    const objetSauce = JSON.parse(req.body.sauce);

    delete objetSauce._id;

    const sauce = new Sauce({
        name: objetSauce.name,
        manufacturer: objetSauce.manufacturer,
        description: objetSauce.description,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        mainPepper: objetSauce.mainPepper,
        heat: objetSauce.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        userId: objetSauce.userId
    });

    sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};


//Modifier un article
exports.modify = (req, res, next) => {
    const sauceObjectModify = req.file ? //? operateur ternaire pour savoir si res.file existe sil existe on aura un type dobjet sinon un autre type dobjet
    { 
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObjectModify, _id: req.params.id })
    .then(() => res.status(200).json({ mesage: "Objet Modifié !"}))
    .catch(error => res.status(400).json({ error }));
};


//Obtenir qu'une sauce avec id
exports.findOne = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
};


//Obtenir la liste darticle
exports.findAll = (req, res) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};




//Systeme de Like/Dislake
exports.likeSauce = (req, res, next) => {

    const reqBody = req.body;
    const like = reqBody.like;
    const userId = reqBody.userId;

    Sauce.findOne({ _id: req.params.id })
    

    .then(sauce => {
        //Si le users like la sauce il se passera:
        switch(like) {
            case +1:
                Sauce.updateOne( //Choisir l'article en question associé au user en question et envoyé le +1 Si user aime l'article
                    {_id: req.params.id},
                    {$push: {userLiked: userId}, $inc: {like: +1}},
                    console.log('Salut je suis +1')
                )
            .then(() => res.status(200).json({ message: "Sauce Liké !" }))
            .catch(error => res.status(400).json({ error }));
            break;

            case -1:
                Sauce.updateOne( //Choisir l'article en question associé au user en question et envoyé le -1 si user n'aime pas l'article
                    {_id: req.params.id},
                    {$push: {userDisliked: userId}, $inc: {dislike: -1}},
                    console.log('Bonjour je suis -1')
                )
            .then(() => res.status(200).json({ message: "Sauce Disliké !"}))
            .catch(error => res.status(400).json({ error }));
            break;


            case 0:
                Sauce.updateOne( //Choisir l'article en question associé au user en question et envoyé le 0 si user annule le choi qu'il a fait d'aimer ou non
                    {_id: req.params.id},
                    {$push: {userCancel: userId}, $inc: {cancel: 0}},
                    console.log('Oui jannule')
                )
                .then(() => res.status(200).json({ message: "Like/Dislike annulé !"}))
            .catch(error => res.status(400).json({ error }));
            break;
        }
    });
};


//Suprimer un article
exports.deleteOneObject = (req, res) => {
    //Avant de supprimé l'objet de la base on va aller le chercher pour avoir l'url de l'image donc trouvé lobjet dans la base de donnée
    Sauce.findOne({ _id: req.params.id })
    //Quand on le trouve on extrait le nom du fichier a supprimer
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        //Avec ce nom de fichier on le supprime avec fs.unlink
        //et dans le callback de fs.unlink donc une fois que la suppression est effectué, on fait la suppression de lobjet dans la base normalement
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Objet bien supprimé ! "}))
            .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));
};


