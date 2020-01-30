<template>
  <b-container class="pt-5">
      <b-row style="border-bottom: solid black 2px" align-h="between">
          <h1>{{$store.state.detailedQuestion.title}}</h1>
          <router-link to="/askQuestion"><b-button variant="primary" v-if="$store.state.isLogin">Ask a Question</b-button></router-link>
      </b-row>
      <b-row class="mt-3">
          <b-col cols="1" class="mt-5">
          <div class="d-flex flex-column">
              <div class="vote-row upDownVote" @click="upVote"><i class="fas fa-sort-up"></i></div>
              <div class="vote-row">{{totalVotes}}</div>
              <div class="vote-row upDownVote" @click="downVote"><i class="fas fa-sort-down"></i></div>
              <div v-if="$store.state.isLogin">
              <div class="mt-5" v-if="$store.state.myQuestions.filter(e => e._id === $store.state.detailedQuestion._id).length > 0"><b-button variant="warning" @click="editQ" style="font-size:1rem;"><i class="fas fa-edit"></i></b-button></div>
              <div class="mt-3" v-if="$store.state.myQuestions.filter(e => e._id === $store.state.detailedQuestion._id).length > 0"><b-button variant="danger" @click="deleteQ" style="font-size:1rem;"><i class="fas fa-trash-alt"></i></b-button></div>
              </div>
          </div>
          </b-col>
          <b-col>
            <b-row>
              <h2>{{$store.state.detailedQuestion.userId.userName}} asks:</h2>
            </b-row>
            <b-row class="question-content">
              <div v-html="$store.state.detailedQuestion.description">
              </div>
            </b-row>
          </b-col>
      </b-row>
      <b-row class="mt-5" style="border-top:solid black 1px">
        <h2>Answers :</h2>
      </b-row>
        <AnswerCard v-for="(answer, i) in answers" :key="i" :questionAnswers="answer"></AnswerCard>
        <b-row>
          <AnswerForm v-if="$store.state.isLogin" id="answerForm"></AnswerForm>
        </b-row>
  </b-container>
</template>

<script>
import AnswerCard from '../components/AnswerCard'
import AnswerForm from '../components/AnswerForm'
import Swal from 'sweetalert2'
export default {
  name: 'QuestionDetail',
  computed: {
    totalVotes () {
      return this.$store.state.detailedQuestion.upVotes.length - this.$store.state.detailedQuestion.downVotes.length
    },
    answers () {
      return this.$store.state.allAnswers.filter(element => element.questionId === this.$store.state.detailedQuestion._id).sort(function (a, b) {
        return (b.upVotes.length - b.downVotes.length) - (a.upVotes.length - a.downVotes.length)
      })
    }
  },
  components: {
    AnswerCard,
    AnswerForm
  },
  methods: {
    upVote () {
      this.$store.dispatch('upVote', this.$route.params.questionId)
    },
    downVote () {
      this.$store.dispatch('downVote', this.$route.params.questionId)
    },
    deleteQ () {
      // alert('test')
      Swal.fire({
        title: 'Are you sure you want to delete this Question?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I want delete it!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteQuestion', this.$route.params.questionId)
        }
      })
    },
    editQ () {
      this.$store.commit('SET_EDIT')
      this.$router.push('/askQuestion')
    }
  },
  created () {
    this.$store.commit('SET_NOEDIT')
  }
}
</script>

<style scoped>
.vote-row {
    font-size: 3rem;
    text-align: center;
    height: 5vh;
}
.question-content {
  width: 100%;
  min-height: 50vh;
  background: #fbd88d8a;
  border-radius: 15px;
  padding: 2%;
  font-size: 1.4rem;
}
.upDownVote:hover {
  color: #cecdcd;
  cursor: pointer;
}
</style>
