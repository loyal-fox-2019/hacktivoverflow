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
    username: '',
    email: '',
    avatar: '',
    questions: [],
    question: {
      _id: '',
      owner: {
        username: '',
        avatar: '',
      },
      title: '',
      description: '',
      createdAt: '',
      votes: [],
      answers: [],
    },
  },
  mutations: {
    UPDATE_QUESTIONS(state, payload) {
      state.questions = payload
    },
    UPDATE_IS_LOADING(state, payload) {
      state.isLoading = payload
    },
    UPDATE_QUESTION(state, payload) {
      state.question = payload
    },
    UPDATE_USER_DATA(state, payload) {
      state.token = payload.token
      state.username = payload.username
      state.email = payload.email
      state.avatar = payload.avatar

      localStorage.setItem('token', payload.token)
      localStorage.setItem('username', payload.username)
      localStorage.setItem('email', payload.email)
      localStorage.setItem('avatar', payload.avatar)
    },
    RESET_USER_DATA(state) {
      state.token = ''
      state.username = ''
      state.email = ''
      state.avatar = ''

      localStorage.clear()
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

          if (payload.successUrl) {
            payload.router.push(payload.successUrl)
          }
        })
        .catch(err => {
          context.commit('UPDATE_IS_LOADING', false)
          if (err.response) {
            err.response.data.errors.forEach(error => {
              Vue.$toast.open({
                message: error,
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
    fetchQuestion(context, payload) {
      context.dispatch('proxyAction', payload)
    },
    login(context, payload) {
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
// successUrl, // string -> go to url if success or let it empty if didnt want redirect
// router, // object -> requried if successUrl has value
// }
