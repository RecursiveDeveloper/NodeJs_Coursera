var Bicicleta = require('../../models/bicicleta');

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
});