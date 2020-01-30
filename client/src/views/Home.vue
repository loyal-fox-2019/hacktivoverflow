<template>
  <div class="home">
    <div class="container mt-4">
      <div class="mb-5">
        <b-button v-b-modal.modal-1>Add New Question</b-button>
        <b-modal id="modal-1" title="Add New Question" hide-footer>
          <form @submit.prevent="addQuestion('modal-1')">
            <div class="form-group">
              <label for="exampleInputEmail1">Title</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="title"
              />
            </div>
            <wysiwyg v-model="description" />
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </b-modal>
      </div>
      <div class="row" v-for="(question, index) in $store.state.questions" :key="index">
        <Cards :data="question" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Cards from "../components/Cards";

export default {
  data() {
    return {
      title: "",
      description: ""
    };
  },
  name: "home",
  components: {
    Cards
  },
  methods: {
    addQuestion(id) {
      const obj = {
        title: this.title,
        description: this.description
      };
      this.$bvModal.hide(id);
      this.$store.dispatch("addQuestion", obj);
    }
  }
};
</script>
