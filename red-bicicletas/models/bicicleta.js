var Bicicleta = function(id,color,modelo,ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

Bicicleta.prototype.toString = function() {
    return 'id: '+this.id + '| color: '+this.color + '| modelo: '+this.modelo;
}

Bicicleta.allBicis = [];
Bicicleta.add = function(aBici) {
    Bicicleta.allBicis.push(aBici);
}

Bicicleta.findById = function(aBiciId) {
    var aBici = Bicicleta.allBicis.find(x => x.id == aBiciId);
    if(aBici){
        return aBici;
    }else{
        throw new Error(`No existe una bicicleta con el id ${aBiciId}`);
    }
}

Bicicleta.removeById = function(aBiciId) {
    for(var i = 0; i < Bicicleta.allBicis.length; i++){
        if(Bicicleta.allBicis[i].id == aBiciId){
            Bicicleta.allBicis.splice(i,1);
            break;
        }
    }
}

var a = new Bicicleta(1,'rojo','urbana',[7.074291, -73.095725]);
var b = new Bicicleta(2,'blanca','urbana',[7.058004, -73.087066]);
var c = new Bicicleta(3,'azul','urbana',[7.087353, -73.109521]);
var d = new Bicicleta(4,'amarilla','urbana',[7.075564, -73.091438]);

Bicicleta.add(a);
Bicicleta.add(b);
Bicicleta.add(c);
Bicicleta.add(d);

module.exports = Bicicleta;