
import mysql from 'mysql2';

// Configurar el pool de conexiones
const pool = mysql.createPool({
    host: 'b5sf2rby3y9yoblljx3e-mysql.services.clever-cloud.com',
    user: 'u2kk1djy4appdwvz',
    password: 'uuycP8FhRtjGQr74piZa',
    database: 'b5sf2rby3y9yoblljx3e',
    port: 3306,
    waitForConnections: true,       // Espera conexiones si se alcanza el límite
    connectionLimit: 10,            // Número máximo de conexiones simultáneas
    queueLimit: 0                   // Límite de solicitudes en cola (0 = ilimitado)
});

// Exportar el pool para usarlo en otros archivos
export default pool;

/*
import mysql from 'mysql2';

const connection = await mysql.createConnection({
    host: 'b5sf2rby3y9yoblljx3e-mysql.services.clever-cloud.com',//'localhost', //process.env.DB_HOST,// ,
    user: 'u2kk1djy4appdwvz',//'root',//process.env.DB_USER, //
    password: 'uuycP8FhRtjGQr74piZa',//'r12345',// process.env.DB_PASSWORD, //
    database: 'b5sf2rby3y9yoblljx3e',//'db_sirem',// process.env.DB_NAME, //
    port: 3306, 
});


export default connection;
*/
/*
import mysql from 'mysql2'; // Importar la versión con promesas

// Función para establecer la conexión de forma asincrónica
async function createConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'b5sf2rby3y9yoblljx3e-mysql.services.clever-cloud.com',
      user: 'u2kk1djy4appdwvz',
      password: 'uuycP8FhRtjGQr74piZa',
      database: 'b5sf2rby3y9yoblljx3e',
      port: 3306,
    });

    console.log('Conexión establecida correctamente');
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error; // Lanza el error para que pueda ser manejado por quien llama la función
  }
}

export default createConnection;
*/