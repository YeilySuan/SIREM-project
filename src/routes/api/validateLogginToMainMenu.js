// src/routes/api/validateLogginToMainMenu.js
import { db } from '../../lib/database'; // Ruta relativa a la base de datos
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  try {
    const { logginCedula, logginPassword } = await request.json();

    // Consulta para validar usuario
    const validateUserAndPass = 'SELECT * FROM usuarios WHERE Cedula = ?';
    const [results] = await db.query(validateUserAndPass, [logginCedula]);

    if (results.length === 0) {
      return json(
        { message: 'Usuario no encontrado' },
        { status: 401 }
      );
    }

    const user = results[0];

    // Validar si la contraseña coincide
    if (user.Contraseña === logginPassword) {
      return json(
        { message: 'Autenticacion Exitosa' },
        { status: 200 }
      );
    } else {
      return json(
        { message: 'Usuario o contraseña Incorrectas' },
        { status: 401 }
      );
    }
  } catch (err) {
    console.error(err);
    return json(
      { message: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
