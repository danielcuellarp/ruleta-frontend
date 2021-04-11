<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Datos del usuario</h5>
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
          <input v-model="password" disabled type="password" class="form-control" placeholder="en desarrollo..." aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Dinero: </span></div>
          <input v-model="money" type="number" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend" id="button-addon3">
            <button v-on:click="actualizar" class="btn btn-outline-primary" type="button">Actualizar datos</button>
            <button v-on:click="eliminar" class="btn btn-outline-danger" type="button">Eliminar cuenta</button>
            <button v-on:click="volver" class="btn btn-outline-info" type="button">Volver</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
    axios.get(`users/${localStorage.usuario}`)
    .then( data =>{
      this.email = data.data.email
      this.name = data.data.name
      this.money = data.data.money
      this.password = ""
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

      // en desarrollo
      // solo actualizar la contraseña si se digito una nueva
      // toca modificar el backend para poder implementar ese proceso correctamente
      if (this.password === ""){
        delete json.password
      }

      axios.put(`users/${localStorage.usuario}`, json)
      .then( data =>{
        console.log(data.data)
        this.email = data.data.email
        this.name = data.data.name
        this.money = data.data.money
        this.password = "" // limpiar si se digito contraseña nueva        
      })

      //this.$router.push('ruleta');
    },
    // Eliminar cuenta del usuario
    eliminar: function(){
      axios.delete(`users/${localStorage.usuario}`)
      .then( data =>{
        console.log(data.data)
        localStorage.removeItem('usuario');
        this.$store.dispatch("logout");
      })     
    },
    volver: function() {
      this.$router.push('ruleta');
    }
  }
}
</script>

<style>
</style>