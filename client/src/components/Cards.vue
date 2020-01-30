<template>
  <v-card class="mx-auto d-flex" outlined @click="moveTo(data._id)">
    <div style="width: 10%; text-align: center">
      <b-button v-if="this.$route.name != 'home'" @click.prevent="upVote">^</b-button>

      <b-card-text class="my-3">
        {{totalVote}}
      </b-card-text>
      <small v-if="this.$route.name == 'home'">votes</small>
      <b-card-text class="my-1" v-if="this.$route.name == 'home'">
        {{totalAnswer}}
      </b-card-text>
      <small v-if="this.$route.name == 'home'">answers</small>

      <b-button v-if="this.$route.name != 'home'" @click.prevent="downVote">v</b-button>
    </div>
    <div style="width: 90%">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">{{data.title}}</v-list-item-title>
          <v-list-item-subtitle v-html="data.content">{{}}</v-list-item-subtitle>
        </v-list-item-content>
        <div class="overline">
          <v-avatar>
            <img :src="data.author.photo" alt="John" />
          </v-avatar>
          {{data.author.name}}
          <br />
          asked: {{date}}
        </div>
      </v-list-item>

      <v-card-actions>
        <v-btn v-for="(tag, index) in data.tags" :key="index" x-small color="grey-blue">{{tag}}</v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Card",
  computed: {
    route() {
      return this.$route.path;
    },
    totalVote() {
      return this.data.upVotes.length - this.data.downVotes.length
    },
    date() {
      return new Date(this.data.createdAt).toLocaleString();
    },
    totalAnswer() {
      return this.data.answer.length
    }
  },
  props: ["data"],
  mounted() {
    // console.log(this.data);
  },
  methods:{
    moveTo(id){
      this.$router.push(`/question/${id}`)
    }
  }
};
</script>

<style>
</style>