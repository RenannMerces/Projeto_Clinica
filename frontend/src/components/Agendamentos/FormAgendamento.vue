<template>

<div v-if="visivel" class="modal">

  <div class="form-container">

    <h2>Agendar Consulta</h2>

    <form @submit.prevent="agendar">

      <!-- ESPECIALIDADE -->
      <div class="campo">
        <label>Especialidade</label>
        <select v-model="form.especialidade" required>
          <option value="">Selecione</option>
          <option>Clínico Geral</option>
          <option>Cardiologia</option>
          <option>Dermatologia</option>
          <option>Pediatria</option>
        </select>
      </div>

      <!-- MÉDICO -->
      <div class="campo">
        <label>Médico</label>
        <select v-model="form.medico" required>
          <option value="">Selecione</option>
          <option>Dr. João Silva</option>
          <option>Dra. Ana Costa</option>
          <option>Dr. Pedro Santos</option>
        </select>
      </div>

      <!-- DATA -->
      <div class="campo">
        <label>Data</label>
        <input type="date" v-model="form.data" required>
      </div>

      <!-- HORÁRIO -->
      <div class="campo">
        <label>Horário</label>
        <select v-model="form.horario" required>
          <option value="">Selecione</option>
          <option>08:00</option>
          <option>09:00</option>
          <option>10:00</option>
          <option>11:00</option>
          <option>14:00</option>
          <option>15:00</option>
        </select>
      </div>

      <!-- BOTÕES -->
      <div class="botoes">

        <button type="submit" class="btn-agendar">
          Agendar
        </button>

        <button type="button" class="btn-cancelar" @click="fechar">
          Cancelar
        </button>

      </div>

    </form>

  </div>

</div>

</template>

<script>
export default {

  name:"FormAgendamento",

  props:["visivel"],

  data(){
    return{
      form:{
        especialidade:"",
        medico:"",
        data:"",
        horario:""
      }
    }
  },

  methods:{

    agendar(){

      console.log("Agendamento:", this.form)

      this.limpar()

      this.$emit("fechar")

    },

    fechar(){

      this.limpar()

      this.$emit("fechar")

    },

    limpar(){

      this.form = {
        especialidade:"",
        medico:"",
        data:"",
        horario:""
      }

    }

  }

}
</script>

<style scoped>

.modal{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.6);

  display:flex;
  align-items:center;
  justify-content:center;

  padding:20px;
  z-index:1000;
}

.form-container{
  background:white;
  padding:35px;
  border-radius:12px;

  width:100%;
  max-width:420px;
}

h2{
  margin-bottom:25px;
}

/* campos */

.campo{
  display:flex;
  flex-direction:column;
  margin-bottom:18px;
}

label{
  margin-bottom:6px;
  font-weight:500;
}

input, select{
  padding:10px;
  border-radius:6px;
  border:1px solid #ccc;
}

/* botões */

.botoes{
  display:flex;
  gap:10px;
  margin-top:10px;
}

.btn-agendar{
  flex:1;
  background:#3BAAB1;
  border:none;
  padding:12px;
  color:white;
  border-radius:6px;
  cursor:pointer;
}

.btn-cancelar{
  flex:1;
  background:#E80063;
  border:none;
  padding:12px;
  color:white;
  border-radius:6px;
  cursor:pointer;
}

/* RESPONSIVO */

@media (max-width:768px){

  .form-container{
    padding:25px;
  }

  .botoes{
    flex-direction:column;
  }

}

</style>