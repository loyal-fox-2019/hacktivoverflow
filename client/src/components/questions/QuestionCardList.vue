<template>
  <div class="row text center border-bottom">
    <div class="col-md-1">
      <p class="text-center text-muted m-1 p-1">
        {{ upvotes }}
        <br />
        Votes
      </p>
    </div>
    <div class="col-md-1">
      <p class="text-center text-muted m-1 p-1">
        {{ answers }}
        <br />
        Answers
      </p>
    </div>
    <div class="col-md-1">
      <p class="text-center text-muted m-1 p-1">
        {{ item.views || 1 }}
        <br />
        Views
      </p>
    </div>
    <div class="col-md-8">
      <router-link
        :to="{ name: 'QuestionDetail', params: { slug: item.slug } }"
        class="text-primary font-weight-bold"
        style="font-size: 16px;font-weight: 400;"
      >
        {{ item.title }}
      </router-link>
      <p>
        <TagBadge v-for="tag in item.tags" :key="tag._id" :tag="tag.name" />
        <span class="float-right text-muted">
          Author:
          <a href="#" style="text-decoration:none;curson:pointer">
            {{ item.author.fullname }}
          </a>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import TagBadge from '../TagBadge.vue';

export default {
  name: 'QuestionCardList',
  components: {
    TagBadge,
  },
  props: ['item'],
  data() {
    return {};
  },
  computed: {
    upvotes() {
      return String(this.item.upvote.length);
    },
    answers() {
      return String(this.item.answers.length);
    },
  },
};
</script>

<style lang="css" scoped></style>
