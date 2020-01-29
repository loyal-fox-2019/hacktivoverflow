<template>
  <nav class="flex">
    <div class="flex items-center justify-between bg-orange-400 w-screen px-4">
      <div
        class="flex items-center hover:text-white hover:bg-orange-500 pr-2"
        style="cursor: pointer"
        @click="goTo('questions')"
      >
        <img src="@/assets/icon4.png" class="w-12 h-12 rounded-lg mr-1 p-1" />
        <h1>Stuck Overflow</h1>
      </div>
      <div class="flex h-full p-0 m-0">
        <div
          class="h-full flex items-center hover:text-white hover:bg-orange-500 px-2"
          style="cursor: pointer;"
          @click="goTo('login')"
        >
          <p>Login</p>
        </div>
        <div
          class="h-full flex items-center hover:text-white hover:bg-orange-500 px-2"
          style="cursor: pointer;"
          @click="goTo('register')"
        >
          <p>Register</p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    goTo(url) {
      this.$router.push('/' + url)
    },
  },
}
</script>

<style></style>
