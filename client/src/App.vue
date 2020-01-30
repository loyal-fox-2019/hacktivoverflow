<template>
  <div id="app">
    <nav class="navbar bg-header">
      <router-link to="/" class="navbar-brand">
        <img src="./assets/so-logo.png" width="150" height="30" alt="logo">
      </router-link>
      <div class="search text-center">
        <div class="input-group flex-nowrap">
          <div class="input-group-prepend">
            <span class="input-group-text" id="addon-wrapping"><i class="fas fa-search"></i></span>
          </div>
          <input type="text" class="form-control" placeholder="Search...">
        </div>
      </div>
      <div v-show="this.user" class="user-avatar">
        <img src="./assets/user.png" width="32" alt="avatar">
        <span class="username pl-3">{{this.user}}</span>
      </div>
      <div v-show="!this.user" class="loginSignup">
        <router-link to="/login" class="btn btn-secondary">Log in</router-link>
        <router-link to="/signup" class="btn btn-primary ml-2">Sign up</router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
    };
  },
  computed: {
    user() {
      console.log(this.$store.state.user);
      return this.$store.state.user;
    },
  },
  created() {
    if (localStorage.getItem('token')) {
      this.isLogin = true;
      this.$store.commit('SET_USER', localStorage.getItem('user'));
    } else {
      this.isLogin = false;
    }
  },
};
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
.btn-primary {
  background-color: #0095ff;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
}
.btn-secondary {
  color: #39739d;
  background-color: #e1ecf4;
  border-color: #7aa7c7;
  box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.7);
}
.btn {
  padding: .2rem .9rem;
}
</style>
