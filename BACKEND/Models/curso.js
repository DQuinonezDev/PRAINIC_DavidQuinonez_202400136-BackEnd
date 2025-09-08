const { dbmysql } = require('../Database/dbconection');

class Curso {
    static async crear({ nombre, seccion, id_profesor }) {
        const pool = await dbmysql();
        const [result] = await pool.query(
            `INSERT INTO cursos (nombre, seccion, id_profesor) VALUES (?, ?, ?)`,
            [nombre, seccion, id_profesor]
        );
        return result.insertId;
    }

    static async existe(nombre, seccion) {
        const pool = await dbmysql();
        const [rows] = await pool.query(
            `SELECT * FROM cursos WHERE nombre = ? AND seccion = ?`,
            [nombre, seccion]
        );
        return rows.length > 0;
    }

    static async obtenerTodos() {
        const pool = await dbmysql();
        const [rows] = await pool.query(`
            SELECT c.id_curso, c.nombre, c.seccion, 
                p.nombres AS profesor_nombre, p.apellidos AS profesor_apellido
            FROM cursos c
            LEFT JOIN profesores p ON c.id_profesor = p.id_profesor
        `);
        return rows;
    }
}

module.exports = Curso;