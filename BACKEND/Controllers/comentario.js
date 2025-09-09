const Comentario = require('../Models/comentario');

const crearComentario = async (req, res) => {
    try {
        const { id_publicacion, id_usuario, mensaje } = req.body;

        if (!id_publicacion || !id_usuario || !mensaje) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        const id = await Comentario.crear({ id_publicacion, id_usuario, mensaje });

        res.status(201).json({ mensaje: 'Comentario agregado correctamente', id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerComentarios = async (req, res) => {
    try {
        const { id_publicacion } = req.params;
        const comentarios = await Comentario.obtenerPorPublicacion(id_publicacion);
        res.json(comentarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_usuario, mensaje } = req.body;

        if (!id_usuario || !mensaje || !mensaje.trim()) {
            return res.status(400).json({ mensaje: 'id_usuario y mensaje son obligatorios' });
        }

        const esDueno = await Comentario.perteneceAUsuario(id, id_usuario);
        if (!esDueno) return res.status(403).json({ mensaje: 'No autorizado para editar este comentario' });

        const ok = await Comentario.actualizar({ id_comentario: id, mensaje: mensaje.trim() });
        if (!ok) return res.status(404).json({ mensaje: 'Comentario no encontrado' });

        res.json({ mensaje: 'Comentario actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_usuario } = req.body;

        if (!id_usuario) return res.status(400).json({ mensaje: 'id_usuario es obligatorio' });

        const esDueno = await Comentario.perteneceAUsuario(id, id_usuario);
        if (!esDueno) return res.status(403).json({ mensaje: 'No autorizado para eliminar este comentario' });

        const ok = await Comentario.eliminar({ id_comentario: id });
        if (!ok) return res.status(404).json({ mensaje: 'Comentario no encontrado' });

        res.json({ mensaje: 'Comentario eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { crearComentario, obtenerComentarios, actualizarComentario, eliminarComentario };
