var Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = function(req, res) {
    Bicicleta.allBicis(function(err, bicis) {
        res.render('bicicletas/index', {bicis: bicis});
    });
}

exports.bicicleta_create_get = function(req, res) {
    res.render('bicicletas/create');
}

exports.bicicleta_create_post = function(req, res) {
    var bici = new Bicicleta(req.body.id,req.body.color,req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici);

    res.redirect('/bicicletas');
}

exports.bicicleta_update_get = function(req, res) {
    var bici = Bicicleta.findById(req.params.id);

    res.render('bicicletas/update', {bici});
}

exports.bicicleta_update_post = function(req, res) {
    var bici = Bicicleta.findById(req.params.id);
    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];

    var bici = new Bicicleta(req.body.id,req.body.color,req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici);

    res.redirect('/bicicletas');
}

exports.bicicleta_delete_post = function(req, res) {
    Bicicleta.removeById(req.body.id);

    res.redirect('/bicicletas');
}

exports.bicicleta_show_get = function(req, res) {
    var bici = Bicicleta.findById(req.params.id);
    console.log("Bici show")
    console.log(bici)
    res.render('bicicletas/show', {bici});
}