<template>
    <div>
        <NavBar />
        <TabelaAdm />
    </div>
</template>

<script>

import NavBar from '../components/NavBar.vue'
import TabelaAdm from '../components/TabelaAdm.vue'

    export default {
        name: "AdmAgendamentos",
        components:{
            NavBar,
            TabelaAdm
        }
    }
</script>
