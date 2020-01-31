<template>
  <div class="d-flex justify-content-center align-items-center container">
    <div class="row">
      <form @submit.prevent="goRegister">
        <div class="form-group">
          <label for="inputUsername" class="control-label">Enter Username</label>
          <input
            v-model="username"
            type="username"
            class="form-control"
            id="inputUsername"
            aria-labelledby="usernamenotification"
          />
        </div>
        <div class="form-group">
          <label for="inputEmail" class="control-label">Enter Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="inputEmail"
            aria-labelledby="emailnotification"
          />
        </div>
        <div class="form-group">
          <label for="inputPassword" class="control-label">Enter Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="inputPassword"
            aria-labelledby="passwordnotification"
          />
        </div>
        <button @click="showLogin" type="button" class="btn btn-light mr-4">Login</button>
        <button type="submit" class="btn btn-info">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      username: ""
    };
  },
  methods: {
    goRegister() {
      this.$store.dispatch("goRegister", {
        email: this.email,
        password: this.password,
        username: this.username
      });
    },
    showLogin() {
      this.$emit("showLogin");
    }
  }
};
</script>

<style>
</style>