import mysql from 'mysql2';
//import dotenv from 'dotenv';
//import 'dotenv/config';

//dotenv.config();

const connection = await mysql.createConnection({
    host:'localhost', //process.env.DB_HOST,// ,
    user: 'root',//process.env.DB_USER, //
    password:'r12345',// process.env.DB_PASSWORD, //
    database:'db_sirem',// process.env.DB_NAME, //
    //port: process.env.DB_PORT, 
});


export default connection;