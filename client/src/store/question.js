import Axios from 'axios';
import Router from '../router';

export default {
  namespaced: true,
  state: {
    question: {
      title: '',
      content: '',
      tags: [],
    },
    questions: [],
  },
  mutations: {
    SET_QUESTION(state, payload) {
      state.question = payload;
    },
    SET_QUESTIONS(state, payload) {
      state.questions = payload;
    },
  },
  actions: {
    async getQuestions({ commit }, payload = null) {
      try {
        const { data } = await Axios.get(`/questions?q=${payload}`);
        commit('SET_QUESTIONS', data);
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.errors.join(' '), { root: true });
        console.log(response.data.errors.join(' '));
      }
    },
    async getQuestion({ commit }, payload) {
      try {
        const { data } = await Axios.get(`/questions/${payload}`);
        commit('SET_QUESTION', data);
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.errors.join(' '), { root: true });
        console.log(response.data.errors.join(' '));
      }
    },
    async createQuestion({ commit }, payload) {
      const headers = {
        token: localStorage.getItem('stuckoverlow.token'),
      };
      try {
        const { data } = await Axios.post('/questions', payload, { headers });
        commit('SET_SUCCESS', 'Add question success', { root: true });
        Router.push({ name: 'QuestionDetail', params: { slug: data.slug } });
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.errors.join(' '), { root: true });
        console.log(response.data.errors.join(' '));
      }
    },
    async updateQuestion({ commit }, payload) {
      const headers = {
        token: localStorage.getItem('stuckoverlow.token'),
      };
      try {
        const { data } = await Axios.put(`/questions/${payload._id}`, payload, { headers });
        commit('SET_SUCCESS', 'Update a question success', { root: true });
        Router.push({ name: 'QuestionDetail', params: { slug: data.slug } });
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.errors.join(' '), { root: true });
        console.log(response.data.errors.join(' '));
      }
    },
    async updateUpVote({ commit, state, dispatch }) {
      const headers = {
        token: localStorage.getItem('stuckoverlow.token'),
      };
      const payload = state.question;
      try {
        await Axios.patch(`/questions/upvote/${payload._id}`, null, { headers });
        dispatch('getQuestion', payload._id);
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.errors.join(' '), { root: true });
        console.log(response.data.errors.join(' '));
      }
    },
    async updateDownVote({ commit, state, dispatch }) {
      const headers = {
        token: localStorage.getItem('stuckoverlow.token'),
      };
      const payload = state.question;
      try {
        await Axios.patch(`/questions/downvote/${payload._id}`, null, { headers });
        dispatch('getQuestion', payload._id);
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.errors.join(' '), { root: true });
        console.log(response.data.errors.join(' '));
      }
    },
    // eslint-disable-next-line
    async updateViews({}, payload) {
      await Axios.patch(`/questions/views/${payload}`);
    },

    async deleteQuestion({ commit }, payload) {
      const headers = {
        token: localStorage.getItem('stuckoverlow.token'),
      };
      try {
        await Axios.delete(`/questions/${payload}`, null, { headers });
        commit('SET_SUCCESS', 'Deleted a question', { root: true });
        Router.replace('/');
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.errors.join(' '), { root: true });
        console.log(response.data.errors.join(' '));
      }
    },
  },
};
