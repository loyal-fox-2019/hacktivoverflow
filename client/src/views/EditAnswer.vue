<template>
  <div class="vld-parent">
    <Loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    ></Loading>
    <div class="w-screen mt-2">
      <div class="w-6/12 mx-auto">
        <div class="my-10">
          <h1 class="text-4xl text-gray-800 tracking-wide">
            Edit an answer
          </h1>
        </div>
        <form
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-300"
          @submit.prevent="editAnswer"
        >
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="body"
            >
              Your answer
            </label>
            <vue-editor v-model="answer" />
          </div>
          <div>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Edit your answer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/config/api'
import { VueEditor } from 'vue2-editor'
import Loading from 'vue-loading-overlay'

export default {
  name: 'edit-answer',
  components: { Loading, VueEditor },
  data() {
    return {
      answer: '',
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
    token() {
      return this.$store.state.token
    },
  },
  methods: {
    editAnswer() {
      this.$store.commit('UPDATE_IS_LOADING', true)

      api
        .patch(
          '/answers',
          {
            description: this.answer,
            questionId: this.$route.params.questionId,
            answerId: this.$route.params.answerId,
          },
          {
            headers: { token: this.token },
          },
        )
        .then(({ data }) => {
          this.$toast.open({
            message: 'Answer updated',
            type: 'success',
            position: 'top-right',
            duration: 1500,
          })

          const vm = this
          this.$store.dispatch('fetchQuestion', {
            method: 'get',
            url: `/questions/${this.$route.params.questionId}`,
            success: 'UPDATE_QUESTION',
            successUrl: `/question/${this.$route.params.questionId}`,
            router: vm.$router,
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
  },
  created() {
    this.$store.commit('UPDATE_IS_LOADING', true)

    api
      .request({
        method: 'get',
        url: `/answers/${this.$route.params.questionId}/${this.$route.params.answerId}`,
        headers: {
          token: this.token,
        },
      })
      .then(({ data }) => {
        this.$store.commit('UPDATE_IS_LOADING', false)
        this.answer = data.description
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
}
</script>

<style></style>
