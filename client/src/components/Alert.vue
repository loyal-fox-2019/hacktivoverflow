<template>
   <b-alert show variant="warning" id="alert">
     <ul>
       <li v-for="(error,i) in $store.state.errMessage" :key="i"
       >{{ error }}</li>
     </ul>
   </b-alert>
</template>

<script>
export default {
  name: 'alert',
  data() {
    return {
    };
  },
};
</script>

<style scoped>
ul {
  margin: 0;
}
#alert {
  margin-right: 0em;
  list-style: none;
  padding: 1em;
}
</style>
