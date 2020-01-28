<template>
  <div class="row text center border-bottom">
    <div class="col-md-1">
      <p class="text-center text-muted m-1 p-1">
        {{ item.upvotes }}
        <br />
        Votes
      </p>
    </div>
    <div class="col-md-1">
      <p class="text-center text-muted m-1 p-1">
        {{ item.answers }}
        <br />
        Answers
      </p>
    </div>
    <div class="col-md-1">
      <p class="text-center text-muted m-1 p-1">
        {{ item.views }}
        <br />
        Views
      </p>
    </div>
    <div class="col-md-8">
      <p class="text-primary font-weight-bold" style="font-size: 16px;font-weight: 400;">
        {{ item.title }}
      </p>
      <p>
        <TagBadge v-for="tag in item.tags" :key="tag" :tag="tag" />
        <span class="float-right text-muted">
          Author:
          <a href="#" style="text-decoration:none;curson:pointer">
            Ahmad muzakki
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
  data() {
    return {
      item: {
        upvotes: 30,
        answers: 5,
        views: 40,
        title: 'Lorem ipsum',
        tags: ['HTML', 'JS', 'Vue'],
      },
    };
  },
};
</script>

<style lang="css" scoped></style>
