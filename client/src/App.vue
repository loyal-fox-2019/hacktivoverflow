<template>
  <div id="app">
    <Navbar-Item></Navbar-Item>
    <router-view />
    <b-modal id="modal-new-question" title="Add New Question" hide-footer size="xl">
      <form @submit.prevent="addNewQuestion">
        <div class="alert alert-danger" role="alert" v-if="errorMessageRegister">
          <span v-for="(error, i) in errorMessageAddQuestion" :key="i">
            {{errorMessageAddQuestion}}
            <br />
          </span>
        </div>
        <div class="form-group">
          <label for="exampleInputQuestionTitle">Title</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputQuestionTitle"
            placeholder="Title"
            v-model="addQuestionTitle"
            required
          />
        </div>
        <div class="form-group">
          <label for="exampleInputQuestionContent">Question</label>
          <wysiwyg v-model="addQuestionContent" />
        </div>
        <div class="form-group">
          <label for="inputQuestionTags">Tags</label>
          <b-form-tags v-model="addQuestionTags" class="form-control"></b-form-tags>
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </b-modal>
    <b-modal id="login" title="Login To HacktivOverflow Account" hide-footer>
      <form @submit.prevent="login" v-if="modalLoginForm">
        <div class="alert alert-danger" role="alert" v-if="errorMessageLogin">
          <span>{{errorMessageLogin}}</span>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="loginEmail"
            autofocus
            required
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            v-model="loginPassword"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
        <div class="text-center">
          <span class="mt-2">
            Don't have an account ? please
            <a href="#" @click.prevent="changeModalLoginPage">register</a>
          </span>
        </div>
      </form>

      <form @submit.prevent="register" v-if="!modalLoginForm">
        <div class="alert alert-danger" role="alert" v-if="errorMessageRegister">
          <span v-for="(error, i) in errorMessageRegister" :key="i">
            {{errorMessageRegister}}
            <br />
          </span>
        </div>
        <div class="form-group">
          <label for="exampleInputName">Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputName"
            aria-describedby="nameHelp"
            placeholder="Enter your name"
            v-model="registerName"
            required
            autofocus
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="registerEmail"
            required
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            v-model="registerPassword"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
        <div class="text-center">
          <span class="mt-2">
            Already have an account ? please
            <a href="#" @click.prevent="changeModalLoginPage">login</a>
          </span>
        </div>
      </form>
    </b-modal>
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :is-full-page="fullPage"
      ></loading>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import Swal from "sweetalert2";

// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

import NavbarItem from "./components/NavbarItem";

export default {
  components: {
    NavbarItem,
    Loading
  },
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
      errorMessageLogin: null,
      registerName: "",
      registerEmail: "",
      registerPassword: "",
      errorMessageRegister: null,
      addQuestionTitle: "",
      addQuestionContent: "",
      addQuestionTags: [],
      errorMessageAddQuestion: null,
      modalLoginForm: true,
      isLoading: false,
      fullPage: true
    };
  },
  methods: {
    changeModalLoginPage() {
      this.modalLoginForm = !this.modalLoginForm;
    },
    login() {
      this.isLoading = true;
      axios({
        method: "POST",
        url: "https://hacktivoverflow-server.prograami.com/users/login",
        data: {
          email: this.loginEmail,
          password: this.loginPassword
        }
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          this.$store.commit("SET_LOGIN_TRUE");
          this.$store.commit("SET_USER_ID", data.userID);
          this.$store.commit("SET_EMAIL", data.email);
          this.$store.commit("SET_NAME", data.name);
          this.$bvModal.hide("login");
          Swal.fire(
            `Login Success!`,
            `Welcome Back To HacktivOverflow ${data.name}`,
            "success"
          );
        })
        .catch(error => {
          this.errorMessageLogin = error.response.data.error.message;
        });
      this.isLoading = false;
    },
    register() {
      this.isLoading = true;
      axios({
        method: "POST",
        url: "https://hacktivoverflow-server.prograami.com/users/register",
        data: {
          name: this.registerName,
          email: this.registerEmail,
          password: this.registerPassword
        }
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.user.access_token);
          this.$store.commit("SET_LOGIN_TRUE");
          this.$store.commit("SET_USER_ID", data.user.userID);
          this.$store.commit("SET_EMAIL", data.user.email);
          this.$bvModal.hide("login");
        })
        .catch(error => {
          this.errorMessageRegister = error.response.data.error.message;
        });
      this.isLoading = false;
    },
    addNewQuestion() {
      this.isLoading = true;
      // alert(this.addQuestionContent)
      axios({
        method: "POST",
        url: "https://hacktivoverflow-server.prograami.com/questions",
        headers: {
          Authorization: "token " + localStorage.getItem("access_token")
        },
        data: {
          title: this.addQuestionTitle,
          question: this.addQuestionContent,
          tags: this.addQuestionTags
        }
      })
        .then(({ data }) => {
          this.$store.dispatch("fetch_question");
          this.$bvModal.hide("modal-new-question");
        })
        .catch(error => {
          this.errorMessageAddQuestion = error.response.data.error.message;
        });
      this.isLoading = false;
    }
  }
};
</script>

<style>
#app {
  padding-bottom: 5rem;
}

@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
