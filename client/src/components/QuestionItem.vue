<template>
  <v-card class="mx-auto my-5 question-card" style="width: 90%" @click="toDetail">
    <v-sheet
      elevation="10"
      class="mx-auto vote-badge text-center"
      height="100"
      width="100"
    >
      <p class="count">8</p>
      <p style="position: absolute; bottom: -12%; width: 100%; text-align: center">Votes</p>
    </v-sheet>
    <v-sheet
      elevation="10"
      class="mx-auto answer-badge text-center"
      height="100"
      width="100"
    >
      <p class="count">8</p>
      <p style="position: absolute; bottom: -12%; width: 100%; text-align: center">Answers</p>
    </v-sheet>
    <v-sheet
      elevation="10"
      class="mx-auto view-badge text-center"
      height="100"
      width="100"
    >
      <p class="count">8</p>
      <p style="position: absolute; bottom: -12%; width: 100%; text-align: center">Views</p>
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
</template>

<script>
export default {
  name: 'QuestionItem',
  methods: {
    toDetail () {
      this.$router.push('/question/123123')
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
