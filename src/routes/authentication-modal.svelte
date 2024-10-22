<script>
  import { onDestroy } from "svelte";
  import { modalStore } from "../stores/modal-store";
  
  export let showModal = false;
  
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
            <input type="text" placeholder="Usuario">
            <input type="password" placeholder="Contraseña">
            <button>Iniciar sesión</button>
        </div>
    </div>
  </div>
{/if}