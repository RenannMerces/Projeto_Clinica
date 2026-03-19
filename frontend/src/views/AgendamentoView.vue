<template>
    <div>
        <NavBar />
        <BannerAgendamento />
        <BoasVindas :usuario="usuarioLogado" @agendamento-criado="atualizarTabela"/>
        <TabelaAgendamentos ref="tabela"/>
    </div>
    
</template>

<script>

    import NavBar from "../components/NavBar.vue"
    import BannerAgendamento from "../components/Agendamentos/BannerAgendamento.vue"
    import BoasVindas from "../components/Agendamentos/BoasVindasAgendamento.vue"
    import TabelaAgendamentos from "../components/Agendamentos/TabelaAgendamentos.vue"

    export default {
        name: "AgendamentoView",
        components: {
            NavBar,
            BannerAgendamento,
            BoasVindas,
            TabelaAgendamentos
        },data(){
        return {
            usuarioLogado: {
            nome: "Renan Mercês",
            }
        }
        }, methods: {
            atualizarTabela() {
                this.$refs.tabela.buscarAgendamentos();
            }
        }
    }
</script>
