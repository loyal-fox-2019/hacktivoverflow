<template>
  <b-container fluid class="p-0">
    <top-navbar></top-navbar>
    <router-view></router-view>
  </b-container>
</template>

<script>
import TopNavbar from "@/components/TopNavbar.vue";

export default {
  components: {
    TopNavbar
  }
};
</script>
