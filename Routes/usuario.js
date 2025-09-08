const { Router } = require('express');
const { crearUsuario, } = require('../Controllers/usuario');
const router = Router();


router.post('/registro', crearUsuario);


module.exports = router;