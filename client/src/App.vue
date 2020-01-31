<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view id="r-view"/>
  </div>
</template>

<script>
import Navbar from "./components/navbar.vue"
export default {
  name: "App",
  components: {
    Navbar
  },
  created() {
    if(this.$cookies.isKey('token') && this.$cookies.isKey('username') && this.$cookies.isKey('email'))
    {
      this.$store.commit('SET_LOGIN_STATE',true)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#r-view {
  top: 60px;
  position: absolute;
  height: calc(100vh - 60px);
}
</style>
