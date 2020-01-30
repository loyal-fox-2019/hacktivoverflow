import Vue from 'vue'
import Vuex from 'vuex'
// import router from '../router'
import axios from '../config/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    user: {},
    detail: {},
    isLoading: false
  },
  mutations: {
    SET_LOADING (state, payload) {
      state.isLoading = payload
    },
    SET_LOGIN (state) {
      state.isLogin = true
    },
    SET_LOGOUT (state) {
      state.isLogin = false
    },
    FETCH_USER (state, payload) {
      state.user = payload
    },
    CLEAR_USER (state) {
      state.user = {}
    },
    FETCH_QUESTIONS (state, payload) {
      state.questions = payload
    },
    FETCH_DETAIL (state, payload) {
      state.detail = payload
    }
  },
  actions: {
    addView (context, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'patch',
          url: `/questions/${payload}/view`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            context.dispatch('fetchQuestions')
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    checkLogin (context) {
      if (localStorage.getItem('token') && localStorage.getItem('username')) {
        context.dispatch('fetchUser')
        context.commit('SET_LOGIN')
      }
    },
    fetchQuestions (context) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'GET',
          url: `/questions`
        })
          .then(({ data }) => {
            context.commit('FETCH_QUESTIONS', data)
            context.commit('SET_LOADING', false)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchDetail (context, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'GET',
          url: `/questions/${payload}`
        })
          .then(({ data }) => {
            context.commit('FETCH_DETAIL', data)
            context.commit('SET_LOADING', false)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchUser (context) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'GET',
          url: `/users/username`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            context.commit('FETCH_USER', data)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  modules: {
  }
})
