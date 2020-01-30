<template>
  <article class="px-4">
    <div style="height:200vh" class="flex flex-col justify-between text-3xl">
      <div v-for="question in questions"
        :key="question._id"
        class="flex-1 flex justify-center items-start"
        >
          <router-link :to="{ name: 'question', params: {id: question._id } }"><h3>{{ question.title }}</h3></router-link>
          <p v-html="question.content.substring(0,100)"></p>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'Questions',
  computed: {
    questions() {
      return this.$store.state.questions
    }
  },
  // created() {
  //   this.$store.dispatch('fetchQuestions')
  // }
}
</script>

<style>

</style>