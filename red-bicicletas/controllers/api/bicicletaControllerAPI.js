var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function(req, res) {
    Bicicleta.allBicis(function(err, bicis) {
        res.status(200).json({
            bicicletas : bicis
        }); 
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

    var bici = new Bicicleta();
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];
    
    Bicicleta.add(bici);
    res.status(200).json({bicicleta: bici});
}

exports.bicicleta_delete = function(req, res) {
    //Se pasa por body 'true' si se está en modo test, de lo contrario poner 'false' 
    //o cualquier otra cosa != 'true'
    if(req.body.test == 'true'){ 
        Bicicleta.allBicis(function(err, bicis) {
            if(bicis.length > 0){
                var aux = 0;
                for (var i in bicis) {
                    if(aux == (bicis.length-1)){
                        /*console.log('Entro')
                        console.log(aux);
                        console.log(bicis.length-1);
                        console.log('\n');*/
                        Bicicleta.removeByCode(bicis[i]._id, function(error, targetBici) {
                        });
                        break;
                    }
                    aux = aux+1;
                }
            }  
        });
    }else{
        Bicicleta.allBicis(function(err, bicis) {
            if(bicis.length > 0){
                for (var i in bicis) {
                    if(JSON.stringify(bicis[i]._id) == '"'+req.body._id+'"'){
                        Bicicleta.removeByCode(bicis[i]._id, function(error, targetBici) {
                        });
                    }
                }
            }  
        });
    }
    res.status(204).send(); //No hay ningún contenido en la respuesta
}

exports.bicicleta_update = function(req, res) {
    if(req.body.test == "true"){
        var a = new Bicicleta({color:"rojo",modelo:"montaña",ubicacion:[-10, -10]});
        Bicicleta.add(a, function(err, newBici) {
            /*console.log('\n');
            console.log(newBici);
            console.log('\n');*/
            Bicicleta.findByCode(a._id, function(error, targetBici){
                if(error) console.log(err);
                targetBici.color = req.body.color;
                targetBici.modelo = req.body.modelo;
                targetBici.ubicacion = [req.body.lat, req.body.lng];
                    
                res.status(200).json({
                    bicicleta : targetBici
                });
            });
            Bicicleta.removeByCode(a._id, function(error, targetBici) {
            });
        });
    }else{
        Bicicleta.allBicis(function(err, bicis) {
            if(bicis.length > 0){
                for (var i in bicis) {
                    if(JSON.stringify(bicis[i]._id) == '"'+req.body._id+'"'){
                        Bicicleta.findByCode(req.body._id, function(error, targetBici){
                            if(error) console.log(err);
                            targetBici.color = req.body.color;
                            targetBici.modelo = req.body.modelo;
                            targetBici.ubicacion = [req.body.lat, req.body.lng];
                            /*console.log('\n');
                            console.log(newBici);
                            console.log('\n');*/
                            res.status(200).json({
                                bicicleta : targetBici
                            });
                        });
                    }
                }
            }  
        });
    }
}
