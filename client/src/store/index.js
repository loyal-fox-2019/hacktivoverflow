import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import question from './modules/question'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    question
  }
})
