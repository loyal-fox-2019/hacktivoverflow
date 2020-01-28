<template>
  <div>
    <section id="card" class="mb-2">
      <div id="votes">
        <b-button variant="outline-primary" class="mb-2">
        <b-icon-chevron-up></b-icon-chevron-up>
        </b-button><br>
        <b-button variant="outline-primary">
        <b-icon-chevron-down></b-icon-chevron-down>
        </b-button>
      </div>
      <div id="detail" class="ml-4">
        <router-link :to="`/questions/${question._id}`">
          <h3 class="margin: 0; padding: 0;" @click="open(question._id)">
            <strong>{{question.title}}</strong>
          </h3>
        </router-link>
        <b-collapse :id="question._id" class="mt-2">
          <section id="main-content">
            <p v-html="question.description">hello</p>
          </section>
          <hr>
          <section id="comment"></section>
        </b-collapse>
        Tags: <em>tags, tags, tags,</em> <br>
        Upvotes: 10, <br>
        Downvotes: 0
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    question: {
      type: Object,
    },
  },
  data() {
    return {
      message: 'Hello world',
    };
  },
  methods: {
    open(value) {
      this.$root.$emit('bv::toggle::collapse', value);
    },
  },
};
</script>

<style scoped>
#card {
  display: inline-flex;
  width: 100%;
  border: 1px solid black;
  padding: 1em;
  border-radius: 1em;
  height: 20%;
}
#votes {
  margin-top: 2%
}
</style>
