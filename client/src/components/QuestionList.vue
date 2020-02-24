<template>
  <div class="question-list-wrapper" :class="isWatched" @click.prevent="viewquestion(question._id)">
    <div class="card question-card">
      <div class="question-score">{{questionScore}}</div>
      <label class="label-score">Vote</label>
    </div>
    <div class="card question-card">
      <div class="question-score">{{questionReplies}}</div>
      <label class="label-score">Replies</label>
    </div>
    <div class="question-content">
      <h5><strong>{{ question.title }}</strong></h5>
      <p class="content"><span v-html="question.content"></span></p>
      <span style="font-size: 0.8rem">Author: {{ question.author.name }}</span> &nbsp;&nbsp;
      <span style="font-size: 0.8rem">Posted at: {{ createdAt }}</span>
      <div v-if="tagLength > 0">
        <b-badge pill variant="secondary" v-for="tag in tags" :key="tag.id" class="mr-1">{{tag}}</b-badge>
      </div>
    </div>
  </div>
</template>

<script scoped>
import moment from 'moment'
export default {
  data () {
    return {
      isWatched: ''
    }
  },
  props: ['question'],
  components: {
  },
  created () {
    this.watched()
  },
  methods: {
    viewquestion (id) {
      this.$store.dispatch('fetchQuestion', id)
    },
    watched () {
      const found = this.tags.some(item => this.$store.state.watchedTags.includes(item))
      if (found) {
        this.isWatched = 'watched'
      } else {
        this.isWatched = ''
      }
    }
  },
  watch: {
    question (n, o) {
      this.watched()
    },
    watchedTags (n, o) {
      this.watched()
    }
  },
  computed: {
    watchedTags () {
      return this.$store.state.watchedTags
    },
    tagLength () {
      return this.question.tags.length
    },
    tags () {
      return this.question.tags
    },
    questionScore () {
      let upvote = this.question.vote.filter(item => {
        return item.value === 1
      })
      let downvote = this.question.vote.filter(item => {
        return item.value === -1
      })
      return upvote.length - downvote.length
    },
    questionReplies () {
      return this.question.answers.length
    },
    createdAt () {
      return moment(this.question.createdAt).fromNow()
    }
  }
}
</script>

<style scoped>
  .watched {
    background-color: #dce7f3 !important;
  }
  .question-card {
    width: 80px;
    height: 80px;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
  }
  .question-score {
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
  .question-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 2rem;
    width: calc(100% - 4.4rem);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p.content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
