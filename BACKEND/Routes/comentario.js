const { Router } = require('express');
const { crearComentario, obtenerComentarios } = require('../Controllers/comentario');
const router = Router();
const verificarToken = require('../Middleware/auth');

router.post('/crearComentario',verificarToken, crearComentario);
router.get('/:id_publicacion',verificarToken, obtenerComentarios);

module.exports = router;