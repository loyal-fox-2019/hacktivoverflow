/* eslint-disable quotes */
<template>
  <v-app>
    <div style="display: flex; justify-content:center;">
      <NavBar
        class="mt-1 mb-2 grey lighten-3"
        style="height: 50px; position: fixed; z-index:100; width: 100vw"
      />
      <b-alert
        style="position: fixed; width: 80%; text-align:center; z-index:100; margin-top: 51px"
        :show="$store.state.dismissCountDown"
        dismissible
        :variant="alertVariant"
        @dismissed="$store.state.dismissCountDown=0"
      >{{messageAlert}}</b-alert>
    </div>

    <!-- @dismiss-count-down="countDownChanged" -->
    <v-content class="mt-9" id="scrolling-techniques-7">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  name: 'App',

  components: {
    // HelloWorld
    NavBar
  },
  data () {
    return {}
  },
  computed: {
    messageAlert () {
      return this.$store.state.alertMessage
    },
    alertVariant () {
      return this.$store.state.alertVariant
    }
  },
  created () {
    this.$store.dispatch('fetchAllQuestion')
    if (localStorage.getItem('token')) {
      this.$store.state.isLogin = true
      this.axios({
        method: 'get',
        url: 'users/one',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data, 'ini harusnya email')
          this.$store.commit('SET_WHO', data.email)
          this.$store.commit('SET_WATCH', data.watched_tags)
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
#app{
  background-color: rgb(219, 219, 219);
}
</style>
