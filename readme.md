# Sistema de Clínica Médica

## Descrição
Este projeto consiste em um sistema completo para gerenciamento de uma clínica médica, voltado para **agendamento de consultas, cadastro de usuários e gerenciamento administrativo**.

---

## O sistema oferece:

- Cadastro e login seguro de pacientes e secretários
- Agendamento de consultas com verificação de disponibilidade
- Consulta automática de endereço pelo CEP
- Integração com API de clima (alerta de chuva no dia da consulta)
- Painel administrativo para gerenciamento de atendimentos

O objetivo é criar uma aplicação **funcional, segura e organizada**, e entregar conforme os requisitos do trabalho da disciplina.

---

## Tecnologias Utilizadas

### Backend
- Node.js
- TypeScript
- Express
- MongoDB
- Mongoose
- JWT (autenticação)

### Frontend
- Vue.js
- Vue Router
- Axios

## Funcionalidades Principais
- **Autenticação segura**: login e cadastro de pacientes e secretários
- **Agendamento de consultas**: verificação de horário disponível e confirmação de agendamento
- **Consulta automática de CEP**: integração com API ViaCEP para preencher endereços
- **Previsão do clima**: integração com OpenWeatherMap para alertas no dia da consulta
- **Painel administrativo**: lista de agendamentos, alteração de status e cancelamentos
- **Interface responsiva**: adaptação para diferentes tamanhos de tela

---

## Estrutura do Projeto

```
projeto_clinica/
│
├── backend/                # Código do servidor e API
│   ├── src/
│   │   ├── config/         # Configurações gerais (DB, ambiente)
│   │   ├── controllers/    # Lógica das rotas
│   │   ├── middlewares/    # Middlewares do Express
│   │   ├── models/         # Modelos do banco de dados
│   │   ├── routes/         # Rotas da API
│   │   ├── services/       # Serviços auxiliares
│   │   └── server.ts       # Arquivo principal do servidor
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/               # Código da interface web
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   │   ├── Agendamentos/
│   │   │   ├── Cadastro/
│   │   ├── views/          # Telas e páginas principais
│   │   └── router/         # Configuração de rotas
│   │
│   └── package.json
│
└── README.md               # Este arquivo

```

---

## Como rodar o projeto

## 1️⃣ Clonar o repositório

```
git clone https://github.com/RenannMerces/Projeto_Clinica.git
```

Entre na pasta do projeto:

```
cd Projeto_Clinica
```

---

## 🚀 Rodando o Backend

Entre na pasta:

```
    cd backend
```

Instale as dependências:

```
npm install
```

Execute o servidor:

```
npm run dev
```
---

## 🚀 Rodando o Frontend

Abra outro terminal e vá para:

```
cd frontend
```

Instale as dependências:

```
npm install
```

Execute o projeto:

```
npm run serve
```

O frontend será iniciado em:

```
http://localhost:8080/ 
```

---

## 🚀 Iniciar MongoDB

Para rodar o projeto, você precisa ter o **MongoDB** instalado e em execução localmente. Siga os passos abaixo:

### 1️⃣ Baixar e instalar o MongoDB

1. Acesse o site oficial do MongoDB: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Escolha a versão adequada para o seu sistema operacional.
3. Siga o instalador padrão e finalize a instalação.

---

### 2️⃣ Baixar e instalar o MongoDB Compass

O **MongoDB Compass** é uma interface gráfica para gerenciar seus bancos de dados.

1. Acesse: [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)
2. Baixe a versão correspondente ao seu sistema operacional.
3. Instale e abra o MongoDB Compass.

---

### 3️⃣ Conectar ao banco de dados local

Use o seguinte link de conexão para se conectar ao MongoDB local:

```
mongodb://127.0.0.1:27017/clinica
```

- **127.0.0.1** → endereço local (localhost)
- **27017** → porta padrão do MongoDB
- **clinica** → nome do banco de dados que será usado pelo projeto

No MongoDB Compass, cole esse link no campo de conexão e clique em **Connect**.

---

## Uso do Sistema

1. Cadastro/Login
- Paciente ou secretário cria conta e realiza login.

2. Agendamento de Consultas

- Pacientes selecionam especialidade, médico, data e horário disponíveis.
- Confirmação do agendamento com alerta de previsão do tempo.

3. Painel Administrativo

- Secretários acessam todos os agendamentos, podendo alterar status ou cancelar consultas.
- Secretários acessam todos os pacientes cadastrados no sistema, podendo excluir um paciente.
- Secretários cadastram médicos no sistema por: Nome, Especialidade, Duração da consulta, horarios manhã/tarde, dias disponíveis (segunda a sexta)
- Secretários acessam todos os médicos cadastrados no sistema, podendo excluir um médico.

---

# 👨‍💻 Autor

Projeto desenvolvido por **Renan Mercês** como atividade acadêmica.

---
