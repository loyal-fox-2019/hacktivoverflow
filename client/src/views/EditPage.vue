<template>
  <div>
    <h4>Edit Question</h4>
    <router-view :question='question'/>
  </div>
</template>

<script>
export default {

  name: 'EditPage',
  data () {
    return {

    }
  },
  computed: {
    question(){
      return this.$store.state.question
    }
  },
  created(){
    let questionId = this.$route.params.id
    this.$store.dispatch('GET_ONE_QUESTION', questionId)
  }
}
</script>

<style lang="css" scoped>
</style>