<template>
  <div class="container"> 
    <div class="input-group mb-3">
      <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Correo: </span></div>
      <input v-model="email" type="text" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1">
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Nombre: </span></div>
      <input v-model="name" type="text" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1">
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Nueva Contraseña: </span></div>
      <input v-model="password" type="password" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1">
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Dinero: </span></div>
      <input v-model="money" type="number" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1">
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend" id="button-addon3">
        <button v-on:click="actualizar" class="btn btn-outline-primary" type="button">Actualizar datos</button>
        <button v-on:click="eliminar" class="btn btn-outline-danger" type="button">Eliminar cuenta</button>
      </div>
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
      name: null,
      money: null,
      password: null
    }
  },
  // Cargar los datos del usuario
  mounted: function(){
    axios.get(`http://localhost:3000/api/users/${localStorage.usuario}`)
    .then( data =>{
      this.email = data.data.email
      this.name = data.data.name
      this.money = data.data.money
    })
  },
  methods:{
    // Actualizar datos del usuario
    actualizar: function(){
      let json = {
        email: this.email,
        name: this.name,
        password: this.password,
        money: this.money
      }
      axios.put(`http://localhost:3000/api/users/${localStorage.usuario}`, json)
      .then( data =>{
        this.email = data.data.email
        this.name = data.data.name
        this.money = data.data.money
        this.password = ""
      })
    },
    // Eliminar cuenta del usuario
    eliminar: function(){
      axios.delete(`http://localhost:3000/api/users/${localStorage.usuario}`)
      .then( data =>{
        console.log(data.data)
        localStorage.removeItem('usuario');
        this.$router.push('/');
      })     
    }
  }
}
</script>

<style>
</style>