import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../server'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    question: [],
    detailQuestion: {},
    detailAnswer: {},
    tags: []
  },
  mutations: {
    SET_QUESTION (state, payload) {
      state.question = payload
    },
    SET_DETAILQUESTION (state, payload) {
      state.detailQuestion = payload
    },
    SET_DETAILANSWER (state, payload) {
      state.detailAnswer = payload
    },
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_TAGS (state, payload) {
      state.tags = payload
    }
  },
  actions: {
    // Fetch All Question
    fetchQuestion ({ commit }) {
      axios.get('question', ({ headers: { token: localStorage.getItem('token') } }))
        .then(({ data }) => {
          commit('SET_QUESTION', data)
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    // Read My Question
    myQuestion ({ commit }) {
      axios.get('question/my', ({ headers: { token: localStorage.getItem('token') } }))
        .then(({ data }) => {
          commit('SET_QUESTION', data)
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    // Read Question
    readQuestion ({ commit }, payload) {
      return axios.get(`question/${payload}`, ({ headers: { token: localStorage.getItem('token') } }))
        .then(({ data }) => {
          commit('SET_DETAILQUESTION', data)
          return data
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    // Read Edit Question
    readEditQuestion ({ commit }, payload) {
      return axios.get(`question/${payload}`, ({ headers: { token: localStorage.getItem('token') } }))
    },
    // Create Question
    createQuestion ({ commit }, payload) {
      return axios({
        method: 'POST',
        url: 'question',
        headers: { token: localStorage.getItem('token') },
        data: payload
      })
    },
    // Up Votes Question
    upVotesQuestion ({ commit }, payload) {
      return axios({
        method: 'PATCH',
        url: `question/upvotes/${payload}`,
        headers: { token: localStorage.getItem('token') }
      })
    },
    // Down Votes Question
    downVotesQuestion ({ commit }, payload) {
      return axios({
        method: 'PATCH',
        url: `question/downvotes/${payload}`,
        headers: { token: localStorage.getItem('token') }
      })
    },
    // Edit Question
    editQuestion ({ commit }, payload) {
      let id = payload.id
      let value = { title: payload.title, description: payload.description }
      return axios({
        method: 'PUT',
        url: `question/${id}`,
        data: value,
        headers: { token: localStorage.getItem('token') }
      })
    },
    // Delete Question
    deleteQuestion ({ commit }, payload) {
      return axios({
        method: 'DELETE',
        url: `question/${payload}`,
        headers: { token: localStorage.getItem('token') }
      })
    },
    // Create Answer
    createAnswer ({ commit }, payload) {
      let id = payload.id
      let value = { description: payload.description }
      return axios({
        method: 'POST',
        url: `answer/${id}`,
        data: value,
        headers: { token: localStorage.getItem('token') }
      })
    },
    // Read Answer
    readAnswer ({ commit }, payload) {
      return axios({
        method: 'GET',
        url: `answer/${payload}`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          commit('SET_DETAILANSWER', data)
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    // Up Votes Answer
    upVotesAnswer ({ commit }, payload) {
      return axios({
        method: 'PATCH',
        url: `answer/upvotes/${payload}`,
        headers: { token: localStorage.getItem('token') }
      })
    },
    // Down Votes Answer
    downVotesAnswer ({ commit }, payload) {
      return axios({
        method: 'PATCH',
        url: `answer/downvotes/${payload}`,
        headers: { token: localStorage.getItem('token') }
      })
    },
    // Login
    login ({ commit }, payload) {
      return axios.post('users/login', payload)
    },
    // Register
    register ({ commit }, payload) {
      return axios.post('users/register', payload)
    },
    // Tags
    editTags ({ commit }, payload) {
      let value = { tags: payload }
      return axios({
        method: 'PATCH',
        url: `users/tags`,
        data: value,
        headers: { token: localStorage.getItem('token') }
      })
    },
    fetchTags ({ commit }) {
      axios({
        method: 'GET',
        url: `users/tags`,
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          commit('SET_TAGS', data)
        })
        .catch((err) => {
          console.log(err.response)
        })
    }
  },
  modules: {
  }
})
