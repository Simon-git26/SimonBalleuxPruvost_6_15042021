const express = require('express');
const router = express.Router();

const controllerSauce = require('../controllers/sauce');

//Importer le Middleware de securiter auth
const auth = require('../middleware/auth');


//Importer multer
const multer = require('../middleware/multer-config');

router.post('/sauces', auth, multer, controllerSauce.create); // Crée une sauce

router.put('/sauces/:id', auth, multer, controllerSauce.modify); //Modifier un article

router.get('/sauces/:id', auth, controllerSauce.findOne); //Recuperer une sauce 

router.get('/sauces', auth, controllerSauce.findAll); // Recuperer toute les sauce

router.delete('/sauces/:id', auth, multer, controllerSauce.deleteOneObject); // Supprimer un produit



//Like Dislake de sauce
router.post('/sauces/:id/like', multer, controllerSauce.likeSauce);



//Exporter le router
module.exports = router;