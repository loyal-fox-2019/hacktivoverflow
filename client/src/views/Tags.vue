<template>
  <div>
    <div class="none sm:block w-3/4 relative text-gray-100">
      <input @keyup.enter="filterTags" v-model="keyword" class="w-3/4 shadow appearance-none rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 focus:bg-white focus:text-gray-600" type="search" placeholder="Filter tags...">
      <div class="absolute right-0 top-0 mr-32 h-full flex items-center cursor-pointer">
        <svg @click="filterTags" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="search" class="w-4 h-4 fill-current">
          <path d="M9.331 9.331a3.088 3.088 0 1 0-4.368-4.368 3.088 3.088 0 0 0 4.368 4.368zm.655 2.11a5.149 5.149 0 0 1-6.478-7.933 5.147 5.147 0 0 1 7.934 6.478l2.256 2.257a1.03 1.03 0 1 1-1.455 1.455l-2.257-2.256z"/>
        </svg>
      </div>
    </div>
    ini tags
    <div v-for="(tag, i) in tags" :key="i">
      <router-link :to="{ name: 'questions-in-tag', params: {name: tag } }"><p>{{ tag }}</p></router-link>
      <button @click.prevent="watch(tag)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Watch
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tags',
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    fetchTags() {
      this.$store.dispatch('fetchTags')
    },
    filterTags() {
      this.$store.dispatch('fetchTags', this.keyword)
      this.keyword = ''
    },
    watch(tag) {
      this.$axios({
        method: 'POST',
        url: 'tags',
        data: { tag }
      })
        .then(({ data }) => {
          this.$store.commit('SEND_SUCCESS', 'Success!')
        })
        .catch(err => {
          this.$store.commit('SEND_ERROR', err.response.data.error)
        })
    }
  },
  created() {
    this.fetchTags()
  },
  computed: {
    tags() {
      return this.$store.state.tags
    }
  }
}
</script>

<style>

</style>