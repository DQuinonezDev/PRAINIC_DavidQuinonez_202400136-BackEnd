const { Router } = require('express');
const { crearComentario, obtenerComentarios, actualizarComentario, eliminarComentario} = require('../Controllers/comentario');
const router = Router();
const verificarToken = require('../Middleware/auth');

router.post('/crearComentario',verificarToken, crearComentario);
router.get('/:id_publicacion',verificarToken, obtenerComentarios);
router.put('/editar/:id', verificarToken, actualizarComentario);
router.delete('/eliminar/:id', verificarToken, eliminarComentario);

module.exports = router;