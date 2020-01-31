<template>
  <div class="my-3">
    <b-card :sub-title="answerer">
      <b-card-text v-html="answer.content"></b-card-text>

      <b-card-text>
        <b-badge v-for="(tag, i) in answer.tags" :key="i" style="margin:5px;"># {{tag}}</b-badge>
      </b-card-text>

      <div class="d-flex justify-content-end">
        <b-link href="#" class="card-link" @click.prevent="upVoteAnswer(answer.id)">
          <i class="far fa-thumbs-up fa-lg"></i>
          {{answer.totalUpVotes}}
          <span>Vote Up</span>
        </b-link>
        <b-link href="#" class="card-link" @click.prevent="downVote(answer.id)">
          <i class="far fa-thumbs-down fa-lg"></i>
          {{answer.totalDownVotes}}
          <span>Vote Down</span>
        </b-link>
      </div>
    </b-card>
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :can-cancel="true"
        :on-cancel="onCancel"
        :is-full-page="fullPage"
      ></loading>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "AnswerCard",
  components: {
    Loading
  },
  props: ["answer"],
  data() {
    return {
      isLoading: false,
      fullPage: true
    };
  },
  computed: {
    answerer() {
      return `${this.answer.owner.name} | ${new Date(
        this.answer.createdAt
      ).toUTCString()}`;
    }
  },
  methods: {
    upVoteAnswer(id) {
      this.isLoading = true;
      if (!this.$store.state.isLogin) {
        Swal.fire(
          `Vote Up Failed!`,
          `You Have Login First To Vote Up This Question`,
          "error"
        );
      } else {
        axios({
          method: "post",
          url: `http://localhost:3000/answers/${id}/votes`,
          data: {
            vote: 1
          },
          headers: {
            Authorization: "token " + localStorage.getItem("access_token")
          }
        })
          .then(({ data }) => {
            Swal.fire(
              `Vote Up Success`,
              `You Have Been Vote Up For This Question`,
              "success"
            );
            this.$emit("addVoteAction");
          })
          .catch(error => {
            console.log(error.response);
            Swal.fire(`Vote Up Error`, error.response, "error");
          });
      }
      this.isLoading = false;
    },
    downVote(id) {
      this.isLoading = true;
      if (!this.$store.state.isLogin) {
        Swal.fire(
          `Vote Up Failed!`,
          `You Have Login First To Vote Up This Question`,
          "error"
        );
      } else {
        axios({
          method: "post",
          url: `http://localhost:3000/answers/${id}/votes`,
          data: {
            vote: -1
          },
          headers: {
            Authorization: "token " + localStorage.getItem("access_token")
          }
        })
          .then(({ data }) => {
            Swal.fire(
              `Vote Down Success`,
              `You Have Been Vote Down For This Question`,
              "success"
            );
            this.$emit("addVoteAction");
          })
          .catch(error => {
            console.log(error.response);
            Swal.fire(`Vote Up Error`, error.response, "error");
          });
      }
      this.isLoading = false;
    }
  }
};
</script>