<template>
  <div class="vld-parent">
    <Loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    ></Loading>
    <div class="w-screen mt-2">
      <div class="w-6/12 mx-auto">
        <div>
          <h1 class="text-4xl font-hairline tracking-wide text-gray-800">
            {{ question.title }}
          </h1>
          <small class="italic text-gray-600 ml-5">
            Asked at {{ localeTime }}
          </small>
        </div>
        <hr />
        <div class="w-full mt-4 flex">
          <div class="w-1/12">
            <div style="cursor: pointer;">
              <span class="fas fa-caret-up text-3xl"></span>
            </div>
            <div class="text-3xl">{{ localeVotes }}</div>
            <div style="cursor: pointer;">
              <span class="fas fa-caret-down text-3xl"></span>
            </div>
          </div>
          <div class="w-11/12">
            {{ question.description }}
          </div>
        </div>
        <div class="flex justify-end mt-5">
          <div
            class="border border-gray-300 py-2 px-2 flex items-start rounded-sm"
          >
            <img :src="localeAvatar" width="32" height="32" />
            <p class="ml-2">{{ question.owner.username }}</p>
          </div>
        </div>
        <div class="mt-8">
          <h3 v-if="question.answers.length <= 1">
            {{ question.answers.length }} Answer
          </h3>
          <h3 v-else>{{ question.answers.length }} Answers</h3>
          <hr class="my-2" />
          <AnswerCard
            v-for="answer in question.answers"
            :key="answer._id"
            :answer="answer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Loading from 'vue-loading-overlay'
import AnswerCard from '@/components/AnswerCard.vue'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'question-detail',
  components: { Loading, AnswerCard },
  created() {
    this.$store.dispatch('fetchQuestion', {
      method: 'get',
      url: `/questions/${this.$route.params.questionId}`,
      success: 'UPDATE_QUESTION',
    })
  },
  computed: {
    question() {
      return this.$store.state.question
    },
    isLoading() {
      return this.$store.state.isLoading
    },
    localeTime() {
      return this.question.createdAt
        ? moment(this.question.createdAt).format('D MMM YYYY H:mA')
        : new Date().toLocaleString()
    },
    localeVotes() {
      return this.question.votes.reduce((a, q) => (a += q.value), 0)
    },
    localeAvatar() {
      return this.question.owner.avatar
        ? this.question.owner.avatar
        : 'https://placekitten.com/200/200'
    },
  },
}
</script>

<style></style>
