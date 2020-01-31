<template>
  <div class="home">
    <img class="logo" src="../../public/background.png" alt="icon">
  </div>
</template>

<script>
export default {
  created () {
    const valid = localStorage.getItem('token')
    if (valid) {
      this.$router.push('/main')
    }
  }
}
</script>

<style scoped>
.home {
  margin-top: 73px
}

.logo {
  width: 100%
}
</style>
