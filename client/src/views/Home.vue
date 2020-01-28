<template>
  <div id="main">
    <div id="image">
      <img src="../assets/image/banner.png" alt="">
    </div>
    <div id="text" class="text-center mt-2">
      <h3 class="mt-4">
        <strong
          style="font-size: 2em; font-family: 'Bitter', serif;">
          For developers, by developers
        </strong>
      </h3>
      <p style="font-size: 1.5em; font-family: 'Barlow Condensed', sans-serif;">
        Stack Overflow is an open community for anyone that codes. We help you<br>
        get answers to your toughest coding questions, share knowledge with<br>
        your coworkers in private, and find your next dream job.
      </p>
      <b-button variant="primary" to="/questions">Browse Questions</b-button>
    </div>
  </div>
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
@import url('https://fonts.googleapis.com/css?family=Barlow+Condensed|Bitter&display=swap');

img {
  width: 100vw;
  height: 50vh;
}
/* #text {
} */
</style>
