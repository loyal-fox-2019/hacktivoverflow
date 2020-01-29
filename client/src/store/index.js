import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

const BASE_URL = 'http://localhost:3000';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    isLoading: false,
    fullPage: true,
    questions: [],
    page: 1,
    errMessage: [],
    isError: false,
    buttonLoading: false,
    tags: [],
  },
  mutations: {
    SET_QUESTIONS(state, payload) {
      state.questions = payload;
    },
    SET_ISLOGGED(state, payload) {
      state.isLogged = payload;
    },
    SET_ERRMESSAGE(state, payload) {
      state.errMessage = payload;
    },
    SET_ISERROR(state, payload) {
      state.isError = payload;
    },
    SET_LOADING(state, payload) {
      state.isLoading = payload;
    },
    SET_BUTTON(state, payload) {
      state.buttonLoading = payload;
    },
    SET_TAGS(state, payload) {
      state.tags = payload;
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
      } catch (err) {
        console.log(err.response);
      }
    },
    checkLogin({ commit }) {
      commit('SET_ISERROR', false);
      commit('SET_LOADING', true);
      if (!localStorage.getItem('token')) {
        setTimeout(() => {
          commit('SET_LOADING', false);
          commit('SET_ISLOGGED', false);
        }, 500);
      } else {
        setTimeout(() => {
          commit('SET_LOADING', false);
          commit('SET_ISLOGGED', true);
        }, 500);
      }
    },
    async updateTags({ state }) {
      try {
        const payload = {
          tags: state.tags,
        };
        await axios({
          method: 'PATCH',
          url: `${BASE_URL}/user/addtags`,
          data: payload,
          headers: {
            token: localStorage.getItem('token'),
          },
        });
        // send swal 'Tags updated!'
      } catch (err) {
        // const { errors } = err.response.data;
        // commit('SET_ISERROR', true);
        // commit('SET_ERRMESSAGE', errors);
        // setTimeout(() => {
        //   commit('SET_ISERROR', false);
        // }, 2500);
      }
    },
    async loginAttempt({ dispatch, commit }, payload) {
      commit('SET_BUTTON', true);
      commit('SET_ISERR0R', false);
      try {
        const response = await axios({
          method: 'POST',
          url: `${BASE_URL}/user`,
          data: payload,
        });
        const { data } = response;
        console.log(data);
        const { token, username, tags } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        commit('SET_TAGS', tags);
        setTimeout(() => {
          commit('SET_BUTTON', false);
          dispatch('checkLogin');
        });
        router.push('/questions');
      } catch (err) {
        const { errors } = err.response.data;
        commit('SET_BUTTON', false);
        commit('SET_ISERROR', true);
        commit('SET_ERRMESSAGE', errors);
        setTimeout(() => {
          commit('SET_ISERROR', false);
        }, 2500);
      }
    },
    async signupAttempt({ dispatch, commit }, payload) {
      commit('SET_ISERROR', false);
      commit('SET_BUTTON', true);
      try {
        const response = await axios({ method: 'POST', url: `${BASE_URL}/user/register`, data: payload });
        const { data } = response;
        console.log(data);
        const { token, username } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setTimeout(() => {
          commit('SET_BUTTON', false);
          dispatch('checkLogin');
        }, 500);
        router.push('/questions');
      } catch (err) {
        const { errors } = err.response.data;
        console.log(err.response);
        commit('SET_ISERROR', true);
        commit('SET_ERRMESSAGE', errors);
        setTimeout(() => {
          commit('SET_ISERROR', false);
          commit('SET_BUTTON', false);
        }, 2500);
      }
    },
  },
  modules: {
  },
});
