<template>
  <div>
    <article style="font-size: 15px;">
      <div v-html="content"></div>
      <div>
        <TagBadge v-for="tag in tags" :key="tag._id" :tag="tag.name" />
      </div>
    </article>
  </div>
</template>

<script>
import TagBadge from '@/components/TagBadge.vue';

export default {
  name: 'QuestionContent',
  props: ['content', 'tags'],
  components: {
    TagBadge,
  },
  data() {
    return {};
  },
};
</script>

<style lang="css" scoped></style>
