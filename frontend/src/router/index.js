import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import CadastroPacienteView from '../views/CadastroPacienteView.vue'
import CadastroSecretario from '../views/CadastroSecretarioView.vue'
import AgendamentoView from '../views/AgendamentoView.vue'
import PacienteView from '../views/PacienteView.vue'
import AdmAgendamentos from '../views/AdmAgendamentosView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/cadastro-paciente',
    name: 'cadastro-paciente',
    component: CadastroPacienteView
  },
  {
    path: '/cadastro-secretario',
    name: 'cadastro-secretario',
    component: CadastroSecretario
  },
  {
    path: '/agendamento',
    name: 'agendamento',
    component: AgendamentoView
  },
  {
    path: '/adm',
    name: 'adm',
    component: AdmAgendamentos
  },
  {
    path: '/pacientes',
    name: 'pacientes',
    component: PacienteView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
