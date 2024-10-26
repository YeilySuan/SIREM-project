<script>

import { navigate } from "svelte-routing";

function returnMenu() {
  console.log("regresando al menu principal");
  navigate('/main-page')
}

let dialog;

function abrirDialogo(){
    dialog.showModal();
}

function cerrarDialogo(){
    dialog.close();
}

</script>


<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

  <div class="background"></div>
  <div class="delete-products">
    <form class="main-form">
      <h1>ELIMINAR MEDICAMENTO</h1>

      <div class="form-group">
        <label for="codigo-barras">Código de Barras</label>
        <input type="text" id="codigo-barras">
    </div>
    
    
    <button class="buscar-btn">
      <i class="fas fa-search"></i> Buscar
    </button>
    
    <div class="form-group">
      <label for="name">Nombre</label>
      <input type="text">
    </div>
    
    <div class="form-group">
      <label for="dose">Dosis</label>
       <input type="text">
     </div>
    
     <div class="form-group">
      <label for="presentation">Presentación</label>
       <input type="text">
     </div>
    
    
     <div class="form-group">
      <label for="lot">Lote</label>
      <input type="text">
    </div>
    
    <div class="form-group">
      <label for="expiration date">Fecha de Vencimiento</label>
      <input type="date">
    </div>
    
    <div class="form-group">
      <label for="amount">Cantidad</label>
      <input type="text">
    </div>
    
    <div class="form-group">
      <label for="laboratory">Laboratorio</label>
      <input type="text">
    </div>
    
  <!---- este es el boton de cerrar sesion y el modal para confirmar cerrar sesión -->
  <div class="show-modal">
    <dialog bind:this={dialog}>
     <form class="dialog" method="dialog">
      <p>¿Está seguro de querer eliminar este registro de forma permanente?</p>
      <button type="submit" id="button-cancelar" on:click={cerrarDialogo}>CANCELAR</button>
      <button type="submit" id="button-eliminar" on:click={cerrarDialogo}>ELIMINAR</button>  <!----esto debe modificarse para eliminar de database    -->
    </form>
  </dialog>
  </div>


    <div class="form-group full-width">
    <button on:click={abrirDialogo} class="delete-btn">ELIMINAR MEDICAMENTO</button>
    </div>

  </form>

  <form>
    <div class="form-group full-width">
    <button on:click={returnMenu} class="exit-btn">REGRESAR A MENU PRINCIPAL</button>
    </div>
  </form>
  
</div>

<style>
/*css del fondo (imagen de pastillas) */
.background::before {
  content: '' ;
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-image: url(/src/lib/images/fondo.jpeg);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  opacity: 0.5;
  z-index: -1;
}

/*css de la caja del formulario eliminar medicamento*/
.delete-products{
    display: flex;   
    justify-content: center;
    align-items: center;
    height: 90vh;
}

 /*css del formulario*/
 .main-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    grid-template-rows: 4fr;
    background-color: #a3c4cf;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  /*css del form del dialogo*/
  dialog p{
    text-align: center;
    padding: 20px;
    font-weight: bold;
}

dialog form{
    background-color: beige;
    display: block;
    width: 500px;
    padding: 50px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    backdrop-filter: drop
}

dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5); 
    filter: blur(5px);
    transition: background-color 0.3s ease, filter 0.3s ease; 
}

/*css de los botones del modal de salir*/
#button-cancelar{
  background-color: #2c82a4;
  color: white;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 50px;
}

#button-eliminar{
  background-color:red;
  color: white;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 150px;
}


 /*css del titulo eliminar medicamento*/
  h1{
    grid-column: span 2;
    text-align: center;
    background-color: #2c82a4a6; 
    color: white;
    padding: 10px;
    border-radius: 30px;
    font-size: 2.6rem;
}

/*css de los input*/
input{
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
}

/*css del boton de eliminar*/
.delete-btn{
  background-color: #2c82a4;
  color: white;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  margin-top: 10px;
}

.delete-btn:hover{
  background-color: rgb(21, 73, 133);
}

/*Css del boton de regresar a menu principal*/
.exit-btn{
  display: flex;
  justify-content: center;
  background-color: #2c82a4;
  color: white;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  margin-top: -400px;
  }

 .exit-btn:hover{
  background-color: rgb(21, 73, 133);
 }
 .full-width {
    grid-column: span 2;
    text-align: center;
  }

/*css del boton de buscar*/
.buscar-btn {
  background-color: #2c82a4;
  color: white;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
  display: inline-flex; 
  align-items: center; 
  width: 100px;
}

.buscar-btn:hover{
  background-color: rgb(21, 73, 133);
}
</style>