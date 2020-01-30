<template>
  <div>{{quest.title}}</div>
</template>

<script>
import moduleName from "../components/Cards";
export default {
  name: "Question",
  data() {
    return {
      quest: {},
      answers: []
    };
  },
  beforeMount() {
    this.$store
      .dispatch("fetchSingleQuestion", this.$route.params.id)
      .then(({ data }) => {
        this.quest = data;
      })
      .catch(err => {
        console.log(err.response.data.message);
        this.$store.commit("SET_ALERT", {
          message: err.response.data.message,
          variant: "danger"
        });
      });
  },
  mounted() {
    this.$store
      .dispatch("fetchTheAnswer", this.$route.params.id)
      .then(({ data }) => {
        this.answers = data;
      })
      .catch(err => {
        this.$store.commit("SET_ALERT", {
          message: err.response.data.message,
          variant: "danger"
        });
        console.log(err.response.data.message);
      });
  },
  watch: {
    ["$route.params.id"]: async function() {
      try {
        this.quest = this.$store.dispatch(
          "fetchSingleQuestion",
          this.$route.params.id
        );
        this.answers = this.$store.dispatch(
          "fetchTheAnswer",
          this.$route.params.id
        );
      } catch (err) {
        this.$store.commit("SET_ALERT", {
          message: err.response.data.message,
          variant: "danger"
        });
        console.log(err.response.data.message);
      }
    }
  }
};
</script>

<style>
</style>