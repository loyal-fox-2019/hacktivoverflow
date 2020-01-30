import Vue from 'vue'
import Vuex from 'vuex'
import question from './module/question'
import myAnswer from './module/myAnswer'
import myQuestion from './module/myQuestion'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: null,
    userTags:[]
  },
  mutations: {
    setLogin(state,payload){
      state.isLogin = payload
    },
    setUser(state,payload){
      state.user = payload
    },
    setTags(state,payload){
      state.userTags = payload
    }
  },
  actions: {
  },
  modules: {
    question,
    myAnswer,
    myQuestion
  }
})
