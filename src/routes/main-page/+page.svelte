<script>  
  import { goto } from "$app/navigation";
  import { getMedicineForBtnMainPage } from "../../lib/HandleSearchMedicineBtnMainPage";

  let barCode = "";
  let result = null;
  let error = null


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

const getMedicineFunc = async () => {
    try {
      const result = await getMedicineForBtnMainPage(barCode);
      if (result && result.id) {
        console.log('respuesta del server:', `Usuario registrado con el Id: ${result.id}`);
        data = result;
        
      }
      

    } catch (error) {
      console.log('error en getMedicineForMainPage', error);
    }
  }


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



</script>        

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
  
  .expiring {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  }
  /*contenedores de las tablas*/
  
  .expiring th {
  background-color: #2c82a4;
  color: white;
  font-weight: bold;
  padding:15px;
  }
  /*CSS DE LAS TABLAS*/
  
  .expiring td {
  padding: 10px;
  border: 1px solid #312f2f;
  text-align: center;
  }
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

  .clear-btn:hover {
  background-color: darkred;
  }

  .red {
  background-color:RED;
  color: white;
  }

  .yellow {
  background-color:yellow;
  }

  .green {
  background-color:green;
  }

  /*Este es el estilo de la tabla de buscar medicamento por codigo de barras*/

  .result-table{
  border: 1px solid #000;
  width: 100%;
  background-color: #ffffff;
  padding: 0px;
  border-collapse: collapse;
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

<div class="container">    
  <header>
      <div class="header-left" >
          <img src="/src/lib/images/LogoSIREM.png" alt="SIREM Logo" class="logo">
          <h1>Sistema de Información Registro y Notificación de Vencimiento de Medicamentos</h1>
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

  <main>
      
      <div class="actions">
          <button on:click={goToUserManagement}>Gestión de Usuarios</button>
          <button on:click={goToAddProducts}>Ingresar Medicamento</button>
          <button on:click={goToUpdateProducts}>Actualizar Medicamento</button>
          <button on:click={goToDeleteProducts}>Eliminar Medicamento</button>
          <button on:click={goToInventoryReport}>Reporte de Inventario</button>
      </div>

      <!-- este codigo es para el boton de busqueda de medicamentos por codigo de barras -->
      <div class="search-bar">
          <input bind:value={barCode} type="text" placeholder="Consultar medicamento - Código de barras" id="codigo-barras">
          <button id="buscar-btn" on:click={getMedicineFunc}>🔍</button>
      </div>

      <table class="result-table" id="resultado-busqueda" style="display: none;">
          <thead>
              <tr>
                  <th>Nombre</th>
                  <th>Presentación</th>
                  <th>Lote</th>
                  <th>Fecha de Vencimiento</th>
                  <th>Cantidad</th>
                  <th>Laboratorio</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td id="resultado-nombre"></td>
                  <td id="resultado-presentacion"></td>
                  <td id="resultado-lote"></td>
                  <td id="resultado-fecha"></td>
                  <td id="resultado-cantidad"></td>
                  <td id="resultado-laboratorio"></td>
              </tr>
          </tbody>
      </table>
      <button on:click={limpiarCampos} id="limpiarBtn" class="clear-btn">Limpiar Campos</button>

      
      <h2>Próximos a Vencer</h2>
      <table class="expiring">
          <thead>
              <tr>
                  <th>Nombre</th>
                  <th>Presentación</th>
                  <th>Lote</th>
                  <th>Fecha de Vencimiento</th>
                  <th>Cantidad</th>
              </tr>
          </thead>
          <tbody>
              <tr class="red">
                  <td>Acetaminofen</td>
                  <td>Tableta</td>
                  <td>RC45789</td>
                  <td>20/09/2024</td>
                  <td>10</td>
              </tr>
              <tr class="red">
                  <td>Ibuprofeno</td>
                  <td>Jarabe</td>
                  <td>4567852</td>
                  <td>10/10/2024</td>
                  <td>15</td>
              </tr>
              <tr class="red">
                  <td>Betametasona</td>
                  <td>Crema</td>
                  <td>T345</td>
                  <td>15/10/2024</td>
                  <td>5</td>
              </tr>
              <tr class="yellow">
                  <td>Lomotil</td>
                  <td>Tableta</td>
                  <td>C45632</td>
                  <td>10/01/2025</td>
                  <td>40</td>
              </tr>
              <tr class="yellow">
                  <td>Smecta</td>
                  <td>Polvo</td>
                  <td>456987</td>
                  <td>20/02/2025</td>
                  <td>10</td>
              </tr>
              <tr class="green">
                  <td>Glibenclamida</td>
                  <td>Tableta</td>
                  <td>75214L</td>
                  <td>14/11/2025</td>
                  <td>8</td>
              </tr>
              <tr class="green">
                  <td>Buscapina</td>
                  <td>Tableta</td>
                  <td>R4568</td>
                  <td>10/12/2026</td>
                  <td>22</td>
              </tr>
          </tbody>
      </table>
  </main>
</div>
