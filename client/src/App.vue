<template>
  <div>
    <Navbar/>
    <Modal/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      message: 'Hello world',
    };
  },
};
</script>

<style scoped>
</style>
