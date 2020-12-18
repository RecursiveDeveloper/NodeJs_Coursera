var Usuario = require('../../models/usuario');

exports.usuarios_list = function(req, res) {
    Usuario.find({}, function(err, usuarios) {
        res.status(200).json({
            usuarios: usuarios
        });
    });
}

exports.usuarios_create = function(req, res) {
    if(req.body.nombre != 'default' || req.body.email != 'default@gmail.com' || req.body.password != 'default') {
        var usuario = new Usuario({nombre: req.body.nombre, email: req.body.email, password: req.body.password});

        usuario.save(function(err) {
            if(err) return res.status(500).json(err);
            res.status(200).json(usuario);
        });
    }
}

exports.usuario_reservar = function(req, res) {
    console.log('R !!');
    console.log(req.body);
    console.log('R !!');
    Usuario.findByCode(req.body.id, function(err, usuario) {
        console.log(usuario);
        usuario.reservar(req.body.bici_id, req.body.desde, req.body.hasta, function(err) {
            console.log('Reserva !!');
            res.status(200).send();
        });
    });
}

//Usuario de ejemplo
/*const usuario = new Usuario({nombre: 'Ezequiel'});
usuario.save();*/