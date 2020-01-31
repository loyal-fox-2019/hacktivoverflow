<template>
  <div class="py-2">
    <b-card no-body class="overflow-hidden">
      <b-row no-gutters>
        <b-col md="2" class="d-flex justify-content-center align-items-center">
          <b-link href="#" class="card-link">
            <i class="far fa-comments fa-lg"></i>
            {{question.totalAnswer}}
          </b-link>
          <b-link href="#" class="card-link">
            <i class="far fa-thumbs-up fa-lg"></i>
            {{question.totalUpVotes}}
          </b-link>
          <b-link href="#" class="card-link">
            <i class="far fa-thumbs-down fa-lg"></i>
            {{question.totalUpVotes}}
          </b-link>
        </b-col>
        <b-col md="10">
          <b-card-body>
            <h4 class="card-title">
              <a href="#" @click.prevent="showDetail(question.id)">{{question.title}}</a>
            </h4>
            <h6 class="card-subtitle text-muted mb-2">{{questioner}}</h6>
            <b-card-text v-html="questionLimit"></b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
      <b-card-footer>
        <b-badge v-for="(tag, i) in question.tags" :key="i" style="margin:5px;"># {{tag}}</b-badge>
      </b-card-footer>
    </b-card>
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :can-cancel="true"
        :on-cancel="onCancel"
        :is-full-page="fullPage"
      ></loading>
    </div>
  </div>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "QuestionListItem",
  components: {
    Loading
  },
  props: ["question"],
  data() {
    return {
      isLoading: false,
      fullPage: true
    };
  },
  computed: {
    questioner() {
      return `${this.question.owner.name} | ${new Date(
        this.question.createdAt
      ).toUTCString()}`;
    },
    questionLimit() {
      return this.question.content.slice(0, 1000) + `...`;
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

a.card-link {
  color: #333;
}
</style>