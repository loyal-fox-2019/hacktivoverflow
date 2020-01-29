<template>
  <h1>Hello from twitter callback vue</h1>
</template>

<script>
import api from '@/config/api'

export default {
  name: 'twitter-callback',
  created() {
    api
      .post('/third-api-login/twitter', {
        oauth_token: this.$route.query.oauth_token,
        oauth_verifier: this.$route.query.oauth_verifier,
      })
      .then(({ data }) => {
        console.log(data)
      })
      .catch(err => {
        if (err.response) {
          console.log('err with response')
          console.log(err.response)
        } else {
          console.log('err without response')
          consoel.log(err)
        }
      })
  },
}
</script>

<style></style>
