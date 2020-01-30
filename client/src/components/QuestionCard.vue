<template>
  <div>
    <b-card class='m-3' border-variant='info' :bg-variant='isWatched'>
      <div class='mb-3' style='text-align: left;'>
        <b-button v-if='page == "detail"' variant='success' @click='upvote(question._id)'>
          Upvote
        </b-button>
        <span class="mx-3">{{question.upvotes.length - question.downvotes.length}} vote</span>
        <b-button v-if='page == "detail"' variant='danger' @click='downvote(question._id)'>
          Downvote
        </b-button>
      </div>
      <div>
        <b-card-text style='text-align: left;' @click='moveTo(`/detail/${question._id}`)'>
          {{question.title}}
        </b-card-text>
        <b-card-text v-if='page == "detail"' v-html='question.description' style='text-align: left;'></b-card-text>
        <b-card-text>
          <b-button pill disabled class='m-2' v-for='tag in question.tags' :key='tag'>
            {{tag}}
          </b-button>
        </b-card-text>
        <b-card-text v-if='page != "detail"'>
          <b-button @click='moveTo(`/detail/${question._id}`)' variant='success'>
            Answers
          </b-button>
          <b-button v-if='username == question.UserId.username' class='mx-5' @click='moveTo(`/edit/${question._id}`)'>
            Edit
          </b-button>
          <b-button v-if='username == question.UserId.username' @click='remove(question._id)' variant='danger'>
            Delete
          </b-button>
        </b-card-text>
        <b-card-text>
          Asked by {{question.UserId.username}} at
          {{question.createdAt.split('T')[0]}} - {{question.createdAt.split('T')[1]}}
        </b-card-text>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {

  name: 'QuestionCard',

  data () {
    return {
    }
  },
  computed: {
    isWatched(){
      if (this.question.tags.some((el) => this.$store.state.watchedTags.includes(el))){
        return 'warning'
      }
      else {
        return ''
      }
    },
    username(){
      return this.$store.state.username
    }
  },
  methods: {
    moveTo(route){
      this.$router.push(route)
    },
    remove(questionId){
      this.$store.dispatch('DELETE_QUESTION', questionId)
    },
    upvote(questionId){
      let voteObj = {
        questionId,
        type: 'up'
      }
      this.$store.dispatch('VOTE_QUESTION', voteObj)
    },
    downvote(questionId){
      let voteObj = {
        questionId,
        type: 'down'
      }
      this.$store.dispatch('VOTE_QUESTION', voteObj)
    }
  },
  props: ['question', 'page']
}
</script>

<style lang="css" scoped>
.rounded-pill{
  cursor: default;
}
h5{
  cursor: pointer;
}
</style>