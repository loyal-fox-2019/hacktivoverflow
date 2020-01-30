import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    allQuestions: [],
    question: {},
    answers: [],
    userquestions: [],
    filtered:[]
  },
  mutations: {
    SET_FILTERED(state,payload){
      state.filtered=payload
    },
    SET_USER_QUESTIONS(state,payload){
      state.userquestions = payload
    },
    SET_ANSWERS(state,payload){
      state.answers = payload
    },
    SET_QUESTION_DETAIL(state,payload){
      state.question = payload
    },
    SET_ALL_QUESTIONS(state,payload){
      state.allQuestions = payload
    },
    SET_REGISTER(state,payload){
      state.user = payload
    },
    SET_LOGIN(state, payload){
      state.user = payload
    },
    SET_USER(state, payload){
      state.user = payload
    }
  },
  actions: {
    updatePicture(context,payload){
      axios({
        method: 'patch',
        url: `http://localhost:3000/user/profile`,
        headers: {
          token: localStorage.getItem('token')
        },
        data:{
          picture: payload.picture,
          _id: payload._id
        }
      })
      .then(({data})=>{
        context.commit('SET_USER', data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    updateAnswer(context,payload){
      axios({
        method: 'put',
        url: `http://localhost:3000/answer/${payload._id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data:{
          title: payload.title,
          description: payload.description
        }
      })
      .then(({data})=>{
        console.log(data, '=======updated')
        context.dispatch('getAnswers', data.question)
      })
    },
    updateQuestion(context, payload){
      axios({
        method: 'put',
        url: `http://localhost:3000/question/${payload._id}`,
        headers:{
          token: localStorage.getItem('token')
        },
        data: {
          title: payload.title,
          description: payload.description
        }
      })
      .then(({data})=>{
        context.dispatch('getUserQuestions')
        context.dispatch('getOneQuestion',data._id)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    deleteQuestion(context,payload){
      axios({
        method: 'delete',
        url: `http://localhost:3000/question/${payload}`,
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then(()=>{
        context.dispatch('getAllQuestions')
        router.push('/')
      })
      .catch(err=>{
        console.log(err)
      })
    },
    getUserQuestions(context){
      axios({
        method: 'get',
        url: `http://localhost:3000/question/user`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        console.log(data, 'user questions')
        context.commit('SET_USER_QUESTIONS', data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    createQuestion(context, payload){
      axios({
        method: 'post',
        url: 'http://localhost:3000/question',
        headers: {
          token: localStorage.getItem('token')
        },
        data:payload
      })
      .then(({data})=>{
        // context.dispatch('getOneQuestion', data)
        console.log(data)
        context.dispatch('getAllQuestions')
        context.dispatch('getUserQuestions')
      })
      .catch(err=>{
        console.log(err)
      })
    },
    createAnswer(context, payload){
      axios({
        method: 'post',
        url:'http://localhost:3000/answer',
        headers:{
          token: localStorage.getItem('token')
        },
        data:{
          questionId: payload.questionId,
          title: payload.title,
          description: payload.description
        }
      })
      .then(({data})=>{
        context.dispatch('getAnswers', data.question)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    downvoteAnswer(context,payload){
      axios({
        method: 'patch',
        url: `http://localhost:3000/answer/downvote/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        context.dispatch('getAnswers', data.question)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    upvoteAnswer(context,payload){
      axios({
        method: 'patch',
        url: `http://localhost:3000/answer/upvote/${payload}`,
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        context.dispatch('getAnswers', data.question)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    downvoteQuestion(context,payload){
      axios({
        method: 'patch',
        url: `http://localhost:3000/question/downvote/${payload}`,
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        context.commit('SET_QUESTION_DETAIL', data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    upvoteQuestion(context,payload){
      console.log('masuk upvote question di stroe', payload)
      axios({
        method: 'patch',
        url: `http://localhost:3000/question/upvote/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        context.commit('SET_QUESTION_DETAIL', data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    getAnswers(context, payload){
      console.log('masuk getanswers')
      axios({
        method: 'get',
        url: `http://localhost:3000/answer/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        context.commit('SET_ANSWERS', data)
      })
    },
    getOneQuestion(context, payload){
      axios({
        method: 'get',
        url: `http://localhost:3000/question/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        context.commit('SET_QUESTION_DETAIL', data)
        // router.push(`/detail/${data._id}`)
      })
    },
    getAllQuestions(context){
      console.log('masuk all questions')
      axios({
        method: 'get',
        url: `http://localhost:3000/question`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        console.log(data, 'all questions')
        context.commit('SET_ALL_QUESTIONS', data)
        context.commit('SET_FILTERED', data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    registerUser(context, payload){
      // console.log('masuk register')
      axios({
          method: 'post',
          url: `http://localhost:3000/user/register`,
          data:payload
      })
      .then(({data})=>{
          localStorage.setItem('token', data.token)
          localStorage.setItem('email', data.payload.email)
          context.commit('SET_REGISTER', data)
          router.push('/')
      })
      .catch(err=>{
          console.log(err)
      })
    },
    loginUser(context,payload){
      console.log('masuk login', router)
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data:payload
      })
      .then(({data})=>{
        localStorage.setItem('token', data.token)
        localStorage.setItem('email', data.payload.email)
        context.commit('SET_LOGIN', data.payload)
        router.push('/')
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },
  modules: {
  }
})
