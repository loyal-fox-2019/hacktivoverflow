import Axios from 'axios';

export default {
  namespaced: true,
  state: {
    tag: {},
    tags: [],
  },
  mutations: {
    SET_TAG(state, payload) {
      state.tag = payload;
    },
    SET_TAGS(state, payload) {
      state.tags = payload;
    },
  },
  actions: {
    async getTags({ commit }) {
      try {
        const { data } = await Axios.get('/tags');
        commit('SET_TAGS', data);
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.errors.join(' '), { root: true });
      }
    },
    async getTag({ commit }, payload) {
      try {
        const { data } = await Axios.get(`/tags/${payload}`);
        commit('SET_TAG', data);
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.errors.join(' '), { root: true });
      }
    },
  },
};
