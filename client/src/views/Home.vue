<template>
  <div class="home">
    <div class="mt-4 d-flex justify-content-between">
      <b-nav-form class="mx-2">
        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>
      <div class="btn btn-primary" v-on:click="askQuestion">Ask A Question</div>
    </div>
    <div class="mt-4">
      <question-list v-for="one in allQuestions" :dataQuestion="one" :key="one._id"></question-list>
    </div>
    <div class="borderBot"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import questionList from "../components/questionList.vue";
export default {
  name: "home",
  data() {
    return {
      // boongan: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    };
  },
  components: {
    questionList
  },
  computed: {
    allQuestions() {
      return this.$store.state.allQuestions;
    }
  },
  created() {
    this.$store.dispatch("getAllQuestion");
  },
  methods: {
    askQuestion() {
      if (!localStorage.getItem("token")) {
        this.$router.push("/loginReg");
      } else {
        this.$router.push("/askQuestion");
      }
    }
  }
};
</script>

<style scoped>
.borderBot {
  border-bottom: 1px solid #e4e6e8;
}
</style>
