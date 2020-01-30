<template>
  <div>
    <router-view class='col-md-8 offset-md-2' :question='question' :page='"detail"'/>
    <AnswerForm :answer='answer' @showEditor='showEditor' ref='editorElement'/>
    <AnswerCard class='col-md-8 offset-md-2' v-for='answer in answers' 
    :key='answer._id' :answer='answer' @showEditor='showEditor'/>
  </div>
</template>

<script>
import AnswerCard from '../components/AnswerCard.vue'
import AnswerForm from '../components/AnswerForm.vue'
export default {

  name: 'DetailPage',
  components: {
    AnswerCard,
    AnswerForm
  },
  data () {
    return {
      answer: {}
    }
  },
  created(){
    let questionId = this.$route.params.id
    this.$store.dispatch('GET_ONE_QUESTION', questionId)
  },
  methods: {
    moveTo(questionId){
      this.$router.push(`/answer/${questionId}`)
    },
    showEditor(answer){
      this.answer = answer
      this.$refs['editorElement'].$el.scrollIntoView()
    }
  },
  computed: {
    question(){
      return this.$store.state.question
    },
    answers(){
      return this.$store.state.answers
    }
  }
}
</script>

<style lang="css" scoped>
</style>