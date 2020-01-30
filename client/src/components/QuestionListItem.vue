<template>
  <div class="py-2">
    <b-card :title="question.title" :sub-title="questioner" @click="showDetail(question.id)">
      <b-card-text>{{question.content}}</b-card-text>
      <b-link href="#" class="card-link">
        <i class="far fa-comments"></i>
        {{question.totalAnswer}}
      </b-link>
      <b-link href="#" class="card-link">
        <i class="far fa-thumbs-up"></i>
        {{question.totalUpVotes}}
      </b-link>
      <b-link href="#" class="card-link">
        <i class="far fa-thumbs-down"></i>
        {{question.totalUpVotes}}
      </b-link>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "QuestionListItem",
  props: ["question"],
  computed: {
    questioner() {
      return `${this.question.owner.name} | ${this.question.createdAt}`;
    }
  },
  methods: {
    showDetail(id) {
      // alert();
      this.$router.push(`/question/${id}`);
    }
  }
};
</script>

<style scoped>
.question-item-card {
  border-bottom: 1px solid black;
}
</style>