<template>
  <div class="question-list-wrapper">
    <VoteButton :modeURL="'answer'" :data="answer"/>
    <div class="answer-content">
      <p class="content"><span v-html="answer.content"></span></p>
      <span style="font-size:12px">Author: {{ answer.author.name }}</span> &nbsp;&nbsp;
      <span style="font-size:12px">Created at: {{ createdAt }}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import VoteButton from './VoteButton'

export default {
  props: ['answer'],
  components: {
    VoteButton
  },
  created () {
  },
  methods: {
  },
  computed: {
    createdAt () {
      return moment(this.answer.createdAt).fromNow()
    }
  }
}
</script>

<style scoped>
  .vote-wrapper {
    margin: 0 0 0 2rem !important;
  }
  .answer-card {
    width: 80px;
    height: 80px;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
  }
  .answer-score {
    font-size: 2rem;
    color: #9c9c9c;
  }
  .label-score {
    margin-top: auto;
    color: #9c9c9c;
  }
  .question-list-wrapper {
    border-bottom: 1px solid #cacaca;
    display: flex;
    padding: 1rem;
    margin: 0 auto;
    cursor: pointer;
  }
  .answer-content {
    margin-left: 2rem;
    width: calc(100% - 4.4rem);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p.content {
    /* max-width: 100% !important;  */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
