<template>
  <div>
    <b-card class="mb-2 shadow-sm">
      <b-card-text v-if="!isNew || $route.params.id">
        <h3>
          1 Step Closer
        </h3>
        <p class="text-muted" style="font-size:12px;">
          Complete form below to confirm your registration
        </p>
      </b-card-text>
      <b-card-text v-else>
        <h3>
          Register()
        </h3>
        <p class="text-muted" style="font-size:12px;">
          This is the place where you can try and catch any errors you get
        </p>
      </b-card-text>
      <b-card-text class="text-left font-weight-bold">
        <b-form @submit.prevent="register">
          <b-form-group id="input-name" label="Display Name" label-for="name">
            <b-form-input
              id="name"
              v-model="form.name"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-email" label="Email" label-for="email">
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-username"
            label="Username"
            label-for="username"
            v-if="!isNew || $route.params.id"
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
            v-if="!isNew || $route.params.id"
          >
            <b-form-input
              id="password"
              v-model="form.password"
              type="password"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-new-password"
            label="New Password"
            label-for="newPassword"
            v-if="!isNew || $route.params.id"
          >
            <b-form-input
              id="newPassword"
              v-model="form.newPassword"
              type="password"
              required
            ></b-form-input>
          </b-form-group>

          <b-button
            type="submit"
            variant="info"
            block
            size="sm"
            v-if="!isLoading"
          >
            Sign up
          </b-button>

          <b-button variant="info" disabled block size="sm" v-if="isLoading">
            <b-spinner small label="spinning"></b-spinner>
            Sending Confirmation Email...
          </b-button>
        </b-form>
      </b-card-text>
      <b-card-text class="text-muted text-left mt-4" style="font-size:10px;">
        By clicking “Sign up”, you agree to our terms of service, privacy policy
        and cookie policy
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
  props: ["state"],
  data() {
    return {
      form: {
        name: null,
        email: null,
        newPassword: null
      },
      isLoading: false
    };
  },
  methods: {
    register() {
      if (!this.isNew) {
        this.confirmRegistration();
      } else {
        this.sendConfirmationEmail();
      }
    },
    confirmRegistration() {
      axios({
        method: "POST",
        url: `${this.$store.state.API}/users/register/${this.$route.params.id}/confirm`,
        data: this.form
      })
        .then(({ data }) => {
          localStorage.name = data.name;
          localStorage.token = data.token;
          this.$router.replace({ name: "home" });
          Toast.fire({
            icon: "success",
            title: "Signed in successfully"
          });
        })
        .catch(err => {
          this.$swal(
            "Error",
            err.response.data.errMessage ||
              "Something went wrong, please try again later!",
            "error"
          );
          this.form.password = null;
          this.form.newPassword = null;
        });
    },
    sendConfirmationEmail() {
      this.isLoading = true;
      axios({
        method: "POST",
        url: `${this.$store.state.API}/users/register/`,
        data: this.form
      })
        .then(() => {
          this.isLoading = false;
          this.$swal(
            "Sent",
            "Please check your email and follow the instructions to complete registration",
            "info"
          );
        })
        .catch(err => {
          this.isLoading = false;
          this.form.name = null;
          this.form.email = null;
          this.$swal(
            "Error",
            err.response.data.message ||
              "Something went wrong, please try again later!",
            "error"
          );
        });
    },
    initConfirmationData() {
      axios({
        method: "GET",
        url: `${this.$store.state.API}/users/register/${this.$route.params.id}`
      })
        .then(({ data }) => {
          delete data.password;
          this.form = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetForm() {
      this.form = {
        name: null,
        email: null
      };
    }
  },
  created() {
    this.form._id = this.$route.params.id;
    if (this.$route.params.id) {
      this.initConfirmationData();
      this.isNew = false;
    }
  },
  watch: {
    state() {
      if (this.state === "confirm") {
        this.initConfirmationData();
      } else {
        this.resetForm();
      }
    }
  },
  computed: {
    isNew: {
      get() {
        return !this.form._id;
      },
      set(newValue) {
        this.value = newValue;
      }
    }
  }
};
</script>
