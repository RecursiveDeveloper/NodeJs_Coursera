var Bicicleta = require('../../models/bicicleta');
var mongoose = require('mongoose');
var request = require('request');
//var server = require('../../bin/www');
var base_url = "http://localhost:3000/api/bicicletas"

describe('Bicicleta API', function() {

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

    describe('GET Bicicletas /', () => {
        it('Status 200', () => {
            request.get('http://localhost:3000/api/bicicletas', function(error, response, body){
                if(error) console.log(error);
                expect(response.statusCode).toBe(200);
                //console.log(body);
            });
        });
    });

    describe('POST Bicicletas /create', () => {
        it('Status 200', (done) => {
            var headers = {'content-type' : 'application/json'};
            var aBici = '{"color": "rojo", "modelo": "urbana", "lat":-14, "lng": -54}';
 
            request.post({
                headers : headers,
                url: base_url+'/create',
                body: aBici
            }, function(error, response, body) {
                if(error) console.log(error);
                id_response = body.substring(43,67);
                //console.log(body.substring(43,67)); //Busca el _id de la bicicleta creada
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe('DELETE Bicicletas /delete', () => {
        it('Status 204', (done) =>{

            var headers = {'content-type' : 'application/json'};

            var a = new Bicicleta({color:'rojo',modelo:'urbana',ubicacion:[7.074291, -73.095725]});
            Bicicleta.add(a, function(err, newBici) {

                if(err) console.log(err);
                Bicicleta.allBicis(function(err, bicis) {
                    if(err) console.log(err);
                    expect(bicis.length).toBe(1);
                    //console.log(bicis);
                    id_bicicleta = bicis[0]._id;

                    request.delete({
                        headers : headers,
                        url: base_url+'/delete',
                        body: '{ "_id" : "'+id_bicicleta+'", "test": "true"}'
                    }, function(error, response, body) {
                        if(error) console.log(err);
                        Bicicleta.removeByCode(id_bicicleta, function(error, targetBici) {
                            expect(response.statusCode).toBe(204);
                            Bicicleta.findByCode(id_bicicleta, function(error, targetBici){
                                expect(targetBici).toBeNull(); //No existe la bicicleta, ha sido eliminada
                                done();
                            });
                        });
                    });
                });
            });
        });
    });

    describe('POST Bicicletas /update', () => {
        it('Status 200', (done) =>{
            var headers = {'content-type' : 'application/json'};

            var a = new Bicicleta({color:"rojo",modelo:"montaña",ubicacion:[-10, -10]});
            Bicicleta.add(a, function(err, newBici) {

                var bBici = '{ "_id" :"'+newBici._id+'", "color": "verde", "modelo": "urbana", "lat":-30, "lng": -66, "test":"true"}';
                request.post({
                    headers : headers,
                    url: base_url+'/update',
                    body: bBici
                }, function(error, response, body) {
                    if(error) console.log(err);

                    Bicicleta.findByCode(newBici._id, function(error, targetBici){
                        if(error) console.log(err);
                        targetBici.color = "verde";
                        targetBici.modelo = "urbana";
                        targetBici.ubicacion[0] = -30;
                        targetBici.ubicacion[1] = -30;
                        
                        /*console.log('\n');
                        console.log(targetBici);
                        console.log('\n');*/
                        done();
                    });
                });
            });
        });
    });

});