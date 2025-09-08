const { dbmysql } = require('../Database/dbconection');

class Usuario {
    static async crear({ registro_academico, nombres, apellidos, correo, contrasena }) {
        const pool = await dbmysql();
        const [result] = await pool.query(
            `INSERT INTO usuarios (registro_academico, nombres, apellidos, correo, contrasena)
            VALUES (?, ?, ?, ?, ?)`,
            [registro_academico, nombres, apellidos, correo, contrasena]
        );
        return result.insertId;
    }

    //Validacion para comprobar si hay usuarios con el mismo carnet o correo
    static async existe(correo, registro_academico) {
        const pool = await dbmysql();
        const [rows] = await pool.query(
            `SELECT * FROM usuarios WHERE correo = ? OR registro_academico = ?`,
            [correo, registro_academico]
        );
        return rows.length > 0;
    }

      static async buscarPorCarnet(registro_academico) {
        const pool = await dbmysql();
        const [rows] = await pool.query(`SELECT * FROM usuarios WHERE registro_academico = ?`, [registro_academico]);
        return rows[0];
    }

    static async buscarPorId(id_usuario) {
        const pool = await dbmysql();
        const [rows] = await pool.query(`SELECT * FROM usuarios WHERE id_usuario = ?`, [id_usuario]);
        return rows[0];
    }

    static async obtenerTodos() {
        const pool = await dbmysql();
        const [rows] = await pool.query(`SELECT * FROM usuarios`);
        return rows;
    }
}

module.exports = Usuario;