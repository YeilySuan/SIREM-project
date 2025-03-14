// src/routes/api/deleteMedicamentos/[barCode].js
import { db } from '../../../lib/database'; // Asegúrate de tener la conexión a la base de datos configurada


export async function DEL({ params }) {
  try {
    const { barCode } = params; // Obtener el parámetro barCode de la URL

    // Query para eliminar el lote asociado con el medicamento
    const queryEliminarLote = `
      DELETE l 
      FROM lotes AS l
      INNER JOIN medicamentos AS m ON l.Id_Medicamento = m.Id_medicamento
      WHERE m.Codigo_barras = ?;
    `;
    
    const [resultLote] = await db.query(queryEliminarLote, [barCode]);

    // Si no se eliminó ningún lote
    if (resultLote.affectedRows === 0) {
      return {
        status: 404,
        body: { message: 'No se encontró el lote asociado con este medicamento' }
      };
    }

    // Si la eliminación del lote fue exitosa, eliminamos el medicamento
    const queryEliminarMedicamento = `
      DELETE FROM medicamentos 
      WHERE Codigo_barras = ?;
    `;
    
    const [resultMedicamento] = await db.query(queryEliminarMedicamento, [barCode]);

    // Si no se eliminó el medicamento
    if (resultMedicamento.affectedRows === 0) {
      return {
        status: 404,
        body: { message: 'No se encontró el medicamento con este código de barras' }
      };
    }

    // Si ambas eliminaciones fueron exitosas
    return {
      status: 200,
      body: { message: 'Medicamento y lote eliminados exitosamente' }
    };
    
  } catch (err) {
    console.error('Error al eliminar el medicamento y el lote:', err);
    return {
      status: 500,
      body: { message: 'Error en el servidor al eliminar el medicamento y el lote' }
    };
  }
}
