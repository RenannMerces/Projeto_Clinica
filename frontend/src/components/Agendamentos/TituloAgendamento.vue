<template>

<section class="boas-vindas">

  <div class="container">

    <h2 class="titulo">
      Seja bem-vindo!
    </h2>

    <button class="btn-agendar" @click="abrirForm = true">
      Realizar agendamento
    </button>

  </div>

  <!-- FORMULÁRIO -->
<FormAgendamento :visivel="abrirForm" @fechar="abrirForm = false"/>


</section>
</template>

<script>

import FormAgendamento from "./FormAgendamento.vue"
export default {
  name: "BoasVindas",
  components:{
    FormAgendamento
  },
  data(){
    return{
      abrirForm:false
    }
  }
}

</script>

<style scoped>

.boas-vindas{
  width:100%;
  background: #3BAAB1;
  padding:40px 20px;
}

/* container */

.container{
  max-width:1100px;
  margin:auto;

  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:20px;
}

/* titulo */

.titulo{
  font-size:28px;
  font-weight:600;
  color:#222;
}

/* botão */

.btn-agendar{
  background:#E80063;
  border:none;
  padding:14px 26px;

  color:white;
  font-size:16px;
  font-weight:600;

  border-radius:30px;
  cursor:pointer;

  transition:0.3s;
}

.btn-agendar:hover{
  background:#c00052;
  transform:translateY(-2px);
}

/* RESPONSIVO */

@media (max-width:768px){

  .container{
    flex-direction:column;
    text-align:center;
  }

  .titulo{
    font-size:22px;
  }

}

</style>