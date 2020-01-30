import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API: "http://localhost:3000",
    registerData: null,
    isLogin: !!localStorage.token,
    userLogin: localStorage.name,
    questions: [],
    questionDetail: null,
    comments: [],
    editedContent: {
      title: null,
      body: null
    }
  },
  mutations: {
    SET_REGISTERDATA(state, payload) {
      state.registerData = payload;
    },
    SET_LOGIN(state, isLogin) {
      state.isLogin = isLogin;
    },
    SET_USERLOGIN(state, name) {
      state.userLogin = name;
    },
    SET_QUESTIONS(state, payload) {
      state.questions = payload;
    },
    SET_QUESTIONDETAIL(state, payload) {
      state.questionDetail = payload;
    },
    SET_COMMENTS(state, payload) {
      state.comments = payload;
    },
    SET_EDITED(state, payload) {
      state.editedContent[payload.key] = payload.value;
      console.log("SET_EDITED", state.editedContent);
    }
  },
  actions: {
    fetchConfirmationData(context) {
      axios({
        method: "GET",
        url: `${this.state.API}/users/register/${this.$route.params.id}`
      })
        .then(({ data }) => {
          context.commit("SET_REGISTERDATA", data);
        })
        .catch(err => {
          context.commit("SET_REGISTERDATA", err);
        });
    },
    fetchQuestions(context) {
      axios({
        method: "GET",
        url: `${this.state.API}/questions`
      })
        .then(({ data }) => {
          context.commit("SET_QUESTIONS", data);
        })
        .catch(err => {
          context.commit("SET_QUESTIONS", err);
        });
    },
    fetchQuestionDetail(context, id) {
      axios({
        method: "GET",
        url: `${this.state.API}/questions/${id}`
      })
        .then(({ data }) => {
          context.commit("SET_QUESTIONDETAIL", data);
        })
        .catch(err => {
          context.commit("SET_QUESTIONDETAIL", err);
        });
    },
    fetchComments(context, id) {
      axios({
        method: "GET",
        url: `${this.state.API}/questions/${id}/comments`
      })
        .then(({ data }) => {
          context.commit("SET_COMMENTS", data.comments);
        })
        .catch(err => {
          context.commit("SET_COMMENTS", err);
        });
    },
    saveVote(context, data) {
      axios({
        method: "POST",
        url: `${this.state.API}/votes`,
        headers: {
          token: localStorage.token
        },
        data
      })
        .then(({ data }) => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  modules: {}
});
