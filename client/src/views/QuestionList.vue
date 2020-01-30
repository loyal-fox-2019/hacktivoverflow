<template>
  <b-col cols="10" class="mt-5 pt-4" style="border-left:2px solid lightgrey">
    <b-row>
      <b-col class="text-left ml-3">
        <h2>All Catches</h2>
      </b-col>
      <b-col class="text-right">
        <b-button
          variant="primary"
          @click.prevent="askTry"
          style="font-size:13px;"
          class="p-2 shadow-sm"
        >
          Try Error
        </b-button>
      </b-col>
    </b-row>
    <b-row class="my-4" style="border-bottom:2px solid lightgrey;">
      <b-col class="text-left text-dark ml-3">
        <span v-if="$store.state.questions.length > 0">
          {{
            $store.state.questions.length
              .toFixed(0)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
          }}
        </span>
        <span v-if="$store.state.questions.length > 1">tries</span>
        <span v-else-if="$store.state.questions.length === 1">try</span>
        <span v-else>All green, 0 Errors found</span>
      </b-col>
      <b-col>
        <b-button-group size="sm">
          <b-button
            v-for="(btn, idx) in buttons"
            :key="idx"
            :pressed.sync="btn.state"
            variant="outline-success"
          >
            {{ btn.caption }}
          </b-button>
        </b-button-group>
        <p class="text-muted mt-2" style="font-size:11px;">
          Combined sort results are based on each sort category
        </p>
      </b-col>
    </b-row>

    <b-row v-for="question in questions" :key="question._id">
      <b-col>
        <question-card :data="question"></question-card>
        <hr />
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import QuestionCard from "@/components/QuestionCard.vue";

export default {
  components: {
    QuestionCard
  },
  data() {
    return {
      buttons: [
        { caption: "Newest", state: true },
        { caption: "Votes", state: false },
        { caption: "Views", state: false },
        { caption: "Unanswered", state: false }
      ]
    };
  },
  methods: {
    askTry() {
      if (!this.isLogin) {
        this.$swal({
          title: "Error",
          text: "You must be logged in to ask question on ErrorHandler()",
          icon: "error",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok, let me login"
        }).then(result => {
          if (result.value) {
            this.$router.push({ name: "login" });
          }
        });
      } else {
        this.$router.push({ name: "try" });
      }
    }
  },
  computed: {
    questions() {
      return this.$store.state.questions;
    },
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  created() {
    this.$store.dispatch("fetchQuestions");
  }
};
</script>
