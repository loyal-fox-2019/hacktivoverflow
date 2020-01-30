<template>
  <v-app>
    <div style="display: flex; justify-content:center;">
      <NavBar
        class="mt-1 mb-3 grey lighten-3"
        style="height: 10vh; position: fixed; z-index:100; width: 100vw"
      />
      <b-alert
        style="position: fixed; width: 80%; text-align:center; margin-top: 11vh; z-index:100"
        :show="$store.state.dismissCountDown"
        dismissible
        :variant="alertVariant"
        @dismissed="$store.state.dismissCountDown=0"
      >{{messageAlert}}</b-alert>
    </div>

    <!-- @dismiss-count-down="countDownChanged" -->
    <v-content style="margin-top: 10vh" id="scrolling-techniques-7">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",

  components: {
    // HelloWorld
    NavBar
  },
  data() {
    return {};
  },
  computed: {
    messageAlert() {
      return this.$store.state.alertMessage;
    },
    alertVariant() {
      return this.$store.state.alertVariant;
    }
  },
  created() {
    this.$store.dispatch("fetchAllQuestion");
    if (localStorage.getItem("token")) {
      this.$store.state.isLogin = true;
    }
  }
};
</script>

<style scoped>
</style>
