<template>
  <v-content>
    <FormNya
     :sign="statusForm"
      style="margin-top: 15vh"/>
  </v-content>
</template>

<script>
import FormNya from './FormNya';
export default {
  name: "LoginPage",
  components:{
    FormNya
  },
  data(){
    return{
      statusForm: 'Login'
    }
  }
};
</script>

<style>
</style>