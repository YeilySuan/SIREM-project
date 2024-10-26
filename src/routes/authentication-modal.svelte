<script>
  import { onDestroy } from "svelte";
  import { modalStore } from "../stores/modal-store";
  import { sendValidateAdmin } from "../lib/validateAdminHandle"
  import { createEventDispatcher } from 'svelte';


  export let showModal = false;

  const dispatch = createEventDispatcher();

  let username = '';
  let password = '';
  

const handleValidateAuthentication = async () => {
  try {
    const result = await sendValidateAdmin(username, password);
    console.log('respuesta del server: datos correctos', result);    
    dispatch('registrationSuccess');
  } catch (error) {
    console.log('error en handleValidateAuthentication', error);
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
              <input type="text" placeholder="Usuario" bind:value={username}>
              <input type="password" placeholder="Contraseña" bind:value={password}>
              <button type="submit">Iniciar sesión</button>
            </form>
            
        </div>
    </div>
  </div>
{/if}