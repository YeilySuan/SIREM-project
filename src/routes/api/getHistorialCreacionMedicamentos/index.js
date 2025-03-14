// src/routes/api/getHistorialCreacionMedicamentos/index.js
import { db } from '../../../lib/database'; // Asegúrate de tener la conexión a la base de datos configurada

export async function GET() {
  try {
    const queryMostrarDatos = `
      SELECT 
          Fecha_creacion,
          Nombre_medicamento,
          Codigo_barras, 
          Fecha_vencimiento,
          Lote_medicamento,
          Creado_por
      FROM historial_creacion_medicamentos
    `;
    
    // Ejecutar la consulta
    const [result] = await db.query(queryMostrarDatos);

    // Si no hay resultados
    if (result.length === 0) {
      return {
        status: 404,
        body: { message: 'No se encontraron registros en el historial de creación de medicamentos' }
      };
    }

    // Si la consulta tiene resultados, devolver los datos
    return {
      status: 200,
      body: result
    };
  } catch (err) {
    console.error("Error en la consulta:", err);
    return {
      status: 500,
      body: { error: 'Error en la consulta a la base de datos' }
    };
  }
}
