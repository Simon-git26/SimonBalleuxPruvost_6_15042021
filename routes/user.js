// express pour crée un router
const express = require('express');

// Decalrer le router
const router = express.Router();


//Il faut le controler pour assossier les fonction au differente route
const userCtrl = require('../controllers/user');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);



//Exporter le router
module.exports = router;
