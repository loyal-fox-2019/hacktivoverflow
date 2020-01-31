import Vue from 'vue'
import Vuex from 'vuex'
import axiosReq from "../config/axios.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allQuestions: [],
    myQuestions: [],
    myTags: [],
    isLogin: false,
    searchStr: "",
    currentQuestion: {}
  },
  mutations: {
    SET_ALL_QUESTIONS(state,payload) {
      state.allQuestions = payload;
    },
    SET_MY_QUESTIONS(state,payload) {
      state.myQuestions = payload;
    },
    SET_LOGIN_STATE(state,payload) {
      state.isLogin = payload;
    },
    SET_SEARCH_STR(state,payload) {
      state.searchStr = payload;
    },
    SET_CURRENT_QUESTION(state,payload) {
      state.currentQuestion = payload;
    },
    SET_MY_TAGS(state,payload) {
      state.myTags = payload;
    },
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

    },
    getMyQuestions(context,token) {
      axiosReq({
        url: `/users/myquestions`,
        method: "get",
        headers: {
          token: token
        }
      })
      .then(({data}) => {
        let selected;
        if(context.state.searchStr.length > 0) {
          selected = data.filter((v) => {
              return RegExp(`\\b${context.state.searchStr}`,'i').test(v.title) || 
                  RegExp(`\\b${context.state.searchStr}`,'i').test(v.description)
          });
        }
        else
        {
          selected = data
        }
        context.commit('SET_MY_QUESTIONS',selected);
      })

    },
    getOneQuestion(context,id) {
      axiosReq({
        url: `/questions/${id}`,
        method: "get"
      })
      .then(({data}) => {
        context.commit('SET_CURRENT_QUESTION',data);
      })
    },
    getMyTags(context,token) {
      axiosReq({
        url: `/users/tags`,
        method: "get",
        headers: {
          token: token
        }
      })
      .then(({data}) => {        
        context.commit('SET_MY_TAGS',data.tags);
      })

    },
  },
  modules: {
  }
})
