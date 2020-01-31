<template>
  <el-card class="form-login p-3">
    <form>
      <div class="form-group" v-if="page === 'register'">
        <label for="fullname"><strong>Full Name</strong></label>
        <input
          type="text"
          class="form-control"
          id="fullname"
          aria-describedby="emailHelp"
          placeholder="Full Name"
          autocomplete="off"
          v-model="fullname"
        />
      </div>
      <div class="form-group" v-if="page === 'register'">
        <label for="username"><strong>Username</strong></label>
        <input
          type="text"
          class="form-control"
          id="username"
          aria-describedby="emailHelp"
          placeholder="Username"
          autocomplete="off"
          v-model="username"
        />
      </div>
      <div class="form-group">
        <label for="email"><strong>Email address</strong></label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Email"
          v-model="email"
          autocomplete="off"
        />
      </div>
      <div class="form-group">
        <label for="password"><strong>Password</strong></label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          v-model="password"
        />
        <small class="form-text text-muted" v-if="page === 'register'"
          >Passwords must contain at least eight characters.</small
        >
      </div>
      <button
        class="btn btn-primary login-btn"
        v-if="page === 'login'"
        @click.prevent="login"
      >
        Log in
      </button>
      <button
        class="btn btn-primary login-btn mb-3"
        v-if="page === 'register'"
        @click.prevent="register"
      >
        Sign up
      </button>
      <small v-if="page === 'register'"
        >By Clicking "Sign up", you agree to our
        <span class="text-primary"> terms of service, privacy policy</span> and
        <span class="text-primary">cookie policy</span></small
      >
    </form>
  </el-card>
</template>

<script>
export default {
  props: ['page'],
  data() {
    return {
      fullname: '',
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      this.$store.dispatch('register', {
        name: this.fullname,
        username: this.username,
        email: this.email,
        password: this.password
      })
      this.fullname = ''
      this.username = ''
      this.email = ''
      this.password = ''
    },
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style scoped>
.form-login {
  width: 400px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.label-form {
  padding: 0!Important;
  margin-bottom: 0!Important;
}
.login-btn {
  width: 100%;
}
</style>
