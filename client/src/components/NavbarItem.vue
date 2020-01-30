<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="dark" fixed="top">
      <b-navbar-brand href="#">HacktivOverflow</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="this.$store.state.isLogin">
          <b-nav-item href="#" @click.prevent="callModalAddQuestion">Add Question</b-nav-item>
          <b-nav-item href="#">My Profile</b-nav-item>
          <b-nav-item href="#" @click.prevent="logout">Logout</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!this.$store.state.isLogin">
          <b-nav-item href="#" v-b-modal.login>Login</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavbarItem",
  methods: {
    logout() {
      localStorage.clear();
      this.$store.commit("SET_LOGIN_FALSE");
    },
    callModalAddQuestion(){
      this.$bvModal.show('modal-new-question')
    }
  }
};
</script>