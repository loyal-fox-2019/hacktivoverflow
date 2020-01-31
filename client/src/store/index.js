import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questionList: [],
    isLogin: null,
    descriptionText: null,
    question: {},
    answers: [],
    myQuestions: [],
    myAnswers: [],
    answer: {}
  },
  mutations: {
    SAVE_LOGIN_STATUS(state, data) {
      state.isLogin = data
    },
    SAVE_QUESTIONS(state, data) {
      state.questionList = data
    },
    SAVE_DESCRIPTION(state, data) {
      state.descriptionText = data
    },
    SAVE_QUESTION_DETAIL(state, data) {
      state.question = data
    },
    SAVE_ANSWERS(state, data) {
      state.answers = data
    },
    SAVE_MY_QUESTIONS(state, data) {
      state.myQuestions = data
    },
    SAVE_MY_ANSWERS(state, data) {
      state.myAnswers = data
    },
    SAVE_ANSWER_DETAIL(state, data) {
      state.answer = data
    }
  },
  actions: {
    FETCH_QUESTIONS({ commit }) {
      axios({
        method: 'get',
        url: 'http://3.1.84.218:3000/questions/',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SAVE_QUESTIONS', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    FETCH_QUESTION_DETAIL({ commit }, questionId) {
      axios({
        method: 'get',
        url: 'http://3.1.84.218:3000/questions/id/' + questionId,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          // console.log(data)
          commit('SAVE_QUESTION_DETAIL', data)
          return axios({
            method: 'get',
            url: 'http://3.1.84.218:3000/answers/question/' + questionId,
            headers: {
              token: localStorage.token
            }
          })
        })
        .then(({ data }) => {
          // console.log(data)
          commit('SAVE_ANSWERS', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    FETCH_MY_QUESTIONS({ commit }) {
      axios({
        method: 'get',
        url: 'http://3.1.84.218:3000/questions/lists',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SAVE_MY_QUESTIONS', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    FETCH_MY_QUESTION_DETAIL({ commit }, questionId) {
      axios({
        method: 'get',
        url: 'http://3.1.84.218:3000/questions/' + questionId,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          // console.log(data)
          commit('SAVE_QUESTION_DETAIL', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    FETCH_MY_ANSWERS({ commit }) {
      axios({
        method: 'get',
        url: 'http://3.1.84.218:3000/answers/lists',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          commit('SAVE_MY_ANSWERS', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    FETCH_ANSWER_DETAIL({ commit }, answerId) {
      axios({
        method: 'get',
        url: 'http://3.1.84.218:3000/answers/answer/' + answerId,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          // console.log(data)
          commit('SAVE_ANSWER_DETAIL', data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {}
})
