import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    questions: [],
    question: {},
    answers: [],
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_QUESTIONS(state, payload) {
      state.questions = payload;
    },
    SET_QUESTION(state, payload) {
      state.question = payload;
    },
    SET_ANSWERS(state, payload) {
      state.answers = payload;
    },
  },
  actions: {
    submitSignup({ commit, state, dispatch }, payload) {
    //   console.log(commit, state, dispatch, 'ignore');
      axios.post('http://localhost:3000/users/register', payload)
        .then((user) => {
        //   console.log(user);
          localStorage.setItem('token', user.data.token);
          localStorage.setItem('user', user.data.user.username);
          commit('SET_USER', user.data.user.username);
          router.push('/');
        })
        .catch((err) => {
        //   console.log(err);
        });
    },
    submitLogin({ commit, state, dispatch }, payload) {
      console.log(commit, state, dispatch, 'ignore');
      axios.post('http://localhost:3000/users/login', payload)
        .then((user) => {
        //   console.log(user);
          localStorage.setItem('token', user.data.token);
          localStorage.setItem('user', user.data.user.username);
          commit('SET_USER', user.data.user.username);
          router.push('/');
        })
        .catch((err) => {
        //   console.log(err);
        });
    },
    submitQuestion({ commit, state, dispatch }, payload) {
      console.log(commit, state, dispatch, 'ignore');
      axios.post('http://localhost:3000/questions', payload, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((question) => {
        //   console.log(question);
          router.push('/');
        })
        .catch((err) => {
        //   console.log(err);
        });
    },
    submitAnswer({ commit, state, dispatch }, payload) {
    //   console.log(commit, state, dispatch, 'ignore');
      axios.post('http://localhost:3000/answers', payload, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((answer) => {
        //   console.log(answer);
          axios.get('http://localhost:3000/answers', {
            headers: {
              token: localStorage.getItem('token'),
            },
          })
            .then(({ data }) => {
            //   console.log(data);
              commit('SET_ANSWERS', data);
            });
        })
        .catch((err) => {
        //   console.log(err);
        });
    },
    findallQuestions({ commit }) {
      axios.get('http://localhost:3000/questions')
        .then(({ data }) => {
        //   console.log(data);
          commit('SET_QUESTIONS', data);
        })
        .catch((err) => {
        //   console.log(err);
        });
    },
    findoneQuestion({ commit }, payload) {
      axios.get(`http://localhost:3000/questions/${payload}`)
        .then(({ data }) => {
        //   console.log(data);
          commit('SET_QUESTION', data);
        })
        .catch((err) => {
        //   console.log(err);
        });
    },
    findallAnswers({ commit }, payload) {
      axios.get(`http://localhost:3000/answers/${payload}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
        //   console.log(data);
          commit('SET_ANSWERS', data);
        })
        .catch((err) => {
        //   console.log(err);
        });
    },
  },
});
