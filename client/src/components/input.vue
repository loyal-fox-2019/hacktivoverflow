<template>
  <div class="flex flex-col">
      <div class="flex text-xl font-semibold h-24">
          <p class="my-auto">Ask a Public Question</p>
      </div>
      <div class="flex rounded px-5 py-5 bg bg-white shadow-lg">
        <form action="" class="w-full">
            <div class="mb-5">
                <div class="">
                    <p class="font-semibold">Title</p>
                    <p class="text-xs">Be specific and imagine you’re asking a question to another person</p>
                </div>
                <input v-model="name" placeholder="e.g. Is there an R function for finding the index of an element in a vector?" type="text" id="name" class="w-full rounded shadow mt-1 border border-gray-400">
            </div>
            <div class="mb-5">
                <div class="">
                    <p class="font-semibold">Body</p>
                    <p class="text-xs">Be specific and imagine you’re asking a question to another person</p>
                </div>
                <wysiwyg v-model="description" class="mt-1" />
            </div>
            <div class="mb-3 border-b border-dotted border-gray-500 w-full"></div>
            <div class="mb-5 border-b border-dotted border-gray-500 w-full"></div>
            <div class="mb-5">
                <div class="">
                    <p class="font-semibold">Tags</p>
                    <p class="text-xs">Add up to 5 tags to describe what your question is about</p>
                </div>
                <input v-model="tags" placeholder="e.g. Tag1 Tag2 Tag3" type="text" id="name" class="w-full rounded shadow mt-1 border border-gray-400">
            </div>
            <button @click="addNewQuestion" class="trans bg bg-blue-500 cursor-pointer w-40 rounded border-t-2 border-blue-300 px-2 py-2 text-white text-sm hover:bg-blue-600">Submit Your Question</button>
        </form>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            name: '',
            description: '',
            tags: ''
        }
    },
    methods: {
        ...mapActions('question',['addQuestion']),
        addNewQuestion() {
            this.addQuestion({
                name: this.name,
                description: this.description,
                tags: this.tags
            })
            this.name=''
            this.description=''
            this.tags = ''
        }
    }
}
</script>

<style>

</style>