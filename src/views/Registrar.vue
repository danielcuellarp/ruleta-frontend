<template>
  <div class="container">
    <form v-on:submit.prevent="registrar">
      <div class="form-group">
        <label for="exampleInputEmail1">Correo: </label>
        <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      </div>
      <div class="form-group">
        <label for="">Nombre: </label>
        <input v-model="name" type="text" class="form-control" id="name">
      </div>
      <div class="form-group">
        <label for="">Contraseña: </label>
        <input v-model="password" type="password" class="form-control" id="password">
      </div>
      <button type="submit" class="btn btn-primary mb-3">Crear Cuenta</button>
      <div v-if="error" class="alert alert-warning" role="alert">
        {{error}}
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Registrar',
  components: {
  },
  data: function(){
    return {
      email: "",
      name: "",
      password: "",
      error: ""
    }
  },
  methods:{
    registrar(){
        let json = {
        "email": this.email,
        "password": this.password,
        "name": this.name
      };
      // Consulto la api para obtener el usuario
      axios.post('http://localhost:3000/api/users/', json)
      .then( data =>{
        if (data.data._id === undefined){
          this.error = 'Ya existe una cuenta con ese correo.'
        } else{
          localStorage.usuario = data.data._id;
          this.$router.push('ruleta');
        }        
      })
    }
  }
}
</script>
