export async function sendValidateAdmin(username, password) {

  const data = {
    username,
    password
  };

  const response = await fetch('http://siremproject.cleverapps.io/api/validateAdmin', {
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