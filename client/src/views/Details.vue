<template>
  <div>
    <v-content>
      <div class="container">
        <Toolbar :title="{ name: 'Question Detail' }" />
        <Detail />
        <div v-show="comment" class="mt-4">
          <h3>Post Answer</h3>
          <Editor />
        </div>
        <div id="answer" class="mt-4">
          <Answer
            v-for="answer in answerData"
            :key="answer._id"
            :data="answer"
          />
        </div>
      </div>
    </v-content>
  </div>
</template>

<script>
import Detail from '@/components/Detail'
import Toolbar from '@/components/Toolbar'
import Editor from '@/components/Editor'
import Answer from '@/components/AnswerCard'

export default {
  name: 'detailPage',
  components: {
    Detail,
    Toolbar,
    Editor,
    Answer
  },
  computed: {
    questionId() {
      return this.$route.params.id
    },
    comment() {
      return this.$store.state.isComment
    },
    answerData() {
      return this.$store.state.allAnswer
    }
  },
  created() {
    this.$store.dispatch('FETCH_ANSWER', this.questionId)
    this.$store.dispatch('FETCH_DETAIL', this.questionId)
  }
}
</script>

<style lang="css"></style>
