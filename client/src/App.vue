<template>
  <div id="app">
    <div class="my-3">
      <b-button v-if='isLogin' style='margin-right: 20vw;' @click='back' variant='info'>
        Back
      </b-button>
      <b-button v-if='isLogin' style='margin-right: 20vw;' @click='home' variant='info'>
        Home
      </b-button>
      <b-button v-if='isLogin' @click='logout' variant='info'>
        Logout
      </b-button>
    </div>
    <b-alert :show='isSuccess' variant='success' class='col-md-8 offset-md-2' 
    @dismiss-count-down="successTime" style='position: fixed; z-index: 1; top: 10px;'>
      <p class="m-0" v-for='success in successMessage' :key='success'>{{success}}</p>
    </b-alert>
    <b-alert :show='isError' variant='danger' class='col-md-8 offset-md-2'
    @dismiss-count-down="errorTime" style='position: fixed; z-index: 1; top: 10px;'>
      <p class="m-0" v-for='error in errorMessage' :key='error'>{{error}}</p>
    </b-alert>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {

  name: 'App',

  data () {
    return {
    }
  },
  created(){
    if (localStorage.getItem('access_token')){
      this.$store.commit('SET_LOGIN')
      this.$store.dispatch('GET_USER_TAG')
    }
  },
  methods: {
    successTime(time){
      if (!time){
        this.$store.commit('SET_SUCCESS', {time})
      }
    },
    errorTime(time){
      if (!time){
        this.$store.commit('SET_ERROR', {time})
      }
    },
    logout(){
      this.$store.commit('LOGOUT')
    },
    back(){
      this.$router.go(-1)
    },
    home(){
      this.$router.push('/home')
    }
  },  
  computed: {
    ...mapState([
      'successMessage',
      'errorMessage',
      'isSuccess',
      'isError',
      'isLogin'
    ])
  }
}
</script>

<style>
@font-face{
  font-family: WorkSans;
  src: url('assets/WorkSans.ttf');
}
#app {
  font-family: WorkSans;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 125%;
  margin: 0;
  padding: 0;
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
