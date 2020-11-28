var map = L.map('main_map').setView([7.0613441,-73.0828505,12], 13);

//Obtenido de -> https://leafletjs.com/

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([7.074291, -73.095725]).addTo(map)
    .bindPopup('Bicicleta #1.')
    .openPopup();

L.marker([7.058004, -73.087066]).addTo(map)
    .bindPopup('Bicicleta #2.')
    .openPopup();

L.marker([7.087353, -73.109521]).addTo(map)
    .bindPopup('Bicicleta #3.')
    .openPopup();

L.marker([7.075564, -73.091438]).addTo(map)
    .bindPopup('Bicicleta #4.')
    .openPopup();