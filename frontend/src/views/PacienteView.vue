<template>
  <div>
    <NavBar />
    <TabelaPacientes />
    ola
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue"
import TabelaPacientes from "../components/TabelaPacientes.vue"

export default {
  name: "PacienteView",
  components: {
    NavBar,
    TabelaPacientes
  }
}
</script>