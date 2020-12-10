var mongoose = require('mongoose');
const bicicleta = require('./bicicleta');
var Reserva =  require('./reserva');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: String,
});

usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    var reserva = new Reserva({usuario: this._id, bicicleta: biciId, desde: desde, hasta:hasta});
    console.log(reserva);
    reserva.save(cb);
}

usuarioSchema.statics.findByCode = function(aCode, cb) {
    return this.findById(aCode, cb);
}

module.exports = mongoose.model('Usuario', usuarioSchema);