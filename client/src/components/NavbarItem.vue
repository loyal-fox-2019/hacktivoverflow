<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="dark" fixed="top">
      <b-navbar-brand href="#" @click.prevent="backToHome">HacktivOverflow</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="this.$store.state.isLogin">
          <b-nav-item href="#" @click.prevent="callModalAddQuestion">Add Question</b-nav-item>
          <b-nav-item href="#">{{$store.state.name}}</b-nav-item>
          <b-nav-item href="#" @click.prevent="logout">Logout</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!this.$store.state.isLogin">
          <b-nav-item href="#" v-b-modal.login>Login</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
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

export default {
  name: "NavbarItem",
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$store.commit("SET_LOGIN_FALSE");
      Swal.fire(
        `Log Out`,
        `You Have Been Loged Out From HacktivOverflow`,
        "info"
      );
    },
    callModalAddQuestion() {
      this.$bvModal.show("modal-new-question");
    },
    backToHome() {
      this.$router.push("/");
    }
  }
};
</script>