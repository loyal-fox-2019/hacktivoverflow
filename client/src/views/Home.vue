<template>
  <div class="home">
    <h1>Hello from Home</h1>
    <GoogleLogin
      :params="params"
      :renderParams="renderParams"
      :onSuccess="onSuccess"
      :onFailure="onFailure"
    ></GoogleLogin>
    <b-button
      variant="dark"
      href="https://github.com/login/oauth/authorize?client_id=c5b093d439b87c326086&scope=read:user%20user:email"
      >Continue with Github</b-button
    >
    <b-button variant="primary" class="d-block" @click="requestTwitterToken"
      >Continue with Twitter</b-button
    >
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login'
import HelloWorld from '@/components/HelloWorld.vue'
import api from '@/config/api'

export default {
  name: 'home',
  components: {
    HelloWorld,
    GoogleLogin,
  },
  data: function() {
    return {
      // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
      params: {
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
    }
  },
  methods: {
    onSuccess(googleUser) {
      const token = googleUser.getAuthResponse().id_token

      console.log('loading...')

      api
        .post('/third-api-login/google', { token })
        .then(({ data }) => {
          console.log('udah selesai loading')
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
    onFailure() {
      console.log('terjadi kesalahan')
    },
    requestTwitterToken() {
      api
        .get('/third-api-login/request-twitter-token')
        .then(({ data }) => {
          console.log(data)
          window.location = data.url
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
  },
}
</script>
