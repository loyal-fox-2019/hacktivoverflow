<template>
  <div class="thisRep my-2 judulPer">
    <div class="d-flex mx-auto" v-if="!editThis">
      <div class="col-1">
        <div class="flex-column">
          <div class="col vote">
            <i class="fas fa-2x fa-caret-up" v-on:click="upvoteAnswer(dataReplies._id)"></i>
          </div>
          <div class="col">{{dataReplies.upvote.length - dataReplies.downvote.length}}</div>
          <div class="col vote">
            <i class="fas fa-2x fa-caret-down" v-on:click="downvoteAnswer(dataReplies._id)"></i>
          </div>
        </div>
      </div>
      <div class="col-11 description no-gutters">
        <div class="row">
          <div class="col-11">
            <h3 class="no-gutters">{{dataReplies.title}}</h3>
          </div>
          <div class="col-1">
            <div class="btn btn-primary" v-on:click="editYa">Edit</div>
          </div>
        </div>
        <h5 v-html="dataReplies.description"></h5>
        <div class="d-flex mx-auto justify-content-end">
          <p>Answered by: {{dataReplies.userId.username}}</p>
        </div>
      </div>
    </div>

    <div class="flex-column mx-auto mt-3" v-else>
      <div class="d-flex mx-auto mt-4">
        <div class="col-1">
          <h4>Title</h4>
        </div>
        <div class="col-11">
          <b-form>
            <b-form-group id="input-group-1" label-for="input-1">
              <b-form-input id="input-1" v-model="dataReplies.title" type="text" required></b-form-input>
            </b-form-group>
          </b-form>
        </div>
      </div>
      <div class="col">
        <quillEditor class="reply" v-model="dataReplies.description "></quillEditor>
        <div class="d-flex justify-content-end buttonReply">
          <div class="btn btn-primary" v-on:click="saveEdit(dataReplies._id)">Save Change</div>
          <div class="btn btn-danger" v-on:click="cancelEdit">Cancel</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "perQuestion",
  props: ["dataReplies"],
  components: {
    quillEditor
  },
  data() {
    return {
      editThis: false
    };
  },
  methods: {
    upvoteAnswer(id) {
      this.$store.dispatch("upvoteAnswer", id);
    },
    downvoteAnswer(id) {
      this.$store.dispatch("downvoteAnswer", id);
    },
    editYa() {
      this.editThis = true;
    },
    cancelEdit() {
      this.editThis = false;
    },
    saveEdit(id) {
      let dataBaru = {
        description: this.dataReplies.description,
        title: this.dataReplies.title
      };
      // console.log(id);
      // console.log(data);
      axios({
        method: "put",
        url: `${this.$store.state.baseUrl}/answer/${id}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: dataBaru
      })
        .then(({ data }) => {
          this.dataReplies = data;
          this.editThis = false;
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
</script>

<style scoper>
.judulPer {
  border-bottom: 1px solid #e4e6e8;
}

.vote:hover {
  color: lightslategray;
  cursor: pointer;
}

.description {
  text-align: start;
}

.reply {
  height: 20vh;
}
.buttonReply {
  margin-top: 90px;
}
</style>