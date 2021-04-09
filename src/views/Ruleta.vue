<template>
  <div>
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <a v-on:click="usuario" class="nav-link active" href="#">Editar datos</a>
      </li>
      <li class="nav-item">
        <a v-on:click="salir" class="nav-link" href="#">Salir</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Ruleta",
  methods:{
    // Ir a la pagina de los datos del usuario
    usuario(){
      this.$router.push('usuario');
    },
    // Cerrar sesion
    salir(){
      localStorage.removeItem('usuario');
      this.$router.push('/');
    }
  }
}
</script>