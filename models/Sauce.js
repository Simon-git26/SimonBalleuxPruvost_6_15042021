//Importer Mongoose
const mongoose = require('mongoose');

//Crée le schéma de donnée
const sauceSchema = mongoose.Schema({
    title: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    ingredient: { type: String, required: true },
    userId: { type: String, required: true },
});

//Exporter le model correspondant
module.exports = mongoose.model('Sauce', sauceSchema);
