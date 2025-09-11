const { Router } = require('express');
const { crearPublicacion, obtenerPublicaciones, actualizarPublicacion, eliminarPublicacion} = require('../Controllers/publicacion');
const router = Router();
const verificarToken = require('../Middleware/auth');


router.post('/crearPublicacion', verificarToken,crearPublicacion);
router.get('/', obtenerPublicaciones);
router.put('/editar/:id', actualizarPublicacion);
router.delete('/eliminar/:id', eliminarPublicacion);

module.exports = router;