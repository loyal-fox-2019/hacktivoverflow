<template>
  <div class="account">
    <login v-if="form === 'login'" @showRegister="show_register"></login>
    <register v-if="form === 'register'" @showLogin="show_login"></register>
  </div>
</template>

<script>
import login from "../components/login";
import register from "../components/register";
export default {
  data() {
    return {
      form: "login"
    };
  },
  components: {
    login,
    register
  },
  methods: {
    show_register() {
      this.form = "register";
    },
    show_login() {
      this.form = "login";
    }
  }
};
</script>

<style>
</style>