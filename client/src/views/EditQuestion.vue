<template>
   <div>
      <div class="flex justify-center">
         <form @submit.prevent="updateQuestion" class="mt-12 p-4 flex flex-col border border-teal-200 shadow">
            <label class="mt-4">Title</label>
            <input type="text" class="border-b border-gray-800" required v-model="title"/>
            
            <label class="mt-4">Description</label>
            <input type="text" class="border-b border-gray-800" required v-model="description"/>

            <input type="submit" class="mt-4 rounded cursor-pointer hover:bg-green-300 py-1 font-bold text-gray-600 hover:text-gray-800" value="Submit"/>
         </form>
      </div>
   </div>
</template>

<script>
import axios from '../../apis/server'

export default {
   name: 'EditQuestion',
   
   data() {
      return {
         title: '',
         description: ''
      }
   },

   methods: {
      updateQuestion() {
         axios({
            url: `/question/${this.$route.params.questionId}`,
            method: 'patch',
            headers: {
               token: localStorage.token
            },
            data: {
               title: this.title,
               description: this.description
            }
         })
         .then(() => {
            this.$swal({
               type: 'success',
               title: 'Your question has been updated successfully',
               showConfirmButton: false,
               timer: 1000
            })
            this.$router.push(`/question/${this.$route.params.questionId}`)
         })
         .catch(error => {
            this.$swal({
               type: 'error',
               title: 'Edit submission has failed',
               text: error.response.data.message,
               showConfirmButton: false,
               timer: 1500
            })
         })
      },

      fetchQuestion() {
         axios({
            url: `/question/${this.$route.params.questionId}`,
            method: 'get'
         })
         .then(({data}) => {
            this.title = data.question.title
            this.description = data.question.description
         })
         .catch(error => {
            console.log(error.response.data.message)
         })
      }
   },

   created() {
      this.fetchQuestion()
   }
}
</script>

<style>

</style>