import Vue from 'vue'
import Vuex from 'vuex'
// import axios from '../config/config.axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    error: '',
    success: ''
  },
  mutations: {
    SEND_ERROR(state, payload) {
      state.error = payload
    },
    SEND_SUCCESS(state, payload) {
      state.success = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
