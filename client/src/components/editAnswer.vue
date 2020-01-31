<template>
  <div style="margin-top:35px">
    <div class="d-flex justify-content-center align-items-center container">
      <div class="row">
        <form @submit.prevent="editedAnswer">
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
      description: this.$store.state.editAnswer.description
    };
  },
  methods: {
    editedAnswer() {
      this.$store.commit("setDescription", this.description);
      this.$store.dispatch("editedAnswer", this.$route.params.id);
    }
  }
};
</script>