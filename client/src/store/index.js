import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from '../config/axios.config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: '',
    isSuccess: 0,
    isError: 0,
    successMessage: [],
    errorMessage: [],
    questions: [],
    answers: [],
    question: {
      upvotes: [],
      downvotes: [],
      tags: [],
      _id: '',
      title: '',
      description: '',
      UserId: {
        username: ''
      },
      createdAt: '',
      updatedAt: ''
    },
    token: '',
    watchedTags: []
  },
  mutations: {
    SET_LOCALSTORAGE(state, payload){
      localStorage.setItem('access_token', payload.token)
      localStorage.setItem('username', payload.username)
      state.token = payload.token
    },
    SET_LOGIN(state){
      state.isLogin = true
      state.token = localStorage.getItem('access_token')
      state.username = localStorage.getItem('username')
    },
    LOGOUT(state){
      state.isLogin = false,
      state.token = ''
      localStorage.removeItem('access_token')
      router.push('/')
    },
    SET_SUCCESS(state, {time, message}){
      state.isSuccess = time
      if (message){
        state.successMessage = message
      }
    },
    SET_ERROR(state, {time, message}){
      state.isError = time
      if (message){
        state.errorMessage = message
      }
    },
    SET_QUESTIONS(state, questions){
      state.questions = questions
    },
    SET_QUESTION(state, question){
      state.question = question
    },
    SET_ANSWERS(state, answers){
      state.answers = answers
    },
    SET_USER_TAG(state, tags){
      state.watchedTags = tags
    }
  },
  actions: {
    LOGIN({commit}, payload){
      return axios({
        method: 'POST',
        url: '/users/login',
        data: payload
      })
      .then(({data}) => {
        commit('SET_SUCCESS', {time: 1, message: ['Login success']})
        commit('SET_LOCALSTORAGE', data)
        commit('SET_LOGIN')
        router.push('/home')
      })
      .catch((err) => {
        commit('SET_ERROR', {time: 2, message: err.response.data.errors})
      })
    },
    REGISTER({commit}, payload){
      return axios({
        method: 'POST',
        url: '/users/register',
        data: payload
      })
      .then(({data}) => {
        commit('SET_SUCCESS', {time: 1, message: ['Register success']})
        commit('SET_LOGIN')
        commit('SET_LOCALSTORAGE', data)
        router.push('/home')
      })
      .catch((err) => {
        commit('SET_ERROR', {time: 2, message: err.response.data.errors})
      })
    },
    GET_QUESTION({commit}){
      axios({
        method: 'GET',
        url: '/questions'
      })
      .then(({data}) => {
        commit('SET_QUESTIONS', data)
      })
      .catch((err) => {
        commit('SET_ERROR', {time: 2, message: err.response.data.errors})
      })
    },
    GET_ONE_QUESTION({commit, dispatch}, questionId){
      axios({
        method: 'GET',
        url: `/questions/${questionId}`,
      })
      .then(({data}) => {
        commit('SET_QUESTION', data)
        dispatch('GET_ANSWER', data._id)
      })
      .catch((err) => {
        commit('SET_ERROR', {time: 2, message: err.response.data.errors})
      })
    },
    POST_QUESTION({commit, dispatch, state}, question){
      axios({
        method: 'POST',
        url: '/questions',
        data: question,
        headers: {
          token: state.token
        }
      })
      .then(() => {
        dispatch('GET_QUESTION')
        router.push('/home')
      })
      .catch((err) => {
        commit('SET_ERROR', {time: 2, message: err.response.data.errors})
      })
    },
    EDIT_QUESTION({commit, dispatch, state}, question){
      axios({
        method: 'PATCH',
        url: `/questions/${question.questionId}`,
        data: question,
        headers: {
          token: state.token
        }
      })
      .then(() => {
        dispatch('GET_QUESTION')
        router.push('/home')
      })
      .catch((err) => {
        commit('SET_ERROR', {time: 2, message: err.response.data.errors})
      })
    },
    DELETE_QUESTION({commit, state, dispatch}, questionId){
      axios({
        method: 'DELETE',
        url: `/questions/${questionId}`,
        headers: {
          token: state.token
        }
      })
      .then(() => {
        dispatch('GET_QUESTION')
        router.push('/home')
      })
      .catch((err) => {
        commit('SET_ERROR', {time: 2, message: err.response.data.errors})
      })
    },
    GET_ANSWER({commit}, questionId){
      axios({
        method: 'GET',
        url: `/answers/${questionId}`
      })
      .then(({data}) => {
        commit('SET_ANSWERS', data)
      })
      .catch((err) => {
        commit('SET_ERROR', {time: 2, message: err.response.data.errors})
      })
    },
    POST_ANSWER({commit, state, dispatch}, payload){
      axios({
        method: 'POST',
        url: `/answers/${payload.questionId}`,
        data: payload,
        headers: {
          token: state.token
        }
      })
      .then(() => {
        dispatch('GET_ONE_QUESTION', payload.questionId)
        router.push(`/detail/${payload.questionId}`)
      })
      .catch((err) => {
        commit('SET_ERROR', {time: 2, message: err.response.data.errors})
      })
    },
    EDIT_ANSWER({commit, state, dispatch}, payload){
      axios({
        method: 'PATCH',
        url: `/answers/${payload.answerId}`,
        data: payload,
        headers: {
          token: state.token
        }
      })
      .then(() => {
        dispatch('GET_ONE_QUESTION', payload.questionId)
      })
      .catch((err) => {
        commit('SET_ERROR', {time: 2, message: err.response.data.errors})
      })
    },
    VOTE_ANSWER({commit, state, dispatch}, payload){
      axios({
        method: 'POST',
        url: `/answers/vote/${payload.answerId}`,
        data: {
          type: payload.type
        },
        headers: {
          token: state.token
        }
      })
      .then(() => {
        dispatch('GET_ONE_QUESTION', payload.questionId)
      })
      .catch((err) => {
        commit('SET_ERROR', {time: 2, message: err.response.data.errors})
      })
    },
    VOTE_QUESTION({commit, state, dispatch}, payload){
      axios({
        method: 'POST',
        url: `/questions/vote/${payload.questionId}`,
        data: {
          type: payload.type
        },
        headers: {
          token: state.token
        }
      })
      .then(() => {
        dispatch('GET_ONE_QUESTION', payload.questionId)
      })
      .catch((err) => {
        commit('SET_ERROR', {time: 2, message: err.response.data.errors})
      })
    },
    GET_USER_TAG({state, commit}){
      axios({
        method: 'GET',
        url: `/users/tags`,
        headers: {
          token: state.token
        }
      })
      .then(({data}) => {
        commit('SET_USER_TAG', data)
      })
      .catch((err) => {
        commit('SET_ERROR', {time: 2, message: err.response.data.errors})
      })
    },
    ADD_USER_TAG({state, commit}, newTag){
      let tags = state.watchedTags
      if (!tags.includes(newTag)){
        tags.push(newTag)
        axios({
          method: 'POST',
          url: '/users/tags',
          data: {
            tags
          },
          headers: {
            token: state.token
          }
        })
        .then(({data}) => {
          commit('SET_USER_TAG', data)
        })
        .catch((err) => {
          commit('SET_ERROR', {time: 2, message: err.response.data.errors})
        })
      }
    },
    REMOVE_USER_TAG({state, commit}, removeTag){
      let tags = state.watchedTags
      let newTags = tags.filter((el) => {
        return el != removeTag
      })
      axios({
          method: 'POST',
          url: '/users/tags',
          data: {
            tags: newTags
          },
          headers: {
            token: state.token
          }
        })
        .then(({data}) => {
          commit('SET_USER_TAG', data)
        })
        .catch((err) => {
          commit('SET_ERROR', {time: 2, message: err.response.data.errors})
        })
    }
  },
  modules: {
  }
})
