<template>
  <section>
    <div id="image">
      <img src="https://www.sencha.com/wp-content/uploads/2019/10/s-o-banner.png" alt="" srcset="">
    </div>
    <div id="text">
      <h1 style="text-align: center;">
        <strong>For developers, by developers</strong>
        <hr class="hr-1">
      </h1>
      <p id="description"
        style="text-align: center;">
        Stack Overflow is an open community for anyone that codes. We help you<br>
        get answers to your toughest coding questions, share knowledge with<br>
        your coworkers in private, and find your next dream job.
      </p>
    </div>
  </section>
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
@import url('https://fonts.googleapis.com/css?family=Heebo|Quicksand&display=swap');

img {
  width: 100vw;
  height: 60vh;
}
h1 {
  margin-top: 0.5em;
  font-size: 2em;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
}
p {
  padding: 0;
  margin-top: 0;
  font-family: 'Heebo', sans-serif;
}
.hr-1 {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 10vw;
  border: 3px solid red;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}
</style>
