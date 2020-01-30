<template>
   <div class="flex justify-center">
      <form @submit.prevent="register" class="mt-12 p-4 flex flex-col border border-teal-200 shadow">
         <label class="mt-4">Username</label>
         <input type="text" class="border-b border-gray-800" required v-model="username"/>
         
         <label class="mt-4">Email</label>
         <input type="email" class="border-b border-gray-800" required v-model="email"/>

         <label class="mt-4">Password</label>
         <input type="password" class="border-b border-gray-800" required v-model="password"/>

         <input type="submit" class="mt-4 rounded cursor-pointer hover:bg-green-300 py-1 font-bold text-gray-600 hover:text-gray-800" value="Register"/>
      </form>
   </div>
</template>

<script>
import {mapActions} from 'vuex'
import axios from '../../apis/server'

export default {
   name: 'Register',

   data() {
      return {
         username: '',
         email: '',
         password: ''
      }
   },

   methods: {
      ...mapActions('user', ['checkLoggedIn', 'fetchUser']),

      register() {
         axios({
            url: `/register`,
            method: 'post',
            data: {
               username: this.username,
               password: this.password,
               email: this.email
            }
         })
         .then(({data}) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.userId)
            this.checkLoggedIn(),
            this.fetchUser()
            this.$router.push('/')
         })
         .catch(error => {
            this.$swal({
               type: 'error',
               title: 'Registration failed',
               text: error.response.data.message
            })
         })
      }
   }
}
</script>

<style>

</style>