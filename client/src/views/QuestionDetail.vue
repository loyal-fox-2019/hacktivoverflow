<template>
  <div>
      <v-card class="mx-auto my-5 question-card" style="width: 90%">
        <v-sheet
          elevation="10"
          class="mx-auto edit-badge text-center"
          height="80"
          width="80"
          v-if="$store.state.isLogin && $store.state.detail.author.username === $store.state.user.username"
        >
          <v-btn block color="primary" style="height: 100%; z-index: 99" @click="editQuestion"><v-icon large>mdi-pencil</v-icon></v-btn>
        </v-sheet>
        <v-sheet
          elevation="10"
          class="mx-auto delete-badge text-center"
          height="80"
          width="80"
          v-if="$store.state.isLogin && $store.state.detail.author.username === $store.state.user.username"
        >
          <v-btn block color="primary" style="height: 100%; z-index: 99" @click="deleteQuestion"><v-icon large>mdi-delete</v-icon></v-btn>
        </v-sheet>
        <v-sheet
          elevation="10"
          class="mx-auto upvote-badge text-center"
          height="80"
          width="80"
          v-if="$store.state.isLogin"
        >
          <v-btn block color="primary" style="height: 100%; z-index: 99" @click="upvoteQuestion"><v-icon large>mdi-thumb-up</v-icon></v-btn>
        </v-sheet>
        <v-sheet
          elevation="10"
          class="mx-auto down-badge text-center"
          height="80"
          width="80"
          v-if="$store.state.isLogin"
        >
          <v-btn block color="primary" style="height: 100%; z-index: 99" @click="downvoteQuestion"><v-icon large>mdi-thumb-down</v-icon></v-btn>
        </v-sheet>
        <v-sheet
          elevation="10"
          class="mx-auto vote-badge text-center"
          height="80"
          width="80"
        >
          <p class="count">{{$store.state.detail.votes}}</p>
          <p style="position: absolute; bottom: -12%; width: 100%; text-align: center">Votes</p>
        </v-sheet>
        <v-list-item>
          <v-list-item-avatar color="grey">
            <img :src="$store.state.detail.author.profile_pic">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline">{{$store.state.detail.title}}</v-list-item-title>
            <v-list-item-subtitle>{{$store.state.detail.author.username}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      <v-card-text v-html="$store.state.detail.content"></v-card-text>
      <v-card-actions>
        <v-chip
          class="ma-2"
          color="pink"
          label
          text-color="white"
          v-for="(tag, i) in $store.state.detail.tags"
          :key="i"
        >
          <v-icon left>mdi-label</v-icon>
          {{tag}}
        </v-chip>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-divider></v-divider>
    <div style="padding: 2em; padding-left: 4em" v-if="$store.state.detail.answers.length !== 0">
      <h2>Answers: </h2>
    </div>
    <v-container class="fill-height" fluid style="margin-left: 2%">
      <answer-item v-for="answer in $store.state.detail.answers" :key="answer.id" :answer="answer"/>
    </v-container>
    <v-divider></v-divider>
    <div v-if="$store.state.isLogin">
      <div style="padding: 2em; padding-left: 4em" v-if="$store.state.detail.answers.length !== 0">
        <h2>Post Your Answer: </h2>
      </div>
      <v-form id="form-answer" style="width: 100%; padding: 2em" @submit.prevent="postAnswer" class="d-flex flex-column justify-center align-center">
        <v-alert type="error" v-for="(error, i) in errors" :key="i">
          {{error}}
        </v-alert>
        <wysiwyg v-model="content" style="width: 70%"/>
        <div style="position: relative">
          <v-btn color="success" class="my-3" style="position: relative; right:0" type="submit" form="form-answer">Post Answer</v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import axios from '../config/api'
import AnswerItem from '../components/AnswerItem'
export default {
  name: 'QuestionDetail',
  components: {
    AnswerItem
  },
  data () {
    return {
      content: '',
      errors: []
    }
  },
  methods: {
    editQuestion () {
      this.$router.push(`/edit/${this.$store.state.detail.id}`)
    },
    deleteQuestion () {
      this.$swal({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.value) {
            axios({
              method: 'delete',
              url: `/questions/${this.$store.state.detail.id}`,
              headers: {
                token: localStorage.getItem('token')
              }
            })
              .then(({ data }) => {
                this.$swal({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Deleted',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.$store.dispatch('fetchQuestions')
                  .then(() => {
                    this.$router.push('/')
                  })
              })
              .catch(err => {
                this.errors = err.response.data.message
              })
          }
        })
    },
    upvoteQuestion () {
      axios({
        method: 'patch',
        url: `/questions/${this.$store.state.detail.id}/upvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Upvote Updated',
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.dispatch('fetchDetail', this.$store.state.detail.id)
        })
        .catch(err => {
          this.errors = err.response.data.message
        })
    },
    downvoteQuestion () {
      axios({
        method: 'patch',
        url: `/questions/${this.$store.state.detail.id}/downvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Downvote Updated',
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.dispatch('fetchDetail', this.$store.state.detail.id)
        })
        .catch(err => {
          this.errors = err.response.data.message
        })
    },
    postAnswer () {
      this.errors = []
      axios({
        method: 'POST',
        url: `/answers/${this.$store.state.detail.id}`,
        data: {
          content: this.content
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Answer Posted',
            showConfirmButton: false,
            timer: 1500
          })
          this.content = ''
          this.$emit('hide-form')
          this.$store.dispatch('fetchDetail', this.$store.state.detail.id)
        })
        .catch(err => {
          this.errors = err.response.data.message
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.question-card {
  position: relative;
  .count {
    font-size: 2.5rem
  }
  .edit-badge {
    position: absolute;
    top: -10%;
    right: 45%
  }
  .delete-badge {
    position: absolute;
    top: -10%;
    right: 35%
  }
  .upvote-badge {
    position: absolute;
    top: -10%;
    right: 25%
  }
  .down-badge {
    position: absolute;
    top: -10%;
    right: 15%
  }
  .vote-badge {
    position: absolute;
    top: -10%;
    right: 5%
  }
}
</style>
