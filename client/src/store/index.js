import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/config.axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    error: '',
    success: '',
    questions: [],
    question: {},
    tags: [],
    tag: '',
    errorCount: 0,
    successCount: 0,
    watchedTags: []
  },
  mutations: {
    SEND_ERROR(state, payload) {
      state.error = payload
      state.errorCount++
    },
    SEND_SUCCESS(state, payload) {
      state.success = payload
      state.successCount++
    },
    FETCH_QUESTIONS(state, payload) {
      state.questions = payload
    },
    FETCH_QUESTION(state, payload) {
      state.question = payload
    },
    FETCH_TAGS(state, payload) {
      state.tags = payload
    },
    SET_TAG(state, payload) {
      state.tag = payload
    },
    FETCH_WATCHED_TAGS(state, payload) {
      state.watchedTags = payload
    }
  },
  actions: {
    fetchQuestions(context, payload) {
      if (payload) {
        axios({
          method: 'GET',
          url: `questions/filter/title/${payload}`
        })
          .then(({ data }) => {
            context.commit('FETCH_QUESTIONS', data)
            router.push('/')
          })
          .catch(err => {
            context.commit('SEND_ERROR', err.response.data.error)
          })
      } else {
        axios({
          method: 'GET',
          url: `questions`
        })
          .then(({ data }) => {
            context.commit('FETCH_QUESTIONS', data)
          })
          .catch(err => {
            context.commit('SEND_ERROR', err.response.data.error)
          })
      }
    },
    fetchQuestion(context, payload) {
      axios({
        method: 'GET',
        url: `questions/${payload}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('FETCH_QUESTION', data)
          router.push(`/questions/${data._id}`).catch(() => {})
        })
        .catch(err => {
          context.commit('SEND_ERROR', err.response.data.error)
        })
    },
    deleteQuestion(context, payload) {
      axios({
        method: 'DELETE',
        url: `questions/${payload}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(() => {
          context.dispatch('fetchQuestions')
          context.commit('SEND_SUCCESS', 'Question deleted!')
          router.push('/').catch(() => {})
        })
        .catch(err => {
          context.commit('SEND_ERROR', err.response.data.error)
        })
    },
    deleteAnswer(context, payload) {
      axios({
        method: 'DELETE',
        url: `answers/${payload.answer}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(() => {
          context.commit('SEND_SUCCESS', 'Answer deleted!')
          router.push(`/questions/${payload.question}`).catch(() => {})
        })
        .catch(err => {
          context.commit('SEND_ERROR', err.response.data.error)
        })
    },
    fetchTags(context, payload) {
      if (payload) {
        axios({
          method: 'GET',
          url: `tags/filter/${payload}`
        })
          .then(({ data }) => {
            context.commit('FETCH_TAGS', data)
          })
          .catch(err => {
            context.commit('SEND_ERROR', err.response.data.error)
          })
      } else {
        axios({
          method: 'GET',
          url: 'tags'
        })
          .then(({ data }) => {
            context.commit('FETCH_TAGS', data)
          })
          .catch(err => {
            context.commit('SEND_ERROR', err.response.data.error)
          })
      }
    },
    filterQuestionByTag(context, payload) {
      axios({
        method: 'GET',
        url: `questions/filter/tag/${payload}`,
      })
        .then(({ data }) => {
          context.commit('FETCH_QUESTIONS', data)
          router.push(`/`).catch(() => {})
        })
        .catch(err => {
          context.commit('SEND_ERROR', err.response.data.error)
        })
    },
    fetchWatchedTags(context) {
      axios({
        method: 'GET',
        url: `users/profile`,
      })
        .then(({ data }) => {
          context.commit('FETCH_WATCHED_TAGS', data.tags)
        })
        .catch(err => {
          context.commit('SEND_ERROR', err.response.data.error)
        })
    }
  },
  modules: {
  }
})
