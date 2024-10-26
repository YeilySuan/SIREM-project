<script>
import { navigate } from "svelte-routing";

function returnMenu() {
  console.log("regresando al menu principal");
  navigate('/main-page')
}

</script>


<div class="background"></div>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

<div class="user-management">
  <h1>MODULO DE GESTIÓN DE USUARIOS</h1>

  <div class="name-user">
    <i class="fas fa-user"></i>
    <button class="user" id="user">GABRIEL  TRILLOS</button>
    
    <i class="fas fa-user"></i>
    <button class="user" id="user">YEILY  ORTIZ </button>
    </div>

    <span class="instructions">Bienvenido al modulo de Gestión para los usuarios, por favor ingrese los datos que desee modificar. </span>
    

    <form class="user-form">
    <div class="form-group">
      <label for="cedula">Cédula</label>
      <input type="text" id="cedula" class="form-control">
    </div>


    <div class="form-group">
      <label for="nombre">Nombre Completo</label>
      <input type="text" id="nombre" class="form-control">
    </div>


    <div class="form-group">
      <label for="email">Correo Electrónico</label>
      <input type="email" id="email" class="form-control">
    </div>

    <div class="form-group">
      <label for="password">Contraseña</label>
      <input type="password" id="password" class="form-control">
    </div>

    <div class="form-group">
      <label for="text">Rol</label>
      <br>
      <select id="rol" class="form-control">
      <option value="" disabled selected>Seleccione un Rol</option>
      <option value="administrativo">Administrativo</option>
      <option value="operativo">Operativo</option>
  </select>
</div>

  <div class="form-buttons">
    <button type="submit" class="save-btn">GUARDAR CAMBIOS</button>
  </div>
  <form>

  <form class="boton-salir">
  <div class="form-buttons">
  <button on:click={returnMenu}  class="exit-btn">REGRESAR A MENÚ PRINCIPAL</button>
  </div>
</form>
 
</div>



<style>

/*css del fondo (imagen de usuarios) */
.background::before {
  content: '' ;
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-image: url(/src/lib/images/prueba.jpeg);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  opacity: 0.2;
  z-index: -1;
}

/*css de la caja contendora del formulario*/
.user-management{
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #5fa8c5;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
/*css de los iconos y botones de los usuarios*/
.name-user{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
}

.user{
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-left: 5px;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 100px;
}

.user:hover{
  background-color: #bae6f8a6;
}

/*css de los espacios del formulario*/
.form-group{
  margin-bottom: 40px;
  text-align: left;
  
}

/*css del formulario (input) */
.form-control{
  width: 95%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

/*css de los botones de guardar y salir*/
.form-buttons{
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.save-btn, .exit-btn{
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

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

.save-btn:hover, .exit-btn:hover{
  background-color: #2f5361;
}

.instructions {
    font-weight: bold;
  }

 h1{
    text-align: center;
    color: white;
    font-weight: bold;
    padding: 5px;
    font-size: 1.8rem;
 }

</style>