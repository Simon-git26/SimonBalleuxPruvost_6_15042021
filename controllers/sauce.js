

exports.create = (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistrer' }))
    .catch(error => res.status(400).json({ error }));
    next();
};


exports.findAll = (req, res, next) => {
    const sauce = [
        {
            _id: 'oeihfzeoi',
            title: 'Mon premier objet',
            manufacturer: 'So Pekocko',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            ingredient: 'du poivre',
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Mon deuxième objet',
            manufacturer: 'So Pekocko',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            ingredient: 'du poivre',
            userId: 'qsomihvqios',
        },
    ];
    res.status(200).json(sauce);
};

