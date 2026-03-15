<template>
  <nav class="navbar">

    <!-- LOGO -->
    <div class="logo">
      <img src="/img/logo_icon.png" alt="Logo Sistema">
    </div>

    <!-- BOTÃO MOBILE -->
    <div class="hamburger" @click="toggleMenu"> ☰ </div>

    <!-- MENU -->
      <ul :class="['menu', { active: menuOpen }]">
        <li>
          <router-link to="/agendamento">
            Agendamento
          </router-link>
        </li>
        <li>
          <router-link to="/perfil">
            Perfil
          </router-link>
        </li>
        <li>
          <router-link to="/login">
            Sair
          </router-link>
        </li>
      </ul>

  </nav>
</template>

<script>

  export default {
    name: "NavBar",

    data(){
      return{
        menuOpen:false
      }
    },

    methods:{
      toggleMenu(){
        this.menuOpen = !this.menuOpen
      }
    }
  }

</script>

<style scoped>

.navbar{
  width:100%;
  height:70px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:0 30px;
  background: #ffff;
  border-bottom:1px solid #ddd;
  position:relative;
}

.logo img{
  height:42px;
}

.menu{
  list-style:none;
  display:flex;
  gap:30px;
}

.menu a{
  text-decoration:none;
  color:#333333;
  font-weight:500;
  transition:0.2s;
}

.menu a:hover{
  color:#E80063;
}

.hamburger{
  display:none;
  font-size:28px;
  cursor:pointer;
}

@media (max-width:768px){

  .hamburger{
    display:block;
  }

  .menu{

    position:absolute;
    top:70px;
    left:0;

    width:100%;
    background:white;

    flex-direction:column;
    gap:0;

    border-top:1px solid #eee;

    max-height:0;
    overflow:hidden;

    transition:max-height 0.3s ease;
  }

  .menu.active{
    max-height:200px;
  }

  .menu li{
    width:100%;
  }

  .menu a{
    display:block;
    padding:15px 20px;
    border-bottom:1px solid #f0f0f0;
  }

}

</style>