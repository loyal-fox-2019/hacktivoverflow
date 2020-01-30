<template>
  <div>
    <b-navbar toggleable="md" type="light" class="shadow">
      <b-navbar-brand href="#">
        <router-link to="/">
          <img src="../assets/ho-logo.png" alt="brand-logo" class="img-brand" />
        </router-link>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="$store.state.isLogin === true">
            <button class="btn btn-primary btn-login px-4" @click="logout">
              LOGOUT
            </button>
          </b-nav-item>
          <b-nav-item v-if="$store.state.isLogin === false">
            <router-link to="/login">
              <button class="btn btn-primary btn-login px-4">LOGIN</button>
            </router-link>
          </b-nav-item>
          <b-nav-item v-if="$store.state.isLogin === false">
            <router-link to="/register">
              <button class="btn btn-light btn-register">REGISTER</button>
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      this.$store.commit('CHANGE_STATE_LOGIN', false)
    }
  }
}
</script>

<style>
.img-brand {
  height: 35px;
}
.btn-login {
  background-color: #ed7f24!Important;
  border: 1px solid #ED7F24!Important;
  font-size: 13px!Important;
  font-weight: 700!Important;
}
.btn-login:hover {
  background-color: #d67321!Important;
}
.btn-login:active {
  background-color: #d67321!Important;
}
.btn-register {
  background-color: #ffffff!Important;
  border: 1px solid #ED7F24!Important;
  color: #ED7F24!Important;
  font-size: 13px!Important;
  font-weight: 700!Important;
}
.btn-register:hover {
  background-color: #ED7F24!Important;
  color: #ffffff!Important;
}
</style>
