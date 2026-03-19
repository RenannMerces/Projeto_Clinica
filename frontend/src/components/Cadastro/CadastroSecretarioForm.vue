<template>
  <div class="register-container">
    <EscolhaCadastro />
    <h1>SECRETÁRIO</h1>
    <h3>Cadastre um novo secretário!</h3>

    <form @submit.prevent="cadastrar">

      <div class="input-group">
        <label>Nome</label>
        <input type="text" v-model="nome" maxlength="80"
          @input="nome = nome.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required />
      </div>

      <div class="input-group">
        <label>Email</label>
        <input type="email" v-model="email" maxlength="150" required />
      </div>

      <div class="input-group">
        <label>Senha</label>
        <input type="password" v-model="senha" minlength="6" maxlength="20" required />
      </div>

      <div class="input-group">
        <label>Confirmar Senha</label>
        <input type="password" v-model="confirmarSenha" minlength="6" maxlength="20" required />
      </div>

      <button type="submit">Cadastrar</button>

      <p class="login-link">
        Já possui conta?
        <router-link to="/">Entrar</router-link>
      </p>

    </form>

  </div>
</template>

<script>
import Swal from "sweetalert2"
import axios from "axios"
import EscolhaCadastro from "../Cadastro/EscolhaCadastro.vue"

export default {

  name: "CadastroSecretarioForm",
  components:{
    EscolhaCadastro
  },

  data(){
    return{
      nome:"",
      email:"",
      senha:"",
      confirmarSenha:""
    }
  },

  methods:{

    async cadastrar(){

      if(this.senha !== this.confirmarSenha){
        Swal.fire({
          icon: "warning",
          title: "Senhas não coincidem",
          text: "Verifique as senhas digitadas"
        })
        return
      }

      if(this.senha.length < 6){
        Swal.fire({
          icon: "warning",
          title: "Senha inválida",
          text: "A senha deve ter pelo menos 6 caracteres"
        })
        return
      }

        // 🔥 Confirmação (opcional, mas profissional)
        const confirmacao = await Swal.fire({
          title: "Confirmar cadastro?",
          text: "Deseja cadastrar este secretário?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sim, cadastrar",
          cancelButtonText: "Cancelar"
        })

         if(!confirmacao.isConfirmed) return

           // 🔥 Loading
          Swal.fire({
            title: "Cadastrando...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading()
            }
          })


      try{

        const usuario = {
          nome: this.nome,
          email: this.email,
          senha: this.senha,
          tipo: "secretario" // ✅ CORRETO
        }

        const response = await axios.post(
          "http://localhost:3000/auth/register",
          usuario
        )

        console.log(response.data)

          await Swal.fire({
            icon: "success",
            title: "Cadastro realizado!",
            text: "Secretário cadastrado com sucesso",
            timer: 1500,
            showConfirmButton: false
          })

        this.limparFormulario()

      }catch(error){

        console.error(error)

        if(error.response){
            Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.msg || "Erro ao cadastrar"
          })
        }else{
            Swal.fire({
            icon: "error",
            title: "Erro de conexão",
            text: "Não foi possível conectar ao servidor"
          })
        }
      }

    },

    limparFormulario(){
      this.nome = ""
      this.email = ""
      this.senha = ""
      this.confirmarSenha = ""
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
    transition: 0.5s;
  }

  button:hover{
    background:#2f3fa3;
  }

  .login-link{
    text-align:center;
    margin-top:15px;
  }

</style>