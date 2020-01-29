<template>
  <div class="border-b border-gray-200 mb-2">
    <div class="w-full flex">
      <div class="w-1/12">
        <div style="cursor: pointer;">
          <span class="fas fa-caret-up text-3xl"></span>
        </div>
        <div class="text-3xl">{{ localeVotes }}</div>
        <div style="cursor: pointer;">
          <span class="fas fa-caret-down text-3xl"></span>
        </div>
      </div>
      <div class="w-11/12">
        {{ answer.description }}
      </div>
    </div>
    <div class="flex justify-end">
      <small class="font-hairline text-sm italic text-gray-600"
        >Answered at 6 Jan 2020 04:23AM</small
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
  },
}
</script>

<style></style>
