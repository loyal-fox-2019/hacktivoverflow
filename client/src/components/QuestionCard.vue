<template>
  <div
    class="w-full border-t border-b border-grey-200 flex rounded-sm hover:bg-orange-200"
    :class="{ 'bg-orange-100': watched }"
    style="cursor: pointer;"
    @click="getDetail"
  >
    <div class="w-24 pl-5 py-3 text-center flex items-center h-48">
      <div>
        <div>{{ localeVotes }}</div>
        <div>Vote(s)</div>
        <div class="mt-10">{{ question.answers }}</div>
        <div>Answer(s)</div>
      </div>
    </div>
    <div class="py-3 pl-8 w-5/6">
      <h1 class="text-xl text-blue-400">
        {{ question.title }}
      </h1>
      <div class="flex mt-5 mb-1">
        <img :src="localeAvatar" width="32" height="32" />
        <p class="ml-1 font-hairline tracking-wide">
          {{ question.owner.username }}
        </p>
      </div>
      <small class="italic text-gray-600">Asked at {{ localeTime }}</small>
      <p class="mt-8 truncate">
        <span v-html="question.description"></span>
      </p>
      <div class="flex mt-2">
        <p
          class="text-xs bg-gray-500 mr-1 px-2 py-1 rounded-full"
          v-for="(tag, i) in question.tags"
          :key="i"
        >
          {{ tag }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'question-card',
  props: ['question'],
  computed: {
    localeTime() {
      return this.question.createdAt
        ? moment(this.question.createdAt).format('D MMM YYYY H:mA')
        : new Date().toLocaleString()
    },
    localeAvatar() {
      return this.question.owner.avatar
        ? this.question.owner.avatar
        : 'https://placekitten.com/200/200'
    },
    localeVotes() {
      return this.question.votes.reduce((a, q) => {
        return (a += q.value)
      }, 0)
    },
    userTags() {
      return this.$store.state.tags
    },
    watched() {
      return this.question.tags.some(tag => this.userTags.includes(tag))
    },
  },
  methods: {
    getDetail() {
      this.$router.push(`/question/${this.question._id}`)
    },
  },
}
</script>

<style></style>
