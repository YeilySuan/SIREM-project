<script>
import { onDestroy } from "svelte";
import { modalStore } from "../../stores/modal-store";
import { sendValidateAdmin } from "../../lib/validateAdminHandle.js";
import { createEventDispatcher } from 'svelte';


export let showModal = false;

const dispatch = createEventDispatcher();

let username = '';
let password = '';
  
//FUNCION PARA GUARDAR EL NOMBRE DEL USUARIO QUE INGRESA * PRIMER CAMBIO
const handleValidateAuthentication = async () => {
  try {
    const result = await sendValidateAdmin(username, password);
    
    if (result.success) { 
      localStorage.setItem("user", JSON.stringify(result.user)); // Guardar usuario autenticado
      dispatch("registrationSuccess");
    }
  } catch (error) {
    console.log("Error en la autenticación", error);
  }
};


const unsubscribe = modalStore.subscribe(value => { 
    showModal = value;
});
  
  
  
onDestroy(() => {
    unsubscribe();
});
  
function handleCloseModal() {
    modalStore.set(false);
}

</script>

  
<style>

p{
  text-align: center;
  font-weight: bold;
  padding: 5px;
}

.text{
  display: flex;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 3px;
}


.modal-wrapper {
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

form .text:hover {
  background-color: rgba(217, 230, 226, 0.369);
}

form .text {
  display: flex;
  justify-content: center;
  align-items: center;

}

form {
  display: grid;
  gap: 5px;
  margin: 10px;
}


.modal-container {
  z-index: 100;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center; 
  width: 100vw;
  height: 100vh;
  background-color: #c9d6ff61;
}

.modal-content{
  width: 400px;
  height: 200px;
  border-radius: 10px;
  background-color: #a1b7cd;
}

</style>
  

{#if showModal}
  <div class="modal-wrapper">
    <div class="modal-container">
        <div class="modal-content">
            <br>
            <button on:click={handleCloseModal} class="close-modal">X</button>
            <p>Iniciar sesión administrador</p>
            <form on:submit|preventDefault={handleValidateAuthentication}>
              <input class="text" type="text" placeholder="Usuario" bind:value={username}>
              <input class="text" type="password" placeholder="Contraseña" bind:value={password}>
              <button class="iniciar-sesion text" type="submit">Iniciar sesión</button>
            </form>            
        </div>
    </div>
  </div>
{/if}