<template>
  <div class="detail d-flex justify-content-center">
    <div class="detail-question d-flex-column justify-content-center container">
      <h2 class="mt-5">{{questions.title}}</h2>
      <p class="mb-4"># {{questions._id}}</p>
      <p><label v-for="(tag, index) in questions.tags" :key="index">
          <button type="button" class="btn btn-sm btn-danger disabled ml-2 tags" data-toggle="button" aria-pressed="false">
          {{tag}}
          </button></label>
      </p>
      <div class="card up">
        <div class="card-body container">
          <div class="row">
            <div class="d-flex-column align-items-center point votes pl-4 pr-4">
              <a class="questionTitle" ref="" @click.prevent="upvotes(questions._id)"><i class="fas fa-caret-up"></i></a>
              <p class="sum" v-if="questions.upVotes"> {{questions.upVotes.length - questions.downVotes.length}} </p>
              <a class="questionTitle" ref="" @click.prevent="downvotes(questions._id)"><i class="fas fa-caret-down"></i></a>
            </div>
            <div class="col">
              <p  class="desc" v-html="questions.description" > </p>
            </div>
          </div>
        </div>
      </div>
      <div class="card down">
        <div class="card-body container">
          <h5 v-if="questions.answers"> {{questions.answers.length}} Answer </h5>
        </div>
      </div>
      <div class="mb-5 container">
        <Answer v-for="answer in questions.answers" :key="answer._id" :data="answer" />
      </div>
      <div class="mb-5 container">
        <b-form @submit.prevent="answer(questions._id)">
          <b-form-group label="Your Answer" class="label mb-1"></b-form-group>
            <wysiwyg v-model="description" />
          <b-button variant="primary" type="submit" class="but-log mt-4">Post your answer</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import Answer from './Answer'

export default {
  name: 'DetailQuestion',
  components: {
    Answer
  },
  data () {
    return {
      description: ''
    }
  },
  computed: {
    questions () {
      return this.$store.state.detailQuestion
    }
  },
  methods: {
    answer (id) {
      let value = {
        id,
        description: this.description
      }
      this.$store.dispatch('createAnswer', value)
        .then(({ data }) => {
          let a = this.$route.params.id
          this.$store.dispatch('readQuestion', a)
          this.description = ''
        })
        .catch(err => {
          console.log(err)
        })
    },
    upvotes (id) {
      this.$store.dispatch('upVotesQuestion', id)
        .then(({ data }) => {
          let a = this.$route.params.id
          this.$store.dispatch('readQuestion', a)
        })
        .catch(err => {
          console.log(err)
        })
    },
    downvotes (id) {
      this.$store.dispatch('downVotesQuestion', id)
        .then(({ data }) => {
          let a = this.$route.params.id
          this.$store.dispatch('readQuestion', a)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    const valid = localStorage.getItem('token')
    if (!valid) {
      this.$router.push('/')
    }
    let a = this.$route.params.id
    this.$store.dispatch('readQuestion', a)
  }
}
</script>

<style scoped>
.detail {
  margin-top: 74px !important;
  height: 88vh !important;
}

.detail-question {
  overflow: scroll;
  width: 70%;
  border-right: 0.9px solid #cccccc;
  border-left: 0.9px solid #cccccc;
}

.up {
  border-radius: 0px;
  border-top: 0.9px solid #cccccc;
  border-bottom: none;
  border-left: none;
  border-right: none
}

.down {
  border-radius: 0px;
  border-top: none;
  border-bottom: 0.9px solid #cccccc;
  border-left: none;
  border-right: none
}

.desc {
  font-size: 26px !important
}

.sum {
  margin-bottom: 0;
  color: #cccccc;
}

.tags {
  font-size: 0.5rem !important;
  background-color: #f48024;
  border-color: #f48024
}

.btn.disabled, .btn:disabled {
    opacity: 1;
    box-shadow: none
}

.vote {
  font-size: 30px !important;
  color: #cccccc !important
}

.votes {
  font-size: 24px;
  text-align: center;
  justify-content: center;

}

.questionTitle,
.questionTitle:focus {
  color: #cccccc;
  font-size: 30px !important;
  cursor: pointer;
}

.questionTitle:hover {
  color: #717b83;
}
</style>
