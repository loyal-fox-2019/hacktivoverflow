<template>
   <div>
      <login v-if="authPage == 'login'" />
      <register v-if="authPage == 'register'" />
   </div>
</template>

<script>
import register from '../components/Register'
import login from '../components/Login'


export default {
   name: 'Authscreen',

   components: {
      login,
      register
   },

   data() {
      return {
         authPage: this.$route.name
      }
   },

   methods: {
      setScreen() {
         if(this.$route.name == 'login') {
            this.authPage = 'login'
         }
         else {
            this.authPage = 'register'
         }
      }
   },

   watch: {
      // $route: function(to, from) {
      //    this.setScreen()
      // }
   }
}
</script>

<style>

</style>