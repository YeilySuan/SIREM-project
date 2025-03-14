// src/routes/api/createMedicamentos.js
import { db } from '../../lib/database'; // Ruta relativa a la base de datos

export async function POST({ request }) {
  try {
    const {
      barCode,
      name,
      dose,
      presentation,
      numberLot,
      amount,
      laboratory,
      dateExpiration,
      idUsuarioMed
    } = await request.json();

    // Query para insertar medicamento
    const medicamentoQuery = 'INSERT INTO medicamentos (Codigo_barras, Nombre, Dosis, Presentacion, Id_usuarios) VALUES (?,?,?,?,?)';
    const result = await db.query(medicamentoQuery, [barCode, name, dose, presentation, idUsuarioMed]);

    console.log('Resultado de la inserción del medicamento', result);

    const medicamentoId = result.insertId;

    // Query para insertar lote
    const loteQuery = 'INSERT INTO lotes (Numero_lote, Cantidad, Laboratorio, Fecha_vencimiento, Id_Medicamento) VALUES(?,?,?,?,?)';
    await db.query(loteQuery, [numberLot, amount, laboratory, dateExpiration, medicamentoId]);

    // Responder con éxito
    return {
      status: 200,
      body: {
        message: 'Medicamento y Lote registrados exitosamente',
        id: medicamentoId
      }
    };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      body: { error: 'Hubo un problema al registrar el medicamento y lote.' }
    };
  }
}
