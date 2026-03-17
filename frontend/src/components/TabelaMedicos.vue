<template>

<section class="agendamentos">

  <div class="container">

    <h2>Médicos Cadastrados</h2>

    <div class="tabela-wrapper">

      <table class="tabela-agendamentos">

        <thead>
          <tr>
            <th>Nome</th>
            <th>Especialidade</th>
            <th>Duração</th>
            <th>Horários</th>
            <th>Dias</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>

          <tr v-for="(medico, index) in medicos" :key="index">

            <td data-label="Nome" class="text-limit" :title="medico.nome">
              {{ medico.nome }}
            </td>

            <td data-label="Especialidade">
              {{ medico.especialidade }}
            </td>

            <td data-label="Duração">
              {{ medico.duracaoConsulta }} min
            </td>

            <td data-label="Horários" class="text-limit">

              <div>
                🌅 {{ medico.horarios.manha.inicio }} - {{ medico.horarios.manha.fim }}
              </div>
              <div>
                🌇 {{ medico.horarios.tarde.inicio }} - {{ medico.horarios.tarde.fim }}
              </div>

            </td>

            <td data-label="Dias" class="text-limit">
              {{ medico.dias.join(", ") }}
            </td>

            <td data-label="Ação">

              <button class="btn-cancelar" @click="$emit('remover', index)">
                Remover
              </button>

            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>

</section>

</template>

<script>
    export default {
    name: "TabelaMedicos",

    props: {
        medicos: {
        type: Array,
        required: true,
        default: () => []
        }
    },

    methods: {
        removerMedico(index) {
        this.$emit("remover", index)
        }
    }
    }
</script>

<style scoped>

.agendamentos{
  padding:60px 20px;
}

.container{
  max-width:1100px;
  margin:auto;
}

h2{
  margin-bottom:25px;
  font-size:28px;
}

.tabela-wrapper{
  overflow-x:auto;
}

.tabela-agendamentos{
  width:100%;
  border-collapse:collapse;
  background:white;
  border-radius:10px;
  overflow:hidden;
}

.tabela-agendamentos thead{
  background:#3BAAB1;
  color:white;
}

.tabela-agendamentos th{
  padding:14px;
  text-align:left;
  font-weight:600;
}

.tabela-agendamentos td{
  padding:14px;
  border-bottom:1px solid #eee;
}

/* botão remover (mesmo estilo) */

.btn-cancelar{
  background:#E80063;
  border:none;
  color:white;
  padding:8px 16px;
  border-radius:20px;
  cursor:pointer;
  transition:0.3s;
}

.btn-cancelar:hover{
  background:#c00052;
}

/* limitar texto */

.text-limit{
  max-width:180px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

/* RESPONSIVO */

@media (max-width:768px){

  .tabela-agendamentos thead{
    display:none;
  }

  .tabela-agendamentos,
  .tabela-agendamentos tbody,
  .tabela-agendamentos tr,
  .tabela-agendamentos td{
    display:block;
    width:100%;
  }

  .tabela-agendamentos tr{
    background:white;
    margin-bottom:20px;
    padding:18px;
    border-radius:12px;
    box-shadow:0 6px 18px rgba(0,0,0,0.06);
    border-left:5px solid #3BAAB1;
  }

  .tabela-agendamentos td{
    border:none;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:10px 0;
  }

  .tabela-agendamentos td::before{
    content: attr(data-label);
    font-weight:600;
    color:#777;
  }

}

</style>