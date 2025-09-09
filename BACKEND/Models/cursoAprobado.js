const { dbmysql } = require('../Database/dbconection');

class CursoAprobado {
    static async agregar({ id_usuario, id_curso }) {
        const pool = await dbmysql();
        const [result] = await pool.query(
            `INSERT INTO cursos_aprobados (id_usuario, id_curso) VALUES (?, ?)`,
            [id_usuario, id_curso]
        );
        return result.insertId;
    }

    static async existe(id_usuario, id_curso) {
        const pool = await dbmysql();
        const [rows] = await pool.query(
            `SELECT * FROM cursos_aprobados WHERE id_usuario = ? AND id_curso = ?`,
            [id_usuario, id_curso]
        );
        return rows.length > 0;
    }

    static async obtenerPorUsuario(id_usuario) {
        const pool = await dbmysql();
        const [rows] = await pool.query(`
            SELECT c.id_curso, c.nombre, c.seccion,
                CONCAT(p.nombres, ' ', p.apellidos) AS profesor
            FROM cursos_aprobados ca
            INNER JOIN cursos c ON ca.id_curso = c.id_curso
            LEFT JOIN profesores p ON c.id_profesor = p.id_profesor
            WHERE ca.id_usuario = ?
        `, [id_usuario]);
        return rows;
    }
}

module.exports = CursoAprobado;
