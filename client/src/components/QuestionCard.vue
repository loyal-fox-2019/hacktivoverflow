<template>
  <b-row>
    <b-col cols="1" class="text-muted">
      <b-button
        class="m-0 p-0 text-decoration-none"
        variant="link"
        title="This try is challenging"
        @click.prevent="vote('up')"
      >
        <b-icon icon="chevron-up" font-scale="3"></b-icon>
      </b-button>
      <div style="font-size:15px;">
        {{ data.upvotes.length - data.downvotes.length }}
      </div>
      <b-button
        class="m-0 p-0 text-decoration-none"
        variant="link"
        title="This try does not show any effort"
        @click.prevent="vote('down')"
      >
        <b-icon icon="chevron-down" font-scale="3"></b-icon>
      </b-button>
    </b-col>
    <b-col cols="11" class="text-left">
      <p>
        <router-link :to="`/try/${data._id}`">
          {{ data.title }}
        </router-link>
      </p>
      <div v-text="previewBody"></div>
      <div v-if="data.tags.length" class="mt-2">
        <tag-list :tags="data.tags"></tag-list>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import TagList from "@/components/TagList.vue";
export default {
  props: ["data"],
  components: {
    TagList
  },
  methods: {
    vote(voteState) {
      this.$store.dispatch("saveVote", {
        voteState,
        type: "question",
        _id: this.data._id,
        from: "list"
      });
    }
  },
  computed: {
    previewBody() {
      return this.data.body
        .replace(/(?:\r\n|\r|\n)/g, "")
        .split(" ")
        .slice(0, 20)
        .join(" ");
    }
  }
};
</script>

<style scoped>
.col-1 {
  font-size: 9px;
}

.btn.m-0.p-0:hover {
  color: black;
}
</style>
