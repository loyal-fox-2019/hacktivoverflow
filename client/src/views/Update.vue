<template>
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
        <button @click="updateQuest" class="trans bg bg-blue-500 cursor-pointer w-20 mx-1 rounded border-t-2 border-blue-300 px-2 py-2 text-white text-sm hover:bg-blue-600">Save</button>
        <button @click="cancel" class="trans bg bg-red-500 cursor-pointer w-20 mx-1 rounded border-t-2 border-red-300 px-2 py-2 text-white text-sm hover:bg-red-600">Cancel</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            name: 'Loading',
            description: 'Loading',
            tags: 'Loading',
            questionId: 'Loading'
        }
    },
    created() {
        this.name = this.$store.state.question.updateData.name
        this.description = this.$store.state.question.updateData.description
        this.tags = this.$store.state.question.updateData.tags
        this.questionId = this.$store.state.question.updateData.questionId
    },
    methods: {
        ...mapActions('question',['updateQuestion']),
        updateQuest() {
            this.updateQuestion({
                questionId: this.questionId,
                name: this.name,
                description: this.description,
                tags: this.tags
            })
        },
        cancel() {
            this.$router.push({path:'/user-question'})
        }
    }
}
</script>

<style>

</style>