<template>
  <div>
    <b-button
      v-google-signin-button="clientId"
      block
      size="sm"
      variant="light"
      class="shadow-sm py-2"
    >
      <font-awesome-icon :icon="['fab', 'google']" />
      Continue with
      <span class="text-success font-weight-bold">
        Google
      </span>
    </b-button>
  </div>
</template>

<script>
import GoogleSignInButton from "vue-google-signin-button-directive";
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
  directives: {
    GoogleSignInButton
  },
  data() {
    return {
      clientId:
        "990417810041-4rsdtip8fst1aq497t6fo0s4oacurlnk.apps.googleusercontent.com"
    };
  },
  methods: {
    OnGoogleAuthSuccess(idToken) {
      // Receive the idToken and make your magic with the backend
      axios({
        method: "POST",
        url: `${this.$store.state.API}/users/oauth`,
        data: {
          token: idToken
        }
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
          this.$swal(
            "Error",
            err.response.data.errMessage ||
              "Something went wrong, please try again later!",
            "error"
          );
        });
    },
    OnGoogleAuthFail(error) {
      console.log(error);
      this.$swal(
        "Error",
        "Something went wrong, please try again later!",
        "error"
      );
    }
  }
};
</script>
