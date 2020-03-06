<template>
  <b-row>
    <b-col cols="1" class="text-muted">
      <b-button
        class="m-0 p-0 text-decoration-none"
        variant="link"
        title="This try is challenging"
        @click.prevent="vote('up')"
        :style="
          data.upvotes.includes(userId)
            ? { color: 'darkgreen' }
            : { color: 'lightgrey' }
        "
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
        :style="
          data.downvotes.includes(userId)
            ? { color: 'darkgreen' }
            : { color: 'lightgrey' }
        "
      >
        <b-icon icon="chevron-down" font-scale="3"></b-icon>
      </b-button>
      <div class="font-weight-bold" style="font-size:10px;">
        {{ data.comments.length }} Catches
      </div>
      <div class="font-weight-bold" style="font-size:11px;">
        {{ data.view }} Views
      </div>
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
      <div
        class="font-weight-light text-muted text-right"
        style="font-size:11px;"
      >
        {{ showDate }}
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
  data() {
    return {
      showDate: null
    };
  },
  methods: {
    vote(voteState) {
      this.$store.dispatch("saveVote", {
        voteState,
        type: "question",
        _id: this.data._id,
        from: "list"
      });
    },
    formatDate(date) {
      let monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];

      let day = date.getDate();
      let monthIndex = date.getMonth();
      let year = date.getFullYear();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let strTime = hours + ":" + minutes + " " + ampm;

      this.showDate =
        day + " " + monthNames[monthIndex] + " " + year + " at " + strTime;
    }
  },
  computed: {
    previewBody() {
      return this.data.body
        .replace(/(?:\r\n|\r|\n)/g, "")
        .split(" ")
        .slice(0, 20)
        .join(" ");
    },
    userId() {
      return this.$store.state.userId;
    }
  },
  created() {
    if (this.data) {
      this.formatDate(new Date(this.data.createdAt));
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

pre {
  padding: 20px;
  background-color: #EFF0F1!Important;
  color: #000!Important;
}
</style>
