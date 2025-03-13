export async function sendForm(userIdCard, userFullName, userEmail, userPassword, userRol) {

  const data = {
    userIdCard,
    userFullName,
    userEmail,
    userPassword,
    userRol
  };

  //esto lo cambien para el despliegue de Railway
  const response = await fetch('https://sirem-project-production-e2cc.up.railway.app/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });


  if (!response.ok) {
    throw new Error('Error en la solicitud');
  }

  return await response.json();

}