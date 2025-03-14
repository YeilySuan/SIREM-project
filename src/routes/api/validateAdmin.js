// src/routes/api/validateAdmin.js
import { db } from '../../lib/database'; // Ruta relativa a la base de datos

export async function POST({ request }) {
  try {
    const { username, password } = await request.json();

    // Consulta SQL para validar el usuario y su rol
    const validateAdminQuery = `
      SELECT u.*, r.Tipo_rol
      FROM roles r
      JOIN usuarios u ON r.Id_usuarios = u.Id_usuarios
      WHERE u.Cedula = ?`;

    const [result] = await db.query(validateAdminQuery, [username]);

    if (result.length === 0) {
      return {
        status: 401,
        body: { message: 'Usuario no encontrado' }
      };
    }

    const user = result[0];

    // Validar contraseña
    if (user.Contraseña === password) {
      // Verificar si el rol es 'Administrativo'
      if (user.Tipo_rol === 'Administrativo') {
        return {
          status: 200,
          body: { message: 'Acceso concedido' }
        };
      } else {
        return {
          status: 403,
          body: { message: 'Acceso denegado' }
        };
      }
    } else {
      return {
        status: 401,
        body: { message: 'Contraseña incorrecta' }
      };
    }
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      body: { message: 'Error en la base de datos' }
    };
  }
}
