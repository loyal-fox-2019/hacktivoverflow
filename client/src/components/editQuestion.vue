<template>
  <div style="margin-top:35px">
    <div class="d-flex justify-content-center align-items-center container">
      <div class="row">
        <form @submit.prevent="editedQuestion">
          <div class="form-group">
            <h4 for="formGroupTitleInput">Title</h4>
            <input v-model="title" type="text" class="form-control" id="formGroupTitleInput" />
          </div>
          <div class="form-group">
            <h4 for="formGroupExampleInput2">Description</h4>
            <vue-editor v-model="description"></vue-editor>
          </div>
          <button type="submit" class="btn btn-info">Post Your Question</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      title: this.$store.state.editQuestion.title,
      description: this.$store.state.editQuestion.description
    };
  },
  methods: {
    editedQuestion() {
      this.$store.commit("setTitle", this.title);
      this.$store.commit("setDescription", this.description);
      this.$store.dispatch("editedQuestion", this.$route.params.id);
    }
  }
};
</script>

<style>
</style>