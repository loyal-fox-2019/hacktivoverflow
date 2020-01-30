<template>
  <div>
    <b-card class="mb-2 shadow-sm">
      <b-card-text>
        <h3>Login()</h3>
      </b-card-text>
      <b-card-text class="text-left font-weight-bold">
        <b-form @submit.prevent="login">
          <b-form-group
            id="input-username"
            label="Username / Email"
            label-for="username"
          >
            <b-form-input
              id="username"
              v-model="form.username"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-password"
            label="Password"
            label-for="password"
          >
            <b-form-input
              id="password"
              v-model="form.password"
              type="password"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="info" block size="sm">
            Log in
          </b-button>
        </b-form>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

export default {
  data() {
    return {
      form: {
        username: null,
        password: null
      }
    };
  },
  methods: {
    login() {
      axios({
        method: "POST",
        url: `${this.$store.state.API}/users/login`,
        data: this.form
      })
        .then(({ data }) => {
          localStorage.name = data.name;
          localStorage.token = data.token;
          this.$store.commit("SET_USERLOGIN", data.name);
          this.$store.commit("SET_LOGIN", true);
          this.$router.replace({ name: "try list" });
          Toast.fire({
            icon: "success",
            title: "Signed in successfully"
          });
        })
        .catch(err => {
          this.form.username = null;
          this.form.password = null;
          this.$swal(
            "Error",
            err.response.data.errMessage ||
              "Something went wrong, please try again later!",
            "error"
          );
        });
    }
  }
};
</script>
