const Profesor = require('../Models/profesor');

const crearProfesor = async (req, res) => {
    try {
        const { nombres, apellidos } = req.body;

        if (!nombres || !apellidos) {
            return res.status(400).json({ mensaje: 'Nombres y apellidos son obligatorios' });
        }

        const yaExiste = await Profesor.existe(nombres, apellidos);
        if (yaExiste) {
            return res.status(400).json({ mensaje: 'El profesor ya está registrado' });
        }

        const id = await Profesor.crear({ nombres, apellidos });

        res.status(201).json({ mensaje: 'Profesor creado correctamente', id });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerProfesores = async (req, res) => {
    try {
        const profesores = await Profesor.obtenerTodos();
        res.json(profesores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { crearProfesor, obtenerProfesores };