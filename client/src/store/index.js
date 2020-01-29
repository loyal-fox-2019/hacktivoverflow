import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isLoading: false,
    username: '',
    userId: localStorage.getItem('userId'),
    questionList: [],
    questionFiltered: [],
    selectedQuestion: {},
    selectedAnswers: []
  },
  mutations: {
    SET_ISLOGIN_TRUE(state){
      state.isLogin = true
    },
    SET_ISLOGIN_FALSE(state){
      state.isLogin = false
    },
    SET_ISLOADING_TRUE(state){
      state.isLoading = true
    },
    SET_ISLOADING_FALSE(state){
      state.isLoading = false
    },
    SET_USERNAME(state){
      state.username = localStorage.getItem('username')
    },
    SET_QUESTION_LIST(state, payload){
      state.questionList = payload
    },
    SET_QUESTION_FILTERED(state, payload){
      state.questionFiltered = payload
    },
    SET_SELECTED_QUESTION(state, payload){
      state.selectedQuestion = payload
    },
    SET_SELECTED_ANSWERS(state, payload){
      state.selectedAnswers = payload
    },
    SET_USERID(state, payload){
      state.userId = payload
    }
  },
  actions: {
    deleteQuestion(context, payload){
      axios({
        method: 'delete',
        url: `http://localhost:3000/question/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(()=>{
        Swal.fire({
          icon: 'success',
          title: 'Post deleted!',
          timer: 1500
        })
        router.push('/')
      })
      .catch(err=>{
        Swal.fire({
          icon: 'error',
          text: err.response.data.message
        })
      })
    },
    submitAnswer(context, payload){
      let {title, description, questionId} = payload
      axios({
        method: 'post',
        url: 'http://localhost:3000/answer',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title,
          description,
          questionId
        }
      })
      .then(()=>{
        Swal.fire({
          icon: 'success',
          title: 'Answer posted!',
          timer: 1500
        })
        context.dispatch('fetchAnswers', questionId)
      })
      .catch(err=>{
        let errMessage = ''
        for(let message of err.response.data.errors){
          errMessage += `${message}<br>`
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: errMessage
        })
      })  
    },
    fetchAnswers(context, payload){
      axios({
        method: 'get',
        url: `http://localhost:3000/answer/${payload}`
      })
      .then(({data})=>{
        context.commit('SET_SELECTED_ANSWERS', data)
      })
    },
    viewDetail(context, payload){
      axios({
        method: 'get',
        url: `http://localhost:3000/question/questionId/${payload}`
      })
      .then(({data})=>{
        context.commit('SET_SELECTED_QUESTION', data)
        router.push(`/detail/${payload}`)
      })
      .catch(err=>{
        Swal.fire({
            icon: 'error',
            text: err.response.data.message
        })
      })
    },
    postQuestion(context, payload){
      let {title, description} = payload
      axios({
        method: 'post',
        url: "http://localhost:3000/question",
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title,
          description
        }
      })
      .then(()=>{
        context.dispatch('fetchQuestions')
        Swal.fire({
          icon: 'success',
          title: 'Question posted!',
          timer: 1500
        })
      })
      .catch(err=>{
        let errMessage = ''
        for(let message of err.response.data.errors){
          errMessage += `${message}<br>`
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: errMessage
        })
      })           
    },
    search(context, payload){
      let temp = []
      for(let obj of this.state.questionList){
        if(obj.title.toLowerCase().includes(payload.toLowerCase())){
          temp.push(obj)
        }
      }
      context.commit('SET_QUESTION_FILTERED', temp)
    },
    fetchQuestions(context){
      axios({
        method: 'get',
        url: "http://localhost:3000/question"
      })
      .then(({data})=>{
        context.commit('SET_QUESTION_LIST', data)
        context.commit('SET_QUESTION_FILTERED', data)
      })
    },
    register(context, registerData){
      context.commit("SET_ISLOADING_TRUE")
      axios({
        method: 'post',
        url: "http://localhost:3000/user/register",
        data: {
          name: registerData.name,
          email: registerData.email,
          password: registerData.password
        }
      })
      .then(({data})=>{
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.username)
        localStorage.setItem('userId', data.userId)
        context.commit('SET_ISLOGIN_TRUE')
        context.commit('SET_ISLOADING_FALSE')
        context.commit('SET_USERNAME')
        context.commit('SET_USERID', data.userId)
        Swal.fire({
          icon: 'success',
          title: 'Registration success!',
          text: 'You are now logged in',
          timer: 1500
        })
      })
      .catch(err=>{
        context.commit('SET_ISLOADING_FALSE')
        let errMessage = ''
        for(let message of err.response.data.errors){
          errMessage += `${message}<br>`
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: errMessage
        })
      })
    },
    login(context, loginData){
      context.commit("SET_ISLOADING_TRUE")
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
          email: loginData.email,
          password: loginData.password
        }
      })
      .then(({data})=>{
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.username)
        localStorage.setItem('userId', data.userId)
        context.commit('SET_ISLOGIN_TRUE')
        context.commit('SET_ISLOADING_FALSE')
        context.commit('SET_USERNAME')
        context.commit('SET_USERID', data.userId)
        Swal.fire({
          icon: 'success',
          title: 'Login success!',
          text: 'You are now logged in',
          timer: 1500
        })
      })
      .catch(err=>{
        context.commit("SET_ISLOADING_FALSE")
        Swal.fire({
          icon: 'error',
          text: err.response.data.message
        })
      })
    }
  },
  modules: {
  }
})
