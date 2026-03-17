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
    component: AgendamentoView,
    meta: { roles: ['paciente', 'secretario'] } // ambos podem acessar
  },
  {
    path: '/adm',
    name: 'adm',
    component: AdmAgendamentos,
    meta: { roles: ['secretario'] } // somente secretários
  },
  {
    path: '/pacientes',
    name: 'pacientes',
    component: PacienteView,
    meta: { roles: ['secretario'] } // somente secretários
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Guard global para proteger rotas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const usuario = JSON.parse(localStorage.getItem('usuario') || 'null')

  // Se não tiver token, redireciona para login (exceto páginas públicas)
  if (!token && !['login', 'cadastro-paciente', 'cadastro-secretario'].includes(to.name)) {
    return next({ name: 'login' })
  }

  // Se a rota tem restrição de roles
  if (to.meta.roles && usuario) {
    if (!to.meta.roles.includes(usuario.tipo)) {
      return next({ name: 'login' }) // redireciona se tipo não permitido
    }
  }

  next()
})

export default router