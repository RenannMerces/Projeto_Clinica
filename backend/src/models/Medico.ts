import mongoose, { Schema, Document } from "mongoose"

export interface IMedico extends Document {
  nome: string
  especialidade: string
  duracaoConsulta: number
  dias: string[]
  horarios: {
    manha: {
      inicio: string
      fim: string
    },
    tarde: {
      inicio: string
      fim: string
    }
  }
}

const MedicoSchema: Schema = new Schema({
  nome: { type: String, required: true },
  especialidade: { type: String, required: true },
  duracaoConsulta: { type: Number, required: true },

  dias: [{ type: String, required: true }],

  horarios: {
    manha: {
      inicio: String,
      fim: String
    },
    tarde: {
      inicio: String,
      fim: String
    }
  }

}, { timestamps: true })

export default mongoose.model<IMedico>("Medico", MedicoSchema)