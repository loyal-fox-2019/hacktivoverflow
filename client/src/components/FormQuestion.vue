<template>
  <div class="form-question">
    <el-card>
      <h6 class="form-title mb-0">Title</h6>
      <small>
        Be specific and imagine you’re asking a question to another person
      </small>
      <input
        type="text"
        class="form-control mb-3"
        id="email"
        autocomplete="off"
        v-model="title"
        placeholder="e.g How to loop data from database "
      />
      <h6 class="form-title mb-0">Body</h6>
      <small
        >Include all the information someone would need to answer your
        question</small
      >
      <div>
        <quill-editor
          class="quil-wysywig"
          ref="myTextEditor"
          v-model="content"
          :config="editorOption"
        ></quill-editor>
      </div>
      <button
        class="btn btn-primary btn-addquestion"
        @click.prevent="postQuestion"
      >
        Post Question
      </button>
    </el-card>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      name: 'app',
      content: '',
      editorOption: {},
      title: ''
    }
  },
  mounted() {
    this.content = ''
  },
  methods: {
    postQuestion() {
      this.$store.dispatch('addQuestion', {
        title: this.title,
        description: this.content
      })
    }
  }
}
</script>

<style>
.form-title {
  font-weight: 700;
  font-size: 18px;
}
.quil-wysywig {
  height: 40vh;
}
.btn-addquestion {
  margin-top: 80px;
}
</style>
