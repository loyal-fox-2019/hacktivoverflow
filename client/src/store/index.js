import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userLogin: null,
    showLoginPage: true,
    allContent: null,
    contentByTag: null,
    contentDetail: null,
    userContent: null
  },
  mutations: {
    SET_USERLOGIN(state, payload) {
      state.userLogin = payload
    },
    SHOW_LOGINPAGE(state) {
      state.showLoginPage = true
    },
    HIDE_LOGINPAGE(state) {
      state.showLoginPage = false
    },
    SET_ALLCONTENT(state, payload) {
      state.allContent = payload
    },
    SET_CONTENTBYTAG(state, payload) {
      state.contentByTag = payload
    },
    SET_CONTENTDETAIL(state, payload) {
      state.contentDetail = payload
    },
    SET_USERCONTENT(state, payload) {
      state.userContent = payload
    }
  },
  actions: {
    getAllUser({ commit }) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/users',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          // console.log(data)
          commit('SET_USERLOGIN', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    signOut({ commit, state }) {
      localStorage.removeItem('token')
      commit('SHOW_LOGINPAGE')
      commit('SET_USERLOGIN', null)
    },
    getUserContent({ commit }) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/content/userContent',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log('ini user content')
          console.log(data)
          commit('SET_USERCONTENT', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateUser({ commit }, payload) {},
    addContent({ dispatch }, payload) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/content',
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          dispatch('getAllContent')
          dispatch('getUserContent')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAllContent({ commit, dispatch }) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/content'
      })
        .then(({ data }) => {
          // console.log('ini dari ngambil semua kontennya')
          // console.log(data)
          commit('SET_ALLCONTENT', data)
          dispatch('getUserContent')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getContentByTag({ state, commit }, tagname) {
      let result = state.allContent.filter(content =>
        content.tags.includes(tagname)
      )
      commit('SET_CONTENTBYTAG', result)
    },
    getContentById({ state, commit }, contentId) {
      let result = state.allContent.find(content => content._id === contentId)
      commit('SET_CONTENTDETAIL', result)
    }
  },
  modules: {}
})
