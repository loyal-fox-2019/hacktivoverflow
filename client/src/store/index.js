import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isLogin: false,
    listQuestion: [],
    questionDetail: {},
    answerById: [],
    allAnswer: []
  },
  mutations: {
    CHANGE_STATE_LOGIN(state, payload) {
      state.isLogin = payload
    },
    FETCH_LIST_QUESTION(state, payload) {
      state.listQuestion = payload
    },
    GET_QUESTION_DETAIL(state, payload) {
      state.questionDetail = payload
    },
    GET_ANSWER_BYQUESTION(state, paylod) {
      state.answerById = paylod
    },
    GET_ALL_ANSWER(state, payload) {
      state.allAnswer = payload
    }
  },
  actions: {
    register({ commit }, payload) {
      axios
        .post('http://localhost:3000/users/register', {
          name: payload.name,
          username: payload.username,
          email: payload.email,
          password: payload.password
        })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Successfully Registered'
          })
          localStorage.setItem('token', data.token)
          commit('CHANGE_STATE_LOGIN', true)
          router.push('/questions')
        })
    },
    login({ commit }, payload) {
      axios
        .post('http://localhost:3000/users/login', {
          email: payload.email,
          password: payload.password
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          commit('CHANGE_STATE_LOGIN', true)
          router.push('/questions')
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Something Wrong',
            text: response.data.message
          })
        })
    },
    addQuestion({ commit }, payload) {
      axios
        .post(
          'http://localhost:3000/questions/',
          {
            title: payload.title,
            description: payload.description
          },
          {
            headers: {
              token: localStorage.getItem('token')
            }
          }
        )
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Question Has been posted, Please Wait for Answer'
          })
          router.push('/questions')
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Something Wrong',
            text: response.data.message
          })
        })
    },
    fetch_question({ commit }) {
      axios
        .get('http://localhost:3000/questions')
        .then(({ data }) => {
          commit('FETCH_LIST_QUESTION', data)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            text: response.data.message
          })
        })
    },
    question_detail({ commit }, payload) {
      axios
        .get('http://localhost:3000/questions/' + payload)
        .then(({ data }) => {
          commit('GET_QUESTION_DETAIL', data)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Something Wrong',
            text: response.data.message
          })
        })
    },
    fetch_answer({ commit }, payload) {
      axios
        .get('http://localhost:3000/answers/' + payload)
        .then(({ data }) => {
          commit('GET_ANSWER_BYQUESTION', data)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Something Wrong',
            text: response.data.message
          })
        })
    },
    fetch_allanswer({ commit }, payload) {
      axios
        .get('http://localhost:3000/answers/')
        .then(({ data }) => {
          commit('GET_ALL_ANSWER', data)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Something Wrong',
            text: response.data.message
          })
        })
    },
    post_answer({ commit }, payload) {
      axios
        .post(
          'http://localhost:3000/answers/',
          {
            description: payload.description,
            questionId: payload.questionId
          },
          {
            headers: {
              token: localStorage.getItem('token')
            }
          }
        )
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Answer Success',
            text: 'Thankyou for helping by Answer the Question'
          })
          this.dispatch('fetch_answer', payload.questionId)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            text: response.data.message,
            title: 'Something Wrong'
          })
        })
    }
  },
  modules: {}
})
