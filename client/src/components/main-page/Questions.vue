<template>
  <div class="q-mt-none q-mx-auto" style="width:80%; margin-top: -5%;">
    <FormQuestion class="flex justify-end q-mt-none" />
    <div v-if="questionList.length === 0">
      <div>
        <q-spinner color="primary" size="3em" />
      </div>
    </div>

    <div v-else>
      <pre>{{ questionList }}</pre>
      <h4>All Questions</h4>

      <q-separator class="col-12" color="orange" />
      <q-intersection
        v-for="item in questionList"
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
            <p class="q-ml-md" v-html="item.description">
              <!-- {{ description(item.description) }} -->
            </p>
            <q-btn
              class="q-mx-auto flex"
              push
              color="primary"
              label="Detail"
              @click="$router.push(`/question/${item._id}`)"
            />
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
  </div>
</template>

<script>
import FormQuestion from '../FormQuestion'
export default {
  name: 'Question',
  components: {
    FormQuestion
  },
  created() {
    this.$store.dispatch('FETCH_QUESTIONS')
  },
  computed: {
    questionList() {
      return this.$store.state.questionList
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
