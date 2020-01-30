<template>
  <div>
    <b-card class='m-3' border-variant='info'>
      <div class='mb-3' style='text-align: left;'>
        <b-button variant='success' @click='upvote(answer._id, answer.QuestionId)'>
          Upvote
        </b-button>
        <span class="mx-3">{{answer.upvotes.length - answer.downvotes.length}} vote</span>
        <b-button variant='danger' @click='downvote(answer._id, answer.QuestionId)'>
          Downvote
        </b-button>
      </div>
      <div>
        <b-card-text v-html='answer.description' style='text-align: left;'></b-card-text>
        <b-card-text>
          <b-button class='mx-5' @click='showEditor'>Edit</b-button>
        </b-card-text>
        <b-card-text>
          Answered by {{answer.UserId.username}} at
          {{answer.createdAt.split('T')[0]}} - {{answer.createdAt.split('T')[1]}}
        </b-card-text>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {

  name: 'AnswerCard',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    username(){
      return this.$store.state.username
    }
  },
  methods: {
    upvote(answerId, questionId){
      let voteObj = {
        type: 'up',
        answerId,
        questionId
      }
      this.$store.dispatch('VOTE_ANSWER', voteObj)
    },
    downvote(answerId, questionId){
      let voteObj = {
        type: 'down',
        answerId,
        questionId
      }
      this.$store.dispatch('VOTE_ANSWER', voteObj)
    },
    showEditor(){
      this.$emit('showEditor', this.answer)
      
    }
  },
  props: ['answer']
}
</script>

<style lang="css" scoped>
</style>