<template>
  <div>
    {{ question.title }}
    <p v-html="question.content"></p>
    <div class="flex items-center justify-between">
      <button @click="editQuestion" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Edit
      </button>
      <button @click="deleteQuestion" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Delete
      </button>
      <button @click="vote('up')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Upvote
      </button>
      <button @click="vote('down')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Downvote
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Question',
  data() {
    return {

    }
  },
  methods: {
    deleteQuestion() {
      this.$store.dispatch('deleteQuestion', this.$route.params.id)
    },
    editQuestion() {
      this.$router.push(`/questions/${this.$route.params.id}/edit`).catch(() => {})
    },
    fetchQuestion() {
      this.$store.dispatch('fetchQuestion', this.$route.params.id)
    },
    vote(type) {
      this.$axios({
        method: 'PATCH',
        url: `questions/${this.$route.params.id}?vote=${type}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      this.fetchQuestion()
    }
  },
  created() {
    this.fetchQuestion()
  },
  computed: {
    question() {
      return this.$store.state.question
    }
  },
  watch: {
    '$route.params.id'() {
      this.fetchQuestion()
    }
  }
}
</script>

<style>

</style>