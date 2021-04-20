const express = require('express');
const router = express.Router();

const controllerSauce = require('../controllers/sauce');




router.post('/sauces', controllerSauce.create);
router.get('/sauces', controllerSauce.findAll);



//Exporter le router
module.exports = router;