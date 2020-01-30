<template>
  <div id="app">
    <nav class="navbar bg-header">
      <router-link to="/" class="navbar-brand text-dark">
        <img src="./assets/so-logo.png" width="150" height="30" alt="logo">2
      </router-link>
      <div class="search text-center">
        <div class="input-group flex-nowrap">
          <div class="input-group-prepend">
            <span class="input-group-text" id="addon-wrapping"><i class="fas fa-search"></i></span>
          </div>
          <input type="text" class="form-control" placeholder="Search...">
        </div>
      </div>
      <div class="user-avatar">
        <div v-if="isLogin">
          <router-link to="/myProfile">
            <img src="./assets/user.png" width="32" alt="avatar">
            <span class="username pl-3">{{userName}}</span>
          </router-link>
          <b-button pill style="margin-left:50px;" @click.prevent="logOut">Log Out</b-button>
        </div>
        <div v-if="!isLogin">
          <router-link to='/login'>
            <b-button variant="primary" class="mr-3">Login</b-button>
          </router-link>
          <router-link to='/register'>
            <b-button variant="outline-primary" class="mr-4">Register</b-button>
          </router-link>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'app',
  data(){
    return{

    }
  },
  computed:{
    isLogin(){
      return this.$store.state.isLogin
    },
    userName(){
      return this.$store.state.user
    }
  },
  methods:{
    logOut(){
      localStorage.clear()
      this.$store.commit('setLogin', false)
      this.$store.commit('setTags', [])
      this.fetchAction()
    },
        ...mapActions({
      fetchAction: 'question/fetchAction'
    })
  },
  created () {
    if(localStorage.getItem('token')){
      this.$store.commit('setUser',localStorage.getItem('user'))
      this.$store.commit('setLogin', true)
    }else{
      this.$store.commit('setLogin', false)
    }
  }
}
</script>

<style scoped>
.navbar {
  border-top: 3px solid #f48024;
  box-shadow: 0 1px 0 rgba(12,13,14,0.1), 0 1px 6px rgba(60,65,70,0.1);
}
.bg-header {
  background-color: #fafafb;
}
.search {
  width: 50rem;
}
.input-group-text {
  background-color: #fff;
}
.user-avatar .username {
  font-weight: 500;
}
</style>
