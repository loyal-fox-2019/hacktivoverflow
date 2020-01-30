<template>
  <div class="col container mb-3">
    <div class="row">
      <div class="col-3 d-flex bg-warning">
        <div class="col mt-3 d-flex flex-column">
          <div>{{data.upvotes.length}}</div>
          <div>
            <p>Up</p>
          </div>
        </div>
        <div class="col mt-3 d-flex flex-column">
          <div>{{data.downvotes.length}}</div>
          <div>
            <p>Down</p>
          </div>
        </div>
      </div>
      <div class="col bg-light">
        <router-link :to="`/question/${data._id}`">
          <h2>{{data.title}}</h2>
        </router-link>
        <div class="d-flex justify-content-center" v-if="userId === data.userId">
          <div class="mr-3">
            <button type="button" @click="deleteQuestion(data._id)" class="btn btn-danger">Delete</button>
          </div>
          <div>
            <b-button :id="data._id" @click="$bvModal.show(data._id)">Edit</b-button>

            <b-modal :id="data._id" hide-footer>
              <template v-slot:modal-title>Edit Your Question</template>
              <div class="d-block text-center">
                <form @submit.prevent="updateQuestion(data._id)">
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
                  <button
                    @click="$bvModal.hide(data._id)"
                    type="submit"
                    class="btn btn-primary"
                  >Submit</button>
                </form>
              </div>
              <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: this.data.title,
      description: this.data.description
    };
  },
  methods: {
    deleteQuestion(id) {
      this.$store.dispatch("deleteQuestion", id);
    },
    updateQuestion(id) {
      let obj = {
        title: this.title,
        description: this.description,
        id
      };
      this.$store.dispatch("updateQuestion", obj);
    }
  },
  computed: {
    userId() {
      return this.$store.state.userId;
    }
  },
  props: {
    data: {
      type: Object
    }
  }
};
</script>

<style>
</style>