<template>
<div>
    <BannerAdm />
    <section class="agendamentos">
  <div class="container">
    <div class="tabela-wrapper">
      <table class="tabela-agendamentos">

        <thead>
          <tr>
            <th>Paciente</th>
            <th>CPF</th>
            <th>Especialidade</th>
            <th>Médico</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="agendamento in agendamentos" :key="agendamento._id">

            <td data-label="Paciente">
              {{ agendamento.pacienteId?.nome || agendamento.nomePaciente }}
            </td>

            <td data-label="CPF">
              {{ agendamento.pacienteId?.cpf || agendamento.cpfPaciente }}
            </td>

            <td data-label="Especialidade">
              {{ agendamento.especialidade }}
            </td>

            <td data-label="Médico">
              {{ agendamento.medicoId?.nome }}
            </td>

            <td data-label="Data">
              {{ formatarData(agendamento.data) }}
            </td>

            <td data-label="Hora">
              {{ agendamento.horario }}
            </td>

            <td data-label="Status">
              <select 
                v-model="agendamento.status" 
                @change="atualizarStatus(agendamento)"
                class="status-select"
              >
                <option value="pendente">Pendente</option>
                <option value="confirmado">Confirmado</option>
                <option value="finalizado">Finalizado</option>
              </select>
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
</div>

</template>

<script>
import BannerAdm from "../components/BannerAdm.vue"
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "TabelaAdm",
  components: {
    BannerAdm
  },

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

        const res = await axios.get("http://localhost:3000/agendamentos", {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.agendamentos = res.data;

      } catch (err) {
        console.error("Erro ao buscar agendamentos:", err);
      }
    },

    async atualizarStatus(agendamento) {
      try {
        const token = localStorage.getItem("token");

        await axios.put(
          `http://localhost:3000/agendamentos/${agendamento._id}`,
          { status: agendamento.status },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        Swal.fire("Atualizado!", "Status alterado com sucesso.", "success");

      } catch (err) {
        console.error(err);
        Swal.fire("Erro", "Não foi possível atualizar o status", "error");
      }
    },

    async cancelarAgendamento(id) {
      try {
        const confirm = await Swal.fire({
          title: "Tem certeza?",
          text: "Deseja cancelar este agendamento?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sim, cancelar"
        });

        if (!confirm.isConfirmed) return;

        const token = localStorage.getItem("token");

        await axios.delete(`http://localhost:3000/agendamentos/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        Swal.fire("Cancelado!", "Agendamento removido.", "success");

        this.buscarAgendamentos(); // 🔄 atualiza tabela

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