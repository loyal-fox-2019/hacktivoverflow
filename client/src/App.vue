<template>
  <div id="app">
    <NavBar class="mb-5"></NavBar>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
export default {
  name: 'App',
  components: {
    NavBar
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('SET_USERNAME')
      this.$store.commit('SET_ISLOGIN', true)
      this.$store.dispatch('findMyQuestions')
      this.$store.dispatch('findMyAnswers')
    } else {
      this.$store.commit('SET_ISLOGIN', false)
    }

    this.$store.dispatch('getAllAnswers')
    this.$store.dispatch('getAllQuestions')
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

.error {
  border-radius: 15px;
  width: 50vw;
  background-color: #fa9595;
  margin-top: 5%;
  height: 5vh;
  padding-top: 0.5%;
}
</style>
