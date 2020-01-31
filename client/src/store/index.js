import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from '../../config/server'
import errorHandler from '../helpers/errorHandler'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    questions: [],
    isLoggedIn: false,
    error: '',
    watchedTags: [],
    userId: ''
  },
  mutations: {
    SET_IS_LOADING(state, value) {
      state.isLoading = value
    },
    PUSH_QUESTIONS(state, questions) {
      state.questions = questions
    },
    SET_IS_LOGGED_IN(state, value) {
      state.isLoggedIn = value
    },
    PUSH_WATCHED_TAGS(state, tags) {
      console.log(tags, '<<<')
      state.watchedTags = tags
    },
    SET_USERID(state, userId) {
      state.userId = userId
    }
  },
  actions: {
    register({ commit }, payload) {
      const { username, email, password } = payload
      commit('SET_IS_LOADING', true)
      axios({
        method: 'post',
        url: '/account/register',
        data: {
          username,
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('email', data.email)
          commit('PUSH_WATCHED_TAGS', data.watchedTags)
          commit('SET_IS_LOGGED_IN', true)
          router.push('/questions')
          commit('SET_IS_LOADING', false)
          Vue.toasted.success('Successfully registered', {
            duration: 3000,
            position: 'top-center'
          })
          router.push('/questions')
        })
        .catch(({ response }) => {
          let msg = errorHandler(response)
          Vue.toasted.error(msg, {
            duration: 3000,
            position: 'top-center'
          });
        })
    },

    login({ dispatch, commit }, payload) {
      commit('SET_IS_LOADING', true)
      const { email, password } = payload
      axios({
        method: 'post',
        url: '/account/login',
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('email', data.email)
          commit('SET_IS_LOGGED_IN', true)
          commit('PUSH_WATCHED_TAGS', data.watchedTags)
          router.push('/questions')
          dispatch('getProfile')
          commit('SET_IS_LOADING', false)
        })
        .catch(({ response }) => {
          commit('SET_IS_LOADING', false)
          let msg = errorHandler(response)
          Vue.toasted.error(msg, {
            duration: 3000,
            position: 'top-center'
          })
        })
    }, 

    fetchAllQuestions({ commit }) {
      commit('SET_IS_LOADING', true)
      axios({
        method: 'get',
        url: `/questions`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('PUSH_QUESTIONS', data)
          commit('SET_IS_LOADING', false)
        })
        .catch(({ response }) => {
          commit('SET_IS_LOADING', false)
          let msg = errorHandler(response)
          Vue.toasted.error(msg, {
            duration: 3000,
            position: 'top-center'
          })
        })
    },

    askQuestion ({ dispatch, commit }, payload) {
      commit('SET_IS_LOADING', true)
      const { title, description, tags } = payload
      axios({
        method: 'post',
        url: '/questions',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title,
          description,
          tags
        }
      })
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          router.push('/questions')
          dispatch('fetchAllQuestions')
          Vue.toasted.success('Submitted', {
            duration: 3000,
            position: 'top-center'
          })
        })
        .catch(({ response }) => {
          commit('SET_IS_LOADING', false)
          let msg = errorHandler(response)
          Vue.toasted.error(msg, {
            duration: 3000,
            position: 'top-center'
          })
        })
    },

    getProfile({ commit }) {
      commit('SET_IS_LOADING', true)
      axios({
        method: 'get',
        url: '/account/profile',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('SET_USERID', data._id)
          commit('SET_IS_LOADING', false)
          commit('SET_IS_LOGGED_IN', true)
          commit('PUSH_WATCHED_TAGS', data.watchedTags)
        })
        .catch(({ response }) => {
          commit('SET_IS_LOADING', false)
          let msg = errorHandler(response)
          Vue.toasted.error(msg, {
            duration: 3000,
            position: 'top-center'
          })
        })
    },

    answerQuestion({ dispatch, commit }, payload) {
      const { questionId, description } = payload
      commit('SET_IS_LOADING', true)
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: '/answers',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            questionId,
            description
          }
        })
          .then(({ data }) => {
            resolve(data)
            commit('SET_IS_LOADING', false)
            Vue.toasted.success('Submitted', {
              duration: 3000,
              position: 'top-center'
            })
            dispatch('fetchAllQuestions')
          })
          .catch(({ response }) => {
            reject(response)
            commit('SET_IS_LOADING', false)
            let msg = errorHandler(response)
            Vue.toasted.error(msg, {
              duration: 3000,
              position: 'top-center'
            })
          })
      })
      
    },

    voteQ ({ commit, dispatch }, payload) {
      const { questionId, value } = payload
      return new Promise((resolve, reject) => {
        axios({
          method: 'patch',
          url: `/questions/${questionId}/vote`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            vote: value
          }
        })
        .then(({ data }) => {
          resolve(data)
          commit('SET_IS_LOADING', false)
          Vue.toasted.success('Submitted', {
            duration: 3000,
            position: 'top-center'
          })
        })
        .catch(({ response }) => {
          reject(response)
          commit('SET_IS_LOADING', false)
          let msg = errorHandler(response)
          Vue.toasted.error(msg, {
            duration: 3000,
            position: 'top-center'
          })
        })
      })
    },

    voteA ({ commit, dispatch }, payload) {
      const { answerId, value } = payload
      return new Promise((resolve, reject) => {
        axios({
          method: 'patch',
          url: `/answers/${answerId}/vote`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            vote: value
          }
        })
        .then(({ data }) => {
          resolve(data)
          commit('SET_IS_LOADING', false)
          Vue.toasted.success('Submitted', {
            duration: 3000,
            position: 'top-center'
          })
        })
        .catch(({ response}) => {
          reject(response)
          commit('SET_IS_LOADING', false)
          let msg = errorHandler(response)
          Vue.toasted.error(msg, {
            duration: 3000,
            position: 'top-center'
          })
        })
      })
    },

    addTags({ dispatch, commit }, payload) {
      commit('SET_IS_LOADING', true)
      const { tags } = payload
      axios({
        method: 'patch',
        url: '/account/watchedTags',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          tags
        }
      })
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          dispatch('getProfile')
        })
        .catch(({ response}) => {
          commit('SET_IS_LOADING', false)
          let msg = errorHandler(response)
          Vue.toasted.error(msg, {
            duration: 3000,
            position: 'top-center'
          })
        })
    },

    removeTag({ dispatch, commit }, tag) {
      commit('SET_IS_LOADING', true)
      axios({
        method: 'delete',
        url: '/account/watchedTags',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          tag
        }
      })
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          dispatch('getProfile')
        })
        .catch(({ response}) => {
          commit('SET_IS_LOADING', false)
          let msg = errorHandler(response)
          Vue.toasted.error(msg, {
            duration: 3000,
            position: 'top-center'
          })
        })
        
    },

    editQuestion({ dispatch, commit }, payload) {
      commit('SET_IS_LOADING', true)
      const { description, tags, questionId } = payload
      axios({
        method: 'patch',
        url: `/questions/${questionId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          description,
          tags
        }
      })
        .then(({ data }) => {
          commit('SET_IS_LOADING', false)
          router.push('/questions')
          dispatch('fetchAllQuestions')
          Vue.toasted.success('Submitted', {
            duration: 3000,
            position: 'top-center'
          })
        })
        .catch(({ response }) => {
          commit('SET_IS_LOADING', false)
          let msg = errorHandler(response)
          Vue.toasted.error(msg, {
            duration: 3000,
            position: 'top-center'
          })
        })
    },

    editAnswer({ dispatch, commit }, payload) {
      commit('SET_IS_LOADING', true)
      const { answerId, questionId, description } = payload
      return new Promise((resolve, reject) => {
        axios({
          method: 'patch',
          url: `/answers/${answerId}/`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            description,
            questionId
          }
        })
        .then(({ data }) => {
          resolve(data)
          commit('SET_IS_LOADING', false)
          Vue.toasted.success('Submitted', {
            duration: 3000,
            position: 'top-center'
          })
        })
        .catch(({ response}) => {
          reject(response)
          commit('SET_IS_LOADING', false)
          let msg = errorHandler(response)
          Vue.toasted.error(msg, {
            duration: 3000,
            position: 'top-center'
          })
        })
      })
    },

    destroyAnswer({ dispatch, commit }, answerId) {
      commit('SET_IS_LOADING', true)
      return new Promise((resolve, reject) => {
        axios({
          method: 'delete',
          url: `/answers/${answerId}/`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
        })
        .then(({ data }) => {
          resolve(data)
          commit('SET_IS_LOADING', false)
          Vue.toasted.success('Deleted', {
            duration: 3000,
            position: 'top-center'
          })
        })
        .catch(({ response}) => {
          reject(response)
          commit('SET_IS_LOADING', false)
          let msg = errorHandler(response)
          Vue.toasted.error(msg, {
            duration: 3000,
            position: 'top-center'
          })
        })
      })
    },
    destroyQuestion({ dispatch, commit }, questionId) {
      commit('SET_IS_LOADING', true)
      return new Promise((resolve, reject) => {
        axios({
          method: 'delete',
          url: `/questions/${questionId}/`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
        })
        .then(({ data }) => {
          resolve(data)
          commit('SET_IS_LOADING', false)
          Vue.toasted.success('Deleted', {
            duration: 3000,
            position: 'top-center'
          })
        })
        .catch(({ response}) => {
          reject(response)
          commit('SET_IS_LOADING', false)
          let msg = errorHandler(response)
          Vue.toasted.error(msg, {
            duration: 3000,
            position: 'top-center'
          })
        })
      })
    }
  },
  modules: {
  }
})
