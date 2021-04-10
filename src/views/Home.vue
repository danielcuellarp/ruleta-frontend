<template>
  <div class="container home">
    <form v-on:submit.prevent="login">
      <div class="form-group">
        <label for="exampleInputEmail1">Correo</label>
        <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Contraseña</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <button type="submit" class="btn btn-primary mb-3">Ingresar</button>
    </form>
    <div class="alert alert-danger mb-3" role="alert" v-if="error">
        {{errorMessage}}
    </div>
    <a v-on:click="registrar" href="#" class="badge badge-light">¿No tienes cuenta? Registrate aqui.</a>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_API

export default {
  name: 'Home',
  components: {
  },
  data: function(){
    return {
      email: "",
      password: "",
      error: false,
      errorMessage: ""
    }
  },
  methods:{
    // Boton: Login
    login(){
      let json = {
        "email": this.email,
        "password": this.password
      };
      // Consulto la api para obtener el usuario      
      axios.post(`users/login`, json)
      .then( data =>{
        if (data.data.error === ""){
          this.error = false
          localStorage.usuario = data.data.usuario
          this.$store.dispatch("saveUserLogged", data.data.usuario)
          this.$router.push('ruleta')
        } else {
          this.error = true
          this.errorMessage = data.data.error
        }
      })
    },
    registrar(){
      this.$router.push('registrar')
    }
  }
}
</script>
