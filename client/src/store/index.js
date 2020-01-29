import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API: "http://localhost:3000",
    registerData: null
  },
  mutations: {
    SET_REGISTERDATA(state, payload) {
      state.registerData = payload;
    }
  },
  actions: {
    fetchConfirmationData(context) {
      console.log(this.state.API);
      console.log(this.route.params.id);

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
