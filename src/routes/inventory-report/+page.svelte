<script>

  import { navigate } from "svelte-routing";
  
  function returnMenu() {
    console.log("regresando al menu principal");
    navigate('/main-page')
  }

  let inventoryReport = [];
  let error = null;

    // Función para obtener los datos del historial de creación
    async function getInventoryReport() {
        try {
          const response = await fetch("http://localhost:3000/api/getInventoryMedicamentos");

          if (!response.ok) {
            throw new Error("No se pudo obtener el historial de creación");
          }

          inventoryReport = await response.json();
          console.log("Datos recibidos:", inventoryReport);  // Verifica aquí
          error = null;
        } catch (err) {
          error = err.message;
          inventoryReport = [];
          alert("Error al obtener la informacion del inventario.");
        }
      }


  </script>


<div>
  <div class="background"></div>
  <div class="inventory-report"></div>
  <form class="main-form">
    <h1>BALANCE DE INVENTARIO</h1>

  <div class="form-group full-width">
  <button on:click={getInventoryReport} class="buscar-btn" id="buscar-btn">REPORTE DE INVENTARIO</button>
  </div>



{#if inventoryReport.length > 0}
  <table>
    <thead>
      <tr>
        <th>Codigo de Barras</th>
        <th>Nombre</th>
        <th>Dosis</th>
        <th>Presentacion</th>
        <th>Numero de Lote</th>
        <th>Cantidad</th>
        <th>Laboratorio</th>
        <th>Fecha de Vencimiento</th>
      </tr>
    </thead>
    <tbody>
      {#each inventoryReport as item}
        <tr>
          <td>{item.Codigo_barras ? item.Codigo_barras.slice() : ''}</td>
          <td>{item.Nombre ? item.Nombre.slice() : ''}</td>
          <td>{item.Dosis ? item.Dosis.slice() : ''}</td>
          <td>{item.Presentacion ? item.Presentacion.slice() : ''}</td>
          <td>{item.Numero_lote ? item.Numero_lote.slice() : ''}</td>
          <td>{item.Cantidad}</td>
          <td>{item.Laboratorio ? item.Laboratorio.slice() : ''}</td>
          <td>{item.Fecha_vencimiento ? item.Fecha_vencimiento.slice(0, 10) : ''}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else if error}
  <p>{error}</p>
{/if}

    
  <div>
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
 table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}

table th,
table td {
  padding: 12px;
  text-align: center;
  border: 1px solid #2c82a4;
}

table th {
  background-color: #2c82a4;
  color: white;
  font-weight: bold;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}
  .form-group {
    display: flex;
    flex-direction: column;
  }




</style>