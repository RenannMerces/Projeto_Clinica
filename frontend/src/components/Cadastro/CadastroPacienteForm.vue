<template>
  <div class="register-container">
    <EscolhaCadastro />
    <h1>PACIENTE</h1>
    <h3>Faça seu cadastro agora mesmo!</h3>

    <form @submit.prevent="cadastrar">

      <div class="input-group">
        <label>Nome</label>
        <input type="text" v-model="nome" maxlength="40"
          @input="nome = nome.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')" required />
      </div>

      <div class="input-group">
        <label>Email</label>
        <input type="email" v-model="email" maxlength="40" required />
      </div>

      <div class="input-group">
        <label>Senha</label>
        <input type="password" v-model="senha" minlength="6" maxlength="20" required />
      </div>

      <div class="input-group">
        <label>Confirmar Senha</label>
        <input type="password" v-model="confirmarSenha" minlength="6" maxlength="20" required />
      </div>

      <!-- CAMPOS PACIENTE -->

      <div class="input-group">
        <label>CPF</label>
        <input type="text" v-model="cpf" maxlength="11" @input="cpf = cpf.replace(/[^0-9]/g, '')" />
      </div>

      <div class="input-group">
        <label>CEP</label>
        <input type="text" v-model="cep" maxlength="9"
          @blur="buscarCep" />
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
        <input type="text"
          v-model="estado"
          @input="estado = estado.replace(/[^a-zA-Z]/g, '').toUpperCase()" />
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

  name: "CadastroPacienteForm",
  components: {
    EscolhaCadastro
  },

  data(){
    return{
      nome:"",
      email:"",
      senha:"",
      confirmarSenha:"",

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

      if(this.cep.length !== 8){
          Swal.fire({
          icon: "warning",
          title: "CEP inválido",
          text: "Digite um CEP válido com 8 números"
        })
        return
      }

        Swal.fire({
        title: "Buscando CEP...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })

      try{
        const response = await axios.get(`https://viacep.com.br/ws/${this.cep}/json/`)

        Swal.close()

        if(response.data.erro){
          Swal.fire({
            icon: "error",
            title: "CEP não encontrado",
            text: "Verifique o CEP informado"
          })
          return
        }

        this.rua = response.data.logradouro
        this.bairro = response.data.bairro
        this.cidade = response.data.localidade
        this.estado = response.data.uf

      }catch(error){
        Swal.close()

        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Não foi possível buscar o CEP"
        })

        console.log("Erro ao buscar CEP")
      }

    },

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

        const confirmacao = await Swal.fire({
          title: "Confirmar cadastro?",
          text: "Deseja cadastrar este paciente?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sim, cadastrar",
          cancelButtonText: "Cancelar"
        })

        if(!confirmacao.isConfirmed) return

        // 🔄 Loading
        Swal.fire({
          title: "Cadastrando paciente...",
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
          tipo: "paciente", // ✅ FIXO

          cpf: this.cpf,

          endereco:{
            cep: this.cep,
            rua: this.rua,
            bairro: this.bairro,
            cidade: this.cidade,
            estado: this.estado
          }
        }

        const response = await axios.post(
          "http://localhost:3000/auth/register",
          usuario
        )

        console.log(response.data)

        Swal.close()

          await Swal.fire({
            icon: "success",
            title: "Cadastro realizado!",
            text: "Paciente cadastrado com sucesso",
            timer: 1500,
            showConfirmButton: false
          })

        this.limparFormulario()

      }catch(error){

        Swal.close()

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
      this.cpf = ""
      this.cep = ""
      this.rua = ""
      this.bairro = ""
      this.cidade = ""
      this.estado = ""
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