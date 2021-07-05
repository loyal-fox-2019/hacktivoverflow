<template>
  <div class="sign-up">
    <div class="container">
      <!-- row sign up form -->
      <div class="row justify-content-center mt-5">
          <div class="col-4">
            <div class="icon">
                <img src="../assets/so-icon.png" width="64" alt="icon">
            </div>
            <div class="form p-4 shadow rounded">
                <form @submit.prevent="submitSignup">
                    <div class="form-group">
                        <label>Display username</label>
                        <input v-model="signupUsername" type="text" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input v-model="signupEmail" type="email" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input v-model="signupPassword" type="password" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Sign up</button>
                </form>
                <p class="small tnc">By clicking "Sign up" you agree to our terms of service, privacy policy and cookie policy</p>
            </div>
            <div class="hyperlink-sign-up">
                <p>Already have an account?<router-link to="/login" class="link"> Log in</router-link></p>
            </div>
          </div>
      </div>
      <!-- end row sign up form -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      signupUsername: '',
      signupEmail: '',
      signupPassword: '',
    };
  },
  methods: {
    submitSignup() {
      const signup = {
        username: this.signupUsername,
        email: this.signupEmail,
        password: this.signupPassword,
      };
      this.$store.dispatch('submitSignup', signup);
    },
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
.tnc {
  color: #61737c;
  margin-top: 1rem;
}
</style>
