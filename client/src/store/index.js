import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions : [],
    oneQuestion : {},
    answers : [],
    loginStatus : false
  },
  mutations: {
    PUSH_QUESTION(state, question){
      state.questions.push(question)
    },
    SET_QUESTIONS(state, questions){
      state.questions = questions
    },
    SET_ONE_QUESTION(state, oneQuestion){
      state.oneQuestion = oneQuestion
    },
    SET_ANSWERS(state,answers){
      state.answers = answers
    },
    PUSH_ANSWER(state,payload){
      state.answers.push(payload)
    },
    SET_LOGIN_STATUS(state, loginStatus){
      state.loginStatus = loginStatus
    },
  },
  actions: {
    submitQuestion(context, question){
      console.log('masuk ke function submitQUestion')
      console.log(question)
      axios({
        url : 'http://localhost:3000/questions/',
        method : 'post',
        headers : {
          token : localStorage.token
        },
        data : question
      })
      .then(({data})=>{
        console.log('berhasil ask question')
        context.commit('PUSH_QUESTION', data)
        swal.fire('Question asked!')
        router.push('/')
      })
      .catch(err => {
        swal.fire('oops, something went wrong : '+ err.response.data)
        console.log(err)
      })
    },
    fetchData(context){
      axios({
        url : 'http://localhost:3000/questions/',
        method : 'get',
        headers : {
          token : localStorage.token
        }
      })
      .then(({data})=>{
        console.log('berhasil fetch data')
        context.commit('SET_QUESTIONS', data)
      })
      .catch(err => {
        swal.fire('oops, something went wrong : '+ err.response.data)
        console.log(err)
      })
    },
    fetchOneQuestion(context, id){
      axios({
        url : 'http://localhost:3000/questions/'+id,
        method : 'get',
        headers : {
          token : localStorage.token
        }
      })
      .then(({data})=>{
        console.log('berhasil fetch one data')
        console.log(data)
        context.commit('SET_ONE_QUESTION', data.question)
        context.commit('SET_ANSWERS', data.answers)
      })
      .catch(err => {
        swal.fire('oops, something went wrong : '+ err.response.data)
        console.log(err)
      })
    },
    postAnswer(context, payload){
      axios({
        url : 'http://localhost:3000/answers/',
        method : 'post',
        headers : {
          token : localStorage.token
        },
        data : payload
      })
      .then(({data})=>{
        context.commit('PUSH_ANSWER', data)
        swal.fire('answer posted!')
      })
      .catch(err => {
        swal.fire('Oops something went wrong : '+err.response.data)
        console.log(err)
      })
    },
    login(context,userData){
      if(userData.email === '' || userData.password === ''){
        swal.fire('username and password is required')
        return
      }
      axios({
        url : 'http://localhost:3000/users/login',
        method : 'post',
        data : {
          email : userData.email,
          password : userData.password
        }
      })
      .then(({data})=>{
        console.log(data.user)
        swal.fire('Welcome back!')
        localStorage.token = data.token
        localStorage.user = data.user
        router.push('/home')
        context.commit('SET_USER', data.email)
        context.commit('SET_LOGIN_STATUS', true)
      })
      .catch(({response}) => {
        swal.fire(`${response.data}`)
        console.log(response.data)
      })
    },
    register(context,userData){
      if(userData.email === '' || userData.password === ''){
        swal.fire('username and password is required')
        return
      }
      axios({
        url : 'http://localhost:3000/users/register',
        method : 'post',
        data : {
          email : userData.email,
          password : userData.password
        }
      })
      .then(({data})=>{
        swal.fire('Welcome! Please Log In')
      })
      .catch(({response}) => {
        swal.fire(`${response.data}`)
        console.log(response.data)
      })
    },
    logout(context){
      localStorage.clear()
      context.commit('SET_LOGIN_STATUS', false)
      router.push('/')
    },
    deleteQuestion(state, id){
      axios({
        url : 'http://localhost:3000/questions/'+id,
        method : 'delete',
        headers : {
          token : localStorage.token
        }
      })
      .then(({data})=>{
        console.log(data)
        swal.fire('Deleted the question')
        router.push('/home')
      })
      .catch(err => {
        console.log(err)
        swal.fire('oops, something went wrong')
      })
    }
  },
  modules: {
  }
})
