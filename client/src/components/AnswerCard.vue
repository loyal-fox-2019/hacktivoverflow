<template>
  <div class="border-b border-gray-200 mb-2">
    <div class="w-full flex">
      <div class="w-1/12">
        <div style="cursor: pointer;" @click="vote(1)">
          <span class="fas fa-caret-up text-3xl"></span>
        </div>
        <div class="text-3xl">{{ localeVotes }}</div>
        <div style="cursor: pointer;" @click="vote(-1)">
          <span class="fas fa-caret-down text-3xl"></span>
        </div>
      </div>
      <div class="w-11/12"><span v-html="answer.description"></span></div>
    </div>
    <div class="flex justify-end">
      <small class="font-hairline text-sm italic text-gray-600"
        >Answered at {{ localeTime }}</small
      >
    </div>
    <div class="flex justify-end mb-2">
      <div class="border border-gray-300 py-2 px-2 flex items-start rounded-sm">
        <img :src="localeAvatar" width="32" height="32" />
        <p class="ml-2">{{ answer.owner.username }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import api from '@/config/api'

export default {
  name: 'answer-card',
  props: ['answer'],
  computed: {
    localeVotes() {
      return this.answer.votes.reduce((a, ans) => (a += ans.value), 0)
    },
    localeAvatar() {
      return this.answer.owner.avatar
        ? this.answer.owner.avatar
        : 'https://placekitten.com/200/200'
    },
    localeTime() {
      return this.answer.createdAt
        ? moment(this.answer.createdAt).format('D MMM YYYY H:mA')
        : new Date().toLocaleString()
    },
    token() {
      return this.$store.state.token
    },
  },
  methods: {
    vote(val) {
      api
        .post(
          '/votes/answer',
          {
            questionId: this.$route.params.questionId,
            answerId: this.answer._id,
            value: val,
          },
          {
            headers: {
              token: this.token,
            },
          },
        )
        .then(({ data }) => {
          this.$store.dispatch('fetchQuestion', {
            method: 'get',
            url: `/questions/${this.$route.params.questionId}`,
            success: 'UPDATE_QUESTION',
          })
        })
        .catch(err => {
          this.$store.commit('UPDATE_IS_LOADING', false)
          if (err.response) {
            err.response.data.errors.forEach(error => {
              this.$toast.open({
                message: error,
                type: 'error',
                position: 'top-right',
                duration: 1500,
              })
            })
          } else {
            this.$toast.open({
              message: 'Error has happened, please refresh browser',
              type: 'error',
              position: 'top-right',
              duration: 50000,
            })
          }
        })
    },
  },
}
</script>

<style></style>
