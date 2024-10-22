<script>

  import { navigate } from "svelte-routing";
  
  function returnMenu() {
    console.log("regresando al menu principal");
    navigate('/main-page')
  }

  </script>





<div>
  <div class="background"></div>
  <div class="inventory-report"></div>
  <form class="main-form">
  <h1>BALANCE DE INVENTARIO</h1>

  <div class="form-group full-width">
  <button class="buscar-btn" id="buscar-btn">REPORTE DE INVENTARIO</button>
  </div>

  <table class="inventory-table" id="resultado-busqueda">
    
    <thead>
        <tr>
            <th>Codigo de barras</th>
            <th>Nombre</th>
            <th>Presentación</th>
            <th>Dosis</th>
            <th>Lote</th>
            <th>Fecha de Vencimiento</th>
            <th>Cantidad</th>
            <th>Laboratorio</th>
        </tr>
    </thead>
    <tbody>
        
     
      <tr>
        <td id="resultado-codigo"></td>
        <td id="resultado-nombre"></td>
        <td id="resultado-presentacion"></td>
        <td id="resultado-dosis"></td>
        <td id="resultado-lote"></td>
        <td id="resultado-fecha"></td>
        <td id="resultado-cantidad"></td>
        <td id="resultado-laboratorio"></td>
      </tr>
     
      <tr>
        <td id="resultado-codigo"></td>
        <td id="resultado-nombre"></td>
        <td id="resultado-presentacion"></td>
        <td id="resultado-dosis"></td>
        <td id="resultado-lote"></td>
        <td id="resultado-fecha"></td>
        <td id="resultado-cantidad"></td>
        <td id="resultado-laboratorio"></td>
      </tr>
      <tr>
        <td id="resultado-codigo"></td>
        <td id="resultado-nombre"></td>
        <td id="resultado-presentacion"></td>
        <td id="resultado-dosis"></td>
        <td id="resultado-lote"></td>
        <td id="resultado-fecha"></td>
        <td id="resultado-cantidad"></td>
        <td id="resultado-laboratorio"></td>
      </tr>
      <tr>
        <td id="resultado-codigo"></td>
        <td id="resultado-nombre"></td>
        <td id="resultado-presentacion"></td>
        <td id="resultado-dosis"></td>
        <td id="resultado-lote"></td>
        <td id="resultado-fecha"></td>
        <td id="resultado-cantidad"></td>
        <td id="resultado-laboratorio"></td>
      </tr>
    </tbody>
</table>


  <button on:click={returnMenu} class="exit-btn">REGRESAR A MENU PRINCIPAL</button>

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

/*css de la tabla*/
.inventory-table{
  width:100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.inventory-table th,
.inventory-table td {
 border: 1px solid#000;
 padding: 10px;
 text-align: left;
}

.inventory-table th{
  background-color:#2c82a4a6;
  font-weight: bold;
  text-align: center;
}

.inventory-table td{
  background-color: beige;
}

/*css del titulo*/
h1{
    grid-column: span 2;
    text-align: center;
    font-weight: bold;
    background-color: #2c82a4a6; 
    color: white;
    padding: 10px;
    border-radius: 30px;
    font-size: 2.6rem;
}

/*css del boton de reporte de inventario*/
.buscar-btn{
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

.buscar-btn:hover{
  background-color: rgb(21, 73, 133);
}

/*css del boton de regresar a menu principal*/
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

 /*css del formulario*/
 .main-form {
    background-color: #a3c4cf;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
 }

  .form-group {
    display: flex;
    flex-direction: column;
  }




</style>