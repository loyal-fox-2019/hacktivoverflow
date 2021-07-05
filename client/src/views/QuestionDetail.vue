<template>
    <div class="question-detail">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="main-bar border-left p-3">
                        <div class="grid border-bottom pb-5">
                            <span class="headline">{{ question.title }}</span>
                            <router-link to="/ask" class="btn btn-primary float-right">Ask Questions</router-link>
                        </div>
                        <div class="row post-layout mt-3">
                            <div class="col-2 post-layout-left">
                                <div class="voting-container">
                                    <div class="vote-up">
                                        <i class="fas fa-caret-up"></i>
                                    </div>
                                    <div class="vote-count">
                                        <span class="total">80</span>
                                    </div>
                                    <div class="vote-down">
                                        <i class="fas fa-caret-down"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-10 post-layout-right pt-2">
                                <div class="post-text">
                                    <p v-html="question.desc"></p>
                                </div>
                                <div class="tags">
                                    <span class="badge badge-secondary">phyton</span>
                                    <span class="badge badge-secondary">arrays</span>
                                    <span class="badge badge-secondary">list</span>
                                </div>
                            </div>
                        </div>
                        <div class="answers-headers border-bottom pb-3">
                            <p class="answer-count">{{ answers.length }} Answers</p>
                        </div>
                        <!-- loop answers -->
                        <div v-for="answer in answers" :key="answer._id" class="row post-layout mt-3">
                            <div class="col-2 post-layout-left">
                                <div class="voting-container">
                                    <div class="vote-up">
                                        <i class="fas fa-caret-up"></i>
                                    </div>
                                    <div class="vote-count">
                                        <span class="total">17</span>
                                    </div>
                                    <div class="vote-down">
                                        <i class="fas fa-caret-down"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-10 post-layout-right pt-2">
                                <div class="post-text">
                                    <p v-html="answer.desc"></p>
                                </div>
                                <div class="tags">
                                    <span class="badge badge-secondary">phyton</span>
                                    <span class="badge badge-secondary">arrays</span>
                                    <span class="badge badge-secondary">list</span>
                                </div>
                                <div class="created">
                                    <div class="by-user">
                                        <p class="date">Answered by<span class="name"> {{ answer.idUser.username }}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end of loop answers -->
                        <div class="your-answer">
                            <p class="answer">Your Answer</p>
                        </div>
                        <form @submit.prevent="submitAnswer">
                            <vue-editor v-model="contentAnswer"></vue-editor>
                            <button type="submit" class="btn btn-primary mt-3 mb-5">Post Your Answer</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';

export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      contentAnswer: '',
    };
  },
  created() {
    this.$store.dispatch('findoneQuestion', this.$route.params.id);
  },
  methods: {
    submitAnswer() {
      const answer = {
        idQuestion: this.$route.params.id,
        desc: this.contentAnswer,
      };
      this.$store.dispatch('submitAnswer', answer);
      this.contentAnswer = '';
    },
  },
  computed: {
    question() {
      return this.$store.state.question;
    },
    answers() {
      return this.$store.state.answers;
    },
  },
  mounted() {
    this.$store.dispatch('findallAnswers', this.$route.params.id);
  },
};
</script>

<style scoped>
.main-bar {
  min-height: 40rem;
}
.headline {
  font-weight: 400;
  font-size: 1.2rem;
}
.btn-primary {
  background-color: #0095ff;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
}
.btn {
  padding: .6rem;
  border: 1pz solid transparent;
}
.tags {
  margin-top: .2rem;
}
.tags .badge {
  margin-left: .5rem;
}
.badge {
  padding: .4em .5em;
}
.badge-secondary {
  color: #39739d;
  background-color: #e1ecf4;
  border-color: #e1ecf4;
}
.voting-container {
    position: relative;
    min-height: 150px;
}
.voting-container .vote-up i {
    position: absolute;
    font-size: 64px;
    color: #848d95;
    top: 0;
    left: 55px;
}
.vote-count .total {
    position: absolute;
    font-size: 32px;
    color: #6a737c;
    top: 50px;
    left: 55px;
}
.voting-container .vote-down i {
    position: absolute;
    font-size: 64px;
    color: #848d95;
    bottom: 5px;
    left: 55px;
}
.answers-headers .answer-count {
    font-weight: 500;
    color: #3c4146;
    font-size: 18px;
    margin-bottom: 0;
}
.by-user .date {
  margin-bottom: 0;
  margin-top: 1rem;
  font-size: 12px;
  color: #9199a1;
}
.by-user .name {
  color: #0077cc;
}
.your-answer {
  margin-top: 1.5rem;
}
.your-answer .answer {
  font-weight: 500;
  color: #3c4146;
  font-size: 18px;
  margin-bottom: 1rem;
}
</style>
