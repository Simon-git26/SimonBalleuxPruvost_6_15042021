const express = require('express');
const router = express.Router();

const controllerSauce = require('../controllers/sauce');

//Importer le Middleware de securiter auth
const auth = require('../middleware/auth');


//Importer multer
const multer = require('../middleware/multer-config');

router.post('/sauces', auth, multer, controllerSauce.create);

router.put('/sauces/:id', auth, multer, controllerSauce.modify);

router.get('/sauces', auth, controllerSauce.findAll);



//Exporter le router
module.exports = router;