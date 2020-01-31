<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('SET_LOGIN', true)
    }
  }
}
</script>

<style scoped>

</style>
