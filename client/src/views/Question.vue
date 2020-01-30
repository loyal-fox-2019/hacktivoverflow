<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  created () {
    const valid = localStorage.getItem('token')
    if (!valid) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>
