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
    questionData:[],

    loggedInUserDetail:{},
    searchResultArray: [],
    showEditButton: false


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
    },
    loggedInUserDetail: state=>{
      return state.loggedInUserDetail
    },
    searchResultArray: state=>{
      return state.searchResultArray
    }
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
    },
    SET_LOGGED_IN_USER_DETAIL(state,payload){
      state.loggedInUserDetail = payload
    },
    SET_SEARCH_RESULT_ARRAY(state,payload){
      state.searchResultArray = payload
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

      },
    fetchUserDetail(commit){
        axios({
          method: 'get',
          url: '/users/userDetail',
          headers:{
             access_token : localStorage.getItem('access_token')
          }
        })
        .then( ({data})=>{
          console.log(`TCL: fetchUserDetail -> data`, data)
          this.commit('SET_LOGGED_IN_USER_DETAIL', data)
        })
        .catch(({response})=>{
          console.log(' error @fetchUserDetail -store-index \n=========================================\n', response.data)
        })
    },
    searchArticles({commit}, payload){
        axios({
            method: 'post',
            url: '/questions/filter',
            data: payload
        })
        .then( ({data}) =>{
            this.commit('SET_SEARCH_RESULT_ARRAY', data)
        })
        .catch(({response})=>{
            console.log(' error @searchArticles -store-index \n=========================================\n', response.data)
            Swal.fire(
                'Error with Searching Questions',
                response.data.message
            )
        })

    }

  },
  modules: {



  }
})
