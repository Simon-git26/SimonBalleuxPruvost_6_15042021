//Importer mongoose
const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');


//Rajouter le validateur comme plugins au schema
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    //unique true fait que les user ne peuvent pas s'incrire avec la meme adress
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true}
});


//Apliquer le validator
userSchema.plugin(uniqueValidator);

//Exporter le schema sous forme de model 
module.exports = mongoose.model('User', userSchema);