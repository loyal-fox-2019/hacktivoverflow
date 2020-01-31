<template>
  <div class="container" style="padding-top:4rem;">
    <b-card :title="question.title" :sub-title="questioner">
      <b-card-text v-html="question.content"></b-card-text>

      <b-card-text>
        <b-badge v-for="(tag, i) in question.tags" :key="i" style="margin:5px;"># {{tag}}</b-badge>
      </b-card-text>

      <div class="d-flex justify-content-end">
        <b-link href="#" class="card-link" v-if="canEditQuestion" v-b-modal.modal-edit-question>
          <i class="fas fa-edit fa-lg"></i>
          <span>Edit</span>
        </b-link>

        <b-link href="#" class="card-link" v-if="canEditQuestion" @click="deleteQuestion">
          <i class="fas fa-trash fa-lg"></i>
          <span>Remove</span>
        </b-link>

        <b-link href="#" class="card-link" v-b-modal.modal-add-answer>
          <i class="far fa-comments fa-lg"></i>
          {{question.totalAnswer}}
          <span>Reply</span>
        </b-link>
        <b-link href="#" class="card-link" @click.prevent="upVote(question.id)">
          <i class="far fa-thumbs-up fa-lg"></i>
          {{question.totalUpVotes}}
          <span>Vote Up</span>
        </b-link>
        <b-link href="#" class="card-link" @click.prevent="downVote(question.id)">
          <i class="far fa-thumbs-down fa-lg"></i>
          {{question.totalDownVotes}}
          <span>Vote Down</span>
        </b-link>
      </div>
    </b-card>
    <div>
      <Answer-Card
        v-for="answer in question.answers"
        :key="answer._id"
        :answer="answer"
        @addVoteAction="fetch"
      ></Answer-Card>
    </div>
    <b-modal id="modal-add-answer" title="Answer The Question" hide-footer size="xl">
      <form @submit.prevent="addNewAnswer">
        <div class="alert alert-danger" role="alert" v-if="errorMessageAnswer">
          <span v-for="(error, i) in errorMessageAddQuestion" :key="i">
            {{errorMessageAddQuestion}}
            <br />
          </span>
        </div>
        <div class="form-group">
          <label for="exampleInputAnswerContent">Answer</label>
          <wysiwyg v-model="addAnswerContent" />
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </b-modal>
    <b-modal id="modal-edit-question" title="Edit Question" hide-footer size="xl">
      <form @submit.prevent="editQuestion">
        <div class="alert alert-danger" role="alert" v-if="errorMessageEdit">
          <span v-for="(error, i) in errorMessageAddQuestion" :key="i">
            {{errorMessageAddQuestion}}
            <br />
          </span>
        </div>
        <div class="form-group">
          <label for="exampleInputQuestionTitle">Title</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputQuestionTitle"
            placeholder="Title"
            :value="question.title"
            required
          />
        </div>
        <div class="form-group">
          <label for="exampleInputQuestionContent">Question</label>
          <wysiwyg v-model="editQuestionContent" />
        </div>
        <div class="form-group">
          <label for="inputQuestionTags">Tags</label>
          <b-form-tags v-model="editQuestionTags" class="form-control"></b-form-tags>
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import AnswerCard from "../components/AnswerCard";

export default {
  name: "DetailQuestion",
  components: {
    AnswerCard
  },
  data() {
    return {
      question: {},
      addAnswerContent: "",
      errorMessageAnswer: "",
      editQuestionTitle: "",
      editQuestionContent: "",
      editQuestionTags: [],
      errorMessageEdit: ""
    };
  },
  methods: {
    addNewAnswer() {
      if (!this.$store.state.isLogin) {
        Swal.fire(
          `Post Answer Failed!`,
          `You Have Login First To Answer This Question`,
          "error"
        );
      } else {
        axios({
          method: "post",
          url: `https://hacktivoverflow-server.prograami.com/answers/${this.$route.params.questionID}/`,
          data: {
            answer: this.addAnswerContent
          },
          headers: {
            Authorization: "token " + localStorage.getItem("access_token")
          }
        })
          .then(({ data }) => {
            this.$bvModal.hide("modal-add-answer");
            Swal.fire(
              `Post Answer Success!`,
              `You Have Been Answer For This Question`,
              "success"
            );
            axios
              .get(
                `https://hacktivoverflow-server.prograami.com/questions/${this.$route.params.questionID}`
              )
              .then(({ data }) => {
                this.question = data.question;
                // context.commit("SET_QUESTIONS_LIST", data.questions);
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    editQuestion() {
      if (!this.$store.state.isLogin) {
        Swal.fire(
          `Edit Answer Failed!`,
          `You Have Login First To Edit This Question`,
          "error"
        );
      } else {
        axios({
          method: "patch",
          url: `https://hacktivoverflow-server.prograami.com/questions/${this.$route.params.questionID}/`,
          data: {
            title: this.editQuestionTitle,
            question: this.editQuestionContent,
            tags: this.editQuestionTags
          },
          headers: {
            Authorization: "token " + localStorage.getItem("access_token")
          }
        })
          .then(({ data }) => {
            this.$bvModal.hide("modal-edit-question");
            Swal.fire(
              `Edit Answer Success!`,
              `You Have Been Edit For This Question`,
              "success"
            );
            axios
              .get(
                `https://hacktivoverflow-server.prograami.com/questions/${this.$route.params.questionID}`
              )
              .then(({ data }) => {
                this.question = data.question;
                // context.commit("SET_QUESTIONS_LIST", data.questions);
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    deleteQuestion() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios({
            method: "delete",
            url: `https://hacktivoverflow-server.prograami.com/questions/${this.$route.params.questionID}`,
            headers: {
              Authorization: "token " + localStorage.getItem("access_token")
            }
          })
            .then(() => {
              Swal.fire("Deleted!", "Question has been deleted.", "success");
              this.$router.push('/')
            })
            .catch(err => {
              console.log(err.response);
            });
        }
      });
    },
    upVote(id) {
      if (!this.$store.state.isLogin) {
        Swal.fire(
          `Vote Up Failed!`,
          `You Have Login First To Vote Up This Question`,
          "error"
        );
      } else {
        axios({
          method: "patch",
          url: `https://hacktivoverflow-server.prograami.com/questions/${this.$route.params.questionID}/votes`,
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
            axios
              .get(
                `https://hacktivoverflow-server.prograami.com/questions/${this.$route.params.questionID}`
              )
              .then(({ data }) => {
                this.question = data.question;
                // context.commit("SET_QUESTIONS_LIST", data.questions);
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error.response);
            Swal.fire(`Vote Up Error`, error.response, "error");
          });
      }
    },
    downVote(id) {
      if (!this.$store.state.isLogin) {
        Swal.fire(
          `Vote Up Failed!`,
          `You Have Login First To Vote Up This Question`,
          "error"
        );
      } else {
        axios({
          method: "patch",
          url: `https://hacktivoverflow-server.prograami.com/questions/${this.$route.params.questionID}/votes`,
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
            axios
              .get(
                `https://hacktivoverflow-server.prograami.com/questions/${this.$route.params.questionID}`
              )
              .then(({ data }) => {
                this.question = data.question;
                // context.commit("SET_QUESTIONS_LIST", data.questions);
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error.response);
            Swal.fire(`Vote Up Error`, error.response, "error");
          });
      }
    },
    fetch() {
      axios
        .get(`https://hacktivoverflow-server.prograami.com/questions/${this.$route.params.questionID}`)
        .then(({ data }) => {
          this.question = data.question;
          this.editQuestionTitle = data.question;
          this.editQuestionContent = data.question;
          this.editQuestionTags = data.question;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    questioner() {
      return `${this.question.owner.name} | ${new Date(
        this.question.createdAt
      ).toUTCString()}`;
    },
    canEditQuestion() {
      return this.question.owner._id === this.$store.state.userID;
    }
  },
  beforeCreate() {
    axios
      .get(`https://hacktivoverflow-server.prograami.com/questions/${this.$route.params.questionID}`)
      .then(({ data }) => {
        this.question = data.question;
        this.editQuestionTitle = data.question.title;
        this.editQuestionContent = data.question.content;
        this.editQuestionTags = data.question.tags;
        // context.commit("SET_QUESTIONS_LIST", data.questions);
      })
      .catch(error => {
        console.log(error);
      });
  },
  mounted() {}
};
</script>