<template>
  <Home />
</template>

<script>
import Home from './views/Home'

export default {
  name: 'App',
  components: {
    Home
  },
  data() {
    return {
      isLogin: null
    }
  },
  created() {
    let status = false
    if (localStorage.getItem('token')) {
      status = true
    }
    this.$store.commit('SAVE_LOGIN_STATUS', status)
  },
  watch: {
    isLogin() {
      this.$store.dispatch('IS_LOGIN')
      this.isLogin = this.$store.state.isLogin
    }
  }
}
</script>

<style></style>
