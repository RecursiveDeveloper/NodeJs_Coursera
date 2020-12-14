var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', function() {
    
    beforeAll(function(done) {
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true});
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('We are connected to test database');
            done();
        });
    });

    afterEach(function(done) {
        Bicicleta.deleteMany({}, function(err, success) {
            if(err) console.log(err);
            done();
        });
    });

    describe('Bicicleta.createInstace', () => {
        it('Crea una instancia de Bicicleta', () => {
            var bici = Bicicleta.createInstance('verde', 'urbana', [7.074291, -74.095725]);
 
            expect(bici.color).toBe('verde');
            expect(bici.modelo).toBe('urbana');
            expect(bici.ubicacion[0]).toEqual(7.074291);
            expect(bici.ubicacion[1]).toEqual(-74.095725);
        });
    });

    describe('Bicicleta.allBicis', () => {
        it('Comienza vacia', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('Bicicleta.add', () => {
        it('Agrega solo una bici', (done) => {
            var aBici = new Bicicleta({color: 'verde', modelo: 'urbana', ubicacion: [7.074291, -75.095725]});
            Bicicleta.add(aBici, function(err, newBici) {
                if(err) console.log(err);
                Bicicleta.allBicis(function(err, bicis) {
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].color).toEqual(aBici.color);
                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('Debe devolver la bici con el id especificado', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({color:'azul', modelo:'urbana', ubicacion: [7.074291, -75.095725]});
                Bicicleta.add(aBici, function(err, newBici) {
                    if(err) console.log(err);

                    var aBici2 = new Bicicleta({color:'rojo', modelo:'urbana', ubicacion: [6.074291, -74.095725]});
                    Bicicleta.add(aBici2, function(err, newBici) {
                        if(err) console.log(err);
                        Bicicleta.findByCode(aBici2._id, function(error, targetBici) {
                            expect(targetBici._id).toEqual(aBici2._id);
                            expect(targetBici.color).toBe(aBici2.color);
                            expect(targetBici.modelo).toBe(aBici2.modelo);
                            done();
                        });
                    });
                });
            });
        });
    });

    describe('Bicicleta.removeByCode', () => {
        it('Debe eliminar la bici con el id especificado', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({color:'azul', modelo:'urbana', ubicacion: [7.074291, -75.095725]});
                Bicicleta.add(aBici, function(err, newBici) {
                    if(err) console.log(err);

                    var aBici2 = new Bicicleta({color:'rojo', modelo:'urbana', ubicacion: [6.074291, -74.095725]});
                    Bicicleta.add(aBici2, function(err, newBici) {
                        if(err) console.log(err);
                        Bicicleta.removeByCode(aBici2._id, function(error, targetBici) {
                            Bicicleta.findByCode(aBici2._id, function(error, targetBici){
                                expect(targetBici).toBeNull(); //No existe la bicicleta, ha sido eliminada
                                done();
                            });
                        });
                    });
                });
            });
        });
    });

});  


/*
beforeEach( () => { Bicicleta.allBicis = [] });

describe('Bicicleta.allBicis', () =>{
    it('comienza vacia', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it('agregamos una', () =>{
        expect(Bicicleta.allBicis.length).toBe(0); //Check previous state

        var a = new Bicicleta(1,'rojo','urbana',[7.074291, -73.095725]);
        Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1); //Check next state
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

describe('Bicicleta.findById', () => {
    it('Debe devolver la bici con Id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0); //Check previous state

        var bici1 = new Bicicleta(1,'rojo','urbana');
        var bici2 = new Bicicleta(2,'verde','montaña');
        Bicicleta.add(bici1);
        Bicicleta.add(bici2);

        var targetBici = Bicicleta.findById(1);

        expect(targetBici.id).toBe(1); //Check next state
        expect(targetBici.color).toBe(bici1.color);
        expect(targetBici.modelo).toBe(bici1.modelo);
    });
});

describe('Bicicleta.removeById', () => {
    it('Debe quitar una bicicleta con Id 2' , () =>{
        expect(Bicicleta.allBicis.length).toBe(0); //Check previous state

        var bici1 = new Bicicleta(1,'rojo','urbana');
        var bici2 = new Bicicleta(2,'verde','montaña');
        Bicicleta.add(bici1);
        Bicicleta.add(bici2);

        Bicicleta.removeById(2);

        expect(Bicicleta.allBicis.length).toBe(1); //Check next state
        expect(Bicicleta.allBicis[0]).toBe(bici1);
    });
});*/