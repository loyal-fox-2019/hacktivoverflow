<template>
  <v-app>
    <HeaderNav />
    <router-view></router-view>
  </v-app>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'

export default {
  name: 'App',

  components: {
    HeaderNav
  },

  data: () => ({
    //
  }),
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      const id = localStorage.getItem('id')
      this.$store.commit('CHANGE_LOGIN', id)
    }
  }
}
</script>
