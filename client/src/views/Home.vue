<template>
  <div class="home">
    <router-link to="/newquestion">
      <button class="btn btn-primary ask-qn" v-if="this.$store.state.isLogin">Ask a question!</button>
    </router-link>
    
    <button class="btn btn-primary ask-qn" v-if="this.$store.state.isLogin && showAll" @click="toggleShowQn">My questions</button>
    <button class="btn btn-primary ask-qn" v-if="this.$store.state.isLogin && !showAll" @click="toggleShowQn">All questions</button>

    <router-link to="/login">
      <button class="btn btn-primary ask-qn" v-if="!this.$store.state.isLogin">Login to ask a question!</button>
    </router-link>
    <h1>Questions</h1>
    <questionSummary v-for="qn in questionsArr" :key="qn._id" :question="qn"></questionSummary>
  </div>
</template>

<script>
import questionSummary from "../components/questionSummary.vue";
export default {
  name: 'home',
  components: {
    questionSummary
  },
  data() {
    return {
      questionsArr: this.$store.state.allQuestions,
      showAll: true
    }
  },
  created() {
    this.$store.dispatch('getAllQuestions')
    this.questionsArr = this.$store.state.allQuestions
    this.$store.dispatch('getMyQuestions')
  },
  methods: {
    toggleShowQn() {
      this.showAll = !this.showAll;
      if(this.showAll) {
        this.$store.dispatch('getAllQuestions')
        this.questionsArr = this.$store.state.allQuestions
      }
      else {
        this.$store.dispatch('getMyQuestions',this.$cookies.get('token'))
        this.questionsArr = this.$store.state.myQuestions
      }
    }
  }
}
</script>

<style scoped>
.home {
  text-align: left !important;
  padding: 15px;
  margin-left: 20%;
}
.ask-qn {
  float: right;
}
button {
  margin: 5px
}
</style>