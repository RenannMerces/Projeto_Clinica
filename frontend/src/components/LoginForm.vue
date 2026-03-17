<template>
  <div class="login-container">

    <h1>LOGIN</h1>
    <h3>Faça o login agora mesmo!</h3>

    <form @submit.prevent="login">

      <div class="input-group">
        <label>Email</label>
        <input 
          type="email"
          v-model="email"
          placeholder="Digite seu email"
          maxlength="100"
          @input="email = email.trim()"
          required
        />
      </div>

      <div class="input-group">
        <label>Senha</label>
        <input 
          type="password"
          v-model="senha"
          minlength="6"
          maxlength="20"
          @input="senha = senha.replace(/\s/g,'')"
          placeholder="Digite sua senha"
          required
        />
      </div>

      <button type="submit" :disabled="!email || !senha">Entrar</button>

      <p class="cadastro">
        Não tem conta?
        <router-link to="/cadastro-paciente">Cadastrar</router-link>
      </p>

    </form>

  </div>
</template>

<script>

import axios from "axios"
  export default {
    name: "LoginForm",

    data() {
      return {
        email: "",
        senha: ""
      }
    },

 methods: {
  
  async login(){

    if(!this.email.includes("@")){
      alert("Digite um email válido")
      return
    }

    if(this.senha.length < 6){
      alert("A senha deve ter pelo menos 6 caracteres")
      return
    }

    try{

      const response = await axios.post("http://localhost:3000/auth/login", {
        email: this.email,
        senha: this.senha
      })

      // Salvar token no localStorage
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario))

      alert("Login realizado com sucesso!")

      // Redirecionar para página principal (exemplo)
      this.$router.replace("/agendamento")

    }catch(error){

      alert("Email ou senha inválidos")

      console.error(error)

    }
  }
}

}
</script>

<style scoped>

button:disabled{
  background:#aaa;
  cursor:not-allowed;
}

.login-container{
  width:100%;
  max-width:400px;
  padding:40px;
  background:white;
  border-radius:10px;
  box-shadow:0 5px 15px rgba(0,0,0,0.1);
}

h1{
  text-align:center;
}

h3{
  text-align:center;
  margin-bottom:20px;
  font-weight: 400;
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

input{
  padding:12px;
  border-radius:6px;
  border:1px solid #ccc;
}

button{
  width:100%;
  padding:12px;
  margin-top:10px;
  background:#3F51B5;
  color:white;
  border:none;
  border-radius:6px;
  cursor:pointer;
  transition: 0.5s;
}

button:hover{
  background:#2f3fa3;
}

.cadastro{
  text-align:center;
  margin-top:15px;
}

</style>