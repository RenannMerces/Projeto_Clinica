<template>
<div class="page-center">
  <div class="form-container">

    <h1>Cadastro de Médico</h1>
    <h3>Configure horários e disponibilidade</h3>

    <form @submit.prevent="cadastrarMedico">

      <!-- Nome -->
      <div class="input-group">
        <label>Nome do Médico</label>
        <input v-model="nome" type="text" placeholder="Ex: Dr. João Silva" required />
      </div>

      <!-- Especialidade -->
      <div class="input-group">
        <label>Especialidade</label>
        <input v-model="especialidade" type="text" placeholder="Ex: Cardiologista" required />
      </div>

      <!-- Duração -->
      <div class="input-group">
        <label>Duração da consulta</label>
        <select v-model="duracao">
          <option value="15">15 minutos</option>
          <option value="30">30 minutos</option>
          <option value="60">1 hora</option>
        </select>
      </div>

      <!-- Horários -->
      <div class="horarios">

        <div class="input-group">
          <label>Manhã</label>
          <div class="time-row">
            <input type="time" v-model="manhaInicio" />
            <span>até</span>
            <input type="time" v-model="manhaFim" />
          </div>
        </div>

        <div class="input-group">
          <label>Tarde</label>
          <div class="time-row">
            <input type="time" v-model="tardeInicio" />
            <span>até</span>
            <input type="time" v-model="tardeFim" />
          </div>
        </div>

      </div>

      <!-- Dias -->
      <div class="input-group">
        <label>Dias disponíveis</label>

        <div class="dias">
          <label v-for="dia in diasSemana" :key="dia">
            <input type="checkbox" :value="dia" v-model="diasSelecionados" />
            {{ dia }}
          </label>
        </div>
      </div>

      <!-- Botão -->
      <button type="submit" :disabled="!formValido">
        Cadastrar Médico
      </button>

    </form>

  </div>
</div>
</template>

<script>

import axios from "axios"
import Swal from "sweetalert2"

export default {
  name: "CadastroMedicoForm",

  data() {
    return {
      nome: "",
      especialidade: "",
      duracao: 30,

      manhaInicio: "08:00",
      manhaFim: "12:00",
      tardeInicio: "14:00",
      tardeFim: "18:00",

      diasSemana: ["Seg", "Ter", "Qua", "Qui", "Sex"],
      diasSelecionados: []
    }
  },

  computed: {
    formValido() {
      return (
        this.nome &&
        this.especialidade &&
        this.diasSelecionados.length > 0
      )
    }
  },

  methods: {
    async cadastrarMedico() {

      const confirmacao = await Swal.fire({
        title: "Cadastrar médico?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Cancelar"
      })

      if (!confirmacao.isConfirmed) return

      Swal.fire({
        title: "Cadastrando...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      })

      try {

        const token = localStorage.getItem("token")

        const medico = {
          nome: this.nome,
          especialidade: this.especialidade,
          duracaoConsulta: Number(this.duracao),
          dias: this.diasSelecionados,
          horarios: {
            manha: {
              inicio: this.manhaInicio,
              fim: this.manhaFim
            },
            tarde: {
              inicio: this.tardeInicio,
              fim: this.tardeFim
            }
          }
        }

        await axios.post("http://localhost:3000/medicos", medico, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        Swal.close()

        await Swal.fire({
          icon: "success",
          title: "Médico cadastrado!",
          timer: 1500,
          showConfirmButton: false
        })

        this.$emit("medico-cadastrado")

        // reset
        this.nome = ""
        this.especialidade = ""
        this.duracao = 30
        this.diasSelecionados = []

      } catch (error) {

        Swal.close()

        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Não foi possível cadastrar o médico"
        })

        console.error(error)
      }
    }
  }
}
</script>

<style scoped>

.page-center{
  display:flex;
  justify-content:center;
  align-items:center;
  min-height:100vh;
  background:#f5f6fa; /* opcional, fica bonito */
}

.form-container{
  width:100%;
  max-width:550px;
  padding:40px;
  background:white;
  border-radius:10px;
  box-shadow:0 5px 15px rgba(0,0,0,0.1);
}

h1, h3{
  text-align:center;
}

h3{
  margin-bottom:20px;
  font-weight:400;
}

.input-group{
  display:flex;
  flex-direction:column;
  margin-bottom:15px;
}

label{
  margin-bottom:5px;
  font-weight:500;
}

input, select{
  padding:12px;
  border-radius:6px;
  border:1px solid #ccc;
}

/* horários */
.horarios{
  display:flex;
  gap:15px;
  flex-wrap:wrap;
}

.time-row{
  display:flex;
  align-items:center;
  gap:8px;
}

/* dias */
.dias{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
}

/* botão */
button{
  width:100%;
  padding:12px;
  margin-top:10px;
  background:#3F51B5;
  color:white;
  border:none;
  border-radius:6px;
  cursor:pointer;
  transition:0.3s;
}

button:hover{
  background:#2f3fa3;
}

button:disabled{
  background:#aaa;
  cursor:not-allowed;
}

/* responsivo */
@media (max-width: 500px){
  .form-container{
    padding:20px;
  }

  .horarios{
    flex-direction:column;
  }
}

</style>