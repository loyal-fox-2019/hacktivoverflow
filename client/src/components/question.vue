<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2 bg-white responseVertical" id="col-left">
          <div
            class="nav flex-column nav-pills"
            id="v-list-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              class="nav-link active"
              id="blogPost-tab"
              data-toggle="pill"
              href="#blogPost"
              role="tab"
              aria-controls="blogPost"
              aria-selected="false"
            >🌎 Stack Overflow</a>
          </div>
        </div>

        <div class="col-10 bg-light responseVertical">
          <div class="contentRight p-5">
            <div
              class="tab-pane fade show active"
              id="blogPost"
              role="tabpanel"
              aria-labelledby="blogPost-tab"
            >
              <div class="tab-content">
                <div
                  class="tab-pane fade show active"
                  id="pills-published"
                  role="tabpanel"
                  aria-labelledby="pills-published-tab"
                >
                  <div class="list-group-item section-header is-compact">
                    <div class="sectionHeaderLabel">
                      <h3>{{question.title}}</h3>
                    </div>
                    <div class="button sectionHeaderAction">
                      <router-link to="/askQuestion">
                        <button class="btn btn-danger" data-toggle="modal">ask your question</button>
                      </router-link>
                    </div>
                  </div>

                  <div class="card post is-compact justify-content-between">
                    <div style="margin:0 !important;">
                      <button @click="upVote">
                        <i class="fas fa-caret-up"></i>
                      </button>
                      <h4>{{getTotalVote(question.upvote,question.downvote)}}</h4>
                      <button @click="downVote">
                        <i class="fas fa-caret-down"></i>
                      </button>
                    </div>
                    <div
                      class="postMain d-flex ml-4"
                      style="height: auto;
                      text-align: left;"
                    >
                      <p style="font-size: 12px; max-width: 600px;" v-html="question.description"></p>
                      <div class="postCardInfo">
                        <span class="postInfoItem">
                          <img
                            src="https://image.flaticon.com/icons/png/512/37/37663.png"
                            alt="..."
                            class="rounded-circle"
                          />
                          <span>{{question.createdAt}}</span>
                        </span>
                      </div>
                      <div style="text-align: end;">Asked: {{username(question.user)}}</div>
                    </div>
                  </div>
                  <p>===================================================================================================</p>
                  <div style="text-align: left; padding: 15px 50px 15px">
                    <h5>{{getLengthAnswers(question.answers)}} Answers</h5>
                  </div>
                  <div
                    v-for="(answer,index) in answers"
                    :key="index"
                    class="card post is-compact justify-content-between"
                  >
                    <div style="margin:0 !important;">
                      <button @click="upVoteAnswer(answer._id)">
                        <i class="fas fa-caret-up"></i>
                      </button>
                      <h4>{{answer.upvote.length - answer.downvote.length}}</h4>
                      <button @click="downVoteAnswer(answers._id)">
                        <i class="fas fa-caret-down"></i>
                      </button>
                    </div>
                    <div
                      class="postMain d-flex ml-4"
                      style="height: auto;
                      text-align: left;"
                    >
                      <p style="font-size: 12px; max-width: 600px;" v-html="answer.description"></p>
                      <div class="postCardInfo">
                        <span class="postInfoItem">
                          <img
                            src="https://image.flaticon.com/icons/png/512/37/37663.png"
                            alt="..."
                            class="rounded-circle"
                          />
                          <span>{{answer.createdAt}}</span>
                        </span>
                      </div>
                      <div style="text-align: end;">Answered: {{answer.username}}</div>
                    </div>
                  </div>
                  <p>------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
                  <div style="text-align: left; padding: 0px 50px 10px">
                    <h5>Your Answers</h5>
                  </div>
                  <vue-editor v-model="description"></vue-editor>
                  <button
                    type="submit"
                    style="text-align:left"
                    class="btn btn-info"
                  >Post Your Answer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  data() {
    return {
      description: ""
    };
  },
  components: {
    VueEditor
  },
  methods: {
    upVote() {
      let id = this.$store.state.question._id;
      this.$store.dispatch("upVoteQuestion", id);
    },
    downVote() {
      let id = this.$store.state.question._id;
      this.$store.dispatch("downVoteQuestion", id);
    },
    upVoteAnswer(id) {
      this.$store.dispatch("upVoteAnswer", id);
    },
    downVoteAnswer(id) {
      this.$store.dispatch("downVoteAnswer", id);
    },
    getTotalVote(up, down) {
      if (up && down) {
        return up.length - down.length;
      }
    },
    getLengthAnswers(answers) {
      if (answers) {
        return answers.length;
      }
    },
    username(user) {
      if (user) {
        return user.username;
      }
    }
  },
  created() {
    this.$store.dispatch("getQuestion", this.$route.params.id);
  },
  computed: {
    answers() {
      return this.$store.state.question.answers;
    },
    question() {
      return this.$store.state.question;
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  line-height: 1.5;
}

header .bg-wordpress {
  background: #006088;
}

header .navbar-brand {
  padding: 12px 7px;
  background: #002c40;
}

.responseVertical {
  overflow-y: auto;
  height: 625px;
}

.responseVertical #v-list-tab a {
  color: black;
}

.responseVertical a:hover {
  background-color: #ccc;
}

.responseVertical a:active {
  background-color: #c5d9ed;
}

.nav-pills .nav-link {
  border-radius: 0;
}

.nav-pills .nav-link.active {
  background-color: #c5d9ed;
}

.nav {
  background: white;
}

.navPosts {
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0 0 17px;
}

#col-left {
  padding: 0;
}

.section-header.card {
  display: flex;
  flex-direction: row;
  line-height: 28px;
  padding: 11px 11px 11px;
  position: relative;
}

.sectionHeaderLabel {
  display: flex;
  align-items: center;
  flex-grow: 1;
  position: relative;
  overflow: hidden;
}

.sectionHeaderAction .btn {
  font-size: 12px;
  border-radius: 0;
  background-color: #c9356e;
}

.post {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.card.is-compact {
  padding: 16px;
}

.postMain {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.list-group-item {
  display: flex;
}

.postMain .postTitle {
  font-size: 18px;
  font-weight: bold;
  color: #000;
}

.postJudulItem {
  vertical-align: middle;
  padding: 2px 10px;
}

.postCardInfo {
  margin: 5px;
  font-size: 12px;
  color: #646970;
  display: flex;
  flex-direction: column;
}

.postCardInfo img {
  height: 13px;
  margin-right: 5px;
}

.nav-item-search {
  display: flex;
  flex: auto;
  padding: 7px;
}

.nav-item-search input {
  height: 25px;
  display: flex;
  flex-direction: row-reverse;
  /* margin: 6px 4px 6px */
}
.buttonContent {
  align-self: flex-end;
}
</style>