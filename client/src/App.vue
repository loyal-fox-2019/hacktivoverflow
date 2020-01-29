<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view />
  </div>
</template>

<script>
import NavBar from '../src/components/NavBar'
export default {
  components: {
    NavBar
  },
  methods: {
    checkLocalStorage() {
      if (localStorage.getItem('token')) {
        this.$store.commit('CHANGE_STATE_LOGIN', true)
      }
    }
  },
  created() {
    this.checkLocalStorage()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
