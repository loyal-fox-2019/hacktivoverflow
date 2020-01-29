<template>
  <v-card class="mx-auto my-5 question-card" style="width: 80%">
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
        <v-list-item-subtitle>Kurt Wagner</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider style="margin-top: 2em"></v-divider>
  <v-card-text style="padding: 2rem">detailed step by step to make stackOverflow website competitor, lorem ipsum dolor sit amet opo iki radong tenan. Lorem ipsum dolor sit amet ...</v-card-text>
</v-card>
</template>

<script>
export default {
  name: 'AnswerItem'
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
