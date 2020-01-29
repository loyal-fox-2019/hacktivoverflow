<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand to="/"><strong>HOME</strong></b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/questions">Questions</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="$store.state.isLogged">
            <template v-slot:button-content>
              <em>{{ getName }}</em>
            </template>
            <div>
              <b-dropdown-item v-b-modal.modal-profile >Profile</b-dropdown-item>
            </div>
            <div>
              <b-modal id="modal-profile" size="lg" centered title="My Profile">
                <section id="follow-tag">
                  <div>
                    <b-form-tags v-model="$store.state.tags" class="mb-2"></b-form-tags>
                    <p>Followed Tag(s): {{ getTags }}</p>
                    <div class="text-right">
                      <b-button @click="$store.dispatch('updateTags')"
                      variant="outline-primary">Update</b-button>
                    </div>
                  </div>
                </section>
                <table class="table mt-2">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Title</th>
                      <th scope="col">Upvotes</th>
                      <th scope="col">DownVotes</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(question, i) in this.$store.state.myQuestions"
                    :key="i">
                      <th scope="row">{{ question._id }}</th>
                      <td>{{ question.title }}</td>
                      <td>{{ question.upvotes }}</td>
                      <td>{{ question.downvotes }}</td>
                      <td>
                        <b-button @click="remove(question._id)"
                        variant="outline-primary">DELETE</b-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <section id="questions"></section>
              </b-modal>
            </div>
            <b-dropdown-item @click="signout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-button variant="outline-primary"
            v-if="!$store.state.isLogged"
            v-b-modal.modal-signin
            >SIGN IN</b-button>
          <div>
            <b-modal id="modal-signin"
              ok-only :ok-title="'Cancel'"
              centered title="Sign In">
              <p style="text-align: center;">
                Get answers to more than 16.5 million<br>
                questions and give back by sharing your knowledge<br>
                with others.
              </p>
              <Alert v-show="$store.state.isError"/>
              <form method="post" class="form"
              style="margin: 0; padding: 0;">
                <b-form-input v-model="username"
                  class="mb-2"
                  placeholder="Enter your username"></b-form-input>
                <b-form-input v-model="password"
                type="password"
                placeholder="Enter your password"></b-form-input>
                <div class="mt-2 text-center">
                  <b-button @click="loginAttempt" variant="outline-primary">SIGN IN</b-button>
                </div>
              </form>
            </b-modal>
          </div>
          <b-button class="ml-2"
            v-b-modal.modal-signup
            v-if="!$store.state.isLogged"
            variant="outline-primary">SIGN UP</b-button>
          <div>
            <b-modal id="modal-signup"
              ok-only :ok-title="'Cancel'"
              centered title="Sign Up">
              <p style="text-align: center;">
                Join the Stack Overflow community
              </p>
              <Alert v-show="$store.state.isError"/>
              <form method="post" class="form">
                <b-form-input v-model="username"
                  class="mb-2"
                  placeholder="Enter your username"></b-form-input>
                <b-form-input v-model="password"
                type="password"
                placeholder="Enter your password"></b-form-input>
                <div class="text-center">
                  <b-button variant="outline-primary"
                    class="text-center mt-2"
                    disabled v-if="$store.state.buttonLoading">
                    <b-spinner small></b-spinner>
                    <span class="sr-only">Loading...</span>
                  </b-button>
                  <div class="mt-2 text-center" v-else>
                    <b-button @click="submitSignUp"
                    variant="outline-primary">SIGN UP</b-button>
                  </div>
                </div>
              </form>
            </b-modal>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import axios from 'axios';
import Axios from '../config/server';
import Alert from '@/components/Alert.vue';
import router from '@/router';

const BASE_URL = 'http://localhost:3000';

export default {
  components: { Alert },
  name: 'navbar',
  data() {
    return {
      message: 'Hello world',
      username: '',
      password: '',
    };
  },
  methods: {
    async remove(id) {
      try {
        await Axios.delete(`/questions/${id}`, { headers: { token: localStorage.getItem('token') } });
        this.$store.dispatch('fetchData');
        this.$store.dispatch('getMyQuestions');
        this.$swal('Question deleted!');
      } catch (err) {
        console.log(err.response.data);
        this.$swal('Oppss... something went wrong');
      }
    },
    // async removeQuestions() {
    //   try {
    //   } catch (err) {
    //   }
    // },
    signout() {
      localStorage.clear();
      this.$store.dispatch('checkLogin');
    },
    async loginAttempt() {
      const payload = {
        username: this.username,
        password: this.password,
      };
      this.$store.commit('SET_BUTTON', true);
      this.$store.commit('SET_ISERROR', false);
      try {
        const response = await axios({
          method: 'POST',
          url: `${BASE_URL}/user`,
          data: payload,
        });
        const { data } = response;
        const { token, username, tags } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        this.$store.commit('SET_TAGS', tags);
        setTimeout(() => {
          this.$store.commit('SET_BUTTON', false);
          this.$bvModal.hide('modal-signin');
          this.$store.dispatch('checkLogin');
        });
        router.push('/questions');
      } catch (err) {
        const { errors } = err.response.data;
        this.$store.commit('SET_BUTTON', false);
        this.$store.commit('SET_ISERROR', true);
        this.$store.commit('SET_ERRMESSAGE', errors);
        setTimeout(() => {
          this.$store.commit('SET_ISERROR', false);
        }, 2500);
      }
    },
    async submitSignUp() {
      const payload = {
        username: this.username,
        password: this.password,
      };
      this.$store.commit('SET_ISERROR', false);
      this.$store.commit('SET_BUTTON', true);
      try {
        const response = await axios({ method: 'POST', url: `${BASE_URL}/user/register`, data: payload });
        const { data } = response;
        const { token, username } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setTimeout(() => {
          this.$store.commit('SET_BUTTON', false);
          this.$store.dispatch('checkLogin');
          this.$bvModal.hide('modal-signup');
        }, 500);
        router.push('/questions');
      } catch (err) {
        const { errors } = err.response.data;
        this.$store.commit('SET_ISERROR', true);
        this.$store.commit('SET_ERRMESSAGE', errors);
        setTimeout(() => {
          this.$store.commit('SET_ISERROR', false);
          this.$store.commit('SET_BUTTON', false);
        }, 2500);
      }
      this.username = '';
      this.password = '';
    },
  },
  computed: {
    getName() {
      return localStorage.getItem('username');
    },
    getTags() {
      console.log(this.$store.state.tags);
      if (!this.$store.state.tags) {
        return '';
      }
      return this.$store.state.tags.join(',');
    },
  },
};
</script>

<style scoped>
.form {
  position: relative;
  transform: translateX(-50%);
  left: 50%;
  width: 20vw;
}
</style>
