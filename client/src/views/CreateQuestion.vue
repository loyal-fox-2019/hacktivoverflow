<template>
   <div class="flex justify-center">
      
      <form class="flex flex-col custom-width" @submit.prevent="submit">
         <label class="mt-4">Title</label>
         <input type="text" required v-model="title" class="border-b border-gray-800"/>

         <label class="mt-4">Description</label>
         <input type="text" required v-model="description" class="border-b border-gray-800"/>

         <label class="mt-4">Tags</label>
         <!-- <input type="text" v-model="tags" class="border-b border-gray-800" placeholder="microsoft,server,azure"/> -->
         <input-tag v-model="tags" class="mt-2" add-tag-on-keys="188" placeholder="Press 'comma' to make a tag"></input-tag>

         <input type="submit" class="mt-4 rounded cursor-pointer hover:bg-green-300 py-1 font-bold text-gray-600 hover:text-gray-800" value="Ask"/>
      </form>
      
   </div>
</template>

<script>
import axios from '../../apis/server'
import InputTag from 'vue-input-tag'

export default {
   name: 'CreateQuestion',
   data() {
      return {
         title: '',
         description: '',
         tags: ''
      }
   },

   components: {
      InputTag
   },

   methods: {
      submit() {
         axios({
            url: `/question`,
            method: 'post',
            data: {
               title: this.title,
               description: this.description,
               tags: this.tags
            },
            headers: {
               token: localStorage.getItem('token')
            }
         })
         .then(() => {
            this.$router.push('/')
         })
         .catch(error => console.log(error))
      }
   }
}
</script>

<style>
   .custom-width {
      width: 25rem;
   }

   input {
      width: 100% !important;
   }
</style>