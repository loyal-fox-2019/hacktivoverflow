<template>
  <div class="flex flex-col items-center my-12">
    <div class="card-container shadow p-6 mb-6" v-if="isLoggedIn">
      <TagBar :watchedTags="watchedTags" @refetchWatchedTag="fetchWatchedTags"/>
    </div>
    <div class="shadow p-6 card-container" v-if="questions.length > 0">
      <question-card v-for="question in questions" :key="question._id" :question="question" />
    </div>
    <p v-else class="font-bold text-gray-700 text-2xl">We don't have any question at this moment</p>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapActions, mapState, mapMutations} from 'vuex'
import QuestionCard from '../components/QuestionCard'
import TagBar from '../components/TagBar'
import axios from '../../apis/server'

export default {
  name: 'home',
  components: {
    'question-card': QuestionCard,
    TagBar
  },

  computed: {
    ...mapState('question', ['questions']),
    ...mapState('user', ['watchedTags', 'isLoggedIn'])
  },

  methods: {
    ...mapActions('user', ['checkLoggedIn', 'fetchUser']),
    ...mapActions('question', ['fetchQuestions']),
    ...mapMutations('question', ['UPDATE_QUESTIONS']),
    ...mapMutations('user', ['SET_WATCHEDTAGS']),

    async fetchQuestionsByTag() {
      try {
        const {data} = await axios.get(`/question?tag=${this.$route.params.tag}`)
        this.UPDATE_QUESTIONS(data.questions)
      }
      catch (error) {
        Swal.fire({
          text: error.response.data.message
        })
      }
    },

    async fetchWatchedTags() {
      try {
        const {data} = await axios.get('/user', {
          headers: {
            token: localStorage.token
          }
        })
        console.log(data.user, 'setelah fetch')
        this.SET_WATCHEDTAGS(data.user.watchedTags)
      }
      catch (error) {
        Swal.fire({
          text: error.response.data.message
        })
      }
    }
  },

  created() {
    this.checkLoggedIn()
    this.fetchWatchedTags()
    
    if(this.$route.params && this.$route.params.tag) {
      this.fetchQuestionsByTag()
    }
    else {
      this.fetchQuestions()
    }
  }
}
</script>

<style scoped>
  .card-container {
    width: 70%
  }
</style>