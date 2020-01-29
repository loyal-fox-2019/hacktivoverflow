<template>
  <div class="home">
    <router-link to="/newquestion">
      <button class="btn btn-primary" id="ask-qn" v-if="this.$store.state.isLogin">Ask a question!</button>
    </router-link>
    <router-link to="/myquestions">
      <button class="btn btn-primary" id="ask-qn" v-if="this.$store.state.isLogin">My questions</button>
    </router-link>

    <router-link to="/login">
      <button class="btn btn-primary" id="ask-qn" v-if="!this.$store.state.isLogin">Login to ask a question!</button>
    </router-link>
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
button {
  margin: 5px
}
</style>