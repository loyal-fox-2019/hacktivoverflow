<template>
  <div>
    <vue-editor v-model="comment.content"></vue-editor>
    <div class="mt-3">
      <button class="btn btn-sm btn-dark" @click="updateComment(comment)" v-if="isUpdate">
        Update
      </button>
      <button class="btn btn-sm btn-dark" @click="addComment(comment)" v-else>Save</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { VueEditor } from 'vue2-editor';

export default {
  name: 'CommentEditor',
  props: ['questionId'],
  components: {
    VueEditor,
  },
  data() {
    return {
      content: '',
    };
  },
  computed: {
    ...mapState('Comment', ['comment', 'isUpdate']),
  },
  methods: {
    ...mapActions('Comment', ['addComment', 'updateComment']),
  },
  created() {
    this.comment.questionId = this.questionId;
  },
};
</script>

<style lang="css" scoped></style>
