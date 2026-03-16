<template>

<section class="agendamentos">

  <div class="container">

    <h2>Pacientes Cadastrados</h2>

    <div class="tabela-wrapper">

      <table class="tabela-agendamentos">

        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>CEP</th>
            <th>Rua</th>
            <th>Bairro</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>

          <tr v-for="(paciente, index) in pacientes" :key="index">
            <td data-label="ID">{{ paciente.id }}</td>
            <td data-label="Nome" class="text-limit">{{ paciente.nome }}</td>
            <td data-label="Email" class="text-limit">{{ paciente.email }}</td>
            <td data-label="CPF">{{ paciente.cpf }}</td>
            <td data-label="CEP">{{ paciente.cep }}</td>
            <td data-label="Rua" class="text-limit">{{ paciente.rua }}</td>
            <td data-label="Bairro" class="text-limit">{{ paciente.bairro }}</td>
            <td data-label="Cidade" class="text-limit">{{ paciente.cidade }}</td>
            <td data-label="Estado">{{ paciente.estado }}</td>
             <td data-label="Ação">
                <button class="btn-excluir" @click="excluirPaciente(index)">
                Excluir
                </button>
            </td>
          </tr>

        </tbody>

      </table>

    </div>

  </div>

</section>

</template>

<script>
export default {

  name: "TabelaPacientes",

  data(){
    return{

      pacientes:[
        {
          id:1,
          nome:"Maria Souza",
          email:"maria@email.com",
          cpf:"123.456.789-00",
          cep:"44444-000",
          rua:"Rua das Flores",
          bairro:"Centro",
          cidade:"Salvador",
          estado:"BA"
        },
        {
          id:2,
          nome:"João Pereira",
          email:"joao@email.com",
          cpf:"987.654.321-00",
          cep:"44444-111",
          rua:"Av. Brasil",
          bairro:"Comércio",
          cidade:"Salvador",
          estado:"BA"
        }
      ]

    }
  },
  methods:{
        excluirPaciente(index){

        const confirmar = confirm("Deseja realmente excluir este paciente?")

        if(confirmar){
        this.pacientes.splice(index,1)
        }
    }
  }

}
</script>

<style scoped>

.btn-excluir{
  background:#E80063;
  border:none;
  color:white;
  padding:8px 16px;
  border-radius:20px;
  cursor:pointer;
  transition:0.3s;
}

.btn-excluir:hover{
  background:#c00052;
}

.text-limit{
  max-width:180px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.agendamentos{
  padding:60px 20px;
}

.container{
  max-width:1100px;
  margin:auto;
}

h2{
  margin-bottom:25px;
  font-size:28px;
}

/* tabela */

.tabela-wrapper{
  overflow-x:auto;
}

.tabela-agendamentos{
  width:100%;
  border-collapse:collapse;
  background:white;
  border-radius:10px;
  overflow:hidden;
}

/* cabeçalho */

.tabela-agendamentos thead{
  background:#3BAAB1;
  color:white;
}

.tabela-agendamentos th{
  padding:14px;
  text-align:left;
  font-weight:600;
}

/* linhas */

.tabela-agendamentos td{
  padding:14px;
  border-bottom:1px solid #eee;
}

/* RESPONSIVO */
@media (max-width:768px){

  .tabela-agendamentos thead{
    display:none;
  }

  .tabela-agendamentos,
  .tabela-agendamentos tbody,
  .tabela-agendamentos tr,
  .tabela-agendamentos td{
    display:block;
    width:100%;
  }

  .tabela-agendamentos tr{
    background:white;
    margin-bottom:20px;
    padding:18px;
    border-radius:12px;
    box-shadow:0 6px 18px rgba(0,0,0,0.06);
    border-left:5px solid #3BAAB1;
  }

  .tabela-agendamentos td{
    border:none;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:10px 0;
    font-size:15px;
  }

  .tabela-agendamentos td::before{
    content: attr(data-label);
    font-weight:600;
    color:#777;
    font-size:14px;
  }

  /* destaque para o nome */

  .tabela-agendamentos tr td:first-child{
    font-size:17px;
    font-weight:600;
    color:#333;
    margin-bottom:8px;
    border-bottom:1px solid #eee;
    padding-bottom:12px;
  }

}

</style>