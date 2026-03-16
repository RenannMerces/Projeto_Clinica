<template>

<section class="agendamentos">

  <div class="container">

    <h2>Meus Agendamentos</h2>

    <div class="tabela-wrapper">

      <table class="tabela-agendamentos">

        <thead>
          <tr>
            <th>Data</th>
            <th>Horário</th>
            <th>Médico</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>

          <tr v-for="(agendamento, index) in agendamentos" :key="index">
            <td data-label="Data">{{ agendamento.data }}</td>
            <td data-label="Horário">{{ agendamento.horario }}</td>
            <td data-label="Médico">{{ agendamento.medico }}</td>
            <td data-label="Status">
              <span class="status">{{ agendamento.status }}</span>
            </td>
            <td data-label="Ação">
              <button class="btn-cancelar">
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
export default {

  name: "TabelaAgendamentos",

  data(){
    return{

      agendamentos:[
        {
          data:"20/03/2026",
          horario:"09:00",
          medico:"Dr. João Silva",
          status:"Confirmado"
        },
        {
          data:"22/03/2026",
          horario:"14:30",
          medico:"Dra. Ana Costa",
          status:"Pendente"
        },
        {
          data:"25/03/2026",
          horario:"11:00",
          medico:"Dr. Pedro Santos",
          status:"Confirmado"
        }
      ]

    }
  }

}
</script>

<style scoped>

.agendamentos{
  padding:60px 20px;
  background:#f7f9fb;
}

.container{
  max-width:1100px;
  margin:auto;
}

h2{
  margin-bottom:25px;
  font-size:28px;
}

/* tabela */

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

/* cabeçalho */

.tabela-agendamentos thead{
  background:#3BAAB1;
  color:white;
}

.tabela-agendamentos th{
  padding:14px;
  text-align:left;
  font-weight:600;
}

/* linhas */

.tabela-agendamentos td{
  padding:14px;
  border-bottom:1px solid #eee;
}

/* status */

.status{
  padding:6px 12px;
  border-radius:20px;
  background:#e8f8f8;
  color:#2a7b80;
  font-size:14px;
}

/* botão */

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
    margin-bottom:15px;
    padding:15px;
    border-radius:10px;
    box-shadow:0 2px 10px rgba(0,0,0,0.05);
  }

  .tabela-agendamentos td{
    border:none;
    display:flex;
    justify-content:space-between;
    padding:8px 0;
  }

  .tabela-agendamentos td::before{
    content: attr(data-label);
    font-weight:600;
    color:#555;
  }

}

</style>