<template>
   <div>
      <div class="flex justify-center">
         <form @submit.prevent="updateAnswer" class="mt-12 p-4 flex flex-col border border-teal-200 shadow">
            <label class="mt-4">Content</label>
            <input type="text" class="border-b border-gray-800" required v-model="content"/>

            <input type="submit" class="mt-4 rounded cursor-pointer hover:bg-green-300 py-1 font-bold text-gray-600 hover:text-gray-800" value="Submit"/>
         </form>
      </div>
   </div>
</template>

<script>
import axios from '../../apis/server'

export default {
   name: 'EditAnswer',

   data() {
      return {
         answer: {},
         content: ''
      }
   },

   methods: {
      fetchAnswer() {
         axios({
            url: `/answer/${this.$route.params.answerId}`,
            method: 'get',
            headers: {
               token: localStorage.token
            },
            data: {
               content: this.content
            }
         })
         .then(({data}) => {
            this.answer = data.answer
            this.content = data.answer.content
         })
         .catch(error => {
            console.log(error)
         })
      },

      updateAnswer() {
         axios({
            url: `/answer/${this.$route.params.answerId}`,
            method: 'patch',
            headers: {
               token: localStorage.token
            },
            data: {
               content: this.content
            }
         })
         .then(() => {
            this.$swal({
               type: 'success',
               title: 'Answer edit submission success',
               showConfirmButton: false,
               timer: 1000
            })
            this.$router.push(`/question/${this.answer.question}`)
         })
         .catch(error => {
            this.$swal({
               type: 'error',
               title: 'Answer edit submission has failed',
               text: error.response.data.message,
               showConfirmButton: false,
               timer: 1000 
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