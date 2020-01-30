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
    watchedTags: null,
    isLogin: false
  },
  mutations: {
    SET_QUESTIONS (state, payload) {
      state.questions = payload
    },
    SET_CURRENT_QUESTION (state, payload) {
      state.currentQuestion = payload
    },
    CHECK_LOGIN (state) {
      if (localStorage.getItem('token')) {
        state.isLogin = true
        state.watchedTags = localStorage.getItem('watchedTags').split(',')
      } else {
        state.isLogin = false
        state.watchedTags = null
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
        Swal.fire({
          icon: 'error',
          title: 'Something wrong...',
          text: error.response.data.errors
        })
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
        localStorage.setItem('watchedTags', result.data.watchedTags)
        context.commit('CHECK_LOGIN')
      } catch (error) {
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
        localStorage.setItem('watchedTags', result.data.watchedTags)
        context.commit('CHECK_LOGIN')
      } catch (error) {
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
          url = `/answers/${payload.id}/vote`
        }
        let some = await server({
          url: url,
          method: 'PATCH',
          data: {
            value: payload.value
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
        if (some.data.question) {
          context.dispatch('fetchQuestion', some.data.question)
        } else {
          context.dispatch('fetchQuestion', payload.id)
        }
        // context.commit('SET_CURRENT_QUESTION', result.data)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Something wrong...',
          text: error.response.data.errors
        })
      }
    },
    async addQuestion (context, payload) {
      try {
        await server({
          url: '/questions',
          method: 'POST',
          data: payload,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        context.dispatch('fetchQuestions')
        router.push('/')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Something wrong...',
          text: error.response.data.errors
        })
      }
    },
    async replyThread (context, payload) {
      try {
        await server({
          url: `/answers/${payload.id}`,
          method: 'POST',
          data: {
            content: payload.data.content
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
        context.dispatch('fetchQuestion', payload.id)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Something wrong...',
          text: error.response.data.errors
        })
      }
    },
    async updateTags (context, payload) {
      try {
        let tags = await server({
          url: '/tags',
          method: 'POST',
          data: {
            tags: payload
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
        localStorage.setItem('watchedTags', tags.data.watchedTags)
        context.commit('CHECK_LOGIN')
        context.dispatch('fetchQuestions')
        router.push('/')
      } catch (error) {
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
