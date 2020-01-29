<template>
  <div
    class="w-screen justify-center flex items-center custom-container bg-gray-100"
  >
    <div class="w-3/12">
      <div class="w-full flex justify-center mb-2">
        <img
          src="@/assets/icon4.png"
          class="rounded-lg shadow hover:shadow-lg"
          style="cursor: pointer;"
          @click="goTo('/')"
        />
      </div>
      <GoogleLogin
        :params="params"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
        class="bg-white text-black p-2 w-full mb-2 shadow hover:shadow-lg focus:outline-none rounded-sm"
        ><span class="fab fa-google"></span> Log in with Google</GoogleLogin
      >
      <a
        class="block bg-gray-800 text-white p-2 w-full mb-2 text-center hover:bg-gray-900 rounded-sm hover:shadow-lg"
        href="https://github.com/login/oauth/authorize?client_id=c5b093d439b87c326086&scope=read:user%20user:email"
      >
        <span class="fab fa-github"></span> Log in with Github
      </a>
      <button
        class="block bg-blue-400 text-white p-2 w-full hover:bg-blue-500 rounded-sm hover:shadow-lg"
        @click="requestTwitterToken"
      >
        <span class="fab fa-twitter"></span> Log in with Twitter
      </button>
      <div class="w-full flex justify-center">
        <div class="w-full mt-5">
          <form
            class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            @submit.prevent="login"
          >
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Email
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="email"
                placeholder="Email"
                autocomplete="off"
                v-model="email"
                required
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                v-model="password"
                required
              />
            </div>
            <div>
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Log in
              </button>
            </div>
          </form>
          <p class="text-center text-gray-500 text-xs">
            Didn't have an account?
            <router-link to="/register" class="text-blue-500"
              >Sign Up</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login'
import api from '@/config/api'

export default {
  name: 'home',
  components: {
    GoogleLogin,
  },
  data: function() {
    return {
      // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
      params: {
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      },
      email: '',
      password: '',
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
    goTo(url) {
      this.$router.push(url)
    },
    login() {
      console.log('masuk')
    },
  },
}
</script>

<style scoped>
.custom-container {
  height: 57rem;
}
</style>
