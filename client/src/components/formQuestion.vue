<template>
  <div style="margin-top:35px">
    <div class="d-flex justify-content-center align-items-center container">
      <div class="row">
        <form @submit.prevent="postQuestion">
          <div class="form-group">
            <h4 for="formGroupTitleInput">Title</h4>
            <input
              v-model="title"
              type="text"
              class="form-control"
              id="formGroupTitleInput"
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            />
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
      title: "",
      description: ""
    };
  },
  watch: {
    title: function() {
      this.$store.commit("setTitle", this.title);
    },
    description: function() {
      this.$store.commit("setDescription", this.description);
    }
  },
  methods: {
    postQuestion() {
      this.$store.dispatch("postQuestion");
    }
  }
};
</script>

<style>
</style>