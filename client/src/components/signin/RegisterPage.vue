<template>
  <v-content>
    <FormNya :sign="statusForm"
    style="margin-top: 13vh"/>
  </v-content>
</template>

<script>
import FormNya from './FormNya';
export default {
  name: "RegisterPage",
  components:{
    FormNya
  },
  data(){
    return{
      statusForm: 'Register'
    }
  }
};
</script>

<style>
</style>