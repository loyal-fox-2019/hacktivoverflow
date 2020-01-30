<template>
  <v-card class="mx-auto my-5 question-card" style="width: 80%">
    <v-sheet
      elevation="10"
      class="mx-auto upvote-badge text-center"
      height="80"
      width="80"
      v-if="$store.state.isLogin"
    >
      <v-btn block color="primary" style="height: 100%; z-index: 99" @click="upvoteAnswer"><v-icon large>mdi-thumb-up</v-icon></v-btn>
    </v-sheet>
    <v-sheet
      elevation="10"
      class="mx-auto down-badge text-center"
      height="80"
      width="80"
      v-if="$store.state.isLogin"
    >
      <v-btn block color="primary" style="height: 100%; z-index: 99" @click="downvoteAnswer"><v-icon large>mdi-thumb-down</v-icon></v-btn>
    </v-sheet>
    <v-sheet
      elevation="10"
      class="mx-auto vote-badge text-center"
      height="80"
      width="80"
    >
      <p class="count">{{answer.upvotes.length - answer.downvotes.length}}</p>
      <p style="position: absolute; bottom: -12%; width: 100%; text-align: center">Votes</p>
    </v-sheet>
    <v-list-item>
      <v-list-item-avatar color="grey">
        <img :src="answer.author.profile_pic">
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle>{{answer.author.username}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider style="margin-top: 2em"></v-divider>
  <v-card-text style="padding: 2rem" v-html="answer.content"></v-card-text>
</v-card>
</template>

<script>
import axios from '../config/api'
export default {
  name: 'AnswerItem',
  props: {
    answer: Object
  },
  methods: {
    upvoteAnswer () {
      axios({
        method: 'patch',
        url: `/answers/${this.answer._id}/upvote`,
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
    downvoteAnswer () {
      axios({
        method: 'patch',
        url: `/answers/${this.answer._id}/downvote`,
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
