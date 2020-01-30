<template>
  <div class="question-answer p-5 mx-auto">
    <h2>{{detail.title}}</h2>
    <el-divider></el-divider>
    <div class="row">
      <div class="col-md-1">
        <p class="vote-section">
          <i class="fas fa-sort-up large"></i>
        </p>
        <p class="vote-section">{{countVoters}}</p>
        <p class="vote-section">
          <i class="fas fa-sort-down large"></i>
        </p>
      </div>
      <div class="col-md question-content mb-3" v-html="detail.description"></div>
    </div>
    <el-divider></el-divider>
    <h3 class="mb-2" v-if="getAnswer.length > 0">Answer</h3>
    <Answers v-for="(answer,i) in getAnswer" :key="i" :data="answer"></Answers>
    <h4 class="mb-3">Your Answer</h4>
    <quillEditor class="editor-quil" v-model="content" :config="editorOption"></quillEditor>
    <button class="btn btn-primary btn-answer" @click.prevent="postAnswer">Answer This Question</button>
  </div>
</template>

<script>
import Answers from '../components/AnswerList'
import { quillEditor } from 'vue-quill-editor'
export default {
  data() {
    return {
      content: '',
      editorOption: {}
    }
  },
  components: {
    Answers,
    quillEditor
  },
  created() {
    this.$store.dispatch('question_detail', this.$route.params.id)
    this.$store.dispatch('fetch_answer', this.$route.params.id)
  },
  computed: {
    detail() {
      return this.$store.state.questionDetail
    },
    countVoters() {
      let upvote = 0
      let downvote = 0
      if (this.$store.state.questionDetail.upvote) {
        upvote = this.$store.state.questionDetail.upvote.length
      }
      if (this.$store.state.questionDetail.downvote) {
        downvote = this.$store.state.questionDetail.downvote.length
      }
      return upvote - downvote
    },
    getAnswer() {
      return this.$store.state.answerById
    }
  },
  methods: {
    postAnswer() {
      this.$store.dispatch('post_answer', {
        description: this.content,
        questionId: this.$route.params.id
      })
      this.content = ''
    }
  }
}
</script>

<style>
.question-answer {
  width: 95%;
  display: block;
}
.btn-answer {
  margin-top: 60px;
}
.vote-section {
  font-size: 34px;
  text-align: center;
  margin-bottom: 0;
  height: 25px;
  color: #bbc0c4;
}
.large {
  font-size: 40px;
}
pre.ql-syntax {
  padding: 20px;
  background-color: #EFF0F1!Important;
}
.editor-quil {
  height: 30vh;
}
</style>
