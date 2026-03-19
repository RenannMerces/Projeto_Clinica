<template>
  <div v-if="visivel" class="modal">
    <div class="form-container">
      <h2>Agendar Consulta</h2>
      <form @submit.prevent="agendar">
        <!-- ESPECIALIDADE -->
        <div class="campo">
          <label>Especialidade</label>
          <select v-model="form.especialidade" @change="carregarMedicosFiltrados" required>
            <option value="">Selecione</option>
            <option v-for="esp in especialidades" :key="esp" :value="esp">{{ esp }}</option>
          </select>
        </div>

        <!-- MÉDICO -->
        <div class="campo">
          <label>Médico</label>
          <select v-model="form.medico" @change="carregarDiasDisponiveis" required>
            <option value="">Selecione</option>
            <option v-for="med in medicosFiltrados" :key="med._id" :value="med._id"> {{ med.nome }} </option>
          </select>
        </div>

        <!-- DIAS QUE TRABALHA (checkboxes apenas visual) -->
        <div v-if="diasDisponiveis.length" class="campo">
          <label>Dias que trabalha</label>
          <div class="dias-checkboxes">
           <label v-for="dia in diasSemana" :key="dia" class="custom-checkbox">
              <input 
                type="checkbox" 
                :checked="diasDisponiveis.includes(dia)" 
                disabled 
              />
              <span class="checkmark"></span>
              {{ dia }}
            </label>
          </div>
        </div>

        <!-- DATA -->
        <div class="campo">
          <label>Data</label>
          <input type="date" v-model="form.data" :min="hoje" @change="carregarHorariosDisponiveis" required>
        </div>

        <!-- HORÁRIO -->
        <div class="campo">
          <label>Horário</label>
          <select v-model="form.horario" required>
            <option value="">Selecione</option>
            <option v-for="hora in horariosDisponiveis" :key="hora">{{ hora }}</option>
          </select>
        </div>

        <!-- ALERTA CLIMA -->
          <div v-if="clima" class="alerta-clima">
            <img 
              v-if="clima.icon"
              :src="`https://openweathermap.org/img/wn/${clima.icon}@2x.png`" 
              alt="icone clima" 
            />

            <div class="info-clima">
              <span class="descricao">
                {{ clima.descricao }}, {{ clima.temperatura }}°C
              </span>

              <span v-if="previsaoChuva" class="chuva-alerta">
                ⚠️ Atenção! Possibilidade de chuva no dia
              </span>
            </div>
          </div>

        <!-- BOTÕES -->
        <div class="botoes">
          <button type="submit" class="btn-agendar">Agendar</button>
          <button type="button" class="btn-cancelar" @click="fechar">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "FormAgendamento",
  props: ["visivel"],
  data() {
    return {
      especialidades: [],
      medicos: [],
      medicosFiltrados: [],
      diasDisponiveis: [],
      horariosDisponiveis: [],
      previsaoChuva: false,
      clima: null, // guarda ícone, temperatura e descrição
      hoje: new Date().toISOString().split("T")[0],
      diasSemana: ["Seg", "Ter", "Qua", "Qui", "Sex"],
      form: {
        especialidade: "",
        medico: "",
        data: "",
        horario: ""
      }
    };
  },
  created() {
    this.carregarEspecialidades();
    this.carregarMedicos();
  },
  methods: {
    async carregarEspecialidades() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/medicos/especialidades", {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.especialidades = res.data;
      } catch (err) {
        console.error("Erro ao carregar especialidades:", err);
      }
    },
    async carregarMedicos() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/medicos", {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.medicos = res.data;
      } catch (err) {
        console.error("Erro ao carregar médicos:", err);
      }
    },
    carregarMedicosFiltrados() {
      this.medicosFiltrados = this.medicos.filter(
        med => med.especialidade === this.form.especialidade
      );
      this.form.medico = "";
      this.form.data = "";
      this.horariosDisponiveis = [];
      this.diasDisponiveis = [];
      this.clima = null;
      this.previsaoChuva = false;
    },
    carregarDiasDisponiveis() {
      const medico = this.medicos.find(m => m._id === this.form.medico);
      if (!medico) return;
      this.diasDisponiveis = medico.dias || [];
      this.form.data = "";
      this.horariosDisponiveis = [];
      this.clima = null;
      this.previsaoChuva = false;
    },
    async carregarHorariosDisponiveis() {
      if (!this.form.medico || !this.form.data) return;

      const medico = this.medicos.find(m => m._id === this.form.medico);
      if (!medico) return;

      const [ano, mes, dia] = this.form.data.split("-").map(Number);
      // cria data no horário LOCAL (sem bug de fuso)
      const dataLocal = new Date(ano, mes - 1, dia);

      const diasSemanaArray = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
      const diaSelecionado = diasSemanaArray[dataLocal.getDay()];

      if (!(medico.dias || []).includes(diaSelecionado)) {
        Swal.fire("Dia indisponível", "O médico não atende neste dia", "warning");
        this.form.data = "";
        this.horariosDisponiveis = [];
        return;
      }

      let horarios = [];
      const duracao = medico.duracaoConsulta || 30;

      const gerarHorarios = (inicio, fim) => {
        if (!inicio || !fim) return;

        let hora = inicio;

        while (hora < fim) {
          horarios.push(hora);
          hora = this.somarMinutos(hora, duracao);
        }
      };

      gerarHorarios(medico.horarios?.manha?.inicio, medico.horarios?.manha?.fim);
      gerarHorarios(medico.horarios?.tarde?.inicio, medico.horarios?.tarde?.fim);

      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:3000/agendamentos?medico=${this.form.medico}&data=${this.form.data}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const horariosOcupados = res.data.map(a => a.horario);

        this.horariosDisponiveis = horarios.filter(
          h => !horariosOcupados.includes(h)
        );

      } catch (err) {
        console.error("Erro ao buscar agendamentos:", err);
        this.horariosDisponiveis = horarios;
      }

      this.checarClima(this.form.data);
    },
    somarMinutos(horaStr, minutos) {
      const [h, m] = horaStr.split(":").map(Number);
      const data = new Date();
      data.setHours(h);
      data.setMinutes(m + minutos);
      const hh = data.getHours().toString().padStart(2, "0");
      const mm = data.getMinutes().toString().padStart(2, "0");
      return `${hh}:${mm}`;
    },
    async checarClima(data) {
        try {
          const res = await axios.get(
            `http://localhost:3000/clima?data=${data}`
          );

          if (!res.data) {
            this.clima = null;
            this.previsaoChuva = false;
            return;
          }

          this.clima = {
            descricao: res.data.descricao,
            icon: res.data.icon,
            temperatura: res.data.temperatura
          };

          this.previsaoChuva = res.data.chuva;

        } catch (err) {
          console.error("Erro ao consultar clima:", err.response?.data || err.message);
          this.clima = null;
          this.previsaoChuva = false;
        }
      },
   async agendar() {
      try {
        const token = localStorage.getItem("token");

        if (!this.form.medico || !this.form.data || !this.form.horario) {
          Swal.fire("Erro", "Preencha todos os campos", "warning");
          return;
        }

        const payload = {
          medicoId: this.form.medico,
          especialidade: this.form.especialidade,
          data: this.form.data,
          horario: this.form.horario,
        };

        await axios.post("http://localhost:3000/agendamentos", payload, {
          headers: { Authorization: `Bearer ${token}` }
        });

        Swal.fire("Agendamento realizado!", "", "success");
        this.fechar();

      } catch (err) {
        console.error(err);
        Swal.fire("Erro ao agendar", err.response?.data?.msg || "", "error");
      }
    },
    fechar() {
      this.form = { especialidade: "", medico: "", data: "", horario: "" };
      this.horariosDisponiveis = [];
      this.medicosFiltrados = [];
      this.diasDisponiveis = [];
      this.clima = null;
      this.previsaoChuva = false;
      this.$emit("fechar");
    }
  }
};
</script>

<style scoped>

.dias-checkboxes {
  display: flex;
  gap: 12px;
  flex-wrap: nowrap;
}

.custom-checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: not-allowed;
  font-size: 14px;
}

.custom-checkbox input {
  display: none;
}

.checkmark {
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  display: inline-block;
  position: relative;
}

.custom-checkbox input:checked + .checkmark {
  background-color: #2563eb;
  border-color: #2563eb;
}

.custom-checkbox input:checked + .checkmark::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 0px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.alerta-clima {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f0f7ff;
  border-left: 4px solid #2563eb;
  padding: 10px 12px;
  border-radius: 8px;
  margin-top: 12px;
}

.alerta-clima img {
  width: 40px;
  height: 40px;
}

.info-clima {
  display: flex;
  flex-direction: column;
}

.descricao {
  font-weight: 500;
  color: #1e293b;
}

.chuva-alerta {
  color: #d97706;
  font-size: 13px;
  font-weight: 600;
}

.modal{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.6);

  display:flex;
  align-items:center;
  justify-content:center;

  padding:20px;
  z-index:1000;
}

.form-container{
  background:white;
  padding:35px;
  border-radius:12px;

  width:100%;
  max-width:420px;
}

h2{
  margin-bottom:25px;
}

.campo{
  display:flex;
  flex-direction:column;
  margin-bottom:18px;
}

label{
  margin-bottom:6px;
  font-weight:500;
}

input, select{
  padding:10px;
  border-radius:6px;
  border:1px solid #ccc;
}

.botoes{
  display:flex;
  gap:10px;
  margin-top:10px;
}

.btn-agendar{
  flex:1;
  background:#3BAAB1;
  border:none;
  padding:12px;
  color:white;
  border-radius:6px;
  cursor:pointer;
}

.btn-cancelar{
  flex:1;
  background:#E80063;
  border:none;
  padding:12px;
  color:white;
  border-radius:6px;
  cursor:pointer;
}

@media (max-width:768px){

  .form-container{
    padding:25px;
  }

  .botoes{
    flex-direction:column;
  }

}

</style>