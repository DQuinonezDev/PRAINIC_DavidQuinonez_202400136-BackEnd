const { Router } = require('express');
const { crearUsuario, loginUsuario, obtenerUsuarios, obtenerPerfilUsuario } = require('../Controllers/usuario');
const router = Router();


router.post('/registro', crearUsuario);
router.post('/login', loginUsuario);
router.get('/', obtenerUsuarios);
router.get('/perfil/:id', obtenerPerfilUsuario);

module.exports = router;