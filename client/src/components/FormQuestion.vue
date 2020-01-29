<template>
  <div class="form-question">
    <el-card>
      <h6 class="form-title mb-0">Title</h6>
      <small>
        Be specific and imagine you’re asking a question to another
        person
      </small>
      <input
        type="email"
        class="form-control mb-3"
        id="email"
        autocomplete="off"
        placeholder="e.g How to loop data from database "
      />
      <h6 class="form-title mb-0">Body</h6>
      <small>Include all the information someone would need to answer your question</small>
      <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
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
      content: '<h2>Example</h2>',
      editorOption: {}
    }
  }
}
</script>

<style>
.form-title {
  font-weight: 700;
  font-size: 18px;
}
</style>
