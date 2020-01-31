<template>
  <div class="flex">
      <sideNav></sideNav>
      <div class="flex flex-col w-6/12">
        <div class="px-5 border-b h-32">
            <p class="font-bold text-2xl ">Your Questions</p>
            <div class="text-right">
            <button @click="addQuestion" class="border-t-2 text-xs border-blue-300 py-2 px-3 rounded bg bg-blue-500 text-white hover:bg-blue-700">Ask Question</button>
            </div>
        </div>
        <question class="border-b py-3" v-for="(question,i) in questions" :key="i" :question="question" :user="true"></question>
      </div>
      <watchedTags class="h-64 w-1/4 mx-5 my-2"></watchedTags>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import sideNav from '../components/sideNav'
import question from '../components/question'
import watchedTags from '../components/watchedTags'

export default {
    components: {
        question,
        sideNav,
        watchedTags
    },
    computed: {
        questions() {
            return this.$store.state.question.questions
        }
    },
    created() {
        this.getUserQuest()
    },
    methods: {
        ...mapActions('question',['getUserQuestions']),
        getUserQuest() {
            this.getUserQuestions()
        },
        addQuestion() {
            this.$router.push({path:'/form'})
        }
    }
}
</script>

<style>

</style>