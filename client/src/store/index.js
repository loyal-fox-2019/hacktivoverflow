import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    listQuestions: [],
    findOneQuestion: '',
  },
  mutations: {
    setIsLogin(state) {
      state.isLogin = true;
    },
    setIsLogout(state) {
      state.isLogin = false;
    },
    setListQuestions(state, data) {
      state.listQuestions = data;
    },
    addQuestions(state, data) {
      state.listQuestions.push(data);
    },
    setFindOneQuestion(state, data) {
      state.findOneQuestion = data;
    }
  },
  actions: {
    listQuestions(context) {
      axios({
        url: 'http://localhost:3000/question',
        method: 'get',
        headers: { token: localStorage.getItem('token') }
      })
      .then(({ data }) => {
        context.commit('setListQuestions', data);
      })
      .catch(err => {
        console.log(err)
      })
    },
    findOneQue(context, data) {
      axios({
        url: `http://localhost:3000/question/${data._id}`,
        method: 'get',
        headers: { token: localStorage.getItem('token') }
      })
      .then((data) => {
        console.log('data findOne ', data)
        context.commit('setFindOneQuestion', data);
      })
      .catch(err => {
        console.log(err)
      })
    }
 },
  modules: {
  }
})
