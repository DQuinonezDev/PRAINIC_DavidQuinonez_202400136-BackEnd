const { Router } = require('express');
const { crearProfesor, obtenerProfesores } = require('../Controllers/profesor');
const router = Router();

router.post('/crearProfesor', crearProfesor);
router.get('/', obtenerProfesores);

module.exports = router;