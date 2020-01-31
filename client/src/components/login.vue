<template>
  <div class="d-flex justify-content-center align-items-center container">
    <div class="row">
      <form @submit.prevent="goLogin">
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
        <button @click="showRegister" type="button" class="btn btn-light mr-4">Register</button>
        <button type="submit" class="btn btn-info">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    goLogin() {
      this.$store.dispatch("goLogin", {
        email: this.email,
        password: this.password
      });
    },
    showRegister() {
      this.$emit("showRegister");
    }
  }
};
</script>

<style>
</style>