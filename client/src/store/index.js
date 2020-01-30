import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    isLogin: false,
    userID: null,
    isEdit: false,
    detailQuestion: null,
    allQuestion: [],
    allAnswer: [],
    questionId: null,
    answerId: null,
    isComment: false,
    editStatus: false,
    editData: null,
    isAnswer: false
  },
  mutations: {
    CHANGE_LOGIN(state, data) {
      state.userID = data
      state.isLogin = true
    },
    FILL_QUESTION(state, data) {
      state.allQuestion = data
    },
    CHANGE_EDIT(state) {
      state.editStatus = !state.editStatus
    },
    FILL_EDIT(state, data) {
      state.editData = data
    },
    LOGOUT(state) {
      state.isLogin = false
      state.userID = null
    },
    DETAIL_QUESTION(state, data) {
      state.detailQuestion = data
    },
    SHOW_COMMENT(state) {
      state.isComment = !state.isComment
    },
    FILL_ANSWER(state, data) {
      state.allAnswer = data
    },
    CHANGE_ID(state, data) {
      state.questionId = data
    },
    ANSWER_STATUS(state, data) {
      state.isAnswer = !state.isAnswer
      state.answerId = data
    }
  },
  actions: {
    CREATE_QUESTION(context, data) {
      axios
        .post(`${this.state.baseUrl}/question`, data, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(result => {
          Swal.fire('Success', 'Question Created', 'success')
          router.push('/')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.status + err.statusText
          })
        })
    },
    FETCH_ALL(context) {
      console.log(this.state.userID)
      axios
        .get(`${this.state.baseUrl}/question`)
        .then(results => {
          console.log(results.data)
          context.commit('FILL_QUESTION', results.data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.response.status + err.response.statusText
          })
        })
    },
    FETCH_USER_QUESTION(context) {
      axios.get(`${this.state.baseUrl}/question/`)
    },
    ADD_VIEWS(context, id) {
      axios
        .patch(`${this.state.baseUrl}/question/click/${id}`)
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.response.status + err.response.statusText
          })
        })
    },
    DELETE_QUESTION(context, id) {
      axios
        .delete(`${this.state.baseUrl}/question/${id}`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(result => {
          let msg = result.data.message
          router.push('/')
          Swal.fire('Success', msg, 'success')
          this.dispatch('FETCH_ALL')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.response.status + ' ' + err.response.statusText
          })
        })
    },
    FETCH_DETAIL(context, id) {
      console.log('masuk detail')
      axios
        .get(`${this.state.baseUrl}/question/${id}`)
        .then(result => {
          context.commit('DETAIL_QUESTION', result.data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.response.status + ' ' + err.response.statusText
          })
        })
    },
    UPVOTE_QUESTION(context, id) {
      axios
        .patch(
          `${this.state.baseUrl}/question/upvote/${id}`,
          { id: id },
          {
            headers: { token: localStorage.getItem('token') }
          }
        )
        .then(result => {
          this.dispatch('FETCH_DETAIL', id)
        })
        .catch(err => {
          console.log(err.response)
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.response.status + ' ' + err.response.statusText
          })
        })
    },
    DOWNVOTE_QUESTION(context, id) {
      axios
        .patch(
          `${this.state.baseUrl}/question/downvote/${id}`,
          { id: id },
          {
            headers: { token: localStorage.getItem('token') }
          }
        )
        .then(result => {
          this.dispatch('FETCH_DETAIL', id)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.response.status + err.response.statusText
          })
        })
    },
    FETCH_ANSWER(context, id) {
      context.commit('CHANGE_ID', id)
      axios
        .get(`${this.state.baseUrl}/answer/${id}`)
        .then(results => {
          context.commit('FILL_ANSWER', results.data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.response.status + err.response.statusText
          })
        })
    },
    CREATE_ANSWER(context, data) {
      axios
        .post(`${this.state.baseUrl}/answer/${this.state.questionId}`, data, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(result => {
          Swal.fire('Success', 'Answer Created', 'success')
          this.dispatch('FETCH_ANSWER', this.state.questionId)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.response.status + ' ' + err.response.statusText
          })
        })
    },
    UPVOTE_ANSWER(context, id) {
      axios
        .patch(
          `${this.state.baseUrl}/answer/upvote/${id}`,
          { id: id },
          {
            headers: { token: localStorage.getItem('token') }
          }
        )
        .then(result => {
          this.dispatch('FETCH_DETAIL', this.state.questionId)
          this.dispatch('FETCH_ANSWER', this.state.questionId)
        })
        .catch(err => {
          console.log(err.response)
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.response.status + ' ' + err.response.statusText
          })
        })
    },
    DOWNVOTE_ANSWER(context, id) {
      axios
        .patch(
          `${this.state.baseUrl}/answer/downvote/${id}`,
          { id: id },
          {
            headers: { token: localStorage.getItem('token') }
          }
        )
        .then(result => {
          this.dispatch('FETCH_DETAIL', this.state.questionId)
          this.dispatch('FETCH_ANSWER', this.state.questionId)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.response.status + err.response.statusText
          })
        })
    },
    EDIT_ANSWER(context, data) {
      const id = this.state.editData._id
      axios
        .put(`${this.state.baseUrl}/answer/${id}`, data, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(result => {
          Swal.fire('Success', 'Your answer updated', 'success')
          this.dispatch('FETCH_DETAIL', this.state.questionId)
          this.dispatch('FETCH_ANSWER', this.state.questionId)
        })
        .catch(err => {
          console.log(err.response)
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.response.status + err.response.statusText
          })
        })
    },
    EDIT_QUESTION(context, data) {
      const id = this.state.questionId
      axios
        .put(`${this.state.baseUrl}/question/${id}`, data, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(result => {
          Swal.fire('Success', 'Your answer updated', 'success')
          this.dispatch('FETCH_DETAIL', this.state.questionId)
        })
        .catch(err => {
          console.log(err.response)
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: err.response.status + err.response.statusText
          })
        })
    }
  },
  modules: {}
})
