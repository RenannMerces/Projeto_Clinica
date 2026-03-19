<template>

<section class="agendamentos">

  <div class="container">

    <h2>Meus Agendamentos</h2>

    <div class="tabela-wrapper">

      <table class="tabela-agendamentos">

        <thead>
          <tr>
            <th>Médico</th>
            <th>Especialidade</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>

      <tbody>

        <tr v-for="agendamento in agendamentos" :key="agendamento._id">

          <td data-label="Médico">
            {{ agendamento.medicoId?.nome }}
          </td>

          <td data-label="Especialidade">
            {{ agendamento.medicoId?.especialidade }}
          </td>

          <td data-label="Data">
            {{ formatarData(agendamento.data) }}
          </td>

          <td data-label="Hora">
            {{ agendamento.horario }}
          </td>

          <td data-label="Status">
            <span class="status">{{ agendamento.status }}</span>
          </td>

          <td data-label="Ação">
            <button 
              class="btn-cancelar"
              @click="cancelarAgendamento(agendamento._id)"
            >
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
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "TabelaAgendamentos",

  data() {
    return {
      agendamentos: []
    };
  },

  mounted() {
    this.buscarAgendamentos();
  },

  methods: {
    async buscarAgendamentos() {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:3000/agendamentos/meus", {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.agendamentos = res.data;

      } catch (err) {
        console.error("Erro ao buscar agendamentos:", err);
      }
    },

    async cancelarAgendamento(id) {
      try {
        const token = localStorage.getItem("token");

        await axios.delete(`http://localhost:3000/agendamentos/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        Swal.fire("Cancelado!", "Agendamento removido.", "success");

        this.buscarAgendamentos(); // 🔄 atualiza lista

      } catch (err) {
        console.error(err);
        Swal.fire("Erro", "Não foi possível cancelar", "error");
      }
    },

    formatarData(data) {
      const [ano, mes, dia] = data.split("-");
      return `${dia}/${mes}/${ano}`;
    }
  }
};
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