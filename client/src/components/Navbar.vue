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
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
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
              <form method="post" class="form">
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
              <form method="post" class="form">
                <b-form-input v-model="username"
                  class="mb-2"
                  placeholder="Enter your username"></b-form-input>
                <b-form-input v-model="password" placeholder="Enter your password"></b-form-input>
                <div class="mt-2 text-center">
                  <b-button variant="outline-primary">SIGN UP</b-button>
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
export default {
  name: 'navbar',
  data() {
    return {
      message: 'Hello world',
      username: '',
      password: '',
    };
  },
  methods: {
    loginAttempt() {
      const doc = {
        username: this.username,
        password: this.password,
      };
      this.$store.dispatch('loginAttempt', doc);
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
