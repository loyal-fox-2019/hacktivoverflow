import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userID: '',
    name: '',
    email: '',
    questions: []
  },
  mutations: {
    SET_LOGIN_TRUE(state, payload) {
      // mutate state
      state.isLogin = true
    },
    SET_LOGIN_FALSE(state, payload) {
      state.isLogin = false
    },
    SET_QUESTIONS_LIST(state, payload){
      state.questions = payload
    },
    SET_USER_ID(state, payload){
      state.userID = payload
    },
    SET_EMAIL(state, payload){
      state.email = payload
    },
    SET_NAME(state, payload){
      state.name = payload
    }
  },
  actions: {
    fetch_question(context, payload) {
      axios
        .get("http://localhost:3000/questions")
        .then(({ data }) => {
          context.commit('SET_QUESTIONS_LIST', data.questions)
        })
        .catch(error => {
          console.log(error)
        })
    },
    userLogin(context, payload){

    }
  },
  modules: {
  }
})
