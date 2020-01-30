<template>
  <div class="container home">
    <router-view></router-view>
    <listQue v-for="question in listQuestions" :key="question._id" :question="question"/>
  </div>
</template>

<script>
// @ is an alias to /src
import listQue from '@/components/listQue.vue';

export default {
  name: 'home',
  components: {
    listQue
  },
  data() {
    return {
      
    }
  },
  created() {
    if(!localStorage.token) {
        this.$store.commit('setIsLogout');
    } else {
        this.$store.commit('setIsLogin');
    }
    this.$store.dispatch('listQuestions')
  },
  computed: {
    listQuestions() {
      return this.$store.state.listQuestions;
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 100px;
}
</style>
