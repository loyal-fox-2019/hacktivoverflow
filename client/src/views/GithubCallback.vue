<template>
  <div class="vld-parent">
    <Loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    ></Loading>
    <h1>Redirecting...</h1>
  </div>
</template>

<script>
import api from '@/config/api'
import Loading from 'vue-loading-overlay'

import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'github-callback',
  components: { Loading },
  created() {
    const code = this.$route.query.code
    const vm = this

    this.$store.dispatch('login', {
      method: 'post',
      url: '/third-api-login/github',
      data: { code },
      success: 'UPDATE_USER_DATA',
      successMessage: 'Login success',
      successUrl: '/questions',
      router: vm.$router,
    })
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
  },
}
</script>

<style></style>
