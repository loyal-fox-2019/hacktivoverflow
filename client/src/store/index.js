import Vue from 'vue'
import Vuex from 'vuex'
import axiosReq from "../config/axios.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allQuestions: [],
    isLogin: false,
    searchStr: ""
  },
  mutations: {
    SET_ALL_QUESTIONS(state,payload) {
      state.allQuestions = payload;
    },
    SET_LOGIN_STATE(state,payload) {
      state.isLogin = payload;
    },
    SET_SEARCH_STR(state,payload) {
      state.searchStr = payload;
    }
  },
  actions: {
    getAllQuestions(context) {
      axiosReq({
        url: `/questions?search=${context.state.searchStr}`,
        method: "get"
      })
      .then(({data}) => {
        context.commit('SET_ALL_QUESTIONS',data);
      })

    }
  },
  modules: {
  }
})
