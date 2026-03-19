import mongoose, { Schema, Document } from "mongoose";

export interface IAgendamento extends Document {
  pacienteId: mongoose.Types.ObjectId;
  medicoId: mongoose.Types.ObjectId;
  especialidade: string;
  data: string;      // YYYY-MM-DD
  horario: string;   // HH:mm
  nomePaciente?: string;
  cpfPaciente?: string;
  status: "pendente" | "confirmado" | "cancelado";
}

const AgendamentoSchema: Schema = new Schema(
  {
    pacienteId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Usuario", 
      required: true 
    },

    medicoId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Medico", 
      required: true 
    },

    especialidade: { type: String, required: true },

    data: { type: String, required: true },

    horario: { type: String, required: true },

    // snapshot opcional (boa prática)
    nomePaciente: { type: String },
    cpfPaciente: { type: String },

    status: { 
      type: String, 
      enum: ["pendente", "confirmado", "finalizado", "cancelado"],
      default: "pendente" 
    },
  },
  { timestamps: true }
);

AgendamentoSchema.index(
  { medicoId: 1, data: 1, horario: 1 },
  { unique: true }
);

export default mongoose.model<IAgendamento>("Agendamento", AgendamentoSchema);