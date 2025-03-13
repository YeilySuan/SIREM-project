<script>  
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  
  let data = [];
  let barCode = "";
  let error = null

 // Función para leer el medicamento desde la base de datos
  async function getData() {
    if (!barCode) return;
     //esto es lo que cambie para leer en Railway DESPLIEGUE
    let url = `https://sirem-project-production-e2cc.up.railway.app/api/getMedicamentos/${barCode}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("No se pudo obtener el Medicamento");
      }

      data = await response.json();
      error = null;

      if (data.length === 0) {
        alert("El medicamento con el código de barras ingresado no existe o ha sido eliminado.");
      }

    } catch (err) {
      error = err.message;
      data = [];
      alert("Error al buscar el medicamento. Por favor, intenta nuevamente.");
    }
  }

  function clearFields() {
    barCode = "";
    data = [];
    error = null;
  }

  const goToUserManagement = () => {
    goto('user-management')
  };

  const goToAddProducts = () => {
    goto('add-products')
  }; 

  const goToUpdateProducts = () => {
    goto('update-products')
  };

  const goToDeleteProducts = () => {
    goto('delete-products')
  };

const goToInventoryReport = () => {
    goto('inventory-report')
};

const goToHistoryRecords = () =>{
  goto('history-records')
};


let dialog;

function abrirDialogo(){
    dialog.showModal();
}

function cerrarDialogo(){
    dialog.close();
}
 
function closeSesion() {
    goto('/')
    cerrarDialogo();
  }

// Función para calcular la diferencia de fechas -MEDICAMENTOS PROXIMOS A VENCER-
let inventoryReport = [];

//Función para obtener los datos del historial de creación
async function getInventoryReport() {
  try {
      const response = await fetch("http://localhost:3000/api/getInventoryMedicamentos");

      if (!response.ok) {
        throw new Error("No se pudo obtener el historial de creación");
      }

      inventoryReport = await response.json();
      console.log("Datos recibidos:", inventoryReport);
      error = null;
    } catch (err) {
      error = err.message;
      inventoryReport = [];
      alert("Error al obtener la información del inventario.");
    }
}

function getRowColor(fechaVencimiento) {
    const hoy = new Date();
    const fechaVencimientoDate = new Date(fechaVencimiento);
    const diferenciaMeses = (fechaVencimientoDate.getFullYear() - hoy.getFullYear()) * 12 + fechaVencimientoDate.getMonth() - hoy.getMonth();

    if (diferenciaMeses <= 3) {
        return 'background-color: #ff6666;'; // Rojo claro para 3 meses o menos
    } else if (diferenciaMeses <= 6) {
        return 'background-color: #FFEB99;'; // Amarillo claro para 6 meses o menos
    } else {
        return 'background-color: #B3FFB3;'; // Verde claro para más de 6 meses
    }
}
</script>        




<div class="container">    
  <header>
      <div class="header-left" >
          <img src="/src/lib/images/LogoSIREM.png" alt="SIREM Logo" class="logo">
          <h1>Sistema de Información Registro y Notificación de Vencimiento de Medicamentos - SIREM </h1>
      </div>
      <div class="header-right">
          <p>Yeily Ortiz Angarita</p>
          <button on:click={abrirDialogo} preventDefault class="logout">Cerrar Sesión</button>
      </div>
  </header>

  <!---- este es el boton de cerrar sesion y el modal para confirmar cerrar sesión -->
<div class="show-modal">
  <dialog bind:this={dialog}>
   <form class="dialog" method="dialog">
    <p>¿Está seguro de cerrar la sesión?</p>
    <button type="submit" id="button-cancelar" on:click={cerrarDialogo}>CANCELAR</button>
    <button type="submit" id="button-salir" on:click={closeSesion}>CERRAR SESION</button>
  </form>
</dialog>
</div>


      
      <div class="actions">
          <button on:click={goToUserManagement}>Gestión de Usuarios</button>
          <button on:click={goToAddProducts}>Ingresar Medicamento</button>
          <button on:click={goToUpdateProducts}>Actualizar Medicamento</button>
          <button on:click={goToDeleteProducts}>Eliminar Medicamento</button>
          <button on:click={goToInventoryReport}>Reporte de Inventario</button>
      </div>


      <!-- este codigo es para el boton de busqueda de medicamentos por codigo de barras -->
      <div class="search-bar">
          <input placeholder="Consultar medicamento - Código de barras" id="codigo-barras" bind:value={barCode}>
          <button type="submit" id="buscar-btn" on:click={getData}>🔍</button>
      </div>

            {#if data.length > 0}
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Dosis</th>
              <th>Presentación</th>
              <th>Número de Lote</th>
              <th>Fecha de Vencimiento</th>
              <th>Cantidad</th>
              <th>Laboratorio</th>
            </tr>
          </thead>
          <tbody>
            {#each data as medicamento}
              <tr>
                <td>{medicamento.Nombre}</td>
                <td>{medicamento.Dosis}</td>
                <td>{medicamento.Presentacion}</td>
                <td>{medicamento.Numero_lote}</td>
                <td>{medicamento.Fecha_vencimiento.slice(0, 10)}</td>
                <td>{medicamento.Cantidad}</td>
                <td>{medicamento.Laboratorio}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else if error}
        <p>{error}</p>
      {/if}
     
      <button  id="limpiarBtn" class="clear-btn" on:click={clearFields}>Limpiar Campos</button>



<!-- este codigo es para el modulo de próximos a vencer -->
      <div>
        <div class="background"></div>
        <div class="inventory-report"></div>
        <form class="main-form">
          <h2> ⚠️MEDICAMENTOS PRÓXIMOS A VENCER⚠️</h2>
      
          <div class="form-group full-width">
            <button on:click={getInventoryReport} class="buscar-btn" id="buscar-btn-proximos">REPORTE DE INVENTARIO</button>
          </div>
      
          {#if inventoryReport.length > 0}
            <table>
              <thead>
                <tr>
                  <th>Código de Barras</th>
                  <th>Nombre</th>
                  <th>Dosis</th>
                  <th>Presentación</th>
                  <th>Número de Lote</th>
                  <th>Cantidad</th>
                  <th>Laboratorio</th>
                  <th>Fecha de Vencimiento</th>
                </tr>
              </thead>
              <tbody>
                {#each inventoryReport as item}
                  <tr style={getRowColor(item.Fecha_vencimiento)}>
                    <td>{item.Codigo_barras || ''}</td>
                    <td>{item.Nombre || ''}</td>
                    <td>{item.Dosis || ''}</td>
                    <td>{item.Presentacion || ''}</td>
                    <td>{item.Numero_lote || ''}</td>
                    <td>{item.Cantidad}</td>
                    <td>{item.Laboratorio || ''}</td>
                    <td>{item.Fecha_vencimiento ? item.Fecha_vencimiento.slice(0, 10) : ''}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          {:else if error}
            <p>{error}</p>
          {/if}
      </div>
  </div>




<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
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

#button-salir{
  background-color:red;
  color: white;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 50px;
}

/*ESTILOS DE BOTON Y H2 DE PROXIMOS A VENCER */
#buscar-btn-proximos {
  background-color: green;
  color: white;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: block;            
  margin: 0 auto;            
}


h2 {
  display: flex;
  align-items: center;      
  justify-content: center; 
  color: #382435;
  height: 10vh;        
  margin: 0;               
}


  /*CSS DEL BODY*/

  .container {
  background-color: #f4f4f4;
  }
  /*CSS DEL CONTENEDOR PRINCIPAL*/
  .container {
  max-width: 1500px;
  margin: 10px auto;
  padding: 20px;
  background-color: rgb(213, 216, 212);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  /*CSS DEL ENCABEZADO (DONDE ESTA EL LOGO)*/
  header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c82a4;
  padding: 20px 60px;
  color: white;
  }

  /*LETRA DEL ENCABEZADO*/
  .header-left {
  display: flex;
  align-items: center;
  color: #e4ebeb;
  }

  /*CSS DEL LOGO*/
  .logo {
  width: 200px;
  margin-right: 100px;
  }

  /*usuario en uso del SIREM*/
  .header-right {
  display: flex;
  align-items: center;
  color: #e8eff2;
  font-weight: bold;
  }

  .header-right p {
  margin-right: 5px;

  }

  .actions button:hover {
    background-color: rgb(21, 73, 133);
  }
  

  /*Logo de cerrar sesion*/
  .logout {
  background-color: red;
  color: white;
  font-weight: bold;
  border: none;
  padding: 5px 20px;
  border-radius: 5px;
  cursor: pointer;
  }
  /*SEPARADOR DE TODOS LOS CONTENEDORES*/
  .actions {
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
  }

  /*CSS DE LOS BOTONES DE GESTION DE USUARIO, INGRESAR,ACTUALIZAR,ELIMINAR,REPORTE */
  .actions button {
  padding: 20px 20px;
  background-color: #2c82a4;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  color: #e4ebeb;
  font-weight: bold;
  }

  /*CSS de la barra de buscar*/
  .search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  }

  .search-bar input {
  width: 500px;
  padding: 15px;
  border: 1px solid #f0ebeb;
  border-radius: 5px 0 0 5px;
  }

  .search-bar button {
  padding: 15px;
  background-color: #8fc1d4;
  border: none;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  }

  /*BOTON DE LIMPIAR CAMPOS*/
  
 
  /*CSS DE LAS TABLAS*/
  /*CSS BOTON LIMPIAR CAMPOS*/
  .clear-btn {
  display: block;
  margin: 0 auto;
  margin-top: 10px;
  padding: 10px 20px;
  background-color:red;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  }



  td {
  width: 10%;
  text-align: center;
  vertical-align: top;
  border: 1px solid #000;
  border-spacing: 0;
  padding: 20px;
  }
  th{
  width: 10%;
  text-align: center;
  vertical-align: top;
  border: 1px solid #000;
  border-spacing: 0;
  padding: 10px;
  background-color: #2c82a4;
  color: white;
  font-weight: bold;
  }


</style>