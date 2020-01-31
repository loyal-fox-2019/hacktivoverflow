<template>
  <div class="question-answer p-5 mx-auto">
    <h2>{{detail.title}}</h2>
    <el-divider></el-divider>
    <div class="row">
      <div class="col-md-1">
        <p class="vote-section">
          <i class="fas fa-sort-up large" @click="voteQuestion"></i>
        </p>
        <p class="vote-section">{{countVoters}}</p>
        <p class="vote-section">
          <i class="fas fa-sort-down large" @click="downvoteQuestion"></i>
        </p>
      </div>
      <div class="col-md question-content mb-3" v-html="detail.description"></div>
    </div>
    <div class="d-flex justify-content-end">
      <el-button
        type="primary"
        icon="el-icon-edit"
        circle
        v-if="isOwn"
        @click="$bvModal.show('modal-edit')"
      ></el-button>
      <el-button type="danger" icon="el-icon-delete" circle v-if="isOwn" @click="deleteAnswer"></el-button>
    </div>
    <el-divider></el-divider>
    <h3 class="mb-2" v-if="getAnswer.length > 0">Answer</h3>
    <Answers v-for="(answer,i) in getAnswer" :key="i" :data="answer"></Answers>
    <h4 class="mb-3">Your Answer</h4>
    <quillEditor class="editor-quil" v-model="content"></quillEditor>
    <button class="btn btn-primary btn-answer" @click.prevent="postAnswer">Answer This Question</button>

    <!-- Modal -->
    <b-modal id="modal-edit" size="lg" hide-footer>
      <template v-slot:modal-title>Edit Question</template>
      <div>
        <h6 class="form-title mb-2">Title</h6>
        <input type="text" class="form-control mb-3" id="email" autocomplete="off" v-model="title" />
        <h6 class="form-title mb-3">Body</h6>
        <quill-editor class="quil-wysywig" ref="myTextEditor" v-model="contentedit"></quill-editor>
      </div>
      <button class="btn btn-primary btn-edit" @click="editQuestion">Edit Question</button>
    </b-modal>
  </div>
</template>

<script>
import Answers from '../components/AnswerList'
import { quillEditor } from 'vue-quill-editor'
export default {
  data() {
    return {
      title: '',
      content: '',
      contentedit: ''
    }
  },
  components: {
    Answers,
    quillEditor
  },
  created() {
    this.$store.dispatch('question_detail', this.$route.params.id)
    setTimeout(() => {
      this.title = this.$store.state.questionDetail.title
      this.contentedit = this.$store.state.questionDetail.description
    }, 1500)
    this.$store.dispatch('fetch_answer', this.$route.params.id)
  },
  computed: {
    isOwn() {
      if (
        this.$store.state.questionDetail.userId === localStorage.getItem('id')
      ) {
        return true
      } else {
        return false
      }
    },
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
    deleteAnswer() {
      this.$store.dispatch(
        'delete_question',
        this.$store.state.questionDetail._id
      )
    },
    postAnswer() {
      this.$store.dispatch('post_answer', {
        description: this.content,
        questionId: this.$route.params.id
      })
      this.content = ''
    },
    voteQuestion() {
      this.$store.dispatch('upvote_question', this.$route.params.id)
    },
    downvoteQuestion() {
      this.$store.dispatch('downvote_question', this.$route.params.id)
    },
    editQuestion() {
      this.$store.dispatch('edit_question', {
        id: this.$route.params.id,
        title: this.title,
        description: this.contentedit
      })
      this.$bvModal.hide('modal-edit')
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
.btn-edit {
  margin-top: 75px;
  width: 100%;
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
.large:hover {
  cursor: pointer;
}
pre.ql-syntax {
  padding: 20px;
  background-color: #EFF0F1!Important;
}
.editor-quil {
  height: 30vh;
}
</style>
