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
          <QuestionCard v-for="qs in questions" :key="qs._id" :question="qs" />
        </div>
        <div class="w-4/12" v-if="token">
          <div class="w-full flex justify-center">
            <h1 class="text-lg text-gray-800">Watched Tags</h1>
          </div>
          <div class="input-form">
            <form @submit.prevent="addNewTag">
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="inline-full-name"
                  >
                    New tag
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
                    id="inline-full-name"
                    type="text"
                    placeholder="Add new tag then press enter..."
                    autocomplete="off"
                    v-model="newTag"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="border border-gray-200 flex px-2 py-5">
            <p
              v-for="(tag, i) in tags"
              :key="i"
              class="text-xs bg-gray-500 mr-1 px-2 py-1 rounded-full"
            >
              {{ tag }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionCard from '@/components/QuestionCard.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import api from '@/config/api'

export default {
  name: 'questions',
  components: { Loading, QuestionCard },
  data() {
    return {
      newTag: '',
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
    questions() {
      return this.$store.state.questions
    },
    tags() {
      return this.$store.state.tags
    },
    token() {
      return this.$store.state.token
    },
  },
  created() {
    this.$store.dispatch('fetchAllQuestions', {
      url: '/questions',
      method: 'get',
      success: 'UPDATE_QUESTIONS',
    })
  },
  methods: {
    addNewTag() {
      api
        .post('/tags', { tag: this.newTag }, { headers: { token: this.token } })
        .then(({ data }) => {
          this.$store.dispatch('refreshUserData')
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
          this.newTag = ''
        })
    },
  },
}
</script>

<style></style>
