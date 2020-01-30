<template>
  <b-container>
      <b-row class="question-row" align-v="center">
          <b-col cols="2">
              <b-row>
                  <b-col class="vote-box mr-1">
                      <b-row align-h="center" class="my-1">
                          Votes
                      </b-row>
                      <b-row align-h="center" class="my-1">
                          {{totalVotes}}
                      </b-row>
                  </b-col>
                  <b-col class="answer-box ml-1">
                      <b-row align-h="center" class="my-1">
                          Answers
                      </b-row>
                      <b-row align-h="center" class="my-1">
                          {{totalAnswers.length}}
                      </b-row>
                  </b-col>
              </b-row>
          </b-col>
          <b-col cols="10">
              <a href='#' @click.prevent="toQuestionDetails">
                  {{forQuestionCard.title}}
              </a>
          </b-col>
      </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'QuestionCard',
  props: {
    forQuestionCard: {
      type: Object
    }
  },
  computed: {
    totalVotes () {
      return this.forQuestionCard.upVotes.length - this.forQuestionCard.downVotes.length
    },
    totalAnswers () {
      return this.$store.state.allAnswers.filter(element => element.questionId === this.forQuestionCard._id)
    }
  },
  methods: {
    toQuestionDetails () {
      // console.log(this.forQuestionCard._id)
      this.$store.dispatch('findDetail', this.forQuestionCard._id)
      this.$router.push(`/${this.forQuestionCard._id}`)
    }
  }
}
</script>

<style scoped>
.question-row {
    height: 15vh;
    border-top: black solid 1px;
    background-color: #fff8bd52;
    padding-left:1%;
}
.vote-box {
    border: 1px solid black;
    height: 10vh;
    width: 10vw;
}
.answer-box {
    border: 1px solid black;
    height: 10vh;
    width: 10vw;
}
</style>
