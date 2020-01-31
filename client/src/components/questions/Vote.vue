<template>
  <div>
    <div class="text-center">
      <b-icon
        icon="chevron-up"
        class="border rounded"
        :class="{ isVote: isVote === 'up' }"
        @click="$store.state.isLogin ? upvote() : ''"
      ></b-icon>
    </div>
    <div class="text-center text-muted" style="font-size: 1.5rem">
      {{ vote }}
    </div>
    <div class="text-center">
      <b-icon
        icon="chevron-down"
        class="border rounded"
        :class="{ isVote: isVote === 'down' }"
        @click="$store.state.isLogin ? downvote() : ''"
      ></b-icon>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Vote',
  props: ['vote', 'isVote', 'isQuestion'],
  data() {
    return {};
  },
  computed: {
    $isQuestion() {
      if (this.isQuestion === 'false') {
        return false;
      }
      return true;
    },
  },
  methods: {
    ...mapActions('Question', ['updateUpVote', 'updateDownVote']),
    upvote() {
      if (this.$isQuestion) {
        this.updateUpVote();
      }
    },
    downvote() {
      if (this.$isQuestion) {
        this.updateDownVote();
      }
    },
  },
};
</script>

<style lang="css" scoped>
.isVote {
  background-color: #28a745 !important;
}
</style>
