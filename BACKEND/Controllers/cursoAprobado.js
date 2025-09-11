const CursoAprobado = require('../Models/cursoAprobado');

const asignarCurso = async (req, res) => {
    try {
        const { id_curso } = req.body;
        const { id_usuario } = req.usuario; // viene del token

        if (!id_curso) {
            return res.status(400).json({ mensaje: 'El id_curso es obligatorio' });
        }

        await CursoAprobado.asignar({ id_usuario, id_curso });
        res.status(201).json({ mensaje: 'Curso aprobado asignado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const obtenerCursosPorUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.usuario; // del token
        const cursos = await CursoAprobado.obtenerPorUsuario(id_usuario);
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarCurso = async (req, res) => {
    try {
        const { id } = req.params; // id_curso
        const { id_usuario } = req.usuario;

        const ok = await CursoAprobado.eliminar({ id_usuario, id_curso: id });
        if (!ok) return res.status(404).json({ mensaje: 'No se encontró el curso aprobado' });

        res.json({ mensaje: 'Curso aprobado eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { asignarCurso, obtenerCursosPorUsuario, eliminarCurso };
