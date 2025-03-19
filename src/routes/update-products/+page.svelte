<script>
function returnMenu() {
  window.location.href = "/main-page";
};

let dialog;
//funciones para el modal de eliminar medicamento//
function abrirDialogo(){
    dialog.showModal();
}

function cerrarDialogo(){
    dialog.close();
}

let barCode = "";
let error = null;
let data = [];
let fechaVencimiento = "";
let nombre = "";
let dosis = "";
let presentacion = "";
let numeroLote = "";
let cantidad = "";
let laboratorio = "";

// Función para obtener datos del medicamento
async function getData() {
    if (!barCode) return;
    
    let url = `https://sirem-project-production-e2cc.up.railway.app/api/getMedicamentos/${barCode}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("No se pudo obtener el medicamento");

        data = await response.json();
        error = null;

        if (data.length > 0) {
            fechaVencimiento = data[0].Fecha_vencimiento.slice(0, 10);
            nombre = data[0].Nombre;
            dosis = data[0].Dosis;
            presentacion = data[0].Presentacion;
            numeroLote = data[0].Numero_lote;
            cantidad = data[0].Cantidad;
            laboratorio = data[0].Laboratorio;
        }
    } catch (err) {
        error = err.message;
        data = [];
    }
}

// Función para actualizar el medicamento
async function updateMedicamento() {
    if (!barCode) return;

    let url = `https://sirem-project-production-e2cc.up.railway.app/api/updateMedicamento/${barCode}`;

    let medicamentoActualizado = {
        nombre,
        presentacion,
        dosis,
        numeroLote,
        cantidad,
        fechaVencimiento,
        laboratorio
    };

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(medicamentoActualizado)
        });

        if (!response.ok) throw new Error("No se pudo actualizar el medicamento");

        alert("Medicamento actualizado correctamente");
        window.location.href = "/update-products";
    } catch (err) {
        alert("Error al actualizar el medicamento: " + err.message);
    }
}


</script>



<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
<div class="background"></div>

<div class="update-products">
  <form class="main-form">
    <h1>ACTUALIZAR MEDICAMENTO</h1>

    <div class="form-group">
      <label for="codigo-barras">Código de Barras</label>
      <input type="text" id="codigo-barras" bind:value={barCode} required />
  </div>


<button on:click={getData} type="submit" class="buscar-btn">
  <i class="fas fa-search"></i> Buscar
</button>

<div class="form-group">
  <label for="name">Nombre</label>
  <input type="text" bind:value={nombre}>
</div>

<div class="form-group">
  <label for="dose">Dosis</label>
   <input type="text" bind:value={dosis}>
 </div>

 <div class="form-group">
  <label for="presentation">Presentación</label>
   <input type="text" bind:value={presentacion}>
 </div>


 <div class="form-group">
  <label for="lot">Lote</label>
  <input type="text" bind:value={numeroLote}>
</div>

<div class="form-group">
  <label for="expiration date">Fecha de Vencimiento</label>
  <input type="date" bind:value={fechaVencimiento}>
</div>

<div class="form-group">
  <label for="amount">Cantidad</label>
  <input type="text" bind:value={cantidad}>
</div>

<div class="form-group">
  <label for="laboratory">Laboratorio</label>
  <input type="text" bind:value={laboratorio}>
</div>

 <!---- este es el boton de actualizar medicamento y el modal para confirmar actualizar -->
 <div class="show-modal">
  <dialog bind:this={dialog}>
   <form class="dialog" method="dialog">
    <p>¿Está seguro de querer actualizar este registro de forma permanente?</p>
    <button type="submit" id="button-cancelar" on:click={cerrarDialogo}>CANCELAR</button>
    <button on:click={updateMedicamento} id="button-actualizar" class="update-btn" >ACTUALIZAR MEDICAMENTO</button>  
  </form>
</dialog>
</div>


  <div class="form-group full-width">
  <button on:click={abrirDialogo} class="update-btn">ACTUALIZAR MEDICAMENTO</button>
  </div>


 <!---- 
<div class="form-group full-width">
<button on:click={updateMedicamento} class="update-btn">ACTUALIZAR MEDICAMENTO</button>
</div>
-->

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

/*css de la caja del formulario actualizar medicamento*/
.update-products{
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

 /*css del titulo actualizar medicamento*/
  h1{
    grid-column: span 2;
    text-align: center;
    background-color: #2c82a4a6; 
    color: white;
    padding: 10px;
    border-radius: 30px;
    font-size: 2.6rem;
}

/*CSS DEL MODAL */
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


#button-actualizar{
  background-color: red ;
  color: white ;
  font-weight: bold ;
  border: none ;
  padding: 10px 20px ;
  border-radius: 5px ;
  cursor: pointer;
  display: block ;
  margin: 0 auto ;
}


/*css de los input*/
input{
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
}

/*css del boton de actualizar*/
.update-btn{
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

.update-btn:hover{
  background-color: rgb(21, 73, 133);
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
  bottom: 15%;
}


.exit-btn:hover{
  background-color: rgb(21, 73, 133);
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