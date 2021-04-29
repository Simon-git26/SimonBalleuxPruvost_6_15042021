//Importer Mongoose
const mongoose = require('mongoose');

//Crée le schéma de donnée
const sauceSchema = mongoose.Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    mainPepper: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: [String], required: false },
    usersDisliked: { type: [String], required: false },
    userId: { type: String, required: true }
});

//Exporter le model correspondant
module.exports = mongoose.model('Sauce', sauceSchema);
