// src/routes/api/submit.js
import { db } from '../../lib/database'; // Usamos la ruta relativa para importar la base de datos

export async function POST({ request }) {
  try {
    const { userIdCard, userFullName, userEmail, userPassword, userRol } = await request.json();
    
    // Query para insertar el usuario
    const usersQuery = 'INSERT INTO usuarios (Cedula, Nombre_completo, Correo_electronico, Contraseña) VALUES (?, ?, ?, ?)';
    const result = await db.query(usersQuery, [userIdCard, userFullName, userEmail, userPassword]);

    console.log('Resultado de la inserción del usuario', result);

    const userId = result.insertId;
    
    // Query para insertar el rol
    const rolQuery = 'INSERT INTO roles (Tipo_rol, Id_usuarios) VALUES (?, ?)';
    await db.query(rolQuery, [userRol, userId]);

    // Responder con éxito
    return {
      status: 200,
      body: {
        message: 'Usuario registrado',
        id: userId
      }
    };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      body: { error: 'Hubo un problema al registrar el usuario.' }
    };
  }
}
