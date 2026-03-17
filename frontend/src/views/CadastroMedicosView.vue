<template>
    <div>
        <NavBar />
        <CadastroMedicoForm />
        <TabelaMedicos />
    </div>
</template>

<script>

import NavBar from "../components/NavBar.vue"
import CadastroMedicoForm from "../components/CadastroMedicoForm.vue"
import TabelaMedicos from "../components/TabelaMedicos.vue"

    export default{
        name: "CadastroMedicos",
        components:{
            NavBar,
            CadastroMedicoForm,
            TabelaMedicos
        }
    }
</script>

<style scoped>

</style>
