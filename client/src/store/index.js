import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    questions: [],
    page: 1,
  },
  mutations: {
    SET_QUESTIONS(state, payload) {
      state.questions = payload;
    },
    SET_ISLOGGED(state, payload) {
      state.isLogged = payload;
    },
  },
  actions: {
    async fetchData({ state, commit }) {
      try {
        const response = await axios(
          { method: 'GET', url: `${BASE_URL}/questions?page=${state.page}` },
        );
        const { data } = response;
        commit('SET_QUESTIONS', data.response);
        console.log(data);
      } catch (err) {
        console.log(err.response);
      }
    },
    checkLogin({ commit }) {
      if (!localStorage.getItem('token')) {
        commit('SET_ISLOGGED', false);
      } else {
        commit('SET_ISLOGGED', true);
      }
    },
    async loginAttempt({ dispatch }, payload) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${BASE_URL}/user/register`,
          data: payload,
        });
        const { data } = response;
        console.log(data);
        dispatch('checkLogin');
      } catch (err) {
        console.log(err);
      }
    },
  },
  modules: {
  },
});
