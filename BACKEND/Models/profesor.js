const { dbmysql } = require('../Database/dbconection');

class Profesor {
    static async crear({ nombres, apellidos }) {
        const pool = await dbmysql();
        const [result] = await pool.query(
            `INSERT INTO profesores (nombres, apellidos) VALUES (?, ?)`,
            [nombres, apellidos]
        );
        return result.insertId;
    }

    static async existe(nombres, apellidos) {
        const pool = await dbmysql();
        const [rows] = await pool.query(
            `SELECT * FROM profesores WHERE nombres = ? AND apellidos = ?`,
            [nombres, apellidos]
        );
        return rows.length > 0;
    }

    static async obtenerTodos() {
        const pool = await dbmysql();
        const [rows] = await pool.query(`SELECT * FROM profesores`);
        return rows;
    }
}

module.exports = Profesor;