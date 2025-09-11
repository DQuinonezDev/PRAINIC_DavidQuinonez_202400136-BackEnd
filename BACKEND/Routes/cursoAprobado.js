const { Router } = require('express');
const router = Router();
const { asignarCurso, obtenerCursosPorUsuario, eliminarCurso } = require('../Controllers/cursoAprobado');
const verificarToken = require('../Middleware/auth');

router.post('/asignar', verificarToken, asignarCurso);
router.get('/', verificarToken, obtenerCursosPorUsuario);
router.delete('/:id', verificarToken, eliminarCurso);

module.exports = router;
