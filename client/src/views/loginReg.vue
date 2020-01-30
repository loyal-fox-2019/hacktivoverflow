<template>
  <div class="center">
    <b-tabs content-class="mt-3">
      <b-tab title="Login">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Password:" label-for="input-2">
            <b-input type="password" aria-describedby="password-help-block" v-model="form.password"></b-input>
            <b-form-text id="password-help-block"></b-form-text>
          </b-form-group>

          <b-button type="submit" variant="primary" v-on:click="login">Sign In</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </b-tab>
      <b-tab title="Register">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-3"
            label="Email address:"
            label-for="input-3"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-3"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-5" label="Username:" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model="form.username"
              type="text"
              required
              placeholder="Enter username"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-4" label="Password:" label-for="input-4">
            <b-input
              type="password"
              id="text-password"
              aria-describedby="password-help-block"
              v-model="form.password"
            ></b-input>
            <b-form-text id="password-help-block">Your password must be at least 6 characters long</b-form-text>
          </b-form-group>

          <b-button type="submit" variant="primary" v-on:click="register">Sign Up</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: "loginPage",

  data() {
    return {
      form: {
        email: "",
        password: "",
        username: ""
      },
      show: true
      // baseUrl: "http://localhost:3000",
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      this.form.username = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    register() {
      let body = {
        email: this.form.email,
        password: this.form.password,
        username: this.form.username
      };
      this.$store.dispatch("signIn", body);
    },
    login() {
      let body = {
        email: this.form.email,
        password: this.form.password
      };
      this.$store.dispatch("login", body);
    }
  }
};
</script>

<style scoped>
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>