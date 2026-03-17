import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import CadastroPacienteView from '../views/CadastroPacienteView.vue'
import CadastroSecretario from '../views/CadastroSecretarioView.vue'
import AgendamentoView from '../views/AgendamentoView.vue'
import PacienteView from '../views/PacienteView.vue'
import AdmAgendamentos from '../views/AdmAgendamentosView.vue'
import CadastroMedicos from '../views/CadastroMedicosView.vue'

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
    component: AgendamentoView,
    meta: { roles: ['paciente'] }
  },
  {
    path: '/adm',
    name: 'adm',
    component: AdmAgendamentos,
    meta: { roles: ['secretario'] }
  },
  {
    path: '/cadastro-medicos',
    name: 'cadastro-medicos',
    component: CadastroMedicos,
    meta: { roles: ['secretario'] }
  },
  {
    path: '/pacientes',
    name: 'pacientes',
    component: PacienteView,
    meta: { roles: ['secretario'] }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 🔐 Guard global
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const usuario = JSON.parse(localStorage.getItem('usuario') || 'null')

  // Rotas públicas
  const publicPages = ['login', 'cadastro-paciente', 'cadastro-secretario']

  // 🚫 Sem token → volta pro login
  if (!token && !publicPages.includes(to.name)) {
    return next({ name: 'login' })
  }

  // 🔥 Se já está logado e tenta ir pro login → redireciona automaticamente
  if (token && to.name === 'login' && usuario) {
    const rotasPorTipo = {
      secretario: '/adm',
      paciente: '/agendamento'
    }

    return next(rotasPorTipo[usuario.tipo] || '/')
  }

  // 🔐 Controle de permissões por tipo
  if (to.meta.roles && usuario) {
    if (!to.meta.roles.includes(usuario.tipo)) {
      return next({ name: 'login' })
    }
  }

  next()
})

export default router