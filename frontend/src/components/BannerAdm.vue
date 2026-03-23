<template>
  <section class="banner">
    <div class="banner-content">

      <div class="text">
        <h1>Bem-vindo 👋</h1>
        <p class="subtitle">
          Gerencie todos os agendamentos de forma simples, rápida e organizada.
        </p>

        <div class="info">
          <span>✔ Visualize consultas</span>
          <span>✔ Atualize status</span>
          <span>✔ Controle completo</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
    export default{
        name: "BannerAdm"
    }
</script>

<style scoped>

.banner {
  width: 100%;
  padding: 60px 20px;
  background: linear-gradient(135deg, #3BAAB1, #2a7f85);
  color: white;
}

.banner-content {
  max-width: 1100px;
  margin: auto;
}

.text h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 20px;
  max-width: 500px;
}

.info {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 14px;
  opacity: 0.95;
}

.info span {
  background: rgba(255, 255, 255, 0.15);
  padding: 6px 12px;
  border-radius: 20px;
}

/* RESPONSIVO */

@media (max-width: 768px) {
  .text h1 {
    font-size: 28px;
  }

  .subtitle {
    font-size: 14px;
  }

  .info {
    flex-direction: column;
    gap: 10px;
  }
}

</style>