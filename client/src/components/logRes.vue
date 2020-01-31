<template>
  <div class="">
      <form class="mx-auto my-auto py-3 text-center shadow-2xl bg-gray-200 rounded-lg">
      <img class="h-16 mb-3 w-auto mx-auto" src="https://www.iconsdb.com/icons/preview/dim-gray/stackoverflow-3-xxl.png" alt="">
      <div v-if="toRegister" class="mb-3 uppercase text-xl text-gray-700 font-extrabold">
        register
      </div>
      <div v-else class="mb-3 uppercase text-xl text-gray-700 font-extrabold">
        login
      </div>
      <div v-if="toRegister" class="mb-3">
        <label class="block mb-1 text-xs font-bold ml-2 uppercase text-gray-700" for="name">Name</label>
        <input v-model="name" class="trans border border-gray-500 opacity-75 text-sm rounded px-1 focus:outline-none focus:outline-none focus:border-gray-500 focus:opacity-100 focus:shadow-lg" autocomplete="off" id="name" type="text" placeholder="Input name">
      </div>
      <div class="mb-3">
        <label class="block mb-1 text-xs font-bold ml-2 uppercase text-gray-700" for="email">Email</label>
        <input v-model="email" class="trans border border-gray-500 opacity-75 text-sm rounded px-1 focus:outline-none focus:outline-none focus:border-gray-500 focus:opacity-100 focus:shadow-lg" autocomplete="off" id="email" type="text" placeholder="Input email">
      </div>
      <div class="mb-3">
        <label class="block mb-1 text-xs font-bold ml-2 uppercase text-gray-700" for="password">password</label>
        <input v-model="password" class="trans border border-gray-500 opacity-75 text-sm rounded px-1 focus:outline-none focus:border-gray-500 focus:opacity-100 focus:shadow-lg" id="password" type="password" placeholder="Input password">
      </div>
      <div v-if="toRegister" @click="register" class="trans mt-6 mb-3 text-sm border border-gray-700 w-1/4 mx-auto rounded py-1 text-gray-700 font-bold uppercase hover:bg-gray-700 hover:border-gray-800 cursor-pointer hover:shadow-2xl hover:text-white">
        register
      </div>
      <div @click="login" v-else class="trans mt-2 mb-3 text-sm border border-gray-700 w-1/4 mx-auto rounded py-1 text-gray-700 font-bold uppercase hover:bg-gray-700 hover:border-gray-800 cursor-pointer hover:shadow-2xl hover:text-white">
        login
      </div>
      <hr v-if="!toRegister" class="mb-2 border border-black opacity-25 w-3/4 mx-auto">
      <div @click.prevent="swapRegister" v-if="!toRegister" class="trans w-2/12 mx-auto text-gray-700 text-sm hover:text-gray-900 cursor-pointer">
        Register 
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toRegister: false,
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    swapRegister() {
      this.toRegister = true
      this.email = '',
      this.password = ''
    },
    login() {
      this.$store.dispatch('login',{
        email: this.email,
        password: this.password
      })
      this.email= ''
      this.password = ''
    },
    register() {
        this.$store.dispatch('register',{
            name: this.name,
            email: this.email,
            password: this.password
        })
        this.name = ''
        this.email = ''
        this.password = ''
    }
  }
}
</script>

<style>
.trans {
    transition: 500ms;
}
.trans:hover {
    transition: 500ms;
}
.trans:focus {
    transition: 500ms;
}
</style>