import mongoose, { Schema, Document } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUsuario extends Document {
  nome: string
  email: string
  senha: string
  tipo: string
  cpf?: string
  endereco?: {
    cep?: string
    rua?: string
    bairro?: string
    cidade?: string
    estado?: string
  }
  compararSenha(senha: string): Promise<boolean>
}

const UsuarioSchema: Schema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  tipo: { type: String, enum: ["paciente", "secretario"], required: true },

  cpf: { type: String },

  endereco: {
    cep: { type: String },
    rua: { type: String },
    bairro: { type: String },
    cidade: { type: String },
    estado: { type: String }
  }
}, { timestamps: true })

// Hash da senha antes de salvar
UsuarioSchema.pre<IUsuario>("save", async function () {
  if (!this.isModified("senha")) return
  const salt = await bcrypt.genSalt(10)
  this.senha = await bcrypt.hash(this.senha, salt)
})

// Comparar senha
UsuarioSchema.methods.compararSenha = async function(senha: string) {
  return await bcrypt.compare(senha, this.senha)
}

export default mongoose.model<IUsuario>("Usuario", UsuarioSchema)