<template>
  <div class="bg-white border-t-4 border-orange-500 shadow fixed z-30 w-screen top-0">
    <div class="container border-blue-500 flex flex-col md:flex-row justify-between mx-auto px-4">
      <div class="flex">
        <div class="flex">
          <router-link
            to="/"
            class="my-auto opacity-50 text-gray-600 opacity-100 flex items-center py-2 border-b border-transparent hover:text-gray-900">
            yuckOverflow
          </router-link>
        </div>
      </div>
      <div class="relative flex items-center w-full md:w-1/2 text-orange-500 py-2">
        <form class="w-full">
          <input
            v-model="keyword" 
            type="search" 
            name="search"
            placeholder="Search" 
            class="h-10 px-5 w-full pr-10 rounded-full text-sm border border-orange-500 focus:outline-none">
        </form>
        <div class="flex absolute right-0 mr-4">
          <button type="submit" class="">
            <svg class="h-4 w-4 fill-current " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve" width="512px" height="512px">
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="flex items-center">
        <router-link
          v-if="!isLoggedIn"
          to="/login"
          class="px-2 py-1 my-2 bg-blue-100 border border-blue-600 hover:bg-blue-200 rounded text-blue-600">
          Log in
        </router-link>
        <button
          @click.prevent="logout"
          v-if="isLoggedIn"
          class="px-2 py-1 my-2 bg-blue-100 border border-blue-600 hover:bg-blue-200 rounded text-blue-600">
          Log out
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheNavbar',
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('SET_IS_LOGGED_IN', false)
      this.$router.push('/login')
      this.$toasted.info('You are logged out', {
        position: 'top-center',
        duration: 3000
      })
    }
  },
  computed: {
    isLoggedIn() {
      console.log(this.$store.state.isLoggedIn, '<<<')
      return this.$store.state.isLoggedIn
    }
  }
}
</script>

<style>

</style>