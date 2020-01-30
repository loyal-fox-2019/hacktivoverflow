import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userName: '',
    detailedQuestion: null,
    allQuestions: null,
    allAnswers: null,
    myQuestions: null,
    topQuestions: null,
    editQuestion: false,
    myAnswers: null
  },
  mutations: {
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_LOGOUT (state) {
      localStorage.clear()
      state.isLogin = false
      router.push('/')
    },
    SET_USERNAME (state) {
      state.userName = localStorage.getItem('userName')
    },
    getQuestions (state, payload) {
      state.allQuestions = payload
    },
    getAnswers (state, payload) {
      state.allAnswers = payload
    },
    SET_DETAILEDQUESTION (state, payload) {
      state.detailedQuestion = payload
    },
    SET_MYQUESTIONS (state, payload) {
      state.myQuestions = payload
    },
    SET_TOPQUESTIONS (state, payload) {
      state.topQuestions = payload
    },
    SET_NOEDIT (state) {
      state.editQuestion = false
    },
    SET_EDIT (state) {
      state.editQuestion = true
    },
    SET_MYANSWERS (state, payload) {
      state.myAnswers = payload
    }
  },
  actions: {
    getAllQuestions (state) {
      axios({
        method: 'get',
        url: 'http://52.14.182.202:3000/question'
      })
        .then(({ data }) => {
          this.commit('getQuestions', data)
          let topQ = data
          topQ.sort(function (a, b) {
            return (b.upVotes.length - b.downVotes.length) - (a.upVotes.length - a.downVotes.length)
          })
          this.commit('SET_TOPQUESTIONS', topQ)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data,
            text: err.response.status
          })
        })
    },
    getAllAnswers (state) {
      axios({
        method: 'get',
        url: 'http://52.14.182.202:3000/answer'
      })
        .then(({ data }) => {
          this.commit('getAnswers', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data,
            text: err.response.status
          })
        })
    },
    upVote (state, payload) {
      // console.log(payload)
      axios({
        method: 'patch',
        url: 'http://52.14.182.202:3000/question/' + payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.dispatch('getAllQuestions')
          this.dispatch('findDetail', payload)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data,
            text: err.response.status
          })
        })
    },
    downVote (state, payload) {
      axios({
        method: 'patch',
        url: 'http://52.14.182.202:3000/question/' + payload + '/downVote',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.dispatch('getAllQuestions')
          this.dispatch('findDetail', payload)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data,
            text: err.response.status
          })
        })
    },
    askQuestion (state, payload) {
      // console.log(payload)
      // let route = this.$router
      axios({
        method: 'post',
        url: 'http://52.14.182.202:3000/question',
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          data.userId = { userName: localStorage.getItem('userName') }
          // console.log(data._id)
          this.dispatch('getAllAnswers')
          this.dispatch('getAllQuestions')
          this.dispatch('findMyQuestions')
          this.dispatch('findDetail', data._id)
          router.push(`/${data._id}`)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data,
            text: err.response.status
          })
        })
    },
    AupVote (state, payload) {
      axios({
        method: 'patch',
        url: 'http://52.14.182.202:3000/answer/' + payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.dispatch('getAllAnswers')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data,
            text: err.response.status
          })
        })
    },
    AdownVote (state, payload) {
      axios({
        method: 'patch',
        url: 'http://52.14.182.202:3000/answer/' + payload + '/downVote',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.dispatch('getAllAnswers')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data,
            text: err.response.status
          })
        })
    },
    findDetail (state, payload) {
      axios({
        method: 'get',
        url: 'http://52.14.182.202:3000/question/' + payload
      })
        .then(({ data }) => {
          this.commit('SET_DETAILEDQUESTION', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data,
            text: err.response.status
          })
        })
    },
    findMyQuestions (state) {
      axios({
        method: 'get',
        url: 'http://52.14.182.202:3000/question/myQuestions',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.commit('SET_MYQUESTIONS', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data,
            text: err.response.status
          })
        })
    },
    webRegister (state, payload) {
      axios({
        method: 'post',
        url: 'http://52.14.182.202:3000/user',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('userName', data.userName)
          this.commit('SET_ISLOGIN', true)
          this.dispatch('findMyQuestions')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Please fill in all fields',
            text: err
          })
        })
    },
    webLogin (state, payload) {
      axios({
        method: 'post',
        url: 'http://52.14.182.202:3000/user/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('userName', data.userName)
          this.commit('SET_USERNAME')
          this.commit('SET_ISLOGIN', true)
          this.dispatch('findMyQuestions')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data,
            text: err.response.status
          })
        })
    },
    deleteQuestion (state, payload) {
      axios({
        method: 'delete',
        url: 'http://52.14.182.202:3000/question/' + payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire(
            'Deleted!',
            'Your question has been deleted.',
            'success'
          )
          this.dispatch('getAllAnswers')
          this.dispatch('getAllQuestions')
          this.dispatch('findMyQuestions')
          router.push('/')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data,
            text: err.response.status
          })
        })
    },
    editQuestion (state, payload) {
      // console.log(payload.id)
      axios({
        method: 'put',
        url: 'http://52.14.182.202:3000/question/' + payload.id,
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.dispatch('getAllAnswers')
          this.dispatch('getAllQuestions')
          this.dispatch('findMyQuestions')
          this.commit('SET_DETAILEDQUESTION', data)
          router.push(`/${data._id}`)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data,
            text: err.response.status
          })
        })
    },
    addAnswer (state, payload) {
      axios({
        method: 'post',
        url: 'http://52.14.182.202:3000/answer/' + payload.id,
        headers: {
          token: localStorage.getItem('token')
        },
        data: payload
      })
        .then(({ data }) => {
          this.dispatch('getAllAnswers')
          this.dispatch('findMyAnswers')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data,
            text: err.response.status
          })
        })
    },
    findMyAnswers (state) {
      axios({
        method: 'get',
        url: 'http://52.14.182.202:3000/answer/myAnswer',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          // console.log(data)
          this.commit('SET_MYANSWERS', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data,
            text: err.response.status
          })
        })
    },
    editAnswer (state, payload) {
      axios({
        method: 'put',
        url: 'http://52.14.182.202:3000/answer/' + payload.id,
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.dispatch('getAllAnswers')
          this.dispatch('findMyAnswers')
          // router.go(-1)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data,
            text: err.response.status
          })
        })
    }
  }
})
