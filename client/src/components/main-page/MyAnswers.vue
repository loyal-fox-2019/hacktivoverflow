<template>
  <div class="q-mx-auto" style="width:80%;">
    <!-- <pre>{{ myAnswers }}</pre> -->
    <FormQuestion class="flex justify-end q-mt-none" />

    <h4>My Answers</h4>

    <q-separator class="col-12" color="orange" />
    <q-intersection transition="scale" v-if="myAnswers.length === 0">
      <h4>You Have Not Answering Any Questions Yet</h4>
    </q-intersection>

    <q-intersection
      v-for="item in myAnswers"
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
          <p>
            {{ votes(item.upvotes.length, item.downvotes.length) }}
          </p>
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
              @click="$router.push('/question/' + item._id)"
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
  name: 'MyAnswers',
  components: {
    FormQuestion
  },
  created() {
    this.$store.dispatch('FETCH_MY_ANSWERS')
  },
  computed: {
    myAnswers() {
      return this.$store.state.myAnswers
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
    }
  }
}
</script>

<style></style>
