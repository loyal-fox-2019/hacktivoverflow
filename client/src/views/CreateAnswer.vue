<template>
   <div class="flex justify-center">
      <form @submit.prevent="submitAnswer" class="mt-12 p-4 flex flex-col border border-teal-200 shadow">         
         <label class="mt-4 font-semibold text-gray-700">Content</label>
         <input type="text" class="border-b border-gray-800 leading-normal text-gray-700" required v-model="content"/>

         <input type="submit" class="mt-4 rounded cursor-pointer hover:bg-green-300 py-1 font-bold text-gray-600 hover:text-gray-800" value="Answer"/>
      </form>
   </div>
</template>

<script>
import axios from '../../apis/server'

export default {
   name: 'CreateAnswer',
   
   data() {
      return {
         content: ''
      }
   },

   methods: {
      submitAnswer() {
         axios({
            url: `/answer/${this.$route.params.questionId}`,
            method: 'post',
            headers: {
               token: localStorage.token
            },
            data: {
               content: this.content
            }
         })
         .then(() => {
            this.$router.push(`/question/${this.$route.params.questionId}`)
         })
         .catch(error => {
            this.$swal({
               type: 'error',
               title: 'Answer submission failed',
               text: error.response.data.message
            })
         })
      }
   }
}
</script>

<style>
   input[type="text"] {
      width: 500px;
   }

   input {
      outline-style: none;
   }
</style>