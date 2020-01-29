<template>
  <div class="vld-parent bg-grey-100">
    <Loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    ></Loading>
    <div class="w-screen mt-2">
      <div class="w-8/12 flex mx-auto">
        <div class="w-8/12">
          <QuestionCard />
        </div>
        <div class="w-1/12"></div>
        <div class="w-3/12 border border-grey-300">
          <h1>Watched tags</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionCard from '@/components/QuestionCard.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'questions',
  components: { Loading, QuestionCard },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
    questions() {
      return this.$store.state.questions
    },
  },
  created() {
    this.$store.dispatch('fetchAllQuestions', {
      url: '/questions',
      method: 'get',
      success: 'UPDATE_QUESTIONS',
    })
  },
}
</script>

<style></style>
