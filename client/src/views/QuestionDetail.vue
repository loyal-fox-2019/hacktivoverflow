<template>
   <div class="flex flex-col items-center mt-12">
      <div class="flex items-center mb-8 border border-gray-500 p-6" id="card-detail-container">
         <div class="flex flex-col px-2">
            <i class="fas fa-chevron-up cursor-pointer font-bold text-3xl text-gray-500 hover:text-gray-800" :class="{'text-blue-700': voteFlag == 'up'}" @click="vote('up')"></i>
            <i class="fas fa-chevron-down cursor-pointer font-bold text-3xl text-gray-500 hover:text-gray-800" :class="{'text-blue-700': voteFlag == 'down'}" @click="vote('down')"></i>
         </div>
         <router-link :to="`/answer/${this.$route.params.questionId}`">
            <i class="far fa-plus-square text-blue-300 hover:text-blue-700 text-5xl mx-4 px-4 cursor-pointer"></i>
         </router-link>
         <div class="flex flex-col items-start">
            <h2 class="text-gray-700 font-semibold text-xl text-left">{{question.title}}</h2>
            <h3 class="text-gray-600 font-thin hover:text-gray-800 text-left">By: {{question.user.username}}</h3>
            <p class="text-left">{{question.description}}</p>
            <div v-if="question.user._id == user._id" class="flex mt-3">
               <router-link :to="`/question/${this.$route.params.questionId}/edit`">
                  <i class="fas fa-pencil-alt text-2xl mx-3 text-gray-500 hover:text-green-500 cursor-pointer"></i>
               </router-link>
               <i class="fas fa-eraser text-2xl mx-3 text-gray-500 hover:text-red-500 cursor-pointer" @click="deleteQuestion"></i>
            </div>
         </div>
      </div>
      <h2 v-if="answers.length > 0" class="text-2xl text-gray-700 font-semibold mb-3">Answers:</h2>
      <answer-card v-for="answer in answers" :key="answer._id" :answerId="answer._id" v-on:answerDeletedEvent="fetchDetail()"/>
   </div>
</template>

<script>
import axios from '../../apis/server'
import AnswerCard from '../components/AnswerCard'
import {mapState} from 'vuex'

export default {
   name: 'QuestionDetail',

   data() {
      return {
         question: {},
         answers: [],
         user: {
            username: ''
         },
         voteFlag: null,
         userIsOwner: false,
      }
   },

   components: {
      'answer-card': AnswerCard
   },

   methods: {
      fetchDetail() {
         axios({
            url: `/question/${this.$route.params.questionId}`,
            method: 'get'
         })
         .then(({data}) => {
            this.question = data.question
            console.log(this.question, 'isi detail question')
            this.answers = data.question.answers

            this.checkVoteByCurrentUser()
            return axios({
               // url: `/user/${data.question.user}`,
               url: `/user`,
               method: 'get',
               headers: {
                  token: localStorage.token
               }
            })
         })
         .then(({data}) => {
            this.user = data.user
            this.checkIfOwner()
         })
         .catch(error => console.log(error))
      },

      checkVoteByCurrentUser() {
         const userFilterVotes = this.question.votes.filter((vote) => {
            return vote.userId == localStorage.userId
         })

         if(userFilterVotes.length > 0) {
            this.voteFlag = userFilterVotes[0].voteType
         }
         else this.voteFlag = null
      },

      checkIfOwner() {
         if(this.user._id == localStorage.userId) {
            this.userIsOwner = true
         }
         else {
            this.userIsOwner = false
         }
      },

      vote(voteType) {
         axios({
            url: `/question/${this.$route.params.questionId}/vote?voteType=${voteType}`,
            method: 'patch',
            headers: {
               token: localStorage.token
            }
         })
         .then(({data}) => {
            this.fetchDetail()
         })
         .catch(error => {
            let text = error.response.data.message == 'JsonWebTokenError' ? 'You have to log in before performing this action' : error.response.data.message

            this.$swal({
               type: 'error',
               title: 'Voting failed',
               text
            })
         })
      },

      deleteQuestion() {
         axios({
            url: `/question/${this.$route.params.questionId}`,
            method: 'delete',
            headers: {
               token: localStorage.token
            }
         })
         .then(() => {
            this.$swal({
               type: 'success',
               title: 'Question deletion was successful',
               showConfirmButton: false,
               timer: 1500
            })
            this.$router.push('/')
         })
         .catch(error => {
            this.$swal({
               type: 'error',
               title: 'Question deletion has failed',
               text: error.response.data.message
            })
         })
      }
   },

   created() {
      this.fetchDetail()
   },

   computed: {
      // ...mapState('user', ['user'])
   },

   watch: {
      voteFlag: function() {

      }
   }
}
</script>

<style scoped>
   #card-detail-container {
      max-width: 70%;
   }
</style>