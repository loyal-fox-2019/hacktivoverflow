<template>
  <div class="q-mx-auto" style="width:80%;">
    <!-- <pre>{{ myQuestions }}</pre> -->
    <FormQuestion class="flex justify-end q-mt-none" />
    <h4>My Questions</h4>

    <q-separator class="col-12" color="orange" />
    <q-intersection transition="scale" v-if="myQuestions.length === 0">
      <h4>You Have No Questions</h4>
    </q-intersection>

    <q-intersection
      v-for="item in myQuestions"
      :key="item._id"
      transition="scale"
    >
      <div class="row full-width">
        <div class="col-12 flex justify-end">
          <p class="text-right">Posted : {{ datePosted(item.createdAt) }}</p>
        </div>
        <div
          class="col-1 block text-center"
          style="margin:auto; border-right:1px solid orange"
        >
          <p>{{ votes(item.upvotes.length, item.downvotes.length) }}</p>
          <p>Votes</p>
          <p>{{ item.answers.length }}</p>
          <p>Answers</p>
        </div>
        <div class="col-11 block">
          <h6 class="text-blue-10 q-ml-md">{{ item.title }}</h6>
          <p class="q-ml-md">
            {{ description(item.description) }}
          </p>
          <div class="flex">
            <q-btn
              class="q-mx-auto"
              push
              color="primary"
              label="Detail"
              @click="$router.push(`/question/${item._id}`)"
            />
            <q-btn
              class="q-mx-auto"
              push
              color="primary"
              label="Edit"
              @click="$router.push('/edit/' + item._id)"
            />
            <q-btn
              class="q-mx-auto"
              push
              color="red"
              label="Delete"
              @click="deleteQuestion(item._id)"
            />
          </div>
        </div>
        <div class="col-12">
          <p class="text-right">Author : {{ item.author.username }}</p>
        </div>
        <q-separator class="col-12" color="orange" />
      </div>
    </q-intersection>

    <!-- place QPageScroller at end of page -->
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
    >
      <q-btn fab icon="keyboard_arrow_up" color="accent" />
    </q-page-scroller>
  </div>
</template>

<script>
import axios from 'axios'
import FormQuestion from '../FormQuestion'
export default {
  name: 'MyQuestions',
  components: {
    FormQuestion
  },
  created() {
    this.$store.dispatch('FETCH_MY_QUESTIONS')
  },
  computed: {
    myQuestions() {
      return this.$store.state.myQuestions
    }
  },
  methods: {
    description(description) {
      let shortened = description
      if (description.length > 100) {
        shortened = description.slice(100) + ' ...'
      }
      return shortened
    },
    datePosted(createdAt) {
      let date = new Date(createdAt).toDateString()
      return date
    },
    votes(upvote, downvote) {
      return upvote - downvote
    },
    deleteQuestion(questionId) {
      this.$q
        .dialog({
          title: 'Delete?',
          icon: 'warning',
          message: 'Are you sure want to delete this question?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          axios({
            method: 'delete',
            url: 'http://3.1.84.218:3000/questions/delete/' + questionId,
            headers: {
              token: localStorage.token
            }
          })
            .then(({ data }) => {
              this.$store.dispatch('FETCH_MY_QUESTIONS')
              this.$q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: data.deletedCount + 'Question deleted'
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
        })
    }
  }
}
</script>

<style></style>
