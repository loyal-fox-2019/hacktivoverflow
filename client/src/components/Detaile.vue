<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-2 bg-primary justify-content-center">
          <div class="d-flex">
            <div>
              <button @click="upVotes(detail._id)" type="button" class="btn btn-danger">Up</button>
            </div>
            <div>
              <p>{{detail.upvotes.length}}</p>
            </div>
          </div>
          <div class="d-flex">
            <div>
              <button @click="downVotes(detail._id)" type="button" class="btn btn-danger">Down</button>
            </div>
            <div>
              <p>{{detail.downvotes.length}}</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="mb-5 pb-5 pl-3" style="border: 1px black solid">
            <h2>{{detail.title}}</h2>
            <h4 class="mt-5 text-left" v-html="detail.description"></h4>
          </div>
          <div v-for="(answer, index) in $store.state.answers" :key="index">
            <Answer :data="answer" />
          </div>
          <div>
            <h3 class="text-left">Your Answer :</h3>
            <form @submit.prevent="addAnswer(detail._id)">
              <div class="form-group">
                <!-- <h5 class="text-left" for="exampleInputEmail1">Title</h5> -->
                <input
                  placeholder="Title"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Answer from "./Answer";
export default {
  data() {
    return {
      title: "",
      description: ""
    };
  },
  components: {
    Answer
  },
  computed: {
    detail() {
      return this.$store.state.details;
    },
    answer() {
      return this.$store.state.answers;
    }
  },
  methods: {
    upVotes(id) {
      this.$store.dispatch("upVotesQuestion", id);
    },
    downVotes(id) {
      this.$store.dispatch("downVotesQuestion", id);
    },
    fetchDetail() {
      const id = this.$route.params.id;
      // console.log("asdasdasd", id);
      this.$store.dispatch("fetchDetail", id);
    },
    fetchAnswer() {
      const id = this.$route.params.id;
      this.$store.dispatch("fetchAnswer", id);
    },
    addAnswer(id) {
      const obj = {
        title: this.title,
        description: this.description,
        id: id
      };
      this.$store.dispatch("addAnswer", obj);
      this.title = "";
      this.description = "";
    }
  },
  created() {
    this.fetchDetail();
    this.fetchAnswer();
  }
};
</script>

<style>
</style>