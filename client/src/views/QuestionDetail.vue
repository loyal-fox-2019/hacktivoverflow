<template>
  <div>
      <v-card class="mx-auto my-5 question-card" style="width: 90%">
        <v-sheet
          elevation="10"
          class="mx-auto upvote-badge text-center"
          height="100"
          width="100"
        >
          <p class="count"><v-icon large>mdi-thumb-up</v-icon></p>
          <!-- <p style="position: absolute; bottom: -12%; width: 100%; text-align: center">Votes</p> -->
        </v-sheet>
        <v-sheet
          elevation="10"
          class="mx-auto down-badge text-center"
          height="100"
          width="100"
        >
          <p class="count"><v-icon large>mdi-thumb-down</v-icon></p>
          <!-- <p style="position: absolute; bottom: -12%; width: 100%; text-align: center">Answers</p> -->
        </v-sheet>
        <v-sheet
          elevation="10"
          class="mx-auto vote-badge text-center"
          height="100"
          width="100"
        >
          <p class="count">8</p>
          <p style="position: absolute; bottom: -12%; width: 100%; text-align: center">Votes</p>
        </v-sheet>
        <v-list-item>
          <v-list-item-avatar color="grey"></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline">How to make stackOverflow?</v-list-item-title>
            <v-list-item-subtitle>Kurt Wagner</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      <v-card-text>detailed step by step to make stackOverflow website competitor, lorem ipsum dolor sit amet opo iki radong tenan. Lorem ipsum dolor sit amet ...</v-card-text>

      <v-card-actions>
        <v-chip
          class="ma-2"
          color="pink"
          label
          text-color="white"
        >
          <v-icon left>mdi-label</v-icon>
          Tags
        </v-chip>
        <v-chip
          class="ma-2"
          color="pink"
          label
          text-color="white"
        >
          <v-icon left>mdi-label</v-icon>
          Tag Lain
        </v-chip>
        <v-chip
          class="ma-2"
          color="pink"
          label
          text-color="white"
        >
          <v-icon left>mdi-label</v-icon>
          Tag Lain lagi
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
    <v-divider></v-divider>
    <h2 class="ml-2">Answers: </h2>
    <v-container class="fill-height" fluid style="margin-left: 2%">
      <answer-item/>
      <answer-item/>
      <answer-item/>
    </v-container>
    <v-divider></v-divider>
    <h2 class="ml-2">Post Your Answer: </h2>
      <v-form id="form-answer" style="width: 100%; padding: 2em" @submit.prevent="postQuestion" class="d-flex flex-column justify-center align-center">
        <v-alert type="error" v-for="(error, i) in errors" :key="i">
          {{error}}
        </v-alert>
        <wysiwyg v-model="content" />
        <div style="position: relative">
          <v-btn color="success" class="my-3" style="position: relative; right:0" type="submit" form="form-answer">Post Answer</v-btn>
        </div>
      </v-form>
  </div>
</template>

<script>
import AnswerItem from '../components/AnswerItem'
export default {
  name: 'QuestionDetail',
  components: {
    AnswerItem
  },
  data () {
    return {
      content: '',
      errors: []
    }
  }
}
</script>

<style lang="scss" scoped>
.question-card {
  position: relative;
  .count {
    font-size: 4rem
  }
  .upvote-badge {
    position: absolute;
    top: -10%;
    right: 35%
  }
  .down-badge {
    position: absolute;
    top: -10%;
    right: 20%
  }
  .vote-badge {
    position: absolute;
    top: -10%;
    right: 5%
  }
}
</style>
