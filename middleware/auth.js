//Middleware dautentification

//package jsonwebtoken
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //recuperer le token dans le header autorization
        const token = req.headers.authorization.split(' ')[1];
        //decoder le token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        //extraire cette verification
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requete non authentifié !'});
    }
};