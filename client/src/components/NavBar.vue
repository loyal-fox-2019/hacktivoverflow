<template>
  <v-row align="center" justify="space-around">
    <div class="my-0 mr-auto ml-9">
      <v-btn text large to="/" active-class="default-class test" small>hackbelowflow_v2</v-btn>
    </div>
    <b-form-input label="search" class="w-25 ml-auto mr-12" v-if="$route.path == '/'" placeholder="search here" v-model="cariIni"></b-form-input>
    <v-btn v-if="$route.path != '/'" to="/" class="mr-12" small>back to home fo search</v-btn>
     <transition name="fade" v-if="!loginOra">
    <div class="mr-12 ml-auto">
      <v-btn to="/signin/login" color="primary" small>
        Login
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <v-btn to="/signin/register" class="ma-2" outlined color="indigo" small>
        Register
        <v-icon>mdi-add</v-icon>
      </v-btn>
    </div>
    </transition>
    <transition name="fade" v-else>
    <div>
      <v-btn to="/mine" class="ma-2" outlined color="indigo" small>My Question</v-btn>
      <v-btn to="/" @click.prevent="logout" class="ma-2" outlined color="indigo" small>
        Logout
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>
    </transition>
  </v-row>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      cariIni : ''
    }
  },
  computed: {
    loginOra () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    logout () {
      this.$store.state.who = ''
      this.$store.state.watched = []
      localStorage.removeItem('token')
      this.$store.state.isLogin = false
      this.$store.commit('SET_ALERT', {
        message: 'Success logout',
        variant: 'success'
      })
    }
  },
  watch: {
    cariIni(val){
      this.$store.commit('SET_FILTER', val)
      this.$store.state.search = val
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
