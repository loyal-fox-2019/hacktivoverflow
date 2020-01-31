<template>
  <aside class="chrome chrome-context -col -fixed min-w-48 bg-gray-200 border-r border-gray-400">
      <div class="chrome">
        <div class="flex p-2 items-center hover:bg-gray-300">
          <img :src="image" class="rounded-lg border-2 border-gray-800 w-10 h-10 flex items-center justify-center">
          <div class="ml-2">Hi, {{ name.split(' ')[0] }}!</div>
        </div>
      </div>
      <div class="chrome-context border-t border-b border-gray-400">
        <div class="scroll-shadow--"
             data-controller="scroll-shadow">
          <ul class="scrollable scrollbar-none"
              data-target="scroll-shadow.scrollable"
              data-action="scroll->scroll-shadow#observe
                           resize@window->scroll-shadow#observe">
            <li>
              <ul class="">
                <li class="active" @click="fetchQuestions">
                  <router-link to="/" class="text-left block p-2 pl-4 hover:bg-yellow-400 hover:text-white active:border-yellow-400">
                    Home
                  </router-link>
                </li>
                <li>
                  <router-link to="/tags" class="text-left block p-2 pl-4 hover:bg-yellow-400 hover:text-white">
                    Tags
                  </router-link>
                </li>
                <li>
                  <router-link to="/statistics" class="text-left block p-2 pl-4 hover:bg-yellow-400 hover:text-white">
                    Statistics
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>          
        </div>
      </div>
    </aside>
</template>

<script>
export default {
  name: 'SideBar',
  computed: {
    name() {
      return localStorage.getItem('name')
    },
    image() {
      return localStorage.getItem('image')
    }
  },
  methods: {
    fetchQuestions() {
      this.$store.dispatch('fetchQuestions')
      this.$store.commit('SET_TAG', '')
    }
  }
}
</script>

<style>

</style>