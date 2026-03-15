<template>
  <div class="register-page">

    <!-- LADO ESQUERDO -->
    <div class="left-side">
      <img src="/img/logo.png" alt="Logomarcar Clínica Mercês" class="logo">
    </div>

    <!-- LADO DIREITO -->
    <div class="right-side">
      <CadastroForm />
    </div>

  </div>
</template>

<script>
import CadastroForm from "../components/CadastroForm.vue"

export default {
  name: "CadastroView",
  components: {
    CadastroForm
  }
}
</script>

<style scoped>

.register-page{
  display:flex;
  height:100vh;
}

/* LADO ESQUERDO */

.left-side{
  width:50%;

  display:flex;
  justify-content:center;
  align-items:center;

  position:fixed;
  left:0;
  top:0;
  height:100vh;
}

.logo{
  width:350px;
}

/* LADO DIREITO */

.right-side{
  width:50%;
  margin-left:50%;
  height:100vh;
  overflow-y:auto;
  display:flex;
  justify-content:center;
  align-items:flex-start;
  background:#3F51B5;
  padding:60px 40px;
}

@media (max-width:768px){

  .register-page{
    flex-direction:column;
    height:auto;
  }
  .left-side{
    position:relative;
    width:100%;
    height:200px;
  }
  .right-side{
    width:100%;
    margin-left:0;
    height:auto;
    overflow:visible;
    padding:30px 20px;
  }
  .logo{
    width:120px;
  }

}
</style>