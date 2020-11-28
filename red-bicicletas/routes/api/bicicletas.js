var express = require('express')
var router = express.Router();
var bicicletasController = require('../../controllers/api/bicicletaControllerAPI');

router.get('/', bicicletasController.bicicleta_list);
router.post('/create', bicicletasController.bicicleta_create);
router.delete('/delete', bicicletasController.bicicleta_delete);

module.exports = router;