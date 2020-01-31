import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import Swal from 'sweetalert2'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    login: false,
    questions: null,
    questionDetail: null,
    questionAnswer: null,
    userId: null
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.login = payload
    },
    SET_QUESTIONS (state, payload) {
      state.questions = payload.sort(function (a, b) { return (b.upvotes.length - b.downvotes.length) - (a.upvotes.length - a.downvotes.length) })
    },
    SET_QUESTIONSDETAIL (state, payload) {
      state.questionDetail = payload
    },
    SET_QUESTIONSANSWER (state, payload) {
      state.questionAnswer = payload.sort(function (a, b) { return (b.upvotes.length - b.downvotes.length) - (a.upvotes.length - a.downvotes.length) })
    },
    SET_USERID (state, payload) {
      state.userId = payload
    }
  },
  actions: {
    signup (action, payload) {
      axios({
        url: 'http://18.224.251.184:3000/users/signup',
        method: 'POST',
        data: payload
      })
        .then((data) => {
          console.log(data.data.id)
          localStorage.setItem('token', data.data.token)
          action.commit('SET_LOGIN', true)
          action.commit('SET_USERID', data.data.id)
          Swal.fire({
            icon: 'success',
            title: 'Yeay',
            text: 'Account Created'
          })
        })
        .catch((errr) => {
          Swal.fire({
            icon: 'error',
            title: 'oopppsss',
            text: 'Email Already Taken'
          })
        })
    },
    signin (action, payload) {
      axios({
        url: 'http://18.224.251.184:3000/users/signin',
        method: 'POST',
        data: payload
      })
        .then((data) => {
          localStorage.setItem('token', data.data.token)
          action.commit('SET_LOGIN', true)
          action.commit('SET_USERID', data.data.id)
          Swal.fire({
            icon: 'success',
            title: 'Yeay',
            text: 'Login Success'
          })
        })
        .catch((errr) => {
          Swal.fire({
            icon: 'error',
            title: 'Opps',
            text: 'Wrong Email/Password'
          })
        })
    },
    postQuestion (action, payload) {
      axios({
        url: 'http://18.224.251.184:3000/questions',
        headers: { token: localStorage.getItem('token') },
        method: 'POST',
        data: payload
      })
        .then((data) => {
          action.dispatch('patch')
          Swal.fire({
            icon: 'success',
            title: 'Yeay',
            text: 'Question Created'
          })
        })
        .catch((errr) => {
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: 'Server Error'
          })
        })
    },
    patch (action) {
      axios({
        url: 'http://18.224.251.184:3000/questions',
        method: 'GET'
      })
        .then((data) => {
          action.commit('SET_QUESTIONS', data.data)
        })
        .catch((errr) => {
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: 'Server Error'
          })
        })
    },
    patchQuestionDetail (action, payload) {
      axios({
        url: 'http://18.224.251.184:3000/questions/' + payload,
        method: 'GET'
      })
        .then((data) => {
          action.commit('SET_QUESTIONSDETAIL', data.data)
        })
        .catch((errr) => {
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: 'Server Error'
          })
        })
    },
    patchQuestionAnswer (action, payload) {
      axios({
        url: 'http://18.224.251.184:3000/answers/' + payload,
        method: 'GET'
      })
        .then((data) => {
          action.commit('SET_QUESTIONSANSWER', data.data)
        })
        .catch((errr) => {
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: 'Server Error'
          })
        })
    },
    postAnswer (action, payload) {
      axios({
        url: 'http://18.224.251.184:3000/answers',
        method: 'POST',
        data: payload.input,
        headers: { token: localStorage.getItem('token') }
      })
        .then((data) => {
          action.dispatch('patchQuestionAnswer', payload.route)
        })
    },
    deleteQuestion (action, payload) {
      axios({
        url: 'http://18.224.251.184:3000/questions/' + payload,
        method: 'DELETE',
        headers: { token: localStorage.getItem('token') }
      })
        .then((data) => {
          action.dispatch('patch')
          router.push('/')
        })
        .catch((errr) => {
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: 'Server Error'
          })
        })
    },
    editQuestion (action, payload) {
      axios({
        url: 'http://18.224.251.184:3000/questions/' + payload.id,
        method: 'PUT',
        data: payload.input,
        headers: { token: localStorage.getItem('token') }
      })
        .then((data) => {
          action.dispatch('patchQuestionDetail', payload.id)
        })
        .catch((errr) => {
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: 'Server Error'
          })
        })
    },
    async upQuestion (action, payload) {
      await axios({
        url: 'http://18.224.251.184:3000/questions/upvote/' + payload,
        method: 'PATCH',
        headers: { token: localStorage.getItem('token') }
      })
        .then((data) => {
        })
        .catch((errr) => {
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: 'Server Error'
          })
        })
    },
    async downQuestion (action, payload) {
      await axios({
        url: 'http://18.224.251.184:3000/questions/downvote/' + payload,
        method: 'PATCH',
        headers: { token: localStorage.getItem('token') }
      })
        .then((data) => {
        })
        .catch((errr) => {
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: 'Server Error'
          })
        })
    },
    async upAnswer (action, payload) {
      await axios({
        url: 'http://18.224.251.184:3000/answers/upvote/' + payload.id,
        method: 'PATCH',
        headers: { token: localStorage.getItem('token') }
      })
        .then((data) => {
          action.dispatch('patchQuestionAnswer', payload.route)
        })
        .catch((errr) => {
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: 'Server Error'
          })
        })
    },
    async downAnswer (action, payload) {
      await axios({
        url: 'http://18.224.251.184:3000/answers/downvote/' + payload.id,
        method: 'PATCH',
        headers: { token: localStorage.getItem('token') }
      })
        .then((data) => {
          action.dispatch('patchQuestionAnswer', payload.route)
        })
        .catch((errr) => {
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: 'Server Error'
          })
        })
    },
    editAnswer (action, payload) {
      axios({
        url: 'http://18.224.251.184:3000/answers/' + payload.id,
        method: 'PUT',
        data: payload.input,
        headers: { token: localStorage.getItem('token') }
      })
        .then((data) => {
          action.dispatch('patchQuestionAnswer', payload.question)
        })
        .catch((errr) => {
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: 'Server Error'
          })
        })
    }
  },
  modules: {
  }
})
