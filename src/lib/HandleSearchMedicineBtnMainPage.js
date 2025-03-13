export async function getMedicineForBtnMainPage(barCode) {
 
  try {
    //esto lo cambie para el despliegue de Railway
    const response = await fetch(`https://sirem-project-production-e2cc.up.railway.app/api/getMedicineSearchButton?barCode=${barCode}`);

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