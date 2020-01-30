<template>
  <div class="col container mb-3">
    <div class="row">
      <div class="col-3 d-flex bg-warning">
        <div class="col d-flex flex-column">
          <div>{{data.upvotes.length}}</div>
          <div>
            <button @click="upVotes(data._id)" type="button" class="btn btn-danger">Up</button>
          </div>
        </div>
        <div class="col d-flex flex-column">
          <div>{{data.downvotes.length}}</div>
          <div>
            <button @click="downVotes(data._id)" type="button" class="btn btn-danger">Down</button>
          </div>
        </div>
      </div>
      <div class="col bg-light">
        <div>
          <h4>{{data.title}}</h4>
          <p v-html="data.description"></p>
        </div>
        <div>
          <div class="d-flex justify-content-center" v-if="userId === data.userId">
            <div>
              <b-button :id="data._id" @click="$bvModal.show(data._id)">Edit</b-button>

              <b-modal :id="data._id" hide-footer>
                <template v-slot:modal-title>Edit Your Question</template>
                <div class="d-block text-center">
                  <form @submit.prevent="updateAnswer(data._id)">
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
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    upVotes(id) {
      console.log("ok");
      this.$store.dispatch("upVotesAnswer", id);
    },
    downVotes(id) {
      console.log("ok");
      this.$store.dispatch("downVotesAnswer", id);
    },
    updateAnswer(id) {
      let obj = {
        title: this.title,
        description: this.description,
        id
      };
      this.$store.dispatch("updateAnswer", obj);
    }
  },
  computed: {
    userId() {
      return this.$store.state.userId;
    }
  }
};
</script>

<style>
</style>