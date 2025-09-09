const CursoAprobado = require('../Models/cursoAprobado');

const agregarCursoAprobado = async (req, res) => {
    try {
        const { id_usuario, id_curso } = req.body;

        if (!id_usuario || !id_curso) {
            return res.status(400).json({ mensaje: 'id_usuario e id_curso son obligatorios' });
        }

        const yaExiste = await CursoAprobado.existe(id_usuario, id_curso);
        if (yaExiste) {
            return res.status(400).json({ mensaje: 'El curso ya fue aprobado por este usuario' });
        }

        await CursoAprobado.agregar({ id_usuario, id_curso });

        res.status(201).json({ mensaje: 'Curso aprobado agregado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerCursosAprobados = async (req, res) => {
    try {
        const { id_usuario } = req.params;

        if (!id_usuario) {
            return res.status(400).json({ mensaje: 'Se requiere id_usuario' });
        }

        const cursos = await CursoAprobado.obtenerPorUsuario(id_usuario);

        res.json(cursos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { agregarCursoAprobado, obtenerCursosAprobados };
