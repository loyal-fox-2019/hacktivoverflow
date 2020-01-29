<template>
  <div class="home">
    <button class="btn btn-primary" id="ask-qn" v-if="this.$store.state.isLogin">Ask a question!</button>
    <button class="btn btn-primary" id="ask-qn" v-if="!this.$store.state.isLogin">Login to ask a question!</button>
    <h1>Questions</h1>
    <questionSummary v-for="qn in this.$store.state.allQuestions" :key="qn._id" :question="qn"></questionSummary>
  </div>
</template>

<script>
import questionSummary from "../components/questionSummary.vue";
export default {
  name: 'home',
  components: {
    questionSummary
  },
  created() {
    this.$store.dispatch('getAllQuestions')
  }
}
</script>

<style scoped>
.home {
  text-align: left !important;
  padding: 15px;
  margin-left: 20%;
}
#ask-qn {
  float: right;
}
</style>