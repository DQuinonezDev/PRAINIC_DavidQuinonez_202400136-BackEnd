const Usuario = require('../Models/usuario')
const bcrypt = require('bcryptjs');

const crearUsuario = async (req, res) => {
    try {
        const { registro_academico, nombres, apellidos, correo, contrasena } = req.body;

        if (!contrasena) {
            return res.status(400).json({ mensaje: 'La contraseña es obligatoria' });
        }

        // Validar duplicados
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

module.exports = { crearUsuario }