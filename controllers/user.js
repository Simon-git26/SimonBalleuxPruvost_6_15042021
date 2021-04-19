//Le controller 
//Importer bcrypt
const bcrypt = require('bcrypt');

//Importer le jsonwebtoken
const jwt = require('jsonwebtoken');

const User = require('../models/User');

//Importer mes sauce route 
const sauce = require('../routes/sauce');


//enregistrement de new user
exports.signup = (req, res, next) => {
    //Hacher le mot de passe
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur crée !'}))
        .catch(error => res.status(400).json({ error}));
    })
    .catch(error => res.status(500).json({ error}));
};



// Conecter les user existant
//lA FONCTION LOGINE reucpere luser de la base qui correcpond a ladresse mail entré si email pas bon alors on renvoi une erreur on compare le mdp entré avec le hash 
//qui est garder la base de donné si cest pas bon on renvoi une erreur si elle est bonne cest que c ok donc on renvoi un userId et un TOKEN
exports.login = (req, res, next) => {
    console.log(req.body.email);

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé !'});
            }
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !'});
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h'}
                    )
                });
            })
            .catch(error => res.status(500).json({ error: "erreur 1" }));
        })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "erreur 2" });
    });

};