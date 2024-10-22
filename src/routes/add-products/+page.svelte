<script>
  import { onMount } from "svelte";
import { navigate } from "svelte-routing";

function returnMenu() {
  console.log("regresando al menu principal");
  navigate('/main-page')
}

onMount( () => {
  console.log("add-products ha sido montado")
});

</script>



<div class="background"></div>

<div class="add-products">
  <form class="main-form">
    <h1>INGRESAR MEDICAMENTO NUEVO</h1>

    
    
    <div class="form-group">
      <label for="code">Código de Barras</label>
      <input type="text" placeholder="Ingresa el Código de Barras" >
    </div>

    <div class="form-group">
      <label for="name">Nombre</label>
      <input type="text" placeholder="Nombre del medicamento">
    </div>

    <div class="form-group">
     <label for="dose">Dosis</label>
      <input type="text" placeholder="mg, mcg, ml, mg/ml">
    </div>

    <div class="form-group">
      <label for="presentation">Presentación</label>
      <select id="presentation" class="form-control">
      <option value="" disabled selected>Seleccione una presentación Farmacéutica</option>
      <option value="tableta">Tableta</option>
      <option value="gragea">Gragea</option>
      <option value="cápsula">Cápsula</option>
      <option value="comprimidos">Comprimido</option>
      <option value="jarabe">Jarabe</option>
      <option value="solución">Solución</option>
      <option value="jalea">Jalea</option>
      <option value="crema">Crema</option>
      <option value="solucion inyectbale">Solución inyectable</option>
      <option value="polvo">Polvo para reconstituir</option>
    </select>
    </div>

    <div class="form-group">
      <label for="lot">Lote</label>
      <input type="text" placeholder="Lote">
    </div>

    <div class="form-group">
      <label for="expiration date">Fecha de Vencimiento</label>
      <input type="date">
    </div>

    <div class="form-group">
      <label for="amount">Cantidad</label>
      <input type="number" placeholder="Cantidad ingresada">
    </div>

    <div class="form-group">
      <label for="laboratory">Laboratorio</label>
      <input type="text" placeholder="Fabricante">
    </div>


    <div class="form-group full-width">
      <button class="save-btn">GUARDAR CAMBIOS</button>
    </div>

    <div class="form-group full-width">
      <button on:click={returnMenu}  class="exit-btn">REGRESAR A MENÚ PRINCIPAL</button>
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

  /*Css del boton de regresar a menu principal*/
  .exit-btn{
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

