const Publicacion = require('../Models/publicacion');

const crearPublicacion = async (req, res) => {
    try {
        const { id_usuario, id_curso, id_profesor, mensaje } = req.body;

        if (!id_usuario || !mensaje) {
            return res.status(400).json({ mensaje: 'Usuario y mensaje son obligatorios' });
        }

        if (!id_curso && !id_profesor) {
            return res.status(400).json({ mensaje: 'Debe seleccionar un curso o un profesor' });
        }

        const id = await Publicacion.crear({ id_usuario, id_curso, id_profesor, mensaje });

        res.status(201).json({ mensaje: 'Publicación creada correctamente', id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publicacion.obtenerTodas();
        res.json(publicaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_usuario, mensaje } = req.body;

        if (!id_usuario || !mensaje || !mensaje.trim()) {
            return res.status(400).json({ mensaje: 'id_usuario y mensaje son obligatorios' });
        }

        const esDueno = await Publicacion.perteneceAUsuario(id, id_usuario);
        if (!esDueno) return res.status(403).json({ mensaje: 'No autorizado para editar esta publicación' });

        const ok = await Publicacion.actualizar({ id_publicacion: id, mensaje: mensaje.trim() });
        if (!ok) return res.status(404).json({ mensaje: 'Publicación no encontrada' });

        res.json({ mensaje: 'Publicación actualizada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_usuario } = req.body;

        if (!id_usuario) return res.status(400).json({ mensaje: 'id_usuario es obligatorio' });

        const esDueno = await Publicacion.perteneceAUsuario(id, id_usuario);
        if (!esDueno) return res.status(403).json({ mensaje: 'No autorizado para eliminar esta publicación' });

        const ok = await Publicacion.eliminar({ id_publicacion: id });
        if (!ok) return res.status(404).json({ mensaje: 'Publicación no encontrada' });

        res.json({ mensaje: 'Publicación eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = { crearPublicacion, obtenerPublicaciones, actualizarPublicacion, eliminarPublicacion};
