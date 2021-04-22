const express = require('express');
const router = express.Router();

const controllerSauce = require('../controllers/sauce');

/* //Importer le Middleware de securiter auth
const auth = require('../middleware/auth'); */


router.post('/sauces', controllerSauce.create);
router.get('/sauces', controllerSauce.findAll);



//Exporter le router
module.exports = router;