<script>
  import { onMount } from "svelte";
  import { sendMedicineForm } from '../../lib/create-medicamentosHandler';
  
  let dialogGuardar;
  let barCode = '';
  let name = '';
  let dose = '';
  let presentation = '';
  let numberLot = '';
  let amount = '';
  let laboratory = '';
  let dateExpiration= '';
  let idUsuarioMed = 16;
  
  function abrirDialogoGuardar(){
    dialogGuardar.showModal();
  }

  function cerrarDialogoGuardar(){
    dialogGuardar.close();
    limpiarCamposFormulario();
  }


  const handleSendMedicineForm = async () => {
      try {
        const result = await sendMedicineForm(barCode, name, dose, presentation, numberLot, amount, laboratory, dateExpiration, idUsuarioMed);
        console.log('respuesta del server:', `Medicamento registrado con el Id: ${result.id}`);
        abrirDialogoGuardar();
      } catch (error) {
        console.log('error en handleSendMedicineForm', error);
      }
  };
  
  function returnMenu() {
    window.location.href = "/main-page";
  };

  function limpiarCamposFormulario() {
    barCode = '';
    name = '';
    dose = '';
    presentation = '';
    numberLot = '';
    amount = '';
    laboratory = '';
    dateExpiration = '';
  };

  
  onMount( () => {
    console.log("add-products ha sido montado")
  });
  
  </script>
  
  
  
  <div class="background"></div>
  
  <div class="add-products">
    <form on:submit|preventDefault={handleSendMedicineForm} class="main-form">
      <h1>INGRESAR MEDICAMENTO NUEVO</h1>    
      
      <div class="form-group">
        <label for="code">Código de Barras</label>
        <input type="text" placeholder="Ingresa el Código de Barras" bind:value={barCode} required>
      </div>
  
      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" placeholder="Nombre del medicamento" bind:value={name} required>
      </div>
  
      <div class="form-group">
       <label for="dose">Dosis</label>
       <input type="text" placeholder="mg, mcg, ml, mg/ml" bind:value={dose} required>
      </div>
  
      <div class="form-group">
        <label for="presentation">Presentación</label>
        <select id="presentation" class="form-control" bind:value={presentation} required>
        <option value="" disabled selected>Seleccione una presentación Farmacéutica</option>
        <option value="tableta">Tableta</option>
        <option value="gragea">Gragea</option>
        <option value="cápsula">Capsula</option>
        <option value="comprimidos">Comprimido</option>
        <option value="jarabe">Jarabe</option>
        <option value="solución">Solucion</option>
        <option value="jalea">Jalea</option>
        <option value="crema">Crema</option>
        <option value="solucion inyectbale">Solucion inyectable</option>
        <option value="polvo">Polvo para reconstituir</option>
      </select>
      </div>
  
      <div class="form-group">
        <label for="lot">Lote</label>
        <input type="text" placeholder="Lote" bind:value={numberLot} required>
      </div>
  
      <div class="form-group">
        <label for="expiration date">Fecha de Vencimiento</label>
        <input type="date" bind:value={dateExpiration} required>
      </div>
  
      <div class="form-group">
        <label for="amount">Cantidad</label>
        <input type="number" placeholder="Cantidad ingresada" bind:value={amount} required>
      </div>
  
      <div class="form-group">
        <label for="laboratory">Laboratorio</label>
        <input type="text" placeholder="Fabricante" bind:value={laboratory} required>
      </div>
  
  
      <div class="form-group full-width">
        <button type="submit" class="save-btn" >GUARDAR CAMBIOS</button>
      </div>
    </form>
 

    <div class="show-modal">
      <dialog bind:this={dialogGuardar}>
          <form class="dialog" method="dialog">
              <p>Medicamento guardado exitosamente</p>
              <button type="button" id="button-aceptar" on:click={cerrarDialogoGuardar}>ACEPTAR</button>
          </form>
      </dialog>
  </div>




   
   <form class="form-btn-back">
    <div class="form-group full-width btn-back">
      <button type="button" on:click={returnMenu}  class="exit-btn">REGRESAR A MENÚ PRINCIPAL</button>
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
  
  
  /*css de la caja del formulario*/
  .add-products {
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
  
    /*Ingresar nuevo medicamento titulo*/
  h1{
    grid-column: span 2;
    text-align: center;
    background-color: #2c82a4a6; 
    color: white;
    padding: 10px;
    border-radius: 30px;
    font-size: 2.6rem;
  }
  
  /*css de los campos de entrada de información*/
  input{
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 5px;
  }
  
  /*Css del boton de guardar cambios*/
  
  .save-btn{
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
  
  .save-btn:hover {
    background-color: rgb(21, 73, 133);
    }

  /*css del modal guardar medicamento*/
  dialog p{
    text-align: center;
    padding: 20px;
    font-weight: bold;
    color: #333;
  }

  dialog form {
    background-color: #f9f5ec;
    display: block;
    width: 450px;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    backdrop-filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  }

  dialog::backdrop {
      background-color: rgba(0, 0, 0, 0.5); 
      transition: background-color 0.3s ease, filter 0.3s ease; 
  }

  #button-aceptar {
      background-color: #4CAF50; 
      color: white;
      font-weight: bold;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 20px;
      width: 100px;
      display: block;
      margin: 20px auto 0;
  }

  #button-aceptar:hover {
      background-color: #45a049; 
      transition: background-color 0.3s ease;
  }

    /*Css del boton de regresar a menu principal*/
  .exit-btn{
    display: flex;
    background-color: #2c82a4;
    color: white;
    font-weight: bold;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .form-btn-back {
    position: absolute;
    bottom: 20%;
  }
  
  
  .exit-btn:hover{
    background-color: rgb(21, 73, 133);
  }
  
  /*ubicación de los botones*/
  .full-width {
    grid-column: span 2;
    text-align: center;
  }
  
  
  .form-control{
    padding: 9px;
    color: black;
    font-weight: bold;
  }
  
  </style>
