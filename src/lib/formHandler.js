export async function sendForm(userIdCard, userFullName, userEmail, userPassword, userRol) {

  const data = {
    userIdCard,
    userFullName,
    userEmail,
    userPassword,
    userRol
  };

  const response = await fetch('http://siremproject.cleverapps.io/api/submit', {
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