<template>
   <div class="flex items-center border border-gray-500 p-4">
      <!-- <p>{{answer.content}} {{answer.user.username}}</p> -->
      <div class="flex flex-col px-2">
         <i class="fas fa-chevron-up cursor-pointer font-bold text-3xl text-gray-500 hover:text-gray-800" :class="{'text-blue-700': voteFlag == 'up'}" @click="vote('up')"></i>
         <i class="fas fa-chevron-down cursor-pointer font-bold text-3xl text-gray-500 hover:text-gray-800" :class="{'text-blue-700': voteFlag == 'down'}" @click="vote('down')"></i>
      </div>
      <div class="flex flex-col items-start p-2 mx-2">
         <p class="leading-normal text-left">{{answer.content}}</p>
         <p class="text-gray-500 hover:text-gray-800 text-left">By: {{answer.user.username}}</p>

         <div v-if="userIsOwner" class="flex mt-3">
            <router-link :to="`/answer/${answerId}/edit`">
               <i class="fas fa-pencil-alt text-2xl mx-3 text-gray-500 hover:text-green-500 cursor-pointer"></i>
            </router-link>
            <i class="fas fa-eraser text-2xl mx-3 text-gray-500 hover:text-red-500 cursor-pointer" @click="deleteAnswer"></i>
         </div>
      </div>
   </div>
</template>

<script>
import axios from '../../apis/server'

export default {
   name: 'AnswerCard',
   data() {
      return {
         answer: {
            user: {
               username: ''
            }
         },
         voteFlag: null,
         userIsOwner: false
      }
   },

   props: {
      answerId: String
   },

   methods: {
      fetchAnswer() {
         axios({
            url: `/answer/${this.answerId}`,
            method: 'get'
         })
         .then(({data}) => {
            this.answer = data.answer
            this.checkVoteByCurrentUser()
            this.checkIfOwner()
         })
         .catch(error => console.log(error))
      },

      checkVoteByCurrentUser() {
         const userFilterVotes = this.answer.votes.filter((vote) => {
            return vote.userId == localStorage.userId
         })

         if(userFilterVotes.length > 0) {
            this.voteFlag = userFilterVotes[0].voteType
         }
         else this.voteFlag = null
      },

      checkIfOwner() {
         if(this.answer.user._id == localStorage.userId) {
            this.userIsOwner = true
         }
         else {
            this.userIsOwner = false
         }
      },

      vote(voteType) {
         axios({
            url: `/answer/${this.answerId}/vote?voteType=${voteType}`,
            method: 'patch',
            headers: {
               token: localStorage.token
            }
         })
         .then(({data}) => {
            this.fetchAnswer()
         })
         .catch(error => {
            this.$swal({
               type: 'error',
               title: 'Answer voting failed',
               text: error.response.data.message
            })
         })
      },

      deleteAnswer() {
         axios({
            url: `/answer/${this.answerId}`,
            method: 'delete',
            headers: {
               token: localStorage.token
            }
         })
         .then(() => {
            this.$emit('answerDeletedEvent')
            this.$swal({
               type: 'success',
               title: 'Answer deleted',
               showConfirmButton: false,
               timer: 1500
            })
         })
         .catch(error => {
            this.$swal({
               type: 'error',
               title: 'Answer deletion failed',
               text: error.response.data.message,
               showConfirmButton: false,
               timer: 1500
            })
         })
      }
   },

   created() {
      this.fetchAnswer()
   }
}
</script>

<style>

</style>