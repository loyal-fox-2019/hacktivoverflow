import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../plugins/axiosAPI';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alertMessage: '',
    alertVariant: '',
    dismissSecs: 2,
    dismissCountDown: 0,
    isLogin: false,
    myQuestions: [],
    allQuestions: []
  },
  mutations: {
    SET_ALERT(state, payload) {
      state.dismissCountDown = state.dismissSecs
      state.alertMessage = payload.message
      state.alertVariant = payload.variant
    },
    SET_MYQUESTION(state, payload) {
      state.myQuestions = payload
    },
    SET_ALLQUESTIONS(state, payload) {
      state.allQuestions = payload
    }
  },
  actions: {
    fetchAllQuestion(context) {
      axios({
        method: 'get',
        url: 'questions'
      })
        .then(({ data }) => {
          context.commit('SET_ALLQUESTIONS', data)
        }).catch((err) => {
          console.log(err.response.data.message)
          context.commit("SET_ALERT", {
            message: err.response.data.message,
            variant: "danger"
          });
        });

    },
    fetchMyQuestions(context) {
      axios({
        method: 'get',
        url: 'questions/mine'
      })
        .then(({ data }) => {
          context.commit('SET_MYQUESTION', data)
        }).catch((err) => {
          console.log(err.response.data.message)
          context.commit("SET_ALERT", {
            message: err.response.data.message,
            variant: "danger"
          });
        });
    },
    fetchSingleQuestion(context, payload) {
      return axios({
        method: 'get',
        url: 'questions/' + payload
      })
    },
    fetchTheAnswer(context, payload){
      return axios({
        method: 'get',
        url: 'answers/' + payload 
      })
    }
  },
  modules: {
  }
})
