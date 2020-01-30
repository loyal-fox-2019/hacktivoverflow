<template>
  <div>
    <!-- <pre>{{ question }}</pre> -->
    <div v-if="question._id === undefined">
      <div>
        <q-spinner color="primary" size="3em" />
      </div>
    </div>

    <div class="row flex q-mx-auto" style="width: 80%;" v-else>
      <div class="col-10">
        <h4>{{ question.title }}</h4>
      </div>
      <div class="col-2" style="margin:auto;">
        <FormQuestion />
      </div>
      <div class="col-12 inline">
        <div class="flex justify-evenly">
          <p>Asked By: {{ question.author.username }}</p>
          <p>Posted At: {{ datePosted(question.createdAt) }}</p>
        </div>
        <q-separator class="col-12" color="orange" />
      </div>
      <div class="col-12">
        <div class="row q-mt-md">
          <div class="col-1 column" style="border-right:1px solid orange">
            <q-btn
              class="block q-mx-auto"
              round
              color="primary"
              icon="keyboard_arrow_up"
              @click="upvote(question._id)"
            />
            <p class="q-mx-auto q-mt-sm">Votes</p>
            <p class="q-mx-auto">
              {{ votes(question.upvotes.length, question.downvotes.length) }}
            </p>
            <q-btn
              class="block q-mx-auto"
              round
              color="primary"
              icon="keyboard_arrow_down"
              @click="downvote(question._id)"
            />
          </div>
          <div class="col-11">
            <p class="q-mt-md q-ml-md" v-html="question.description"></p>
          </div>
        </div>
        <q-separator class="q-mt-md col-12" color="orange" />
      </div>
      <div class="col-12" v-if="answers.length > 0">
        <h6>{{ answers.length }} Answer(s)</h6>
        <q-separator class="col-12" color="orange" />
        <Answer />
      </div>
      <form @submit.prevent="onSubmit(question._id)" class="col-12 q-mt-lg">
        <p>Post your answer :</p>
        <Editor @text="text" />
        <q-btn
          class="q-mt-md q-mx-auto flex"
          color="primary"
          label="POST ANSWER"
          type="submit"
        >
          <q-tooltip>
            Post Your Answer
          </q-tooltip>
        </q-btn>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import FormQuestion from './FormQuestion'
import Answer from './Answer'
import Editor from './Editor'
export default {
  name: 'DetailQuestion',
  components: {
    FormQuestion,
    Answer,
    Editor
  },
  data() {
    return {
      answer: ''
    }
  },
  created() {
    this.$store.dispatch('FETCH_QUESTION_DETAIL', this.$route.params.id)
  },
  computed: {
    question() {
      return this.$store.state.question
    },
    answers() {
      return this.$store.state.answers
    }
  },
  methods: {
    text(value) {
      this.answer = value
    },
    datePosted(date) {
      let newDate = new Date(date).toDateString()
      return newDate
    },
    votes(upvote, downvote) {
      return upvote - downvote
    },
    onSubmit(questionId) {
      if (this.answer.length <= 6) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Your answer is too short'
        })
      } else {
        axios({
          method: 'post',
          url: 'http://localhost:3000/answers/',
          headers: {
            token: localStorage.token
          },
          data: {
            question: questionId,
            description: this.answer
          }
        })
          .then(({ data }) => {
            // console.log(data)
            if (data.name === 'Not Found') {
              this.$q.notify({
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: data.message + ' or already deleted'
              })
            } else {
              this.$store.dispatch('FETCH_QUESTION_DETAIL', questionId)
              this.$q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Answer Posted'
              })
            }
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
    },
    upvote(questionId) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/questions/upvote/' + questionId,
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
    downvote(questionId) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/questions/downvote/' + questionId,
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
