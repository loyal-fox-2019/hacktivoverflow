import axios from '../../../apis/server'
import router from '../../router/index'

const namespaced = true

const state = {
   isLoggedIn: false,
   watchedTags: [],
   user: {}
}

const mutations = {
   CHANGE_USER_LOGIN_STATUS(state, status) {
      state.isLoggedIn = status
   },

   SET_WATCHEDTAGS(state, watchedTags) {
      state.watchedTags = watchedTags
   },

   SET_USER(state, user) {
      state.user = user
   }
}

const actions = {
   checkLoggedIn({commit}) {
      if(localStorage.getItem('token') === null) {
         commit('CHANGE_USER_LOGIN_STATUS', false)
         commit('SET_USER', {})
         router.push('/')
      }
      else {
         commit('CHANGE_USER_LOGIN_STATUS', true)
      }
   },

   async fetchUser({commit}) {
      try {
         if(localStorage.token) {
            const {data} = await axios.get('/user', {
               headers: {
                  token: localStorage.token
               }
            })
            console.log(data.user, 'setelah fetch')
            commit('SET_USER', data.user)
         }
      }
      catch (error) {
         Swal.fire({
            text: 'Fetching user has failed'
         })
      }
   }
}

const getters = {}

export default {
   namespaced,
   state,
   mutations,
   actions,
   getters
}