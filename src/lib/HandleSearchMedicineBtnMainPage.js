export async function getMedicineForBtnMainPage(barCode) {
 
  try {
    const response = await fetch(`http://b5sf2rby3y9yoblljx3e-mysql.services.clever-cloud.com/api/getMedicineSearchButton?barCode=${barCode}`);

    if (!response.ok) {
     const errorText = await response.text();
     throw new Error(`Error en la solicitud: ${errorText}`);
    }
    
    const result =  await response.json();
    return result;  

  } catch (error) {
    console.error('Error en getMedicineForMainPage:', error);
    return null
  }

}