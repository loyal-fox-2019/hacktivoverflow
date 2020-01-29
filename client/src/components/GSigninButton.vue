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
        url: `${this.$baseUrl}/users/oauth`,
        data: {
          token: idToken
        }
      })
        .then(({ data }) => {
          localStorage.userId = data.userId;
          localStorage.token = data.token;
          localStorage.name = data.fullname;
          this.$emit("loggedIn", true);
        })
        .catch(err => {
          console.log(err);
        });
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    }
  }
};
</script>
