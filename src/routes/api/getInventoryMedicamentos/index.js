// src/routes/api/getInventoryMedicamentos/index.js
import { db } from '../../../lib/database'; // Asegúrate de tener la conexión a la base de datos configurada

export async function GET() {
  try {
    const queryMostrarDatos = `
      SELECT 
          m.Codigo_barras, 
          m.Nombre,
          m.Dosis,
          m.Presentacion,
          l.Numero_lote,
          l.Cantidad,
          l.Laboratorio,
          l.Fecha_vencimiento
      FROM medicamentos as m
      INNER JOIN lotes AS l 
      ON m.Id_medicamento = l.Id_medicamento
      ORDER BY l.Fecha_vencimiento ASC
    `;
    
    // Ejecutar la consulta
    const [result] = await db.query(queryMostrarDatos);

    // Si no hay resultados
    if (result.length === 0) {
      return {
        status: 404,
        body: { message: 'No se encontraron medicamentos en el inventario' }
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
