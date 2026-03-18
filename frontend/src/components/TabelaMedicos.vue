<template>

<section class="agendamentos">

  <div class="container">

    <h2>Médicos Cadastrados</h2>

    <div class="tabela-wrapper">

      <table class="tabela-agendamentos">

        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Especialidade</th>
            <th>Duração</th>
            <th>Horários</th>
            <th>Dias</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>

          <!-- Sem dados -->
          <tr v-if="medicos.length === 0">
            <td colspan="7" style="text-align:center; padding:20px;">
              Nenhum médico cadastrado
            </td>
          </tr>

          <!-- Lista -->
          <tr v-for="(medico, index) in medicos" :key="medico._id">

            <td data-label="ID">
              {{ index + 1 }}
            </td>

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
                {{ medico.horarios?.manha?.inicio }} - {{ medico.horarios?.manha?.fim }}
              </div>
              <div>
                {{ medico.horarios?.tarde?.inicio }} - {{ medico.horarios?.tarde?.fim }}
              </div>
            </td>

            <td data-label="Dias" class="text-limit">
              {{ medico.dias?.join(", ") }}
            </td>

            <td data-label="Ação">

              <button 
                class="btn-cancelar" 
                @click="removerMedico(medico._id)"
              >
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
import axios from "axios"
import Swal from "sweetalert2"

export default {
  name: "TabelaMedicos",

  data() {
    return {
      medicos: []
    }
  },

  created() {
    this.buscarMedicos()
  },

  methods: {

    // 🔹 GET médicos
    async buscarMedicos() {
      try {

        const token = localStorage.getItem("token")

        const response = await axios.get("http://localhost:3000/medicos", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        this.medicos = response.data

      } catch (error) {
        console.error("Erro ao buscar médicos:", error)
      }
    },

   async removerMedico(id) {

      const confirm = await Swal.fire({
        title: "Tem certeza?",
        text: "Essa ação não pode ser desfeita!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, remover",
        cancelButtonText: "Cancelar"
      })

      if (!confirm.isConfirmed) return

      try {

        const token = localStorage.getItem("token")

        // 🔥 Loading
        Swal.fire({
          title: "Removendo...",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading()
        })

        await axios.delete(`http://localhost:3000/medicos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        Swal.close()

        await Swal.fire({
          icon: "success",
          title: "Médico removido!",
          timer: 1500,
          showConfirmButton: false
        })

        // 🔄 Atualiza lista SEM recarregar tudo
        this.medicos = this.medicos.filter(m => m._id !== id)

      } catch (error) {

        Swal.close()

        Swal.fire({
          icon: "error",
          title: "Erro ao remover médico",
          text: error.response?.data?.msg || "Erro no servidor"
        })

        console.error(error)
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