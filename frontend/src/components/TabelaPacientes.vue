<template>

<section class="agendamentos">

  <div class="container">

    <h2>Pacientes Cadastrados</h2>

    <div class="tabela-wrapper">

      <table class="tabela-agendamentos">

        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>CEP</th>
            <th>Rua</th>
            <th>Bairro</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>

          <tr v-for="(paciente, index) in pacientes" :key="index">
            <td data-label="ID">{{ index + 1 }}</td>
            <td data-label="Nome" class="text-limit">{{ paciente.nome }}</td>
            <td data-label="Email" class="text-limit">{{ paciente.email }}</td>
            <td data-label="CPF">{{ paciente.cpf }}</td>
            <td data-label="CEP">{{ paciente.cep }}</td>
            <td data-label="Rua" class="text-limit">{{ paciente.rua }}</td>
            <td data-label="Bairro" class="text-limit">{{ paciente.bairro }}</td>
            <td data-label="Cidade" class="text-limit">{{ paciente.cidade }}</td>
            <td data-label="Estado">{{ paciente.estado }}</td>
             <td data-label="Ação">
              <button class="btn-excluir" @click="excluirPaciente(paciente.id)">
                Excluir
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

  name: "TabelaPacientes",

  data(){
    return{
      pacientes: [],
      loading: false,
      erro: null
    }
  },

  methods: {

    async buscarPacientes(){
      this.loading = true
      this.erro = null

      try {

        const token = localStorage.getItem("token")

        console.log("Token:", token) // 🔍 DEBUG

        if(!token){
          this.erro = "Usuário não autenticado"
          this.loading = false // ⚠️ importante
          return
        }

        const response = await axios.get("http://localhost:3000/usuarios/pacientes", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        console.log("Resposta API:", response.data) // 🔍 DEBUG

        // 🔥 GARANTIR QUE É ARRAY
        if(!Array.isArray(response.data)){
          this.erro = "Formato de dados inválido"
          return
        }

        // 🔥 Mapear dados do backend para tabela
        this.pacientes = response.data.map(p => ({
          id: p._id,
          nome: p.nome,
          email: p.email,
          cpf: p.cpf || "-",
          cep: p.endereco?.cep || "-",
          rua: p.endereco?.rua || "-",
          bairro: p.endereco?.bairro || "-",
          cidade: p.endereco?.cidade || "-",
          estado: p.endereco?.estado || "-"
        }))

      } catch (error) {

        console.error("ERRO COMPLETO:", error)

        if(error.response){
          this.erro = error.response.data?.msg || "Erro ao buscar pacientes"
        } else {
          this.erro = "Erro de conexão com o servidor"
        }

      } finally {
        this.loading = false
      }
    },

      async excluirPaciente(id){

        const result = await Swal.fire({
          title: "Tem certeza?",
          text: "Essa ação não pode ser desfeita!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Sim, excluir!",
          cancelButtonText: "Cancelar"
        })

        if(!result.isConfirmed) return

        try {

          const token = localStorage.getItem("token")

          await axios.delete(`http://localhost:3000/usuarios/pacientes/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          await this.buscarPacientes()

          Swal.fire("Excluído!", "Paciente removido com sucesso.", "success")

        } catch (error) {

          Swal.fire("Erro!", "Não foi possível excluir.", "error")

        }
      }
  },

  mounted(){
    this.buscarPacientes()
  }
}
</script>

<style scoped>

.btn-excluir{
  background:#E80063;
  border:none;
  color:white;
  padding:8px 16px;
  border-radius:20px;
  cursor:pointer;
  transition:0.3s;
}

.btn-excluir:hover{
  background:#c00052;
}

.text-limit{
  max-width:180px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

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
    font-size:15px;
  }

  .tabela-agendamentos td::before{
    content: attr(data-label);
    font-weight:600;
    color:#777;
    font-size:14px;
  }

  /* destaque para o nome */

  .tabela-agendamentos tr td:first-child{
    font-size:17px;
    font-weight:600;
    color:#333;
    margin-bottom:8px;
    border-bottom:1px solid #eee;
    padding-bottom:12px;
  }

}

</style>