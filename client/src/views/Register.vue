<template>
  <div class="home vh-100">
    <top-navbar></top-navbar>
    <b-container class="h-75 d-flex justify-content-center align-items-center">
      <b-row class="w-100">
        <b-col
          cols="8"
          class="d-flex justify-content-center align-items-center"
        >
          <p>
            Try{ } Catch { }
          </p>
        </b-col>
        <b-col cols="4">
          <g-signin-button class="my-3"></g-signin-button>
          <register-card></register-card>
          <p class="mt-5" style="font-size:13px;">
            Already have an account?
            <router-link to="/">Log in</router-link>
          </p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TopNavbar from "@/components/TopNavbar.vue";
import GSigninButton from "@/components/GSigninButton.vue";
import RegisterCard from "@/components/RegisterCard.vue";

export default {
  components: {
    TopNavbar,
    GSigninButton,
    RegisterCard
  }
};
</script>

<style scoped>
.home {
  background-color: #eff0f1;
}
</style>
