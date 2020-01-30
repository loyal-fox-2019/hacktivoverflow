<template>
  <v-container>
    <question-item v-for="question in $store.state.questions" :key="question._id" :question="question"/>
  </v-container>
</template>

<script>
import QuestionItem from '../components/QuestionItem'
export default {
  name: 'QuestionList',
  components: {
    QuestionItem
  }
}
</script>

<style>

</style>
