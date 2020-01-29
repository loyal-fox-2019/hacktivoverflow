<template>
  <v-container class="fill-height" fluid>
    <question-item/>
    <question-item/>
    <question-item/>
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
