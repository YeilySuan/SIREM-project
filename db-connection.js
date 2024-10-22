import mysql from 'mysql2';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'r12345',
    database: 'db_sirem',
});

export default connection;