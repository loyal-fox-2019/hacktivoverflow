import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API: "http://localhost:3000",
    registerData: null,
    isLogin: !!localStorage.token,
    userLogin: localStorage.name,
    questions: []
  },
  mutations: {
    SET_REGISTERDATA(state, payload) {
      state.registerData = payload;
    },
    SET_LOGIN(state, isLogin) {
      state.isLogin = isLogin;
    },
    SET_USERLOGIN(state, name) {
      state.userLogin = name;
    }
  },
  actions: {
    fetchConfirmationData(context) {
      axios({
        method: "GET",
        url: `${this.state.API}/users/register/${this.$route.params.id}`
      })
        .then(({ data }) => {
          context.commit("SET_REGISTERDATA", data);
        })
        .catch(err => {
          context.commit("SET_REGISTERDATA", err);
        });
    }
  },
  modules: {}
});
