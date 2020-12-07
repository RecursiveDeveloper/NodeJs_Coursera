var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', function() {
    beforeAll( function(done) {
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
            var bici = Bicicleta.createInstance(1, 'verde', 'urbana', [7.074291, -73.095725]);
 
            expect(bici.code).toBe(1);
            expect(bici.color).toBe('verde');
            expect(bici.modelo).toBe('urbana');
            expect(bici.ubicacion[0]).toEqual(7.074291);
            expect(bici.ubicacion[1]).toEqual(-73.095725);
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
            var aBici = new Bicicleta({code: 1, color: 'verde', modelo: 'urbana'});
            Bicicleta.add(aBici, function(err, newBici) {
                if(err) console.log(err);
                Bicicleta.allBicis(function(err, bicis) {
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);
                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('Debe devolver la bici con code 1', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({code: 1, color:'verde', modelo:'urbana'});
                Bicicleta.add(aBici, function(err, newBici) {
                    if(err) console.log(err);

                    var aBici2 = new Bicicleta({code: 2, color:'rojo', modelo:'urbana'});
                    Bicicleta.add(aBici2, function(err, newBici) {
                        if(err) console.log(err);
                        Bicicleta.findByCode(1, function(error, targetBici) {
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);

                            done();
                        });
                    });
                });
            });
        });
    });

    describe('Bicicleta.removeByCode', () => {
        it('Debe eliminar la bici con code 1', (done) => {
            Bicicleta.allBicis(function(err, bicis) {
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({code: 1, color:'verde', modelo:'urbana'});
                Bicicleta.add(aBici, function(err, newBici) {
                    if(err) console.log(err);

                    var aBici2 = new Bicicleta({code: 2, color:'rojo', modelo:'urbana'});
                    Bicicleta.add(aBici2, function(err, newBici) {
                        if(err) console.log(err);
                        Bicicleta.removeByCode(1,function(error, targetBici) {
                            Bicicleta.findByCode(1, function(error, targetBici){
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