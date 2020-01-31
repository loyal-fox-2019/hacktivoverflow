<template>
  <div class="home">
    <questions />
  </div>
</template>

<script>
import questions from "../components/questions";

export default {
  name: "home",
  components: {
    questions
  },
  created() {
    this.$store.dispatch("findAllQuestions");
  }
};
</script>
