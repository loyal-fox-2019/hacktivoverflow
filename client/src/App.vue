<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {};
  },
  computed: {
    errors() {
      return this.$store.state.errors;
    },
    success() {
      return this.$store.state.success;
    },
  },
  watch: {
    errors(val) {
      console.log(val);
      if (val) {
        this.$bvToast.toast(JSON.parse(JSON.stringify(val)), {
          title: 'Failed!',
          autoHideDelay: 3000,
          variant: 'warning',
          appendToast: true,
        });
        this.$store.commit('SET_ERRORS', null);
      }
    },
    success(val) {
      this.$bvToast.toast(JSON.parse(JSON.stringify(val)), {
        title: 'Success!',
        autoHideDelay: 1000,
        variant: 'success',
        appendToast: true,
      });
      this.$store.commit('SET_SUCCESS', null);
    },
  },
  created() {
    const token = localStorage.getItem('stuckoverlow.token');
    if (token) {
      this.$store.commit('SET_ISLOGIN', token);
    }
  },
};
</script>
<style></style>
