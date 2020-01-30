<template>
  <div id="app">
    <loading :active.sync="$store.state.isLoading"
        :is-full-page="$store.state.fullPage"
    ></loading>
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import Navbar from '@/components/Navbar.vue';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: { Navbar, Loading },
  data() {
    return {
      message: 'Hello world',
    };
  },
  created() {
    this.$store.dispatch('checkLogin');
  },
};
</script>

<style scoped>
</style>
