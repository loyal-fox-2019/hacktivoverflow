<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: { Navbar },
  data() {
    return {
      message: 'Hello world',
    };
  },
  created() {
    this.$store.dispatch('fetchData');
    this.$store.dispatch('checkLogin');
  },
};
</script>

<style scoped>
</style>
