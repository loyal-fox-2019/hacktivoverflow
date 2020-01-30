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
    tag: ''
  },
  mutations: {
    SEND_ERROR(state, payload) {
      state.error = payload
    },
    SEND_SUCCESS(state, payload) {
      state.success = payload
    },
    FETCH_QUESTIONS(state, payload) {
      state.questions = payload
    },
    FETCH_QUESTION(state, payload) {
      state.question = payload
    }
  },
  actions: {
    fetchQuestions(context, payload) {
      if (payload) {
        axios({
          method: 'GET',
          url: `questions/filter/${payload}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            console.log(data)
            context.commit('FETCH_QUESTIONS', data)
            router.push('/')
          })
          .catch(err => {
            context.commit('SEND_ERROR', err.response.data.error)
          })
      } else {
        axios({
          method: 'GET',
          url: `questions`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
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
        .then(({ data }) => {
          console.log(data)
          context.commit('FETCH_QUESTIONS')
          context.commmit('SEND_SUCCESS', 'Question deleted!')
          router.push('/').catch(() => {})
        })
        .catch(err => {
          context.commit('SEND_ERROR', err.response.data.error)
        })
    }
  },
  modules: {
  }
})
