import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
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
    }
  },
  modules: {
  }
})
