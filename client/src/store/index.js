import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API: "http://13.250.122.239",
    // API: "http://localhost:3000",
    registerData: null,
    isLogin: !!localStorage.token,
    userLogin: localStorage.name,
    userId: localStorage.id,
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
    SET_EDITED(state, payloads) {
      payloads.forEach(payload => {
        state.editedContent[payload.key] = payload.value;
      });
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
    fetchQuestions(context, sorts) {
      let params = {};
      if (sorts) {
        sorts.forEach(sort => {
          if (sort.caption === "Newest" && sort.state) {
            params.createdAt = -1;
          } else if (sort.caption === "Views" && sort.state) {
            params.view = -1;
          }
        });
      }

      if (Object.keys(params).length === 0) {
        params.createdAt = -1;
      }

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
    saveVote(context, sendData) {
      axios({
        method: "POST",
        url: `${this.state.API}/votes`,
        headers: {
          token: localStorage.token
        },
        data: sendData
      })
        .then(({ data }) => {
          if (sendData.from === "list") {
            context.dispatch("fetchQuestions");
          } else {
            if (data.questionId) {
              context.dispatch("fetchQuestionDetail", data.questionId);
              context.dispatch("fetchComments", data.questionId);
            } else {
              context.dispatch("fetchQuestionDetail", data.result._id);
            }
          }
        })
        .catch(err => {
          if (err.response.data) {
            Vue.swal(
              "Error",
              err.response.data.msg ||
                "Something went wrong, please try again later",
              "error"
            );
          } else {
            Vue.swal(
              "Error",
              "Something went wrong, please try again later",
              "error"
            );
          }
        });
    },
    saveChanges(context, id) {
      axios({
        method: "PATCH",
        url: `${this.state.API}/questions/${id}`,
        headers: {
          token: localStorage.token
        },
        data: context.state.editedContent
      })
        .then(() => {
          context.dispatch("fetchQuestionDetail", id);
        })
        .catch(err => {
          if (err.response.data) {
            Vue.swal(
              "Error",
              err.response.data.msg ||
                "You are not authorized accessing this data",
              "error"
            );
          } else {
            Vue.swal(
              "Error",
              "Something went wrong, please try again later",
              "error"
            );
          }
        });
    },
    saveComment(context, id) {
      axios({
        method: "PATCH",
        url: `${this.state.API}/questions/${id}/comments`,
        headers: {
          token: localStorage.token
        },
        data: context.state.editedContent
      })
        .then(({ data }) => {
          context.dispatch("fetchQuestionDetail", data.questionId);
          context.dispatch("fetchComments", data.questionId);
        })
        .catch(err => {
          if (err.response.data) {
            Vue.swal(
              "Error",
              err.response.data.msg ||
                "You are not authorized accessing this data",
              "error"
            );
          } else {
            Vue.swal(
              "Error",
              "Something went wrong, please try again later",
              "error"
            );
          }
        });
    }
  },
  modules: {}
});
