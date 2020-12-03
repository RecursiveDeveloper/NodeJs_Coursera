var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

beforeEach( () => { Bicicleta.allBicis = [] });

describe('Bicicleta API', () => {
    describe('GET Bicicletas /', () => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);

            var a = new Bicicleta(1,'rojo','urbana',[7.074291, -73.095725]);
            Bicicleta.add(a);

            request.get('http://localhost:3000/api/bicicletas', function(error, response, body){
                expect(response.statusCode).toBe(200);
            });
        });
    });

    describe('POST Bicicletas /create', () => {
        it('Status 200', (done) =>{
            var headers = {'content-type' : 'application/json'};
            var aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat":-14, "lng": -54 }';
            request.post({
                headers : headers,
                url: 'http://localhost:3000/api/bicicletas/create',
                body: aBici
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe('rojo');
                done();
            });
        });
    });

    describe('DELETE Bicicletas /delete', () => {
        it('Status 204', (done) =>{
            var headers = {'content-type' : 'application/json'};

            var idBici = 4
            var a = new Bicicleta(idBici,'rojo','urbana',[7.074291, -73.095725]);
            Bicicleta.add(a);
            
            request.delete({
                headers : headers,
                url: 'http://localhost:3000/api/bicicletas/delete',
                body: '{ "id":'+idBici+'}'
            }, function(error, response, body) {
                expect(Bicicleta.allBicis.length).toBe(0);
                done();
            });
        });
    });

    describe('POST Bicicletas /update', () => {
        it('Status 200', (done) =>{
            var headers = {'content-type' : 'application/json'};

            var idBici = 4
            var a = new Bicicleta(idBici,'rojo','urbana',[7.074291, -73.095725]);
            Bicicleta.add(a);

            var aBici = '{ "id": 4, "color": "verde", "modelo": "montaña", "lat":-14, "lng": -54 }';
            request.post({
                headers : headers,
                url: 'http://localhost:3000/api/bicicletas/update',
                body: aBici
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(4).color).toBe('verde');
                expect(Bicicleta.findById(4).modelo).toBe('montaña');
                done();
            });
        });
    });
});