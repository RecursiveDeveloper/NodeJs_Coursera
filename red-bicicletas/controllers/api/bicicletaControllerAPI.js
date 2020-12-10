var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function(req, res) {
    res.status(200).json({
        bicicletas : Bicicleta.allBicis
    }); 
}

/*exports.bicicleta_create = function(req, res) {
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat , req.body.lng];

    Bicicleta.add(bici);

    res.status(200).json({
        bicicleta : bici
    });
}*/ //Create antes de incorporar a Mongoose

exports.bicicleta_create = function(req, res){
  
    const bici = new Bicicleta();
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];
  
    Bicicleta.add(bici);
    res.status(200).json({bicicleta: bici});
}

exports.bicicleta_delete = function(req, res) {
    console.log('\n Entro');
    Bicicleta.allBicis(function(err, bicis) {
        console.log(bicis.length)  //Se estan creando bicicletas de más. revisar
        for (var i in bicis) {
            console.log(bicis[i]);
        }
    });
    console.log(req.body);
    
    console.log('\n');

    //Se le debe pasar un _id tipo object, si se le pasa un string no funciona, req.body_id debe ser object
    Bicicleta.removeByCode(req.body._id);
    res.status(204).send(); //No hay ningún contenido en la respuesta
}

exports.bicicleta_update = function(req, res) {
    var bici = Bicicleta.findById(req.body.id);

    bici.id = req.body.id
    bici.modelo = req.body.modelo
    bici.color = req.body.color
    bici.ubicacion = req.body.ubicacion

    res.status(200).json({
        bicicleta : bici
    });
}
