<template>
  <div class="bg-white p-4 mx-auto w-full rounded-lg shadow-md border border-gray-300 mt-2">
    <form 
      @submit.prevent="submitAnswer" 
      class="mt-2 text-lg">
      <div
        class="overflow-auto z-0">
        <wysiwyg 
          v-model="description"
          class="h-full my-4 w-full rounded-sm shadow-md overflow-auto"/>
      </div>
      <button
        class="bg-blue-400 px-2 py-1 rounded-sm shadow-md text-white hover:bg-blue-700"
        type="submit">
        Submit 
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AnswerForm',
  data () {
    return {
      description: ''
    }
  },
  methods: {
    submitAnswer() {
      const payload = {
        questionId: this.$route.params.questionId,
        description: this.description
      }
      this.description = ''
      this.$store.dispatch('answerQuestion', payload)
        .then(() => {
          this.$emit('fetchData')
        })
    }
  }
}
</script>

<style>

</style>