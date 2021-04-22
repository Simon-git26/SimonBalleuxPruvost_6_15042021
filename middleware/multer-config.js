
//Importation de multer
const multer = require('multer');

//dictionnaire des extensions de fichier
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

//Crée un objet de configuration pour multer
//la fonction diskStorage de multer dit qu'on enregistre sur le disque
const storage = multer.diskStorage({
    // destination va expliquer a multer dans quel dossier enregistrer les fichiers cest une fonction qui prend 3 argument, req fil et callback
    destination: (req, res, callback) => {
        callback(null, 'images')
    },
    //le deuxieme argument est filename cela explique quel nom est utilisé a multer donc fonction a 3 argument
    filename: (req, file, callback) => {
        //Il es possible davoir des espace dans le nom du fichier donc on elimine les espace et on les remplace par des _ avec la methode split et .join
        const name = file.originalname.split(' ').join('_')
        //Appliquez une extension au fichier donc retour a la ligne 6 pour crée les extensions
        const extension = MIME_TYPES[file.mimetype];
        //On appel le callback, et on crée le file name entier donc le name du dessus + date.now + un point + l'extension sdu fichier
        callback(null, name + Date.now() + '.' + extension);
    }
});

//On exporte notre middleware multer completmeent configuré, on appel multer on place notre objet storage et apel la methode single
// pour dire quil sagi dun fichier unique et on lui dit qui sagi de fichier images uniquement
module.exports = multer({ storage }).single('image');