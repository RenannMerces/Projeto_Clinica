<template>
    <div>
        <NavBar />
        <CadastroMedicoForm @medico-cadastrado="atualizarTabela" />
        <TabelaMedicos ref="tabelaMedicos" />
    </div>
</template>

<script>

import NavBar from "../components/NavBar.vue"
import CadastroMedicoForm from "../components/CadastroMedicoForm.vue"
import TabelaMedicos from "../components/TabelaMedicos.vue"

    export default {
        name: "CadastroMedicos",
        components:{
            NavBar,
            CadastroMedicoForm,
            TabelaMedicos
        },
        methods: {
            atualizarTabela() {
            // acessa o método do componente filho via ref
            this.$refs.tabelaMedicos.buscarMedicos()
            }
        }
        }
</script>

<style scoped>

</style>
