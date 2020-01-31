<template>
  <v-row align="center" justify="space-around">
    <div class="my-0 mr-auto ml-9">
      <v-btn text large to="/" active-class="default-class test" small>hackbelowflow_v2</v-btn>
    </div>
    <v-text-field label="search" class="w-25 ml-auto mr-12" v-if="$route.path == '/'"></v-text-field>
    <v-btn v-if="$route.path != '/'" to="/" class="mr-12" small>back to home fo search</v-btn>
    <div class="mr-12 ml-auto" v-if="!loginOra">
      <v-btn to="/signin/login" color="primary" small>
        Login
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <v-btn to="/signin/register" class="ma-2" outlined color="indigo" small>
        Register
        <v-icon>mdi-add</v-icon>
      </v-btn>
    </div>
    <div v-else>
      <v-btn to="/mine" class="ma-2" outlined color="indigo" small>My Question</v-btn>
      <v-btn to="/" @click.prevent="logout" class="ma-2" outlined color="indigo" small>
        Logout
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>
  </v-row>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {}
  },
  computed: {
    loginOra () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$store.state.isLogin = false
      this.$store.commit('SET_ALERT', {
        message: 'Success logout',
        variant: 'success'
      })
    }
  }
}
</script>

<style scoped>
.default-class::before,
.v-btn::before {
  background-color: transparent !important;
}
.v-btn:hover {
  text-decoration: none;
}
</style>
