<script>

  function returnMenu() {
  window.location.href = "/main-page";
};

let historialData = [];
let error = null;

// Función para obtener los datos del historial de creación
async function getHistorialData() {
    try {
      //esto es lo que cambie para leer en Railway / despliegue
      const response = await fetch(`https://sirem-project-production-e2cc.up.railway.app/api/getHistorialCreacionMedicamentos`);

      if (!response.ok) {
        throw new Error("No se pudo obtener el historial de creación");
      }

      historialData = await response.json();
      console.log("Datos recibidos:", historialData);  // Verifica aquí
      error = null;
    } catch (err) {
      error = err.message;
      historialData = [];
      alert("Error al obtener el historial de creación. Por favor, intenta nuevamente.");
    }
  }


</script>


<div>
<div class="background"></div>

<div class="history-record"></div>
<h1>HISTORIAL DE MOVIMIENTOS</h1>
<h2>CREADO, ACTUALIZADO Y ELIMINADO</h2>


<div class="div-btns-hm">

  <button type="button" on:click={getHistorialData} class="create">Historial de Creación</button>
  <button class="update">Historial de Actualización</button>
  <button class="delete">Historial de Eliminación</button>


</div>

{#if historialData.length > 0}
  <table>
    <thead>
      <tr>
        <th>Fecha de Creación</th>
        <th>Nombre</th>
        <th>Código de Barras</th>
        <th>Fecha de Vencimiento</th>
        <th>Creado Por</th>
        <th>Lote</th>
      </tr>
    </thead>
    <tbody>
      {#each historialData as item}
        <tr>
          <td>{item.Fecha_creacion}</td>
          <td>{item.Nombre_medicamento}</td>
          <td>{item.Codigo_barras}</td>
          <td>{item.Fecha_vencimiento}</td>
          <td>{item.Lote_medicamento}</td>
          <td>{item.Creado_por}</td>
  
        </tr>
      {/each}
    </tbody>
  </table>
{:else if error}
  <p>{error}</p>
{/if}


</div>


<div class="exit">
<button class="exit" on:click={returnMenu}>Regresar a Menu Principal</button>
</div>



<style>
.div-btns-hm {
  display: flex;
  justify-content: center;
}
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

  h1{
    grid-column: span 2;
    text-align: center;
    background-color: #2c82a4a6; 
    color: white;
    padding: 10px;
    border-radius: 30px;
    font-size: 2.6rem;
}

h2{
    grid-column: span 2;
    text-align: center;
    background-color: #2c82a4a6; 
    color: white;
    padding: 10px;
    border-radius: 30px;
    font-size: 1.6rem;
}


   /*css de los botones historial create-update-delete*/

  .create{
  background-color: #2c82a4;
  color: white;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 50px;
  }

 .create:hover{
  background-color: rgb(21, 73, 133)
 }

.update{
  background-color: #2c82a4;
  color: white;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 50px;
}

.update:hover{
  background-color: rgb(21, 73, 133)
}

.delete{
  background-color: #2c82a4;
  color: white;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 50px;
}

.delete:hover{
  background-color: rgb(21, 73, 133)
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
.exit {
    display: flex;
    background-color: #2c82a4;
    color: white;
    font-weight: bold;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    position: fixed; 
    bottom: 70px;    
    right: 890px;     
    z-index: 10;    
  }

</style>