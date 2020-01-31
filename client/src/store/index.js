import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isLogin: false,
    listQuestion: [],
    questionDetail: {},
    answerById: [],
    allAnswer: []
  },
  mutations: {
    CHANGE_STATE_LOGIN(state, payload) {
      state.isLogin = payload
    },
    FETCH_LIST_QUESTION(state, payload) {
      state.listQuestion = payload
    },
    GET_QUESTION_DETAIL(state, payload) {
      state.questionDetail = payload
    },
    GET_ANSWER_BYQUESTION(state, paylod) {
      state.answerById = paylod
    },
    GET_ALL_ANSWER(state, payload) {
      state.allAnswer = payload
    }
  },
  actions: {
    register({ commit }, payload) {
      axios
        .post('http://13.229.218.165:3000/users/register', {
          name: payload.name,
          username: payload.username,
          email: payload.email,
          password: payload.password
        })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Successfully Registered'
          })
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.id)
          commit('CHANGE_STATE_LOGIN', true)
          router.push('/questions')
        })
    },
    login({ commit }, payload) {
      axios
        .post('http://13.229.218.165:3000/users/login', {
          email: payload.email,
          password: payload.password
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.id)
          commit('CHANGE_STATE_LOGIN', true)
          router.push('/questions')
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Something Wrong',
            text: response.data.message
          })
        })
    },
    addQuestion({ commit }, payload) {
      axios
        .post(
          'http://13.229.218.165:3000/questions/',
          {
            title: payload.title,
            description: payload.description
          },
          {
            headers: {
              token: localStorage.getItem('token')
            }
          }
        )
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Question Has been posted, Please Wait for Answer'
          })
          router.push('/questions')
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Something Wrong',
            text: response.data.message
          })
        })
    },
    fetch_question({ commit }) {
      axios
        .get('http://13.229.218.165:3000/questions')
        .then(({ data }) => {
          commit('FETCH_LIST_QUESTION', data)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            text: response.data.message
          })
        })
    },
    question_detail({ commit }, payload) {
      axios
        .get('http://13.229.218.165:3000/questions/' + payload)
        .then(({ data }) => {
          commit('GET_QUESTION_DETAIL', data)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Something Wrong',
            text: response.data.message
          })
        })
    },
    fetch_answer({ commit }, payload) {
      axios
        .get('http://13.229.218.165:3000/answers/' + payload)
        .then(({ data }) => {
          commit('GET_ANSWER_BYQUESTION', data)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Something Wrong',
            text: response.data.message
          })
        })
    },
    fetch_allanswer({ commit }, payload) {
      axios
        .get('http://13.229.218.165:3000/answers/')
        .then(({ data }) => {
          commit('GET_ALL_ANSWER', data)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Something Wrong',
            text: response.data.message
          })
        })
    },
    post_answer({ commit }, payload) {
      axios
        .post(
          'http://13.229.218.165:3000/answers/',
          {
            description: payload.description,
            questionId: payload.questionId
          },
          {
            headers: {
              token: localStorage.getItem('token')
            }
          }
        )
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Answer Success',
            text: 'Thankyou for helping by Answer the Question'
          })
          this.dispatch('fetch_answer', payload.questionId)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            text: response.data.message,
            title: 'Something Wrong'
          })
        })
    },
    upvote_question({ commit }, payload) {
      axios
        .patch(
          'http://13.229.218.165:3000/questions/upvote/' + payload,
          {},
          {
            headers: {
              token: localStorage.getItem('token')
            }
          }
        )
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Vote Success'
          })
          this.dispatch('question_detail', payload)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.data.message
          })
        })
    },
    downvote_question({ commit }, payload) {
      axios
        .patch(
          'http://13.229.218.165:3000/questions/downvote/' + payload,
          {},
          {
            headers: {
              token: localStorage.getItem('token')
            }
          }
        )
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Vote Success'
          })
          this.dispatch('question_detail', payload)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.data.message
          })
        })
    },
    upvote_answer({ commit }, payload) {
      axios
        .patch(
          'http://13.229.218.165:3000/answers/upvote/' + payload.id,
          {},
          {
            headers: {
              token: localStorage.getItem('token')
            }
          }
        )
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Vote Success'
          })
          this.dispatch('fetch_answer', payload.questionId)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.data.message
          })
        })
    },
    downvote_answer({ commit }, payload) {
      axios
        .patch(
          'http://13.229.218.165:3000/answers/downvote/' + payload.id,
          {},
          {
            headers: {
              token: localStorage.getItem('token')
            }
          }
        )
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Vote Success'
          })
          this.dispatch('fetch_answer', payload.questionId)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.data.message
          })
        })
    },
    delete_question({ commit }, payload) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {
          axios
            .delete('http://13.229.218.165:3000/questions/' + payload, {
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(() => {
              Swal.fire('Deleted!', 'Question Has Been Deleted', 'success')
              router.push('/questions')
            })
            .catch(({ response }) => {
              Swal.fire({
                icon: 'error',
                title: 'Something Wrong',
                text: response.data.message
              })
            })
        }
      })
    },
    edit_question({ commit }, payload) {
      axios
        .put(
          'http://13.229.218.165:3000/questions/' + payload.id,
          {
            title: payload.title,
            description: payload.description
          },
          {
            headers: {
              token: localStorage.getItem('token')
            }
          }
        )
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Edit Success',
            text: 'Successfully Edited Question'
          })
          this.dispatch('question_detail', payload.id)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Something Wrong',
            text: response.data.message
          })
        })
    },
    edit_answer({ commit }, payload) {
      axios
        .put(
          'http://13.229.218.165:3000/answers/' + payload.id,
          {
            description: payload.description
          },
          {
            headers: {
              token: localStorage.getItem('token')
            }
          }
        )
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Edit Success',
            text: 'Successfully Edited Question'
          })
          this.dispatch('fetch_answer', payload.questionId)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Something Wrong',
            text: response.data.message
          })
        })
    }
  },
  modules: {}
})
