<template>
  <div class="container d-flex flex-column-reverse" style="padding-top:4rem;">
    <Question-List-Item
      v-for="question in $store.state.questions"
      :key="question.id"
      :question="question"
    ></Question-List-Item>
  </div>
</template>

<script>
// @ is an alias to /src

import QuestionListItem from "../components/QuestionListItem";
import axios from "axios";

export default {
  name: "home",
  components: {
    QuestionListItem
  },
  data() {
    return {
      questions: []
    };
  },
  created() {
    this.$store.dispatch("fetch_question");
  },
  methods: {}
};
</script>
