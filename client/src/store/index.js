import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from "sweetalert2"
import router from "../router/index.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: "http://localhost:3000",
    isLogin: false,
    name: "",
    allQuestions: null,
    currentQuestion: null,
    currentReplies: null,
    hapusBoongan: null,
    voted: false,
    downvoted: false,
    editQuestionStatus: false,
    editAnswerStatus: false
  },
  mutations: {
    changeIsLogin(state, status) {
      state.isLogin = status
    },
    setName(state, name) {
      state.name = name
    },
    setAllQuestions(state, data) {
      state.allQuestions = data
    },
    setCurrentQuestion(state, data) {
      state.currentQuestion = data
    },
    setReplies(state, data) {
      state.currentReplies = data
    },
    addNewQuestion(state, data) {
      if (state.allQuestions) {
        state.allQuestions.push(data)
      }
    },
    tambahJawaban(state, data) {
      if (state.currentReplies) {
        state.currentReplies.push(data)
      }
    },
    hapusBoongan(state, data) {
      state.hapusBoongan = data
    },
    setVoted(state, data) {
      state.voted = data
      state.downvoted = false
    },
    setDownvoted(state, data) {
      state.downvoted = data
      state.voted = false
    },
    editQuestionStatus(state, data) {
      state.editQuestionStatus = data
    },
    editAnswerStatus(state, data) {
      state.editAnswerStatus = data
    }

  },
  actions: {
    login(context, body) {
      let baseUrl = this.state.baseUrl
      axios({
        method: "POST",
        url: `${baseUrl}/user/login`,
        data: body
      })
        .then(({ data }) => {
          context.commit("changeIsLogin", true)
          context.commit("setName", data.userFound.username)
          localStorage.setItem("token", data.token)
          localStorage.setItem("userId", data.userFound._id)
          if (router.apps[0].$options.router.history.current.path !== "/")
            router.push("/")
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: err.response.data.message
          })
        })

    },
    logout(context) {
      context.commit("changeIsLogin", false)
      localStorage.clear()
    },
    signIn(context, body) {
      let baseUrl = this.state.baseUrl
      axios({
        method: "POST",
        url: `${baseUrl}/user/register`,
        data: body
      })
        .then(({ data }) => {
          context.commit("changeIsLogin", true)
          context.commit("setName", data.userRegistered.username)
          localStorage.setItem("token", data.token)
          localStorage.setItem("userId", data.userRegistered._id)
          if (router.apps[0].$options.router.history.current.path !== "/")
            router.push("/")
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: err.response.data.message
          })
        })
    },
    getAllQuestion(context) {
      let url = this.state.baseUrl
      axios({
        method: "GET",
        url: `${url}/question/allQuestion`
      })
        .then(({ data }) => {
          // console.log(data)
          // console.log(context, "ini context")
          context.commit("setAllQuestions", data)
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: err.response.data.message
          })
        })
    },
    setCurrentQuestion(context, id) {
      let url = this.state.baseUrl
      axios({
        method: "GET",
        url: `${url}/question/oneQuestion/${id}`
      })
        .then(({ data }) => {

          context.commit("setCurrentQuestion", data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getReplies(context, id) {
      let url = this.state.baseUrl
      axios({
        method: "GET",
        url: `${url}/question/answers/${id}`
      })
        .then(({ data }) => {
          context.commit("setReplies", data)
        })
        .catch(err => {
          console.log(err, "gagal")
        })
    },
    postQuestion(context, question) {
      let url = this.state.baseUrl
      axios({
        method: "post",
        url: `${url}/question/ask`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: question
      })
        .then(({ data }) => {
          router.push("/")
          context.commit("addNewQuestion", data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    reply(context, jawaban) {
      let { id, description, title } = jawaban
      let url = this.state.baseUrl
      axios({
        method: "POST",
        url: `${url}/answer/${id}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          description,
          title
        }
      })
        .then(({ data }) => {
          // console.log(data, "ini data reply setelah dia post reply")
          context.commit("tambahJawaban", data)
          // router.push("/")
          context.dispatch("getReplies", id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    hapusQuestion(context, id) {
      let url = this.state.baseUrl
      axios({
        method: "delete",
        url: `${url}/question/delete/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(() => {
          router.push("/")
          context.commit("hapusBoongan", true)
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: err.response.data.message
          })
        })
    },
    saveChangeQuestion(context, editan) {
      // console.log("masuk index store")
      let { id, description, title } = editan
      console.log(title)
      let url = this.state.baseUrl
      axios({
        method: "put",
        url: `${url}/question/edit/${id}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          description,
          title
        }
      })
        .then(() => {
          // router.push("/")
          // context.commit("hapusBoongan", true)
          context.dispatch("getReplies", id)
          context.commit("editQuestionStatus", false)
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: err.response.data.message
          })
        })
    },
    upvoteQuestion(context, id) {
      let url = this.state.baseUrl
      axios({
        method: "PATCH",
        url: `${url}/question/upvote/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(() => {
          // context.commit("hapusBoogan", true)
          context.dispatch("setCurrentQuestion", id)
          // context.commit("setVoted", true)
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: err.response.data.message
          })
        })
    },
    downvoteQuestion(context, id) {
      let url = this.state.baseUrl
      axios({
        method: "PATCH",
        url: `${url}/question/downvote/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(() => {
          // context.commit("hapusBoogan", true)
          context.dispatch("setCurrentQuestion", id)
          // context.commit("setDownVoted", true)
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: err.response.data.message
          })
        })
    },
    upvoteAnswer(context, id) {
      let url = this.state.baseUrl
      axios({
        method: "PATCH",
        url: `${url}/answer/upvote/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          // console.log(data.questionId, "ini data ipvote")
          // context.commit("hapusBoogan", true)
          context.dispatch("getReplies", data.questionId)
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: err.response.data.message
          })
        })
    },
    downvoteAnswer(context, id) {
      let url = this.state.baseUrl
      axios({
        method: "PATCH",
        url: `${url}/answer/downvote/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          // context.commit("hapusBoogan", true)
          context.dispatch("getReplies", data.questionId)
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: err.response.data.message
          })
        })
    },
    searchThis(context, title) {
      let url = this.state.baseUrl
      axios({
        method: "Get",
        url: `${url}/question/searchByTitle/${title}`
      })
        .then(({ data }) => {
          context.commit("setAllQuestions", data)
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: err.response.data.message
          })
        })
    },
    searchTag(context, tag) {
      let url = this.state.baseUrl
      axios({
        method: "Get",
        url: `${url}/question/searchByTag/${tag}`
      })
        .then(({ data }) => {
          context.commit("setAllQuestions", data)
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: err.response.data.message
          })
        })
    },
    getRepliesUlang(context, id) {
      context.dispatch("getReplies", id)
    }

  },
  modules: {
  }
})
