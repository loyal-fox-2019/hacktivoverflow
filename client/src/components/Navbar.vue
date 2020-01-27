<template>
  <b-navbar>
    <template slot="start">
      <b-navbar-item id="home">
        <router-link to="/"><strong>Home</strong></router-link>
      </b-navbar-item>
      <b-navbar-item>
        <router-link to="/about">Questions</router-link>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">Log in</a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello world',
    };
  },
};
</script>

<style scoped>
#home {
  margin-left: 1em;
}
</style>
