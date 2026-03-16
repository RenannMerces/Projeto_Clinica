<template>

<section class="agendamentos">

  <div class="container">

    <h2>Agendamentos</h2>

    <div class="tabela-wrapper">

      <table class="tabela-agendamentos">

        <thead>
          <tr>
            <th>Pacientes</th>
            <th>CPF</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Médico</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>

          <tr v-for="(agendamento, index) in agendamentos" :key="index">

            <td data-label="Nome Cliente" class="text-limit" :title="agendamento.nome">
              {{ agendamento.nome }}
            </td>

            <td data-label="CPF">
              {{ agendamento.cpf }}
            </td>

            <td data-label="Data">
              {{ agendamento.data }}
            </td>

            <td data-label="Hora">
              {{ agendamento.hora }}
            </td>

            <td data-label="Médico" class="text-limit" :title="agendamento.medico">
              {{ agendamento.medico }}
            </td>

            <td data-label="Status">

              <select v-model="agendamento.status" class="status-select">
                <option value="Pendente">Pendente</option>
                <option value="Confirmado">Confirmado</option>
              </select>

            </td>

            <td data-label="Ação">

              <button class="btn-cancelar" @click="cancelarAgendamento(index)">
                Cancelar
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

export default{

  name:"TabelaAdm",

  data(){
    return{

      agendamentos:[
        {
          nome:"Maria Souza",
          cpf:"123.456.789-00",
          data:"20/03/2026",
          hora:"09:00",
          medico:"Dr. João Silva",
          status:"Pendente"
        },
        {
          nome:"Carlos Lima",
          cpf:"987.654.321-00",
          data:"21/03/2026",
          hora:"14:30",
          medico:"Dra. Ana Costa",
          status:"Confirmado"
        }
      ]

    }
  },

  methods:{

    cancelarAgendamento(index){

      const confirmar = confirm("Deseja cancelar este agendamento?")

      if(confirmar){
        this.agendamentos.splice(index,1)
      }

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

/* botão cancelar */

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

/* select status */

.status-select{
  padding:6px 10px;
  border-radius:8px;
  border:1px solid #ddd;
  background:#f9f9f9;
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