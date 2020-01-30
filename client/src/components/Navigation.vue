<template>
  <nav class="navbar fixed-top navbar-expand-sm bg-light text-dark shadow-sm">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo03"
      aria-controls="navbarTogglerDemo03"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link class="navbar-brand text-dark" to="/">StuckOverlow</router-link>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
      <div class="form-inline my-2 my-lg-0">
        <span
          class="nav-link my-2 my-sm-0 text-dark"
          @click="$router.go(0), $store.commit('SET_SUCCESS', 'page have reloaded')"
          style="cursor:pointer;"
        >
          <font size="3">
            <b-icon-bootstrap-reboot></b-icon-bootstrap-reboot>
          </font>
        </span>
        <template v-if="$store.state.isLogin">
          <router-link :to="{ name: 'dashboard' }" class="nav-link my-2 my-sm-0 text-dark">
            {{ myEmail }}
          </router-link>
          <a href="#" class="nav-link my-2 my-sm-0 text-dark" @click="$store.dispatch('logout')">
            <font size="3">
              <b-icon-power></b-icon-power>
            </font>
          </a>
        </template>
        <template v-else>
          <router-link to="/auth" class="nav-link my-2 my-sm-0 text-dark">
            <font size="3">
              <b-icon-box-arrow-right />
            </font>
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',

  data() {
    return {};
  },
  computed: {
    myEmail() {
      return localStorage.getItem('stuckoverlow.email');
    },
  },
  methods: {
    urlSc() {
      return Math.floor(6 * Math.random()) + 1;
    },
  },
};
</script>

<style lang="css" scoped>
nav {
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
  padding: 0.3rem 0.8rem !important;
}
.form-inline a.nav-link {
  padding: 0.5rem 0.5rem;
}
</style>
