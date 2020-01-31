<template>
  <div class="login">
    <LoginForm :page="page"></LoginForm>
    <p class="text-muted text-center mt-3">
      <small
        >Don't have an account ?
        <router-link to="/register">Sign Up</router-link></small
      >
    </p>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'
export default {
  components: {
    LoginForm
  },
  data() {
    return {
      page: 'login'
    }
  }
}
</script>

<style scoped>
.login {
  min-height: calc(100vh - 70px);
  background-color: #eff0f1;
  padding-top: 8%;
}
</style>
