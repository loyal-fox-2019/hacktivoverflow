<template>
  <div>
    <div :style=" watched ? 'border: 2px solid yellow;' : 'border: none;'" class="flex mb-8 border p-6 rounded-lg border-gray-400 bg-gray-200 shadow-lg">
      <div class="w-16 h-20 mt-1 mr-2 border border-gray-400 rounded-lg pt-4">
        <p>{{ question.upvotes.length - question.downvotes.length }}</p>
        <p class="text-xs">votes</p>
      </div>
      <div class="w-16 h-20 mt-1 border border-gray-400 rounded-lg pt-4">
        <p>{{ question.answers }}</p>
        <p class="text-xs">answers</p>
      </div>
      <div class="flex-grow">
        <router-link :to="{ name: 'question', params: {id: question._id } }">
          <h3 class="text-lg mb-2">{{ question.title }}</h3>
        </router-link>
        <h4 class="text-xs bg-gray-800 px-2 rounded-lg inline-flex ml-2 text-yellow-400"
        v-for="(tag, i) in question.tags"
        :key="i">
          {{ tag }}
        </h4>
      </div>
      <div class="text-yellow-500 flex-shrink-0 my-auto">
        <p class="text-sm italic">Posted by</p>
        <p class="text-lg">{{ question.poster.name }}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "QuestionCard",
  props: {
    question: Object
  },
  computed: {
    watchedTags() {
      return this.$store.state.watchedTags
    },
    watched() {
      let duplicate = 0
      this.question.tags.forEach(tag => {
        this.watchedTags.forEach(el => {
          if (el === tag) {
            duplicate++
          }
        })
      })
      return duplicate
    },
    created() {
      this.$store.dispatch('fetchWatchedTags')
    },
  }
}
</script>

<style>

</style>