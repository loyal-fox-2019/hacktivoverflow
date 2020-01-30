<template>
  <div class="hero-loading">
    <div class="loader-animation">
      <b-spinner
        class="mb-3"
        variant="light"
        label="loading..."
        style="width:3rem; height:3rem"></b-spinner>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
  .hero-loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.6)
  }
  .loader-animation {
    display: flex;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .loader-animation h5 {
    color: #fff;
  }
</style>
