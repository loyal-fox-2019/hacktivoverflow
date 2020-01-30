<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2 bg-white responseVertical" id="col-left">
          <div
            class="nav flex-column nav-pills"
            id="v-list-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              class="nav-link active"
              id="blogPost-tab"
              data-toggle="pill"
              href="#blogPost"
              role="tab"
              aria-controls="blogPost"
              aria-selected="false"
            >Stack Overflow</a>
          </div>
        </div>

        <div class="col-10 bg-light responseVertical">
          <div class="contentRight p-5">
            <div
              class="tab-pane fade show active"
              id="blogPost"
              role="tabpanel"
              aria-labelledby="blogPost-tab"
            >
              <div class="tab-content">
                <div
                  class="tab-pane fade show active"
                  id="pills-published"
                  role="tabpanel"
                  aria-labelledby="pills-published-tab"
                >
                  <div class="list-group-item section-header is-compact">
                    <div class="sectionHeaderLabel">
                      <span>Ask Question</span>
                    </div>
                    <div class="button sectionHeaderAction">
                      <router-link to="/askQuestion">
                        <button class="btn btn-danger" data-toggle="modal">ask your question</button>
                      </router-link>
                    </div>
                  </div>
                  <div
                    v-for="(question, index) in this.$store.state.questions"
                    :key="index"
                    class="card post is-compact justify-content-between"
                  >
                    <div style="margin:0 !important;">
                      <h4>{{question.upvote.length - question.downvote.length}}</h4>
                      <p>votes</p>
                      <h4>{{question.answers.length}}</h4>
                      <p>answers</p>
                    </div>
                    <div
                      class="postMain d-flex ml-4"
                      style="height: auto;
                      text-align: left;"
                    >
                      <a class="postTitle" href>{{question.title}}</a>
                      <p
                        class="text-truncate"
                        style="font-size: 12px;"
                        v-html="question.description"
                      ></p>
                      <div class="postCardInfo">
                        <span class="postInfoItem">
                          <img
                            src="https://image.flaticon.com/icons/png/512/37/37663.png"
                            alt="..."
                            class="rounded-circle"
                          />
                          <span>{{question.createdAt}}</span>
                        </span>
                      </div>
                      <div style="text-align: end;">created by: {{question.user.username}}</div>
                    </div>
                  </div>
                </div>

                <div
                  class="tab-pane fade"
                  id="pills-drafts"
                  role="tabpanel"
                  aria-labelledby="pills-drafts-tab"
                >
                  <div class="empty-content text-center">
                    <img
                      src="https://angialand.com.vn/wp-content/uploads/2018/04/404-not-found.png"
                      alt="page"
                      class="mt-5"
                    />
                    <h4 class="my-3">No Posts Found</h4>
                    <a href="#" class="btn btn-danger btn-s small">Add New Post</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {},
  created() {
    this.$store.dispatch("findAllQuestions");
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  line-height: 1.5;
}

header .bg-wordpress {
  background: #006088;
}

header .navbar-brand {
  padding: 12px 7px;
  background: #002c40;
}

.responseVertical {
  overflow-y: auto;
  height: 625px;
}

.responseVertical #v-list-tab a {
  color: black;
}

.responseVertical a:hover {
  background-color: #ccc;
}

.responseVertical a:active {
  background-color: #c5d9ed;
}

.nav-pills .nav-link {
  border-radius: 0;
}

.nav-pills .nav-link.active {
  background-color: #c5d9ed;
}

.nav {
  background: white;
}

.navPosts {
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0 0 17px;
}

#col-left {
  padding: 0;
}

.section-header.card {
  display: flex;
  flex-direction: row;
  line-height: 28px;
  padding: 11px 11px 11px;
  position: relative;
}

.sectionHeaderLabel {
  display: flex;
  align-items: center;
  flex-grow: 1;
  position: relative;
  overflow: hidden;
}

.sectionHeaderAction .btn {
  font-size: 12px;
  border-radius: 0;
  background-color: #c9356e;
}

.post {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.card.is-compact {
  padding: 16px;
}

.postMain {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.list-group-item {
  display: flex;
}

.postMain .postTitle {
  font-size: 18px;
  font-weight: bold;
  color: #000;
}

.postJudulItem {
  vertical-align: middle;
  padding: 2px 10px;
}

.postCardInfo {
  margin: 5px;
  font-size: 12px;
  color: #646970;
  display: flex;
  flex-direction: column;
}

.postCardInfo img {
  height: 13px;
  margin-right: 5px;
}

.nav-item-search {
  display: flex;
  flex: auto;
  padding: 7px;
}

.nav-item-search input {
  height: 25px;
  display: flex;
  flex-direction: row-reverse;
  /* margin: 6px 4px 6px */
}
.buttonContent {
  align-self: flex-end;
}
</style>
