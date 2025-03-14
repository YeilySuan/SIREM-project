import mysql from 'mysql2';


const connection = await mysql.createConnection({
    host: 'b5sf2rby3y9yoblljx3e-mysql.services.clever-cloud.com',//'localhost', //process.env.DB_HOST,// ,
    user: 'u2kk1djy4appdwvz',//'root',//process.env.DB_USER, //
    password: 'uuycP8FhRtjGQr74piZa',//'r12345',// process.env.DB_PASSWORD, //
    database: 'b5sf2rby3y9yoblljx3e',//'db_sirem',// process.env.DB_NAME, //
    port: 3306, 
});


export default connection;