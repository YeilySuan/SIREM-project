// src/routes/api/getMedicamentos/[barCode].js
import { db } from '../../../lib/database'; // Asegúrate de tener la conexión a la base de datos configurada

export async function GET({ params }) {
  try {
    const { barCode } = params; // Obtener el código de barras de la URL
    
    // Consulta SQL para obtener los datos del medicamento y el lote
    const query = `
      SELECT 
        m.Nombre,
        m.Codigo_barras, 
        m.Presentacion,
        m.Dosis,
        l.Numero_lote,
        l.Cantidad,
        l.Fecha_vencimiento,
        l.Laboratorio
      FROM medicamentos AS m
      INNER JOIN lotes AS l
        ON m.Id_medicamento = l.Id_Medicamento
      WHERE m.Codigo_barras = ?
      LIMIT 1;
    `;

    const [result] = await db.query(query, [barCode]);

    // Si no se encuentra el medicamento
    if (result.length === 0) {
      return {
        status: 404,
        body: { message: 'Medicamento no encontrado' }
      };
    }

    // Si se encuentra el medicamento, devolver los resultados
    return {
      status: 200,
      body: result[0]  // Devolver el primer resultado encontrado
    };

  } catch (err) {
    console.error('Error al realizar la consulta:', err);
    return {
      status: 500,
      body: { message: 'Error en el servidor al realizar la consulta' }
    };
  }
}
