<template>
  <div class="register-container">

    <h1>CADASTRO</h1>
    <h3>Faça seu cadastro agora mesmo!</h3>

    <form @submit.prevent="cadastrar">

      <!-- PRIMEIRO CAMPO -->

      <div class="input-group">
        <label>Tipo de Usuário</label>
        <select v-model="tipoUsuario">
          <option value="paciente">Paciente</option>
          <option value="secretario">Secretário</option>
        </select>
      </div>

      <div class="input-group">
        <label>Nome</label>
        <input type="text" v-model="nome" required />
      </div>

      <div class="input-group">
        <label>Email</label>
        <input type="email" v-model="email" required />
      </div>

      <div class="input-group">
        <label>Senha</label>
        <input type="password" v-model="senha" required />
      </div>

      <div class="input-group">
        <label>Confirmar Senha</label>
        <input type="password" v-model="confirmarSenha" required />
      </div>

      <!-- CAMPOS PACIENTE -->

      <div v-if="tipoUsuario === 'paciente'">

        <div class="input-group">
          <label>CPF</label>
          <input type="text" v-model="cpf" />
        </div>

        <div class="input-group">
          <label>CEP</label>
          <input type="text" v-model="cep" @blur="buscarCep"/>
        </div>

        <div class="input-group">
          <label>Rua</label>
          <input type="text" v-model="rua" />
        </div>

        <div class="input-group">
          <label>Bairro</label>
          <input type="text" v-model="bairro" />
        </div>

        <div class="input-group">
          <label>Cidade</label>
          <input type="text" v-model="cidade" />
        </div>

        <div class="input-group">
          <label>Estado</label>
          <input type="text" v-model="estado" />
        </div>

      </div>

      <button type="submit">Cadastrar</button>

      <p class="login-link">
        Já possui conta?
        <router-link to="/login">Entrar</router-link>
      </p>

    </form>

  </div>
</template>

<script>
import axios from "axios"

export default {

  name: "CadastroForm",

  data(){
    return{

      nome:"",
      email:"",
      senha:"",
      confirmarSenha:"",
      tipoUsuario:"paciente",

      cpf:"",
      cep:"",
      rua:"",
      bairro:"",
      cidade:"",
      estado:""

    }
  },

  methods:{

    async buscarCep(){

      if(this.cep.length < 8) return

      const response = await axios.get(`https://viacep.com.br/ws/${this.cep}/json/`)

      this.rua = response.data.logradouro
      this.bairro = response.data.bairro
      this.cidade = response.data.localidade
      this.estado = response.data.uf

    },

    cadastrar(){

      const usuario = {

        nome:this.nome,
        email:this.email,
        senha:this.senha,
        tipo:this.tipoUsuario,
        cpf:this.cpf,

        endereco:{
          cep:this.cep,
          rua:this.rua,
          bairro:this.bairro,
          cidade:this.cidade,
          estado:this.estado
        }

      }

      console.log(usuario)

    }

  }

}
</script>

<style scoped>

  .register-container{
    width:100%;
    max-width:420px;
    background:white;
    padding:40px;
    border-radius:10px;
    box-shadow:0 5px 15px rgba(0,0,0,0.1);
  }

  h1{
    text-align:center;
  }

  h3{
    text-align:center;
    margin-bottom:25px;
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

  input,select{
    padding:12px;
    border-radius:6px;
    border:1px solid #ccc;
  }

  button{
    width:100%;
    padding:14px;
    background:#3F51B5;
    color:white;
    border:none;
    border-radius:6px;
    cursor:pointer;
  }

  button:hover{
    background:#2f3fa3;
  }

  .login-link{
    text-align:center;
    margin-top:15px;
  }

</style>