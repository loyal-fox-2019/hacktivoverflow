import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    CHANGE_STATE_LOGIN(state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    register({ commit }, payload) {
      axios
        .post('http://localhost:3000/users/register', {
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
          commit('CHANGE_STATE_LOGIN', true)
          router.push('/questions')
        })
    },
    login({ commit }, payload) {
      axios
        .post('http://localhost:3000/users/login', {
          email: payload.email,
          password: payload.password
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
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
    }
  },
  modules: {}
})
