<template>
<div>
  <div class="input-group mb-3">
    <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Correo: </span></div>
    <input v-model="email" type="text" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1">
  </div>
  <div class="input-group mb-3">
    <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Nombre: </span></div>
    <input v-model="nombre" type="text" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1">
  </div>
  <div class="input-group mb-3">
    <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Nueva Contraseña: </span></div>
    <input type="password" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1">
  </div>
  <div class="input-group mb-3">
    <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Dinero: </span></div>
    <input type="number" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1">
  </div>
  <div class="input-group mb-3">
  <div class="input-group-prepend" id="button-addon3">
    <button class="btn btn-outline-primary" type="button">Actualizar datos</button>
    <button class="btn btn-outline-danger" type="button">Eliminar cuenta</button>
  </div>
  <input type="text" class="form-control" placeholder="" aria-label="Example text with two button addons" aria-describedby="button-addon3">
</div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Usuario",
  data: function(){
    return {
      email: null,
      nombre: null
    }
  },
  // Cargo los datos del usuario
  mounted: function(){
    console.log(localStorage.usuario);
    axios.get(`http://localhost:3000/api/users/${localStorage.usuario}`)
    .then( data =>{
      this.email = data.data.email;
      this.nombre = data.data.name;
    })
  }
}
</script>

<style>
</style>