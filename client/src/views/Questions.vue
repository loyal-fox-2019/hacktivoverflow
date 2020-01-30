<template>
    <div class="flex flex-col w-11/12 mx-auto mt-6 justify-between">
      <div v-if="tag" class="text-left mb-8 border p-6 rounded-lg border-gray-400 shadow-lg">
        <h3 class="text-lg mb-0">Questions tagged [{{ tag }}]</h3><br>
        <p class="text-sm">Description here</p>
      </div>
      <QuestionCard
        v-for="question in questions"
        :key="question._id"
        :question="question"
      />
    </div>
</template>

<script>
import QuestionCard from '../components/QuestionCard'

export default {
  name: 'Questions',
  data() {
    return {
    }
  },
  computed: {
    questions() {
      return this.$store.state.questions
    },
    tag() {
      return this.$store.state.tag
    }
  },
  methods: {
    filterQuestionByTag() {
      this.$store.dispatch('filterQuestionByTag', this.$route.params.name)
    }
  },
  created() {
    if (this.$route.params.name) {
      this.filterQuestionByTag()
      this.$store.commit('SET_TAG', this.$route.params.name)
    }
  },
  components: {
    QuestionCard
  }
}
</script>

<style>

</style>