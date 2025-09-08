const Usuario = require('../Models/usuario')
const bcrypt = require('bcryptjs');

const crearUsuario = async (req, res) => {
    try {
        const { registro_academico, nombres, apellidos, correo, contrasena } = req.body;

        if (!contrasena) {
            return res.status(400).json({ mensaje: 'La contraseña es obligatoria' });
        }

        // Validar si existen usuarios duplicados
        const usuarioYaExiste = await Usuario.existe(correo, registro_academico);
        if (usuarioYaExiste) {
            return res.status(400).json({ mensaje: 'El correo o registro académico ya están registrados' });
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10);

        const id = await Usuario.crear({
            registro_academico,
            nombres,
            apellidos,
            correo,
            contrasena: hashedPassword
        });

        res.status(201).json({ mensaje: 'Usuario creado', id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUsuario = async (req, res) => {
    try {
        const { registro_academico, contrasena } = req.body;

        if (!registro_academico || !contrasena) {
            return res.status(400).json({ mensaje: 'registro academico y contraseña son obligatorios' });
        }

        const usuario = await Usuario.buscarPorCarnet(registro_academico);

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        if (!usuario.contrasena) {
            return res.status(500).json({ mensaje: 'Error: el usuario no tiene contraseña registrada' });
        }

        const esValido = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!esValido) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        res.json({ mensaje: 'Login exitoso', usuario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.obtenerTodos();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { crearUsuario, loginUsuario, obtenerUsuarios }