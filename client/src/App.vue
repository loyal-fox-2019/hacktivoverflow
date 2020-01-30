<template>
  <div id="app">
    <TheNavbar />
    <router-view/>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'
export default {
  components: {
    TheNavbar
  },
  created() {
    if (localStorage.getItem('access_token')) {
      this.$store.dispatch('getProfile')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
