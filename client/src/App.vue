<template>
  <div id="app">
      <NavBar/>
    <div>
      <router-view/>
    </div>
  </div>
</template>


<script>
import NavBar from '@/components/NavBar'
export default {
  components:{
    NavBar
  },
  created(){
      if(localStorage.getItem('access_token')){
        console.log(' \n======================\n JALAN NEH APP VUE CREATED')
        this.$store.dispatch('fetchUserDetail')

      }
  }

  
}
</script>




<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
@import '~bootstrap/dist/css/bootstrap.css';
@import '~bootstrap-vue/dist/bootstrap-vue.css';

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
