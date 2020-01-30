<template>
  <nav class="flex">
    <div class="flex items-center justify-between bg-orange-500 w-screen px-4">
      <div
        class="flex items-center hover:text-white hover:bg-orange-600 pr-2"
        style="cursor: pointer"
        @click="goTo('questions')"
      >
        <img src="@/assets/icon4.png" class="w-12 h-12 rounded-lg mr-1 p-1" />
        <h1>Stuck Overflow</h1>
      </div>
      <div class="flex h-full p-0 m-0">
        <!-- login section -->
        <Fragment v-if="username">
          <div
            class="h-full flex items-center text-white hover:bg-blue-600 px-2 bg-blue-500 mr-5"
            style="cursor: pointer;"
            @click="goTo('ask-question')"
          >
            <p>+ Ask a Question</p>
          </div>
          <div class="h-full flex items-center px-2">
            <img :src="avatar" width="24" height="24" class="rounded-full" />
            <p class="ml-2">{{ username }}</p>
          </div>
          <div
            class="h-full flex items-center hover:text-white hover:bg-orange-600 px-2"
            style="cursor: pointer;"
            @click="logout"
          >
            <p>Logout</p>
          </div>
        </Fragment>
        <!-- end of login -->

        <!-- not login section -->
        <Fragment v-else>
          <div
            class="h-full flex items-center hover:text-white hover:bg-orange-600 px-2"
            style="cursor: pointer;"
            @click="goTo('login')"
          >
            <p>Login</p>
          </div>
          <div
            class="h-full flex items-center hover:text-white hover:bg-orange-600 px-2"
            style="cursor: pointer;"
            @click="goTo('register')"
          >
            <p>Register</p>
          </div>
        </Fragment>
        <!-- not login section -->
      </div>
    </div>
  </nav>
</template>

<script>
import { Fragment } from 'vue-fragment'

export default {
  name: 'Navbar',
  components: { Fragment },
  methods: {
    goTo(url) {
      this.$router.push('/' + url)
    },
    logout() {
      this.$store.commit('RESET_USER_DATA')
      this.$router.push('/')
      this.$toast.open({
        message: 'Logout success',
        type: 'success',
        position: 'top-right',
        duration: 1500,
      })
    },
  },
  computed: {
    avatar() {
      return this.$store.state.avatar
        ? this.$store.state.avatar
        : 'https://placekitten.com/200/200'
    },
    username() {
      return this.$store.state.username
    },
  },
}
</script>

<style></style>
