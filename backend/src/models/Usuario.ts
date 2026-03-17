import mongoose from "mongoose"

const UsuarioSchema = new mongoose.Schema({

  nome:{
    type:String,
    required:true
  },

  email:{
    type:String,
    required:true,
    unique:true
  },

  senha:{
    type:String,
    required:true
  },

  tipo:{
    type:String,
    enum:["paciente","secretario"],
    required:true
  },

  cpf:{
    type:String
  },

  endereco:{
    cep:String,
    rua:String,
    bairro:String,
    cidade:String,
    estado:String
  }

})

export default mongoose.model("Usuario", UsuarioSchema)