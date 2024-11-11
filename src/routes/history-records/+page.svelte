<script>
function returnMenu() {
  window.location.href = "/main-page";
};
</script>


<div>
<div class="background"></div>

<div class="history-record"></div>
<form class="main-form">
<h1>HISTORIAL DE MOVIMIENTOS</h1>
<h2>CREADO, ACTUALIZADO Y ELIMINADO</h2>

<button class="create">Historial de Creación</button>
<button class="update">Historial de Actualización</button>
<button class="delete">Historial de Eliminación</button>
</form>
</div>


<div>
<button class="exit" on:click={returnMenu}>Regresar a Menu Principal</button>
</div>



<style>
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

.exit{
  display: flex;
  background-color: red;
  color: white;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

</style>