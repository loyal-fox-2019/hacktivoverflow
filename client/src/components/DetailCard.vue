<template>
  <div>
    <b-row v-if="data">
      <b-col cols="1" class="text-center">
        <b-button
          class="m-0 p-0 text-decoration-none"
          variant="link"
          title="This try is challenging"
          @click.prevent="vote('up')"
        >
          <b-icon icon="chevron-up" font-scale="3"></b-icon>
        </b-button>
        {{ data.upvotes.length - data.downvotes.length }}
        <b-button
          class="m-0 p-0 text-decoration-none"
          variant="link"
          title="This try does not show any effort"
          @click.prevent="vote('down')"
        >
          <b-icon icon="chevron-down" font-scale="3"></b-icon>
        </b-button>
      </b-col>
      <b-col cols="11" class="text-left" v-if="isEdit">
        <vue-editor v-model="$store.state.editedContent.body" />
      </b-col>
      <b-col
        cols="11"
        v-html="data.body"
        class="text-left"
        v-if="!isEdit"
      ></b-col>
    </b-row>
    <b-row class="justify-content-end" v-if="data" style="font-size:12px;">
      <b-col cols="3" class="text-right text-muted" v-if="data.user">
        <div>Answered {{ showDate }}</div>
        <a href="#" class="text-decoration-none">{{ data.user.name }}</a>
      </b-col>
      <b-col cols="3" class="text-left text-muted" v-else>
        <div>Tried {{ showDate }}</div>
        <a href="#" class="text-decoration-none">{{ data.owner.name }}</a>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: ["data", "isEdit"],
  data() {
    return {
      showDate: null
    };
  },
  methods: {
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

      this.showDate = day + " " + monthNames[monthIndex] + " " + year;
    },
    vote(voteState) {
      // klo ada komen berarti itu pertanyaan
      let type;
      if (this.data.comments) {
        type = "question";
      } else {
        type = "answer";
      }

      this.$store.dispatch("saveVote", {
        voteState,
        type,
        _id: this.data._id,
        from: "detail"
      });
    }
  },
  mounted() {
    if (this.data) {
      this.formatDate(new Date(this.data.createdAt));
    }
  },
  watch: {
    isEdit() {
      this.$store.commit("SET_EDITED", {
        key: "body",
        value: this.data.body
      });
    }
  },
  computed: {
    body() {
      return this.$store.state.editedContent.body;
    }
  }
};
</script>

<style scoped>
.btn.m-0.p-0:hover {
  color: black;
}
</style>
