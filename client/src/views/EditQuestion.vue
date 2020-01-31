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
            Edit a question
          </h1>
        </div>
        <form
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-300"
          @submit.prevent="editQuestion"
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="title"
            >
              Title
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              autocomplete="off"
              v-model="title"
              required
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="body"
            >
              Body
            </label>
            <vue-editor v-model="body" />
            <b-form-tags
              class="mt-2 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Add tag separate with enter"
              v-model="tags"
            />
          </div>
          <div>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Edit your question
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
import { BFormTags } from 'bootstrap-vue'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'edit-question',
  components: { Loading, VueEditor, BFormTags },
  data() {
    return {
      title: '',
      body: '',
      tags: [],
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
    editQuestion() {
      api
        .patch(
          `/questions/${this.$route.params.questionId}`,
          {
            title: this.title,
            description: this.body,
            tags: this.tags,
          },
          {
            headers: {
              token: this.token,
            },
          },
        )
        .then(({ data }) => {
          this.$toast.open({
            message: 'Question updated',
            type: 'success',
            position: 'top-right',
            duration: 1500,
          })

          const vm = this
          this.$store.dispatch('fetchAllQuestions', {
            url: '/questions',
            method: 'get',
            success: 'UPDATE_QUESTIONS',
            successUrl: `/question/${this.$route.params.questionId}`,
            router: vm.$router,
          })
        })
        .catch(err => {
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
    api
      .get(`/questions/${this.$route.params.questionId}`)
      .then(({ data }) => {
        this.title = data.title
        this.body = data.description
        this.tags = data.tags
      })
      .catch(err => {
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
