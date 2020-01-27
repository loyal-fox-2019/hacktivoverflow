import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    SET_REGISTER(state,payload){
      state.user = payload
    },
    SET_LOGIN(state, payload){
      state.user = payload
    }
  },
  actions: {
    registerUser(context, payload){
      console.log('masuk register')
      axios({
          method: 'post',
          url: `http://localhost:3000/user/register`,
          data:payload
      })
      .then(({data})=>{
          localStorage.setItem('token', data.token)
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
        context.commit('SET_LOGIN', data)
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
