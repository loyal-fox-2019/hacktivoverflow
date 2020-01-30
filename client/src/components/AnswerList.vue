<template>
  <div class="question-list-wrapper">
    <VoteButton :modeURL="'answer'" :data="answer"/>
    <div class="answer-content">
      <p class="content">{{ answer.content }}</p>
      <span><strong>Author:</strong> {{ $store.state.currentanswer.author.name }}</span> &nbsp;&nbsp;
      <span><strong>Created At: </strong>{{ createdAt }}</span>
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
      return moment(this.answer.createdAt).format('hh:mm - DD MMMM YYYY')
    },
    currentQuestion () {
      return this.$store.state.currentQuestion
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
    display: flex;
    /* width: 80%; */
    padding: 1rem;
    margin: 0 auto;
    background-color: #f0f0f0;
    cursor: pointer;
    border-radius: 4px;
  }
  .question-list-wrapper:nth-child(even) {
    background-color: #ffffff;
  }
  .question-list-wrapper:hover {
    /* padding: 2rem; */
    background-color: #78cad6;
    transition: 0.4s padding;
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
