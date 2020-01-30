<template>
  <div>
    <div v-for="item in answers" :key="item._id">
      <!-- <pre>{{ answers }}</pre> -->
      <div class="col-12">
        <div class="row q-mt-md">
          <div class="col-1 column" style="border-right:1px solid orange">
            <q-btn
              class="block q-mx-auto"
              round
              color="primary"
              icon="keyboard_arrow_up"
              @click="upvote(item._id, item.question)"
            />
            <p class="q-mx-auto q-mt-sm">Votes</p>
            <p class="q-mx-auto">
              {{ votes(item.upvotes.length, item.downvotes.length) }}
            </p>
            <q-btn
              class="block q-mx-auto"
              round
              color="primary"
              icon="keyboard_arrow_down"
              @click="downvote(item._id, item.question)"
            />
          </div>
          <div class="col-11">
            <p class="q-ml-md q-mt-md" v-html="item.description"></p>
          </div>
        </div>
        <div>
          <div class="col-1"></div>
          <div class="col-11 flex justify-end">
            <p class="q-mr-sm">Answered By: {{ item.user.username }}</p>
            <p class="">| Posted At: {{ datePosted(item.createdAt) }}</p>
          </div>
        </div>
        <q-separator class="q-mt-md col-12" color="orange" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Answer',
  computed: {
    answers() {
      return this.$store.state.answers
    }
  },
  methods: {
    datePosted(date) {
      return new Date(date).toDateString()
    },
    votes(upvotes, downvotes) {
      return upvotes - downvotes
    },
    upvote(answerId, questionId) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/answers/upvote/' + answerId,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('FETCH_QUESTION_DETAIL', questionId)
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Upvote Success'
          })
        })
        .catch((err) => {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Something went wrong'
          })
        })
    },
    downvote(answerId, questionId) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/answers/downvote/' + answerId,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('FETCH_QUESTION_DETAIL', questionId)
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Downvote Success'
          })
        })
        .catch((err) => {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Something went wrong'
          })
        })
    }
  }
}
</script>

<style></style>
