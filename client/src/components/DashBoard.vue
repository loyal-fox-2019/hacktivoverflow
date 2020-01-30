<template>
  <div class="dashboard overflow-auto">
    <div class="link mt-5 p-2">
      <div class="d-flex mx-auto justify-content-start" v-on:click="goHome">Home</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashBoard",
  methods: {
    goHome() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
      this.$store.dispatch("getAllQuestion");
    }
  }
};
</script>

<style scoped>
.dashboard {
  height: 90vh;
  border-right: 1px solid lightgray;
}

.link:hover {
  /* background-color: lightslategrey; */
  cursor: pointer;
  color: lightslategray;
}

.link {
  font-size: 20px;
}
</style>