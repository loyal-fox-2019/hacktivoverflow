import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
Vue.use(Vuex)

const BASE_URL = `http://localhost:3000/`

export default new Vuex.Store({
  state: {
    username: '',
    userId: '',
    isLogin: false,
    questions: [],
    details: null,
    answers: [],
    checkUser: ''
  },
  mutations: {
    SET_USERNAME(state, payload) {
      state.username = payload
    },
    SET_USER(state, payload) {
      state.userId = payload
    },
    ADD_QUESTION(state, payload) {
      state.questions = payload
    },
    SET_LOGIN(state, payload) {
      state.isLogin = payload
    },
    SET_QUESTION(state, payload) {
      state.questions = payload
    },
    SET_DETAIL(state, payload) {
      state.details = payload
    },
    ADD_ANSWER(state, payload) {
      state.answers = payload
    }
  },
  actions: {
    logOut({ commit, state, dispatch }) {
      localStorage.clear()
      dispatch('checkLogin')
    },
    deleteQuestion({ commit, state, dispatch }, payload) {
      axios({
        method: 'DELETE',
        url: `${BASE_URL}question/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          dispatch('fetchQuestion')
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    fetchQuestion({ commit, state, dispatch }) {
      axios({
        method: 'GET',
        url: `${BASE_URL}question`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_QUESTION', data)
          // console.log(data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    register({ commit, state, dispatch }, payload) {
      axios({
        method: 'POST',
        url: `http://localhost:3000/user/register`,
        data: {
          username: payload.username,
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {

          localStorage.setItem('token', data.token)
          localStorage.setItem('userId', data.data._id)
          commit('SET_USERNAME', data.data.username)
          dispatch('checkLogin')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`,
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
    },
    login({ commit, state, dispatch }, payload) {
      axios({
        method: 'POST',
        url: `http://localhost:3000/user/login`,
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('userId', data.user._id)
          commit('SET_USERNAME', data.user.username)
          commit('SET_USER', localStorage.getItem('userId'))
          dispatch('checkLogin')
          Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`,
            footer: '<a href>Why do I have this issue?</a>'
          })
          // console.log(err.response.data)
        })
    },
    checkLogin({ commit, state, dispatch }) {
      if (!localStorage.getItem('token')) {

        commit('SET_LOGIN', false)
      } else {

        commit('SET_LOGIN', true)
      }
    },
    addQuestion({ commit, state, dispatch }, payload) {
      axios({
        method: 'POST',
        url: `${BASE_URL}question`,
        data: {
          title: payload.title,
          description: payload.description
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('fetchQuestion')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`,
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
    },
    upVotesAnswer({ commit, state, dispatch }, payload) {
      axios({
        method: 'PATCH',
        url: `${BASE_URL}answer/${payload}/up`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('fetchDetail', data.questionId)
          dispatch('fetchAnswer', data.questionId)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`,
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
    },
    downVotesAnswer({ commit, state, dispatch }, payload) {
      axios({
        method: 'PATCH',
        url: `${BASE_URL}answer/${payload}/down`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('fetchDetail', data.questionId)
          dispatch('fetchAnswer', data.questionId)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`,
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
    },
    upVotesQuestion({ commit, state, dispatch }, payload) {
      axios({
        method: 'PATCH',
        url: `${BASE_URL}question/${payload}/up`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('fetchDetail', payload)
          dispatch('fetchQuestion')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`,
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
    },
    downVotesQuestion({ commit, state, dispatch }, payload) {
      axios({
        method: 'PATCH',
        url: `${BASE_URL}question/${payload}/down`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('fetchDetail', payload)
          dispatch('fetchQuestion')
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    fetchDetail({ commit, state, dispatch }, payload) {
      axios({
        method: 'GET',
        url: `${BASE_URL}question/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_DETAIL', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`,
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
    },
    updateAnswer({ commit, state, dispatch }, payload) {

      axios({
        method: "PATCH",
        url: `${BASE_URL}answer/${payload.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: payload.title,
          description: payload.description
        }
      })
        .then(({ data }) => {
          dispatch('fetchAnswer', data.questionId)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`,
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
    },
    updateQuestion({ commit, state, dispatch }, payload) {

      axios({
        method: "PATCH",
        url: `${BASE_URL}question/${payload.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: payload.title,
          description: payload.description
        }
      })
        .then(({ data }) => {
          // console.log(data)
          dispatch('fetchQuestion')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`,
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
    },
    addAnswer({ commit, state, dispatch }, payload) {
      axios({
        method: 'POST',
        url: `${BASE_URL}answer/${payload.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: payload.title,
          description: payload.description
        }
      })
        .then(({ data }) => {
          dispatch('fetchAnswer', payload.id)
          console.log(data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`,
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
    },
    fetchAnswer({ commit, state, dispatch }, payload) {
      axios({
        method: 'GET',
        url: `${BASE_URL}answer/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('ADD_ANSWER', data)
          // console.log('ok')
          // console.log(data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`,
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
    }
  },
  modules: {
  }
})
