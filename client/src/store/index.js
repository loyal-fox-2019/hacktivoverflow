import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import Router from '../router';
import Question from './question';
import Tag from './tag';
import Comment from './comment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: null,
    errors: null,
    success: null,
  },
  mutations: {
    SET_ISLOGIN(state, payload) {
      state.isLogin = payload;
    },
    SET_ERRORS(state, payload) {
      state.errors = payload;
    },
    SET_SUCCESS(state, payload) {
      state.success = payload;
    },
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      try {
        const { data } = await Axios.post('/auth/login', payload);
        dispatch('loggedIn', data);
      } catch ({ response }) {
        commit('SET_ERRORS', `Login error: ${response.data.errors.join(' ')}`);
      }
    },
    async register({ commit, dispatch }, payload) {
      try {
        const { data } = await Axios.post('/auth/register', payload);
        dispatch('loggedIn', data);
      } catch ({ response }) {
        commit('SET_ERRORS', `Register error: ${response.data.errors.join(' ')}`);
      }
    },
    loggedIn({ commit }, payload) {
      localStorage.setItem('stuckoverlow.token', payload.token);
      localStorage.setItem('stuckoverlow.email', payload.email);
      localStorage.setItem('stuckoverlow.userId', payload.id);
      commit('SET_ISLOGIN', payload.token);
      Router.replace('/');
    },
    logout({ commit }) {
      commit('SET_ISLOGIN', null);
      localStorage.clear();
      Router.replace('/');
    },
  },
  modules: {
    Question,
    Tag,
    Comment,
  },
});
