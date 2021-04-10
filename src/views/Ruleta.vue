<template>
  <div class="container">
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <a v-on:click="usuario" class="nav-link active" href="#">Editar datos</a>
      </li>
      <li class="nav-item">
        <a v-on:click="salir" class="nav-link" href="#">Salir</a>
      </li>
    </ul>

    <div class="container">
      <h2>Hola {{name}}</h2>
      <div class="card">
      <div class="card-body">
        <h5 class="card-title">Apuesta</h5>
        <p class="card-text">Seleccione el color de su apuesta y digite el dinero a apostar.</p>
        <div class="input-group mb-3">
          <div class="input-group-prepend" id="button-addon3">            
            <button v-on:click="selectColor('verde')" :class="{active: color == 'verde'}" class="btn btn-outline-success" type="button">Verde</button>
            <button v-on:click="selectColor('rojo')" :class="{active: color == 'rojo'}" class="btn btn-outline-danger" type="button">Rojo</button>
            <button v-on:click="selectColor('negro')" :class="{active: color == 'negro'}" class="btn btn-outline-dark" type="button">Negro</button>
          </div>
        </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <div class="input-group-text" id="btnGroupAddon">Dinero: </div>
            </div>
            <input v-model="money" type="number" class="form-control" aria-label="Input group example" aria-describedby="btnGroupAddon">
          </div>
          <small id="emailHelp" class="form-text text-muted mb-3">{{moneyHelp}}</small>
        <a v-on:click="apuesta" href="#" class="btn btn-primary mb-3">¡Jugar!</a>
        <div v-if="error" class="alert alert-warning" role="alert">
           {{errorMessage}}
        </div>
        <div v-if="apuestaMessage" class="alert alert-info" role="alert">
           {{apuestaMessage}}
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Ruleta",
  data: function(){
    return {
      name: "",
      money: 0,
      color: "",
      moneyHelp: "",
      error: false,
      errorMessage: "",
      apuestaMessage: ""
    }
  },
  
  // Cargo los datos del usuario
  mounted: function(){
    this.cargarDatos()
  },
  methods:{
    cargarDatos(){
      axios.get(`http://localhost:3000/api/users/${localStorage.usuario}`)
      .then( data =>{
        this.name = data.data.name;
        this.money = data.data.money;
        if(this.money <= 1000){
          this.moneyHelp = "Tienes el minimo permitido, vas All in."
        } else {
          this.moneyHelp = `Dinero disponible: ${this.money} (Solo puede apostar entre el 11% y 19%).`
        }
      })
    },

    // Ir a la pagina de los datos del usuario
    usuario(){
      this.$router.push('usuario');
    },

    // Cerrar sesion
    salir(){
      localStorage.removeItem('usuario');
      this.$router.push('/');
    },

    // Jugar apuesta
    apuesta(){
      this.error = false
      this.apuestaMessage = ""

      if (this.color === ""){
        this.error = true
        this.errorMessage = "Debes seleccionar un color para la apuesta."
      } else if (this.money === 0){
        this.error = true
        this.errorMessage = "El valor de la apuesta no puede ser cero."
      } else { 
        let json = {
          color: this.color,
          money: this.money,
          usuario: localStorage.usuario
        }        

        // Consulto el endpoint de la apuesta
        axios.post('http://localhost:3000/api/ruleta', json)
        .then( data =>{
          console.log(data.data)
          if (data.data.resultado === true){            
            this.apuestaMessage = `¡Felicitaciones! Ganaste ${data.data.ganancia}`
          } else {
            this.apuestaMessage = `¡Lo siento! perdiste la apuesta`
          }

          this.color = ""
          this.cargarDatos()
        })
      }       
    },

    // Seleccionar color
    selectColor: function(c){
      this.color = c
    }
  }
}
</script>