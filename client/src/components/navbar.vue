<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link to="/about">
        <a class="navbar-brand">HackOverflow</a>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/">
              <a class="nav-link">
                Home
                <span class="sr-only">(current)</span>
              </a>
            </router-link>
          </li>
        </ul>
        <div class="d-flex ml-2" v-if="!$store.state.isLogin">
          <div class="mr-2">
            <b-button v-b-modal.register>Sign Up</b-button>
            <b-modal id="register" title="Sign Up" hide-footer>
              <form @submit.prevent="register">
                <div class="form-group">
                  <label for="exampleInputEmail1">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    v-model="username"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    v-model="email"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    v-model="password"
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </b-modal>
          </div>
          <div>
            <b-button v-b-modal.login>Sign In</b-button>

            <b-modal id="login" title="Sign In" hide-footer>
              <form @submit.prevent="login">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    v-model="email"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="password"
                    id="exampleInputPassword1"
                  />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </b-modal>
          </div>
        </div>
        <div v-else class="d-flex">
          <div class="mr-3">{{$store.state.username}}</div>
          <div>
            <a @click="logOut" href>Log Out</a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    },
    login() {
      let obj = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("login", obj);
    },
    register() {
      let obj = {
        username: this.username,
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("register", obj);
    }
  }
};
</script>

<style>
</style>