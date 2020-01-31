<template>
  <nav class="navbar navbar-light bg-light">
    <div class="row">
      <div class="col">
        <img
          @click="goHome"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/1280px-Stack_Overflow_logo.svg.png"
          width="150"
          height="30"
          alt
        />
      </div>
      <div class="col">
        <div class="input-group flex-nowrap">
          <div class="input-group-prepend">
            <span class="input-group-text" id="addon-wrapping">🔍</span>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="addon-wrapping"
            style="width: 500px"
          />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
          </div>
        </div>
      </div>
      <div class="col ml-5">
        <button
          v-if="$store.state.login"
          @click="myQuestion"
          type="button"
          class="btn btn-info"
        >My Question</button>
      </div>
      <button
        v-if="$store.state.login"
        @click="myAnswer"
        type="button"
        class="btn btn-info"
      >My Answer</button>
    </div>
    <form class="form-inline">
      <button v-if="!$store.state.login" @click="account" type="button" class="btn btn-info">account</button>
      <button v-if="$store.state.login" @click="logout" type="button" class="btn btn-info">Logout</button>
    </form>
  </nav>
</template>

<script>
export default {
  methods: {
    account() {
      this.$router.push("/account");
    },
    logout() {
      this.$store.dispatch("goLogout");
      this.$router.push("/");
    },
    goHome() {
      this.$router.push("/");
    },
    myQuestion() {
      this.$router.push("/myQuestion");
    },
    myAnswer() {
      this.$router.push("/myAnswer");
    }
  }
};
</script>

<style scoped>
.navbar {
  min-width: 100%;
}
</style>