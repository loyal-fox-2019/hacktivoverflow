import Vue from 'vue'
import Vuex from 'vuex'
import server from '@/helpers/server'
import Swal from 'sweetalert2'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    currentQuestion: [],
    user: {},
    isLogin: false
  },
  mutations: {
    SET_QUESTIONS (state, payload) {
      console.log(payload, 'mutation')
      state.questions = payload
    },
    SET_CURRENT_QUESTION (state, payload) {
      state.currentQuestion = payload
    },
    CHECK_LOGIN (state) {
      if (localStorage.getItem('token')) {
        state.isLogin = true
      } else {
        state.isLogin = false
      }
      router.push('/')
    }
  },
  actions: {
    async fetchQuestions (context, payload) {
      try {
        let questions = await server({
          url: '/questions',
          method: 'GET',
          headers: {
            token: localStorage.getItem('token')
          }
        })
        context.commit('SET_QUESTIONS', questions.data)
      } catch (error) {
        console.log(error)
      }
    },
    async register (context, payload) {
      try {
        let result = await server({
          url: '/register',
          method: 'POST',
          data: payload
        })
        localStorage.setItem('token', result.data.token)
        localStorage.setItem('name', result.data.name)
        context.commit('CHECK_LOGIN')
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Something wrong...',
          text: error.response.data.errors
        })
      }
    },
    async login (context, payload) {
      try {
        let result = await server({
          url: '/login',
          method: 'POST',
          data: payload
        })
        localStorage.setItem('token', result.data.token)
        localStorage.setItem('name', result.data.name)
        context.commit('CHECK_LOGIN')
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Something wrong...',
          text: error.response.data.errors
        })
      }
    },
    async fetchQuestion (context, payload) {
      try {
        let result = await server({
          url: `/questions/${payload}`,
          method: 'GET',
          headers: {
            token: localStorage.getItem('token')
          }
        })
        context.commit('SET_CURRENT_QUESTION', result.data)
        router.push(`/question/${result.data._id}`)
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Something wrong...',
          text: error.response.data.errors
        })
      }
    },
    async addVote (context, payload) {
      try {
        let url = ''
        if (payload.modeURL === 'question') {
          url = `/questions/${payload.id}/vote`
        } else {
          url = `/asnwers/${payload.id}/vote`
        }
        let result = await server({
          url: url,
          method: 'PATCH',
          data: {
            value: payload.value
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
        context.commit('SET_CURRENT_QUESTION', result.data)
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Something wrong...',
          text: error.response.data.errors
        })
      }
    }
  },
  modules: {
  }
})
