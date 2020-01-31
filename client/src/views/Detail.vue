<template>
  <div class="flex detail">
      <sideNav></sideNav>
      <div class="flex flex-col w-full">
        <div class="w-11/12 h-32 px-8 py-4 flex justify-between border-b-2">
            <div class="text-2xl ">{{question.name}}</div>
            <div @click="addQuestion" class="trans border h-10 text-center px-2 py-2 rounded bg bg-blue-500 text-white text-xs border-t-2 border-blue-300 cursor-pointer hover:bg-blue-600">Ask Question</div>
        </div>
        <div class="flex py-5 border-b-2 w-8/12">
            <div class="w-16 text-center flex flex-col">
                <img @click="upvoteQuest" class="h-8 w-10 mx-auto cursor-pointer" src="https://www.materialui.co/materialIcons/navigation/arrow_drop_up_black_144x144.png" alt="">
                <div>{{question.votes.reduce( (accum,vote) => accum+=vote.vote, 0)}}</div>
                <img @click="downvoteQuest" class="h-8 w-10 mx-auto cursor-pointer" src="https://www.materialui.co/materialIcons/navigation/arrow_drop_down_black_144x144.png">
            </div>
            <div v-html="question.description" class="w-8/12"></div>
        </div>
        <div class="w-10/12 px-4 py-4">
            <div class="w-1/12 text-lg text-gray-700 text-center">
                <p v-if="0<=question.answers.length<=1">{{question.answers.length}} answer</p>
                <p v-else>{{question}}</p>
            </div>
        </div>
        <div v-if="question.answers.length>0" class="ml-5">
            <answerComp class="w-8/12" v-for="(answerEach,i) in question.answers" :key="i" :answer="answerEach" :questionId="question._id"></answerComp>
        </div>
        <div class="w-8/12 py-5 px-4 h-64 border-b-2 border-gray-400 border-dotted">
            <p class="mb-3 text-lg">Your Answer</p>
            <wysiwyg v-model="answer" />
        </div>
        <div @click="submitAnswer" class="trans text-white px-4 mt-2 text-xs w-32 py-2 px-2 ml-4 mb-3 rounded border-t-2 border-blue-300 bg bg-blue-500 cursor-pointer hover:bg-blue-700">
            Post Your Answer
        </div>
      </div>
      <watchedTags class="h-64 w-1/4 mx-5 my-2"></watchedTags>

  </div>
</template>

<script>
import sideNav from '../components/sideNav'
import { mapActions } from 'vuex'
import answerComp from '../components/answer'
import watchedTags from '../components/watchedTags'

export default {
    components: {
        sideNav,
        answerComp,
        watchedTags
    },
    data() {
        return {
            answer: ''
        }
    },
    computed: {
        question() {
            return this.$store.state.question.detail
        }
    },
    methods: {
        ...mapActions('question',['upvote','downvote']),
        ...mapActions('answer',['postAnswer']),
        upvoteQuest() {
            this.upvote(this.question._id)
        },
        downvoteQuest() {
            this.downvote(this.question._id)
        },
        submitAnswer() {
            this.postAnswer({
                questionId: this.question._id,
                description: this.answer
            })
            this.answer = ''
        },
        addQuestion() {
            this.$router.push({path:'/form'})
        }
    }
}
</script>

<style>

</style>