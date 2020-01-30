<template>
    <b-row class="my-3">
        <b-col cols="1" class="vote-col mt-4">
          <div class="d-flex flex-column">
              <div class="vote-row upDownVote" @click="upVote"><i class="fas fa-sort-up"></i></div>
              <div class="vote-row">{{totalVotes}}</div>
              <div class="vote-row upDownVote" @click="downVote"><i class="fas fa-sort-down"></i></div>
          </div>
          </b-col>
          <b-col>
            <b-row>
              <h3>{{questionAnswers.userId.userName}} answers: {{questionAnswers.title}}
                <sup v-if="$store.state.isLogin" ref="btnShow"><i v-if="$store.state.myAnswers.filter(e => e._id === questionAnswers._id).length > 0" @click="showModal"  style="font-size:0.8rem;cursor: pointer;" class="fas fa-pencil-alt"></i></sup>
                </h3>
            </b-row>
            <b-row class="answer-content">
                <div v-html="questionAnswers.description"></div>
            </b-row>
          </b-col>
          <b-modal size="lg" :id="questionAnswers._id" hide-footer hide-header>
            <AnswerForm :editAnswer="questionAnswers"></AnswerForm>
            <b-button variant="danger" class="mt-3" @click="hideModal">Cancel</b-button>
          </b-modal>
    </b-row>
</template>

<script>
import AnswerForm from './AnswerForm'
export default {
  name: 'AnswerCard',
  props: {
    questionAnswers: {
      type: Object
    }
  },
  components: {
    AnswerForm
  },
  computed: {
    totalVotes () {
      return this.questionAnswers.upVotes.length - this.questionAnswers.downVotes.length
    }
  },
  methods: {
    upVote () {
      // console.log(this.questionAnswers._id)
      this.$store.dispatch('AupVote', this.questionAnswers._id)
    },
    downVote () {
      this.$store.dispatch('AdownVote', this.questionAnswers._id)
    },
    showModal () {
      this.$root.$emit('bv::show::modal', this.questionAnswers._id, '#btnShow')
    },
    hideModal () {
      this.$root.$emit('bv::hide::modal', this.questionAnswers._id, '#btnShow')
    }
  }
}
</script>

<style scoped>
.vote-row {
    font-size: 3rem;
    text-align: center;
    height: 5vh;
}
.answer-content {
  width: 100%;
  border-top: solid black 1px;
  border-bottom: solid black 1px;
  background: #8dfbfb8a;
  border-radius: 15px;
  padding: 2%;
  font-size: 1.4rem;
  overflow: scroll;
  min-height: 15vh;
}
.upDownVote:hover {
  color: #cecdcd;
  cursor: pointer;
}
</style>
