<template>
  <div class="bg-white p-8 w-4/5 mx-auto max-w-xl rounded-lg shadow mt-32">
    <form 
      @submit.prevent="submitQuestion" 
      class="mt-20 text-lg">
      <div>
        <input 
          v-model="title"
          class="shadow-md border rounded-sm border-gray-200 w-full p-2"
          placeholder="Title">
      </div>
      <div
        class="overflow-auto z-0">
        <wysiwyg 
          v-model="description"
          class="h-full my-4 w-full rounded-sm shadow-md overflow-auto"/>
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
  name: 'EditorForm',
  data () {
    return {
      title: '',
      description: '',
      tags: ''
    }
  },
  methods: {
    submitQuestion() {
      const payload = {
        title: this.title,
        description: this.description,
        tags: this.tags
      }
      this.$store.dispatch('askQuestion', payload)
    }
  }
}
</script>

<style>

</style>