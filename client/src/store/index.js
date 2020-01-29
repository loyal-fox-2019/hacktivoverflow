import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

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
    myQuestions: [],
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
    SET_MYQUESTIONS(state, payload) {
      state.myQuestions = payload;
    },
  },
  actions: {
    async getMyTags({ commit }) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${BASE_URL}/user/tags`,
          headers: {
            token: localStorage.getItem('token'),
          },
        });
        const { data } = response;
        console.log(data, 'my tags');
        commit('SET_TAGS', data);
      } catch (err) {
        //
      }
    },
    async fetchData({ state, commit }) {
      try {
        const response = await axios(
          { method: 'GET', url: `${BASE_URL}/questions?page=${state.page}` },
        );
        const { data } = response;
        commit('SET_QUESTIONS', data.response);
      } catch (err) {
        //
      }
    },
    checkLogin({ commit, dispatch }) {
      commit('SET_ISERROR', false);
      // commit('SET_LOADING', true);
      if (!localStorage.getItem('token')) {
        setTimeout(() => {
          commit('SET_LOADING', false);
          commit('SET_ISLOGGED', false);
        }, 500);
      } else {
        dispatch('getMyQuestions');
        dispatch('getMyTags');
        setTimeout(() => {
          commit('SET_LOADING', false);
          commit('SET_ISLOGGED', true);
        }, 500);
      }
    },
    async updateTags({ state, commit }) {
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
        this.$swal('Tags updated!');
      } catch (err) {
        const { errors } = err.response.data;
        commit('SET_ISERROR', true);
        commit('SET_ERRMESSAGE', errors);
        setTimeout(() => {
          commit('SET_ISERROR', false);
        }, 2500);
      }
    },
    async getMyQuestions({ commit }) {
      try {
        const response = await axios({
          method: 'GET',
          url: `${BASE_URL}/user/questions`,
          headers: {
            token: localStorage.getItem('token'),
          },
        });
        const { data } = response;
        commit('SET_MYQUESTIONS', data);
      } catch (err) {
        console.log(err);
      }
    },
  },
  modules: {
  },
});
