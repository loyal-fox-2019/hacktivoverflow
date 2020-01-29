<template>
  <div>
    <section id="card" class="mb-2">
      <div id="votes">
        <b-button
        @click="upvotes"
        variant="outline-primary" class="mb-2">
        <b-icon-chevron-up></b-icon-chevron-up>
        </b-button><br>
        <b-button
        @click="downvotes"
        variant="outline-primary">
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
        Tags: <em>{{ getTags(question.tags) }}</em> <br>
        Upvotes: {{ getVotes(question.upvotes) }}, <br>
        Downvotes: {{ getVotes(question.downvotes) }} <br>
        <strong>Asked by:</strong> {{ question.userId.username }}
      </div>
    </section>
  </div>
</template>

<script>
import axios from '../config/server';

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
    getVotes(value) {
      if (!value) {
        return 0;
      }
      return value;
    },
    open(value) {
      this.$root.$emit('bv::toggle::collapse', value);
    },
    getTags(tags) {
      console.log(tags);
      if (!tags) {
        return '';
      }
      return tags.join(',');
    },
    async downvotes() {
      if (!this.$store.state.isLogged) {
        this.$swal('You have login');
      } else {
        const { _id } = this.question;
        try {
          await axios.patch(`/questions/${_id}/downvotes`, null, { headers: { token: localStorage.getItem('token') } });
          this.$store.dispatch('fetchData');
        } catch (err) {
          this.$swal(err.response.data.errors[0]);
        }
      }
    },
    async upvotes() {
      if (!this.$store.state.isLogged) {
        this.$swal('You have login');
      } else {
        const { _id } = this.question;
        try {
          await axios.patch(`/questions/${_id}/upvotes`, null, { headers: { token: localStorage.getItem('token') } });
          this.$store.dispatch('fetchData');
        } catch (err) {
          console.log(err.response);
          this.$swal(err.response.data.errors[0]);
        }
      }
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
