<template>
  <div>
    <div class="isiPertanyaan" v-if="!editStatus">
      <div class="d-flex mx-auto my-3 justify-content-between judulPer">
        <h2>{{bagusinTitle}}</h2>
        <div class="btn btn-primary my-2" v-on:click="askQuestion">Ask A Question</div>
      </div>
      <div class="d-flex mx-auto judulPer">
        <div class="col-1">
          <div class="flex-column">
            <div class="col vote">
              <i class="fas fa-3x fa-caret-up" v-on:click="upvoteQuestion(currentQuestion._id)"></i>
              <!-- <i class="fas fa-3x fa-caret-up voted" v-else></i> -->
            </div>
            <div class="col">{{currentQuestion.upvote.length - currentQuestion.downvote.length}}</div>
            <!-- <div class="col">{{voteQuestion}}</div> -->
            <div class="col vote">
              <i class="fas fa-3x fa-caret-down" v-on:click="downvoteQuestion(currentQuestion._id)"></i>
              <!-- <i class="fas fa-3x fa-caret-down downVoted" v-else></i> -->
            </div>
          </div>
        </div>
        <div class="col-11 description no-gutters">
          <div class="d-flex">
            <div class="col-10">
              <h5 v-html="currentQuestion.description"></h5>
            </div>
            <div class="col-2">
              <div class="d-flex">
                <div class="btn btn-primary" v-on:click="editThis">Edit</div>
                <div class="btn btn-danger" v-on:click="hapusQuestion(currentQuestion._id)">Delete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- buat Edit -->
    <div class="isiPertanyaan" v-else-if="editStatus">
      <div class="d-flex mx-auto my-3 justify-content-between judulPer">
        <!-- <div class="d-flex mx-auto"> -->
        <div class="col-1">
          <h4>Title</h4>
        </div>
        <div class="col-11">
          <b-form>
            <b-form-group id="input-group-1" label-for="input-1">
              <b-form-input id="input-1" v-model="bagusinTitle" type="text" required></b-form-input>
            </b-form-group>
          </b-form>
          <div class="col">
            <quillEditor :myQuillEditor="editorOption" v-model="currentQuestion.description"></quillEditor>
            <div class="d-flex justify-content-end buttonReply">
              <div
                class="btn btn-primary mb-4"
                v-on:click="saveChange(currentQuestion._id)"
              >Save Change</div>
              <div class="btn btn-danger mb-4" v-on:click="cancelEdit">Cancel</div>
            </div>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>
    <!-- buat edit end -->

    <div class="d-flex mx-auto mt-3">
      <h4>{{currentReplies.length}} Answer(s)</h4>
      <div class="col"></div>
      <div class="col"></div>
    </div>
    <div class="flex-column">
      <reply-list v-for="one of currentReplies" :dataReplies="one" :key="one._id"></reply-list>
    </div>
    <!-- <div class="d-flex">{{currentReplies}}</div> -->
    <div class="flex-column mx-auto mt-3" v-if="!editStatus">
      <h3>Reply Here</h3>
      <div class="d-flex mx-auto mt-4">
        <div class="col-1">
          <h4>Title</h4>
        </div>
        <div class="col-11">
          <b-form>
            <b-form-group id="input-group-1" label-for="input-1">
              <b-form-input id="input-1" v-model="title" type="text" required></b-form-input>
            </b-form-group>
          </b-form>
        </div>
      </div>
      <div class="col">
        <quillEditor class="reply" v-model="description " :myQuillEditor="editorOption"></quillEditor>
        <div class="d-flex justify-content-end buttonReply">
          <div class="btn btn-primary" v-on:click="reply(currentQuestion._id)">Reply</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import replyList from "../components/replyList.vue";
export default {
  name: "perQuestion",
  components: {
    quillEditor,
    replyList
  },
  data() {
    return {
      description: "<p>Your reply here...</p>",
      editorOption: {
        /* quill options */
      },
      title: "",
      editStatus: false,
      voteQuestion: null
    };
  },
  computed: {
    currentQuestion() {
      if (!this.$store.state.currentQuestion) {
        this.$store.dispatch("setCurrentQuestion", this.$route.params.id);
        this.$store.dispatch("getReplies", this.$route.params.id);
        return { title: "loading...", description: "loading..." };
      } else {
        return this.$store.state.currentQuestion;
      }
    },
    bagusinTitle() {
      const lower = this.currentQuestion.title;
      const upper = lower.charAt(0).toUpperCase() + lower.substring(1);
      return upper;
    },
    currentReplies() {
      if (!this.$store.state.currentReplies) {
        this.$store.dispatch("setCurrentQuestion", this.$route.params.id);
        this.$store.dispatch("getReplies", this.$route.params.id);
        return {
          title: "loading...",
          description: "loading",
          upvote: "a",
          downvote: "a"
        };
      } else {
        // console.log(this.$store.state.currentReplies, "ini replynya di perq");
        return this.$store.state.currentReplies;
      }
    }
  },
  mounted() {
    this.$store.dispatch("setCurrentQuestion", this.$route.params.id);
    this.$store.dispatch("getReplies", this.$route.params.id);
    // axios({
    //   method: "GET",
    //   url: `${this.$store.state.baseUrl}/question/oneQuestion/${this.$route.params.id}`
    // })
    //   .then(({ data }) => {
    //     this.voteQuestion = data.upvote.length - data.downvote.length;
    //   })
    //   .catch(err => {
    //     console.log(err, "ini gagal upvote");
    //   });
  },
  created() {},
  methods: {
    askQuestion() {
      this.$router.push("/askQuestion");
    },
    reply(id) {
      if (!localStorage.getItem("token")) {
        this.$router.push("/loginReg");
      } else {
        let jawaban = {
          description: this.description,
          title: this.title,
          id: id
        };

        this.$store.dispatch("reply", jawaban);
      }
    },
    hapusQuestion(id) {
      this.$store.dispatch("hapusQuestion", id);
    },
    editThis() {
      this.editStatus = true;
    },
    cancelEdit() {
      this.editStatus = false;
    },
    saveChange(id) {
      let editanQuestion = {
        description: this.currentQuestion.description,
        title: this.currentQuestion.title,
        id: id
      };
      this.$store.dispatch("saveChangeQuestion", editanQuestion);
    },
    upvoteQuestion(id) {
      this.$store.dispatch("upvoteQuestion", id);
    },
    downvoteQuestion(id) {
      this.$store.dispatch("downvoteQuestion", id);
    }
  }
};
</script>

<style scoper>
.judulPer {
  border-bottom: 1px solid #e4e6e8;
}

.vote:hover {
  color: lightslategray;
  cursor: pointer;
}

.description {
  text-align: start;
}

.reply {
  height: 20vh;
}
.buttonReply {
  margin-top: 90px;
}

.voted {
  color: green;
}

.downVoted {
  color: red;
}
</style>