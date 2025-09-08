const { Router } = require('express');
const { crearUsuario, loginUsuario, obtenerUsuarios } = require('../Controllers/usuario');
const router = Router();


router.post('/registro', crearUsuario);
router.post('/login', loginUsuario);
router.get('/', obtenerUsuarios);


module.exports = router;