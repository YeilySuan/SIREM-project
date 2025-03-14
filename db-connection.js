import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'b5sf2rby3y9yoblljx3e-mysql.services.clever-cloud.com',
    user: 'u2kk1djy4appdwvz',
    password: 'uuycP8FhRtjGQr74piZa',
    database: 'b5sf2rby3y9yoblljx3e',
    port: 3306, 
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

export default connection;