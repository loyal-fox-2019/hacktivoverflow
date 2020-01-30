import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../plugins/axiosAPI'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    watched: [],
    who: '',
    alertMessage: '',
    alertVariant: '',
    dismissSecs: 2,
    dismissCountDown: 0,
    isLogin: false,
    myQuestions: [],
    allQuestions: [],
    singleQuestion: {},
    theAnswer: []
  },
  mutations: {
    SET_WATCH (state, payload) {
      state.watched = payload
    },
    SET_WHO (state, payload) {
      state.who = payload
    },
    DELETE_QUESTION (state, payload) {
      console.log(state.allQuestions.includes(payload))
      // state.allQuestions = state.allQuestions.filter(quest => quest !== payload)
    },
    PUSH_QUESTION (state, payload) {
      state.allQuestions.unshift(payload)
    },
    PUSH_ANSWER (state, payload) {
      state.theAnswer.push(payload)
    },
    SET_ALERT (state, payload) {
      state.dismissCountDown = state.dismissSecs
      state.alertMessage = payload.message
      state.alertVariant = payload.variant
    },
    SET_MYQUESTION (state, payload) {
      state.myQuestions = payload
    },
    SET_ALLQUESTIONS (state, payload) {
      state.allQuestions = payload
    },
    SET_SINGLEQUESTION (state, payload) {
      state.singleQuestion = payload
    },
    SET_ANSWERS (state, payload) {
      state.theAnswer = payload
    }
  },
  actions: {
    fetchAllQuestion (context) {
      axios({
        method: 'get',
        url: 'questions'
      })
        .then(({ data }) => {
          context.commit('SET_ALLQUESTIONS', data)
        }).catch((err) => {
          console.log(err.response.data.message)
          context.commit('SET_ALERT', {
            message: err.response.data.message,
            variant: 'danger'
          })
        })
    },
    fetchMyQuestions (context) {
      axios({
        method: 'get',
        url: 'questions/mine'
      })
        .then(({ data }) => {
          context.commit('SET_MYQUESTION', data)
        }).catch((err) => {
          console.log(err.response.data.message)
          context.commit('SET_ALERT', {
            message: err.response.data.message,
            variant: 'danger'
          })
        })
    },
    fetchSingleQuestion (context, payload) {
      axios({
        method: 'get',
        url: 'questions/' + payload
      })
        .then(({ data }) => {
          context.commit('SET_SINGLEQUESTION', data)
        }).catch((err) => {
          console.log(err.response.data.message)
          context.commit('SET_ALERT', {
            message: err.response.data.message,
            variant: 'danger'
          })
        })
    },
    fetchTheAnswer (context, payload) {
      return axios({
        method: 'get',
        url: 'answers/' + payload
      })
        .then(({ data }) => {
          context.commit('SET_ANSWERS', data)
        }).catch((err) => {
          console.log(err.response.data.message)
          context.commit('SET_ALERT', {
            message: err.response.data.message,
            variant: 'danger'
          })
        })
    }
  },
  modules: {
  },
  getters: {
    questy: state => {
      return state.singleQuestion
    },
    tagu: state => {
      return state.watched
    }
  }
})
