export async function sendMedicineForm(barCode, name, dose, presentation, numberLot, amount, laboratory, dateExpiration, idUsuarioMed) {

   const data = {
    barCode,
    name,
    dose,
    presentation, 
    numberLot,
    amount,
    laboratory,
    dateExpiration,
    idUsuarioMed
   };
  
   const response = await fetch('http://localhost:3000/api/createMedicamentos', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
   });


   if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error en la solicitud: ${errorText}`);
   }
   
   return await response.json();
}