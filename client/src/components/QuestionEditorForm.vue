<template>
  <div class="bg-white p-8 w-4/5 mx-auto w-full border border-gray-300 rounded-lg shadow mt-2">
    <form 
      @submit.prevent="submitQuestion" 
      class="text-lg">
      <div
        class="overflow-auto z-0">
        <wysiwyg 
          v-model="description"
          class="h-full my-1 w-full rounded-sm shadow-md overflow-auto"/>
      </div>
      <div class="mb-4">
        <h4 class="text-gray-700">Add Tags:</h4>
        <span
          class="text-sm text-gray-600">
          (Tags are separated by comma and all whitespace between will be omitted)
        </span>
        <input
          v-model="tags"
          class="shadow-md border rounded-sm border-gray-200 w-full p-2"
          placeholder="Eg. python, go, java">
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
  name: 'QuestionEditorForm',
  props: ['question'],
  data () {
    return {
      description: this.question.description,
      tags: this.question.tags
    }
  },
  methods: {
    submitQuestion() {
      const payload = {
        description: this.description,
        tags: ' ' + this.tags,
        questionId: this.$route.params.questionId
      }
      this.$store.dispatch('editQuestion', payload)
    }
  },
  created () {

  }
}
</script>

<style>

</style>