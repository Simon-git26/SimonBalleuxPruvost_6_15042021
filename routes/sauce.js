const express = require('express');
const router = express.Router();

const controllerSauce = require('../controllers/sauce');



router.post('/api/sauces', controllerSauce.create);
//Tableau sauce
router.get('/api/sauces', controllerSauce.findAll);

//Exporter le router
module.exports = router;