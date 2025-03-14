// src/routes/api/medicamentos/[barCode].js
import { db } from '../../../lib/database'; // Ruta relativa a la base de datos

export async function GET({ params }) {
  try {
    const { barCode } = params; // Obtener el parámetro barCode de la URL

    // Consulta SQL para obtener el medicamento
    const query = 'SELECT * FROM medicamentos WHERE Codigo_barras = ?';
    const [result] = await db.query(query, [barCode]);

    // Si no se encuentra el medicamento
    if (result.length === 0) {
      return {
        status: 404,
        body: { message: 'Medicamento no encontrado' }
      };
    }

    // Si se encuentra el medicamento
    return {
      status: 200,
      body: result[0]
    };
  } catch (err) {
    console.error('Error en la consulta a la base de datos', err);
    return {
      status: 500,
      body: { message: 'Error al realizar consulta' }
    };
  }
}
