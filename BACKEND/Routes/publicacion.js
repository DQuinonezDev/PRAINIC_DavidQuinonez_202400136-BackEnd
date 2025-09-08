const { Router } = require('express');
const { crearPublicacion, obtenerPublicaciones } = require('../Controllers/publicacion');
const router = Router();
const verificarToken = require('../Middleware/auth');


router.post('/crearPublicacion',verificarToken, crearPublicacion);
router.get('/',verificarToken, obtenerPublicaciones);

module.exports = router;