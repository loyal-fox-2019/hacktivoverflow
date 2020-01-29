<template>
  <h1>Hello from github callback vue</h1>
</template>

<script>
import api from '@/config/api'

export default {
  name: 'github-callback',
  created() {
    console.log(this.$route.query)
    api
      .post('/third-api-login/github', { code: this.$route.query.code })
      .then(({ data }) => {
        console.log(data)
      })
      .catch(err => {
        if (err.response) {
          console.log('err with response')
          console.log(err.response)
        } else {
          console.log('err without response')
          console.log(err)
        }
      })
  },
}
</script>

<style></style>
