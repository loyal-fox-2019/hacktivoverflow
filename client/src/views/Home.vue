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
    <div v-if="loading" style="width:50vw">Loading...</div>
    <div v-if="!loading">
      <questionSummary v-for="qn in questionsArr" :key="qn._id" :question="qn"></questionSummary>
    </div>
    
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
      showAll: true,
      loading: false
    }
  },
  created() {
    this.$store.dispatch('getAllQuestions')
    this.$store.dispatch('getMyQuestions')
    this.loading = true;
    setTimeout(() => {
      this.questionsArr = this.$store.state.allQuestions
      this.loading = false;
    },2000)
    
  },
  methods: {
    toggleShowQn() {
      this.$store.dispatch('getAllQuestions')
      this.$store.dispatch('getMyQuestions',this.$cookies.get('token'))
      this.showAll = !this.showAll;
      this.loading = true;
      setTimeout(() => {
        if(this.showAll) {        
          this.questionsArr = this.$store.state.allQuestions
        }
        else {
          this.questionsArr = this.$store.state.myQuestions
        }
        this.loading = false;
      },2000)
      
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