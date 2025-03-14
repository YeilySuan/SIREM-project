// src/routes/api/validateLogginToMainMenu.js
import { db } from '../../lib/database'; // Ruta relativa a la base de datos

export async function POST({ request }) {
  try {
    const { logginCedula, logginPassword } = await request.json();

    // Consulta para validar usuario
    const validateUserAndPass = 'SELECT * FROM usuarios WHERE Cedula = ?';
    const [results] = await db.query(validateUserAndPass, [logginCedula]);

    if (results.length === 0) {
      return {
        status: 401,
        body: { message: 'Usuario no encontrado' }
      };
    }

    const user = results[0];

    // Validar si la contraseña coincide
    if (user.Contraseña === logginPassword) {
      return {
        status: 200,
        body: { message: 'Autenticacion Exitosa' }
      };
    } else {
      return {
        status: 401,
        body: { message: 'Usuario o contraseña Incorrectas' }
      };
    }
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      body: { message: 'Error en el servidor' }
    };
  }
}
