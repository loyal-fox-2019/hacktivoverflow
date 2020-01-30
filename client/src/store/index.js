import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from 'axios'
import swal from 'sweetalert2';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    questions: [],
    payloadUser: '',
    question: {},
    answers: [],
    answer: {}
  },
  mutations: {
    CHANGE_IS_LOGGED_IN(state, payload) {
      state.isLoggedIn = payload;
    },
    CHANGE_QUESTIONS(state, payload) {
      state.questions = payload;
    },
    ADD_QUESTIONS(state, payload) {
      state.questions.push(payload);
    },
    CHANGE_PAYLOAD_USER(state, payload) {
      state.payloadUser = payload;
    },
    CHANGE_QUESTION(state, payload) {
      state.question = payload;
    },
    CHANGE_ANSWERS(state, payload) {
      state.answers = payload;
    },
    ADD_FIELDS_IN_QUESTION(state, payload) {
      state.question.totalAnswer = payload;
    },
    ADD_ANSWERS(state, payload) {
      state.answers.push(payload);
    },
    UPDATE_QUESTIONS(state, payload) {
      state.questions.forEach(question => {
        if(question._id == payload._id) {
          question = payload
        }
      })
    },
    DELETE_QUESTIONS(state, payload) {
      const newQuestions = state.questions.filter(question => {return question._id != payload._id});
      state.questions = newQuestions;
    },
    UPDATE_QUESTION(state, payload) {
      state.question = payload;
    },
    CHANGE_ANSWER(state, payload) {
      state.answer = payload;
    },
    DELETE_ANSWERS(state, payload) {
      const newAnswer = state.answers.filter(answer => {
        return answer._id != payload._id
      })
      state.answers = newAnswer;
    },
    UPDATE_ANSWERS(state, payload) {
      state.answers = state.answers.map(function(answer) {
        if (answer._id == payload._id)
          return payload;
        return answer;
      });
    }
  },
  actions: {
    register({commit}, payload) {
      axios({
        method: 'post',
        url: 'http://18.218.235.90:3000/user/register',
        data: {
          email: payload.email,
          name: payload.name,
          password: payload.password
        }
      })
      .then(response => {
        return axios({
          method: 'post',
          url: 'http://18.218.235.90:3000/user/login',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
      })
      .then(response => {
        swal.fire({
          icon: 'success',
          title: 'Register Successful'
        })
        localStorage.setItem('token', response.data.body);
        commit('CHANGE_IS_LOGGED_IN', true);
        router.push({path: '/post'});
      })
      .catch(error => {
        const errorRespond = {error};
        if(Array.isArray(errorRespond.error.response.data.errors)) {
          swal.fire({
            icon: 'error',
            title: 'Register failed',
            text: `${errorRespond.error.response.data.errors[0]}`
          }) 
        } else {
          swal.fire({
            icon: 'error',
            title: 'Register failed',
            text: `${errorRespond.error.response.data.errors}`
          })
        }
      })
    },
    login({commit}, payload) {
      axios({
        method: 'post',
        url: 'http://18.218.235.90:3000/user/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
      .then(response => {
        swal.fire({
          icon: 'success',
          title: 'Login Successful'
        })
        localStorage.setItem('token', response.data.body);
        commit('CHANGE_IS_LOGGED_IN', true);
        router.push({path: '/post'});
      })
      .catch(error => {
        const errorRespond = {error};
        if(Array.isArray(errorRespond.error.response.data.errors)) {
          swal.fire({
            icon: 'error',
            title: 'Login failed',
            text: `${errorRespond.error.response.data.errors[0]}`
          }) 
        } else {
          swal.fire({
            icon: 'error',
            title: 'Login failed',
            text: `${errorRespond.error.response.data.errors}`
          })
        }
      })
    },
    getQuestions({ commit }) {
      axios({
        method: 'get',
        url: 'http://18.218.235.90:3000/question'
      })
      .then(response => {
        const questions = response.data.body;
        commit('CHANGE_QUESTIONS', questions);
      })
      .catch(error => {
        const errorRespond = {error};
        if(Array.isArray(errorRespond.error.response.data.errors)) {
          swal.fire({
            icon: 'error',
            title: 'Get data failed',
            text: `${errorRespond.error.response.data.errors[0]}`
          }) 
        } else {
          swal.fire({
            icon: 'error',
            title: 'Get data failed',
            text: `${errorRespond.error.response.data.errors}`
          })
        }
      })
    },
    createQuestion({ commit }, payload) {
      axios({
        method: 'post',
        url: 'http://18.218.235.90:3000/question',
        data: {
          title: payload.title,
          description: payload.description
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        const question = response.data.body;
        commit('ADD_QUESTIONS', question);
        router.push({path: '/post'})
      })
      .catch(error => {
        const errorRespond = {error};
        if(Array.isArray(errorRespond.error.response.data.errors)) {
          swal.fire({
            icon: 'error',
            title: 'Failed to post a question',
            text: `${errorRespond.error.response.data.errors[0]}`
          }) 
        } else {
          swal.fire({
            icon: 'error',
            title: 'Failed to post a question',
            text: `${errorRespond.error.response.data.errors}`
          })
        }
      })
    },
    getPayloadUser({ commit }) {
      axios({
        method: 'get',
        url: 'http://18.218.235.90:3000/user/payload',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        const id = response.data.body;
        commit('CHANGE_PAYLOAD_USER', id);
      })
      .catch(error => {
        console.log({error});
      })
    },
    getDetailQuestion({ commit }, id) {
      axios({
        method: 'get',
        url: `http://18.218.235.90:3000/question/${id}`,
      })
      .then(response => {
        const question = response.data.body
        commit('CHANGE_QUESTION', question);
      })
      .catch(error => {
        const errorRespond = {error};
        if(Array.isArray(errorRespond.error.response.data.errors)) {
          swal.fire({
            icon: 'error',
            title: 'Failed to get question',
            text: `${errorRespond.error.response.data.errors[0]}`
          }) 
        } else {
          swal.fire({
            icon: 'error',
            title: 'Failed to get question',
            text: `${errorRespond.error.response.data.errors}`
          })
        }
      })
    },
    getAnswers({ commit }, id) {
      axios({
        method: 'get',
        url: `http://18.218.235.90:3000/answer/${id}`
      })
      .then(response => {
        const answers = response.data.body;
        commit('CHANGE_ANSWERS', answers)
      })
      .catch(error => {
        const errorRespond = {error};
        if(Array.isArray(errorRespond.error.response.data.errors)) {
          swal.fire({
            icon: 'error',
            title: 'Failed to get question',
            text: `${errorRespond.error.response.data.errors[0]}`
          }) 
        } else {
          swal.fire({
            icon: 'error',
            title: 'Failed to get question',
            text: `${errorRespond.error.response.data.errors}`
          })
        }
      })
    },
    postAnswer({ commit }, payload) {
      axios({
        method: 'post',
        url: `http://18.218.235.90:3000/answer/${payload.id}`,
        data: {
          title: payload.title,
          description: payload.description
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        swal.fire({
          icon: 'success',
          title: 'Your answer have been submitted'
        })
        const answer = response.data.body;
        commit('ADD_ANSWERS', answer)
      })
      .catch(error => {
        const errorRespond = {error};
        if(Array.isArray(errorRespond.error.response.data.errors)) {
          swal.fire({
            icon: 'error',
            title: 'Failed to get question',
            text: `${errorRespond.error.response.data.errors[0]}`
          }) 
        } else {
          swal.fire({
            icon: 'error',
            title: 'Failed to get question',
            text: `${errorRespond.error.response.data.errors}`
          })
        }
      })
    },
    updateQuestion({ commit }, payload) {
      axios({
        method: 'put',
        url: `http://18.218.235.90:3000/question/${payload.id}`,
        data: {
          title: payload.title,
          description: payload.description
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        const question = response.data.body
        swal.fire({
          icon: 'success',
          title: 'Your question have been updated'
        })
        commit('UPDATE_QUESTIONS', question);
        router.push({path: '/post'})
      })
      .catch(error => {
        const errorRespond = {error};
        if(Array.isArray(errorRespond.error.response.data.errors)) {
          swal.fire({
            icon: 'error',
            title: 'Failed to get question',
            text: `${errorRespond.error.response.data.errors[0]}`
          }) 
        } else {
          swal.fire({
            icon: 'error',
            title: 'Failed to get question',
            text: `${errorRespond.error.response.data.errors}`
          })
        }
      })
    },
    deleteQuestion({ commit }, id) {
      axios({
        method: 'delete',
        url: `http://18.218.235.90:3000/question/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        const question = response.data.body;
        swal.fire({
          icon: 'success',
          title: 'Your question have been deleted'
        })
        commit('DELETE_QUESTIONS', question);
      })
      .catch(error => {
        const errorRespond = {error};
        if(Array.isArray(errorRespond.error.response.data.errors)) {
          swal.fire({
            icon: 'error',
            title: 'Failed to get question',
            text: `${errorRespond.error.response.data.errors[0]}`
          }) 
        } else {
          swal.fire({
            icon: 'error',
            title: 'Failed to get question',
            text: `${errorRespond.error.response.data.errors}`
          })
        }
      })
    },
    downVotesQuestion({ commit }, id) {
      axios({
        method: 'patch',
        url: `http://18.218.235.90:3000/question/downvotes/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        commit(`UPDATE_QUESTION`, response.data.body);
      })
      .catch(error => {
        const errorRespond = {error};
        if(Array.isArray(errorRespond.error.response.data.errors)) {
          swal.fire({
            icon: 'error',
            title: 'Failed to downvotes question',
            text: `${errorRespond.error.response.data.errors[0]}`
          }) 
        } else {
          swal.fire({
            icon: 'error',
            title: 'Failed to downvotes question',
            text: `${errorRespond.error.response.data.errors}`
          })
        }
      })
    },
    upVotesQuestion({ commit }, id) {
      axios({
        method: 'patch',
        url: `http://18.218.235.90:3000/question/upvotes/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        commit(`UPDATE_QUESTION`, response.data.body);
      })
      .catch(error => {
        const errorRespond = {error};
        if(Array.isArray(errorRespond.error.response.data.errors)) {
          swal.fire({
            icon: 'error',
            title: 'Failed to upvotes question',
            text: `${errorRespond.error.response.data.errors[0]}`
          }) 
        } else {
          swal.fire({
            icon: 'error',
            title: 'Failed to upvotes question',
            text: `${errorRespond.error.response.data.errors}`
          })
        }
      })
    },
    getAnswer({ commit }, id) {
      axios({
        method: 'get',
        url: `http://18.218.235.90:3000/answer/findAnswer/${id}`
      })
      .then(response => {
        const answer = response.data.body;
        commit('CHANGE_ANSWER', answer);
      })
      .catch(error => {
        console.log({error});
      })
    },
    updateAnswer({ commit }, payload) {
      axios({
        method: 'put',
        url: `http://18.218.235.90:3000/answer/${payload.id}`,
        data: {
          title: payload.title,
          description: payload.description
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        swal.fire({
          icon: 'success',
          title: 'Your answer have been updated'
        })
        const questionId = response.data.body.questionId;
        const pathToPost = `/detail-question/${questionId}`
        router.push({path: pathToPost});
      })
      .catch(error => {
        const errorRespond = {error};
        if(Array.isArray(errorRespond.error.response.data.errors)) {
          swal.fire({
            icon: 'error',
            title: 'Failed to upvotes question',
            text: `${errorRespond.error.response.data.errors[0]}`
          }) 
        } else {
          swal.fire({
            icon: 'error',
            title: 'Failed to upvotes question',
            text: `${errorRespond.error.response.data.errors}`
          })
        }
      })
    },
    deleteAnswer({ commit }, id) {
      axios({
        method: 'delete',
        url: `http://18.218.235.90:3000/answer/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        const answer = response.data.body;
        commit('DELETE_ANSWERS', answer);
      })
      .catch(error => {
        const errorRespond = {error};
        if(Array.isArray(errorRespond.error.response.data.errors)) {
          swal.fire({
            icon: 'error',
            title: 'Failed to upvotes question',
            text: `${errorRespond.error.response.data.errors[0]}`
          }) 
        } else {
          swal.fire({
            icon: 'error',
            title: 'Failed to upvotes question',
            text: `${errorRespond.error.response.data.errors}`
          })
        }
      })
    },
    downVotesAnswer({ commit }, id) {
      axios({
        method: 'patch',
        url: `http://18.218.235.90:3000/answer/downvotes/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        const newAnswer = response.data.body;
        commit('UPDATE_ANSWERS', newAnswer);
      })
      .catch(error => {
        const errorRespond = {error};
        if(Array.isArray(errorRespond.error.response.data.errors)) {
          swal.fire({
            icon: 'error',
            title: 'Failed to upvotes question',
            text: `${errorRespond.error.response.data.errors[0]}`
          }) 
        } else {
          swal.fire({
            icon: 'error',
            title: 'Failed to upvotes question',
            text: `${errorRespond.error.response.data.errors}`
          })
        }
      })
    },
    upVotesAnswer({ commit }, id) {
      axios({
        method: 'patch',
        url: `http://18.218.235.90:3000/answer/upvotes/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        const newAnswer = response.data.body;
        commit('UPDATE_ANSWERS', newAnswer);
      })
      .catch(error => {
        const errorRespond = {error};
        if(Array.isArray(errorRespond.error.response.data.errors)) {
          swal.fire({
            icon: 'error',
            title: 'Failed to upvotes question',
            text: `${errorRespond.error.response.data.errors[0]}`
          }) 
        } else {
          swal.fire({
            icon: 'error',
            title: 'Failed to upvotes question',
            text: `${errorRespond.error.response.data.errors}`
          })
        }
      })
    }
  },
  modules: {
  }
})
