<template>
  <div class="login">
    <div class="container">
      <!-- row login form -->
      <div class="row justify-content-center mt-5">
        <div class="col-4">
          <div class="icon">
            <img src="../assets/so-icon.png" width="64" alt="icon">
          </div>
          <div class="form p-4 shadow rounded">
            <form @submit.prevent="submitLogin">
              <div class="form-group">
                <label>Email</label>
                <input v-model="loginEmail" type="email" class="form-control">
              </div>
              <div class="form-group">
                <label>Password</label>
                <input v-model="loginPassword" type="password" class="form-control">
              </div>
              <button type="submit" class="btn btn-primary btn-block">Log in</button>
            </form>
          </div>
          <div class="hyperlink-sign-up">
            <p>Don't have an account?<router-link to="/signup" class="link"> Sign up</router-link></p>
          </div>
        </div>
      </div>
      <!-- end row login form -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginEmail: '',
      loginPassword: '',
    };
  },
  methods: {
    submitLogin() {
      const login = {
        email: this.loginEmail,
        password: this.loginPassword,
      };
      this.$store.dispatch('submitLogin', login);
    },
  },
  mounted() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon {
  text-align: center;
  margin-bottom: .5rem
}
label {
  font-weight: 700;
}
.btn-primary {
  background-color: #0095ff;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
}
.btn {
  padding: .6rem;
  border: 1pz solid transparent;
}
.hyperlink-sign-up {
  text-align: center;
  margin-top: 3rem;
}
.hyperlink-sign-up .link {
  color: #0064bd;
  cursor: pointer;
}
.link:hover {
  text-decoration: none;
  color: #0095ff;
}
</style>
