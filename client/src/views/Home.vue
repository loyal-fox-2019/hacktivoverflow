<template>
  <div class="home pt-5">
    <b-container>
      <b-row align-h="between">
        <h1>{{clickedButton}}</h1>
        <router-link to="/askQuestion"><b-button variant="primary" v-if="$store.state.isLogin">Ask a Question</b-button></router-link>
      </b-row>
      <b-row align-h="end" class="my-3">
        <b-button-group>
          <b-button @click="filter('Top Questions')">Top Questions</b-button>
          <b-button @click="filter('My Questions')" v-if="$store.state.isLogin">My Questions</b-button>
          <b-button @click="filter('My Answers')" v-if="$store.state.isLogin">My Answers</b-button>
        </b-button-group>
      </b-row>
      <b-row v-if="clickedButton=='Top Questions'">
        <QuestionCard v-for="(question, i) in $store.state.allQuestions" :key="i" :forQuestionCard="question"></QuestionCard>
      </b-row>
      <b-row v-if="clickedButton=='My Questions'">
        <QuestionCard v-for="(question, i) in $store.state.myQuestions" :key="i" :forQuestionCard="question"></QuestionCard>
      </b-row>
      <b-row v-if="clickedButton=='My Answers'">
        <QuestionCard v-for="(question, i) in $store.state.myAnswers" :key="i" :forQuestionCard="question.questionId"></QuestionCard>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import QuestionCard from '../components/QuestionCard'
export default {
  name: 'home',
  data () {
    return {
      clickedButton: 'Top Questions'
    }
  },
  methods: {
    filter (clicked) {
      this.clickedButton = clicked
    }
  },
  components: {
    QuestionCard
  },
  created () {
    this.$store.commit('SET_NOEDIT')
  }
}
</script>
