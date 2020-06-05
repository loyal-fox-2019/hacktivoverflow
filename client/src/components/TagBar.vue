<template>
   <div>
      <div class="flex justify-center mb-4 flex-wrap">
         <div class="relative w-8/12 px-3 flex items-center border border-gray-600 text-gray-600 text-xl rounded-full font-semibold">
            <input type="text" placeholder="insert new tag you want to watch here..." v-model="newWatchedTag" class="mr-4"/>
            <div class="absolute flex right-0" @click="addWatchedTags">
               <i class="fas fa-plus-circle cursor-pointer hover:text-blue-600 text-3xl"></i>
            </div>
         </div>
      </div>
      <div class="flex flex-wrap">
         <div class="flex items-center bg-blue-200 px-2 py-1 mx-3 rounded-lg text-gray-800 hover:bg-green-300 cursor-pointer" v-for="tag in watchedTags" :key="tag">
            <span class="px-2" @click="toHomeByTag(tag)">{{tag}}</span>
            <span class="py-1 px-2 rounded-full hover:bg-red-300" @click="removeTagFromWatchedTags(tag)">x</span>
         </div>
      </div>
   </div>
</template>

<script>
import axios from '../../apis/server'

export default {
   name: 'TagBar',

   props: {
      watchedTags: {
         type: Array
      }
   },

   data() {
      return {
         newWatchedTag: ''
      }
   },

   methods: {
      async addWatchedTags() {
         try {
            const {data} = await axios.patch('/user/add_watched_tag',
               {
                  tag: this.newWatchedTag
               },
               {
                  headers: {
                     token: localStorage.token
                  }
               }
            )

            this.$emit('refetchWatchedTag')
         }
         catch (error) {
            Swal.fire({
               text: error.response.data.message
            })
         }
      },

      toHomeByTag(tag) {
         this.$router.push({name: 'homeByTag', params: {tag}})
      },

      async removeTagFromWatchedTags(tag) {
         try {
            const {data} = await axios.patch('/user/remove_watched_tag',
               {tag},
               {
                  headers: {
                     token: localStorage.token
                  }
               }
            )

            this.$emit('refetchWatchedTag')
         }
         catch (error) {
            Swal.fire({
               text: error.response.data.message
            })
         }
      }
   }
}
</script>

<style>

</style>