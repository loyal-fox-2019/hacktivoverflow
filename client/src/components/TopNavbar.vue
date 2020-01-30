<template>
  <div>
    <b-navbar type="light" variant="light" class="shadow-sm m-0 p-0 fixed-top">
      <b-container>
        <b-navbar-brand to="/">
          Error<span class="font-weight-bold text-success">Handler</span>()
        </b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items when not login -->
          <b-navbar-nav class="ml-auto" v-if="!isLogin">
            <b-nav-item>
              <b-button
                size="sm"
                variant="outline-dark"
                class="mx-1"
                to="/login"
              >
                Login
              </b-button>
              <b-button size="sm" variant="primary" to="/register">
                Register
              </b-button>
            </b-nav-item>

            <!-- <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form> -->
          </b-navbar-nav>

          <!-- Right aligned nav items when login -->
          <b-navbar-nav class="ml-auto" v-if="isLogin">
            <b-nav-item>
              <b-nav-text>
                {{ name }}
              </b-nav-text>
              <b-button
                variant="outline-danger"
                class="mx-2 font-weight-bold"
                size="sm"
                squared
                @click.prevent="logout"
                title="Log out"
              >
                <b-icon icon="power"></b-icon>
                Log out
              </b-button>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      this.$store.state.isLogin = false;
      if (this.$route.name !== "try list") {
        this.$router.replace({ name: "try list" });
      }
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    name() {
      return this.$store.state.userLogin;
    }
  }
};
</script>

<style scoped>
nav {
  border-top: 3px solid red;
}
</style>
