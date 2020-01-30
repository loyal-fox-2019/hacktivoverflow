<template>
  <b-col cols="10" class="mt-5 pt-4" style="border-left:2px solid lightgrey">
    <b-row>
      <b-col class="text-left ml-3" v-if="question">
        <h2 v-if="!editMode">
          {{ question.title }}
        </h2>
        <b-form-input v-model="title" v-if="editMode" size="lg"></b-form-input>

        <p style="font-size:12px;" class="p-0 m-0">
          <span class="text-muted">Viewed</span>
          <span class="font-weight-bold"> {{ question.view }} times</span>
        </p>
        <div>
          <b-button
            variant="link"
            class="text-danger p-0"
            style="font-size:12px;"
            v-if="!editMode"
            @click.prevent="deleteTry"
          >
            Delete
          </b-button>
          <b-button
            variant="link"
            class="text-secondary p-1"
            style="font-size:12px;"
            @click.prevent="editQuestion"
            v-if="!editMode"
          >
            Edit
          </b-button>

          <b-button
            variant="link"
            class="text-success p-1"
            style="font-size:12px;"
            @click.prevent="saveChanges"
            v-if="editMode"
          >
            Save Changes
          </b-button>
        </div>
        <hr />
      </b-col>
    </b-row>
    <detail-card :data="question" :isEdit="editMode"></detail-card>
    <b-row>
      <b-col class="text-left" v-if="question">
        <tag-list :tags="question.tags"></tag-list>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h4 class="text-right font-weight-bold mt-3">
          {{ $store.state.comments.length }} Answers
        </h4>
        <hr />
      </b-col>
    </b-row>
    <b-row v-for="comment in comments" :key="comment._id">
      <b-col>
        <detail-card :data="comment"></detail-card>
        <hr />
      </b-col>
    </b-row>
    <b-row class="mx-5 mb-5">
      <b-col>
        <hr />
        <h2>Your Answer</h2>
        <b-form @submit.prevent="saveComment">
          <b-form-group>
            <vue-editor v-model="comment" />
          </b-form-group>
          <div class="text-left">
            <b-button
              type="submit"
              variant="info"
              size="sm"
              class="shadow-sm"
              block
              v-if="!isLoading"
            >
              catch(this.error)
            </b-button>

            <b-button variant="info" disabled block size="sm" v-if="isLoading">
              <b-spinner small label="spinning"></b-spinner>
              Catching this error...
            </b-button>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import TagList from "@/components/TagList.vue";
import DetailCard from "@/components/DetailCard.vue";
import axios from "axios";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

export default {
  components: {
    TagList,
    DetailCard
  },
  data() {
    return {
      comment: null,
      isLoading: false,
      editMode: false
    };
  },
  methods: {
    deleteTry() {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios({
            method: "DELETE",
            url: `${this.$store.state.API}/questions/${this.$route.params.id}`,
            headers: {
              token: localStorage.token
            }
          })
            .then(() => {
              this.$router.replace({ name: "try list" });
              Toast.fire({
                icon: "success",
                title: "Your try has been deleted"
              });
            })
            .catch(err => {
              this.$swal(
                "Error",
                err.response.data.message || "Something went wrong",
                "error"
              );
            });
        }
      });
    },
    editQuestion() {
      this.$store.commit("SET_EDITED", [
        {
          key: "title",
          value: this.question.title
        },
        {
          key: "body",
          value: this.question.body
        }
      ]);
      this.editMode = true;
    },
    saveChanges() {
      this.$store.dispatch("saveChanges", this.question._id);
      this.editMode = false;
    },
    saveComment() {
      this.isLoading = true;
      if (!localStorage.token) {
        this.comment = null;
        this.isLoading = false;
        this.$swal(
          "Error",
          "You must be logged in to catch error on ErrorHandler()",
          "error"
        );
      } else {
        axios({
          method: "POST",
          url: `${this.$store.state.API}/questions/${this.$route.params.id}/comments`,
          headers: {
            token: localStorage.token
          },
          data: {
            body: this.comment
          }
        })
          .then(async () => {
            await this.$store.dispatch("fetchComments", this.$route.params.id);
            this.comment = null;
            this.isLoading = false;
          })
          .catch(() => {
            this.$swal("Error", "Something went wrong", "error");
          });
      }
    }
  },
  created() {
    this.$store.dispatch("fetchQuestionDetail", this.$route.params.id);
    this.$store.dispatch("fetchComments", this.$route.params.id);
  },
  computed: {
    question() {
      return this.$store.state.questionDetail;
    },
    comments() {
      return this.$store.state.comments;
    },
    title: {
      get() {
        return this.$store.state.editedContent.title;
      },
      set(value) {
        this.$store.commit("SET_EDITED", [
          {
            key: "title",
            value
          }
        ]);
      }
    }
  }
};
</script>

<style scoped>
button.btn.m-0.p-0.btn-link {
  color: grey;
}

button.btn.m-0.p-0.btn-link:hover {
  color: black;
}
</style>
