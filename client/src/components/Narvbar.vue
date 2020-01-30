<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light" class="navbar">
      <b-navbar-brand v-on:click="goHome" class="logoHO">hacktivOverflow</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div class="login" v-show="!isLogin">
            <b-button v-b-modal.modal-login class="btn btn-primary mr-2">Log in</b-button>
            <b-button v-b-modal.modal-signup class="btn btn-outline-primary">Sign up</b-button>
            <b-modal id="modal-login" title="BootstrapVue" hide-footer>
              <b-form>
                <b-form-group
                  id="input-group-1"
                  label="Email address:"
                  label-for="input-1"
                  description="We'll never share your email with anyone else."
                >
                  <b-form-input
                    id="input-1"
                    v-model="email"
                    type="email"
                    required
                    placeholder="Enter email"
                  ></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                  <b-form-input
                    id="input-2"
                    v-model="password"
                    type="password"
                    required
                    placeholder="Enter password"
                  ></b-form-input>
                </b-form-group>
                <div class="d-flex mx-auto justify-content-end">
                  <div
                    class="btn btn-primary"
                    @click="$bvModal.hide('modal-login')"
                    v-on:click="login"
                  >Log in</div>
                </div>
              </b-form>
            </b-modal>
            <b-modal id="modal-signup" title="BootstrapVue" hide-footer>
              <b-form>
                <b-form-group
                  id="input-group-signup-1"
                  label="Email address:"
                  label-for="input-signup-1"
                  description="We'll never share your email with anyone else."
                >
                  <b-form-input
                    id="input-signup-1"
                    v-model="email"
                    type="email"
                    required
                    placeholder="Enter email"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-signup-2"
                  label="Password:"
                  label-for="input-signup-2"
                >
                  <b-form-input
                    id="input-signup-2"
                    type="password"
                    required
                    placeholder="Enter password"
                    v-model="password"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  id="input-group-signup-3"
                  label="Username:"
                  label-for="input-signup-3"
                >
                  <b-form-input
                    id="input-signup-3"
                    type="text"
                    required
                    placeholder="Enter username"
                    v-model="username"
                  ></b-form-input>
                </b-form-group>
                <div class="d-flex mx-auto justify-content-end">
                  <div
                    class="btn btn-primary"
                    @click="$bvModal.hide('modal-signup')"
                    v-on:click="signIn"
                  >Sign in</div>
                </div>
              </b-form>
            </b-modal>
          </div>
          <div class="btn btn-outline-danger" v-show="isLogin" v-on:click="logout">Log out</div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      email: "",
      password: "",
      username: ""
    };
  },
  computed: {
    isLogin() {
      //   return this.$store.state.token;
      return this.$store.state.isLogin;
    }
  },
  methods: {
    login() {
      let body = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("login", body);
    },
    logout() {
      this.$store.dispatch("logout");
    },
    signIn() {
      let body = {
        email: this.email,
        password: this.password,
        username: this.username
      };
      this.$store.dispatch("signIn", body);
    },
    goHome() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("changeIsLogin", true);
    }
  }
};
</script>

<style scoped>
.btn-primary {
  background-color: #337ab7;
  color: white;
  border-color: #337ab7;
}
.btn-primary:hover {
  background-color: white;
  color: #337ab7;
  border-color: #337ab7;
}

.btn-outline-primary {
  background-color: white;
}

.navbar {
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.2);
}

.logoHO:hover {
  cursor: pointer;
}
</style>