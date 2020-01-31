<template>
  <div id="app">
      <NavBar></NavBar>
      <div class="loader" v-if="$store.state.isLoading">
        <div class="text-center mb-3 d-flex justify-content-between">
          <b-spinner
            variant='primary'
          ></b-spinner>
        </div>
      </div>
      <div class="container-fluid p-0 m-0">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  name: "app",
  components: {
    NavBar
  },
  created(){
    if(localStorage.getItem('token')){
      this.$store.commit("SET_ISLOGIN_TRUE")
      this.$store.commit("SET_USERNAME")
    }
    else {
      this.$store.commit("SET_ISLOGIN_FALSE")
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
.loader {
    position: fixed;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
}
</style>
