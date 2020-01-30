<template>
  <v-layout text-center wrap>
    <router-view></router-view>
  </v-layout>
</template>

<script>
import LoginPage from '../components/signin/LoginPage.vue';
export default {
  name: 'Sign',
  components:{
    LoginPage
  }
};
</script>

<style>
</style>