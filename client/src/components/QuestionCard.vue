<template>
   <div class="flex items-center my-4 mb-10 border border-gray-600 rounded-lg py-4" id="question-card">
      <div class="flex flex-col mx-2 counter">
         <h3 class="font-bold text-3xl text-gray-700">{{question.votes.length}}</h3>
         <span class="text-gray-700">Total votes</span>
      </div>
      <div class="flex flex-col mx-2 counter">
         <h3 class="font-bold text-3xl text-gray-700">{{question.answers.length}}</h3>
         <span class="text-gray-700">Total answers</span>
      </div>
      <div class="px-2 ml-3 flex flex-col items-start">
         <router-link :to="`/question/${question._id}`" class="text-left text-3xl font-bold text-gray-600 hover:text-gray-800 border-b border-gray-700 mb-2">{{question.title}}</router-link>
         <p class="text-gray-600 text-left mb-4">{{question.description}}</p>
         <div class="flex flex-wrap">
            <div class="flex items-center bg-blue-200 px-2 py-1 mx-3 rounded-lg text-gray-800 hover:bg-green-300 cursor-pointer" v-for="tag in question.tags" :key="tag">
               <span class="px-2" @click="toHomeByTag(tag)">{{tag}}</span>
               <span v-if="user._id == question.user" class="py-1 px-2 rounded-full hover:bg-red-300" @click="removeTagFromQuestion(tag)">x</span>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import axios from '../../apis/server'
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
   name: 'QuestionCard',
   props: {
      question: Object,
      voteFlag: null
   },
   methods: {
      checkVoteByCurrentUser() {
         const userFilterVotes = this.question.votes.filter((vote) => {
            return vote.userId == localStorage.userId
         })

         if(userFilterVotes.length > 0) {
            this.voteFlag = userFilterVotes[0].voteType
         }
      },

      toHomeByTag(tag) {
         this.$router.push({name: 'homeByTag', params: {tag}})
      },

      async removeTagFromQuestion(tag) {
         try {
            const {data} = await axios.patch(`/question/remove_tag/${this.question._id}`,
               {tag},
               {
                  headers: {
                     token: localStorage.token
                  }
               }
            )
            
            const routeTag = this.$route.params.tag || null
            if(routeTag) this.fetchQuestionsByTag()
            else this.fetchQuestions()
         }
         catch (error) {
            Swal.fire({
               text: error.response.data.message
            })
         }
      },

      ...mapMutations('question', ['UPDATE_QUESTIONS']),
      ...mapActions('question', ['fetchQuestions']),

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
      }

   
   },

   computed: {
      ...mapState('user', ['user'])
   },

   created() {
      this.checkVoteByCurrentUser()
   }
}
</script>

<style scoped>
   .counter {
      min-width: 100px;
   }
</style>