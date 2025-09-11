const { Router } = require('express');
const { crearUsuario, loginUsuario, obtenerUsuarios, obtenerPerfilUsuario, actualizarPerfilUsuario } = require('../Controllers/usuario');
const router = Router();
const verificarToken = require('../Middleware/auth');


router.post('/registro', crearUsuario);
router.post('/login', loginUsuario);
router.get('/', obtenerUsuarios);
router.get('/perfil/:id', verificarToken,obtenerPerfilUsuario);
router.put('/perfil/:id',verificarToken, actualizarPerfilUsuario);

module.exports = router;