import Axios from 'axios';

export default {
  namespaced: true,
  state: {
    comment: {
      content: '',
      questionId: '',
    },
    comments: [],
    isUpdate: false,
  },
  mutations: {
    SET_COMMENT(state, payload) {
      state.comment = payload;
    },
    SET_COMMENTS(state, payload) {
      state.comments = payload;
    },
    SET_ISUPDATE(state, payload) {
      state.isUpdate = payload;
    },
    CLEAR_COMMENT(state) {
      state.comment.content = '';
    },
  },
  actions: {
    async addComment({ commit, dispatch }, payload) {
      const headers = {
        token: localStorage.getItem('stuckoverlow.token'),
      };
      try {
        await Axios.post(`/questions/${payload.questionId}/answers`, payload, {
          headers,
        });
        dispatch('Question/getQuestion', payload.questionId, { root: true });
        commit('SET_SUCCESS', 'Add answer success', { root: true });
        commit('CLEAR_COMMENT');
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.errors.join(' '), { root: true });
        console.log(response.data.errors.join(' '));
      }
    },
    async getComment({ commit }, payload) {
      const headers = {
        token: localStorage.getItem('stuckoverlow.token'),
      };
      try {
        const url = `/questions/${payload.questionId}/answers/${payload._id}`;
        const { data } = await Axios.get(url, { headers });
        data.questionId = payload.questionId;
        commit('SET_COMMENT', data);
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.errors.join(' '), { root: true });
        console.log(response.data.errors.join(' '));
      }
    },
    async updateComment({ commit, dispatch }, payload) {
      const headers = {
        token: localStorage.getItem('stuckoverlow.token'),
      };
      try {
        const url = `/questions/${payload.questionId}/answers/${payload._id}`;
        await Axios.put(url, payload, { headers });
        dispatch('Question/getQuestion', payload.questionId, { root: true });
        commit('CLEAR_COMMENT');
        commit('SET_SUCCESS', 'Update answer success', { root: true });
        commit('SET_ISUPDATE', false);
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.errors.join(' '), { root: true });
        console.log(response.data.errors.join(' '));
      }
    },
  },
};
