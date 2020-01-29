<template>
  <div
    class="w-screen justify-center flex items-center custom-container bg-gray-100 pr-10"
  >
    <div
      class="w-4/12 border border-gray-300 p-5 bg-white shadow-md rounded-sm"
    >
      <h1 class="text-4xl text-gray-800 font-bold">
        Join the Stuck Overflow community
      </h1>
      <hr class="mt-2 shadow" />
      <div class="mt-8">
        <div class="text-2xl text-gray-800 font-hairline mb-2">
          <span class="fab fa-keycdn"></span> Get stuck — ask a question
        </div>
        <div class="text-2xl text-gray-800 font-hairline mb-2">
          <span class="fab fa-studiovinari"></span> Unlock new privileges like
          voting and answering
        </div>
        <div class="text-2xl text-gray-800 font-hairline">
          <span class="fab fa-napster"></span> Save your favorite tags
        </div>
      </div>
    </div>
    <div class="w-1/12"></div>
    <div class="w-3/12">
      <div class="w-full flex justify-center mb-10">
        <h1 class="text-gray-800 text-2xl">
          Create your Stuck Overflow account. It's free and only takes a minute.
        </h1>
      </div>
      <GoogleLogin
        :params="params"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
        class="bg-white text-black p-2 w-full mb-2 shadow hover:shadow-lg focus:outline-none rounded-sm"
        ><span class="fab fa-google"></span> Sign up with Google</GoogleLogin
      >
      <a
        class="block bg-gray-800 text-white p-2 w-full mb-2 text-center hover:bg-gray-900 rounded-sm hover:shadow-lg"
        href="https://github.com/login/oauth/authorize?client_id=c5b093d439b87c326086&scope=read:user%20user:email"
      >
        <span class="fab fa-github"></span> Sign up with Github
      </a>
      <button
        class="block bg-blue-400 text-white p-2 w-full hover:bg-blue-500 rounded-sm hover:shadow-lg"
        @click="requestTwitterToken"
      >
        <span class="fab fa-twitter"></span> Sign up with Twitter
      </button>
      <div class="w-full flex justify-center">
        <div class="w-full mt-5">
          <form
            class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            @submit.prevent="register"
          >
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="Username"
              >
                Username
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                autocomplete="off"
                v-model="username"
                required
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="email"
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
            <div class="mb-4">
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
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Re-enter password
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                v-model="rePassword"
                required
              />
            </div>
            <div>
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
          <p class="text-center text-gray-500 text-xs">
            Already have an account?
            <router-link to="/login" class="text-blue-500">Log in</router-link>
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
      rePassword: '',
      username: '',
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
    register() {
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
