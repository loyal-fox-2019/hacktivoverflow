<template>
  <div>
    <div class="d-flex mx-auto p-2 question">
      <div class="col-2 align-self-center">
        <div class="flex-column">
          <div class="col container no-gutters flex-column align-self-center">
            <div
              class="col angkaAnswer"
            >{{dataQuestion.upvote.length - dataQuestion.downvote.length}}</div>
            <div class="col tulisanAnswer">Votes</div>
          </div>
          <div class="col container no-gutters flex-column answerSum align-self-center">
            <div class="col angkaAnswer">{{dataku.length}}</div>
            <div class="col tulisanAnswer">answers</div>
          </div>
        </div>
      </div>
      <div class="col-10">
        <div class="flex-column isi">
          <div
            class="col titleQuestion"
            v-on:click="setCurrentQuestion(dataQuestion._id)"
          >{{dataQuestion.title}}</div>
          <div class="col" v-html="dataQuestion.description"></div>
          <div class="col no-gutters d-flex">
            <div class="col-6"></div>
            <div class="col-6 askedBy">Asked by: {{dataQuestion.userId.username}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "questionList",
  props: ["dataQuestion"],
  data() {
    return {
      punyaku: false,
      dataku: null
    };
  },
  methods: {
    setCurrentQuestion(id) {
      // console.log(id, "halo dari id di question list");
      this.$store.dispatch("setCurrentQuestion", id);
      this.$router.push(`/perQuestion/${id}`);
    }
  },
  computed: {
    replies() {
      if (!this.$store.state.currentReplies) {
        this.$store.dispatch("getReplies", this.dataQuestion._id);
        return "loading..";
      } else {
        return this.$store.state.currentReplies;
      }
    }
  },
  mounted() {
    this.$store.dispatch("getReplies", this.dataQuestion._id);
    axios({
      method: "get",
      url: `http://localhost:3000/question/answers/${this.dataQuestion._id}`
    })
      .then(({ data }) => {
        this.dataku = data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.isi {
  text-align: left;
}

.question {
  border-top: 1px solid #e4e6e8;
}

.answerSum {
  background-color: #5eba7d;
  border-radius: 10px;
  color: white;
}

.angkaAnswer {
  font-size: 20px;
}

.tulisanAnswer {
  font-size: 12px;
}

.titleQuestion {
  font-size: 24px;
  font-weight: bold;
}
.titleQuestion:hover {
  color: lightslategray;
  cursor: pointer;
}

.askedBy {
  text-align: end;
}

.deleteBTN {
  width: 30px;
}
</style>