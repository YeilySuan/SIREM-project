<script>
  //import { navigate } from "svelte-routing";
  import { goto } from '$app/navigation';
  import AuthenticationModal from "./authentication-modal/+page.svelte";
  import { modalStore } from "../stores/modal-store.js";
  import { sendForm } from '../lib/formHandler.js';
  //import { createEventDispatcher } from 'svelte';

  let logginCedula = '';
  let logginPassword = '';
  let userIdCard = '';
  let userFullName = '';
  let userEmail = '';
  let userPassword = '';
  let userRol = '';
  let errorMessage = '';

  const handleSubmit = async () => {
    try {
      const result = await sendForm(userIdCard, userFullName, userEmail, userPassword, userRol);
      console.log('respuesta del server:', `Usuario registrado con el Id: ${result.id}`);
      alert("Usuario Registrado exitosamente");

    } catch (error) {
      console.log('error en handleSubmit', error);
      alert("error al registrar usuario");
    }
  }  

  let isActive = false;
  let containerClass = "container";
/*
  function goToMain() {
   navigate('/main-page');
  }
*/

  function openModal(event) {
    event.preventDefault();
    modalStore.set(true)
  };

  function addClassList() {
    isActive = true;
    
  };

  function removeClassList() {
    isActive = false;
  };

async function logginSuccess(logginCedula, logginPassword) {
try {
  // Esto es lo que cambie para leer en Railway DESPLIEGUE
  const response = await fetch('https://sirem-project-production-e2cc.up.railway.app/api/validateLogginToMainMenu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ logginCedula, logginPassword })
  });

  // Check if the response is OK
  if (!response.ok) {
    // Attempt to get the message, fallback to a default one
    const errorData = await response.text();  // Get the raw response text (not JSON)
    console.error('Server error:', errorData);
    alert('Error desconocido o Usuario y contraseña incorrectos');
    return;
  }

  // Try parsing JSON only if the response is OK
  const data = await response.json();

  if (data) {
    goto('/main-page');  // Handle successful login
  }

} catch (error) {
  console.error('Hubo un problema con la solicitud:', error);
  alert("Error al iniciar sesión");
}
}




</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

  :global(*){
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }

  :global(body){
    max-height: 100vh;
    background-color: #c9d6ff;
    background: linear-gradient(to right, #e2e2e2, #c9d6ff);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; 
    height: 100%;
    width: 100%;
  }

  .container{
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    scrollbar-width: none;

    
  }

  .container{
    background-color:#a1b7cd;
    border-radius: 30px;
    box-shadow: 0 5px 15px rgba(39, 114, 146, 0.35);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
  }

  .container p{
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    margin: 20px 0;
  }

  .container span{
    font-size: 12px;
  }

  .container {
    color: #0e0e0e;
    font-size: 13px;
    text-decoration: none;
    margin-top: 0%;
  }

  .container button{
    background-color: #327d8d;
    color: #0b0a0a;
    font-size: 15px;
    padding: 10px 45px;
    border: 1px solid transparent;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 20px;
    cursor: pointer;
  }

  .container button.hidden{
    background-color: transparent;
    border-color: #f8f7f7;
  }

  .container form{
    background-color: #a1b7cd;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    height: 100%;
  }

  .container input{
    color: rgb(9, 8, 8);    
    border: none;
    margin: 8px 0;
    padding: 10px 15px;
    font-size: 13px;
    border-radius: 8px;
    width: 100%;
    outline: none;
  }

  .form-container{
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }

  .sign-in{
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .container.active .sign-in{
    transform: translateX(100%);
  }

  .sign-up{
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }

  .container.active .sign-up{
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: move 0.6s;
  }

  @keyframes move{
    0%, 49.99%{
        opacity: 0;
        z-index: 1;
    }
    50%, 100%{
        opacity: 1;
        z-index: 5;
    }
  }

  .toggle-container{
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: all 0.6s ease-in-out;
    border-radius: 150px 0 0 100px;
    z-index: 20;
  }

  .container.active .toggle-container{
    transform: translateX(-100%);
    border-radius: 0 150px 100px 0;
  }

  .toggle{
    background-color: #512da8;
    height: 100%;
    background: linear-gradient(to right, #6a9ceb, #3275bc);
    color: #131313;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
  }

  .container.active .toggle{
    transform: translateX(50%);
  }

  .toggle-panel{
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 30px;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
  }

  .toggle-left{
    transform: translateX(-200%);
  }

  .container.active .toggle-left{
    transform: translateX(0);
  }

  .toggle-right{
    right: 0;
    transform: translateX(0);
  }

  .container.active .toggle-right{
    transform: translateX(200%);
  }

  .logo{
  z-index: 22;
  width: 200px;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
 .lower-strip{
  width: 100%;
  height: 15vw; /* Ajusta la altura según tu diseño */
  background-color: #5C9DED; /* Color de fondo azul */
  margin-block-start: 100px;
 }

 .upper-strip{
  width: 100%;
  height: 5vw; /* Ajusta la altura según tu diseño */
  background-color: #5C9DED; /* Color de fondo azul */
  margin-bottom: 100px;
 }

</style>

<svelte:head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
  <title>INICIO SIREM | YEILY</title>
</svelte:head>

<AuthenticationModal />

{#if isActive}
  <AuthenticationModal on:registrationSuccess={handleSubmit} />
{/if}

<div class="upper-strip"></div>
<div class:active={isActive} class:container={containerClass} id="container">
  <div class="form-container sign-up">
      <form on:submit|preventDefault={handleSubmit} >
          <h1>Crear Usuario</h1>
          <span>Por favor Ingrese sus datos</span>
          <input type="text" placeholder="Cedula" name="id_card" bind:value={userIdCard} required>
          <input id="register-name" type="text" placeholder="Nombre Completo" name="full_name" bind:value={userFullName} required>
          <input type="email" placeholder="Correo Electronico" name="email" bind:value={userEmail} required>
          <input type="password" placeholder="Password" name="password" bind:value={userPassword} required>          
          <h3>ROL</h3>
          <select title="selec-login" id="register-role" name="sel" bind:value={userRol} required >
            <option value="" disabled selected>Seleccione un Rol</option>
            <option value="administrativo">Administrativo</option>
            <option value="operativo">Operativo</option>
        </select>
        <button on:click={openModal} name="init_sesion" type="submit" >Registrar Usuario</button>
      </form>
  </div>
  <div class="form-container sign-in">
      <form>
          <h1>Iniciar Sesion</h1>
          <span>Use cedula y contraseña</span>
          <input type="text" placeholder="Cedula" bind:value={logginCedula} required>
          <input type="password" placeholder="Contraseña" bind:value={logginPassword} required>
         <!-- <button on:click={logginSuccess(logginCedula, logginPassword)} >Ingresar</button>     --> 
         <button on:click={() => logginSuccess(logginCedula, logginPassword)}>Ingresar</button>

      </form>
  </div>
  <div class="toggle-container">
      <div class="toggle">
          <div class="toggle-panel toggle-left">
              <h1>¡Bienvenido!</h1>
              <p>Si eres un nuevo usuario por favor registra los datos solicitados y disfruta de nuestros servicios</p>
              <span><strong>SIREM</strong></span>
              <br>
              <span>SISTEMA DE INFORMACION REGISTRO Y NOTIFICACION DE VENCIMIENTO DE MEDICAMENTOS</span>
              <button on:click={removeClassList} class="hidden" id="login">Ir a iniciar sesion</button>
          </div>
          <div class="toggle-panel toggle-right">
              <h1>¡Bienvenido!</h1>
              <p>Por favor Ingresa tus credenciales para que puedas acceder a nuestros servicios</p>
              <p><strong>SIREM</strong></p>
              <p>SISTEMA DE INFORMACION REGISTRO Y NOTIFICACION DE VENCIMIENTO DE MEDICAMENTOS</p>
              <button on:click={addClassList} class="hidden" id="register">
                  Ir a registrar nuevo usuario
              </button>
          </div>
      </div>  
  </div>
</div>

<div class="lower-strip">
  <img class="logo" src="/logo-sirem.png" alt="logo SIREM">
</div>

