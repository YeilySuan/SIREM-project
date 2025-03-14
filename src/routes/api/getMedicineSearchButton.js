// src/routes/api/getMedicineSearchButton.js
import { db } from '../../lib/database'; // Ruta relativa a la base de datos

export async function GET({ url }) {
  try {
    // Obtenemos el parámetro barCode desde la URL (query params)
    const barCode = url.searchParams.get('barCode');

    if (!barCode) {
      return {
        status: 400,
        body: { message: 'Se requiere el parámetro barCode' }
      };
    }

    // Consulta SQL para obtener la información del medicamento
    const querySearchMedicine = `
      SELECT m.Nombre, m.Presentacion, l.Numero_lote, l.Fecha_vencimiento, l.Cantidad, l.Laboratorio
      FROM medicamentos m
      JOIN lotes l ON m.Id_medicamento = l.Id_medicamento
      WHERE m.Codigo_barras = ?`;

    // Ejecutar la consulta
    const [result] = await db.query(querySearchMedicine, [barCode]);

    if (result.length === 0) {
      return {
        status: 404,
        body: { message: 'Medicamento no encontrado' }
      };
    }

    // Responder con los resultados
    return {
      status: 200,
      body: result
    };
  } catch (err) {
    console.error("Error en la consulta a base de datos", err);
    return {
      status: 500,
      body: { message: 'Error al realizar consulta' }
    };
  }
}
