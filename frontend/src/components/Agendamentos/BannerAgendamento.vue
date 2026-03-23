<template>

<section class="banner">
  <div class="overlay">
    <div class="banner-container">

      <div class="banner-content">

        <!-- ESQUERDA -->
        <div class="banner-left">
          <div class="logo-clinica">
            <img src="/img/logo_extended_white.png" alt="Clínica Mercês">
          </div>

          <p>
            Atendimento humanizado, tecnologia moderna e profissionais
            especializados para cuidar da sua saúde e da sua família.
          </p>
        </div>

        <!-- DIREITA -->
        <div class="banner-right">
          <div class="especialidades">
            <div class="card"> 🩺 <span>Clínico Geral</span> </div>
            <div class="card"> ❤️ <span>Cardiologia</span></div>
            <div class="card"> ✨ <span>Dermatologia</span></div>
            <div class="card"> 👶 <span>Pediatria</span> </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</section>

</template>

<script>
    export default {
    name: "BannerAgendamento"
    }
</script>

<style scoped>

.banner{
  background-image: url('/public/img/teste.jpg');
  background-size: cover;
  background-position: center;
  min-height: 300px;
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center; /* centraliza o container */
}

.logo-clinica{
  margin-bottom:20px;
}

.logo-clinica img{
  width:320px;
  max-width:100%;
  height:auto;
  object-fit:contain;
}

.overlay{
  width:100%;
  height:100%;
  background: linear-gradient(
    90deg,
    rgba(0,0,0,0.75) 0%,
    rgba(0,0,0,0.55) 40%,
    rgba(0,0,0,0.2) 100%
  );
  display:flex;
  align-items:center;
  justify-content:center; /* centraliza o container */
}


.banner-content{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:40px;
}

.banner-left{
  max-width:520px;
  color:white;
}

.banner-right{
  display:flex;
  justify-content:flex-end;
}

.banner-container{
  max-width:1200px;
  width:100%;          /* ocupa 100% do max-width */
  padding:40px;
  box-sizing:border-box;
}


.especialidades{
  display:grid;
  grid-template-columns:repeat(2, 1fr);
  gap:20px;
  max-width:420px;
}

.card{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(8px);
  padding:16px 22px;
  border-radius:35px;
  font-size:16px;
  font-weight:500;
  transition:0.3s;
}

.card span{
  color:white;
}

.card:hover{
  background:#E80063;
  transform:translateY(-3px);
}

@media (max-width:768px){

  .banner{
    min-height:520px;
  }

  .banner-content{
    flex-direction:column;
    text-align:center;
  }

  .banner-right{
    justify-content:center;
  }

  .banner-container{
    padding:30px;
  }

  .especialidades{
    justify-content:center;
  }

  .card{
    padding:10px 14px;
    font-size:14px;
    gap:6px;
    border-radius:25px;
  }

  .card span{
    font-size:13px;
  }

}

</style>