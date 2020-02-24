<template>
  <div class="vote-wrapper">
    <b-button variant="secondary" class="vote-button" @click="addVote(data._id, 1)">+</b-button>
    <div class="vote">
      {{vote}}
    </div>
    <b-button variant="secondary" class="vote-button" @click="addVote(data._id, -1)">-</b-button>
  </div>
</template>

<script>
export default {
  props: ['modeURL', 'data'],
  methods: {
    addVote (id, value) {
      this.$store.dispatch('addVote', { id, value, modeURL: this.modeURL })
    }
  },
  computed: {
    vote () {
      let upvote = this.data.vote.filter(item => {
        return item.value === 1
      })
      let downvote = this.data.vote.filter(item => {
        return item.value === -1
      })
      return upvote.length - downvote.length
    }
  }
}
</script>

<style>
  .vote-wrapper {
    margin: 2rem;
  }
  .vote {
    height: 40px;
    line-height: 40px;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
  }
  .vote-button {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
</style>
