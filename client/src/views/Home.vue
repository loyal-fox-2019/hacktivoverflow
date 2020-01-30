<template>
  <div class="home flex">
    <sideNav class=""></sideNav>
      <div class="flex flex-col  w-2/4">
        <div class="px-5 border-b h-32">
          <p class="font-bold text-2xl ">Public Questions</p>
          <div class="text-right">
            <button @click="addQuestion" class="trans border-t-2 text-xs border-blue-300 py-2 px-3 rounded bg bg-blue-500 text-white hover:bg-blue-700">Ask Question</button>
          </div>
        </div>
        <question class="border-b py-3" v-for="(question,i) in questions" :key="i" :question="question"></question>
      </div>
      <watchedTags class="h-64 w-1/4 mx-5 my-2"></watchedTags>
  </div>
</template>

<script>
import sideNav from '../components/sideNav'
import question from '../components/question'
import watchedTags from '../components/watchedTags'
import { mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    sideNav,
    question,
    watchedTags
  },
  computed: {
    questions() {
      return this.$store.state.question.questions
    }
  },
  created() {
    this.getQuestions()
  },
  methods: {
    ...mapActions('question',['getQuestions']),
    addQuestion() {
      this.$router.push({path: '/form'})
    }
  }
}
</script>
