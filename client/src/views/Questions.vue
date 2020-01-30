<template>
  <article class="px-4">
    <div style="height:200vh" class="flex flex-col justify-between text-3xl">
      <div v-if="tag">
        ini dari {{ tag }}
      </div>
      <div v-for="question in questions"
        :key="question._id"
        class="flex-1 flex justify-center items-start"
      >
        <router-link :to="{ name: 'question', params: {id: question._id } }"><h3>{{ question.title }}</h3></router-link>
        <p v-html="question.content.substring(0,100)"></p>

        <div class="flex items-center justify-between">
          <button @click="vote('up', question._id)" class="bg-yellow-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Upvote
          </button>
          <button @click="vote('down', question._id)" class="bg-yellow-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Downvote
          </button>
        </div>

      </div>
      
    </div>
  </article>
</template>

<script>
export default {
  name: 'Questions',
  data() {
    return {
      tag: ''
    }
  },
  computed: {
    questions() {
      return this.$store.state.questions
    }
  },
  methods: {
    vote(type, id) {
      this.$axios({
        method: 'PATCH',
        url: `questions/${id}?vote=${type}`
      })
        .then(() => {
          this.fetchQuestions()
          this.$store.commit('SEND_SUCCESS', 'Success!')
        })
        .catch(err => {
          this.$store.commit('SEND_ERROR', err.response.data.error)
        })
    },
    fetchQuestions() {
      this.$store.dispatch('fetchQuestions')
    },
    filterQuestionByTag() {
      this.$store.dispatch('filterQuestionByTag', this.$route.params.name)
    }
  },
  created() {
    if (this.$route.params.name) {
      this.filterQuestionByTag()
    }
  }
}
</script>

<style>

</style>