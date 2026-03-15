<template>
  <div class="login-page">

    <!-- Lado esquerdo -->
    <div class="left-side">
      <img src="/img/logo.png" alt="Logomarcar Clínica Mercês" class="logo">
    </div>

    <!-- Lado direito -->
    <div class="right-side">
      <LoginForm />
    </div>

  </div>
</template>

<script>
  import LoginForm from "../components/LoginForm.vue"

  export default {
    name: "LoginView",
    components: {
      LoginForm
    }
  }
</script>


<style scoped>

  .login-page{
    display:flex;
    min-height:100vh;
  }

  .left-side{
    flex:1;
    background:#f5f5f5;
    display:flex;
    justify-content:center;
    align-items:center;
  }

  .logo{
    width: 350px;
  }

  .right-side{
    flex:1;
    display:flex;
    justify-content:center;
    align-items:center;
    background:#3F51B5;
  }

@media (max-width: 768px){

  .login-page{
    flex-direction:column;
    min-height:100vh;
  }

  .left-side{
    flex:none;
    height:200px;
  }

  .right-side{
    flex:1;
    height:auto;
    padding:30px 20px;
  }

  .logo{
    width:150px;
  }

}

</style>