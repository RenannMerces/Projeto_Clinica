import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'
import AgendamentoView from '../views/AgendamentoView.vue'
import PacienteView from '../views/PacienteView.vue'
import AdmAgendamentos from '../views/AdmAgendamentos.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: CadastroView
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
