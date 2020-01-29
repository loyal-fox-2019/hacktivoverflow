import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/config/api'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/index.css'

Vue.use(Vuex)
Vue.use(VueToast)

export default new Vuex.Store({
  state: {
    isLoading: false,
    token: '',
    questions: [],
  },
  mutations: {
    UPDATE_QUESTIONS(state, payload) {
      state.questions = payload
    },
    UPDATE_IS_LOADING(state, payload) {
      state.isLoading = payload
    },
  },
  actions: {
    proxyAction(context, payload) {
      context.commit('UPDATE_IS_LOADING', true)

      const options = {}

      options.method = payload.method
      options.url = payload.url

      if (payload.data) {
        options.data = payload.data
      }

      if (payload.useToken) {
        options.headers = { token: context.state.token }
      }

      api
        .request(options)
        .then(({ data }) => {
          context.commit('UPDATE_IS_LOADING', false)
          context.commit(payload.success, data)
          if (payload.successMessage) {
            Vue.$toast.open({
              message: payload.successMessage,
              type: 'success',
              position: 'top-right',
              duration: 1500,
            })
          }
        })
        .catch(err => {
          context.commit('UPDATE_IS_LOADING', false)
          if (err.response) {
            err.response.data.errors.forEach(error => {
              Vue.$toast.open({
                message: error.message,
                type: 'error',
                position: 'top-right',
                duration: 1500,
              })
            })
          } else {
            Vue.$toast.open({
              message: 'Error has happened, please refresh browser',
              type: 'error',
              position: 'top-right',
              duration: 50000,
            })
          }
        })
    },
    fetchAllQuestions(context, payload) {
      context.dispatch('proxyAction', payload)
    },
  },
  modules: {},
})

// {
// method, // required
// url, // required
// data, // object if any
// useToken, // boolean
// success, // string -> commit name if success
// successMessage, // string -> message if success or let it empty if didnt want message
// }
