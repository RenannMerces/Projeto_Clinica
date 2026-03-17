<template>
    <div class="tipo-switch">
        <router-link to="/cadastro-paciente" class="switch-btn">
          Paciente
        </router-link>
        <router-link to="/cadastro-secretario" class="switch-btn">
          Secretário
        </router-link>
    </div>
</template>

<script>

    export default{
        name: "EscolhaCadastro"
    }

</script>

<style scoped>


.tipo-switch{
  display:flex;
  gap:10px;
  margin-bottom:25px;
}

.switch-btn{
  flex:1;
  text-align:center;
  padding:12px;
  border-radius:6px;
  text-decoration:none;
  font-weight:500;

  background:#f1f1f1;
  color:#333;
  border:1px solid #ccc;

  transition:0.3s;
}

/* Hover */
.switch-btn:hover{
  background:#e0e0e0;
}

/* Ativo (rota atual) */
.router-link-active.switch-btn{
  background:#3F51B5;
  color:white;
  border-color:#3F51B5;
}

</style>
