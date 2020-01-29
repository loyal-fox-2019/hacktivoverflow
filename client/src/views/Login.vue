<template>
  <div class="home vh-100 d-flex justify-content-center align-items-center">
    <b-container class="h-75 d-flex justify-content-center align-items-center">
      <b-row class="w-100 justify-content-center">
        <b-col cols="4">
          <g-signin-button class="my-3"></g-signin-button>
          <login-card></login-card>
          <p class="mt-5" style="font-size:13px;">
            Don't have an account?
            <router-link to="/register">Sign up</router-link>
          </p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import GSigninButton from "@/components/GSigninButton.vue";
import LoginCard from "@/components/LoginCard.vue";

export default {
  components: {
    GSigninButton,
    LoginCard
  },
  data() {
    return {
      registerData: null,
      userState: null,
      dissmissableAlert: true
    };
  },
  watch: {
    $route(to) {
      this.userState = to.name;
    }
  }
};
</script>

<style scoped>
.home {
  background-color: #eff0f1;
}
</style>
