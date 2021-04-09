<template>
  <div class="home">
    <form v-on:submit.prevent="login">
      <div class="form-group">
        <label for="exampleInputEmail1">Correo</label>
        <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Contraseña</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <button type="submit" class="btn btn-primary">Ingresar</button>
    </form>
    <div class="alert alert-danger" role="alert" v-if="error">
        {{errorMessage}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios';

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
      axios.post('http://localhost:3000/api/users/login', json)
      .then( data =>{
        if (data.data.error === ""){
          this.error = false;
          localStorage.usuario = data.data.usuario;
          this.$router.push('ruleta');
        } else {
          this.error = true;
          this.errorMessage = data.data.error;
        }
      })
    }
  }
}
</script>
