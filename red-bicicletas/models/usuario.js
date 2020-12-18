var mongoose = require('mongoose');
var Reserva =  require('./reserva');
var Schema = mongoose.Schema;
const saltRounds = 10;
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator');

const Token = require('../models/token');
const mailer = require('../mailer/mailer'); 

const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return re.test(email);
}

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio'],
        default: 'default'
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor, ingrese un email valido'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/],
        default: 'default@gmail.com'
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio'],
        default: 'default'
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    },
    googleId: String,
    facebookId: String
});

usuarioSchema.plugin(uniqueValidator, {message: 'El {PATH} ya existe con otro usuario'});

usuarioSchema.pre('save', function(next) { //Se ejecuta antes de llamar al save()
    try {
        if(this.isModified('password')){
            this.password = bcrypt.hashSync(this.password, saltRounds);
        }
        next();
    } catch (error) {
        return console.log(error);
    }
});

usuarioSchema.methods.validPassword = function(password) {
    try {
        /*console.log('\n Revision Password');
        console.log(bcrypt.compareSync(password, this.password));
        console.log(password + " ------ " + this.password);
        console.log('\n');*/
        return bcrypt.compareSync(password, this.password);
    } catch (error) {
        return console.log(error);
    }
}

usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    try {
        var reserva = new Reserva({usuario: this._id, bicicleta: biciId, desde: desde, hasta:hasta});
        console.log(reserva);
        reserva.save(cb);
    } catch (error) {
        return console.log(error);
    }
}

usuarioSchema.statics.findByCode = function(aCode, cb) {
    return this.findById(aCode, cb);
}

usuarioSchema.methods.enviar_email_bienvenida = function(cb) {
    const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    token.save(function (err) {
        if(err) { return console.log(err.message);}

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: email_destination,
            subject: 'verificacion de cuenta',
            text: 'Hola, \n\n' + 'Por favor, para verificar su cuenta haga click o copie y pegue en la barra de búsqueda de su navegador este link: \n\n' + 'http://localhost:3000'+'\/token/confirmation\/'+token.token+'\n'
        };

        mailer.sendMail(mailOptions, function(err) {
            if(err) { return console.log(err.message); }
            
            console.log('Se ha enviado un email de verificacion a '+ email_destination + '.')
        });
    });
}

usuarioSchema.methods.resetPassword = function(cb) {
    const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    token.save(function(err) {
        if(err) { return cb(err); }

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: email_destination,
            subject: 'Reseteo de password de cuenta',
            text: 'Hola, \n\n' + 'Por favor, para resetear el password de su cuenta haga click o copie y pegue en la barra de búsqueda de su navegador este link: \n\n' + 'http://localhost:3000'+'\/resetPassword\/'+token.token+'\n'
        };

        mailer.sendMail(mailOptions, function(err) {
            if(err) { return console.log(err.message); }
            
            console.log('Se ha enviado un email para resetear el password a: '+ email_destination + '.')
        });
        cb(null);
    });
}

usuarioSchema.statics.findOneOrCreateByGoogle = function findOneOrCreate(condition, callback) {
    const self = this;
    console.log(condition);
    self.findOne({
        $or: [
            {'googleId': condition.id}, {'email': condition.emails[0].value}
        ]}, (err, result) => {
            if(result) {
                callback(err, result);
            } else {
                console.log('----------- CONDITION -----------');
                console.log(condition);
                let values = {};
                values.googleId = condition.id;
                values.email = condition.emails[0].value;
                values.nombre = condition.displayName || 'SIN NOMBRE';
                values.verificado = true;
                values.password = condition._json.etag;
                console.log('----------- VALUES -----------');
                console.log(values);
                self.create(values, (err, result) => {
                    if(err) {console.log(err);}
                    return callback(err, result);
                });
            }
    });
}

usuarioSchema.statics.findOneOrCreateByFacebook = function findOneOrCreate(condition, callback) {
    const self = this;
    console.log(condition);
    self.findOne({
        $or: [
            {'facebookId': condition.id}, {'email': condition.emails[0].value}
        ]}, (err, result) => {
            if(result) {
                callback(err, result);
            } else {
                console.log('----------- CONDITION -----------');
                console.log(condition);
                let values = {};
                values.facebookId = condition.id;
                values.email = condition.emails[0].value;
                values.nombre = condition.displayName || 'SIN NOMBRE';
                values.verificado = true;
                values.password = crypto.randomBytes(16).toString('hex');
                console.log('----------- VALUES -----------');
                console.log(values);
                self.create(values, (err, result) => {
                    if(err) {console.log(err);}
                    return callback(err, result);
                });
            }
    });
}

module.exports = mongoose.model('Usuario', usuarioSchema);