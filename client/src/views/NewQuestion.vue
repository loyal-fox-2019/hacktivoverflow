<template>
  <div class="container mx-auto flex flex-col text-left w-3/5">
    <Loading 
      :active.sync="isLoading" 
      :can-cancel="false"
      :is-full-page="true">
    </Loading>
    <div class="p-2 items-center mt-20 flex flex-row justify-between">
      <h3 class="text-xl">Ask a Questions</h3>
    </div>
    <form @submit.prevent="submitQuestion"
      class="text-lg shadow p-4 w-100 border border-gray-200 text-left">
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
import { mapState } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  name: 'EditorForm',
  components: {
    Loading
  },
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
  },
  computed: {
    ...mapState(['isLoading'])
  }
}
</script>

<style>

</style>