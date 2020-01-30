<template>
  <div>
    <h1>What Are you Curious About?</h1>
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
    <div class="d-flex mx-auto">
      <quillEditor class="asking" v-model="description" :myQuillEditor="editorOption"></quillEditor>
    </div>
    <div class="d-flex mx-auto justify-content-end">
      <div class="btn btn-primary buttonPost" v-on:click="postQuestion">Post</div>
    </div>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  name: "askQuestion",
  components: {
    quillEditor
  },
  data() {
    return {
      description: "<p>Your question goes here...</p>",
      editorOption: {
        /* quill options */
      },
      title: ""
    };
  },
  methods: {
    postQuestion() {
      let question = {
        description: this.description,
        title: this.title
      };
      this.$store.dispatch("postQuestion", question);
    }
  }
};
</script>

<style scoped>
.asking {
  height: 20vh;
}

.buttonPost {
  margin-top: 80px;
}
</style>