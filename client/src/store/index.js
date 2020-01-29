import Vue from 'vue'
import Vuex, { mapGetters } from 'vuex'
import axios from '../../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inputEmail:'',
    inputPassword:'',
    isLogin:false,
    loggedUsername: '',
    questionData:[]


  },
  mutations: {
    UPDATE_EMAIL(state,payload){
      state.inputEmail = payload
      // console.log("TCL: UPDATE_EMAIL -> state.inputEmail", state.inputEmail)
    },
    UPDATE_PASSWORD(state,payload){
      state.inputPassword = payload
      // console.log("TCL: UPDATE_PASSWORD -> state.inputPassword ", state.inputPassword )
    },
    SET_QUESTION_DATA(state,payload){
      state.questionData = payload
      // console.log("TCL: SET_QUESTION_DATA -> state.questionData @store/index", state.questionData )
    },
    SET_IS_LOGIN(state,payload){
      if( localStorage.getItem('access_token') )
        {
          state.isLogin = true
        }
      else
        {
          state.isLogin = false
        }
      // console.log("TCL: SET_IS_LOGIN -> state.isLogin  @store/index", state.isLogin)
    },
    SET_LOGGED_USERNAME(state,payload){
      if( localStorage.getItem('username') )
        {
          state.loggedUsername = localStorage.getItem('username')
        }
      else
        {
          state.loggedUsername = ''
        }
    }
      

    


  },
  actions: {
    fetchQuestionData(commit, payload)
      {
        axios({
            method: 'get',
            url: '/questions'
        })
        .then(result=>{
          console.log("TCL: result @store/index", result.data)
          this.commit('SET_QUESTION_DATA', result.data)
        })
        .catch(err=>{
          console.log("TCL: err @store/index ", err.response.data)
        })

      }

  },
  modules: {



  },
  getters:{
    inputEmail: state=>{
      return state.inputEmail
    },
    inputPassword: state=>{
      return state.inputPassword
    },
    questionData: state=>{
      return state.questionData
    },
    isLogin: state=>{
      return state.isLogin
    },
    loggedUsername: state=>{
      return state.loggedUsername
    }
  }
  
})
