<template>
  <div>
    <b-row v-if="data">
      <b-col cols="1" class="text-center">
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
        {{ data.upvotes.length - data.downvotes.length }}
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
      </b-col>
      <b-col cols="11" class="text-left" v-if="isEdit || editMode">
        <vue-editor v-model="body" />
      </b-col>
      <b-col
        cols="11"
        v-html="data.body"
        class="text-left"
        v-if="!isEdit && !editMode"
      ></b-col>
    </b-row>
    <b-row
      :class="data.user ? 'justify-content-around' : 'justify-content-end'"
      v-if="data"
      style="font-size:12px;"
    >
      <b-col cols="2" class="text-muted text-left" v-if="data.user">
        <b-button
          variant="link"
          class="text-decoration-none"
          style="font-size:12px;"
          @click.prevent="editComment"
          v-if="!editMode && isMyComment"
        >
          Edit this catch
        </b-button>

        <b-button
          variant="link"
          class="text-decoration-none text-success"
          style="font-size:12px;"
          @click.prevent="saveComment"
          v-if="editMode && isMyComment"
        >
          Save Catch
        </b-button>
      </b-col>
      <b-col cols="3" class="text-right text-muted" v-if="data.user">
        <div>Answered {{ showDate }}</div>
        <a href="#" class="text-decoration-none">{{ data.user.name }}</a>
      </b-col>
      <b-col cols="3" class="text-left text-muted" v-else>
        <div>Tried {{ showDate }}</div>
        By <a href="#" class="text-decoration-none">{{ data.owner.name }}</a>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: ["data", "isEdit"],
  data() {
    return {
      showDate: null,
      editMode: false
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
    editComment() {
      this.$store.commit("SET_EDITED", [
        {
          key: "body",
          value: this.data.body
        }
      ]);
      this.editMode = true;
    },
    saveComment() {
      this.$store.dispatch("saveComment", this.data._id);
      this.editMode = false;
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
  computed: {
    body: {
      get() {
        return this.$store.state.editedContent.body;
      },
      set(value) {
        this.$store.commit("SET_EDITED", [
          {
            key: "body",
            value
          }
        ]);
      }
    },
    userId() {
      return this.$store.state.userId;
    },
    isMyComment() {
      if (this.data.user) {
        return this.data.user._id === localStorage.id;
      }
      return null;
    }
  }
};
</script>

<style scoped>
.btn.m-0.p-0:hover {
  color: black;
}
</style>
