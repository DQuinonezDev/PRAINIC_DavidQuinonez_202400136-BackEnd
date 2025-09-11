const Usuario = require('../Models/usuario')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        const { correo, registro_academico, contrasena } = req.body;

        if ((!correo && !registro_academico) || !contrasena) {
            return res.status(400).json({ mensaje: 'Correo o registro académico y contraseña son obligatorios' });
        }

        // Busca por correo si viene, si no por carnet
        const usuario = correo
            ? await Usuario.buscarPorCorreo(correo)
            : await Usuario.buscarPorCarnet(registro_academico);

        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        if (!usuario.contrasena) return res.status(500).json({ mensaje: 'El usuario no tiene contraseña registrada' });

        const esValido = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!esValido) return res.status(401).json({ mensaje: 'Credenciales incorrectas' });

        const secret = process.env.JWT_SECRET || 'dev_secret_unsafe'; // evita undefined
        const token = jwt.sign(
            { id_usuario: usuario.id_usuario, correo: usuario.correo },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );

        res.json({
            mensaje: 'Login exitoso',
            token,
            id_usuario: usuario.id_usuario
        });
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

const obtenerPerfilUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const perfil = await Usuario.obtenerPerfil(id);
        if (!perfil) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.json(perfil);
    } catch (error) {
        console.error("❌ Error en obtenerPerfilUsuario:", error); 
        res.status(500).json({ error: error.message });
    }
};


const actualizarPerfilUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombres, apellidos, correo, contrasena } = req.body;

    const data = {};
    if (nombres) data.nombres = nombres;
    if (apellidos) data.apellidos = apellidos;
    if (correo) data.correo = correo;
    if (contrasena) {
      const bcrypt = require('bcryptjs');
      data.contrasena = await bcrypt.hash(contrasena, 10);
    }

    const actualizado = await Usuario.actualizarPerfil(id, data);
    if (!actualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Perfil actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { crearUsuario, loginUsuario, obtenerUsuarios, obtenerPerfilUsuario, actualizarPerfilUsuario }