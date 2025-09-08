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

    static async existe(correo, registro_academico) {
    const pool = await dbmysql();
    const [rows] = await pool.query(
        `SELECT * FROM usuarios WHERE correo = ? OR registro_academico = ?`,
        [correo, registro_academico]
    );
    return rows.length > 0;
}
}

module.exports = Usuario;