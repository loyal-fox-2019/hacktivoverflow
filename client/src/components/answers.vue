<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col bg-light responseVertical">
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
                      <h3>Your Answers</h3>
                    </div>
                  </div>
                  <div
                    v-for="(answer, index) in dataAnswers"
                    :key="index"
                    class="card post is-compact justify-content-between"
                  >
                    <div
                      class="postMain d-flex ml-4"
                      style="height: auto;
                      text-align: left;"
                    >
                      <p style="font-size: 12px; max-width: 600px;" v-html="answer.description"></p>
                      <div class="postCardInfo">
                        <span class="postInfoItem">
                          <img
                            src="https://image.flaticon.com/icons/png/512/37/37663.png"
                            alt="..."
                            class="rounded-circle"
                          />
                          <span>{{answer.createdAt}}</span>
                        </span>
                      </div>
                      <div style="text-align: end;">
                        <div class="button sectionHeaderAction">
                          <button @click="editAnswer(answer)" class="btn btn-danger mr-3">Update</button>
                        </div>
                      </div>
                    </div>
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
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      dataAnswers: []
    };
  },
  methods: {
    getAnswers() {
      axios({
        url: `http://localhost:3000/answers`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.dataAnswers = data;
        })
        .catch(err => {
          Swal.fire("Error!", err.message, "error");
        });
    },
    editAnswer(answer) {
      this.$store.commit("setEditAnswer", answer);
      this.$router.push(`/editAnswer/${answer._id}`);
    }
  },
  created() {
    this.getAnswers();
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