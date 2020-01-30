<template>
  <v-card class="mx-auto my-10 question-card" style="width: 90%" :style="`background-color:${color}`" @click="toDetail">
    <v-sheet
      elevation="10"
      class="mx-auto vote-badge text-center"
      height="80"
      width="80"
    >
      <p class="count">{{question.votes}}</p>
      <p style="position: absolute; bottom: -12%; width: 100%; text-align: center">Votes</p>
    </v-sheet>
    <v-sheet
      elevation="10"
      class="mx-auto answer-badge text-center"
      height="80"
      width="80"
    >
      <p class="count">{{question.answers.length}}</p>
      <p style="position: absolute; bottom: -12%; width: 100%; text-align: center">Answers</p>
    </v-sheet>
    <v-sheet
      elevation="10"
      class="mx-auto view-badge text-center"
      height="80"
      width="80"
    >
      <p class="count">{{question.views.length}}</p>
      <p style="position: absolute; bottom: -12%; width: 100%; text-align: center">Views</p>
    </v-sheet>
    <v-list-item>
      <v-list-item-avatar color="grey">
        <img :src="question.author.profile_pic">
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{question.title}}</v-list-item-title>
        <v-list-item-subtitle>{{question.author.username}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  <!-- <v-card-text>detailed step by step to make stackOverflow website competitor, lorem ipsum dolor sit amet opo iki radong tenan. Lorem ipsum dolor sit amet ...</v-card-text> -->

  <v-card-actions>
    <v-chip
      class="ma-2"
      color="pink"
      label
      text-color="white"
      v-for="(tag, i) in question.tags"
      :key="i"
    >
      <v-icon left>mdi-label</v-icon>
      {{tag}}
    </v-chip>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-share-variant</v-icon>
    </v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
export default {
  name: 'QuestionItem',
  props: {
    question: Object
  },
  computed: {
    color () {
      if (!this.$store.state.user.tags) {
        return 'white'
      } else if (this.question.tags.some(element => this.$store.state.user.tags.includes(element))) {
        return '#faefb4'
      } else {
        return 'white'
      }
    }
  },
  methods: {
    toDetail () {
      this.$store.commit('SET_LOADING', true)
      this.$store.dispatch('fetchDetail', this.question.id)
      if (this.$store.state.isLogin) {
        this.$store.dispatch('addView', this.question.id)
      }
      this.$router.push(`/questions/${this.question.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.question-card {
  position: relative;
  .count {
    font-size: 2.5rem
  }
  .vote-badge {
    position: absolute;
    top: -10%;
    right: 35%
  }
  .answer-badge {
    position: absolute;
    top: -10%;
    right: 20%
  }
  .view-badge {
    position: absolute;
    top: -10%;
    right: 5%
  }
}
</style>
