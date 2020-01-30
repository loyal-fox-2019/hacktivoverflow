import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)
let baseUrl = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    login: false,
    description: "",
    title: "",
    questions: []
  },
  mutations: {
    successRegister(state, payload) {
      state.login = payload
    },
    successLogin(state, payload) {
      state.login = payload
    },
    LogoutSuccess(state, payload) {
      state.login = payload
    },
    setTitle(state, payload) {
      state.title = payload
    },
    setDescription(state, payload) {
      state.description = payload
    },
    setQuestions(state, payload) {
      state.questions = payload
    }
  },
  actions: {
    goRegister(context, payload) {
      let username = payload.username;
      let email = payload.email;
      let password = payload.password;
      axios({
        url: `${baseUrl}/users/register`,
        method: "POST",
        data: {
          username,
          email,
          password
        }
      })
        .then(({ data }) => {
          Swal.fire("Success!", "Your Account is Created!", "success");
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.user._id)
          localStorage.setItem("username", data.user.username)
          localStorage.setItem("email", data.user.email)
          context.commit('successRegister', true)
          router.push('/')

        })
        .catch(err => {
          Swal.fire("Error!", err.message, "error");
        })
    },
    goLogin(context, payload) {
      let email = payload.email;
      let password = payload.password;
      axios({
        url: `${baseUrl}/users/login`,
        method: "POST",
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          context.commit('successLogin', true)
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.user._id)
          localStorage.setItem("username", data.user.username)
          localStorage.setItem("email", data.user.email)
          Swal.fire("Success!", data.message, "success");
          router.push('/')
        })
        .catch(err => {
          Swal.fire("Error!", err.message, "error");
        })
    },
    goLogout(context) {
      localStorage.clear()
      context.commit('LogoutSuccess', false)
      Swal.fire("Success!", "Logged Out Success!", "success")
    },
    postQuestion() {
      let title = this.state.title
      let description = this.state.description
      console.log(description);
      axios({
        url: `${baseUrl}/questions`,
        method: "POST",
        data: {
          title,
          description
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data);
          Swal.fire("Success!", 'Create Question Success', "success");
          router.push('/')
        })
        .catch(err => {
          console.log(err);
          Swal.fire("Error!", err.message, "error");
        })
    },
    findAllQuestions(context) {
      axios({
        url: `${baseUrl}/questions`,
        method: "GET"
      })
        .then(({ data }) => {
          context.commit('setQuestions', data)
        })
        .catch(err => {
          Swal.fire("Error!", err.message, "error");
        })
    },
  },
  modules: {
  }
})
