const { Router } = require('express');
const { crearCurso, obtenerCursos } = require('../Controllers/curso');
const router = Router();

router.post('/crearCurso', crearCurso);
router.get('/', obtenerCursos);

module.exports = router;