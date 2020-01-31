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
            <div style="cursor: pointer;" @click="vote(1)">
              <span class="fas fa-caret-up text-3xl"></span>
            </div>
            <div class="text-3xl">{{ localeVotes }}</div>
            <div style="cursor: pointer;" @click="vote(-1)">
              <span class="fas fa-caret-down text-3xl"></span>
            </div>
          </div>
          <div class="w-11/12">
            <span v-html="question.description"></span>
          </div>
        </div>
        <div
          class="mt-5 flex"
          :class="{
            'justify-between': question.owner._id === userId,
            'justify-end': question.owner._id !== userId,
          }"
        >
          <div v-if="question.owner._id === userId">
            <small
              class="text-sm italic text-white bg-gray-500 px-1 rounded-sm"
              style="cursor: pointer;"
              @click="editQuestion"
              >edit</small
            >
            <small
              class="text-sm italic text-white bg-red-800 px-1 rounded-sm ml-2"
              style="cursor: pointer;"
              @click="deleteQuestion"
              >delete</small
            >
          </div>
          <div
            class="border border-gray-300 py-2 px-2 flex items-start rounded-sm"
          >
            <img :src="localeAvatar" width="32" height="32" />
            <p class="ml-2">{{ question.owner.username }}</p>
          </div>
        </div>
        <div class="flex mt-2">
          <p
            class="text-xs bg-gray-500 mr-1 px-2 py-1 rounded-full"
            v-for="(tag, i) in question.tags"
            :key="i"
          >
            {{ tag }}
          </p>
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
          <div>
            <div class="text-2xl my-5">Your answer</div>
            <vue-editor v-model="answerContent" />
            <button
              class="my-2 px-4 py-2 bg-blue-400 text-white rounded-sm hover:bg-blue-500"
              @click="postAnswer"
            >
              Post your answer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { VueEditor } from 'vue2-editor'
import Loading from 'vue-loading-overlay'
import AnswerCard from '@/components/AnswerCard.vue'
import 'vue-loading-overlay/dist/vue-loading.css'
import api from '@/config/api'

export default {
  name: 'question-detail',
  components: { Loading, AnswerCard, VueEditor },
  data() {
    return {
      answerContent: '',
    }
  },
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
    token() {
      return this.$store.state.token
    },
    userId() {
      return this.$store.state._id
    },
  },
  methods: {
    postAnswer() {
      this.$store.commit('UPDATE_IS_LOADING', true)

      api
        .post(
          '/answers',
          {
            description: this.answerContent,
            questionId: this.$route.params.questionId,
          },
          {
            headers: {
              token: this.token,
            },
          },
        )
        .then(({ data }) => {
          this.$store.dispatch('fetchQuestion', {
            method: 'get',
            url: `/questions/${this.$route.params.questionId}`,
            success: 'UPDATE_QUESTION',
            successMessage: 'Added your answer',
          })
        })
        .catch(err => {
          this.$store.commit('UPDATE_IS_LOADING', false)
          if (err.response) {
            err.response.data.errors.forEach(error => {
              this.$toast.open({
                message: error,
                type: 'error',
                position: 'top-right',
                duration: 1500,
              })
            })
          } else {
            this.$toast.open({
              message: 'Error has happened, please refresh browser',
              type: 'error',
              position: 'top-right',
              duration: 50000,
            })
          }
        })
        .finally(() => {
          this.answerContent = ''
        })
    },
    vote(val) {
      api
        .post(
          '/votes/question',
          {
            questionId: this.$route.params.questionId,
            value: val,
          },
          {
            headers: {
              token: this.token,
            },
          },
        )
        .then(({ data }) => {
          this.$store.dispatch('fetchQuestion', {
            method: 'get',
            url: `/questions/${this.$route.params.questionId}`,
            success: 'UPDATE_QUESTION',
          })
        })
        .catch(err => {
          this.$store.commit('UPDATE_IS_LOADING', false)
          if (err.response) {
            err.response.data.errors.forEach(error => {
              this.$toast.open({
                message: error,
                type: 'error',
                position: 'top-right',
                duration: 1500,
              })
            })
          } else {
            this.$toast.open({
              message: 'Error has happened, please refresh browser',
              type: 'error',
              position: 'top-right',
              duration: 50000,
            })
          }
        })
    },
    editQuestion() {
      this.$router.push(`/edit/question/${this.$route.params.questionId}`)
    },
    deleteQuestion() {
      this.$store.commit('UPDATE_IS_LOADING', true)
      api
        .delete(`/questions/${this.$route.params.questionId}`, {
          headers: {
            token: this.token,
          },
        })
        .then(({ data }) => {
          this.$toast.open({
            message: 'Success delete question',
            position: 'top-right',
            duration: 1500,
            type: 'success',
          })
          this.$store.commit('UPDATE_IS_LOADING', false)
          this.$router.push('/questions')
        })
        .catch(err => {
          this.$store.commit('UPDATE_IS_LOADING', false)
          if (err.response) {
            err.response.data.errors.forEach(error => {
              this.$toast.open({
                message: error,
                type: 'error',
                position: 'top-right',
                duration: 1500,
              })
            })
          } else {
            this.$toast.open({
              message: 'Error has happened, please refresh browser',
              type: 'error',
              position: 'top-right',
              duration: 50000,
            })
          }
        })
    },
  },
}
</script>

<style></style>
