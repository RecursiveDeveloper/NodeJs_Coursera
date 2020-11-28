var map = L.map('main_map').setView([7.0675745,-73.1445733], 13);

//Obtenido de -> https://leafletjs.com/

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([7.0675740,-73.1445723]).addTo(map)
    .bindPopup('Bicicleta #1.')
    .openPopup();

L.marker([7.042500,-73.1345100]).addTo(map)
    .bindPopup('Bicicleta #2.')
    .openPopup();