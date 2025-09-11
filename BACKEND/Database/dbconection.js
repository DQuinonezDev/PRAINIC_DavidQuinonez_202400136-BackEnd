const mysql = require('mysql2/promise');

const dbmysql = async () => {
    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            charset: 'utf8mb4', 
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        // Probar conexión
        const connection = await pool.getConnection();
        console.log('Conexión a MySQL establecida');
        connection.release();

        return pool;
    } catch (error) {
        console.error('Error al conectar a MySQL:', error.message);
        process.exit(1); // detener la app si no hay conexión
    }
};


module.exports = {dbmysql}