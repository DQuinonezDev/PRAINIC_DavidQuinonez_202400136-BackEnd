const { Router } = require('express');
const { crearPublicacion, obtenerPublicaciones, actualizarPublicacion, eliminarPublicacion} = require('../Controllers/publicacion');
const router = Router();
const verificarToken = require('../Middleware/auth');


router.post('/crearPublicacion',verificarToken, crearPublicacion);
router.get('/',verificarToken, obtenerPublicaciones);
router.put('/editar/:id', verificarToken, actualizarPublicacion);
router.delete('/eliminar/:id', verificarToken, eliminarPublicacion);

module.exports = router;