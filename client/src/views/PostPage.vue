<template>
  <div>
    <h4>Post New Question</h4>
    <QuestionForm />
  </div>
</template>

<script>
import QuestionForm from '../components/QuestionForm.vue'
export default {

  name: 'PostPage',
  components:{
    QuestionForm
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>