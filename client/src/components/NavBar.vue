<template>
  <header class="chrome z-10">
    <nav class="flex items-center justify-between flex-wrap bg-yellow-400 px-2 py-1">
      
      <router-link to="/">
        <div @click="fetchQuestions" class="flex items-center flex-shrink-0 text-white mr-6">
          <svg class="fill-current text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 21h-10v-2h10v2zm6-11.665l-1.621-9.335-1.993.346 1.62 9.335 1.994-.346zm-5.964 6.937l-9.746-.975-.186 2.016 9.755.879.177-1.92zm.538-2.587l-9.276-2.608-.526 1.954 9.306 2.5.496-1.846zm1.204-2.413l-8.297-4.864-1.029 1.743 8.298 4.865 1.028-1.744zm1.866-1.467l-5.339-7.829-1.672 1.14 5.339 7.829 1.672-1.14zm-2.644 4.195v8h-12v-8h-2v10h16v-10h-2z"/></svg>
          <span class="ml-1 pt-1 font-semibold text-gray-800 text-xl tracking-tight">HackOverflow</span>
        </div>
      </router-link>

      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">

          <div class="none sm:block w-3/4 relative text-gray-100">
            <input @keyup.enter="search" v-model="keyword" class="w-3/4 shadow appearance-none rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 focus:bg-white focus:text-gray-600" type="search" placeholder="Search questions...">
            <div class="absolute right-0 top-0 mr-32 h-full flex items-center cursor-pointer">
              <svg @click="search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="search" class="w-4 h-4 fill-current">
                <path d="M9.331 9.331a3.088 3.088 0 1 0-4.368-4.368 3.088 3.088 0 0 0 4.368 4.368zm.655 2.11a5.149 5.149 0 0 1-6.478-7.933 5.147 5.147 0 0 1 7.934 6.478l2.256 2.257a1.03 1.03 0 1 1-1.455 1.455l-2.257-2.256z"/>
              </svg>
            </div>
          </div>

        <div class="inline-flex ml-12">
          <router-link to="/post" href="#" class="mx-1 no-underline inline-block text-sm px-4 py-2 leading-none border border-gray-800 rounded text-gray-800 border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 sm:mt-0">
            Post Question
          </router-link>
          <a @click="logout" href="#" class="mx-1 no-underline inline-block text-sm px-4 py-2 leading-none border border-gray-800 rounded text-gray-800 border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 sm:mt-0">
            Sign Out
          </a>
        </div>

      </div>

    </nav>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/landing').catch(() => {})
      this.$store.commit('SEND_SUCCESS', 'Successfully signed out')
    },
    search() {
      this.$store.dispatch('fetchQuestions', this.keyword)
      this.keyword = ''
    },
    fetchQuestions() {
      this.$store.dispatch('fetchQuestions')
    }
  }
}
</script>

<style>

</style>